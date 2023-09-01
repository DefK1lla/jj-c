import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface AppState {
  loading: boolean
  errorMessage: string
  successMessage: string
}

const initialState: AppState = {
  loading: false,
  errorMessage: '',
  successMessage: '',
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppLoading: (state: AppState, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setAppSuccess: (state: AppState, action: PayloadAction<string>) => {
      state.successMessage = action.payload
    },
    setAppError: (state: AppState, action: PayloadAction<string>) => {
      state.errorMessage = action.payload
    },
  },
})

export const { setAppLoading, setAppError, setAppSuccess } = appSlice.actions
export const appReducer = appSlice.reducer
