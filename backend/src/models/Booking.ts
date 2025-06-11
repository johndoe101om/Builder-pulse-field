import mongoose, { Schema } from "mongoose";
import { IBooking } from "../types/index.js";

const bookingSchema = new Schema<IBooking>(
  {
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    guestId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    hostId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
      validate: {
        validator: function (this: IBooking, value: Date) {
          return value > this.checkIn;
        },
        message: "Check-out date must be after check-in date",
      },
    },
    guests: {
      type: Number,
      required: true,
      min: 1,
      max: 20,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ["pending", "paid", "refunded"],
      default: "pending",
    },
    cancellationReason: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    specialRequests: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        ret.checkIn = ret.checkIn?.toISOString().split("T")[0];
        ret.checkOut = ret.checkOut?.toISOString().split("T")[0];
        return ret;
      },
    },
  },
);

// Indexes
bookingSchema.index({ propertyId: 1 });
bookingSchema.index({ guestId: 1 });
bookingSchema.index({ hostId: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ paymentStatus: 1 });
bookingSchema.index({ checkIn: 1, checkOut: 1 });
bookingSchema.index({ createdAt: -1 });

// Compound indexes for common queries
bookingSchema.index({ propertyId: 1, status: 1 });
bookingSchema.index({ guestId: 1, status: 1 });
bookingSchema.index({ hostId: 1, status: 1 });
bookingSchema.index({ checkIn: 1, status: 1 });

// Virtual for duration in nights
bookingSchema.virtual("nights").get(function () {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round(
    (this.checkOut.getTime() - this.checkIn.getTime()) / oneDay,
  );
});

// Virtual for guest population
bookingSchema.virtual("guest", {
  ref: "User",
  localField: "guestId",
  foreignField: "_id",
  justOne: true,
});

// Virtual for property population
bookingSchema.virtual("property", {
  ref: "Property",
  localField: "propertyId",
  foreignField: "_id",
  justOne: true,
});

// Virtual for host population
bookingSchema.virtual("host", {
  ref: "User",
  localField: "hostId",
  foreignField: "_id",
  justOne: true,
});

// Method to check if booking dates overlap with existing bookings
bookingSchema.statics.checkAvailability = async function (
  propertyId: string,
  checkIn: Date,
  checkOut: Date,
  excludeBookingId?: string,
) {
  const query: any = {
    propertyId,
    status: { $in: ["confirmed", "pending"] },
    $or: [
      { checkIn: { $lt: checkOut }, checkOut: { $gt: checkIn } },
      { checkIn: { $gte: checkIn, $lt: checkOut } },
      { checkOut: { $gt: checkIn, $lte: checkOut } },
    ],
  };

  if (excludeBookingId) {
    query._id = { $ne: excludeBookingId };
  }

  const conflictingBookings = await this.find(query);
  return conflictingBookings.length === 0;
};

// Method to calculate total price based on property pricing
bookingSchema.methods.calculateTotalPrice = async function () {
  const Property = mongoose.model("Property");
  const property = await Property.findById(this.propertyId);

  if (!property) {
    throw new Error("Property not found");
  }

  const nights = this.nights;
  const baseTotal = property.pricing.basePrice * nights;
  const total =
    baseTotal + property.pricing.cleaningFee + property.pricing.serviceFee;

  this.totalPrice = total;
  return total;
};

// Pre-save middleware to validate booking dates and calculate price
bookingSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("checkIn") || this.isModified("checkOut")) {
    // Check availability
    const isAvailable = await (this.constructor as any).checkAvailability(
      this.propertyId,
      this.checkIn,
      this.checkOut,
      this.isNew ? undefined : this._id,
    );

    if (!isAvailable) {
      throw new Error("Property is not available for the selected dates");
    }

    // Calculate total price if not set
    if (!this.totalPrice) {
      await this.calculateTotalPrice();
    }
  }
  next();
});

// Static method for analytics
bookingSchema.statics.getAnalytics = async function (
  hostId?: string,
  startDate?: Date,
  endDate?: Date,
) {
  const matchStage: any = {};

  if (hostId) {
    matchStage.hostId = new mongoose.Types.ObjectId(hostId);
  }

  if (startDate || endDate) {
    matchStage.createdAt = {};
    if (startDate) matchStage.createdAt.$gte = startDate;
    if (endDate) matchStage.createdAt.$lte = endDate;
  }

  const pipeline = [
    { $match: matchStage },
    {
      $group: {
        _id: null,
        totalBookings: { $sum: 1 },
        totalRevenue: { $sum: "$totalPrice" },
        confirmedBookings: {
          $sum: { $cond: [{ $eq: ["$status", "confirmed"] }, 1, 0] },
        },
        cancelledBookings: {
          $sum: { $cond: [{ $eq: ["$status", "cancelled"] }, 1, 0] },
        },
        completedBookings: {
          $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
        },
        averageBookingValue: { $avg: "$totalPrice" },
      },
    },
  ];

  const result = await this.aggregate(pipeline);
  return (
    result[0] || {
      totalBookings: 0,
      totalRevenue: 0,
      confirmedBookings: 0,
      cancelledBookings: 0,
      completedBookings: 0,
      averageBookingValue: 0,
    }
  );
};

const Booking = mongoose.model<IBooking>("Booking", bookingSchema);

export default Booking;
