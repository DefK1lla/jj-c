import { FC, useId } from "react";
import { Link } from "react-router-dom";
import { path } from "../../shared/constants/paths";

import s from "./gameFileName.module.scss";

interface INewFile {
    id: string,
    name: string,
    local: string
}

interface INewFiles {
    newFiles?: INewFile[]
}

export const GameFileName: FC<INewFiles> = ({ newFiles }) => {
    return(
        <div className={s.container}>
            {newFiles?.map(item => {
                console.log(item);
                const id = Math.random().toString(16).slice(2);
                return (
                    <Link to={`${path.TRANSLATE_ROUTE}?id=${item.id}`}>
                        <div key={id} className={s.name}>{item.name} {item.local}</div>
                    </Link>
                )
            })}
        </div>
    )
}