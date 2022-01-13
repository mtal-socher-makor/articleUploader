
export function validateLogin(fieldValues,errors, setErrors,validationResult, setValidationResult){
    let temp = {...errors};
    const allFields = ["username","password"];


        if("username" in fieldValues){
            temp["username"] = fieldValues["username"] ? "" : "This field is required";
        }

    if("password" in fieldValues){

        if(fieldValues["password"]){
            temp["password"] = "";
        }else{
            temp["password"] = "This field is required";
        }

        if(fieldValues["password"] && fieldValues["password"].length >= 6){
            temp["password"] = "";
        }else{
            temp["password"] = "Password is too short";
        }
    }
    
    setErrors({...temp});
    const tempResult1 = allFields.every(field => Object.keys(temp).includes(field));
    const tempResult2 = Object.values(temp).every(x => x === "")
    
    const result = tempResult1 && tempResult2;
    setValidationResult(result);    
}


