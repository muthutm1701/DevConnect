const express= require("express");
const app = express();
app.use("/helo",(req,res)=>{
    res.send("hello from server");
});
app.listen(4000,()=>{
    console.log("server listened at port 2000");
});
