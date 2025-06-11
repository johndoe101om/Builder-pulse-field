// Mock database service for demonstration when MongoDB is not available
import { User, Property, Booking, Review } from "../models/index.js";

let isInitialized = false;
const mockData = {
  users: [] as any[],
  properties: [] as any[],
  bookings: [] as any[],
  reviews: [] as any[],
};

export const initializeMockData = async (): Promise<void> => {
  if (isInitialized) return;

  console.log("🎭 Initializing mock database...");

  try {
    // Mock users
    mockData.users = [
      {
        _id: "507f1f77bcf86cd799439011",
        email: "john.doe@example.com",
        firstName: "John",
        lastName: "Doe",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        phone: "+1234567890",
        isHost: true,
        isVerified: true,
        joinedDate: new Date("2023-01-15"),
        rating: 4.9,
        reviewCount: 127,
        createdAt: new Date("2023-01-15"),
        updatedAt: new Date("2024-01-10"),
      },
      {
        _id: "507f1f77bcf86cd799439012",
        email: "sarah.wilson@example.com",
        firstName: "Sarah",
        lastName: "Wilson",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        isHost: true,
        isVerified: true,
        joinedDate: new Date("2022-08-22"),
        rating: 4.8,
        reviewCount: 89,
        createdAt: new Date("2022-08-22"),
        updatedAt: new Date("2024-01-05"),
      },
      {
        _id: "507f1f77bcf86cd799439013",
        email: "guest1@example.com",
        firstName: "Emma",
        lastName: "Johnson",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612c2c5?w=150&h=150&fit=crop&crop=face",
        isHost: false,
        isVerified: true,
        joinedDate: new Date("2023-05-12"),
        reviewCount: 0,
        createdAt: new Date("2023-05-12"),
        updatedAt: new Date("2023-05-12"),
      },
    ];

    // Mock properties
    mockData.properties = [
      {
        _id: "507f1f77bcf86cd799439021",
        hostId: "507f1f77bcf86cd799439011",
        title: "Stunning Downtown Loft with City Views",
        description:
          "Experience the heart of the city in this beautifully designed loft featuring floor-to-ceiling windows, modern amenities, and breathtaking skyline views.",
        type: "entire-home",
        location: {
          address: "123 Main St",
          city: "New York",
          state: "NY",
          country: "United States",
          latitude: 40.7128,
          longitude: -74.006,
        },
        pricing: {
          basePrice: 20000,
          cleaningFee: 4000,
          serviceFee: 2800,
          currency: "INR",
        },
        capacity: {
          guests: 4,
          bedrooms: 2,
          beds: 2,
          bathrooms: 2,
        },
        amenities: [
          "WiFi",
          "Kitchen",
          "Air conditioning",
          "TV",
          "Dedicated workspace",
          "Elevator",
          "Gym",
        ],
        images: [
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
        ],
        availability: {
          minStay: 2,
          maxStay: 30,
          instantBook: true,
        },
        rules: ["No smoking", "No pets", "No parties or events"],
        rating: 4.9,
        reviewCount: 47,
        isActive: true,
        createdAt: new Date("2023-06-15"),
        updatedAt: new Date("2024-01-10"),
      },
      {
        _id: "507f1f77bcf86cd799439022",
        hostId: "507f1f77bcf86cd799439012",
        title: "Cozy Beach House with Ocean Views",
        description:
          "Wake up to the sound of waves in this charming beach house. Features a private deck, fully equipped kitchen, and direct beach access.",
        type: "entire-home",
        location: {
          address: "456 Ocean Drive",
          city: "Santa Monica",
          state: "CA",
          country: "United States",
          latitude: 34.0195,
          longitude: -118.4912,
        },
        pricing: {
          basePrice: 14400,
          cleaningFee: 3200,
          serviceFee: 2240,
          currency: "INR",
        },
        capacity: {
          guests: 6,
          bedrooms: 3,
          beds: 4,
          bathrooms: 2,
        },
        amenities: [
          "WiFi",
          "Kitchen",
          "Washer",
          "Dryer",
          "Free parking",
          "TV",
          "Fireplace",
        ],
        images: [
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
        ],
        availability: {
          minStay: 3,
          maxStay: 14,
          instantBook: false,
        },
        rules: ["No smoking", "Pets allowed", "No parties or events"],
        rating: 4.8,
        reviewCount: 32,
        isActive: true,
        createdAt: new Date("2023-07-20"),
        updatedAt: new Date("2024-01-05"),
      },
    ];

    // Mock bookings
    mockData.bookings = [
      {
        _id: "507f1f77bcf86cd799439031",
        propertyId: "507f1f77bcf86cd799439021",
        guestId: "507f1f77bcf86cd799439013",
        hostId: "507f1f77bcf86cd799439011",
        checkIn: new Date("2024-02-15"),
        checkOut: new Date("2024-02-18"),
        guests: 2,
        totalPrice: 68000,
        status: "confirmed",
        paymentStatus: "paid",
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-01-15"),
      },
    ];

    // Mock reviews
    mockData.reviews = [
      {
        _id: "507f1f77bcf86cd799439041",
        bookingId: "507f1f77bcf86cd799439031",
        propertyId: "507f1f77bcf86cd799439021",
        reviewerId: "507f1f77bcf86cd799439013",
        rating: 5,
        comment:
          "Amazing loft with incredible views! John was a fantastic host and very responsive.",
        type: "guest-to-host",
        helpfulVotes: 0,
        reportedCount: 0,
        createdAt: new Date("2024-02-20"),
        updatedAt: new Date("2024-02-20"),
      },
    ];

    isInitialized = true;
    console.log("✅ Mock database initialized successfully!");
    console.log(`📊 Mock Data Summary:
   Users: ${mockData.users.length}
   Properties: ${mockData.properties.length}
   Bookings: ${mockData.bookings.length}
   Reviews: ${mockData.reviews.length}`);
  } catch (error) {
    console.error("❌ Error initializing mock database:", error);
    throw error;
  }
};

export const getMockData = () => mockData;

export const connectMockDB = async (): Promise<void> => {
  console.log("🎭 Using mock database (MongoDB not available)");
  await initializeMockData();
};
