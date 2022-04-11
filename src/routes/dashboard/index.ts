import { Router } from "express";
import { getUsers } from "../../controllers/users";

const dashboardRoute = Router();

dashboardRoute.get("user", getUsers);

export default dashboardRoute;
