
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
      //notifyNotificationService(savedUser._id);
      res.status(201).json(savedUser._id);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}




export const GetUserByEmail = async (req: Request, res: Response) => {
  try {
    const user = await InfoUser.findOne({email: req.params.email});
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

export const AcceptUser = async (req: Request, res: Response) => {
  try {
    var user = await InfoUser.findOneAndUpdate({email:req.body.email},{$set:{status:1}});
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error accepting user: ', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const RefuseSupplier = async (req: Request, res: Response) => {
  try {
    var user = await InfoUser.findOneAndUpdate({email:req.body.email},{$set:{status:2}});
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error accepting user: ', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};





