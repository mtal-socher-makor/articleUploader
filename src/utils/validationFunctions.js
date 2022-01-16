
import { isValid } from 'date-fns';

export function validateUploadForm(fieldValues,errors, setErrors, setValidationResult){
    let temp = {...errors};
    const someFields = ["title","description", "file"];
    const allFields =  ["title","description", "date", "file"];
                    

    someFields.forEach(field => {
        if(field in fieldValues){
           
            temp[field] = fieldValues[field] ? "" : "This field is required";
        }
    })

    temp.date = "";

    if("date" in fieldValues){
        temp.date = fieldValues.date ? "" : "This field is required";

        if(isValid(new Date(fieldValues.date))){
            temp.date = "";
            if(!fieldValues.date){
                temp.date = "This field is required";
            }
        }else{
            temp.date = "Date is invalid";
        }
    }
    
    setErrors({...temp});
    const tempResult1 = allFields.every(field => Object.keys(temp).includes(field));
    const tempResult2 = Object.values(temp).every(x => x === "")
    
    const result = tempResult1 && tempResult2;

   
    setValidationResult(result);    
}

export function validateEditedUploadForm(fieldValues,errors, setErrors, setValidationResult){

    let temp = {...errors};
    const someFields = ["title","description", "file"];
                      

    someFields.forEach(field => {
        if(field in fieldValues){
            temp[field] = fieldValues[field] ? "" : "This field is required";
        }
    })

    temp.date = "";

    if("date" in fieldValues){
        temp.date = fieldValues.date ? "" : "This field is required";

        if(isValid(new Date(fieldValues.date))){
            temp.date = "";
            if(!fieldValues.date){
                temp.date = "This field is required";
            }
        }else{
            temp.date = "Date is invalid";
        }
    }
    
    setErrors({...temp});
    const result = Object.values(temp).every(x => x === "")
    
    setValidationResult(result);    
}