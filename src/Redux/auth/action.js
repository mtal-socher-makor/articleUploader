import axios from 'axios';
// Actions
import * as actionSnackBar from '../snackbarSlice/snackbarSlice';
// Constants
// import { END_POINT, setAuthToken, storageKeys } from '../../utils/constants';
import { END_POINT, BASE_URL, setAuthToken } from '../../utils/constants';
import { SET_LOADING_INDICATOR_AUTH, LOGIN_SUCCESS, LOGOUT_SUCCESS } from './constants';

let payload;
export const login = (email, password) => async (dispatch) => {
  dispatch({ type: SET_LOADING_INDICATOR_AUTH, payload: true });

  try {
    if (localStorage.getItem('token') !== null) {
      dispatch({ type: LOGIN_SUCCESS, payload: { token: localStorage.getItem('token') } });
    } else {
      const headers = { 'Content-Type': 'application/json' };

      let res = await axios({
        method: 'PUT',
        url: `${BASE_URL}${END_POINT.AUTH}`,
        data: { username: email, password: password },
        headers: headers,
      });
      console.log('res', res);
      setAuthToken(res.data.token);
      localStorage.token = res.data.token;
      //const userContent = { ...res.data.user, ...res.data.payload.user }
      //localStorage.setItem('userContent', JSON.stringify(userContent))

      dispatch({ type: LOGIN_SUCCESS, payload: { token: res.data.token } });
      // dispatch({type:SET_LOADING_INDICATOR_2FA, payload:false});
      payload = {
        visible: true,
        timeout: 3000,
        message: 'Successfully connected',
        type: 'success',
      };
      dispatch(actionSnackBar.setSnackBarAction(payload));
    }
    // TYPE = can be email_confirm / mobile_app / dev
  } catch (error) {
    console.log('here', error);
    if (error.response.status === 404) {
      console.log(' i am here');
      payload = {
        visible: true,
        timeout: 3000,
        message: error.response.data.error,
        type: 'error',
      };
      dispatch(actionSnackBar.setSnackBarAction(payload));
    } else {
      if (error.response && error.response.data !== undefined) {
        payload = {
          visible: true,
          timeout: 2000,
          message: 'Login failed',
          type: 'error',
        };
        dispatch(actionSnackBar.setSnackBarAction(payload));
      } else {
        payload = {
          visible: true,
          timeout: 2000,
          message: 'Server error',
          type: 'error',
        };
        dispatch(actionSnackBar.setSnackBarAction(payload));
      }
    }
    dispatch({ type: SET_LOADING_INDICATOR_AUTH, payload: false });
  }
};

export const logout = () => async (dispatch) => {
  try {
    const res = await axios.delete(BASE_URL + END_POINT.AUTH);
    if (res.status === 200) {
      localStorage.clear();
      dispatch({ type: LOGOUT_SUCCESS });
      payload = {
        visible: true,
        timeout: 3000,
        message: 'Successfully disconnected',
        type: 'success',
      };
      dispatch(actionSnackBar.setSnackBarAction(payload));
    }
  } catch (error) {
    payload = {
      visible: true,
      timeout: 3000,
      message: 'Logout failed',
      type: 'error',
    };
    dispatch(actionSnackBar.setSnackBarAction(payload));
  }
};
