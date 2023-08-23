import { FC } from "react";
import s from "./gameCard.module.scss";



interface GameCardProps {
  img: string;
  title: string;
  isBig?: boolean
}

export const GameCard: FC<GameCardProps> = ({ img, title, isBig }) => {
  return (
    <div className={s.card}>
      <img src={`data:image/png;base64,${img}`} alt={title} />
      <span className={isBig ? s.big_title : s.title}>{title}</span>
    </div>
  );
};
