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


    export const UpdateCategory = async (req: Request, res: Response) =>
    {
        try{
            let categoryId = req.params.id;
            let data = req.body;
            let updatedCategory = await Category.findByIdAndUpdate(categoryId,data,{new:true})
            if(!updatedCategory)
            {
                res.status(404).send("Category not found");
            }
            res.status(200).send("Category updated successfully");
        }catch(err)
        {
            res.status(500).send("Failed to update Category");
        }
    }
      


      

      



    


