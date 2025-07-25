import Joi from "joi";
import { objectId } from "./genericValidator";
export const createExpenseSchema = Joi.object({
  userId: objectId.required(),
  amount: Joi.number().required(),
  category: objectId.required(),
  description: Joi.string().optional(),
  date: Joi.date().optional(),
  receipt: Joi.string().optional(),
});
