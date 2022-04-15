"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (data) => {
    const key = process.env.JWT_SECRET_KEY;
    return jsonwebtoken_1.default.sign(data, key, { expiresIn: "1d", subject: "User Access Token" });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    const key = process.env.JWT_SECRET_KEY;
    return jsonwebtoken_1.default.verify(token, key);
};
exports.verifyToken = verifyToken;
