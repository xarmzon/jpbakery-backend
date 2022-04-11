import { NextFunction, Request, Response } from "express";

export const userRequired = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next();
};
