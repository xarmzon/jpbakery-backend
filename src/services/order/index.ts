import { validateNewData } from "./../../utils/validator";
import OrderModel from "@models/OrderModel";
import { getCustomPaginationData } from "@services/database";
import { IncomingOrder, NewOrder } from "@utils/types";
import { Types } from "mongoose";
import { createError } from "@services/error/CustomError";
import { HTTP_REQUEST_CODES, MESSAGES } from "@utils/constants";

export const getUserOrders = async (
  userId: string,
  search?: string,
  page?: number,
  perPage?: number
) => {
  const pipeline = [
    {
      $match: {
        user: new Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: {
        path: "$user",
      },
    },
    {
      $project: {
        cakeColors: 1,
        deliveryAddress: 1,
        deliveryDate: 1,
        charges: 1,
        sampleCakeImage: 1,
        createdAt: 1,
        cakeSize: 1,
        user: {
          fullName: 1,
          email: 1,
        },
      },
    },
  ];

  return await getCustomPaginationData(pipeline, OrderModel, page, perPage);
};

export const createUserOrder = async (data: NewOrder) => {
  const errors = validateNewData<IncomingOrder>(data);
  if (errors.length > 0) {
    createError(
      "You have error(s) in your form, please fix them",
      HTTP_REQUEST_CODES.BAD_REQUEST,
      errors
    );
    return;
  }

  const order = await OrderModel.create(data);
  return {
    msg: MESSAGES.NEW_ORDER_SUCCESSFUL,
    orderId: order._id,
  };
};
