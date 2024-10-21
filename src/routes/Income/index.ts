import { Router } from "express";
import type { Request, Response } from "express";
import IncomeController from "../../controllers/Income/IncomeController";
const IncomeRoute = Router();
const incomeController = new IncomeController();
IncomeRoute.post("/create-income", (req: Request, res: Response) => incomeController.createIncome(req, res));

export default IncomeRoute;
