import { FC } from "react";
import s from "./gameCard.module.scss";



interface GameCardProps {
  img: string;
  title: string;
  isBig?: boolean;
  keyElement?: any
}

export const GameCard: FC<GameCardProps> = ({ img, title, isBig,keyElement }) => {
  return (
    <div key={keyElement} className={s.card}>
      <img  src={img} alt={title} />
      <span className={isBig ? s.big_title : s.title}>{title}</span>
    </div>
  );
};
