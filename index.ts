import "module-alias/register";
import express from "express";
import dotenv from "dotenv";
import { errorLogger, errorResponse } from "./src/middleware/error";
import { ROUTES } from "./src/utils/constants";
import { getErrorMessage } from "./src/services/error";
import connectMongoDB from "./src/services/database";
import authRoute from "./src/routes/auth";
import orderRoute from "./src/routes/order";
import userRoute from "./src/routes/user";
import paymentRoute from "./src/routes/payment";
import cors from "cors";
import morgan from "morgan";

dotenv.config();

const app = express();

/*** GENERAL MIDDLEWARE */
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

/* ROUTES */
app.use(ROUTES.AUTH, authRoute);
app.use(ROUTES.ORDERS, orderRoute);
app.use(ROUTES.USERS, userRoute);
app.use(ROUTES.PAYMENTS, paymentRoute);

/** ERROR MIDDLEWARE */
app.use(errorLogger);
app.use(errorResponse);

/**** APPLICATION RUNNER */
const runServer = async () => {
  try {
    await connectMongoDB();

    const port = process.env.PORT;
    app.listen(port, () => {
      console.log(`[SERVER]: Server is running on port ${port}`);
    });
  } catch (err: any) {
    console.log(getErrorMessage(err));
  }
};

runServer();
