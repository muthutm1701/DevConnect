const express= require("express");
const app = express();
const connectDB=require("./config/database");
const User= require("./models/user")
const bcrypt=require("bcrypt");
const validateSignUpData=require("./utils/validation");

app.use(express.json());

app.post("/signup",async (req,res)=>{
    

    

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
app.get("/login",async(req,res)=>{
    try{
        const {emailId,password}= req.body;
        const user= await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Email ID NOT PRESENT");
        }
        const isPasswordValid= await bcrypt.compare(password,user.password);
        if(isPasswordValid){
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
app.get("/user",async(req,res)=>{
    const userEmail=req.body.emailId;
    try{
        const user= await User.find({emailId:userEmail});
        const users= await User.findOne({});
        if(user.length === 0){
            res.status(404).send("Not found");
        }
        res.send(users);
    }catch(err){
        res.status(400).send("Something went wrong");
    }
})
app.get("/feed",async(req,res)=>{
   
    try{
        const user= await User.find({});
        if(user.length === 0){
            res.status(404).send("Not found");
        }
        res.send(user);
    }catch(err){
        res.status(400).send("Something went wrong");
    }
})
app.delete("/user",async(req,res)=>{
    const UserId=req.body._id;
    try{
        const del=await User.deleteOne({_id:UserId});
        res.send("user deleted");
    }catch(err){
        console.log("error in deleting the user");
        res.send("erorr nigga");
    }
})
app.patch("/user/:_id",async(req,res)=>{
    const userId=req.params?._id;
    const allowed_fields=[
        "firstName","lastName","gender","age","password","about","skill","photoUrl"
]
 const isAllowed= Object.keys(req.body).every(k=>allowed_fields.includes(k));
    try{
        if(!isAllowed){
            res.send("Not allowed");
            throw new Error("not allowed to update");
        }
        const up=await User.findOneAndUpdate({_id:userId,},req.body);
        console.log(up);
        res.send("Updated successfully");
    }catch(err){
        console.log("Error while updating..");
        
    }
})
connectDB().then(()=>{
    console.log("database connected");
    app.listen(3000,()=>{
        console.log("listening to 3000");
    }); 

    
})
.catch((err)=>{
    console.log("database issue");
})
