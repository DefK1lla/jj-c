import React, { useState } from 'react'
import { SubmitHandler, useForm } from "react-hook-form"

import { auth, signup, putPassword } from '../shared/api/routs/user';
import { path } from "../shared/constants/paths";

import s from "./authentification.module.scss"

interface MyForm {
  username: string;
  password: string;
}



export const Authentification = () => {
  const [popup, setPopup] = useState<string>("")
  const {register, handleSubmit} = useForm<MyForm>({
    defaultValues: {}
  })

  const submit: SubmitHandler<MyForm> = async data => {
    if (window.location.href.includes(path.REGISTRATION_ROUTE)) {
      signup(data)
      .then((data)=>{
        if (data.statusText !== "Unauthorized") {
          const downloadAnchorNode = document.createElement('a');
          downloadAnchorNode.setAttribute("href", "/");
          downloadAnchorNode.click();
          downloadAnchorNode.remove();
        } 
        if (typeof data.data == "undefined") {
          alert("That login is already taken.")
        }
      })
    }

    if (window.location.href.includes(path.AUTH_ROUTE)) {
      auth(data).
      then((data) => {
        if(data.data) {
          window.location.href = path.HOME_ROUTE
        }
        else {
          alert("Incorrect login or password")
        }
      })
      
    }
    
  }
  
  if (window.location.href.includes(path.REGISTRATION_ROUTE)){
    return (
      <div className={s.container}>
        <form onSubmit={handleSubmit(submit)} className={s.form}>
          <div className={s.signup}>SignUp</div>
          <label htmlFor='login'>Login</label>
          <input id="login" className={s.login} title='login' type='text' {...register('username', { required: true})}/>
          <label htmlFor='password'>password</label>
          <input id="password" className={s.password} type='password' {...register('password', { required: true})}/>
          <button>Отправить</button>
        </form>
        <div className="Container" dangerouslySetInnerHTML={{__html: popup}}></div>
      </div>
    )
  } else if (window.location.href.includes(path.AUTH_ROUTE)) {
    return (
      <div className={s.container}>
        <form onSubmit={handleSubmit(submit)} className={s.form}>
          <div className={s.signin}>SignIn</div>
          <label htmlFor='login'>Login</label>
          <input id="login" className={s.login} title='login' type='text' {...register('username', { required: true})}/>
          <label htmlFor='password'>password</label>
          <input id="password" className={s.password} type='password' {...register('password', { required: true})}/>
          <button>Отправить</button>
        </form>
        <div className="Container" dangerouslySetInnerHTML={{__html: popup}}></div>
      </div>
    )
  } else {
    return<div>404</div>
  }
}