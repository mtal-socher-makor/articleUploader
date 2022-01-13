import axios from 'axios'
// Actions
import * as actionSnackBar from '../SnackBar/action'
// Constants
// import { END_POINT, setAuthToken, storageKeys } from '../../utils/constants';
import { END_POINT, BASE_URL, setAuthToken } from '../../utils/constants'
import { SET_LOADING_INDICATOR_AUTH, LOGIN_SUCCESS, LOGOUT_SUCCESS } from './constants'


export const login = (email, password) => async (dispatch) => {
  dispatch({ type: SET_LOADING_INDICATOR_AUTH, payload: true })

  try {
    // TYPE = can be email_confirm / mobile_app / dev
    const headers = { 'Content-Type': 'application/json' }

    let res = await axios({
      method: 'PUT',
      url: `${BASE_URL}${END_POINT.AUTH}`,
      data: { username: email, password: password },
      headers: headers,
    })
    console.log('res', res)
    setAuthToken(res.data.token)
    localStorage.token = res.data.token
    //const userContent = { ...res.data.user, ...res.data.payload.user }
    //localStorage.setItem('userContent', JSON.stringify(userContent))
    dispatch({ type: LOGIN_SUCCESS, payload: { token: res.data.token }})
    // dispatch({type:SET_LOADING_INDICATOR_2FA, payload:false});
    dispatch(actionSnackBar.setSnackBar('success', 'Successfully connected', 2000))
  } catch (error) {
    console.log('here', error)
    if (error.response.status === 404) {
      console.log(' i am here')
      dispatch(actionSnackBar.setSnackBar('error', error.response.data.error, 3000))
    } else {
      if (error.response && error.response.data !== undefined) {
        dispatch(actionSnackBar.setSnackBar('error', 'Login failed', 2000))
      } else {
        dispatch(actionSnackBar.setSnackBar('error', 'Server error', 2000))
      }
    }
    dispatch({ type: SET_LOADING_INDICATOR_AUTH, payload: false })
  }
}

export const logout = () => async (dispatch) => {
  try {
    const res = await axios.delete(BASE_URL + END_POINT.AUTH)
    if (res.status === 200) {
      localStorage.clear()
      dispatch({ type: LOGOUT_SUCCESS })
      dispatch(actionSnackBar.setSnackBar('success', 'Successfully disconnected', 2000))
    }
  } catch (error) {
    dispatch(actionSnackBar.setSnackBar('error', 'Logout failed', 3000))
  }
  
}
