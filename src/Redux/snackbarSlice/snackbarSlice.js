import { createSlice } from "@reduxjs/toolkit";

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: {
    visible: false,
    timeout: 3000,
    message: '',
    type: 'success', // error | warning | info | success
  },

  reducers: {
    setSnackbar: (state, action) => {
      state.visible = action.payload.visible;
      state.timeout = action.payload.timeout;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    disableSnackBar: (state, action) => {
      state.visible = false;
    },
  },
});

export const disableSnackBarAction = () => (dispatch) => {
  dispatch(disableSnackBar());
};

export const setSnackBarAction = (action) => (dispatch) => {
  let timeoutInstance = null;
  clearTimeout(timeoutInstance);
  dispatch(setSnackbar(action));
  timeoutInstance = setTimeout(() => {
    dispatch(disableSnackBar());
  }, action.timeout);
};

export const {setSnackbar , disableSnackBar} = snackbarSlice.actions;
export default snackbarSlice.reducer;
