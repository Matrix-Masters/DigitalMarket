import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate"
let CommandeSchema=new mongoose.Schema({

    Name:{
        type:String,
        required:true
    },
    Cin:{
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
    PrixTotal:{
        type:String,
        default: null
    },
    location: {
		latitude: {
             type: Number,
             required: true 
        },
		longitude: { 
            type: Number,
            required: true
         },
	},
    Client_id:{
        type:String,
        required:true
    },
})

CommandeSchema.plugin(mongoosePaginate)
const Commande=mongoose.model("Commande",CommandeSchema)
export default Commande;