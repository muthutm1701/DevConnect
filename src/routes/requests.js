const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");

const User=require("../models/user")
requestRouter.post("/requests/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;
        const isAllowedStatus=["ignored","interested"];
        if(!isAllowedStatus.includes(status)){
            return res.send("invalid status");
        }
        const exisitingConnectionReq= await connectionRequest.findOne({
            $or:[
                {fromUserId,toUserId},
                {fromUserId:toUserId,toUserId:fromUserId}
            ]
        })
        if(exisitingConnectionReq){
            return res.status(400).json({message:"connection request already exists"})
        }
        const toUser= await User.findById(toUserId);
        if(!toUser){
            return res.status(404).send("User does not exist")
        };
        

        const ConnectionRequest = new connectionRequest({
            fromUserId, toUserId, status
        });

        const data = await ConnectionRequest.save();
        res.json({
            message: "sent connection request",
            data
        });
    }
    catch (err) {
        res.status(500).send("Error: " + err.message);
    }
}

);
requestRouter.post("/requests/review/:status/:requestId",userAuth,
    async(req,res)=>{
        try{
            const loggedInUser=req.user;
            const {status,requestId}=req.params;
            const isAllowedStatus=["rejected","accepted"];
            if(!isAllowedStatus.includes(status)){
                return res.send("invalid status");
            }
            const ConnectionRequest= await connectionRequest.findOne({
                _id:requestId,
                toUserId:loggedInUser._id,
                status:"interested"
            })
            if(!ConnectionRequest){
               return res.status(404).json({message:"Connection request not found"});
            }

            ConnectionRequest.status=status;
            const data =await ConnectionRequest.save();
            res.json({message:"Connection request "+status,data})
        }
        catch(err){
            res.status(400).send("Error :"+err.message);
            
        }
    }
)

module.exports = requestRouter;