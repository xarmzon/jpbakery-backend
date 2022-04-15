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
exports.updatePayment = exports.verifyPayment = exports.createPayment = exports.getPayments = void 0;
const payment_1 = require("@services/payment");
const getPayments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search, page, per_page } = req.query;
        const data = yield (0, payment_1.getUsersPayments)(req.userId, search, +page, +per_page);
        res.status(200).json(Object.assign({}, data));
    }
    catch (error) {
        next(error);
    }
});
exports.getPayments = getPayments;
const createPayment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order, reference, charges } = req.body;
        const data = yield (0, payment_1.addPaymentToDB)({
            user: req.userId,
            order,
            reference,
            charges,
        });
        if (data === null || data === void 0 ? void 0 : data.msg.includes("exist")) {
            res.status(200).json(Object.assign({}, data));
            return;
        }
        res.status(201).json(Object.assign({}, data));
    }
    catch (error) {
        next(error);
    }
});
exports.createPayment = createPayment;
const verifyPayment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { reference } = req.query;
        const data = yield (0, payment_1.verifyUserPayment)(reference);
        res.status(201).json(Object.assign({}, data));
    }
    catch (error) {
        next(error);
    }
});
exports.verifyPayment = verifyPayment;
const updatePayment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { reference, status } = req.body;
        const data = yield (0, payment_1.updateUserPayment)(reference, status);
        res.status(201).json(Object.assign({}, data));
    }
    catch (error) {
        next(error);
    }
});
exports.updatePayment = updatePayment;
