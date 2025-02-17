const express=require("express");
const authRouter= express.Router();
const {validateSignUpData}=require("../utils/validation");
const bcrypt=require("bcrypt");
const User= require("../models/user");
const jwt=require("jsonwebtoken");

authRouter.post("/signup",async (req,res)=>{
    try{
        validateSignUpData(req);
        const {firstName,lastName,emailId,password,gender,age}=req.body;
        const passwordHash=await bcrypt.hash(password,10);
        const user= new User({firstName,lastName,emailId,password:passwordHash,gender,age});
    await user.save();
    res.send("user added nigga");}
    catch(err){
        res.status(400).send("error"+ err.message)
    }

})
authRouter.get("/login",async(req,res)=>{
    try{
        const {emailId,password}= req.body;

        const user= await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Email ID NOT PRESENT");
        }
        const isPasswordValid= await user.validatePassword(password);
        if(isPasswordValid){
            const token=await user.getJWT();
            res.cookie("token",token);
            res.send("login sucessful");
        }
        else{
            res.send("Incorrect password");
        };

    }
    catch(err){
        res.send("ERROR"+ err.message);

    };

});
authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now())
    });
    res.send("logout sucessful");

});
module.exports=authRouter;
