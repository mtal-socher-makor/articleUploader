import React from 'react'
// Material-UI
import Alert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'
import { Collapse, IconButton, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import * as actionSnackBar from '../../Redux/SnackBar/action'

export default function CustomizedSnackBar() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const snackBarOBJ = useSelector((state) => state.snackBar)
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(actionSnackBar.disableSnackBar())
  }
  console.log(snackBarOBJ)

  return (
    <div className={classes.root}>
      <Collapse in={snackBarOBJ.visible} timeout={400}>
        <Alert
          elevation={4}
          variant='filled'
          severity={snackBarOBJ.type}
          action={
            <IconButton style={{ height: '20px', width: '20px' }} elevation={4} variant='filled' severity={snackBarOBJ.type} onClick={handleClose}>
              <CloseIcon style={{ color: 'white' }} />
            </IconButton>
          }
        >
          <Typography id='snackbarMessage'>{snackBarOBJ.message}</Typography>
        </Alert>
      </Collapse>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    top: '69px',
    right: '30px',
    width: 'auto',
    zIndex: 400,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
    [theme.breakpoints.down('xs')]: {
      position: 'absolute',
      zIndex: 3,
      width: '90%',
      right: '5%',
    },
  },
}))
