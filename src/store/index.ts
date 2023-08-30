import {
    Action,
    configureStore,
    ThunkAction,
    combineReducers,
  } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import sessionStorage from 'redux-persist/lib/storage/session'

import gameSlice from './slice/gameSlice'
import folderSlice from './slice/folderSlice';
import fileSlice from './slice/fileSlice';
import userSlice from './slice/userSlice';

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
  whitelist: ['user'],
}

const rootReducer = combineReducers({
  game: gameSlice,
  folder: folderSlice,
  file: fileSlice,
  user: userSlice
})

const _persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: _persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
