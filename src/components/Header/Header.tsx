import { useEffect, useState } from 'react'
import { getUser, logout } from '../../shared/api/routs/user'
import { path } from '../../shared/constants/paths'
import { useNavigate } from 'react-router'

import s from './Header.module.scss'
import { Link } from 'react-router-dom'


const Header = () => {
  //TODO add button display depending on the router
  const islogining = window.location.pathname === path.AUTH_ROUTE || window.location.pathname === path.CHANGE_PASSPORT_ROUTE || window.location.pathname === path.REGISTRATION_ROUTE
  const navigate = useNavigate()
  const [logined, setLogined] = useState(false);


  async function getAuthor() {
    setLogined((await getUser()).data.id ? true : false)
  }
  
  function onClickLogout(e: any) {
    e.preventDefault()
    setLogined(item => !item)
    logout()
  }

  function onClickRegistration(e: any) {
    e.preventDefault()
    navigate(path.REGISTRATION_ROUTE)
  }

  function onClickSignin(e: any) {
    e.preventDefault()
    navigate(path.AUTH_ROUTE)
  }

  function onClickRePassword(e: any) {
    e.preventDefault()
    navigate(path.CHANGE_PASSPORT_ROUTE)
  }

  useEffect(() => {
    getAuthor()
  }, [logined])
  return (
    <div className={s.main_container} style={{ width: islogining ? "100%" : undefined}}>
      <div className={s.container}>
        <Link to={path.HOME_ROUTE}>
          <div className={s.title}>JACKJSON</div>
          <div className={s.description}>The .json translate tool | alpha</div>
        </Link>
      </div>
      <div className={ islogining ? s.route : s.routes}>
        <div className={s.log}>
          {
            logined ? 
            <a onClick={onClickLogout} href="#">Logout</a> : 
            <a onClick={onClickSignin}  href="#">Login</a>
          }
        </div>
        <div className={s.sig}>
          {
            logined ?
            <a onClick={onClickRePassword} href='#'>Password reset</a> :
            <a onClick={onClickRegistration} href="#">SignUp</a>
          }
        </div>
      </div>
    </div>
  )
}

export default Header
