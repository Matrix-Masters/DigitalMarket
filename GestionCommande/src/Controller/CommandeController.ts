import { Request, Response } from "express";
import Commande from "../Model/Commande";
import LigneCommande from "../Model/LigneCommande";

export const addCommande = async (req: Request, res: Response) => {
    try {
        const commande = new Commande({
            NumCommande: req.body.NumCommande,
            Name: req.body.Name,
            Cin: req.body.Cin,
            phone: req.body.phone,
            LastName: req.body.LastName,
            email: req.body.email,
            PrixTotal: req.body.PrixTotal,
            Client_id: req.body.Client_id,
            location: {
                latitude: req.body.location.latitude,
                longitude: req.body.location.longitude
            }
        });
        const commandeSaved=await commande.save();
        for (let i = 0; i < req.body.LigneCommandes.length; i++) {
            const ligneCommande = new LigneCommande({
                Commande_id: commandeSaved._id,
                Product_id: req.body.LigneCommandes[i].Product_id,
                Quantity: req.body.LigneCommandes[i].Quantity,
                prix: req.body.LigneCommandes[i].prix,
            });
            await ligneCommande.save();
        }
        res.status(201).json(commandeSaved);
    } catch (e) {
        res.status(400).send(e);
    }

}