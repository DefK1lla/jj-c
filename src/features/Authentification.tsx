import React from 'react'
import { SubmitHandler, useForm } from "react-hook-form"
import s from "./authentification.module.scss"

interface MyForm {
  name: string;
  password: string;
}

export const Authentification = () => {

  const {register, handleSubmit} = useForm<MyForm>({
    defaultValues: {}
  })

  const submit: SubmitHandler<MyForm> = data => {
    console.log(data);
    
  }

  return (
    <div className={s.container}>
      <form onSubmit={handleSubmit(submit)} className={s.form}>
        <input className={s.login} title='login' type='text' {...register('name', { required: true})}/>
        <input className={s.password} type='password' {...register('password', { required: true})}/>
        <button>Отправить</button>
      </form>
    </div>
  )
}