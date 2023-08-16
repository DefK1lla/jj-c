import React from 'react'

import { Menu } from '../../components/Menu/Menu';
import { GameCard  } from '../../components/GameCard/GameCard';
import { file } from '../../shared/mockfolder/mock_file';

import s from "./filePage.module.scss";

export const FilePage = () => {
  return (
    <div className={s.main_container}>
      <div className={s.container}>
        <div className={s.main_card}>
            <GameCard  title={file.name} img={file.url} isBig={true}/>
        </div>
        <div className={s.files}>
          {
            file.files.map(item => {
              return <div className={s.file}>{item.name}</div>
            })
          }
        </div>
      </div>
      <Menu haveProgressBarr={true} />
    </div>
  )
}
