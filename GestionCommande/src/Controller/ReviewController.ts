import { Request,Response } from "express";
import Review from "../Model/Review";


export const addReview = async (req:Request,res:Response)=>{

    try{
        const review = new Review({
            Content:req.body.content,
            Note:req.body.note,
            Product_id:req.body.product_id,
            User_id:req.body.user_id
        });
        const saveReview = await review.save();
        res.status(201).json(saveReview);
    }catch(e:any){
        res.status(500).json({message:e.message})
    }

}

export const getReviews = async (req:Request,res:Response)=>{

    try{
        const reviews = await Review.find({},{Content:1,Note:1})
        res.status(200).json(reviews);
    }catch(e:any){
        res.status(500).json({message:e.message})
    }
}