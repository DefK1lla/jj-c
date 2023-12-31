import React, {useEffect, useState} from 'react'

import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux';
import { Menu } from '../../components/Menu/Menu';
import { GameCard } from '../../components/GameCard/GameCard';
import { foldersGet } from '../../shared/api/routs/folder';
import { gameGet } from '../../shared/api/routs/game';
import { newFoldersRequest } from "../../store/slice/folderSlice";
import { newGameRequest } from '../../store/slice/gameSlice';
import { Link } from 'react-router-dom';
import { path } from '../../shared/constants/paths';

import s from "./folderPage.module.scss";

export const FolderPage = () => {
  const dispatch = useAppDispatch();

  const { game } = useAppSelector(
    state => state.game
  )
  const { folders } = useAppSelector(
    state => state.folder
  )

  const getFolders = async (id: string) => {
    try {
      const data = await foldersGet({ id: id});
      const game = await gameGet({ id: id });

      dispatch(newFoldersRequest({ folders: data.data }))
      dispatch(newGameRequest({ game: game.data }))
    } catch (e) {
      console.error(e)
    }
  }
  
  const id: string = window.location.search.slice(1).split("=")[1];

  function gameDone() {
    if (!game.data.id) {
      return null
    } else {
      return (
        <Link className={s.rout_game} to={`${path.HOME_ROUTE}`}>
          <GameCard  title={game.data.name!} img={game.data.img!} isBig={true} />
        </Link>
      )
    }
  }
  useEffect(() => {

    getFolders(id);

  }, [folders.request]); 

  return (
    <div className={s.main_container}>
      <div className={s.container}>
        <div className={s.main_card}>
          {
            gameDone()
          }
        </div>
        <div className={s.child_cards}>
            {folders.data.map(item => {
              const id = Math.random().toString(16).slice(2);
              if (!item.id) {
                return <div key={id} className={s.title}>Loading...</div>
              } else {
                return (
                  <Link key={id} className={s.route} to={`/file?id=${item.id}`}>
                    <GameCard title={item.name!} img={item.img!} />
                  </Link>
                )
              }
            })}
        </div>
      </div>
      <Menu buttonType={"CREATE FOLDER"} haveProgressBarr={true} />
    </div>
  )
}
