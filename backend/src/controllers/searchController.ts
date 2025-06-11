import { Request, Response } from "express";
import { Property, Booking } from "../models/index.js";
import { ResponseHelper } from "../utils/responseHelper.js";
import { asyncHandler } from "../middleware/errorHandler.js";
import { SearchFilters } from "../types/index.js";

export const searchController = {
  // Search properties with advanced filters
  searchProperties: asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const filters: SearchFilters = {
      location: req.query.location as string,
      checkIn: req.query.checkIn as string,
      checkOut: req.query.checkOut as string,
      guests: req.query.guests
        ? parseInt(req.query.guests as string)
        : undefined,
      priceRange: req.query.priceRange as [number, number],
      propertyTypes: req.query.propertyTypes as string[],
      amenities: req.query.amenities as string[],
      instantBook: req.query.instantBook as boolean,
      minRating: req.query.minRating
        ? parseFloat(req.query.minRating as string)
        : undefined,
      sortBy: req.query.sortBy as "price" | "rating" | "distance" | "newest",
      sortOrder: req.query.sortOrder as "asc" | "desc",
    };

    // Build search query
    const searchQuery: any = { isActive: true };

    // Location search
    if (filters.location) {
      searchQuery.$or = [
        { "location.city": new RegExp(filters.location, "i") },
        { "location.state": new RegExp(filters.location, "i") },
        { "location.country": new RegExp(filters.location, "i") },
        { "location.address": new RegExp(filters.location, "i") },
      ];
    }

    // Guest capacity
    if (filters.guests) {
      searchQuery["capacity.guests"] = { $gte: filters.guests };
    }

    // Price range
    if (filters.priceRange && filters.priceRange.length === 2) {
      searchQuery["pricing.basePrice"] = {
        $gte: filters.priceRange[0],
        $lte: filters.priceRange[1],
      };
    }

    // Property types
    if (filters.propertyTypes && filters.propertyTypes.length > 0) {
      searchQuery.type = { $in: filters.propertyTypes };
    }

    // Amenities
    if (filters.amenities && filters.amenities.length > 0) {
      searchQuery.amenities = { $all: filters.amenities };
    }

    // Instant book
    if (filters.instantBook) {
      searchQuery["availability.instantBook"] = true;
    }

    // Minimum rating
    if (filters.minRating) {
      searchQuery.rating = { $gte: filters.minRating };
    }

    // Get available properties if dates are provided
    let availablePropertyIds: string[] | undefined;
    if (filters.checkIn && filters.checkOut) {
      const checkInDate = new Date(filters.checkIn);
      const checkOutDate = new Date(filters.checkOut);

      // Find conflicting bookings
      const conflictingBookings = await Booking.find({
        status: { $in: ["confirmed", "pending"] },
        $or: [
          { checkIn: { $lt: checkOutDate }, checkOut: { $gt: checkInDate } },
          { checkIn: { $gte: checkInDate, $lt: checkOutDate } },
          { checkOut: { $gt: checkInDate, $lte: checkOutDate } },
        ],
      }).distinct("propertyId");

      // Get all properties and exclude conflicting ones
      const allProperties = await Property.find(searchQuery).distinct("_id");
      availablePropertyIds = allProperties
        .filter((id) => !conflictingBookings.includes(id))
        .map((id) => id.toString());

      searchQuery._id = { $in: availablePropertyIds };
    }

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
        case "distance":
          // For distance sorting, you would need user's location
          // This is a simplified implementation
          sort = { createdAt: -1 };
          break;
      }
    }

    const [properties, total] = await Promise.all([
      Property.find(searchQuery)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate(
          "hostId",
          "firstName lastName avatar rating reviewCount isVerified",
        ),
      Property.countDocuments(searchQuery),
    ]);

    const totalPages = Math.ceil(total / limit);

    // Add availability info if dates provided
    const propertiesWithAvailability = properties.map((property) => ({
      ...property.toJSON(),
      available: availablePropertyIds
        ? availablePropertyIds.includes(property._id.toString())
        : true,
    }));

    return ResponseHelper.successWithPagination(
      res,
      propertiesWithAvailability,
      { page, limit, total, totalPages },
      "Search results retrieved successfully",
    );
  }),

  // Search properties by location coordinates
  searchByCoordinates: asyncHandler(async (req: Request, res: Response) => {
    const { latitude, longitude, radius = 10 } = req.query;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    if (!latitude || !longitude) {
      return ResponseHelper.badRequest(
        res,
        "Latitude and longitude are required",
      );
    }

    const lat = parseFloat(latitude as string);
    const lng = parseFloat(longitude as string);
    const radiusKm = parseFloat(radius as string);

    // Convert radius from kilometers to radians
    const radiusRadians = radiusKm / 6371; // Earth's radius in km

    const searchQuery = {
      isActive: true,
      "location.latitude": {
        $gte: lat - (radiusRadians * 180) / Math.PI,
        $lte: lat + (radiusRadians * 180) / Math.PI,
      },
      "location.longitude": {
        $gte:
          lng -
          (radiusRadians * 180) / Math.PI / Math.cos((lat * Math.PI) / 180),
        $lte:
          lng +
          (radiusRadians * 180) / Math.PI / Math.cos((lat * Math.PI) / 180),
      },
    };

    const [properties, total] = await Promise.all([
      Property.find(searchQuery)
        .sort({ rating: -1 })
        .skip(skip)
        .limit(limit)
        .populate(
          "hostId",
          "firstName lastName avatar rating reviewCount isVerified",
        ),
      Property.countDocuments(searchQuery),
    ]);

    // Calculate distances
    const propertiesWithDistance = properties.map((property) => {
      const propertyLat = property.location.latitude;
      const propertyLng = property.location.longitude;

      // Haversine formula for distance calculation
      const dLat = ((propertyLat - lat) * Math.PI) / 180;
      const dLng = ((propertyLng - lng) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat * Math.PI) / 180) *
          Math.cos((propertyLat * Math.PI) / 180) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = 6371 * c; // Distance in kilometers

      return {
        ...property.toJSON(),
        distance: parseFloat(distance.toFixed(2)),
      };
    });

    // Sort by distance
    propertiesWithDistance.sort((a, b) => a.distance - b.distance);

    const totalPages = Math.ceil(total / limit);

    return ResponseHelper.successWithPagination(
      res,
      propertiesWithDistance,
      { page, limit, total, totalPages },
      "Location-based search results retrieved successfully",
    );
  }),

  // Get search suggestions
  getSearchSuggestions: asyncHandler(async (req: Request, res: Response) => {
    const { query } = req.query;

    if (!query || (query as string).length < 2) {
      return ResponseHelper.badRequest(
        res,
        "Query must be at least 2 characters long",
      );
    }

    const searchRegex = new RegExp(query as string, "i");

    // Get unique cities, states, and countries
    const locationSuggestions = await Property.aggregate([
      {
        $match: {
          isActive: true,
          $or: [
            { "location.city": searchRegex },
            { "location.state": searchRegex },
            { "location.country": searchRegex },
          ],
        },
      },
      {
        $group: {
          _id: null,
          cities: { $addToSet: "$location.city" },
          states: { $addToSet: "$location.state" },
          countries: { $addToSet: "$location.country" },
        },
      },
    ]);

    const suggestions = [];
    if (locationSuggestions.length > 0) {
      const { cities, states, countries } = locationSuggestions[0];

      // Filter and limit suggestions
      suggestions.push(
        ...cities
          .filter((city: string) =>
            city.toLowerCase().includes((query as string).toLowerCase()),
          )
          .slice(0, 5),
        ...states
          .filter((state: string) =>
            state.toLowerCase().includes((query as string).toLowerCase()),
          )
          .slice(0, 3),
        ...countries
          .filter((country: string) =>
            country.toLowerCase().includes((query as string).toLowerCase()),
          )
          .slice(0, 2),
      );
    }

    return ResponseHelper.success(
      res,
      suggestions.slice(0, 10), // Limit to 10 suggestions
      "Search suggestions retrieved successfully",
    );
  }),

  // Get popular destinations
  getPopularDestinations: asyncHandler(async (req: Request, res: Response) => {
    const popularDestinations = await Property.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: {
            city: "$location.city",
            state: "$location.state",
            country: "$location.country",
          },
          count: { $sum: 1 },
          averagePrice: { $avg: "$pricing.basePrice" },
          averageRating: { $avg: "$rating" },
          sampleImage: { $first: { $arrayElemAt: ["$images", 0] } },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
      {
        $project: {
          _id: 0,
          city: "$_id.city",
          state: "$_id.state",
          country: "$_id.country",
          propertyCount: "$count",
          averagePrice: { $round: ["$averagePrice", 2] },
          averageRating: { $round: ["$averageRating", 1] },
          image: "$sampleImage",
        },
      },
    ]);

    return ResponseHelper.success(
      res,
      popularDestinations,
      "Popular destinations retrieved successfully",
    );
  }),

  // Advanced search with multiple criteria
  advancedSearch: asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    // Build aggregation pipeline for complex search
    const pipeline: any[] = [{ $match: { isActive: true } }];

    // Add location matching if provided
    if (req.query.location) {
      pipeline.push({
        $match: {
          $or: [
            { "location.city": new RegExp(req.query.location as string, "i") },
            { "location.state": new RegExp(req.query.location as string, "i") },
            {
              "location.country": new RegExp(req.query.location as string, "i"),
            },
          ],
        },
      });
    }

    // Add other filters
    const matchStage: any = {};

    if (req.query.guests) {
      matchStage["capacity.guests"] = {
        $gte: parseInt(req.query.guests as string),
      };
    }

    if (req.query.priceRange) {
      const priceRange = req.query.priceRange as [number, number];
      matchStage["pricing.basePrice"] = {
        $gte: priceRange[0],
        $lte: priceRange[1],
      };
    }

    if (req.query.minRating) {
      matchStage.rating = { $gte: parseFloat(req.query.minRating as string) };
    }

    if (Object.keys(matchStage).length > 0) {
      pipeline.push({ $match: matchStage });
    }

    // Add scoring for relevance
    pipeline.push({
      $addFields: {
        relevanceScore: {
          $add: [
            { $multiply: ["$rating", 0.3] },
            { $multiply: ["$reviewCount", 0.0001] },
            { $cond: [{ $eq: ["$availability.instantBook", true] }, 0.1, 0] },
          ],
        },
      },
    });

    // Add sorting
    const sortStage: any = {};
    if (req.query.sortBy === "relevance") {
      sortStage.relevanceScore = -1;
    } else if (req.query.sortBy === "price") {
      sortStage["pricing.basePrice"] = req.query.sortOrder === "desc" ? -1 : 1;
    } else if (req.query.sortBy === "rating") {
      sortStage.rating = -1;
    } else {
      sortStage.createdAt = -1;
    }

    pipeline.push({ $sort: sortStage });

    // Add pagination
    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: limit });

    // Populate host information
    pipeline.push({
      $lookup: {
        from: "users",
        localField: "hostId",
        foreignField: "_id",
        as: "host",
        pipeline: [
          {
            $project: {
              firstName: 1,
              lastName: 1,
              avatar: 1,
              rating: 1,
              reviewCount: 1,
              isVerified: 1,
            },
          },
        ],
      },
    });

    pipeline.push({
      $unwind: "$host",
    });

    const [results, totalResults] = await Promise.all([
      Property.aggregate(pipeline),
      Property.aggregate([
        ...pipeline.slice(0, -3), // Remove skip, limit, and lookup stages for count
        { $count: "total" },
      ]),
    ]);

    const total = totalResults[0]?.total || 0;
    const totalPages = Math.ceil(total / limit);

    return ResponseHelper.successWithPagination(
      res,
      results,
      { page, limit, total, totalPages },
      "Advanced search results retrieved successfully",
    );
  }),
};
