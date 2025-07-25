import { Logger } from "winston";
import IncomeService from "../../services/Income/Income.Service";
import winston from "winston";
import { createIncomeI, incomeResI } from "../../interfaces/Income/IncomeType";
import { NextFunction, Request, Response } from "express";
import { HTTPStatusCode } from "../../constants/httpStatusCode";
import { ResponseI } from "../../interfaces/Res/ResponseType";

interface TypedRequestBody<T> extends Request {
  body: T;
}
export default class IncomeController {
  private IncomeService: IncomeService;
  private logger: Logger;

  constructor() {
    this.IncomeService = new IncomeService();
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
  }

  async createIncome(req: TypedRequestBody<createIncomeI>, res: Response, next: NextFunction): Promise<any> {
    try {
      const income = await this.IncomeService.createUserIncome(req.body);
      const response: ResponseI<createIncomeI> = {
        status: HTTPStatusCode.Created,
        success: true,
        message: "Income created successfully",
        data: income,
      };
      res.json(response);
    } catch (error) {
      this.logger.error(error);
      next(error);
    }
  }

  async getAllIncomes(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const income = await this.IncomeService.getAllIncomes();
      const response: ResponseI<createIncomeI[]> = {
        status: HTTPStatusCode.Created,
        success: true,
        message: "Income created successfully",
        data: income,
      };
      res.json(response);
    } catch (error) {
      this.logger.error(error);
      next(error);
    }
  }

  async getUserIncomes(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const income = await this.IncomeService.getUserIncomes(req.params.userId as string);
      const response: ResponseI<createIncomeI[]> = {
        status: HTTPStatusCode.Created,
        success: true,
        message: "Income created successfully",
        data: income,
      };
      res.json(response);
    } catch (error) {
      this.logger.error(error);
      next(error);
    }
  }
}
