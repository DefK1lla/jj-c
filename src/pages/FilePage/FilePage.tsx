import React, { useEffect, useState } from 'react'

import { Menu } from '../../components/Menu/Menu';
import { GameCard  } from '../../components/GameCard/GameCard';

import s from "./filePage.module.scss";

interface IFile {
  id: string;
  name: string;
  data: string;
  local:string;
  folder_id: string;
}


export const FilePage = () => {
  const [files, setFiles] = useState<IFile[]>([]);
  const [folder, setFolder] = useState<any>({name: "", img: ""});

  const id = window.location.search.slice(1).split("=")[1];

  useEffect(() => {
    async function getFolder() {
      const getfolder = await fetch("http://localhost:7000/folder/id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id })
        });
        const data = await getfolder.json();
        setFolder(data);
      }

    getFolder();

    async function getFiles() {
      const getFiles = await fetch("http://localhost:7000/file/id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id })
      });
      
      const data = await getFiles.json();
      console.log(data)
      setFiles(data)
    }

    getFiles();
  }, [])
  return (
    <div className={s.main_container}>
      <div className={s.container}>
        <div className={s.main_card}>
            <GameCard  title={folder.name} img={folder.img} isBig={true}/>
        </div>
        <div className={s.files}>
          {
            files.map((item: IFile) => {
              return <div className={s.file}>{item.name} {item.local}</div>
            })
          }
        </div>
      </div>
      <Menu buttonType={"UPLOAD .JSON"} haveProgressBarr={true} />
    </div>
  )
}
