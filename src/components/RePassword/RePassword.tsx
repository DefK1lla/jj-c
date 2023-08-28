import React from 'react'
import { SubmitHandler, useForm } from "react-hook-form"

import s from "./rePassword.module.scss";

interface MyForm {
    old_password: string,
    new_password: string,
}

export const RePassword = () => {

    const {register, handleSubmit} = useForm<MyForm>({
        defaultValues: {}
    })

    const submit: SubmitHandler<MyForm> = async data => {
        
    }
    
    return (
        <div className={s.container}>
          <form onSubmit={handleSubmit(submit)} className={s.form}>
            <label htmlFor='login'>Login</label>
            <input id="login" className={s.login} title='login' type='text' {...register('old_password', { required: true})}/>
            <input className={s.password} type='password' {...register('new_password', { required: true})}/>
            <button>Отправить</button>
          </form>
        </div>
      )
}