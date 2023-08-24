import React, { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux';
import { Menu } from '../../components/Menu/Menu';
import { GameCard  } from '../../components/GameCard/GameCard';
import { filesGet } from '../../shared/api/routs/file';
import { folderGet } from '../../shared/api/routs/folder';
import { newFilesRequest } from '../../store/slice/fileSlice';
import { newFolderRequest } from '../../store/slice/folderSlice';


import s from "./filePage.module.scss";

export const FilePage = () => {
  const dispatch = useAppDispatch();

  const { folder } = useAppSelector(
    state => state.folder
  )
  const { files } = useAppSelector(
    state => state.file
  )

  const getFiles = async (id: string) => {
    try{
      const data = await filesGet({ id: id });
      const folder = await folderGet({ id: id });

      dispatch(newFilesRequest({ files: data.data }))
      dispatch(newFolderRequest({ folder: folder.data}))
    } catch (e) {
      console.error(e)
    }
  }

  const id = window.location.search.slice(1).split("=")[1];

  function folderDone() {
    if(!folder.data.id) {
      return null
    } else {
       return <GameCard  title={folder.data.name!} img={folder.data.img!} isBig={true}/>
    }
  }
  useEffect(() => {

    getFiles(id);

  }, [files.request])
  return (
    <div className={s.main_container}>
      <div className={s.container}>
        <div className={s.main_card}>
            {
              folderDone()
            }
        </div>
        <div className={s.files}>
          {
            files.data.map((item) => {
              if (!item.id) {
                return <div className={s.title}>Loading...</div>
              } else {
                return <div className={s.file}>{item.name} {item.local}</div>
              }
            })
          }
        </div>
      </div>
      <Menu buttonType={"UPLOAD .JSON"} haveProgressBarr={true} />
    </div>
  )
}
