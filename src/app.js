const express= require("express");
const app = express();
const connectDB=require("./config/database");
require('dotenv').config();

const cookieParser=require("cookie-parser");
const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const requestRouter= require("./routes/requests");
const userRouter = require("./routes/user")


app.use(express.json());
app.use(cookieParser());
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);


connectDB().then(()=>{
    console.log("database connected");
    app.listen(4000,()=>{
        console.log("listening to 4000");
    }); 

    
})
.catch((err)=>{
    console.log("database issue");
})
