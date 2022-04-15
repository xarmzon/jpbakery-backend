"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("@controller/order");
const auth_1 = require("@middleware/auth");
const express_1 = require("express");
const orderRouter = (0, express_1.Router)();
orderRouter.all("*", auth_1.userRequired);
orderRouter.route("/").get(order_1.getOrders).post(order_1.createOrder);
exports.default = orderRouter;
