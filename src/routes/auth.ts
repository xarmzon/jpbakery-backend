import { Router } from "express";
import { loginUser, signupUser } from "@controller/auth";

const authRoute = Router();

authRoute.post("/login", loginUser);
authRoute.post("/signup", signupUser);

export default authRoute;
