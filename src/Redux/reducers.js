import { combineReducers } from '@reduxjs/toolkit';
import articleSlice from './articleSlice/articleSlice';
import snackbarSlice from './snackbarSlice/snackbarSlice'
const RootReducer = combineReducers({
  articles: articleSlice,
  snackbar: snackbarSlice,
});

export default RootReducer;
