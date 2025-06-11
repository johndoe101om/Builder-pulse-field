import { Response } from "express";
import { ApiResponse } from "../types/index.js";

export class ResponseHelper {
  static success<T>(
    res: Response,
    data: T,
    message = "Success",
    statusCode = 200,
  ): Response {
    const response: ApiResponse<T> = {
      success: true,
      message,
      data,
    };
    return res.status(statusCode).json(response);
  }

  static successWithPagination<T>(
    res: Response,
    data: T,
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    },
    message = "Success",
    statusCode = 200,
  ): Response {
    const response: ApiResponse<T> = {
      success: true,
      message,
      data,
      pagination,
    };
    return res.status(statusCode).json(response);
  }

  static error(
    res: Response,
    message = "An error occurred",
    statusCode = 500,
    errors?: string[],
  ): Response {
    const response: ApiResponse = {
      success: false,
      message,
      errors,
    };
    return res.status(statusCode).json(response);
  }

  static validationError(res: Response, errors: string[]): Response {
    return this.error(res, "Validation failed", 400, errors);
  }

  static notFound(res: Response, resource = "Resource"): Response {
    return this.error(res, `${resource} not found`, 404);
  }

  static unauthorized(res: Response, message = "Unauthorized"): Response {
    return this.error(res, message, 401);
  }

  static forbidden(res: Response, message = "Forbidden"): Response {
    return this.error(res, message, 403);
  }

  static conflict(res: Response, message = "Conflict"): Response {
    return this.error(res, message, 409);
  }

  static created<T>(res: Response, data: T, message = "Created"): Response {
    return this.success(res, data, message, 201);
  }

  static noContent(res: Response): Response {
    return res.status(204).send();
  }

  static badRequest(res: Response, message = "Bad Request"): Response {
    return this.error(res, message, 400);
  }

  static internalError(
    res: Response,
    message = "Internal Server Error",
  ): Response {
    return this.error(res, message, 500);
  }
}
