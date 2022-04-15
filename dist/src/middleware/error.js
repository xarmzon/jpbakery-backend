"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.errorLogger = void 0;
const error_1 = require("@services/error");
const CustomError_1 = require("@services/error/CustomError");
const constants_1 = require("@utils/constants");
const errorLogger = (error, req, res, next) => {
    var _a;
    const err = `${(_a = error === null || error === void 0 ? void 0 : error.name) !== null && _a !== void 0 ? _a : "Error"}:-> ${error === null || error === void 0 ? void 0 : error.message}`;
    console.error(err);
    next(error);
};
exports.errorLogger = errorLogger;
const errorResponse = (error, req, res, next) => {
    if (error instanceof CustomError_1.CustomError) {
        const code = (error === null || error === void 0 ? void 0 : error.code) || 500;
        const data = error === null || error === void 0 ? void 0 : error.data;
        if (code)
            return res
                .status(code)
                .json({ msg: (0, error_1.getErrorMessage)(error), error: data });
    }
    res
        .status((error === null || error === void 0 ? void 0 : error.statusCode) ? error === null || error === void 0 ? void 0 : error.statusCode : 500)
        .json({ msg: constants_1.MESSAGES.GENERAL_ERROR_MESSAGE });
};
exports.errorResponse = errorResponse;
