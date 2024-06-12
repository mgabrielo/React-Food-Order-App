import { Request, Response } from "express";
import User from "../models/user";

export const createCurrentUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id: auth0Id });
    if (!existingUser) {
      if (!req.body.email) {
        return res
          .status(404)
          .json({ error: "Details for User are Unavailable" });
      }
      const newUser = new User(req.body);
      await newUser.save();
      return res.status(201).json(newUser.toObject());
    }
    return res.sendStatus(200);
  } catch (error) {
    console.log(`Create User Error - ${error}`);
    res.status(500).json({ error: "Error Creating User" });
  }
};

export const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { name, addressLine, country, city } = req.body;
    const user = await User.findById(req.userId);
    if (!user) {
      return res
        .status(404)
        .json({ error: "Details for User are Unavailable" });
    }
    user.name = name;
    user.addressLine = addressLine;
    user.city = city;
    user.country = country;
    await user.save();
    res.send(user);
  } catch (error) {
    console.log(`Update User Error - ${error}`);
    res.status(500).json({ error: "Error Updating User" });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const currentUser = await User.findOne({ _id: req.userId });
    if (!currentUser) {
      return res
        .status(404)
        .json({ error: "Details for User are Unavailable" });
    }
    return res.status(200).json(currentUser);
  } catch (error) {
    console.log(`Get User Error - ${error}`);
    res.status(500).json({ error: "Error Getting User" });
  }
};
