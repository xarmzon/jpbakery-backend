import { createAccount } from "@services/account";
import { MESSAGES } from "@utils/constants";
import { NextFunction, Request, Response } from "express";

export const loginUser = async (req: Request, res: Response) => {
  return res.status(200).json({ user: "Xarmzon" });
};

export const signupUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { fullName, email, password } = req.body;
  try {
    const data = await createAccount(fullName, email, password);
    res.status(201).json({ msg: data?.msg, user: data?.user });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};
