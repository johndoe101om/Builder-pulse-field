import Joi from "joi";

// User validation schemas
export const userUpdateSchema = Joi.object({
  firstName: Joi.string().trim().max(50).optional(),
  lastName: Joi.string().trim().max(50).optional(),
  phone: Joi.string()
    .pattern(/^\+?[\d\s-()]+$/)
    .optional(),
  avatar: Joi.string().uri().optional(),
});

// Property validation schemas
export const propertyCreateSchema = Joi.object({
  title: Joi.string().trim().max(100).required(),
  description: Joi.string().trim().max(2000).required(),
  type: Joi.string()
    .valid("entire-home", "private-room", "shared-room")
    .required(),
  location: Joi.object({
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    latitude: Joi.number().min(-90).max(90).optional(),
    longitude: Joi.number().min(-180).max(180).optional(),
  }).required(),
  capacity: Joi.object({
    guests: Joi.number().integer().min(1).max(20).required(),
    bedrooms: Joi.number().integer().min(0).max(10).required(),
    beds: Joi.number().integer().min(1).max(20).required(),
    bathrooms: Joi.number().min(0.5).max(10).required(),
  }).required(),
  amenities: Joi.array().items(Joi.string()).min(1).required(),
  pricing: Joi.object({
    basePrice: Joi.number().min(0).required(),
    cleaningFee: Joi.number().min(0).required(),
    serviceFee: Joi.number().min(0).required(),
    currency: Joi.string().default("INR"),
  }).required(),
  availability: Joi.object({
    minStay: Joi.number().integer().min(1).max(365).required(),
    maxStay: Joi.number().integer().min(1).max(365).required(),
    instantBook: Joi.boolean().default(false),
  }).required(),
  rules: Joi.array().items(Joi.string()).default([]),
  images: Joi.array().items(Joi.string().uri()).min(1).required(),
});

export const propertyUpdateSchema = Joi.object({
  title: Joi.string().trim().max(100).optional(),
  description: Joi.string().trim().max(2000).optional(),
  type: Joi.string()
    .valid("entire-home", "private-room", "shared-room")
    .optional(),
  location: Joi.object({
    address: Joi.string().optional(),
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    country: Joi.string().optional(),
    latitude: Joi.number().min(-90).max(90).optional(),
    longitude: Joi.number().min(-180).max(180).optional(),
  }).optional(),
  capacity: Joi.object({
    guests: Joi.number().integer().min(1).max(20).optional(),
    bedrooms: Joi.number().integer().min(0).max(10).optional(),
    beds: Joi.number().integer().min(1).max(20).optional(),
    bathrooms: Joi.number().min(0.5).max(10).optional(),
  }).optional(),
  amenities: Joi.array().items(Joi.string()).optional(),
  pricing: Joi.object({
    basePrice: Joi.number().min(0).optional(),
    cleaningFee: Joi.number().min(0).optional(),
    serviceFee: Joi.number().min(0).optional(),
    currency: Joi.string().optional(),
  }).optional(),
  availability: Joi.object({
    minStay: Joi.number().integer().min(1).max(365).optional(),
    maxStay: Joi.number().integer().min(1).max(365).optional(),
    instantBook: Joi.boolean().optional(),
  }).optional(),
  rules: Joi.array().items(Joi.string()).optional(),
  images: Joi.array().items(Joi.string().uri()).optional(),
  isActive: Joi.boolean().optional(),
});

// Booking validation schemas
export const bookingCreateSchema = Joi.object({
  propertyId: Joi.string().required(),
  checkIn: Joi.date().iso().greater("now").required(),
  checkOut: Joi.date().iso().greater(Joi.ref("checkIn")).required(),
  guests: Joi.number().integer().min(1).max(20).required(),
  specialRequests: Joi.string().max(1000).optional(),
});

export const bookingUpdateSchema = Joi.object({
  status: Joi.string()
    .valid("pending", "confirmed", "cancelled", "completed")
    .optional(),
  paymentStatus: Joi.string().valid("pending", "paid", "refunded").optional(),
  cancellationReason: Joi.string().max(500).optional(),
  specialRequests: Joi.string().max(1000).optional(),
});

// Review validation schemas
export const reviewCreateSchema = Joi.object({
  bookingId: Joi.string().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().trim().max(1000).required(),
});

export const reviewUpdateSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5).optional(),
  comment: Joi.string().trim().max(1000).optional(),
});

// Message validation schemas
export const messageCreateSchema = Joi.object({
  receiverId: Joi.string().required(),
  bookingId: Joi.string().optional(),
  content: Joi.string().trim().max(2000).required(),
});

// Search validation schemas
export const searchQuerySchema = Joi.object({
  location: Joi.string().optional(),
  checkIn: Joi.date().iso().optional(),
  checkOut: Joi.date().iso().greater(Joi.ref("checkIn")).optional(),
  guests: Joi.number().integer().min(1).max(20).optional(),
  priceMin: Joi.number().min(0).optional(),
  priceMax: Joi.number().min(Joi.ref("priceMin")).optional(),
  propertyTypes: Joi.string().optional(), // comma-separated values
  amenities: Joi.string().optional(), // comma-separated values
  instantBook: Joi.boolean().optional(),
  minRating: Joi.number().min(0).max(5).optional(),
  sortBy: Joi.string()
    .valid("price", "rating", "distance", "newest")
    .default("newest")
    .optional(),
  sortOrder: Joi.string().valid("asc", "desc").default("desc").optional(),
  page: Joi.number().integer().min(1).default(1).optional(),
  limit: Joi.number().integer().min(1).max(100).default(20).optional(),
});

// Pagination validation schema
export const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1).optional(),
  limit: Joi.number().integer().min(1).max(100).default(20).optional(),
  sortBy: Joi.string().optional(),
  sortOrder: Joi.string().valid("asc", "desc").default("desc").optional(),
});

// ID validation
export const mongoIdSchema = Joi.string()
  .pattern(/^[0-9a-fA-F]{24}$/)
  .required();

// Utility function to validate MongoDB ObjectId
export const isValidObjectId = (id: string): boolean => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

// Geocoding validation
export const geocodeSchema = Joi.object({
  address: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
});

// Date range validation
export const dateRangeSchema = Joi.object({
  startDate: Joi.date().iso().optional(),
  endDate: Joi.date().iso().greater(Joi.ref("startDate")).optional(),
});

// Analytics query validation
export const analyticsQuerySchema = Joi.object({
  startDate: Joi.date().iso().optional(),
  endDate: Joi.date().iso().greater(Joi.ref("startDate")).optional(),
  hostId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .optional(),
  propertyId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .optional(),
});
