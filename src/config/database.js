
const mongoose=require("mongoose");
const connectDB= async () =>{
    await mongoose.connect("mongodb+srv://devconnect:muthudaa@devconnect.fbdhp.mongodb.net/DevConnect");
};
module.exports=connectDB;