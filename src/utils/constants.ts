export const APP_NAME = "JP BAKERY";
export const DEFAULT_SEO = {
  title: "Home of Good cakes",
  defaultTitle: "",
  titleTemplate: `%s | ${APP_NAME}`,
  description: "",
};

export const USER_TYPES = {
  ADMIN: 1,
  CLIENT: 0,
};

export const PER_PAGE = 10;
export const ALLOWED_EXTENSIONS_FOR_DP = ["jpeg", "jpg", "png"];
export const ALLOWED_FILE_SIZE_DP = 1024 * 80; // 80kb
export const PASSWORD_MIN = 6;
export const FULLNAME_MIN = 6;
export const FULLNAME_MAX = 50;

export const PAYMENT_STATUS = {
  PAID: 1,
  UNPAID: 0,
};

export const USER_TYPES_TEXT = ["Client", "Admin"];

export const MESSAGES = {
  PAYMENT_NOT_FOUND: "Oops! We can't find the Payment you're looking for.",
  PAYMENT_SUCCESSFUL: "Payment completed successfully.",
  PAYMENT_ERROR: "Sorry your payment failed.",
  PAYMENT_ADDED: "The Payment Data has been added successfully.",
  PAYMENT_REMOVED: "The Payment Data has been removed successfully.",
  PAYMENT_UPDATED: "The Payment Data has been updated successfully.",
  ACCOUNT_UPDATED: "Account updated successfully.",
  ACCOUNT_DELETED: "Account deleted successfully.",
  ACCOUNT_NOT_FOUND: "Oops! We can't find the Account you're looking for",
  ACCOUNT_EXIST:
    "Sorry, An account already exist with one of the details supplied",
  INVALID_REQUEST: "Invalid Request",
  BAD_REQUEST: "Bad Request, please try again with valid request data",
  NO_VALID_CREDENTIALS: "No credentials supplied, Please try again",
  INVALID_CREDENTIALS: "Sorry! Invalid credentials supplied, Please try again",
  NEW_ACCOUNT_SUCCESSFUL: "Account created successfully",
  LOGOUT_SUCCESSFUL: "Your account has been logged out successfully",
  UNKNOWN_ERROR: "Unknown Error occurred. Please try again",
  INVALID_USERNAME: "Invalid Username supplied. Please choose another one",
  LOGIN_SUCCESSFUL: "Account Logged-in successfully",
  LOGIN_ERROR: "Sorry, Your email or password is incorrect",
  NO_USER: "Sorry, We can't find the User with the supplied details",
  EMAIL_EXIST:
    "Sorry! This Email has been registered. Choose another one for your account",
  FORM_ERROR: "Please fill the form properly",
  LOGIN_REQUIRED: "Please login first before you can access that page",
  ADMIN_REQUIRED: "Sorry! only Admin can access that page",
  ALREADY_LOGIN: "Please Logout first before you can have access to that page",
  FETCH_LOADING_ERROR:
    "Error Occurred while fetching the data. Please use the refresh button to reload the data",
  FETCH_LOADING_ERROR2: "Error occurred while fetching the data. Reload now",
  FETCH_LOADING_SUCCESS: "Data Fetched successfully",
  FETCH_LOADING_DATA: "Loading Data.........",
  NO_DATA_TO_DISPLAY: "SORRY! NO DATA AVAILABLE TO DISPLAY",
  NO_ACCESS_TO_ROUTE: "Oops! You don't have access to this route",
  GENERAL_ERROR_MESSAGE:
    "Oops! Something went wrong with your request. please try again",
  METHOD_NOT_ALLOWED: "Sorry, Method not allowed or not yet supported",
  FORM: {
    FULL_NAME: `Invalid full name, please try again with minimum of ${FULLNAME_MIN} and maximum of ${FULLNAME_MAX} letters`,
    EMAIL: "Invalid email supplied, please try again",
    PASSWORD: `Invalid password, please supplied a minimum of ${PASSWORD_MIN} characters with ${1} or more uppercase letters and ${1} or more numbers`,
    CPASSWORD: "The supplied passwords do not match, please try again",
  },
};

export const HTTP_REQUEST_CODES = {
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

export const ROUTES = {
  DASHBOARD: `${API_VERSION_ROUTE}/dashboard`,
  AUTH: `${API_VERSION_ROUTE}/auth`,
  ORDERS: `${API_VERSION_ROUTE}/orders`,
  PAYMENTS: `${API_VERSION_ROUTE}/payments`,
};
