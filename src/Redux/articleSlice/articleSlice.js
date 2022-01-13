import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL, END_POINT } from '../../utils/constants'
import * as snackbarActions from '../snackbarSlice/snackbarSlice'
export const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: null,
    chosenArticle: null,
  },

  reducers: {
    setArticels: (state, action) => {
      state.articles = action.payload
    },
    setChosenArticle: (state, action) => {
      state.chosenArticle = action.payload
    },
  },
})

let action = {}
export const getAllArticles = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/${END_POINT.ARTICLE}`)
    if (res.status === 200) {
      dispatch(setArticels(res.data))
      action = {
        payload: {
          visible: true,
          timeout: 3000,
          message: 'Article load successfuly ',
          type: 'success',
        },
      }
      snackbarActions.setSnackBarAction(action)
    }
  } catch (err) {
    action = {
      payload: {
        visible: true,
        timeout: 3000,
        message: err.message,
        type: 'error',
      },
    }
    snackbarActions.setSnackBarAction(action)
  }
}

export const { setArticels, setChosenArticle } = articlesSlice.actions

export default articlesSlice.reducer
