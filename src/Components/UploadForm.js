import { useState, useEffect} from "react";
import {
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import { END_POINT, BASE_URL } from "../utils/constants";
import ClearIcon from "@material-ui/icons/Clear";
import axios from "axios";
import { ReactComponent as FileUpload } from "../Assets/FileUpload.svg";
import { useNavigate } from 'react-router';
import { useStyles, StyledTextField } from "../Styles/formStyles";
import { DeleteButton } from "../Styles/mainStyles";
import { FilledButton } from '../Styles/mainStyles';
import { validateUploadForm } from "../utils/validationFunctions";
import SubHeader from "./SubHeader";
import TextInputUnit from "./fields/TextInputUnit";
import DateInputUnit from "./fields/DateInputUnit";
import FileInput from "./fields/FileInput";


const shortify = (name = "") => {
    if(name.length > 20){
      return `${name.slice(0,19)} ...`
    }else{
      return name
    }
  }


function UploadForm() {
    
    const classes = useStyles();
    const initStateForm = {
        title: "",
        description: "",
        date: new Date(),
        file: ""
      }
    const [uploadForm, setUploadForm] = useState(initStateForm);
    const [errors, setErrors] = useState({});
    const [validationResult, setValidationResult] =  useState(false);

    // const navigate = useNavigate();

      //Dummy variable for now- for later use in editing mode
    const chosenPublication = null;

      //For editing
//     useEffect(() => {
   
//     if(chosenPublication){
//      setuploadForm(chosenPublication);
//      setValidationResult(true);
//     }
//    }, [chosenPublication]);

const handleChange = (value,fieldName) => {
    
    console.log("fieldName", fieldName, "value", value);
    setUploadForm({ ...uploadForm, [fieldName]: value });
    validateUploadForm({[fieldName] : value}, errors, setErrors, setValidationResult)
  };


  

    const sendPublication = async (buttonMarker) => {
      console.log("uploadForm", uploadForm);
     
    
      try {
     
        const res = await axios.post(`${BASE_URL}${END_POINT.ARTICLE}`,uploadForm);
        // navigate("/");
        if (res.status === 200) {
          console.log("post - success")
        }
        }catch (error) {
         console.log("post failed - ", error.message);
    }
  };


    return (
      <Grid container justifyContent="center" className={classes.page}>
        <Grid item xs={10} className={classes.header}>
          <Grid container justifyContent="center" alignItems="center" style={{paddingTop : 10}}>
            <SubHeader title="Upload Article" />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="column" alignItems="center" >
            <Grid item xs={10} className={classes.inputsGrids}>
              <TextInputUnit 
                name="title" 
                label="Title" 
                value={uploadForm.title || ''} 
                onChange={(e) => handleChange(e.target.value, 'title')} 
                error={errors.title} />
            </Grid>
            <Grid item xs={10} className={classes.inputsGrids}>
              <TextInputUnit 
                name="description" 
                label="Description" 
                value={uploadForm.description || ''} 
                onChange={(e) => handleChange(e.target.value, 'description')} 
                error={errors.description} />
            </Grid>
            <Grid item xs={10} className={classes.inputsGrids}>
              <DateInputUnit 
                label="" 
                name="date" 
                value={uploadForm.date || new Date()} 
                onChange={(date) => handleChange(date, 'date')} 
                error={errors.date} />
            </Grid>
            <Grid item xs={10} className={classes.inputsGrids}>
                <FileInput 
                  setUploadForm={setUploadForm}
                  uploadForm={uploadForm}
                  setValidationResult={setValidationResult}
                  errors={errors}
                  setErrors={setErrors}
                />
            </Grid>
          </Grid>
          <Grid container className={classes.btnContainer} alignItems='center'>
            <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
              <FilledButton disabled={!validationResult} onClick={sendPublication}>
                Publish
              </FilledButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
}

export default UploadForm;
