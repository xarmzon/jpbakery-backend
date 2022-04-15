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
exports.getUserOverviews = exports.updateProfilePicture = void 0;
const account_1 = require("@services/account");
const updateProfilePicture = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { picture } = req.body;
        const data = yield (0, account_1.updatePicture)(req.userId, picture);
        res.status(200).json({ msg: data === null || data === void 0 ? void 0 : data.msg, user: data === null || data === void 0 ? void 0 : data.user });
    }
    catch (error) {
        next(error);
    }
});
exports.updateProfilePicture = updateProfilePicture;
const getUserOverviews = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, account_1.userOverviews)(req.userId);
        res.status(200).json(Object.assign({}, data));
    }
    catch (error) {
        next(error);
    }
});
exports.getUserOverviews = getUserOverviews;
