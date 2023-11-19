import { Request, Response } from "express";
import whishlist from "../Model/Whishlist";


export const AddToWishlist = async (req: Request, res: Response) => {
    try {
        const { idUser, idProduct } = req.body;
        let NewWishlist= new whishlist(req.body);
        const testExist=await whishlist.findOne({
          $and: [
            { idUser: idUser },
            { idProduct: idProduct },
        ]
        }).exec();
        if(testExist){
          await whishlist.findOneAndDelete({ idUser, idProduct });
          res.status(200).json({ message: "Product Delete from your wishlist" });
        }else{
          await NewWishlist.save();
          res.status(200).json({ message: "Product Added to your wishlist" });
        }
      } catch (err) {
        res.status(500).json({ message: "Failed to add the Product to your wishlist" });
      }
    };


