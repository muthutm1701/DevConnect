const { default: mongoose } = require("mongoose");

const connectionReqSchema= mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"user",
        required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    status:{
        type:String,
        enum:{
            values:["interested","rejected","ignored","accepted"],
            message:`{VALUE} is incorrect status type`
        }
    }
},
    {
        timestamp:true
    }

);
connectionReqSchema.pre("save",function(next){
    const connectionRequest=this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("you cannot give request to yourself");
    }
    next();

})
const connectionRequest= new mongoose.model("connectionRequest",connectionReqSchema);
module.exports=connectionRequest;

