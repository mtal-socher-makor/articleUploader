import {
    makeStyles,
    withStyles,
    TextField,
    Button,
    IconButton,
  } from "@material-ui/core";

  export const useStyles = makeStyles({
    blueShape: {
      backgroundColor: "#1C67FF",
      borderRadius: "8px",
      height: "12px",
      marginBottom: "10px",
    },
    title: {
      color: "#868DA2",
      fontSize: "24px",
    },
  })

  export const DeleteButton = withStyles({
    root: {
      padding: "6px",
      backgroundColor: "#EDEFF3",
      borderRadius: "50%",
      textTransform: "none",
      "&:hover": {
        backgroundColor: "#6b6b6b33",
        transition: ".3s",
      },
      "&:disabled": {
        backgroundColor: "#6b6b6b",
      },
    },
  })(IconButton);