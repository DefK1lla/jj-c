import { useEffect, useState } from 'react'
import { getUser, logout } from '../../shared/api/routs/user'
import { path } from '../../shared/constants/paths'

import s from './Header.module.scss'


const Header = () => {
  //TODO add button display depending on the router
  const islogining = window.location.pathname === path.AUTH_ROUTE || window.location.pathname === path.CHANE_PASSPORT_ROUTE || window.location.pathname === path.REGISTRATION_ROUTE
  const [logined, setLogined] = useState(false)
  async function getAuthor() {
    setLogined((await getUser()).data.id ? true : false)
  }
  
  function onClickLogout() {
    logout()
  }

  useEffect(() => {
    getAuthor()
  }, [])
  return (
    <div className={s.main_container} style={{ width: islogining ? "100%" : undefined}}>
      <div className={s.container}>
        <div className={s.title}>JACKJSON</div>
        <div className={s.description}>The .json translate tool | alpha</div>
      </div>
      <div className={s.routs}>
        <div className={s.log}>
          {
            logined ? 
            <a onClick={onClickLogout} href="/logout">Logout</a> : 
            <a href="/auth">Login</a>
          }
        </div>
        <div className={s.sig}>
          {
            logined ?
            undefined :
            <a href="/registration">SignUp</a>
          }
        </div>
      </div>
    </div>
  )
}

export default Header
