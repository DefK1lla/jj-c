import React from 'react'

import { Menu } from '../../components/Menu/Menu';
import { GameCard } from '../../components/GameCard/GameCard';
import { folder } from '../../shared/mockfolder/mock_folder';

import s from "./folderPage.module.scss";

export const FolderPage = () => {
  return (
    <div className={s.main_container}>
      <div className={s.container}>
        <div className={s.main_card}>
            <GameCard  title={folder.name} img={folder.url} style={{ fontSize: "32px", lineHeight: "32px" }} />
        </div>
        <div className={s.child_cards}>
            {folder.folders.map(item => {
              return <GameCard title={item.name} img={item.url} />
            })}
        </div>
      </div>
      <Menu haveProgressBarr={true} />
    </div>
  )
}
