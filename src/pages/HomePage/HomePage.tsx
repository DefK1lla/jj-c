import { FC } from 'react'

import { ExamplePage } from '../ExamplePage/ExamplePage';
import { mockFilesGames, mockFilesUsers } from '../../shared/mockfolder/mock';
import { GameCard } from '../../components';
import s from "./homePage.module.scss";
import { Menu } from '../../components/Menu/Menu';

export const HomePage = () => {
  return (<div className={s.mainContainer}>
    <div className={s.container}>{
        mockFilesGames.map((item) => {
        return <GameCard img={item.url} title={item.name} />
        })
      }
    </div>
      <Menu />
    </div>
  )
}
