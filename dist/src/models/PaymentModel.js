"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("@utils/constants");
const mongoose_1 = require("mongoose");
const PaymentSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    order: {
        type: mongoose_1.Schema.Types.ObjectId,
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
        default: constants_1.PAYMENT_STATUS.UNPAID,
    },
}, { timestamps: true });
const paymentModel = (0, mongoose_1.model)("Payment", PaymentSchema);
exports.default = paymentModel;
