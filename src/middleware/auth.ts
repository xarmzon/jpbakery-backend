import { NextFunction, Request, Response } from "express";
import { createError, CustomError } from "@services/error/CustomError";
import { HTTP_REQUEST_CODES, MESSAGES } from "@utils/constants";
import { verifyToken } from "@utils/token";
import { RequestWithUserIdAndRole } from "@utils/types";

export const userRequired = async (
  req: RequestWithUserIdAndRole,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    //const err = new CustomError()
    next(
      createError(
        MESSAGES.ACCOUNT_REQUIRED,
        HTTP_REQUEST_CODES.UNAUTHORIZED,
        undefined,
        "create"
      )
    );
    return;
  }
  const token = authorization.split(" ")[1];
  try {
    const data: any = verifyToken(token);
    req.userId = data?.id;
    req.userRole = data?.role;
  } catch (err: any) {
    next(
      createError(
        MESSAGES.INVALID_TOKEN,
        HTTP_REQUEST_CODES.BAD_REQUEST,
        err?.message,
        "create"
      )
    );
    return;
  }
  next();
};
