import { updateProfilePicture } from "@controller/users";
import { userRequired } from "@middleware/auth";
import { Router } from "express";

const userRoute = Router();

userRoute.all("*", userRequired);
userRoute.patch("/picture", updateProfilePicture);

export default userRoute;
