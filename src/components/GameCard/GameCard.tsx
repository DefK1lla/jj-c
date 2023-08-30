import { FC } from "react";
import s from "./gameCard.module.scss";



interface GameCardProps {
  img: string;
  title: string;
  isBig?: boolean;
  keyElement?: any
}

export const GameCard: FC<GameCardProps> = ({ img, title, isBig,keyElement }) => {
  const id = Math.random().toString(16).slice(2);
  return (
    <div key={id} className={s.card}>
      <img key={id + 1}  src={img} alt={title} />
      <span key={id + 2} className={isBig ? s.big_title : s.title}>{title}</span>
    </div>
  );
};
