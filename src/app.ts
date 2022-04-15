import "module-alias/register";
import express from "express";
import dotenv from "dotenv";
import { errorLogger, errorResponse } from "./middleware/error";
import { ROUTES } from "./utils/constants";
import { getErrorMessage } from "./services/ddddd";
import connectMongoDB from "./services/database";
import authRoute from "./routes/auth";
import orderRoute from "./routes/order";
import userRoute from "./routes/user";
import paymentRoute from "./routes/payment";
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
