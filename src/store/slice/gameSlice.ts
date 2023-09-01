import { createSlice } from '@reduxjs/toolkit'
import { IGame } from '../../shared/types/game'

interface IGameState {
    games: {
      data: IGame[]
      request: boolean
    }
    game: {
      data: IGame
      request: boolean
    }
}

interface IActionPayload {
  type: string
  payload: {
    games?:IGame[]
    game?: IGame
  }
}

const initialState: IGameState = {
  games: { data: [{
      id: null,
    name: null,
    img: null,
    author_id: null,
    }],
    request: false
  },
  game: {
    data: {
      id: null,
      name: null,
      img: null,
      author_id: null,
    },
    request: false
  }
}

const gameSlice = createSlice({
  name: 'gameSlice',
  initialState,
  reducers: {
    newGamesRequest: (state, action: IActionPayload) => {
      state!.games.data = action.payload.games!.map((item) => {
        return item
      });
      state.games.request = true;
    },
    newGameRequest: (state, action: IActionPayload) => {
      state.game.data = action.payload.game!
      state.game.request = true
    }
  }
})

export const {
  newGamesRequest,
  newGameRequest
} = gameSlice.actions

export default gameSlice.reducer
