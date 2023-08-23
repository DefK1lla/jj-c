import { FC, useId } from "react";

import { mockFilesGames } from "../../shared/mockfolder/mock";

import s from "./gameFileName.module.scss";

export const GameFileName: FC = () => {
    const items = ():string[] => {
        const news = mockFilesGames.sort(
            (a, b) => {
                return +a.user_id - +b.user_id;
            }
        );
        let result = [];
        for(let i = 0; i < 4; i++) {
            result.push(news[i].name);
        }
        return result;
    }
    return(
        <div className={s.container}>
            {items().map(item => {
                const id = useId()
                return <div key={id} className={s.name}>{item}</div>
            })}
        </div>
    )
}