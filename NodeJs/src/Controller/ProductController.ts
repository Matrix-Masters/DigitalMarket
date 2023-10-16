
import { Request, Response } from "express";
import product from "../Model/Products";

export const findAll =async (req:Request,res: Response) => {
  try{
    const products=await product.find().exec();
    res.status(200).json(products);  
  }catch(err){
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const addProduct = async (req: Request, res: Response) => {
  let prod = new product(req.body);
  try {
      await prod.save() ;
      res.status(201).json(req.body);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

