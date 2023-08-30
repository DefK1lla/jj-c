import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUser, logout } from '../../shared/api/routs/user'
import { path } from '../../shared/constants/paths'
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux'
import { setUser } from '../../store/slice/userSlice'

import s from './Header.module.scss'


const Header = () => {
  //TODO add button display depending on the router
  const islogining = window.location.pathname === path.AUTH_ROUTE || window.location.pathname === path.CHANGE_PASSPORT_ROUTE || window.location.pathname === path.REGISTRATION_ROUTE
  const [logined, setLogined] = useState(false);
  
  const { id, username } = useAppSelector(
    state => state.user
  )
  const dispatch = useAppDispatch()

  async function getAuthor() {
    const user = (await getUser()).data
    dispatch(setUser({ id: user.id!, username: user.username!}))
  }
  
  function onClickLogout(e: any) {
    setLogined(item => !item)
    logout()
  }


  useEffect(() => {
    getAuthor()

  }, [logined, islogining, id])
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
          <Link onClick={id ? onClickLogout : undefined} to={path.AUTH_ROUTE}>{id ? "LogOut" : "Login"}</Link>
        </div>
        <div className={s.sig}>
          <Link to={id ? path.CHANGE_PASSPORT_ROUTE : path.REGISTRATION_ROUTE}>{id ? "Reset password" : "SigIn"}</Link>
        </div>
      </div>
    </div>
  )
}

export default Header
