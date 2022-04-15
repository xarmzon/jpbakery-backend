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
exports.userOverviews = exports.updatePicture = exports.loginAccount = exports.createAccount = void 0;
const mongoose_1 = require("mongoose");
const UserModel_1 = __importDefault(require("@models/UserModel"));
const CustomError_1 = require("@services/error/CustomError");
const constants_1 = require("@utils/constants");
const token_1 = require("@utils/token");
const validator_1 = require("@utils/validator");
const createAccount = (fullName, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const formErrors = (0, validator_1.validateAccountForm)({ fullName, email, password });
    if (formErrors.length > 0) {
        (0, CustomError_1.createError)("You have error(s) in your registration form, please fix them", constants_1.HTTP_REQUEST_CODES.BAD_REQUEST, formErrors);
        return;
    }
    const emailExist = yield UserModel_1.default.findOne({ email });
    if (emailExist) {
        (0, CustomError_1.createError)(constants_1.MESSAGES.EMAIL_EXIST, constants_1.HTTP_REQUEST_CODES.BAD_REQUEST);
        return;
    }
    const user = yield UserModel_1.default.create({
        fullName,
        email,
        password: yield (0, validator_1.hashPassword)(password),
    });
    return { user, msg: constants_1.MESSAGES.NEW_ACCOUNT_SUCCESSFUL };
});
exports.createAccount = createAccount;
const loginAccount = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserModel_1.default.findOne({ email });
    if (!user) {
        (0, CustomError_1.createError)(constants_1.MESSAGES.NO_USER, constants_1.HTTP_REQUEST_CODES.NOT_FOUND);
        return;
    }
    const isPassMatch = yield (0, validator_1.validateUserPassword)(password, user.password);
    if (!isPassMatch) {
        (0, CustomError_1.createError)(constants_1.MESSAGES.LOGIN_ERROR, constants_1.HTTP_REQUEST_CODES.BAD_REQUEST);
        return;
    }
    return {
        msg: constants_1.MESSAGES.LOGIN_SUCCESSFUL,
        token: (0, token_1.generateToken)({ id: user._id, role: user.role }),
        user: prepareUserData(user),
    };
});
exports.loginAccount = loginAccount;
const updatePicture = (userId, picture) => __awaiter(void 0, void 0, void 0, function* () {
    if (!picture || picture.length < 1) {
        (0, CustomError_1.createError)("Please provide a valid image data", constants_1.HTTP_REQUEST_CODES.BAD_REQUEST);
        return;
    }
    const user = yield UserModel_1.default.findById(userId);
    if (!user) {
        (0, CustomError_1.createError)(constants_1.MESSAGES.NO_USER, constants_1.HTTP_REQUEST_CODES.NOT_FOUND);
        return;
    }
    user.picture = picture;
    yield user.save();
    return {
        user: prepareUserData(user),
        msg: "Profile Picture updated successfully",
    };
});
exports.updatePicture = updatePicture;
const prepareUserData = (user) => {
    return {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        createdAt: user.createdAt,
        picture: user.picture || "",
        role: user.role,
    };
};
const userOverviews = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const pipeline = [
        {
            $match: {
                _id: new mongoose_1.Types.ObjectId(userId),
            },
        },
        {
            $lookup: {
                from: "orders",
                localField: "_id",
                foreignField: "user",
                as: "orders",
            },
        },
        {
            $lookup: {
                from: "payments",
                localField: "_id",
                foreignField: "user",
                as: "payments",
            },
        },
        {
            $lookup: {
                from: "payments",
                let: {
                    user: "$_id",
                },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    {
                                        $eq: ["$status", 1],
                                    },
                                    {
                                        $eq: ["$user", "$$user"],
                                    },
                                ],
                            },
                        },
                    },
                ],
                as: "confirmedPayments",
            },
        },
        {
            $project: {
                _id: 0,
                payments: {
                    $size: "$payments",
                },
                orders: {
                    $size: "$orders",
                },
                confirmedPayments: {
                    $size: "$confirmedPayments",
                },
            },
        },
    ];
    const result = yield UserModel_1.default.aggregate(pipeline).exec();
    return result[0];
});
exports.userOverviews = userOverviews;
