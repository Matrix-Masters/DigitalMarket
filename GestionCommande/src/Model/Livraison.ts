import mongoose from "mongoose";

let LivraisonSchema=new mongoose.Schema({
    EmailLivreur:{
        type:String,
        required:true
    },
    NumCommande:{
        type:String,
        required:true,
        unique:true
    },
    Location:{
       latitude: {
            type: String,
            required: true 
       },
       longitude: { 
           type: String,
           required: true
        }, 
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

const Livraison=mongoose.model("Livraison",LivraisonSchema)
export default Livraison;