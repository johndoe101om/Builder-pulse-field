import { Request, Response } from "express";
import { User } from "../models/index.js";
import { ResponseHelper } from "../utils/responseHelper.js";
import { asyncHandler } from "../middleware/errorHandler.js";
import { UpdateUserProfileDTO } from "../types/index.js";

export const userController = {
  // Get all users with pagination
  getAllUsers: asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const filters: any = {};

    // Apply filters
    if (req.query.isHost !== undefined) {
      filters.isHost = req.query.isHost === "true";
    }

    if (req.query.isVerified !== undefined) {
      filters.isVerified = req.query.isVerified === "true";
    }

    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search as string, "i");
      filters.$or = [
        { firstName: searchRegex },
        { lastName: searchRegex },
        { email: searchRegex },
      ];
    }

    const [users, total] = await Promise.all([
      User.find(filters)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select("-__v"),
      User.countDocuments(filters),
    ]);

    const totalPages = Math.ceil(total / limit);

    return ResponseHelper.successWithPagination(
      res,
      users,
      { page, limit, total, totalPages },
      "Users retrieved successfully",
    );
  }),

  // Get user by ID
  getUserById: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findById(id).select("-__v");

    if (!user) {
      return ResponseHelper.notFound(res, "User");
    }

    return ResponseHelper.success(res, user, "User retrieved successfully");
  }),

  // Create new user (for testing purposes - normally handled by auth)
  createUser: asyncHandler(async (req: Request, res: Response) => {
    const userData = req.body;

    // Check if user with email already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      return ResponseHelper.conflict(
        res,
        "User with this email already exists",
      );
    }

    const user = new User(userData);
    await user.save();

    return ResponseHelper.created(res, user, "User created successfully");
  }),

  // Update user profile
  updateUserProfile: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData: UpdateUserProfileDTO = req.body;

    const user = await User.findById(id);

    if (!user) {
      return ResponseHelper.notFound(res, "User");
    }

    // Update user fields
    if (updateData.firstName) user.firstName = updateData.firstName;
    if (updateData.lastName) user.lastName = updateData.lastName;
    if (updateData.phone) user.phone = updateData.phone;
    if (updateData.avatar) user.avatar = updateData.avatar;

    await user.save();

    return ResponseHelper.success(
      res,
      user,
      "User profile updated successfully",
    );
  }),

  // Delete user (soft delete by deactivation)
  deleteUser: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return ResponseHelper.notFound(res, "User");
    }

    // In a real application, you might want to soft delete by adding an 'isActive' field
    // For now, we'll just mark them as unverified
    user.isVerified = false;
    await user.save();

    return ResponseHelper.success(res, null, "User deactivated successfully");
  }),

  // Get user statistics
  getUserStats: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return ResponseHelper.notFound(res, "User");
    }

    const Property = (await import("../models/index.js")).Property;
    const Booking = (await import("../models/index.js")).Booking;
    const Review = (await import("../models/index.js")).Review;

    let stats: any = {
      user: {
        id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        joinedDate: user.joinedDate,
        isHost: user.isHost,
        isVerified: user.isVerified,
        rating: user.rating,
        reviewCount: user.reviewCount,
      },
    };

    if (user.isHost) {
      // Host statistics
      const [properties, hostBookings, hostReviews] = await Promise.all([
        Property.find({ hostId: id, isActive: true }),
        Booking.find({ hostId: id }),
        Review.find({ type: "guest-to-host" }).populate({
          path: "propertyId",
          match: { hostId: id },
        }),
      ]);

      const totalRevenue = hostBookings
        .filter((b) => b.status === "completed")
        .reduce((sum, b) => sum + b.totalPrice, 0);

      stats.hostStats = {
        totalProperties: properties.length,
        totalBookings: hostBookings.length,
        totalRevenue,
        totalReviews: hostReviews.filter((r) => r.propertyId).length,
        averageRating: user.rating,
      };
    }

    // Guest statistics
    const [guestBookings, guestReviews] = await Promise.all([
      Booking.find({ guestId: id }),
      Review.find({ reviewerId: id, type: "guest-to-host" }),
    ]);

    const totalSpent = guestBookings
      .filter((b) => b.paymentStatus === "paid")
      .reduce((sum, b) => sum + b.totalPrice, 0);

    stats.guestStats = {
      totalBookings: guestBookings.length,
      totalSpent,
      totalReviews: guestReviews.length,
      upcomingBookings: guestBookings.filter(
        (b) => b.status === "confirmed" && new Date(b.checkIn) > new Date(),
      ).length,
    };

    return ResponseHelper.success(
      res,
      stats,
      "User statistics retrieved successfully",
    );
  }),

  // Verify user
  verifyUser: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return ResponseHelper.notFound(res, "User");
    }

    user.isVerified = true;
    await user.save();

    return ResponseHelper.success(res, user, "User verified successfully");
  }),

  // Make user a host
  becomeHost: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return ResponseHelper.notFound(res, "User");
    }

    user.isHost = true;
    await user.save();

    return ResponseHelper.success(res, user, "User is now a host successfully");
  }),

  // Get host dashboard data
  getHostDashboard: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user || !user.isHost) {
      return ResponseHelper.notFound(res, "Host");
    }

    const Property = (await import("../models/index.js")).Property;
    const Booking = (await import("../models/index.js")).Booking;
    const Review = (await import("../models/index.js")).Review;

    const [properties, recentBookings, recentReviews, bookingAnalytics] =
      await Promise.all([
        Property.find({ hostId: id, isActive: true }).limit(5),
        Booking.find({ hostId: id })
          .sort({ createdAt: -1 })
          .limit(10)
          .populate("guestId", "firstName lastName avatar")
          .populate("propertyId", "title location"),
        Review.find({ type: "guest-to-host" })
          .populate({
            path: "propertyId",
            match: { hostId: id },
          })
          .populate("reviewerId", "firstName lastName avatar")
          .sort({ createdAt: -1 })
          .limit(5),
        (Booking as any).getAnalytics(undefined, undefined, undefined), // Would filter by property in real implementation
      ]);

    const dashboard = {
      hostInfo: {
        id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        rating: user.rating,
        reviewCount: user.reviewCount,
        isVerified: user.isVerified,
      },
      properties: properties,
      recentBookings: recentBookings,
      recentReviews: recentReviews.filter((r: any) => r.propertyId), // Filter out reviews for deleted properties
      analytics: bookingAnalytics,
    };

    return ResponseHelper.success(
      res,
      dashboard,
      "Host dashboard retrieved successfully",
    );
  }),

  // Search users
  searchUsers: asyncHandler(async (req: Request, res: Response) => {
    const { query } = req.query;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    if (!query || (query as string).length < 2) {
      return ResponseHelper.badRequest(
        res,
        "Search query must be at least 2 characters long",
      );
    }

    const searchRegex = new RegExp(query as string, "i");
    const searchFilters = {
      $or: [
        { firstName: searchRegex },
        { lastName: searchRegex },
        { email: searchRegex },
      ],
    };

    const [users, total] = await Promise.all([
      User.find(searchFilters)
        .sort({ rating: -1, reviewCount: -1 })
        .skip(skip)
        .limit(limit)
        .select(
          "firstName lastName avatar rating reviewCount isVerified isHost",
        ),
      User.countDocuments(searchFilters),
    ]);

    const totalPages = Math.ceil(total / limit);

    return ResponseHelper.successWithPagination(
      res,
      users,
      { page, limit, total, totalPages },
      "User search results retrieved successfully",
    );
  }),
};
