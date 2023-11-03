import mongoose from "mongoose";

let LivraisonSchema=new mongoose.Schema({
    idUser:{
        type:String,
        required:true
    },
    idCommand:{
        type:String,
        required:true
    },
})

const Livraison=mongoose.model("Livraison",LivraisonSchema)
export default Livraison;