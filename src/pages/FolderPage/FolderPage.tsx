import React, {useEffect, useState} from 'react'

import { Menu } from '../../components/Menu/Menu';
import { GameCard } from '../../components/GameCard/GameCard';
import { folder } from '../../shared/mockfolder/mock_folder';

import s from "./folderPage.module.scss";

interface IFolders {
  
}

export const FolderPage = () => {
  const [folders, setFolders] = useState<any[]>([]);
  const [game, setGame] = useState<any>({})
  const id: string = window.location.search.slice(1).split("=")[1];
  useEffect(() => {
    
    async function getFolders() {
      try {
        const res = await fetch("http://localhost:7000/game/id", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id })
        });
        const gameData = await res.json();

        setGame(gameData);
        
        const response = await fetch("http://localhost:7000/folder/gameId", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id })
        });
        
        const data = await response.json();
        setFolders(data);
      } catch (error) {
        
        console.error(error);
      }
    }
    
    getFolders();
  }, []); 

  return (
    <div className={s.main_container}>
      <div className={s.container}>
        <div className={s.main_card}>
            <GameCard  title={game.name} img={game.img} isBig={true} />
        </div>
        <div className={s.child_cards}>
            {folders.map(item => {
              console.log(item.id)
              return (
                <a className={s.route} href={`/file?id=${item.id}`}>
                  <GameCard title={item.name} img={item.img} />
                </a>
              )
            })}
        </div>
      </div>
      <Menu buttonType={"CREATE FOLDER"} haveProgressBarr={true} />
    </div>
  )
}
