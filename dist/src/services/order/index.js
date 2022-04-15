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
exports.createUserOrder = exports.getUserOrders = void 0;
const validator_1 = require("./../../utils/validator");
const OrderModel_1 = __importDefault(require("@models/OrderModel"));
const database_1 = require("@services/database");
const mongoose_1 = require("mongoose");
const CustomError_1 = require("@services/errors/CustomError");
const constants_1 = require("@utils/constants");
const getUserOrders = (userId, search, page, perPage) => __awaiter(void 0, void 0, void 0, function* () {
    const pipeline = [
        {
            $match: {
                user: new mongoose_1.Types.ObjectId(userId),
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
                path: "$user",
            },
        },
        {
            $lookup: {
                from: "payments",
                localField: "_id",
                foreignField: "order",
                as: "payments",
            },
        },
        {
            $project: {
                cakeColors: 1,
                deliveryAddress: 1,
                deliveryDate: 1,
                charges: 1,
                sampleCakeImage: 1,
                createdAt: 1,
                cakeSize: 1,
                nameOnCake: 1,
                user: {
                    fullName: 1,
                    email: 1,
                },
                payment: {
                    reference: {
                        $arrayElemAt: ["$payments.reference", 0],
                    },
                    status: {
                        $arrayElemAt: ["$payments.status", 0],
                    },
                },
            },
        },
        {
            $sort: {
                createdAt: -1,
            },
        },
    ];
    return yield (0, database_1.getCustomPaginationData)(pipeline, OrderModel_1.default, page, perPage);
});
exports.getUserOrders = getUserOrders;
const createUserOrder = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, validator_1.validateNewData)(data);
    if (errors.length > 0) {
        (0, CustomError_1.createError)("You have error(s) in your form, please fix them", constants_1.HTTP_REQUEST_CODES.BAD_REQUEST, errors);
        return;
    }
    const order = yield OrderModel_1.default.create(data);
    return {
        msg: constants_1.MESSAGES.NEW_ORDER_SUCCESSFUL,
        orderId: order._id,
    };
});
exports.createUserOrder = createUserOrder;
