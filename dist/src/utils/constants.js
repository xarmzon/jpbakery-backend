"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROUTES = exports.HTTP_REQUEST_CODES = exports.MESSAGES = exports.USER_TYPES_TEXT = exports.PAYMENT_STATUS = exports.FULLNAME_MAX = exports.FULLNAME_MIN = exports.PASSWORD_MIN = exports.ALLOWED_FILE_SIZE_DP = exports.ALLOWED_EXTENSIONS_FOR_DP = exports.PER_PAGE = exports.USER_TYPES = void 0;
exports.USER_TYPES = {
    ADMIN: 1,
    CLIENT: 0,
};
exports.PER_PAGE = 10;
exports.ALLOWED_EXTENSIONS_FOR_DP = ["jpeg", "jpg", "png"];
exports.ALLOWED_FILE_SIZE_DP = 1024 * 80; // 80kb
exports.PASSWORD_MIN = 6;
exports.FULLNAME_MIN = 6;
exports.FULLNAME_MAX = 50;
exports.PAYMENT_STATUS = {
    PAID: 1,
    UNPAID: 0,
};
exports.USER_TYPES_TEXT = ["Client", "Admin"];
exports.MESSAGES = {
    PAYMENT_NOT_FOUND: "Oops! We can't find the Payment you're looking for.",
    PAYMENT_SUCCESSFUL: "Payment completed successfully.",
    PAYMENT_ERROR: "Sorry your payment failed.",
    PAYMENT_ADDED: "The Payment Data has been added successfully.",
    PAYMENT_REMOVED: "The Payment Data has been removed successfully.",
    PAYMENT_UPDATED: "The Payment Data has been updated successfully.",
    ACCOUNT_UPDATED: "Account updated successfully.",
    ACCOUNT_DELETED: "Account deleted successfully.",
    ACCOUNT_REQUIRED: "Sorry! only registered users can access this route",
    ACCOUNT_NOT_FOUND: "Oops! We can't find the Account you're looking for",
    ACCOUNT_EXIST: "Sorry, An account already exist with one of the details supplied",
    INVALID_REQUEST: "Invalid Request",
    BAD_REQUEST: "Bad Request, please try again with valid request data",
    NO_VALID_CREDENTIALS: "No credentials supplied, Please try again",
    INVALID_CREDENTIALS: "Sorry! Invalid credentials supplied, Please try again",
    NEW_ACCOUNT_SUCCESSFUL: "Account created successfully",
    NEW_ORDER_SUCCESSFUL: "New order created successfully",
    LOGOUT_SUCCESSFUL: "Your account has been logged out successfully",
    UNKNOWN_ERROR: "Unknown Error occurred. Please try again",
    INVALID_TOKEN: "Invalid/expired token supplied. Please try again with a valid token",
    LOGIN_SUCCESSFUL: "Account Logged-in successfully",
    LOGIN_ERROR: "Sorry, Your email or password is incorrect",
    NO_USER: "Sorry, We can't find the User with the supplied details",
    EMAIL_EXIST: "Sorry! This Email has been registered. Choose another one for your account",
    FORM_ERROR: "Please fill the form properly",
    LOGIN_REQUIRED: "Please login first before you can access that route",
    ADMIN_REQUIRED: "Sorry! only Admin can access that route",
    ALREADY_LOGIN: "Please Logout first before you can have access to that route",
    NO_DATA_TO_DISPLAY: "SORRY! NO DATA AVAILABLE TO DISPLAY",
    NO_ACCESS_TO_ROUTE: "Oops! You don't have access to this route",
    GENERAL_ERROR_MESSAGE: "Oops! Something went wrong with your request. please try again",
    METHOD_NOT_ALLOWED: "Sorry, Method not allowed or not yet supported",
    FORM: {
        FULL_NAME: `Invalid full name, please try again with minimum of ${exports.FULLNAME_MIN} and maximum of ${exports.FULLNAME_MAX} letters`,
        EMAIL: "Invalid email supplied, please try again",
        PASSWORD: `Invalid password, please supplied a minimum of ${exports.PASSWORD_MIN} characters with ${1} or more uppercase letters and ${1} or more numbers`,
        CPASSWORD: "The supplied passwords do not match, please try again",
    },
};
exports.HTTP_REQUEST_CODES = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
};
const API_VERSION_ROUTE = "/api/v1";
exports.ROUTES = {
    AUTH: `${API_VERSION_ROUTE}/auth`,
    ORDERS: `${API_VERSION_ROUTE}/order`,
    PAYMENTS: `${API_VERSION_ROUTE}/payment`,
    USERS: `${API_VERSION_ROUTE}/user`,
};
