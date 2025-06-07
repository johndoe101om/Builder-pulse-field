export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
  isHost: boolean;
  isVerified: boolean;
  joinedDate: string;
  rating?: number;
  reviewCount: number;
}

export interface Property {
  id: string;
  hostId: string;
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
  host: User;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  propertyId: string;
  guestId: string;
  hostId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  paymentStatus: "pending" | "paid" | "refunded";
  property: Property;
  guest: User;
  createdAt: string;
}

export interface Review {
  id: string;
  bookingId: string;
  propertyId: string;
  reviewerId: string;
  rating: number;
  comment: string;
  type: "guest-to-host" | "host-to-guest";
  createdAt: string;
  reviewer: User;
}

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
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  bookingId?: string;
  content: string;
  timestamp: string;
  read: boolean;
}

// Listing form data interface
export interface ListingFormData {
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
