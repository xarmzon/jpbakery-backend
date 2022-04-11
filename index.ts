import "module-alias/register";
import express from "express";
import dotenv from "dotenv";
import { errorLogger, errorResponse } from "./src/middleware/error";
import { ROUTES } from "./src/utils/constants";
import { getErrorMessage } from "./src/services/Error";
import connectMongoDB from "./src/services/database";
import authRoute from "./src/routes/auth";

dotenv.config();

const app = express();

/*** GENERAL MIDDLEWARE */
app.use(express.json());

/* ROUTES */
app.use(ROUTES.AUTH, authRoute);

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
