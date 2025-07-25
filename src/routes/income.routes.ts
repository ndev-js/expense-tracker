import { NextFunction, Router } from "express";
import IncomeController from "../controllers/Income/IncomeController";
import { Request, Response } from "express";
import { validateRequest } from "../middleware/ValidateRequest";
import { craeteIncomeSchema } from "../validators/incomeValidator";
import ExpenseController from "../controllers/Expense/ExpenseController";
import { validteParamsObjectId } from "../validators/genericValidator";

const IncomeRoute = Router();
const incomeController = new IncomeController();
// ExpenseRoute.get("/expense", (req: Request, res: Response, next: NextFunction) => userController.getAllUsers(req, res, next));
IncomeRoute.post("/income", validateRequest(craeteIncomeSchema, "body"), (req: Request, res: Response, next: NextFunction) =>
  incomeController.createIncome(req, res, next)
);
IncomeRoute.get("/income/:userId", validateRequest(validteParamsObjectId, "params"), (req: Request, res: Response, next: NextFunction) =>
  incomeController.getUserIncomes(req, res, next)
);
IncomeRoute.get("/income", (req: Request, res: Response, next: NextFunction) => incomeController.getUserIncomes(req, res, next));

export default IncomeRoute;
