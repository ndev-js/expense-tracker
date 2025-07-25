import { NextFunction, Router } from "express";
import UserController from "../controllers/User/UserController";
import { Request, Response } from "express";
import { validateRequest } from "../middleware/ValidateRequest";
import { createExpenseSchema } from "../validators/expenseValidator";
import ExpenseController from "../controllers/Expense/ExpenseController";
import { validteParamsObjectId } from "../validators/genericValidator";

const ExpenseRoute = Router();
const expenseController = new ExpenseController();
// ExpenseRoute.get("/expense", (req: Request, res: Response, next: NextFunction) => userController.getAllUsers(req, res, next));
ExpenseRoute.post("/expense", validateRequest(createExpenseSchema, "body"), (req: Request, res: Response, next: NextFunction) =>
  expenseController.createUserExpense(req, res, next)
);
ExpenseRoute.get("/expense/:userId", validateRequest(validteParamsObjectId, "params"), (req: Request, res: Response, next: NextFunction) =>
  expenseController.getUserExpenses(req, res, next)
);

export default ExpenseRoute;
