import { NextFunction, Request, Response } from "express";
import { AppError } from "@middleware/error";
import Logger from "@src/utils/logging";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    return next(err);
  }

  const logMetadata = {
    path: req.path,
    method: req.method,
    body: req.body,
    params: req.params,
  };

  if (err instanceof AppError) {
    Logger.error(`${err.statusCode} - ${err.message}`, logMetadata);

    return res.status(err.statusCode).json({
      error: err.serializeError(),
      statusCode: err.statusCode,
    });
  }

  Logger.error(`500 - Unhandled Error: ${err.message}`, logMetadata);

  res.status(500).json({
    error: { message: "Internal Server Error" },
    statusCode: 500,
  });
};

export const catchAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
