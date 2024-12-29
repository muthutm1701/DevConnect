const mongoose =require("mongoose");
const validator=require("validator");
const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required: true,
        trim:true,
    },
    lastName:{
        type:String,
        trim:true,
    },
    emailId:{
        type:String, 
        required: true,
        unique :true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email Id "+value);
            }
        }
    },
    password:{
        type:String,
        required: true,
      
    },
    age:{
        type:Number,
        required:true,
        trim:true,
        min:16,
    },
    gender:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("gender data is not valid")
            }
        }
    },
    photoUrl:{
        type:String,
        validate(value){
            if(validator.isURL(value)){
                throw new Error("Invalid url"+value);
            }
        }
    },
    about:{
        type:String,
        default:";)"
    },
    skill:{
        type:[String],
        default:"member"
    },
    Timestamp:{

    }
}) 

const userModel =mongoose.model("user",userSchema);

module.exports=userModel;