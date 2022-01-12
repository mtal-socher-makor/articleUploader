import {
    makeStyles,
    withStyles,
    TextField,
    Button,
    IconButton,
  } from "@material-ui/core";

  export const useStyles = makeStyles({
    page:{
        // flexDirection: "column",
        // justifyContent: "center",
        // alignItems: "center",
        
    },
    header:{
        margin: "20 auto", 
    },
    formContainer:{
        flexDirection: "column",
    },

  });

  export const StyledTextField = withStyles({
    root: {
      width: "100%",
      "& .MuiOutlinedInput-root": {
        borderRadius: "8px",
        "& fieldset": {
          borderColor: "#EDEFF3",
        },
        "&:hover fieldset": {
          border: "1px solid #EDEFF3",
        },
        "&.Mui-focused fieldset": {
          border: "1px solid #EDEFF3",
        },
        "& .MuiSelect-select:focus": {
          backgroundColor: "transparent",
          borderRadius: "8px",
        },
      },
      "& .MuiOutlinedInput-input": {
        padding: "11px",
        "&::placeholder": {
          color: "#868DA2",
          opacity: 1,
        },
      },
  
      "& .MuiInputLabel-outlined": {
        transform: "translate(12px, 12px) scale(1)",
      },
    },
  })(TextField);