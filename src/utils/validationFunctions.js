
import { isValid } from 'date-fns';

export function validateUploadForm(fieldValues,errors, setErrors, setValidationResult){

    let temp = {...errors};
    const someFields = ["title","description", "file"];
    const allFields =  ["title","description", "date", "file"];
    console.log("fieldvalues", fieldValues)
                      

    someFields.forEach(field => {
        if(field in fieldValues){
            console.log("fieldValues[field]",fieldValues[field])
            temp[field] = fieldValues[field] ? "" : "This field is required";
        }
    })

    temp.date = "";

    if("date" in fieldValues){
        temp.date = fieldValues.date ? "" : "This field is required";

        if(isValid(new Date(fieldValues.date))){
            temp.date = "";
            console.log("inside is valid")
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

    console.log("tempResult1", tempResult1)
    console.log("tempResult2", tempResult2)
    console.log("temp", temp)
    setValidationResult(result);    
}