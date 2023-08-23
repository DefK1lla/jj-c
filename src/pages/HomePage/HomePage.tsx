import { FC, useId, useState, useEffect } from 'react'

import { mockFilesGames, mockFilesUsers } from '../../shared/mockfolder/mock';
import { GameCard } from '../../components';
import { Menu } from '../../components/Menu/Menu';

import s from "./homePage.module.scss";

export const HomePage = () => {
  const [games, setGames] = useState<any[]>([]);

  useEffect(() => {
    
    async function getGames() {
      try {
        
        const response = await fetch("http://localhost:7000/game", {
          method: "GET",
        });
        
        const data = await response.json();
        
        setGames(data);
      } catch (error) {
        
        console.error(error);
      }
    }
    
    getGames();
  }, []); 
                                                   
  return (<div className={s.mainContainer}>
    <div className={s.container}>{
        games.map((item) => {
        return (
          <a className={s.route} href={`/folder?id=${item.id}`}>
            <GameCard key={item.name} img={item.img} title={item.name} />
          </a>
          )
        })
      }
    </div>
      <Menu buttonType={"CREATE GAME"}/>
    </div>
  )
}
