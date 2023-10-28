import { Request, Response } from "express";
import notification from "../Model/Notification";


export const AddNotif=async (Req:Request,res:Response)=>{
        let notif = new notification(Req.body);
        try {
            await notif.save() ;
            res.status(201).json(Req.body);
        } catch (err) {
          res.status(500).json({ error: err });
        }
}