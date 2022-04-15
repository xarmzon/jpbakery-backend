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
exports.userRequired = void 0;
const CustomError_1 = require("@services/errors/CustomError");
const constants_1 = require("@utils/constants");
const token_1 = require("@utils/token");
const userRequired = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (!authorization) {
        //const err = new CustomError()
        next((0, CustomError_1.createError)(constants_1.MESSAGES.ACCOUNT_REQUIRED, constants_1.HTTP_REQUEST_CODES.UNAUTHORIZED, undefined, "create"));
        return;
    }
    const token = authorization.split(" ")[1];
    try {
        const data = (0, token_1.verifyToken)(token);
        req.userId = data === null || data === void 0 ? void 0 : data.id;
        req.userRole = data === null || data === void 0 ? void 0 : data.role;
    }
    catch (err) {
        next((0, CustomError_1.createError)(constants_1.MESSAGES.INVALID_TOKEN, constants_1.HTTP_REQUEST_CODES.BAD_REQUEST, err === null || err === void 0 ? void 0 : err.message, "create"));
        return;
    }
    next();
});
exports.userRequired = userRequired;
