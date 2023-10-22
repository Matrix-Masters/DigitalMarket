import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate"

let ProductSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    ImageProduct:{
        type:String,
        required:false
    },
    status:{
        type:Number,
        required:false,
        default:0
    },
    Quantite:{
        type:Number,
        required:true,
    },
    prix:{
        type:Number,
        required:true,
    },
    idUser:{
        type:Number,
        required:true,
    },
    categoryId:{
        type:Number,
        required:false,
        default:null
    }  
})
ProductSchema.plugin(mongoosePaginate)
const product=mongoose.model("product",ProductSchema)
export default product;