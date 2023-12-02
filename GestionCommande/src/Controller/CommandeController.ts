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


export const GetLivraisonByNumCommande = async (req:Request,res:Response)=>{
    try{
        const livr=await Livraison.findOne({NumCommande:req.params.num}).exec();
        if (!livr) {
            res.status(404).json({ message: "No Found" });
        } else {
            res.status(200).json(livr);
        }
    }catch(e:any){
        res.status(500).json({message:e.message})
    }
}

export const ChangerLocationLivreur=async(req:Request,res:Response)=>{
    try{
        await Livraison.findOneAndUpdate({NumCommande:req.params.num},{$set:{Location:req.body.Location}});
        await Commande.findOneAndUpdate({NumCommande:req.params.num},{$set:{Status:"Shipped"}});
        res.status(200).json({message:"updated"});
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


export const AcceptCommand=async (req:Request,res:Response)=>{
    try{
      
       await Commande.findOneAndUpdate({NumCommande:req.params.num},{$set:{Status:"Available"}});
       notifyNotificationService(req.body.userid,"Your Command Accepted");
       res.status(201).json("Accepted");
    }catch(e:any){
       res.status(500).json({message:e.message})
    }
}

export const RefusedCommand=async (req:Request,res:Response)=>{
    try{
      
       await Commande.findOneAndUpdate({NumCommande:req.params.num},{$set:{Status:"Refused"}});
       notifyNotificationService(req.body.userid,"Your Command Refused");
       res.status(201).json("Refused");
    }catch(e:any){
       res.status(500).json({message:e.message})
    }
}


function notifyNotificationService(userid:any,message:String) {
  const axios = require('axios');
  axios.post('http://localhost:8888/FEEDBACK-SERVICE/FeedBack/AddNotif', { 
     idEnvoi: "3",
     idRecu:`${userid}`,
     Message:message,
     etat:0
   });
}

//admin
export const GetCommandsWaiting = async (req: Request, res: Response) => {

    let page: number = parseInt(req.query.page?.toString() || '1');
    let size: number = parseInt(req.query.size?.toString() || '2');
    const search = req.query.search || '';
    const type = req.query.type || 'Waiting';
    
   try {

        const Commandes = await Commande.paginate(
            {
                $and: [
                    { NumCommande: { $regex: new RegExp(search.toString(), 'i') } },
                    { Status:type.toString() },
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
export const deleteCommande = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const deletedCommande = await Commande.findByIdAndDelete(id);
  
      if (deletedCommande) {
        res.status(200).send(deletedCommande);
      } else {
        res.status(404).send({ error: 'Commande not found' });
      }
    } catch (err: any) {
      res.status(500).send({ error: err.message });
    }
  };


export const getCommandesByClientPaginate = async (req: Request, res: Response) => {

  let page: number = parseInt(req.query.page?.toString() || '1');
  let size: number = parseInt(req.query.size?.toString() || '5');
  const Client_id = req.query.Client_id || '';
  
  try {

      const Commandes = await Commande.paginate(
          {
            $and: [
              { Client_id: { $regex: new RegExp(Client_id.toString(), 'i') } },
              { $or: [{ Status: "Refused" }, { Status: "Shipped" }] }
            ]
          },
          {
              page: page,
              limit: size,
              populate: 'LigneCommandes'
          },
      );

      if (!Commandes) {
          res.status(404).json({ message: "Not Found" });
      } else {
          res.status(200).json(Commandes);
      }

  } catch (err: any) {
      console.error(err);
      res.status(500).json({ message: err.message });
  }
  
};

export const deleteCommandeById = async (req: Request, res: Response) => {
  const commandId = req.query.id;
  try {
    const deletedCommand = await Commande.findByIdAndDelete(commandId);
    if (!deletedCommand) {
        return res.status(404).json({ message: 'Command not found' });
    }
    await LigneCommande.deleteMany({ Commande_id:  commandId});
    res.status(200).json({ message: 'commande deleted succesfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

