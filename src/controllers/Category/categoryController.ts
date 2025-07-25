import { Logger } from "winston";
import winston from "winston";
import { Request, Response } from "express";
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
    this.logger = winston.createLogger({
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
    try {
      const { name } = req.body;
      const payload: CreateCategoryI = {
        name,
      };
      const category = await this.CategoryService.createCategory(payload);
      this.logger.info("Category created successfully", { category });
      res.json(category);
    } catch (error) {
      console.log(error, "error----->");
      res.json(ResponseService.internalServerError("error creating category", error));
    }
  }
  async getAllCategories(req: Request, res: Response) {
    try {
      const categories = await this.CategoryService.GetAllCategories();
      this.logger.info("Categories feteched successfully", { categories });
      res.json(categories);
    } catch (error) {
      console.log(error, "error----->");
      res.json(ResponseService.internalServerError("error fetching categories", error));
    }
  }
}
