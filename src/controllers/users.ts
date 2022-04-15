import { updatePicture, userOverviews } from "@services/account";
import { RequestWithUserIdAndRole } from "@utils/types";
import { NextFunction, Response } from "express";

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

export const getUserOverviews = async (
  req: RequestWithUserIdAndRole,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await userOverviews(req.userId!);
    res.status(200).json({ ...data });
  } catch (error) {
    next(error);
  }
};
