const express= require("express");
const profileRouter=express.Router();
const {userAuth}=require("../middlewares/auth");
const User= require("../models/user");
const {validateEditProfileData}=require("../utils/validation");
profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try{
         const user=req.user;
        res.send(user);
    }

    catch(err){
        res.send("Error "+err);
    }
});
profileRouter.get("/profile/edit",userAuth,async(req,res)=>{
    try{
        validateEditProfileData(req);
        if(!validateEditProfileData){
            throw new Error("Invalid edit request");
        };
        const loggedInUser=req.user;
        Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]));
        await loggedInUser.save();
    }
    catch(err){
        res.status(400).send(err);

    }
});

module.exports=profileRouter;