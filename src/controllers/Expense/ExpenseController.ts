import winston from "winston";
import UserService from "../../services/User/User.Service";
import { Logger } from "../../utils/log/Logger";
import ExpenseService from "../../services/Expense/Expense.Service";
import { createExpensePayload, ExpenseI } from "../../interfaces/Expense/ExpenseType";
import { HTTPStatusCode } from "../../constants/httpStatusCode";
import { ResponseI } from "../../interfaces/Res/ResponseType";
import { NextFunction, Request, Response } from "express";
interface TypedRequestBody<T> extends Request {
  body: T;
}
export default class ExpenseController {
  private userService: UserService;
  private logger: Logger;
  private expenseService: ExpenseService;

  constructor() {
    this.userService = new UserService();
    this.logger = new Logger({
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => {
          return `${timestamp} [${level}]: ${message}`;
        })
      ),
      transports: [new winston.transports.Console(), new winston.transports.File({ filename: "combined.log" })],
    });
    this.expenseService = new ExpenseService();
  }
  public async createUserExpense(req: TypedRequestBody<createExpensePayload>, res: Response, next: NextFunction): Promise<void> {
    try {
      const expense = await this.expenseService.createUserExpense(req.body);
      const response: ResponseI<ExpenseI> = {
        status: HTTPStatusCode.Created,
        success: true,
        message: "Expense created successfully",
        data: expense,
      };
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  public async getUserExpenses(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const expenses = await this.expenseService.getUserExpenses(req.params.userId as string);
      const response: ResponseI<ExpenseI[]> = {
        status: HTTPStatusCode.Ok,
        success: true,
        message: "Expenses fetched successfully",
        data: expenses,
      };
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}
