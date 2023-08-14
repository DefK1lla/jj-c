import { FC } from "react";

import { Avatar } from "../Avatar/Avatar";
import { mockFilesUsers } from "../../shared/mockfile/mock";

import s from "./menu.module.scss";
import { RecentJsons } from "../RecentJsons/RecentJson";
import { GameFileName } from "../GameFileName/GameFileName";
import { Button } from "../Button/Button";

export const Menu: FC = () => {
    return(
        <div className={s.menu}>
            <Avatar name={mockFilesUsers[0].name}/>
            <RecentJsons />
            <GameFileName />
            <div className={s.button}>
                <Button >UPLOAD .JSON</Button>
            </div>
        </div>
    )
}