import { Logger } from "winston";
import IncomeService from "../../services/Income/Income.Service";
import winston from "winston";
import { createIncomeI } from "../../interfaces/Income/IncomeType";
import { Request, Response } from "express";
export default class IncomeController {
  private IncomeService: IncomeService;
  private logger: Logger;
  constructor() {
    console.log("hello");

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

  async createIncome(req: Request, res: Response): Promise<any> {
    try {
      const { userId, categoryId, amount, date, description } = req.body;
      const payload: createIncomeI = {
        userId: userId,
        amount: amount,
        date: date,
        description: description,
        categoryId: categoryId,
      };

      const income = await this.IncomeService.createUserIncome(payload);
      res.json(income);
    } catch (error) {
      console.log(error);
      res.json(error);
      this.logger.error(error);
    }
  }
}
