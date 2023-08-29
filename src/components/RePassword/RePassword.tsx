import React from 'react'
import { SubmitHandler, useForm } from "react-hook-form"
import { putPassword, getUser } from '../../shared/api/routs/user';

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
      const user = (await getUser()).data
      putPassword({
        id: user.id!,
        old_password: data.old_password,
        new_password: data.new_password
      })
      .then(() => {
        alert("Success")
      })
    }
    
    return (
        <div className={s.container}>
          <form onSubmit={handleSubmit(submit)} className={s.form}>
            <div className={s.signup}>Reset password</div>
            <label htmlFor='old_password'>Old password</label>
            <input id="old_password" className={s.login} title='old_password' type='password' {...register('old_password', { required: true})}/>
            <label htmlFor='new_password'>New password</label>
            <input id='new_password' className={s.password} type='password' {...register('new_password', { required: true})}/>
            <button>Save</button>
          </form>
        </div>
      )
}