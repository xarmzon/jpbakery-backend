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
exports.hashPassword = exports.validateUserPassword = exports.validateNewData = exports.validateAccountForm = exports.validateConfirmPassword = exports.validateRegPassword = exports.validateFullName = exports.validateEmail = void 0;
const validator_1 = __importDefault(require("validator"));
const bcryptjs_1 = require("bcryptjs");
const constants_1 = require("./constants");
const validateEmail = (email) => {
    return validator_1.default.isEmail(email);
};
exports.validateEmail = validateEmail;
const validateFullName = (fullName) => {
    return /^[a-zA-Z][a-zA-Z\s]{6,50}$/.test(fullName);
};
exports.validateFullName = validateFullName;
const validateRegPassword = (password) => {
    const minLength = 6;
    const minSymbols = 0;
    return validator_1.default.isStrongPassword(password, { minLength, minSymbols });
};
exports.validateRegPassword = validateRegPassword;
const validateConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
};
exports.validateConfirmPassword = validateConfirmPassword;
const validateAccountForm = (formData, cPass = false) => {
    const errors = [];
    const { fullName, email, password, cPassword } = formData;
    if (!(0, exports.validateFullName)(fullName))
        errors.push({ name: "fullName", msg: constants_1.MESSAGES.FORM.FULL_NAME });
    if (!(0, exports.validateEmail)(email))
        errors.push({ name: "email", msg: constants_1.MESSAGES.FORM.EMAIL });
    if (!(0, exports.validateRegPassword)(password))
        errors.push({ name: "password", msg: constants_1.MESSAGES.FORM.PASSWORD });
    if (cPass) {
        if (!(0, exports.validateConfirmPassword)(password, cPassword))
            errors.push({
                name: "cPassword",
                msg: constants_1.MESSAGES.FORM.CPASSWORD,
            });
    }
    return errors;
};
exports.validateAccountForm = validateAccountForm;
const validateNewData = (data) => {
    const errors = [];
    Object.entries(data).forEach((entry) => {
        const [key, val] = entry;
        if (typeof val === "string") {
            if (!val || !(val.length > 0))
                errors.push({ name: key, msg: `This field value is missing` });
        }
        else {
            if (!val || val < 500)
                errors.push({
                    name: key,
                    msg: `This field value is missing or less than 500`,
                });
        }
    });
    return errors;
};
exports.validateNewData = validateNewData;
const validateUserPassword = (password, hashPassword) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, bcryptjs_1.compare)(password, hashPassword); });
exports.validateUserPassword = validateUserPassword;
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, bcryptjs_1.hash)(password, 12); });
exports.hashPassword = hashPassword;
