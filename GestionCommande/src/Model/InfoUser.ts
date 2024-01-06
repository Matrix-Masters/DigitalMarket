import mongoose from "mongoose";

let UserSchema=new mongoose.Schema({
    _id: {
        type: Number,
        required: false
    },
    Name:{
        type:String,
        required:true
    },
    LastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    Photo:{
        type:String,
        default: null
    },
    cin:{
        type:String,
        default:null
    },
    status:{
        type:Number,
        default:0
    },
    roles: { 
        role: [
            {
                type:String,
            }
        ]
    },
})

const InfoUser=mongoose.model("InfoUser",UserSchema)
export default InfoUser;