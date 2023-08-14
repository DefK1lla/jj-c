import { FC } from "react";

import { Avatar } from "../Avatar/Avatar";
import { mockFilesUsers } from "../../shared/mockfile/mock";
import { GameFileName } from "../GameFileName/GameFileName";
import { Button } from "../Button/Button";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import { percents } from "../../shared/mockfile/mock_percents";

import s from "./menu.module.scss";


interface Menu {
    haveProgressBarr?: boolean
}

export const Menu: FC<Menu> = ({ haveProgressBarr }) => {
    return(
        <div className={s.menu}>
            <Avatar name={mockFilesUsers[0].name}/>
            {haveProgressBarr ? <div className={s.progress_bar_title}>The Jackbox Party Starter</div> : null }
            <div className={s.progress_bar_container}>
            {haveProgressBarr ? percents.map(item => {
               return <ProgressBar percent={item.percent} name={item.name} />
            }) : null}

            </div>
            <div className={s.recent_json_title}>Recent jsons</div>
            <GameFileName />
            <div className={s.button}>
                <Button >UPLOAD .JSON</Button>
            </div>
        </div>
    )
}