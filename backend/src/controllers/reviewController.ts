import { Request, Response } from "express";
import { Review, Booking, Property, User } from "../models/index.js";
import { ResponseHelper } from "../utils/responseHelper.js";
import { asyncHandler } from "../middleware/errorHandler.js";
import { CreateReviewDTO } from "../types/index.js";

export const reviewController = {
  // Get all reviews with filters and pagination
  getAllReviews: asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const filters: any = {};

    // Apply filters
    if (req.query.propertyId) {
      filters.propertyId = req.query.propertyId;
    }

    if (req.query.reviewerId) {
      filters.reviewerId = req.query.reviewerId;
    }

    if (req.query.type) {
      filters.type = req.query.type;
    }

    if (req.query.minRating) {
      filters.rating = { $gte: parseInt(req.query.minRating as string) };
    }

    const [reviews, total] = await Promise.all([
      Review.find(filters)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("reviewerId", "firstName lastName avatar")
        .populate("propertyId", "title location")
        .populate("bookingId", "checkIn checkOut"),
      Review.countDocuments(filters),
    ]);

    const totalPages = Math.ceil(total / limit);

    return ResponseHelper.successWithPagination(
      res,
      reviews,
      { page, limit, total, totalPages },
      "Reviews retrieved successfully",
    );
  }),

  // Get review by ID
  getReviewById: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const review = await Review.findById(id)
      .populate("reviewerId", "firstName lastName avatar")
      .populate("propertyId", "title location")
      .populate("bookingId", "checkIn checkOut guests");

    if (!review) {
      return ResponseHelper.notFound(res, "Review");
    }

    return ResponseHelper.success(res, review, "Review retrieved successfully");
  }),

  // Create new review
  createReview: asyncHandler(async (req: Request, res: Response) => {
    const reviewData: CreateReviewDTO = req.body;
    const reviewerId = req.body.reviewerId || "507f1f77bcf86cd799439012"; // Mock reviewer ID for now

    // Verify booking exists and is completed
    const booking = await Booking.findById(reviewData.bookingId);
    if (!booking) {
      return ResponseHelper.notFound(res, "Booking");
    }

    if (booking.status !== "completed") {
      return ResponseHelper.badRequest(
        res,
        "Can only review completed bookings",
      );
    }

    // Determine review type based on who is reviewing
    let reviewType: "guest-to-host" | "host-to-guest";
    if (booking.guestId.toString() === reviewerId) {
      reviewType = "guest-to-host";
    } else if (booking.hostId.toString() === reviewerId) {
      reviewType = "host-to-guest";
    } else {
      return ResponseHelper.forbidden(
        res,
        "Only the guest or host can review this booking",
      );
    }

    // Check if review already exists
    const existingReview = await Review.findOne({
      bookingId: reviewData.bookingId,
      reviewerId,
      type: reviewType,
    });

    if (existingReview) {
      return ResponseHelper.conflict(
        res,
        "Review already exists for this booking",
      );
    }

    // Create review
    const review = new Review({
      bookingId: reviewData.bookingId,
      propertyId: booking.propertyId,
      reviewerId,
      rating: reviewData.rating,
      comment: reviewData.comment,
      type: reviewType,
    });

    await review.save();

    const populatedReview = await Review.findById(review._id)
      .populate("reviewerId", "firstName lastName avatar")
      .populate("propertyId", "title location")
      .populate("bookingId", "checkIn checkOut guests");

    return ResponseHelper.created(
      res,
      populatedReview,
      "Review created successfully",
    );
  }),

  // Update review
  updateReview: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;
    const reviewerId = req.body.reviewerId || "507f1f77bcf86cd799439012"; // Mock reviewer ID for now

    const review = await Review.findById(id);

    if (!review) {
      return ResponseHelper.notFound(res, "Review");
    }

    // Check if user is the reviewer
    if (review.reviewerId.toString() !== reviewerId) {
      return ResponseHelper.forbidden(
        res,
        "Only the reviewer can update this review",
      );
    }

    // Update review
    if (updateData.rating) review.rating = updateData.rating;
    if (updateData.comment) review.comment = updateData.comment;

    await review.save();

    const populatedReview = await Review.findById(review._id)
      .populate("reviewerId", "firstName lastName avatar")
      .populate("propertyId", "title location")
      .populate("bookingId", "checkIn checkOut guests");

    return ResponseHelper.success(
      res,
      populatedReview,
      "Review updated successfully",
    );
  }),

  // Delete review
  deleteReview: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const reviewerId = req.body.reviewerId || "507f1f77bcf86cd799439012"; // Mock reviewer ID for now

    const review = await Review.findById(id);

    if (!review) {
      return ResponseHelper.notFound(res, "Review");
    }

    // Check if user is the reviewer
    if (review.reviewerId.toString() !== reviewerId) {
      return ResponseHelper.forbidden(
        res,
        "Only the reviewer can delete this review",
      );
    }

    await Review.findByIdAndDelete(id);

    return ResponseHelper.success(res, null, "Review deleted successfully");
  }),

  // Get reviews by property
  getReviewsByProperty: asyncHandler(async (req: Request, res: Response) => {
    const { propertyId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const [reviews, total] = await Promise.all([
      Review.find({ propertyId, type: "guest-to-host" })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("reviewerId", "firstName lastName avatar"),
      Review.countDocuments({ propertyId, type: "guest-to-host" }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return ResponseHelper.successWithPagination(
      res,
      reviews,
      { page, limit, total, totalPages },
      "Property reviews retrieved successfully",
    );
  }),

  // Get reviews by reviewer
  getReviewsByReviewer: asyncHandler(async (req: Request, res: Response) => {
    const { reviewerId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const [reviews, total] = await Promise.all([
      Review.find({ reviewerId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("propertyId", "title location images")
        .populate("bookingId", "checkIn checkOut"),
      Review.countDocuments({ reviewerId }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return ResponseHelper.successWithPagination(
      res,
      reviews,
      { page, limit, total, totalPages },
      "Reviewer reviews retrieved successfully",
    );
  }),

  // Get review analytics
  getReviewAnalytics: asyncHandler(async (req: Request, res: Response) => {
    const { propertyId, hostId } = req.query;

    const analytics = await Review.getAnalytics(
      propertyId as string,
      hostId as string,
    );

    return ResponseHelper.success(
      res,
      analytics,
      "Review analytics retrieved successfully",
    );
  }),

  // Get sentiment analysis
  getSentimentAnalysis: asyncHandler(async (req: Request, res: Response) => {
    const { propertyId } = req.params;

    const sentimentData = await Review.getSentimentAnalysis(propertyId);

    return ResponseHelper.success(
      res,
      sentimentData,
      "Sentiment analysis retrieved successfully",
    );
  }),

  // Mark review as helpful
  markHelpful: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const review = await Review.findById(id);

    if (!review) {
      return ResponseHelper.notFound(res, "Review");
    }

    review.helpfulVotes += 1;
    await review.save();

    return ResponseHelper.success(
      res,
      { helpfulVotes: review.helpfulVotes },
      "Review marked as helpful",
    );
  }),

  // Report review
  reportReview: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { reason } = req.body;

    const review = await Review.findById(id);

    if (!review) {
      return ResponseHelper.notFound(res, "Review");
    }

    review.reportedCount += 1;
    await review.save();

    // In a real application, you would also log the report with the reason
    // and possibly notify moderators if the report count exceeds a threshold

    return ResponseHelper.success(res, null, "Review reported successfully");
  }),
};
