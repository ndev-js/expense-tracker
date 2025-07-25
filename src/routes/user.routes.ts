import { NextFunction, Router } from "express";
import UserController from "../controllers/User/UserController";
import { Request, Response } from "express";
import { validateRequest } from "../middleware/ValidateRequest";
import { validteParamsObjectId } from "../validators/genericValidator";
const UserRoute = Router();
const userController = new UserController();
UserRoute.get("/users", (req: Request, res: Response, next: NextFunction) => userController.getAllUsers(req, res, next));
UserRoute.get("/users/:userId", validateRequest(validteParamsObjectId, "params"), (req: Request, res: Response, next: NextFunction) =>
  userController.getUserById(req, res, next)
);
UserRoute.post("/users", (req: Request, res: Response, next: NextFunction) => userController.createUser(req, res, next));

export default UserRoute;
