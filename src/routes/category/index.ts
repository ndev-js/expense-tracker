import { Router } from "express";
import { Request, Response } from "express";
import { validateRequest } from "../../middleware/ValidateRequest";
import { categoryValidator } from "../../validators/categoryValidators";
import CategoryController from "../../controllers/Category/categoryController";

const categoryRoute = Router();
const categoryController = new CategoryController();
console.log(categoryRoute);

categoryRoute.post("/category", validateRequest(categoryValidator), (req, res) => categoryController.createCategory(req, res));

export default categoryRoute;
