import { FC } from 'react';
import s from './avatar.module.scss';

interface AvatarProps {
    name: string;
}

export const Avatar: FC<AvatarProps> = ({ name }) => {
    return (
        <div className={s.container}>
            <div className={s.userAvatar}>{name ? name.at(0) : "G"}</div>
            <div className={s.userName}>{name ?? "Guest"}</div>
        </div>
    )
}