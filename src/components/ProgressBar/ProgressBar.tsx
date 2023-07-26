import React, { FC } from 'react'
import q from "./progressBar.module.scss"

interface ProgressBarProps {
    percent: number,
    name: string
}

export const ProgressBar: FC<ProgressBarProps> = ({
    percent,
    name
}) => {
    return (
        <div className={q.container} >
            <div className={q.progress} style={{width: `${percent}%`}}>
                <div>
                    {name} -
                </div>
                <div>
                {percent}%
                </div>
            </div>
        </div>
    )
}
