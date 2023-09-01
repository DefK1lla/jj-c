import React, { FC } from 'react'
import q from "./progressBar.module.scss"

interface ProgressBarProps {
    percent: number,
    name: string,
    local: string,
}

export const ProgressBar: FC<ProgressBarProps> = ({
    percent,
    name,
    local
}) => {
    let color: string = "#FFFFFF"
    if (percent < 30) {
        color = "#FF5C00";
    } else if (percent < 50) {
        color = "#FFA800"
    } else if (percent < 90) {
        color = "#EBFF00";
    } else {
        color = "#70FF00";
    }
    return (
        <div className={q.container} >
            <div className={q.progress} style={{width: `${percent}%`, backgroundColor: color}}>
                <div className={q.name}>
                    {name} {local} -
                </div>
                <div className={q.percent}>
                {percent}%
                </div>
            </div>
        </div>
    )
}
