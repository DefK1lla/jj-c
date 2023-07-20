import { FC, HTMLProps } from 'react'
import s from "./input.module.scss"


interface InputProps extends HTMLProps<HTMLInputElement> {
  label?: string
  id?: string
  name: string;
  type?: string
}

export const Input: FC<InputProps> = ({ label, type = "text", ...props }) => {
  return (
    <div className={s.container}>
      {label && <label htmlFor={props.id}>{label}:</label>}
      <input
        {...props}
        type={type}
        className={s.input}
      />
    </div>

  )
}
