import { FC } from "react";
import s from "./gameCard.module.scss";

interface GameCardProps {
  img: string;
  title: string;
  style?: any
}

export const GameCard: FC<GameCardProps> = ({ img, title, style }) => {
  return (
    <div className={s.card}>
      <img src={img} alt={title} />
      <span className={s.title} style={style}>{title}</span>
    </div>
  );
};
