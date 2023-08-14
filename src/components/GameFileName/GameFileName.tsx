import { FC } from "react";

import s from "./gameFileName.module.scss";
import { mockFilesGames } from "../../shared/mockfile/mock";

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
                return <div className={s.name}>{item}</div>
            })}
        </div>
    )
}