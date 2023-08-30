import { FC, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux'
import { GameCard } from '../../components';
import { Menu } from '../../components/Menu/Menu';
import { gamesGet } from '../../shared/api/routs/game';
import { newGamesRequest } from '../../store/slice/gameSlice';

import s from "./homePage.module.scss";
import { Link } from 'react-router-dom';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { games } = useAppSelector(
    state => state.game
  )
  const getGames = async () => {
    try {
      const data = await gamesGet();
      
      dispatch(newGamesRequest({ games: data.data }))
    } catch (e) {
      console.error(e)
    }
  }
  
  useEffect(() => {
    
      getGames()
      
  }, [games.request]); 
                                                   
  return (
      <div className={s.mainContainer}>
        <div className={s.container}>{
            games.data.map((item) => {
              if (!item.id) {
                return <div className={s.title}>Loading...</div>
              } else {
                return (
                  <Link className={s.route} to={`/folder?id=${item.id}`}>
                    <GameCard img={item.img!} title={item.name!} />
                  </Link>
                  )
              }
           })
          }
        </div>
        <Menu buttonType={"CREATE GAME"}/>
      </div>
  )
}
