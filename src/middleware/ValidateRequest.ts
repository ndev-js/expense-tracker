import type { Request, Response, NextFunction } from "express";
import Joi from "joi";
import ResponseService from "../utils/res/ResponseService";

export function validateRequest(schema: Joi.ObjectSchema, source: "body" | "params" | "query" = "body") {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[source]);
    if (error) {
      return next(error);
    }
    next();
  };
}
