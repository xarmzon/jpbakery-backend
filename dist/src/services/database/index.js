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
exports.getCustomPaginationData = exports.getPagination = void 0;
const constants_1 = require("@utils/constants");
const mongoose_1 = __importDefault(require("mongoose"));
const connectMongoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    if (mongoose_1.default.connections[0].readyState === 1) {
        console.log("Already connected");
        return;
    }
    yield mongoose_1.default.connect(process.env.DATABASE_URI || "mongodb://localhost:27017/jpbakery");
    console.log("Database connected.....");
});
exports.default = connectMongoDB;
const getPagination = (page, size) => {
    const limit = size ? +size : constants_1.PER_PAGE;
    const offset = page && page > 1 ? (page - 1) * limit : 0 * constants_1.PER_PAGE;
    return { limit, offset };
};
exports.getPagination = getPagination;
const getCustomPaginationData = (pipeline, model, page = 1, perPage = constants_1.PER_PAGE) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { limit, offset } = (0, exports.getPagination)(page, perPage);
    const countPipeline = [
        ...pipeline,
        {
            $count: "totalItems",
        },
    ];
    pipeline.push({ $skip: offset }, { $limit: limit });
    const results = yield model.aggregate(pipeline).exec();
    const resultsCount = yield model.aggregate(countPipeline).exec();
    const totalItems = ((_a = resultsCount[0]) === null || _a === void 0 ? void 0 : _a.totalItems)
        ? (_b = resultsCount[0]) === null || _b === void 0 ? void 0 : _b.totalItems
        : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return {
        results,
        paging: {
            totalPages,
            page: page ? (page < 1 ? 1 : page) : 1,
            totalItems,
            perPage: perPage ? perPage : constants_1.PER_PAGE,
        },
    };
});
exports.getCustomPaginationData = getCustomPaginationData;
