"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorMessage = void 0;
const constants_1 = require("@utils/constants");
const getErrorMessage = (e) => {
    return (e === null || e === void 0 ? void 0 : e.message) ? e === null || e === void 0 ? void 0 : e.message : constants_1.MESSAGES.GENERAL_ERROR_MESSAGE;
};
exports.getErrorMessage = getErrorMessage;
