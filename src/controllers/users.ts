import { Request, Response } from "express";

export const getUsers = async (req: Request, res: Response) => {
  return res.status(200).json({ msg: "seen" });
};
