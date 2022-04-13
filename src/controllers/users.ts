import { updatePicture } from "@services/account";
import { RequestWithUserIdAndRole } from "@utils/types";
import { NextFunction, Request, Response } from "express";

export const getUsers = async (req: Request, res: Response) => {
  return res.status(200).json({ msg: "seen" });
};

export const updateProfilePicture = async (
  req: RequestWithUserIdAndRole,
  res: Response,
  next: NextFunction
) => {
  try {
    const { picture } = req.body;
    const data = await updatePicture(req.userId!, picture);
    res.status(200).json({ msg: data?.msg, user: data?.user });
  } catch (error) {
    next(error);
  }
};
