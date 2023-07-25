import { FC } from "react";
import s from "./gameCard.module.scss";

interface GameCardProps {
  img: string;
  title: string;
}

export const GameCard: FC<GameCardProps> = ({ img, title }) => {
  return (
    <div className={s.card}>
      <img src={img} alt={title} />
      <span className={s.title}>{title}</span>
    </div>
  );
};
