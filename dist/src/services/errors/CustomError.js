"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createError = exports.CustomError = void 0;
class CustomError extends Error {
    constructor(msg, code, data) {
        super(msg);
        this.name = this.constructor.name;
        this.code = code;
        this.data = data;
    }
}
exports.CustomError = CustomError;
const createError = (msg, code = 500, data, type = "throw") => {
    switch (type) {
        case "create":
            return new CustomError(msg, code, data);
        case "throw":
            throw new CustomError(msg, code, data);
    }
};
exports.createError = createError;
