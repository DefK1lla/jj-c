import React from 'react'

import { Menu } from '../../components/Menu/Menu';
import { GameCard } from '../../components/GameCard/GameCard';
import { file } from '../../shared/mockfile/mock_file';

import s from "./folderPage.module.scss";

export const FolderPage = () => {
  return (
    <div className={s.main_container}>
      <div className={s.container}>
        <div className={s.main_card}>
            <GameCard  title={file.name} img={file.url} />
        </div>
        <div className={s.child_cards}>
            {file.folders.map(item => {
              return <GameCard title={item.name} img={item.url} />
            })}
        </div>
      </div>
      <Menu haveProgressBarr={true} />
    </div>
  )
}
