import { Request, Response } from "express";
import Category from "../Model/Category";




export const getAllCategories = async(req:Request , res : Response)=>
{
    try{
        const categoryList = await Category.find();
        res.status(200).send(categoryList);
    }
    catch(err)
    {
        res.status(500).send(err);
    }
    }

    export const AddCategory = async (req: Request, res: Response) => {
        try {
          let data = req.body;
          let category = new Category(data);
          await category.save();
          res.status(200).send('Category added successfully');
        } catch (err) {
          res.status(500).send('Failed to add category');
        }
      }
      

      



    


