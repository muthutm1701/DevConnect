
const mongoose=require("mongoose");
const connectDB= async () =>{
    await mongoose.connect(MONGODB_URL);
};
module.exports=connectDB;