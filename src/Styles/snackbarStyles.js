import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  snackbarRoot: {
    position: 'absolute',
    top: '69px',
    right: '30px',
    width: 'auto',
    zIndex: 1400,
    opacity: 0.8,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
    [theme.breakpoints.down('xs')]: {
      position: 'absolute',
      zIndex: 1400,
      width: '90%',
      right: '5%',
    },
  },
  closeSnackbar: {
    height: '20px',
    width: '20px',
  },
}));