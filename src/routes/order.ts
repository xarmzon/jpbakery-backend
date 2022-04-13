import { getOrders, createOrder } from "@controller/order";
import { userRequired } from "@middleware/auth";
import { Router } from "express";

const orderRouter = Router();

orderRouter.all("*", userRequired);
orderRouter.route("/").get(getOrders).post(createOrder);

export default orderRouter;
