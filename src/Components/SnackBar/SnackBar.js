import React from 'react';
// Material-UI
import Alert from '@material-ui/lab/Alert';
import { Collapse, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useStyles } from '../../Styles/snackbarStyles';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import * as snackBarActions from '../../Redux/snackbarSlice/snackbarSlice';

export default function Snackbar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const snackBarOBJ = useSelector((state) => state.snackbar);

  console.log(snackBarOBJ , "snackVBDSAFASFA")
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(snackBarActions.disableSnackBar());
  };

  return (
    <div className={classes.snackbarRoot}>
      <Collapse in={snackBarOBJ.visible} timeout={400}>
        <Alert
          elevation={4}
          variant="filled"
          severity={snackBarOBJ.type}
          action={
            <IconButton className={classes.closeSnackbar} elevation={4} variant="filled" severity={snackBarOBJ.type} onClick={handleClose}>
              <CloseIcon style={{ color: '#FFFFFF' }} />
            </IconButton>
          }
        >
          <Typography data-cy="snackbar-msg" style={{ color: '#FFFFFF' }}>
            {snackBarOBJ.message}
          </Typography>
        </Alert>
      </Collapse>
    </div>
  );
}
