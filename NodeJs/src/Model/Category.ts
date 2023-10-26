import mongoose from "mongoose";
let CategorySchema=new mongoose.Schema({
    nom:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true,
        maxlength: 999999999
    }
})

const category=mongoose.model("category",CategorySchema)
export default category;