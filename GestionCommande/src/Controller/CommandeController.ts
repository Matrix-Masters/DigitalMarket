import { Request, Response } from "express";
import Commande from "../Model/Commande";
import LigneCommande from "../Model/LigneCommande";
import Livraison from "../Model/Livraison";

export const addCommande = async (req: Request, res: Response) => {

    try {
        var prixTotal = 0;
        const ligneCommandes = [];

        for (let i = 0; i < req.body.LigneCommandes.length; i++) {
            prixTotal += req.body.LigneCommandes[i].prix * req.body.LigneCommandes[i].quantity;

            const ligneCommande = new LigneCommande({
                Commande_id: null, 
                Product_id: req.body.LigneCommandes[i].id,
                Quantity: req.body.LigneCommandes[i].quantity,
                prix: req.body.LigneCommandes[i].prix,
            });

            const savedLigneCommande = await ligneCommande.save();
            ligneCommandes.push(savedLigneCommande._id);
        }

        const commande = new Commande({
            NumCommande: req.body.NumCommande,
            Name: req.body.Name,
            Cin: req.body.Cin,
            phone: req.body.phone,
            LastName: req.body.LastName,
            email: req.body.email,
            PrixTotal: prixTotal,
            Client_id: req.body.Client_id,
            location: {
                latitude: req.body.location.latitude,
                longitude: req.body.location.longitude,
                name:req.body.location.name
            },
            LigneCommandes: ligneCommandes,
        });

        const commandeSaved = await commande.save();
        // test worked :) add commande for every null commande
        for (let i = 0; i < ligneCommandes.length; i++) {
            await LigneCommande.findByIdAndUpdate(ligneCommandes[i], {Commande_id:commandeSaved._id});
        }
        res.status(201).json(commandeSaved);
    } catch (e) {
        res.status(400).send(e);
    }

}



export const GetCommandeDispo = async (req: Request, res: Response) => {

    let page: number = parseInt(req.query.page?.toString() || '1');
    let size: number = parseInt(req.query.size?.toString() || '5');
    const search = req.query.search || '';
    
    try {

        const Commandes = await Commande.paginate(
            {
                $and: [
                    { NumCommande: { $regex: new RegExp(search.toString(), 'i') } },
                    { Status: "Available" },
                ]
            },
            {
                page: page,
                limit: size,
                populate: 'LigneCommandes'
            },
        );

        if (!Commandes) {
            res.status(404).json({ message: "No Found" });
        } else {
            res.status(200).json(Commandes);
        }

    } catch (err: any) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }

}

export const GetCommandeByIdUser=async (req:Request,res:Response)=>{
    try{
        const listCommandes=await Commande.find({
            $and: [
                {  Client_id:req.params.Client_id, },
                {   Status:"Taken", },
            ]
        }).exec();
        res.status(200).json(listCommandes);
    }catch(e:any){
        res.status(500).json({message:e.message})
    }
}


export const AddLivraison=async (req:Request,res:Response)=>{
     try{
        const livraison = new Livraison({
            EmailLivreur:req.body.email,
            NumCommande:req.body.num,
            Location: {
                latitude: req.body.Location.latitude,
                longitude: req.body.Location.longitude,
            },
        });
        await Commande.findOneAndUpdate({NumCommande:req.body.num},{$set:{Status:"Taken"}});
        const livr=  await livraison.save();
        res.status(201).json(livr);
     }catch(e:any){
        res.status(500).json({message:e.message})
     }
}
/*
try {
    //Make Relation 
    const commandes = await Commande.find({
        Status: "Disponible",
    }).populate('LigneCommandes').exec();
    res.status(200).json(commandes);
} catch (e) {
    res.status(400).send(e);
}
*/