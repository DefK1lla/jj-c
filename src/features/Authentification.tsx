import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from 'react-router';

import { auth, signup} from '../shared/api/routs/user';
import { path } from "../shared/constants/paths";

import s from "./authentification.module.scss"

interface MyForm {
  username: string;
  password: string;
}



export const Authentification = () => {
  const navigate = useNavigate()
  const [refresh, setRefersh] = useState(false);
  const {register, handleSubmit} = useForm<MyForm>({
    defaultValues: {}
  })

  const submit: SubmitHandler<MyForm> = async (data) => {
    
    if (window.location.href.includes(path.REGISTRATION_ROUTE)) {
      signup(data)
      .then((data)=>{
          if (data.statusText !== "Unauthorized") {
            setRefersh(item => !item)
            navigate(path.HOME_ROUTE)
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
          setRefersh(item => !item)
          navigate(path.HOME_ROUTE)
        }
        else {
          alert("Incorrect login or password")
        }
      })
      
    }
    
  }
  useEffect(() => {

  }, [refresh])
  if (window.location.href.includes(path.REGISTRATION_ROUTE)){
    return (
      <div className={s.container}>
        <form onSubmit={handleSubmit(submit)} className={s.form}>
          <div className={s.signup}>SignUp</div>
          <label htmlFor='login'>Login</label>
          <input id="login" className={s.login} title='login' type='text' {...register('username', { required: true})}/>
          <label htmlFor='password'>Password</label>
          <input id="password" className={s.password} type='password' {...register('password', { required: true})}/>
          <button>Send</button>
        </form>
      </div>
    )
  } else if (window.location.href.includes(path.AUTH_ROUTE)) {
    return (
      <div className={s.container}>
        <form onSubmit={handleSubmit(submit)} className={s.form}>
          <div className={s.signin}>SignIn</div>
          <label htmlFor='login'>Login</label>
          <input id="login" className={s.login} title='login' type='text' {...register('username', { required: true})}/>
          <label htmlFor='password'>Password</label>
          <input id="password" className={s.password} type='password' {...register('password', { required: true})}/>
          <button>Send</button>
        </form>
      </div>
    )
  } else {
    return<div>404</div>
  }
}