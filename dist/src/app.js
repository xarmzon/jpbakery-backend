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
require("module-alias/register");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const error_1 = require("./middleware/error");
const constants_1 = require("./utils/constants");
const error_2 = require("./services/error");
const database_1 = __importDefault(require("./services/database"));
const auth_1 = __importDefault(require("./routes/auth"));
const order_1 = __importDefault(require("./routes/order"));
const user_1 = __importDefault(require("./routes/user"));
const payment_1 = __importDefault(require("./routes/payment"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
const app = (0, express_1.default)();
/*** GENERAL MIDDLEWARE */
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
/* ROUTES */
app.use(constants_1.ROUTES.AUTH, auth_1.default);
app.use(constants_1.ROUTES.ORDERS, order_1.default);
app.use(constants_1.ROUTES.USERS, user_1.default);
app.use(constants_1.ROUTES.PAYMENTS, payment_1.default);
/** ERROR MIDDLEWARE */
app.use(error_1.errorLogger);
app.use(error_1.errorResponse);
/**** APPLICATION RUNNER */
const runServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.default)();
        const port = process.env.PORT;
        app.listen(port, () => {
            console.log(`[SERVER]: Server is running on port ${port}`);
        });
    }
    catch (err) {
        console.log((0, error_2.getErrorMessage)(err));
    }
});
runServer();
