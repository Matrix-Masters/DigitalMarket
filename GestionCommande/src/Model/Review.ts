import mongoose from "mongoose";

let ReviewSchema = new mongoose.Schema({
    Content:{
        type:String,
        required:true,
    },
    Note:{
        type:String,
        required:true
    },
    Product_id:{
        type:String,
        required:true
    },
    User_id: {
        type: Number,  // Use ObjectId type for reference
        ref: 'InfoUser',  // Reference the InfoUser model
        required: true
    },
    Date:{
        type:Date,
        default:Date.now
    },

});
const Review=mongoose.model("Review",ReviewSchema)
export default Review;
