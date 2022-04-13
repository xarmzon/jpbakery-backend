import { createUserOrder, getUserOrders } from "@services/order";
import { RequestWithUserIdAndRole } from "@utils/types";
import { NextFunction, Response } from "express";

export const getOrders = async (
  req: RequestWithUserIdAndRole,
  res: Response,
  next: NextFunction
) => {
  const { search, per_page, page } = req.query;
  try {
    const data = await getUserOrders(
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

export const createOrder = async (
  req: RequestWithUserIdAndRole,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      sampleCakeImage,
      cakeColors,
      cakeSize,
      deliveryDate,
      deliveryAddress,
      charges,
      nameOnCake,
    } = req.body;
    const data = await createUserOrder({
      user: req.userId!,
      sampleCakeImage,
      cakeColors,
      cakeSize,
      deliveryAddress,
      deliveryDate,
      charges,
      nameOnCake,
    });
    res.status(201).json({ ...data });
  } catch (error) {
    next(error);
  }
};
