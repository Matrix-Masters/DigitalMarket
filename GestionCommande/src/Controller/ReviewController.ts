import { Request,Response } from "express";
import Review from "../Model/Review";


export const addReview = async (req: Request, res: Response) => {
    try {
        
        if (!req.body.content || !req.body.note || !req.body.product_id|| !req.body.user_id) {
           
            return res.status(400).json({ message: "All fields are required." });
        }

        const review = new Review({ Content:req.body.content, Note:req.body.note, Product_id:req.body.product_id, User_id:req.body.user_id });
        const saveReview = await review.save();

        return res.status(201).json(saveReview);
    } catch (error) {
        
        console.error("Error in addReview:", error);

        return res.status(500).json({ message: "Internal server error." });
    }
};


export const getAllReviews = async (req:Request,res:Response)=>{

    try{
        const reviews = await Review.find({Product_id:"null"}).populate('User_id',).exec();
        res.status(200).json(reviews);
    }catch(e:any){
        res.status(500).json({message:e.message})
    }
}

export const getReviewByProductId = async (req:Request,res:Response)=>{

    try{
        const reviews = await Review.find({
            Product_id : req.params.id
        }).exec();
        res.status(200).json(reviews);
    }catch(e:any){
        res.status(500).json({message:e.message})
    }
}