import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { ResponseHelper } from "../utils/responseHelper.js";

export interface ValidationOptions {
  body?: Joi.ObjectSchema;
  query?: Joi.ObjectSchema;
  params?: Joi.ObjectSchema;
}

export const validate = (schemas: ValidationOptions) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: string[] = [];

    // Validate request body
    if (schemas.body) {
      const { error } = schemas.body.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      if (error) {
        errors.push(
          ...error.details.map((detail) => detail.message.replace(/"/g, "")),
        );
      } else {
        req.body = schemas.body.validate(req.body, {
          stripUnknown: true,
        }).value;
      }
    }

    // Validate query parameters
    if (schemas.query) {
      const { error } = schemas.query.validate(req.query, {
        abortEarly: false,
        stripUnknown: true,
      });
      if (error) {
        errors.push(
          ...error.details.map((detail) => detail.message.replace(/"/g, "")),
        );
      } else {
        req.query = schemas.query.validate(req.query, {
          stripUnknown: true,
        }).value;
      }
    }

    // Validate route parameters
    if (schemas.params) {
      const { error } = schemas.params.validate(req.params, {
        abortEarly: false,
        stripUnknown: true,
      });
      if (error) {
        errors.push(
          ...error.details.map((detail) => detail.message.replace(/"/g, "")),
        );
      }
    }

    if (errors.length > 0) {
      return ResponseHelper.validationError(res, errors);
    }

    next();
  };
};

// Middleware for validating MongoDB ObjectId in params
export const validateObjectId = (paramName = "id") => {
  return (req: Request, res: Response, next: NextFunction) => {
    const id = req.params[paramName];

    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      return ResponseHelper.badRequest(res, `Invalid ${paramName} format`);
    }

    next();
  };
};

// Middleware for validating pagination parameters
export const validatePagination = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;

  if (page < 1) {
    return ResponseHelper.badRequest(res, "Page must be greater than 0");
  }

  if (limit < 1 || limit > 100) {
    return ResponseHelper.badRequest(res, "Limit must be between 1 and 100");
  }

  req.query.page = page.toString();
  req.query.limit = limit.toString();

  next();
};

// Middleware for validating date ranges
export const validateDateRange = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { checkIn, checkOut } = req.query;

  if (checkIn && checkOut) {
    const checkInDate = new Date(checkIn as string);
    const checkOutDate = new Date(checkOut as string);

    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
      return ResponseHelper.badRequest(res, "Invalid date format");
    }

    if (checkInDate >= checkOutDate) {
      return ResponseHelper.badRequest(
        res,
        "Check-out date must be after check-in date",
      );
    }

    if (checkInDate < new Date()) {
      return ResponseHelper.badRequest(
        res,
        "Check-in date cannot be in the past",
      );
    }
  }

  next();
};

// Middleware for sanitizing search queries
export const sanitizeSearchQuery = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Convert comma-separated strings to arrays
  if (req.query.propertyTypes && typeof req.query.propertyTypes === "string") {
    req.query.propertyTypes = (req.query.propertyTypes as string)
      .split(",")
      .map((type) => type.trim());
  }

  if (req.query.amenities && typeof req.query.amenities === "string") {
    req.query.amenities = (req.query.amenities as string)
      .split(",")
      .map((amenity) => amenity.trim());
  }

  // Convert string booleans to actual booleans
  if (req.query.instantBook && typeof req.query.instantBook === "string") {
    req.query.instantBook = req.query.instantBook.toLowerCase() === "true";
  }

  // Convert price range
  if (req.query.priceMin && req.query.priceMax) {
    req.query.priceRange = [
      parseInt(req.query.priceMin as string),
      parseInt(req.query.priceMax as string),
    ];
  }

  next();
};
