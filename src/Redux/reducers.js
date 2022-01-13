import { combineReducers } from '@reduxjs/toolkit'
import articleSlice from './articleSlice/articleSlice'
import snackbarSlice from './snackbarSlice/snackbarSlice'
import authReducer from './auth/reducer'
import snackBarReducer from './SnackBar/reducer'

const RootReducer = combineReducers({
  articles: articleSlice,
  snackbar: snackbarSlice,
  auth: authReducer,
  snackBar: snackBarReducer,
})

export default RootReducer
