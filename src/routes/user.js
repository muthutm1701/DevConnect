const express= require("express");
const userRouter =express.Router();
const {userAuth}= require("../middlewares/auth");
const connectionRequest=require("../models/connectionRequest");
const User=require("../models/user");


userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
   try{ const loggedInUser=req.user;
    const ConnectionRequests =await connectionRequest.find({
        toUserId:loggedInUser.id,
        status:"interested"
    }).populate("fromUserId",["firstName","lastName"])
    res.json({
        message:"Data fetched successfully",
        data:ConnectionRequests
    })
}
    catch(err){
        res.status(400).send("error while fetching" +err)
    }
})
userRouter.get("/user/connections",userAuth,async (req,res) => {
    try{
        const loggedInUser=req.user;
        const ConnectionRequests=await connectionRequest.find({
            $or:[
                {fromUserId:loggedInUser.id, status:"accepted"},
                {fromUserId:loggedInUser.id,status:"accepted"}
            ],
        }).populate("fromUserId","firstName lastName").populate("toUserId","firstName lastName")
         const data =await ConnectionRequests.map((row)=>{
            if (row.fromUserId._id.toString()===loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;

         })
         res.json({message:"data fetched sucessfully ",data})
    }
    catch(err){
        res.status(400).send(err)
    }
    
})
userRouter.get("/feed",userAuth,async(req,res)=>{
            try{
                const loggedInUser=req.user;
                const page=parseInt(req.query.page);
                let limit=parseInt(req.query.limit);
                limit=limit>50 ? 50:limit;
                const skip=(page-1)*limit;

                const ConnectionRequest=await connectionRequest.find({$or:[{fromUserId:loggedInUser._id},{toUserId:loggedInUser._id}]});
                const hideUsersFromFeed= new Set();
                console.log(ConnectionRequest);
                ConnectionRequest.forEach((req)=>{
                    hideUsersFromFeed.add(req.fromUserId.toString());
                    hideUsersFromFeed.add(req.toUserId.toString());

                });
                const users=await User.find({
                    $and:[{_id: {$nin:Array.from(hideUsersFromFeed)}},{_id:{$ne:loggedInUser._id}}]
                }).select("firstName lastName gender photoUrl skill").skip(skip).limit(limit);

                res.send(users);

            }
            catch(err){
                res.status(400).send("error" +err)
            }
})
module.exports=userRouter;