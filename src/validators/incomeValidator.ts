import Joi from "joi";
import { objectId } from "./genericValidator";
export const craeteIncomeSchema = Joi.object({
  userId: objectId.required(),
  amount: Joi.number().required(),
  categoryId: objectId.required(),
  description: Joi.string().optional(),
  date: Joi.date().optional(),
});
