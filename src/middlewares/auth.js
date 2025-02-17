const jwt= require("jsonwebtoken");
const User= require("../models/user")

const userAuth=async(req,res,next)=>{
    try
  {  const cookie= req.cookies;
 const {token}=cookie;
 if(!token){
    throw new Error("Invalid credentials");
 }
 const decodedMsg=await jwt.verify(token,"Muthu@1234");
 if(!decodedMsg){
    throw new Error("Invalid token");
    
 }
 const {_id}=decodedMsg;
 const user=await User.findById(_id);
 if(!user){
    throw new Error("user doesnt exist");
 }
 req.user=user;
 next();}
 catch(err){
    res.send("ERROR"+err.message);
 }


}
module.exports={userAuth};