import {
  createPayment,
  getPayments,
  updatePayment,
  verifyPayment,
} from "@controller/payment";
import { userRequired } from "@middleware/auth";
import { Router } from "express";

const paymentRoute = Router();

paymentRoute.all("*", userRequired);

paymentRoute
  .route("/")
  .get(getPayments)
  .post(createPayment)
  .patch(updatePayment);

paymentRoute.get("/verify", verifyPayment);

export default paymentRoute;
