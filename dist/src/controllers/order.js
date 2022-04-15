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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = exports.getOrders = void 0;
const order_1 = require("@services/order");
const getOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, per_page, page } = req.query;
    try {
        const data = yield (0, order_1.getUserOrders)(req.userId, search, +page, +per_page);
        res.status(200).json(Object.assign({}, data));
    }
    catch (error) {
        next(error);
    }
});
exports.getOrders = getOrders;
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sampleCakeImage, cakeColors, cakeSize, deliveryDate, deliveryAddress, charges, nameOnCake, } = req.body;
        const data = yield (0, order_1.createUserOrder)({
            user: req.userId,
            sampleCakeImage,
            cakeColors,
            cakeSize,
            deliveryAddress,
            deliveryDate,
            charges,
            nameOnCake,
        });
        res.status(201).json(Object.assign({}, data));
    }
    catch (error) {
        next(error);
    }
});
exports.createOrder = createOrder;
