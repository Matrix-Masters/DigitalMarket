import { Request, Response } from "express";
import LigneCommande from "../Model/LigneCommande";
import Commande from "../Model/Commande";


export const getNbSales = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;
        const lignes :any = await LigneCommande.find({ Product_id: productId }).exec();

        let idLigneCommandeProduct: any[] = [];
        for (let i = 0; i < lignes.length; i++) {
            idLigneCommandeProduct.push(lignes[i]._id);
        }

        const orders = await Commande.find({
            LigneCommandes: { $elemMatch: { $in: idLigneCommandeProduct } }
        }).exec();

        let nbSales: number = 0;
        for (let i = 0; i < lignes.length; i++) {
            nbSales += Number(lignes[i].Quantity);
        }
        const income = nbSales * Number(lignes[0]?.prix || 0);
        const nbCommandes = orders.length;

        res.status(200).json({ nbSales, income, nbCommandes });
    } catch (e) {
        console.error(e);
        res.status(500).send('Internal Server Error');
    }
};