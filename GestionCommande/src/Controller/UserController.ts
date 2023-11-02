
import { Request, Response } from "express";
import InfoUser from "../Model/InfoUser";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await InfoUser.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const AddUser = async (req: Request, res: Response) => {
  req.body.cin=null;
  let user = new InfoUser(req.body);
  try {
      const savedUser=await user.save();
      res.status(201).json(savedUser._id);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}


// function notifyNotificationService(userid:any) {
//   const axios = require('axios');
//   axios.post('http://localhost:8888/FEEDBACK-SERVICE/FeedBack/AddNotif', { 
//      idEnvoi: `${userid}`,
//      idRecu:"2",
//      Message:"test",
//      etat:0
//    });
// }


export const GetUserByEmail = async (req: Request, res: Response) => {
  try {
    const user = await InfoUser.findOne({email: req.params.email});
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}





