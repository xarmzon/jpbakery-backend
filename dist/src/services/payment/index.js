"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserPayment = exports.updateUserPayment = exports.addPaymentToDB = exports.getUsersPayments = void 0;
const mongoose_1 = require("mongoose");
const OrderModel_1 = __importDefault(require("@models/OrderModel"));
const PaymentModel_1 = __importDefault(require("@models/PaymentModel"));
const CustomError_1 = require("@services/error/CustomError");
const constants_1 = require("@utils/constants");
const validator_1 = require("@utils/validator");
const axios_1 = __importDefault(require("axios"));
const database_1 = require("@services/database");
const getUsersPayments = (userId, search, page, perPage) => __awaiter(void 0, void 0, void 0, function* () {
    const pipeline = [
        {
            $match: {
                user: new mongoose_1.Types.ObjectId(userId),
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
    return yield (0, database_1.getCustomPaginationData)(pipeline, PaymentModel_1.default, page, perPage);
});
exports.getUsersPayments = getUsersPayments;
const addPaymentToDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, validator_1.validateNewData)(data);
    if (errors.length > 0) {
        (0, CustomError_1.createError)("You have error(s) in your form, please fix them", constants_1.HTTP_REQUEST_CODES.BAD_REQUEST, errors);
        return;
    }
    const validOrder = yield OrderModel_1.default.findById(data.order);
    if (!validOrder) {
        (0, CustomError_1.createError)("Invalid Order ID, Please try again with a valid id");
        return;
    }
    const oldPayment = yield PaymentModel_1.default.findOne({ reference: data.reference });
    if (oldPayment) {
        return {
            msg: "Payment already exist for that reference number",
        };
    }
    yield PaymentModel_1.default.create(data);
    return {
        msg: constants_1.MESSAGES.PAYMENT_ADDED,
    };
});
exports.addPaymentToDB = addPaymentToDB;
const updateUserPayment = (reference, status) => __awaiter(void 0, void 0, void 0, function* () {
    if (!reference || !status) {
        (0, CustomError_1.createError)(constants_1.MESSAGES.BAD_REQUEST, constants_1.HTTP_REQUEST_CODES.BAD_REQUEST);
    }
    const payment = yield PaymentModel_1.default.findOne({ reference }).populate("order");
    if (!payment) {
        (0, CustomError_1.createError)(constants_1.MESSAGES.PAYMENT_NOT_FOUND, constants_1.HTTP_REQUEST_CODES.NOT_FOUND);
        return;
    }
    payment.status = status;
    yield payment.save();
    return {
        msg: constants_1.MESSAGES.PAYMENT_UPDATED,
    };
});
exports.updateUserPayment = updateUserPayment;
const verifyUserPayment = (reference) => __awaiter(void 0, void 0, void 0, function* () {
    if (!reference) {
        (0, CustomError_1.createError)(constants_1.MESSAGES.BAD_REQUEST, constants_1.HTTP_REQUEST_CODES.BAD_REQUEST);
        return;
    }
    const valid = yield verifyPaystackPayment(reference);
    if (valid) {
        return {
            msg: constants_1.MESSAGES.PAYMENT_SUCCESSFUL,
        };
    }
    else {
        (0, CustomError_1.createError)(constants_1.MESSAGES.PAYMENT_ERROR);
    }
});
exports.verifyUserPayment = verifyUserPayment;
const verifyPaystackPayment = (reference) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield axios_1.default.get(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: {
                Authorization: `Bearer ${process.env.PRIVATE_PAYSTACK_KEY}`,
            },
        });
        if (data.data.status === "success") {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
