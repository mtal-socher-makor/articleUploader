import {
    makeStyles,
    withStyles,
    TextField,
    Button,
    IconButton,
  } from "@material-ui/core";

  export const useStyles = makeStyles({
    modalBackDrop: {    
        backdropFilter: 'blur(2px)',    
        backgroundColor: '#00001e25',    
    },
    page: {
      marginTop: '15%',
      width : '30%',
     margin : '0 auto',
     border : '1px solid #BABABA',
     borderRadius : '8px',
     boxShadow: '0px 8px 24px #0018581F',
    },
    header: {
      margin: '20 auto',
    },
    formContainer: {
      flexDirection: 'column',
      justify : 'center'
    },
    btnContainer: {
      paddingBlock : 20
    },
    inputsGrids:{
      paddingTop: 20,
    }
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
      '& .MuiFormControl-root' : {
          height : '83px !importent'
      }
    },
  })(TextField);