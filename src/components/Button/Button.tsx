import { FC } from 'react'
import s from "./Button.module.scss"
import cn from "classnames"

interface ButtonProps {
  onClick?: () => void
  children: string
  ref?: React.RefObject<HTMLButtonElement>
  action?: "increase" | "decrease"

}

export const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={cn(s.button, {
        [s.inc]: props.action === "increase",
        [s.dec]: props.action === "decrease"
      })}
    >
      {children}
    </button>
  )
}
