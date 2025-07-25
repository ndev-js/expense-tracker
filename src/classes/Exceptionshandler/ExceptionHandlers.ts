import { Request, Response, NextFunction } from "express";
import { HttpError } from "http-errors";
import { HTTPStatusCode } from "../../constants/httpStatusCode";
export const ExceptionHandler = (err: HttpError, req: Request, res: Response, next: NextFunction): void => {
  const statusCode = err.status || HTTPStatusCode.InternalServerError;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    status: statusCode,
    success: false,
    message,
    error: process.env.NODE_ENV === "development" ? formatStackTrace(err.stack) : undefined,
  });
};

const formatStackTrace = (stack: string | undefined): string | undefined => {
  if (!stack) return undefined;
  const lines = stack.split("\n");
  return lines.slice(0, 1).join("\n"); // Include only the first line
};
