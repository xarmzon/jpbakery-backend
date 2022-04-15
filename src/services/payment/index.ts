import { Types } from "mongoose";
import OrderModel from "@models/OrderModel";
import paymentModel from "@models/PaymentModel";
import { createError } from "@services/ddddd/CustomError";
import { HTTP_REQUEST_CODES, MESSAGES } from "@utils/constants";
import { IncomingPayment, NewPayment } from "@utils/types";
import { validateNewData } from "@utils/validator";
import axios from "axios";
import { getCustomPaginationData } from "@services/database";

export const getUsersPayments = async (
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
        from: "orders",
        localField: "order",
        foreignField: "_id",
        as: "order",
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
        path: "$order",
      },
    },
    {
      $unwind: {
        path: "$user",
      },
    },
    {
      $project: {
        createdAt: 1,
        reference: 1,
        status: 1,
        user: {
          fullName: 1,
          email: 1,
        },
        order: {
          sampleCakeImage: 1,
          cakeColors: 1,
          cakeSize: 1,
          deliveryDate: 1,
          deliveryAddress: 1,
          charges: 1,
          nameOnCake: 1,
        },
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ];
  return await getCustomPaginationData(pipeline, paymentModel, page, perPage);
};
export const addPaymentToDB = async (data: NewPayment) => {
  const errors = validateNewData<IncomingPayment>(data);
  if (errors.length > 0) {
    createError(
      "You have error(s) in your form, please fix them",
      HTTP_REQUEST_CODES.BAD_REQUEST,
      errors
    );
    return;
  }

  const validOrder = await OrderModel.findById(data.order);
  if (!validOrder) {
    createError("Invalid Order ID, Please try again with a valid id");
    return;
  }
  const oldPayment = await paymentModel.findOne({ reference: data.reference });
  if (oldPayment) {
    return {
      msg: "Payment already exist for that reference number",
    };
  }
  await paymentModel.create(data);
  return {
    msg: MESSAGES.PAYMENT_ADDED,
  };
};

export const updateUserPayment = async (reference: string, status: number) => {
  if (!reference || !status) {
    createError(MESSAGES.BAD_REQUEST, HTTP_REQUEST_CODES.BAD_REQUEST);
  }

  const payment = await paymentModel.findOne({ reference }).populate("order");

  if (!payment) {
    createError(MESSAGES.PAYMENT_NOT_FOUND, HTTP_REQUEST_CODES.NOT_FOUND);
    return;
  }

  payment.status = status;

  await payment.save();

  return {
    msg: MESSAGES.PAYMENT_UPDATED,
  };
};
export const verifyUserPayment = async (reference: string) => {
  if (!reference) {
    createError(MESSAGES.BAD_REQUEST, HTTP_REQUEST_CODES.BAD_REQUEST);
    return;
  }
  const valid = await verifyPaystackPayment(reference);

  if (valid) {
    return {
      msg: MESSAGES.PAYMENT_SUCCESSFUL,
    };
  } else {
    createError(MESSAGES.PAYMENT_ERROR);
  }
};

const verifyPaystackPayment = async (reference: string) => {
  try {
    const { data } = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PRIVATE_PAYSTACK_KEY}`,
        },
      }
    );
    if (data.data.status === "success") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
