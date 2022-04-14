import {
  addPaymentToDB,
  getUsersPayments,
  updateUserPayment,
  verifyUserPayment,
} from "@services/payment";
import { RequestWithUserIdAndRole } from "@utils/types";
import { NextFunction, Response } from "express";

export const getPayments = async (
  req: RequestWithUserIdAndRole,
  res: Response,
  next: NextFunction
) => {
  try {
    const { search, page, per_page } = req.query;
    const data = await getUsersPayments(
      req.userId!,
      search as string,
      +(page as string),
      +(per_page as string)
    );
    res.status(200).json({ ...data });
  } catch (error) {
    next(error);
  }
};
export const createPayment = async (
  req: RequestWithUserIdAndRole,
  res: Response,
  next: NextFunction
) => {
  try {
    const { order, reference, charges } = req.body;
    const data = await addPaymentToDB({
      user: req.userId!,
      order,
      reference,
      charges,
    });
    if (data?.msg.includes("exist")) {
      res.status(200).json({ ...data });
      return;
    }
    res.status(201).json({ ...data });
  } catch (error) {
    next(error);
  }
};
export const verifyPayment = async (
  req: RequestWithUserIdAndRole,
  res: Response,
  next: NextFunction
) => {
  try {
    const { reference } = req.query;
    const data = await verifyUserPayment(reference as string);

    res.status(201).json({ ...data });
  } catch (error) {
    next(error);
  }
};
export const updatePayment = async (
  req: RequestWithUserIdAndRole,
  res: Response,
  next: NextFunction
) => {
  try {
    const { reference, status } = req.body;
    const data = await updateUserPayment(reference, status);
    res.status(201).json({ ...data });
  } catch (error) {
    next(error);
  }
};
