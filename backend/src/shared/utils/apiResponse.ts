import { Response } from "express";

export const success = <T>(res: Response, data: T, status = 200) =>
  res.status(status).json({
    success: true,
    data,
  });

export class AppError extends Error {
  statusCode: number;
  code: string;

  constructor(message: string, statusCode = 500, code = "INTERNAL_ERROR") {
    super(message);
    this.statusCode = statusCode;
    this.code = code;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const error = (
  res: Response,
  statusCode = 500,
  code = "INTERNAL_ERROR",
  message = "Internal Server Error"
) => {
  return res.status(statusCode).json({
    success: false,
    error: {
      code,
      message,
    },
  });
};
