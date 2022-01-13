import { combineReducers } from '@reduxjs/toolkit'
import articleSlice from './articleSlice/articleSlice'
import snackbarSlice from './snackbarSlice/snackbarSlice'
import authReducer from './auth/reducer'

const RootReducer = combineReducers({
  articles: articleSlice,
  snackbar: snackbarSlice,
  auth: authReducer,
})

export default RootReducer
