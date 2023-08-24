import { 
  IGame,
  IGetGame,
  ISetGame,
  IDeleteGame,
  IUpdateGame
 } from '../../types/game'
  
import { api, endpoints_game } from '../index'
import { AxiosPromise } from 'axios'

export const gamesGet = (
): AxiosPromise<IGame[]> => {
  return api.get(endpoints_game.get_games)
}

export const gameGet = (
  getGameForm: IGetGame
): AxiosPromise<IGame> => {
  return api.post(endpoints_game.get_game, getGameForm)
}

export const gameSet = (
  setGameForm: ISetGame
): AxiosPromise<IGame> => {
  return api.post(endpoints_game.set_game, setGameForm)
}

export const gameDelete = (
  deleteGameForm: IDeleteGame
): AxiosPromise<IGame> => {
  return api.post(endpoints_game.delete_game, deleteGameForm)
}

export const gameUpdate = (
  updateGameForm: IUpdateGame 
): AxiosPromise<IGame> => {
  return api.post(endpoints_game.update_game, updateGameForm)
}


