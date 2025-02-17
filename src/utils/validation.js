const validator=require("validator");
const validateSignUpData=(req)=>{
    const {firstName,lastName,emailId,password}=req.body;
    if(!firstName||!lastName){
        throw new Error("Invalid Name");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Invalid Email");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Not a strong password");
    }
};
const validateEditProfileData=(req)=>{

    const allowedEdits=["firstName","lastName","age","gender","photoUrl","about","skill"];

    const isEditAllowed=Object.keys(req.body).every((field)=>allowedEdits.includes(field));

 return isEditAllowed;
};


module.exports={validateSignUpData,validateEditProfileData};