import Axios from 'axios';
import { store } from '../../store';
import {
  setAppError,
  setAppLoading,
  setAppSuccess,
} from '../../store/slice/appSlice';

export * from './endpoints'

export const BASE_URL = 'http://localhost:7000'

export const api = Axios.create({
  baseURL: BASE_URL + '/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  function (config) {
    store.dispatch(setAppLoading(true))

    return config
  },
  function (error) {
    store.dispatch(setAppLoading(false))
    return error
  }
)

api.interceptors.response.use(
  function (response) {
    store.dispatch(setAppLoading(false))

    if (response.config.method !== 'get') {
      store.dispatch(setAppSuccess(response.data.messge))
    }
    return response
  },
  function (error) {
    store.dispatch(setAppLoading(false))
    console.log(error)
    const errorPath = error.response?.data.data?.error || null
    let errorMessage = ''

    if (errorPath) {
      for (let err in errorPath) {
        errorMessage += errorPath[err] + '\n'
      }
    }

    store.dispatch(
      setAppError(
        errorMessage ||
          error.response?.data.message ||
          error.response?.data.messge ||
          error.message
      )
    )
    return error
  }
)
