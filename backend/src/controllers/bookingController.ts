import { Request, Response } from "express";
import { Booking, Property, User } from "../models/index.js";
import { ResponseHelper } from "../utils/responseHelper.js";
import { asyncHandler } from "../middleware/errorHandler.js";
import { CreateBookingDTO } from "../types/index.js";

export const bookingController = {
  // Get all bookings with filters and pagination
  getAllBookings: asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const filters: any = {};

    // Apply filters
    if (req.query.status) {
      filters.status = req.query.status;
    }

    if (req.query.paymentStatus) {
      filters.paymentStatus = req.query.paymentStatus;
    }

    if (req.query.guestId) {
      filters.guestId = req.query.guestId;
    }

    if (req.query.hostId) {
      filters.hostId = req.query.hostId;
    }

    if (req.query.propertyId) {
      filters.propertyId = req.query.propertyId;
    }

    const [bookings, total] = await Promise.all([
      Booking.find(filters)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("guestId", "firstName lastName avatar email")
        .populate("hostId", "firstName lastName avatar email")
        .populate("propertyId", "title location images pricing"),
      Booking.countDocuments(filters),
    ]);

    const totalPages = Math.ceil(total / limit);

    return ResponseHelper.successWithPagination(
      res,
      bookings,
      { page, limit, total, totalPages },
      "Bookings retrieved successfully",
    );
  }),

  // Get booking by ID
  getBookingById: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const booking = await Booking.findById(id)
      .populate("guestId", "firstName lastName avatar email phone")
      .populate("hostId", "firstName lastName avatar email phone")
      .populate("propertyId");

    if (!booking) {
      return ResponseHelper.notFound(res, "Booking");
    }

    return ResponseHelper.success(
      res,
      booking,
      "Booking retrieved successfully",
    );
  }),

  // Create new booking
  createBooking: asyncHandler(async (req: Request, res: Response) => {
    const bookingData: CreateBookingDTO = req.body;
    const guestId = req.body.guestId || "507f1f77bcf86cd799439012"; // Mock guest ID for now

    // Verify property exists and is active
    const property = await Property.findById(bookingData.propertyId);
    if (!property || !property.isActive) {
      return ResponseHelper.notFound(res, "Property");
    }

    // Verify guest exists
    const guest = await User.findById(guestId);
    if (!guest) {
      return ResponseHelper.notFound(res, "Guest");
    }

    // Check if property can accommodate the number of guests
    if (bookingData.guests > property.capacity.guests) {
      return ResponseHelper.badRequest(
        res,
        `Property can only accommodate ${property.capacity.guests} guests`,
      );
    }

    // Check stay duration limits
    const checkInDate = new Date(bookingData.checkIn);
    const checkOutDate = new Date(bookingData.checkOut);
    const nights = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (nights < property.availability.minStay) {
      return ResponseHelper.badRequest(
        res,
        `Minimum stay is ${property.availability.minStay} nights`,
      );
    }

    if (nights > property.availability.maxStay) {
      return ResponseHelper.badRequest(
        res,
        `Maximum stay is ${property.availability.maxStay} nights`,
      );
    }

    // Calculate total price
    const baseTotal = property.pricing.basePrice * nights;
    const totalPrice =
      baseTotal + property.pricing.cleaningFee + property.pricing.serviceFee;

    // Create booking
    const booking = new Booking({
      propertyId: bookingData.propertyId,
      guestId,
      hostId: property.hostId,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: bookingData.guests,
      totalPrice,
      specialRequests: bookingData.specialRequests,
      status: property.availability.instantBook ? "confirmed" : "pending",
      paymentStatus: "pending",
    });

    await booking.save();

    const populatedBooking = await Booking.findById(booking._id)
      .populate("guestId", "firstName lastName avatar email")
      .populate("hostId", "firstName lastName avatar email")
      .populate("propertyId", "title location images pricing");

    return ResponseHelper.created(
      res,
      populatedBooking,
      "Booking created successfully",
    );
  }),

  // Update booking
  updateBooking: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;

    const booking = await Booking.findById(id);

    if (!booking) {
      return ResponseHelper.notFound(res, "Booking");
    }

    // Validate status transitions
    if (updateData.status) {
      const validTransitions: any = {
        pending: ["confirmed", "cancelled"],
        confirmed: ["completed", "cancelled"],
        cancelled: [],
        completed: [],
      };

      if (!validTransitions[booking.status].includes(updateData.status)) {
        return ResponseHelper.badRequest(
          res,
          `Cannot change status from ${booking.status} to ${updateData.status}`,
        );
      }
    }

    // Update booking
    Object.assign(booking, updateData);
    await booking.save();

    const populatedBooking = await Booking.findById(booking._id)
      .populate("guestId", "firstName lastName avatar email")
      .populate("hostId", "firstName lastName avatar email")
      .populate("propertyId", "title location images pricing");

    return ResponseHelper.success(
      res,
      populatedBooking,
      "Booking updated successfully",
    );
  }),

  // Cancel booking
  cancelBooking: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { cancellationReason } = req.body;

    const booking = await Booking.findById(id);

    if (!booking) {
      return ResponseHelper.notFound(res, "Booking");
    }

    if (booking.status === "cancelled") {
      return ResponseHelper.badRequest(res, "Booking is already cancelled");
    }

    if (booking.status === "completed") {
      return ResponseHelper.badRequest(res, "Cannot cancel completed booking");
    }

    // Update booking status
    booking.status = "cancelled";
    booking.cancellationReason = cancellationReason;

    // Handle refund based on cancellation policy (simplified)
    const now = new Date();
    const checkIn = new Date(booking.checkIn);
    const daysDifference = Math.ceil(
      (checkIn.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (daysDifference >= 7) {
      booking.paymentStatus = "refunded"; // Full refund
    } else if (daysDifference >= 1) {
      // Partial refund logic would go here
      booking.paymentStatus = "refunded";
    }

    await booking.save();

    const populatedBooking = await Booking.findById(booking._id)
      .populate("guestId", "firstName lastName avatar email")
      .populate("hostId", "firstName lastName avatar email")
      .populate("propertyId", "title location images pricing");

    return ResponseHelper.success(
      res,
      populatedBooking,
      "Booking cancelled successfully",
    );
  }),

  // Get bookings by guest
  getBookingsByGuest: asyncHandler(async (req: Request, res: Response) => {
    const { guestId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const [bookings, total] = await Promise.all([
      Booking.find({ guestId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("hostId", "firstName lastName avatar email")
        .populate("propertyId", "title location images pricing"),
      Booking.countDocuments({ guestId }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return ResponseHelper.successWithPagination(
      res,
      bookings,
      { page, limit, total, totalPages },
      "Guest bookings retrieved successfully",
    );
  }),

  // Get bookings by host
  getBookingsByHost: asyncHandler(async (req: Request, res: Response) => {
    const { hostId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const [bookings, total] = await Promise.all([
      Booking.find({ hostId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("guestId", "firstName lastName avatar email")
        .populate("propertyId", "title location images pricing"),
      Booking.countDocuments({ hostId }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return ResponseHelper.successWithPagination(
      res,
      bookings,
      { page, limit, total, totalPages },
      "Host bookings retrieved successfully",
    );
  }),

  // Get booking analytics
  getBookingAnalytics: asyncHandler(async (req: Request, res: Response) => {
    const { startDate, endDate, hostId } = req.query;

    const filters: any = {};
    if (startDate) filters.createdAt = { $gte: new Date(startDate as string) };
    if (endDate) {
      filters.createdAt = {
        ...filters.createdAt,
        $lte: new Date(endDate as string),
      };
    }
    if (hostId) filters.hostId = hostId;

    const analytics = await (Booking as any).getAnalytics(
      hostId as string,
      startDate ? new Date(startDate as string) : undefined,
      endDate ? new Date(endDate as string) : undefined,
    );

    // Additional analytics
    const statusBreakdown = await Booking.aggregate([
      { $match: filters },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ]);

    const monthlyTrends = await Booking.aggregate([
      { $match: filters },
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
    ]);

    return ResponseHelper.success(
      res,
      {
        ...analytics,
        statusBreakdown,
        monthlyTrends,
      },
      "Booking analytics retrieved successfully",
    );
  }),
};
