import {
 
  Typography,
  Button,
} from "@material-ui/core";
import { END_POINT, BASE_URL } from "../../utils/constants";
import ClearIcon from "@material-ui/icons/Clear";
import axios from "axios";
import { ReactComponent as FileUpload } from "../../Assets/FileUpload.svg";
import { useStyles, StyledTextField } from "../../Styles/formStyles";
import { validateUploadForm } from "../../utils/validationFunctions";
import { DeleteButton } from "../../Styles/mainStyles";
import styles from "../../Styles/FileInput.module.css";
import * as acrtionSnackbar from '../../Redux/snackbarSlice/snackbarSlice'
import { useDispatch } from "react-redux";


const shortify = (name = "") => {
    if(name.length > 20){
      return `${name.slice(0,19)} ...`
    }else{
      return name
    }
  }


function FileInput({setUploadForm,uploadForm,setValidationResult,errors, setErrors}) {

    const dispatch = useDispatch()
    const onPDFUpload = async (e) => {
      let pdf = e.target.files[0];
        const formData = new FormData();
        formData.append("file", pdf);
        try {
          const res = await axios.put(`${BASE_URL}${END_POINT.FILE}`, formData);
          if (res.status === 200 && res.data.file_name) {
            setUploadForm(prev => ({...prev, file: res.data.file_name}))
            validateUploadForm({file : res.data.file_name}, errors, setErrors, setValidationResult)
          }
        } catch (error) {
          dispatch(acrtionSnackbar.setSnackBarAction({visible :true , timeout : 3000 , message : error.message , type : 'error'}))
        }
    };

    return (
        <>
              <input 
                type="file" accept=".pdf" 
                onChange={onPDFUpload} 
                placeholder="Upload PDF" 
                style={{ display: 'none' }} 
                id="raised-button-file" />
              <label htmlFor="raised-button-file" className={styles.label}>
                <Button 
                    variant="outlined" 
                    component="span">
                  {uploadForm.file ? (
                    <>
                      {shortify(uploadForm.file)}
                      <DeleteButton
                        disableRipple
                        onClick={() => {
                          setUploadForm((prev) => ({ ...uploadForm, file: '' }));
                          validateUploadForm({ file: "" }, errors, setErrors, setValidationResult);
                        }}
                      >
                        <ClearIcon  />
                      </DeleteButton>
                    </>
                  ) : (
                    <>
                      Upload PDF
                      <FileUpload  />
                    </>
                  )}
                </Button>
                {!!errors.file && (
                  <Typography variant="caption"  className={styles.error}>
                    {errors.file}
                  </Typography>
                )}
              </label>
        </>
    )
}

export default FileInput
