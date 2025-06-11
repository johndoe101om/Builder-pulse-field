import { Request } from "express";
import { Document, Types } from "mongoose";

// Base interfaces matching frontend types
export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
  isHost: boolean;
  isVerified: boolean;
  joinedDate: Date;
  rating?: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProperty extends Document {
  _id: Types.ObjectId;
  hostId: Types.ObjectId;
  title: string;
  description: string;
  type: "entire-home" | "private-room" | "shared-room";
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  pricing: {
    basePrice: number;
    cleaningFee: number;
    serviceFee: number;
    currency: string;
  };
  capacity: {
    guests: number;
    bedrooms: number;
    beds: number;
    bathrooms: number;
  };
  amenities: string[];
  images: string[];
  availability: {
    minStay: number;
    maxStay: number;
    instantBook: boolean;
  };
  rules: string[];
  rating: number;
  reviewCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Static methods interface for Booking model
interface BookingStatics {
  checkAvailability(
    propertyId: string,
    checkIn: Date,
    checkOut: Date,
    excludeBookingId?: string,
  ): Promise<boolean>;
  getAnalytics(hostId?: string, startDate?: Date, endDate?: Date): Promise<any>;
}

export interface IBooking extends Document {
  _id: Types.ObjectId;
  propertyId: Types.ObjectId;
  guestId: Types.ObjectId;
  hostId: Types.ObjectId;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  paymentStatus: "pending" | "paid" | "refunded";
  cancellationReason?: string;
  specialRequests?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Static methods interface for Review model
interface ReviewStatics {
  getAnalytics(propertyId?: string, hostId?: string): Promise<any>;
  getSentimentAnalysis(propertyId: string): Promise<any>;
}

export interface IReview extends Document {
  _id: Types.ObjectId;
  bookingId: Types.ObjectId;
  propertyId: Types.ObjectId;
  reviewerId: Types.ObjectId;
  rating: number;
  comment: string;
  type: "guest-to-host" | "host-to-guest";
  helpfulVotes: number;
  reportedCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessage extends Document {
  _id: Types.ObjectId;
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
  bookingId?: Types.ObjectId;
  content: string;
  timestamp: Date;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Search and filter interfaces
export interface SearchFilters {
  location?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  priceRange?: [number, number];
  propertyTypes?: string[];
  amenities?: string[];
  instantBook?: boolean;
  minRating?: number;
  sortBy?: "price" | "rating" | "distance" | "newest";
  sortOrder?: "asc" | "desc";
}

// API Response interfaces
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// Request interfaces
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    isHost: boolean;
  };
}

// DTOs for request/response
export interface CreatePropertyDTO {
  title: string;
  description: string;
  type: "entire-home" | "private-room" | "shared-room";
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    latitude?: number;
    longitude?: number;
  };
  capacity: {
    guests: number;
    bedrooms: number;
    beds: number;
    bathrooms: number;
  };
  amenities: string[];
  pricing: {
    basePrice: number;
    cleaningFee: number;
    serviceFee: number;
    currency: string;
  };
  availability: {
    minStay: number;
    maxStay: number;
    instantBook: boolean;
  };
  rules: string[];
  images: string[];
}

export interface CreateBookingDTO {
  propertyId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  specialRequests?: string;
}

export interface CreateReviewDTO {
  bookingId: string;
  rating: number;
  comment: string;
}

export interface UpdateUserProfileDTO {
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
}

// Analytics interfaces
export interface BookingAnalytics {
  totalBookings: number;
  totalRevenue: number;
  averageBookingValue: number;
  occupancyRate: number;
  cancellationRate: number;
  topProperties: Array<{
    propertyId: string;
    title: string;
    bookingCount: number;
    revenue: number;
  }>;
  monthlyTrends: Array<{
    month: string;
    bookings: number;
    revenue: number;
  }>;
}

export interface PropertyAnalytics {
  totalProperties: number;
  activeProperties: number;
  averageRating: number;
  topRatedProperties: Array<{
    propertyId: string;
    title: string;
    rating: number;
    reviewCount: number;
  }>;
  propertyTypeDistribution: Record<string, number>;
  averagePriceByType: Record<string, number>;
}

// Error interfaces
export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

export interface DatabaseError {
  code: number;
  message: string;
  operation: string;
}

// File upload interfaces
export interface UploadedFile {
  url: string;
  publicId: string;
  filename: string;
  size: number;
  mimetype: string;
}

export interface FileUploadResult {
  success: boolean;
  files?: UploadedFile[];
  errors?: string[];
}
