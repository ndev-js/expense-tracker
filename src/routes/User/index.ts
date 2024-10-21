import { Router } from "express";
import UserController from "../../controllers/User/UserController";
import { Request, Response } from "express";
const UserRoute = Router();
const userController = new UserController();
UserRoute.get("/users", (req: Request, res: Response) => userController.getAllUsers(req, res));
UserRoute.post("/users", (req: Request, res: Response) => userController.createUser(req, res));

export default UserRoute;
