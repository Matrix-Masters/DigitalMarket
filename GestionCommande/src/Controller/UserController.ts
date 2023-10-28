
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
  let prod = new InfoUser(req.body);
  try {
      await prod.save() ;
      res.status(201).json(req.body);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

export const GetUserByEmail = async (req: Request, res: Response) => {
  try {
    const prod = await InfoUser.findOne({email: req.params.email});
    res.status(200).json(prod);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}





