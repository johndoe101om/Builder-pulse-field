import mongoose, { Schema } from "mongoose";
import { IProperty } from "../types/index.js";

const locationSchema = new Schema(
  {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    latitude: { type: Number, required: true, min: -90, max: 90 },
    longitude: { type: Number, required: true, min: -180, max: 180 },
  },
  { _id: false },
);

const pricingSchema = new Schema(
  {
    basePrice: { type: Number, required: true, min: 0 },
    cleaningFee: { type: Number, required: true, min: 0 },
    serviceFee: { type: Number, required: true, min: 0 },
    currency: { type: String, required: true, default: "INR" },
  },
  { _id: false },
);

const capacitySchema = new Schema(
  {
    guests: { type: Number, required: true, min: 1, max: 20 },
    bedrooms: { type: Number, required: true, min: 0, max: 10 },
    beds: { type: Number, required: true, min: 1, max: 20 },
    bathrooms: { type: Number, required: true, min: 0.5, max: 10 },
  },
  { _id: false },
);

const availabilitySchema = new Schema(
  {
    minStay: { type: Number, required: true, min: 1, max: 365 },
    maxStay: { type: Number, required: true, min: 1, max: 365 },
    instantBook: { type: Boolean, default: false },
  },
  { _id: false },
);

const propertySchema = new Schema<IProperty>(
  {
    hostId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    type: {
      type: String,
      required: true,
      enum: ["entire-home", "private-room", "shared-room"],
    },
    location: {
      type: locationSchema,
      required: true,
    },
    pricing: {
      type: pricingSchema,
      required: true,
    },
    capacity: {
      type: capacitySchema,
      required: true,
    },
    amenities: [
      {
        type: String,
        required: true,
      },
    ],
    images: [
      {
        type: String,
        required: true,
      },
    ],
    availability: {
      type: availabilitySchema,
      required: true,
    },
    rules: [
      {
        type: String,
        trim: true,
      },
    ],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

// Indexes
propertySchema.index({ hostId: 1 });
propertySchema.index({ type: 1 });
propertySchema.index({ "location.city": 1 });
propertySchema.index({ "location.state": 1 });
propertySchema.index({ "location.country": 1 });
propertySchema.index({ "pricing.basePrice": 1 });
propertySchema.index({ rating: -1 });
propertySchema.index({ reviewCount: -1 });
propertySchema.index({ isActive: 1 });
propertySchema.index({ createdAt: -1 });

// Geospatial index for location-based searches
propertySchema.index({ "location.latitude": 1, "location.longitude": 1 });

// Compound indexes for common queries
propertySchema.index({ "location.city": 1, type: 1, isActive: 1 });
propertySchema.index({ "pricing.basePrice": 1, rating: -1 });
propertySchema.index({ amenities: 1, isActive: 1 });

// Virtual for host population
propertySchema.virtual("host", {
  ref: "User",
  localField: "hostId",
  foreignField: "_id",
  justOne: true,
});

// Method to calculate and update rating
propertySchema.methods.updateRating = async function () {
  const Review = mongoose.model("Review");
  const reviews = await Review.find({
    propertyId: this._id,
    type: "guest-to-host",
  });

  if (reviews.length > 0) {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    this.rating = totalRating / reviews.length;
    this.reviewCount = reviews.length;
  } else {
    this.rating = 0;
    this.reviewCount = 0;
  }

  await this.save();
};

// Static method for search
propertySchema.statics.searchProperties = function (filters, options = {}) {
  const query: any = { isActive: true };

  // Location search
  if (filters.location) {
    query.$or = [
      { "location.city": new RegExp(filters.location, "i") },
      { "location.state": new RegExp(filters.location, "i") },
      { "location.country": new RegExp(filters.location, "i") },
      { "location.address": new RegExp(filters.location, "i") },
    ];
  }

  // Guest capacity
  if (filters.guests) {
    query["capacity.guests"] = { $gte: filters.guests };
  }

  // Price range
  if (filters.priceRange && filters.priceRange.length === 2) {
    query["pricing.basePrice"] = {
      $gte: filters.priceRange[0],
      $lte: filters.priceRange[1],
    };
  }

  // Property types
  if (filters.propertyTypes && filters.propertyTypes.length > 0) {
    query.type = { $in: filters.propertyTypes };
  }

  // Amenities
  if (filters.amenities && filters.amenities.length > 0) {
    query.amenities = { $all: filters.amenities };
  }

  // Instant book
  if (filters.instantBook) {
    query["availability.instantBook"] = true;
  }

  // Minimum rating
  if (filters.minRating) {
    query.rating = { $gte: filters.minRating };
  }

  // Sorting
  let sort: any = {};
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case "price":
        sort["pricing.basePrice"] = filters.sortOrder === "desc" ? -1 : 1;
        break;
      case "rating":
        sort.rating = filters.sortOrder === "asc" ? 1 : -1;
        break;
      case "newest":
        sort.createdAt = -1;
        break;
      default:
        sort.createdAt = -1;
    }
  } else {
    sort.createdAt = -1;
  }

  return this.find(query)
    .sort(sort)
    .populate(
      "hostId",
      "firstName lastName avatar rating reviewCount isVerified",
    );
};

const Property = mongoose.model<IProperty>("Property", propertySchema);

export default Property;
