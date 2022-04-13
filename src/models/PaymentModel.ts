import { PAYMENT_STATUS, USER_TYPES } from "@utils/constants";
import { Order, Payment } from "@utils/types";
import { Schema, model, models } from "mongoose";

const PaymentSchema = new Schema<Payment>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    reference: {
      type: String,
      required: true,
    },
    charges: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      default: PAYMENT_STATUS.UNPAID,
    },
  },
  { timestamps: true }
);

const paymentModel = model<Payment>("Payment", PaymentSchema);
export default paymentModel;
