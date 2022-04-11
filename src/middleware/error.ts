import { getErrorMessage } from "@services/Error";
import { MESSAGES } from "@utils/constants";
import { NextFunction, Response, Request } from "express";

export const errorLogger = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);
  next(error);
};

export const errorResponse = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const code = error?.code || 500;
  const data = error?.data;

  if (code)
    return res.status(code).json({ msg: getErrorMessage(error), error: data });
  res.status(500).json({ msg: MESSAGES.GENERAL_ERROR_MESSAGE });
};
