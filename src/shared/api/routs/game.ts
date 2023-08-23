import { 
  IGame,
  IGetGame,
  ISetGame,
  IDeleteGame,
  IUpdateGame
 } from '../../types/game'
  
import { api, endpoints_game } from '../index'
import { AxiosPromise } from 'axios'

export const getGames = (
): AxiosPromise<IGame[]> => {
  return api.get(endpoints_game.get_games)
}

export const gameGet = (
  getGameForm: IGetGame
): AxiosPromise<IGame> => {
  const requestData = {
    id: getGameForm.id
  }
  return api.post(endpoints_game.get_game, requestData)
}

export const gameSet = (
  setGameForm: ISetGame
): AxiosPromise<IGame> => {
  const requestData = {
    id: setGameForm.id
  }
  return api.post(endpoints_game.set_game, requestData)
}

export const gameDelete = (
  deleteGameForm: IDeleteGame
): AxiosPromise<IGame> => {
  const requestData = {
    id: deleteGameForm.id
  }
  return api.post(endpoints_game.delete_game, requestData)
}

export const gameUpdate = (
  updateGameForm: IUpdateGame 
): AxiosPromise<IGame> => {
  const requestData = {
    id: updateGameForm.id,
    name: updateGameForm.name,
    img: updateGameForm.img
  }
  return api.post(endpoints_game.update_game, requestData)
}


