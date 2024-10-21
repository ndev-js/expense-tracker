import { Logger } from "winston";
import IncomeService from "../../services/Income/Income.Service";
import winston from "winston";
import { createIncomeI } from "../../interfaces/Income/IncomeType";
import { Request, Response } from "express";
import { ResponseI } from "../../interfaces/Res/ResponseType";
import ResponseService from "../../utils/res/ResponseService";
import { CreateCategoryI } from "../../interfaces/Category/CategoryType";
import CategoryService from "../../services/Category/Category.Service";

export default class CategoryController {
  private CategoryService: CategoryService;
  private responseService: typeof ResponseService;
  private logger: Logger;
  constructor() {
    this.CategoryService = new CategoryService();
    this.responseService = ResponseService;
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

  async createCategory(req: Request, res: Response) {
    console.log("entered");

    try {
      const { name } = req.body;
      const payload: CreateCategoryI = {
        name,
      };

      const category = await this.CategoryService.createCategory(payload);
      this.logger.info("Category created successfully", { category });
      res.json(category);
    } catch (error) {
      console.log(error);
      res.json(ResponseService.internalServerError("error creating category", error));
      this.logger.error(error);
    }
  }
}
