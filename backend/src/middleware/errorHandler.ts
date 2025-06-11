import { Request, Response, NextFunction } from "express";
import { ResponseHelper } from "../utils/responseHelper.js";

export interface CustomError extends Error {
  statusCode?: number;
  errors?: string[];
  code?: number;
  keyValue?: any;
  path?: string;
  value?: any;
}

export const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): Response | void => {
  let error = { ...err };
  error.message = err.message;

  // Log error for debugging
  console.error(err);

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = "Resource not found";
    return ResponseHelper.notFound(res, message);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    return ResponseHelper.conflict(res, message);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors || {})
      .map((val: any) => val.message)
      .join(", ");
    return ResponseHelper.validationError(res, [message]);
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    const message = "Invalid token";
    return ResponseHelper.unauthorized(res, message);
  }

  if (err.name === "TokenExpiredError") {
    const message = "Token expired";
    return ResponseHelper.unauthorized(res, message);
  }

  // Multer errors
  if (err.name === "MulterError") {
    if ((err as any).code === "LIMIT_FILE_SIZE") {
      return ResponseHelper.badRequest(res, "File too large");
    }
    if ((err as any).code === "LIMIT_FILE_COUNT") {
      return ResponseHelper.badRequest(res, "Too many files");
    }
    if ((err as any).code === "LIMIT_UNEXPECTED_FILE") {
      return ResponseHelper.badRequest(res, "Unexpected file field");
    }
    return ResponseHelper.badRequest(res, "File upload error");
  }

  // Default to 500 server error
  return ResponseHelper.internalError(
    res,
    error.message || "Internal Server Error",
  );
};

// Async handler wrapper
export const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

// 404 handler
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response => {
  return ResponseHelper.notFound(res, `Route ${req.originalUrl} not found`);
};

// Custom error creation
export const createError = (
  message: string,
  statusCode: number,
  errors?: string[],
): CustomError => {
  const error = new Error(message) as CustomError;
  error.statusCode = statusCode;
  error.errors = errors;
  return error;
};
