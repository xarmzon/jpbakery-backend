import { createAccount, loginAccount } from "@services/account";
import { NextFunction, Request, Response } from "express";

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const data = await loginAccount(email, password);
    res
      .status(200)
      .json({ msg: data?.msg, token: data?.token, user: data?.user });
  } catch (err: any) {
    next(err);
  }
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
