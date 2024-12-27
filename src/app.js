const express= require("express");
const app = express();
const connectDB=require("./config/database");
connectDB().then(()=>{
    console.log("database connected");
    app.listen(3000,()=>{
        console.log("listening to 3000");
    }); 

    
})
.catch((err)=>{
    console.log("database issue");
})
