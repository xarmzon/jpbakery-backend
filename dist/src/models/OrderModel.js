"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
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
}, { timestamps: true });
const OrderModel = (0, mongoose_1.model)("Order", OrderSchema);
exports.default = OrderModel;
