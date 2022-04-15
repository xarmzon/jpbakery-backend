"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const payment_1 = require("@controller/payment");
const auth_1 = require("@middleware/auth");
const express_1 = require("express");
const paymentRoute = (0, express_1.Router)();
paymentRoute.all("*", auth_1.userRequired);
paymentRoute
    .route("/")
    .get(payment_1.getPayments)
    .post(payment_1.createPayment)
    .patch(payment_1.updatePayment);
paymentRoute.get("/verify", payment_1.verifyPayment);
exports.default = paymentRoute;
