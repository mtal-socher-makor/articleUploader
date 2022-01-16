import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, END_POINT } from '../../utils/constants';
import * as snackbarActions from '../snackbarSlice/snackbarSlice';
import { useDispatch,  useSelector } from "react-redux"
export const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: null,
    chosenArticle: null,
    subscriptions: null,
  },

  reducers: {
    setArticels: (state, action) => {
      state.articles = action.payload;
    },
    setSubs: (state, action) => {
      state.subscriptions = action.payload;
    },
    setChosenArticle: (state, action) => {
      state.chosenArticle = action.payload;
    },
    clearChosenArticle: (state, action) => {
      state.chosenArticle = null;
    },
  },
});



//selectors

export const selectChosenArticle = state => state.articles.chosenArticle;

//actions

let payload ={}
export const getAllArticlesAsync = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}${END_POINT.ARTICLE}`);
    dispatch(setArticels(res.data));
    if (res.status === 200) {
      payload = {
        visible: true,
        timeout: 3000,
        message: 'Article load successfuly ',
        type: 'success',
      };

      dispatch(snackbarActions.setSnackBarAction(payload))
    }
  } catch (err) {
    payload = {
      visible: true,
      timeout: 3000,
      message: err.message,
      type: 'error',
    };
    dispatch(snackbarActions.setSnackBarAction(payload));
  }
}

export const getAllSubsAsync = () => async(dispatch) => {
   try {
     let resp = await axios.get(`${BASE_URL}${END_POINT.SUBSCRIPTION}`);
     if (resp.status === 200) {
       dispatch(setSubs(resp.data));
       dispatch(snackbarActions.setSnackBarAction({ type: 'success', timeout: 3000, message: 'Subscribers loaded successfuly', visible: true }));
     }
   } catch (err) {
     dispatch(snackbarActions.setSnackBarAction({ type: 'error', timeout: 3000, message: 'Network error', visible: true }));
   }
}

export const { setArticels,setSubs, setChosenArticle, clearChosenArticle } = articlesSlice.actions

export default articlesSlice.reducer
