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
import { KeyboardDatePicker } from "@material-ui/pickers";
import { useNavigate } from 'react-router';
import { useStyles, StyledTextField } from "../Styles/formStyles";
import { DeleteButton } from "../Styles/mainStyles";
import { validateUploadForm } from "../utils/validationFunctions";
import SubHeader from "./SubHeader";
import TextInputUnit from "./fields/TextInputUnit";
import DateInputUnit from "./fields/DateInputUnit";



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
//      setuploadForm(XXX);
//      setValidationResult(true);
//     }
//    }, [chosenPublication]);

const handleChange = (value,fieldName) => {
    
    console.log("fieldName", fieldName, "value", value);
    setUploadForm({ ...uploadForm, [fieldName]: value });
    validateUploadForm({[fieldName] : value}, errors, setErrors, setValidationResult)
  };


  const onPDFUpload = async (e) => {
    let pdf = e.target.files[0];
    console.log("pdf", pdf)
      const formData = new FormData();
      formData.append("file", pdf);
      try {
        const res = await axios.put(`${BASE_URL}${END_POINT.FILE}`, formData);
        if (res.status === 200 && res.data.file) {
          console.log('res', res)
          console.log("res.data.file", res.data.file)
          setUploadForm(prev => ({...prev, file: res.data.file}))
          validateUploadForm({file : res.data.file}, errors, setErrors, setValidationResult)
        }
      } catch (error) {
        console.log(error.message);
      }
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
        <Grid container className={classes.page}>
            <Grid item xs={10} className={classes.header}>
                <SubHeader title="Upload Article" />
            </Grid>
            <Grid item xs={10} className={classes.formWrapper}>
                <Grid container className={classes.formContainer}>
                        <Grid item xs={6}>
                                <TextInputUnit
                                name='name'
                                label='Name'
                                value={uploadForm.name}
                                onChange={(e) => handleChange(e.target.value, "name")}
                                error={errors.name}
                                />
                        </Grid>
                        <Grid item xs={6}>
                                <TextInputUnit
                                name='description'
                                label='Description'
                                value={uploadForm.description}
                                onChange={(e) => handleChange(e.target.value, "description")}
                                error={errors.description}
                                />
                        </Grid>
                        {/* <Grid item xs={6}>
                            <DateInputUnit
                                label=''
                                name="date"
                                value={uploadForm.date || new Date()}
                                onChange={(date) => handleChange(date, "date")}
                                error={errors.date}
                                />
                        </Grid> */}
                          <Grid item xs={6}>

                                <input
                                type="file"
                                accept=".pdf"
                                onChange={onPDFUpload}
                                placeholder="Upload PDF"
                                style={{ display: 'none' }}
                                id="raised-button-file"
                                />
                                <label>
                                    <Button variant="outlined" component="span" >
                                        {uploadForm.file ?  
                                            (
                                                <>
                                                {shortify(uploadForm.file)}
                                                    <DeleteButton
                                                    disableRipple
                                                    onClick={() => {
                                                        setUploadForm(prev => ({...uploadForm, file:""}))
                                                        validateUploadForm({file : uploadForm.file}, errors, setErrors, setValidationResult)
                                                    }}
                                                    >
                                                         <ClearIcon className={classes.clearIcon} />
                                                    </DeleteButton>
                                                </>
                                            )  :
                                            (
                                            <>
                                            Upload PDF
                                            <FileUpload className={classes.arrow2Style}/>
                                            </>
                                            
                                            ) 
                                        }
                                </Button>
                                { !!errors.file && 
                                    <Typography variant="caption" className={classes.customError}
                                    >
                                    {errors.file}
                                </Typography>}
                                 </label>
                          </Grid>


                </Grid>

            </Grid>
        </Grid>
    )
}

export default UploadForm;
