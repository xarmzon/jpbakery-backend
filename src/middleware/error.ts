import { getErrorMessage } from "@services/ddddd";
import { CustomError } from "@services/ddddd/CustomError";
import { MESSAGES } from "@utils/constants";
import { NextFunction, Response, Request } from "express";

export const errorLogger = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const err = `${error?.name ?? "Error"}:-> ${error?.message}`;
  console.error(err);
  next(error);
};

export const errorResponse = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof CustomError) {
    const code = error?.code || 500;
    const data = error?.data;

    if (code)
      return res
        .status(code)
        .json({ msg: getErrorMessage(error), error: data });
  }
  res
    .status(error?.statusCode ? error?.statusCode : 500)
    .json({ msg: MESSAGES.GENERAL_ERROR_MESSAGE });
};
