import { useState, useEffect} from "react";
import { Grid, Dialog } from "@material-ui/core";
import { END_POINT, BASE_URL } from "../utils/constants";
import axios from "axios";
import { useStyles} from "../Styles/formStyles";
import { FilledButton } from '../Styles/mainStyles';
import { validateUploadForm, validateEditedUploadForm } from "../utils/validationFunctions";
import SubHeader from "./SubHeader";
import TextInputUnit from "./fields/TextInputUnit";
import DateInputUnit from "./fields/DateInputUnit";
import FileInput from "./fields/FileInput";
import { useDispatch,  useSelector } from "react-redux"
import * as articlesAction from '../Redux/articleSlice/articleSlice';
import { selectChosenArticle, setChosenArticle } from "../Redux/articleSlice/articleSlice";
import * as snackbarActions from '../Redux/snackbarSlice/snackbarSlice';
import { useHistory } from 'react-router';


function UploadForm({handleCloseForm, open , newArticle}){
    
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
    const dispatch = useDispatch();
    const history = useHistory();

    const chosenArticle = useSelector(selectChosenArticle);
    console.log("chosenArticle", chosenArticle);


    
    //   For editing
    useEffect(() => {
   
    if(chosenArticle){
     setUploadForm(chosenArticle);
     setValidationResult(true);
    }else{
     setUploadForm({})
    }
   }, [chosenArticle]);

   

const handleChange = (value,fieldName) => {
    
    console.log("fieldName", fieldName, "value", value);
    setUploadForm({ ...uploadForm, [fieldName]: value });

    if(chosenArticle){
        validateEditedUploadForm({[fieldName] : value}, errors, setErrors, setValidationResult)
    }else{
        validateUploadForm({[fieldName] : value}, errors, setErrors, setValidationResult)
    }
  };

    const sendPublication = async () => {
      console.log("uploadForm", uploadForm);
        let res;
        const formToSend = {...uploadForm}
        delete formToSend.id;
        delete formToSend.createdAt;
        delete formToSend.updatedAt
      try {
            if(!newArticle){
                const res = await axios.put(`${BASE_URL}${END_POINT.ARTICLE}/${chosenArticle.id}`,formToSend);
                if (res.status === 200 || res.status === 201) {
                console.log("post - success");
                dispatch(setChosenArticle({}))
                dispatch(snackbarActions.setSnackBarAction({visible: true, type:'success', message:'Successfully updated', timeout:2000}))
                dispatch(articlesAction.getAllArticlesAsync())
                handleCloseForm()
                }else{
                    dispatch(snackbarActions.setSnackBarAction({visible: true, type:'error', message:'Action failed', timeout:2000}))
                }
            }else{
                console.log("i'm here");
                res = await axios.post(`${BASE_URL}${END_POINT.ARTICLE}`,formToSend);
                if (res.status === 200 || res.status === 201) {
                console.log("post - success")
                dispatch(setChosenArticle({}))
                dispatch(snackbarActions.setSnackBarAction({visible: true, type:'success', message:'Successfully published', timeout:2000}))
                dispatch(articlesAction.getAllArticlesAsync())
                handleCloseForm()
                }else{
                    dispatch(snackbarActions.setSnackBarAction({visible: true, type:'error', message:'Action failed', timeout:2000}))
                }
            }
        
        }catch (error) {
         console.log("post failed - ", error.message);
         dispatch(snackbarActions .setSnackBarAction({visible: true, type:'error', message:'Action failed', timeout:2000}))

    }
  };


    return (

        <Dialog
            open={open}
            onClose={ handleCloseForm }
            classes={{ paper: classes.alertModalPaper }}
            BackdropProps={{
            classes: {
                root: classes.modalBackDrop
            }
            }}
        >
        <Grid container justifyContent="center">
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
       </Dialog>
    );
}

export default UploadForm;
