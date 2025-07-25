import { NextFunction, Router } from "express";
import UserController from "../controllers/User/UserController";
import { Request, Response } from "express";
import { validateRequest } from "../middleware/ValidateRequest";
import { categoryValidator } from "../validators/categoryValidators";
import CategoryController from "../controllers/Category/categoryController";
import { validteQueryObjectId } from "../validators/genericValidator";
const categoryRoute = Router();
const categoryController = new CategoryController();
categoryRoute.get("/category", (req: Request, res: Response) => categoryController.getAllCategories(req, res));
categoryRoute.post("/category", validateRequest(categoryValidator, "body"), (req: Request, res: Response, next: NextFunction) =>
  categoryController.createCategory(req, res)
);
categoryRoute.get("/category/:categoryId", validateRequest(validteQueryObjectId, "params"), (req: Request, res: Response, next: NextFunction) =>
  categoryController.createCategory(req, res)
);

export default categoryRoute;
