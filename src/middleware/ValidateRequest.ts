import type { Request, Response, NextFunction } from "express";
import Joi from "joi";
import ResponseService from "../utils/res/ResponseService";

export function validateRequest(schema: Joi.ObjectSchema) {
  console.log("entered");

  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return ResponseService.error("Validation Failed", error.details[0].message);
    }

    next();
  };
}
