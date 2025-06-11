import { Request, Response } from "express";
import { Property, User } from "../models/index.js";
import { ResponseHelper } from "../utils/responseHelper.js";
import { asyncHandler } from "../middleware/errorHandler.js";
import { CreatePropertyDTO } from "../types/index.js";

export const propertyController = {
  // Get all properties with filters and pagination
  getAllProperties: asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const filters = req.query;
    const searchFilters: any = {};

    // Apply filters
    if (filters.location) {
      searchFilters.$or = [
        { "location.city": new RegExp(filters.location as string, "i") },
        { "location.state": new RegExp(filters.location as string, "i") },
        { "location.country": new RegExp(filters.location as string, "i") },
      ];
    }

    if (filters.guests) {
      searchFilters["capacity.guests"] = {
        $gte: parseInt(filters.guests as string),
      };
    }

    if (filters.priceRange && Array.isArray(filters.priceRange)) {
      searchFilters["pricing.basePrice"] = {
        $gte: filters.priceRange[0],
        $lte: filters.priceRange[1],
      };
    }

    if (filters.propertyTypes && Array.isArray(filters.propertyTypes)) {
      searchFilters.type = { $in: filters.propertyTypes };
    }

    if (filters.amenities && Array.isArray(filters.amenities)) {
      searchFilters.amenities = { $all: filters.amenities };
    }

    if (filters.instantBook === "true" || filters.instantBook === true) {
      searchFilters["availability.instantBook"] = true;
    }

    if (filters.minRating) {
      searchFilters.rating = { $gte: parseFloat(filters.minRating as string) };
    }

    searchFilters.isActive = true;

    // Sorting
    let sort: any = { createdAt: -1 };
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "price":
          sort = { "pricing.basePrice": filters.sortOrder === "desc" ? -1 : 1 };
          break;
        case "rating":
          sort = { rating: filters.sortOrder === "asc" ? 1 : -1 };
          break;
        case "newest":
          sort = { createdAt: -1 };
          break;
      }
    }

    const [properties, total] = await Promise.all([
      Property.find(searchFilters)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate(
          "hostId",
          "firstName lastName avatar rating reviewCount isVerified",
        ),
      Property.countDocuments(searchFilters),
    ]);

    const totalPages = Math.ceil(total / limit);

    return ResponseHelper.successWithPagination(
      res,
      properties,
      { page, limit, total, totalPages },
      "Properties retrieved successfully",
    );
  }),

  // Get property by ID
  getPropertyById: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const property = await Property.findById(id).populate(
      "hostId",
      "firstName lastName avatar rating reviewCount isVerified joinedDate",
    );

    if (!property || !property.isActive) {
      return ResponseHelper.notFound(res, "Property");
    }

    return ResponseHelper.success(
      res,
      property,
      "Property retrieved successfully",
    );
  }),

  // Create new property
  createProperty: asyncHandler(async (req: Request, res: Response) => {
    const propertyData: CreatePropertyDTO = req.body;
    const hostId = req.body.hostId || "507f1f77bcf86cd799439011"; // Mock host ID for now

    // Verify host exists
    const host = await User.findById(hostId);
    if (!host) {
      return ResponseHelper.notFound(res, "Host");
    }

    // Create property
    const property = new Property({
      ...propertyData,
      hostId,
    });

    await property.save();

    // Update user to be a host if not already
    if (!host.isHost) {
      host.isHost = true;
      await host.save();
    }

    const populatedProperty = await Property.findById(property._id).populate(
      "hostId",
      "firstName lastName avatar rating reviewCount isVerified",
    );

    return ResponseHelper.created(
      res,
      populatedProperty,
      "Property created successfully",
    );
  }),

  // Update property
  updateProperty: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;
    const hostId = req.body.hostId || "507f1f77bcf86cd799439011"; // Mock host ID for now

    const property = await Property.findById(id);

    if (!property) {
      return ResponseHelper.notFound(res, "Property");
    }

    // Check if user is the host (in real app, this would use authentication)
    if (property.hostId.toString() !== hostId) {
      return ResponseHelper.forbidden(
        res,
        "Only the host can update this property",
      );
    }

    // Update property
    Object.assign(property, updateData);
    await property.save();

    const populatedProperty = await Property.findById(property._id).populate(
      "hostId",
      "firstName lastName avatar rating reviewCount isVerified",
    );

    return ResponseHelper.success(
      res,
      populatedProperty,
      "Property updated successfully",
    );
  }),

  // Delete property (soft delete)
  deleteProperty: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const hostId = req.body.hostId || "507f1f77bcf86cd799439011"; // Mock host ID for now

    const property = await Property.findById(id);

    if (!property) {
      return ResponseHelper.notFound(res, "Property");
    }

    // Check if user is the host
    if (property.hostId.toString() !== hostId) {
      return ResponseHelper.forbidden(
        res,
        "Only the host can delete this property",
      );
    }

    // Soft delete
    property.isActive = false;
    await property.save();

    return ResponseHelper.success(res, null, "Property deleted successfully");
  }),

  // Get properties by host
  getPropertiesByHost: asyncHandler(async (req: Request, res: Response) => {
    const { hostId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const [properties, total] = await Promise.all([
      Property.find({ hostId, isActive: true })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate(
          "hostId",
          "firstName lastName avatar rating reviewCount isVerified",
        ),
      Property.countDocuments({ hostId, isActive: true }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return ResponseHelper.successWithPagination(
      res,
      properties,
      { page, limit, total, totalPages },
      "Host properties retrieved successfully",
    );
  }),

  // Check property availability
  checkAvailability: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { checkIn, checkOut } = req.query;

    if (!checkIn || !checkOut) {
      return ResponseHelper.badRequest(
        res,
        "Check-in and check-out dates are required",
      );
    }

    const property = await Property.findById(id);
    if (!property || !property.isActive) {
      return ResponseHelper.notFound(res, "Property");
    }

    const Booking = (await import("../models/index.js")).Booking;
    const isAvailable = await (Booking as any).checkAvailability(
      id,
      new Date(checkIn as string),
      new Date(checkOut as string),
    );

    return ResponseHelper.success(
      res,
      { available: isAvailable },
      isAvailable
        ? "Property is available"
        : "Property is not available for selected dates",
    );
  }),

  // Get property analytics
  getPropertyAnalytics: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const property = await Property.findById(id);
    if (!property) {
      return ResponseHelper.notFound(res, "Property");
    }

    const Review = (await import("../models/index.js")).Review;
    const Booking = (await import("../models/index.js")).Booking;

    const [reviewAnalytics, bookingAnalytics] = await Promise.all([
      (Review as any).getAnalytics(id),
      (Booking as any).getAnalytics(undefined, undefined, undefined), // Would filter by property in real implementation
    ]);

    const analytics = {
      property: {
        id: property._id,
        title: property.title,
        rating: property.rating,
        reviewCount: property.reviewCount,
        totalBookings: bookingAnalytics.totalBookings,
        totalRevenue: bookingAnalytics.totalRevenue,
      },
      reviews: reviewAnalytics,
      bookings: bookingAnalytics,
    };

    return ResponseHelper.success(
      res,
      analytics,
      "Property analytics retrieved successfully",
    );
  }),
};
