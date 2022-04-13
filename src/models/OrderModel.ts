import { USER_TYPES } from "@utils/constants";
import { Order } from "@utils/types";
import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema<Order>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sampleCakeImage: {
      type: String,
      required: true,
    },
    cakeColors: {
      type: String,
      required: true,
    },
    nameOnCake: {
      type: String,
      required: true,
    },
    cakeSize: {
      type: String,
      enum: ["sm", "md", "lg"],
      required: true,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    deliveryDate: {
      type: String,
      required: true,
    },
    charges: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const OrderModel = model<Order>("Order", OrderSchema);
export default OrderModel;
