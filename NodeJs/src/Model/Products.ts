import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate"

let ProductSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
   
})
ProductSchema.plugin(mongoosePaginate)
const product=mongoose.model("product",ProductSchema)
export default product;