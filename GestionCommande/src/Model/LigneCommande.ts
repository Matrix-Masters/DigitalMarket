import mongoose from "mongoose";

let LignCommandeSchema=new mongoose.Schema({
    Quantity:{
        type:String,
        required:true
    },
    prix:{
        type:Number,
        required:true
    },
    Commande_id:{
        type:String,
        default:null
    },
    Product_id:{
        type:String,
        required:true,
    },
})

const LigneCommande=mongoose.model("LigneCommande",LignCommandeSchema)
export default LigneCommande;