"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("@utils/constants");
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    fullName: {
        type: String,
        required: true,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        maxlength: 50,
        unique: true,
        index: true,
    },
    picture: {
        type: String,
    },
    role: {
        type: Number,
        default: constants_1.USER_TYPES.CLIENT,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const UserModel = (0, mongoose_1.model)("User", UserSchema);
exports.default = UserModel;
