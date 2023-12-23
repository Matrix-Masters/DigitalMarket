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

export const getNotificationsByIdRecu = async (req: Request, res: Response) => {
  try {
      const { idRecu } = req.params; 
      const notifications = await notification.find({ idRecu });
      res.json(notifications);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

