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
exports.signupUser = exports.loginUser = void 0;
const account_1 = require("@services/account");
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const data = yield (0, account_1.loginAccount)(email, password);
        res
            .status(200)
            .json({ msg: data === null || data === void 0 ? void 0 : data.msg, token: data === null || data === void 0 ? void 0 : data.token, user: data === null || data === void 0 ? void 0 : data.user });
    }
    catch (err) {
        next(err);
    }
});
exports.loginUser = loginUser;
const signupUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, email, password } = req.body;
    try {
        const data = yield (0, account_1.createAccount)(fullName, email, password);
        res.status(201).json({ msg: data === null || data === void 0 ? void 0 : data.msg, user: data === null || data === void 0 ? void 0 : data.user });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.signupUser = signupUser;
