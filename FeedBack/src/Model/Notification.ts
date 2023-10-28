import mongoose from "mongoose";

let NotifSchema=new mongoose.Schema({
    idEnvoi:{
        type:Number,
        required:true
    },
    idRecu:{
        type:Number,
        required:true
    },
    Message:{
        type:String,
        required:true,
    },
    etat:{
        type:Number,
        default:0
    },
})

const notification=mongoose.model("notification",NotifSchema)
export default notification;