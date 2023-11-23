import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate"

let CommandeSchema=new mongoose.Schema({
    NumCommande:{
        type:String,
        required:true,
        unique:true
    },
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
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    PrixTotal:{
        type:String,
        default: null
    },
    location: {
		latitude: {
             type: String,
             required: true 
        },
		longitude: { 
            type: String,
            required: true
         },
         name:{
            type: String,
            required: true 
         }
	},
    Client_id:{
        type:String,
        required:true
    },
    Status:{
        type:String,
        required:true,
        default:"Waiting"
    },
    Date:{
        type:Date,
        default:Date.now
    },
    LigneCommandes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LigneCommande' }]
})

CommandeSchema.plugin(mongoosePaginate)
const Commande=mongoose.model("Commande",CommandeSchema)
export default Commande;