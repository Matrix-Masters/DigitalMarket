import mongoose from "mongoose";

let WhishlistSchema=new mongoose.Schema({
    idUser:{
        type:String,
        required:true
    },
    idProduct:{
        type:String,
        required:true
    },
    
})

const whishlist=mongoose.model("whishlist",WhishlistSchema)
export default whishlist;