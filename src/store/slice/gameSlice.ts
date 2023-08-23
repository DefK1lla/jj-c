import { createSlice } from '@reduxjs/toolkit'
import { IGame } from '../../shared/types/game'

interface IGameState {
    datas: IGame[]
    data: IGame
}

interface IActionPayload {
  type: string
  payload: {
    datas: IGame[]
    data: IGame
  }
}

const initialState: IGameState = {
  datas: [{
    id: null,
  name: null,
  img: null,
  author_id: null,
  }],
  data: {
    id: null,
  name: null,
  img: null,
  author_id: null,
  }
}



const gameSlice = createSlice({
  name: 'gameSlice',
  initialState,
  reducers: {
    newGamesRequested: (state, action: IActionPayload) => {
      state.datas.concat(action.payload.datas.map((data: IGame) => {
        return {
          id: data.id,
          name: data.name,
          img: data.img,
          author_id: data.author_id
        }
      }))
    },
    newGameRequest: (state, action: IActionPayload) => {
      state.data = {
        id: action.payload.data.id,
        name: action.payload.data.name,
        img: action.payload.data.img,
        author_id: action.payload.data.author_id
      } 
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  newGamesRequested,
  newGameRequest
} = gameSlice.actions

export default gameSlice.reducer
