
import { Request, Response } from "express";
import Product from "../Model/Products";

export const FindProductWithoutProduct =async (req:Request,res: Response) => {
  try{
    const products = await Product.find({ status: 1 }).exec();
    res.status(200).json(products);  
  }catch(err){
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const addProduct = async (req: Request, res: Response) => {
  let prod = new Product(req.body);
  try {
      await prod.save() ;
      res.status(201).json(req.body);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}


export const LibererProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findOneAndUpdate({idSpring:req.params.id}, { categoryId: null });
    if (!product) {
      return res.status(404).send("Product not found");
    }
    const updatedProduct = await Product.findOne({idSpring:req.params.id});
    return res.status(200).send(updatedProduct);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export const UpdateIdProducts = async (req: Request, res: Response) => {
  try {
    const product = await Product.findOneAndUpdate({idSpring:req.params.id}, { categoryId: req.body.categoryId });
    if (!product) {
      return res.status(404).send("Product not found");
    }
    const updatedProduct = await Product.findOne({idSpring:req.params.id});
    return res.status(200).send(updatedProduct);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export const RejectProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findOneAndUpdate({idSpring:req.params.id}, { status: 2 });
    if (!product) {
      return res.status(404).send("Product not found");
    }
    const updatedProduct = await Product.findOne({idSpring:req.params.id});
    return res.status(200).send(updatedProduct);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export const AccepterProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findOneAndUpdate({idSpring:req.params.id}, { status: 1 });
    if (!product) {
      return res.status(404).send("Product not found");
    }
    const updatedProduct = await Product.findOne({idSpring:req.params.id});
    return res.status(200).send(updatedProduct);
  } catch (err) {
    return res.status(500).send(err);
  }
}




