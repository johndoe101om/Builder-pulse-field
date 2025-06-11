import { Request, Response } from "express";
import { Property, Booking, Review, User } from "../models/index.js";
import { ResponseHelper } from "../utils/responseHelper.js";
import { asyncHandler } from "../middleware/errorHandler.js";

export const analyticsController = {
  // Get overall platform analytics
  getPlatformAnalytics: asyncHandler(async (req: Request, res: Response) => {
    const { startDate, endDate } = req.query;

    const dateFilter: any = {};
    if (startDate) dateFilter.$gte = new Date(startDate as string);
    if (endDate) dateFilter.$lte = new Date(endDate as string);

    const matchFilter =
      Object.keys(dateFilter).length > 0 ? { createdAt: dateFilter } : {};

    const [
      totalUsers,
      totalHosts,
      totalProperties,
      totalBookings,
      totalRevenue,
      userGrowth,
      bookingTrends,
      popularLocations,
      topRatedProperties,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ isHost: true }),
      Property.countDocuments({ isActive: true }),
      Booking.countDocuments(matchFilter),
      Booking.aggregate([
        { $match: { ...matchFilter, paymentStatus: "paid" } },
        { $group: { _id: null, total: { $sum: "$totalPrice" } } },
      ]),
      // User growth by month
      User.aggregate([
        { $match: matchFilter },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ]),
      // Booking trends by month
      Booking.aggregate([
        { $match: matchFilter },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            bookings: { $sum: 1 },
            revenue: { $sum: "$totalPrice" },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ]),
      // Popular locations
      Property.aggregate([
        { $match: { isActive: true } },
        {
          $group: {
            _id: {
              city: "$location.city",
              state: "$location.state",
              country: "$location.country",
            },
            propertyCount: { $sum: 1 },
            averagePrice: { $avg: "$pricing.basePrice" },
            averageRating: { $avg: "$rating" },
          },
        },
        { $sort: { propertyCount: -1 } },
        { $limit: 10 },
      ]),
      // Top rated properties
      Property.find({ isActive: true, rating: { $gte: 4.5 } })
        .sort({ rating: -1, reviewCount: -1 })
        .limit(10)
        .populate("hostId", "firstName lastName avatar")
        .select("title location rating reviewCount hostId"),
    ]);

    const analytics = {
      overview: {
        totalUsers,
        totalHosts,
        totalProperties,
        totalBookings,
        totalRevenue: totalRevenue[0]?.total || 0,
        averageBookingValue:
          totalBookings > 0 ? (totalRevenue[0]?.total || 0) / totalBookings : 0,
      },
      growth: {
        userGrowth,
        bookingTrends,
      },
      insights: {
        popularLocations,
        topRatedProperties,
      },
    };

    return ResponseHelper.success(
      res,
      analytics,
      "Platform analytics retrieved successfully",
    );
  }),

  // Get booking analytics
  getBookingAnalytics: asyncHandler(async (req: Request, res: Response) => {
    const { startDate, endDate, hostId } = req.query;

    const dateFilter: any = {};
    if (startDate) dateFilter.$gte = new Date(startDate as string);
    if (endDate) dateFilter.$lte = new Date(endDate as string);

    const matchFilter: any = {};
    if (Object.keys(dateFilter).length > 0) {
      matchFilter.createdAt = dateFilter;
    }
    if (hostId) matchFilter.hostId = hostId;

    const [
      statusBreakdown,
      paymentStatusBreakdown,
      monthlyTrends,
      topProperties,
      averageStayDuration,
      cancellationRate,
    ] = await Promise.all([
      // Booking status breakdown
      Booking.aggregate([
        { $match: matchFilter },
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
            revenue: { $sum: "$totalPrice" },
          },
        },
      ]),
      // Payment status breakdown
      Booking.aggregate([
        { $match: matchFilter },
        {
          $group: {
            _id: "$paymentStatus",
            count: { $sum: 1 },
            revenue: { $sum: "$totalPrice" },
          },
        },
      ]),
      // Monthly booking trends
      Booking.aggregate([
        { $match: matchFilter },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            bookings: { $sum: 1 },
            revenue: { $sum: "$totalPrice" },
            averageValue: { $avg: "$totalPrice" },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ]),
      // Top performing properties
      Booking.aggregate([
        { $match: { ...matchFilter, status: "completed" } },
        {
          $group: {
            _id: "$propertyId",
            bookingCount: { $sum: 1 },
            totalRevenue: { $sum: "$totalPrice" },
            averageRevenue: { $avg: "$totalPrice" },
          },
        },
        { $sort: { totalRevenue: -1 } },
        { $limit: 10 },
        {
          $lookup: {
            from: "properties",
            localField: "_id",
            foreignField: "_id",
            as: "property",
          },
        },
        { $unwind: "$property" },
        {
          $project: {
            propertyId: "$_id",
            title: "$property.title",
            location: "$property.location",
            bookingCount: 1,
            totalRevenue: 1,
            averageRevenue: 1,
          },
        },
      ]),
      // Average stay duration
      Booking.aggregate([
        { $match: matchFilter },
        {
          $addFields: {
            nights: {
              $divide: [
                { $subtract: ["$checkOut", "$checkIn"] },
                1000 * 60 * 60 * 24,
              ],
            },
          },
        },
        {
          $group: {
            _id: null,
            averageNights: { $avg: "$nights" },
          },
        },
      ]),
      // Cancellation rate
      Booking.aggregate([
        { $match: matchFilter },
        {
          $group: {
            _id: null,
            totalBookings: { $sum: 1 },
            cancelledBookings: {
              $sum: { $cond: [{ $eq: ["$status", "cancelled"] }, 1, 0] },
            },
          },
        },
        {
          $addFields: {
            cancellationRate: {
              $multiply: [
                { $divide: ["$cancelledBookings", "$totalBookings"] },
                100,
              ],
            },
          },
        },
      ]),
    ]);

    const analytics = {
      statusBreakdown,
      paymentStatusBreakdown,
      monthlyTrends,
      topProperties,
      averageStayDuration: averageStayDuration[0]?.averageNights || 0,
      cancellationRate: cancellationRate[0]?.cancellationRate || 0,
    };

    return ResponseHelper.success(
      res,
      analytics,
      "Booking analytics retrieved successfully",
    );
  }),

  // Get property analytics
  getPropertyAnalytics: asyncHandler(async (req: Request, res: Response) => {
    const { hostId } = req.query;

    const matchFilter: any = { isActive: true };
    if (hostId) matchFilter.hostId = hostId;

    const [
      propertyTypeDistribution,
      priceDistribution,
      ratingDistribution,
      amenityPopularity,
      locationAnalytics,
      topPerformingProperties,
    ] = await Promise.all([
      // Property type distribution
      Property.aggregate([
        { $match: matchFilter },
        {
          $group: {
            _id: "$type",
            count: { $sum: 1 },
            averagePrice: { $avg: "$pricing.basePrice" },
            averageRating: { $avg: "$rating" },
          },
        },
      ]),
      // Price distribution
      Property.aggregate([
        { $match: matchFilter },
        {
          $bucket: {
            groupBy: "$pricing.basePrice",
            boundaries: [0, 5000, 10000, 15000, 20000, 30000, 50000, 100000],
            default: "50000+",
            output: {
              count: { $sum: 1 },
              averageRating: { $avg: "$rating" },
            },
          },
        },
      ]),
      // Rating distribution
      Property.aggregate([
        { $match: matchFilter },
        {
          $bucket: {
            groupBy: "$rating",
            boundaries: [0, 1, 2, 3, 4, 4.5, 5],
            default: "Unrated",
            output: {
              count: { $sum: 1 },
            },
          },
        },
      ]),
      // Amenity popularity
      Property.aggregate([
        { $match: matchFilter },
        { $unwind: "$amenities" },
        {
          $group: {
            _id: "$amenities",
            count: { $sum: 1 },
            averageRating: { $avg: "$rating" },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 20 },
      ]),
      // Location analytics
      Property.aggregate([
        { $match: matchFilter },
        {
          $group: {
            _id: {
              city: "$location.city",
              state: "$location.state",
            },
            count: { $sum: 1 },
            averagePrice: { $avg: "$pricing.basePrice" },
            averageRating: { $avg: "$rating" },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 15 },
      ]),
      // Top performing properties by rating and reviews
      Property.find(matchFilter)
        .sort({ rating: -1, reviewCount: -1 })
        .limit(10)
        .populate("hostId", "firstName lastName avatar")
        .select("title location rating reviewCount pricing hostId"),
    ]);

    const analytics = {
      propertyTypeDistribution,
      priceDistribution,
      ratingDistribution,
      amenityPopularity,
      locationAnalytics,
      topPerformingProperties,
    };

    return ResponseHelper.success(
      res,
      analytics,
      "Property analytics retrieved successfully",
    );
  }),

  // Get review analytics
  getReviewAnalytics: asyncHandler(async (req: Request, res: Response) => {
    const { propertyId, hostId } = req.query;

    const matchFilter: any = {};
    if (propertyId) matchFilter.propertyId = propertyId;

    // If hostId is provided, we need to find properties owned by the host
    if (hostId) {
      const hostProperties = await Property.find({ hostId }).distinct("_id");
      matchFilter.propertyId = { $in: hostProperties };
    }

    const [
      ratingDistribution,
      reviewTrends,
      sentimentAnalysis,
      topReviewedProperties,
      averageRatingByPropertyType,
    ] = await Promise.all([
      // Rating distribution
      Review.aggregate([
        { $match: { ...matchFilter, type: "guest-to-host" } },
        {
          $group: {
            _id: "$rating",
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),
      // Review trends over time
      Review.aggregate([
        { $match: { ...matchFilter, type: "guest-to-host" } },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            reviewCount: { $sum: 1 },
            averageRating: { $avg: "$rating" },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ]),
      // Simple sentiment analysis based on rating
      Review.aggregate([
        { $match: { ...matchFilter, type: "guest-to-host" } },
        {
          $addFields: {
            sentiment: {
              $switch: {
                branches: [
                  { case: { $gte: ["$rating", 4] }, then: "positive" },
                  { case: { $lte: ["$rating", 2] }, then: "negative" },
                ],
                default: "neutral",
              },
            },
          },
        },
        {
          $group: {
            _id: "$sentiment",
            count: { $sum: 1 },
          },
        },
      ]),
      // Top reviewed properties
      Review.aggregate([
        { $match: { ...matchFilter, type: "guest-to-host" } },
        {
          $group: {
            _id: "$propertyId",
            reviewCount: { $sum: 1 },
            averageRating: { $avg: "$rating" },
          },
        },
        { $sort: { reviewCount: -1 } },
        { $limit: 10 },
        {
          $lookup: {
            from: "properties",
            localField: "_id",
            foreignField: "_id",
            as: "property",
          },
        },
        { $unwind: "$property" },
        {
          $project: {
            propertyId: "$_id",
            title: "$property.title",
            location: "$property.location",
            reviewCount: 1,
            averageRating: 1,
          },
        },
      ]),
      // Average rating by property type
      Property.aggregate([
        { $match: { isActive: true } },
        {
          $lookup: {
            from: "reviews",
            localField: "_id",
            foreignField: "propertyId",
            as: "reviews",
          },
        },
        {
          $addFields: {
            validReviews: {
              $filter: {
                input: "$reviews",
                cond: { $eq: ["$$this.type", "guest-to-host"] },
              },
            },
          },
        },
        {
          $group: {
            _id: "$type",
            averageRating: { $avg: "$rating" },
            totalReviews: { $sum: { $size: "$validReviews" } },
            propertyCount: { $sum: 1 },
          },
        },
      ]),
    ]);

    const analytics = {
      ratingDistribution,
      reviewTrends,
      sentimentAnalysis,
      topReviewedProperties,
      averageRatingByPropertyType,
    };

    return ResponseHelper.success(
      res,
      analytics,
      "Review analytics retrieved successfully",
    );
  }),

  // Get financial analytics
  getFinancialAnalytics: asyncHandler(async (req: Request, res: Response) => {
    const { startDate, endDate, hostId } = req.query;

    const dateFilter: any = {};
    if (startDate) dateFilter.$gte = new Date(startDate as string);
    if (endDate) dateFilter.$lte = new Date(endDate as string);

    const matchFilter: any = {};
    if (Object.keys(dateFilter).length > 0) {
      matchFilter.createdAt = dateFilter;
    }
    if (hostId) matchFilter.hostId = hostId;

    const [
      revenueBreakdown,
      monthlyRevenue,
      paymentMethodBreakdown,
      refundAnalytics,
      topEarningProperties,
    ] = await Promise.all([
      // Revenue breakdown by booking status
      Booking.aggregate([
        { $match: matchFilter },
        {
          $group: {
            _id: "$paymentStatus",
            count: { $sum: 1 },
            totalRevenue: { $sum: "$totalPrice" },
          },
        },
      ]),
      // Monthly revenue trends
      Booking.aggregate([
        { $match: { ...matchFilter, paymentStatus: "paid" } },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            revenue: { $sum: "$totalPrice" },
            bookingCount: { $sum: 1 },
            averageValue: { $avg: "$totalPrice" },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ]),
      // Payment method breakdown (mock data since we don't store payment methods)
      Booking.aggregate([
        { $match: { ...matchFilter, paymentStatus: "paid" } },
        {
          $group: {
            _id: null,
            totalPaid: { $sum: "$totalPrice" },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            paymentMethods: [
              {
                method: "Credit Card",
                revenue: { $multiply: ["$totalPaid", 0.7] },
                count: { $multiply: ["$count", 0.7] },
              },
              {
                method: "PayPal",
                revenue: { $multiply: ["$totalPaid", 0.2] },
                count: { $multiply: ["$count", 0.2] },
              },
              {
                method: "Bank Transfer",
                revenue: { $multiply: ["$totalPaid", 0.1] },
                count: { $multiply: ["$count", 0.1] },
              },
            ],
          },
        },
      ]),
      // Refund analytics
      Booking.aggregate([
        { $match: matchFilter },
        {
          $group: {
            _id: null,
            totalBookings: { $sum: 1 },
            totalRefunds: {
              $sum: { $cond: [{ $eq: ["$paymentStatus", "refunded"] }, 1, 0] },
            },
            refundAmount: {
              $sum: {
                $cond: [
                  { $eq: ["$paymentStatus", "refunded"] },
                  "$totalPrice",
                  0,
                ],
              },
            },
          },
        },
        {
          $addFields: {
            refundRate: {
              $multiply: [
                { $divide: ["$totalRefunds", "$totalBookings"] },
                100,
              ],
            },
          },
        },
      ]),
      // Top earning properties
      Booking.aggregate([
        { $match: { ...matchFilter, paymentStatus: "paid" } },
        {
          $group: {
            _id: "$propertyId",
            totalRevenue: { $sum: "$totalPrice" },
            bookingCount: { $sum: 1 },
            averageRevenue: { $avg: "$totalPrice" },
          },
        },
        { $sort: { totalRevenue: -1 } },
        { $limit: 10 },
        {
          $lookup: {
            from: "properties",
            localField: "_id",
            foreignField: "_id",
            as: "property",
          },
        },
        { $unwind: "$property" },
        {
          $project: {
            propertyId: "$_id",
            title: "$property.title",
            location: "$property.location",
            totalRevenue: 1,
            bookingCount: 1,
            averageRevenue: 1,
          },
        },
      ]),
    ]);

    const analytics = {
      revenueBreakdown,
      monthlyRevenue,
      paymentMethodBreakdown: paymentMethodBreakdown[0]?.paymentMethods || [],
      refundAnalytics: refundAnalytics[0] || {
        totalBookings: 0,
        totalRefunds: 0,
        refundAmount: 0,
        refundRate: 0,
      },
      topEarningProperties,
    };

    return ResponseHelper.success(
      res,
      analytics,
      "Financial analytics retrieved successfully",
    );
  }),
};
