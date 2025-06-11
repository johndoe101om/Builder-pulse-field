const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:8080", "http://localhost:3000"],
    credentials: true,
  }),
);
app.use(express.json());

// Mock Data
const mockProperties = [
  {
    id: "1",
    hostId: "1",
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
    host: {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      reviewCount: 127,
      isVerified: true,
    },
    createdAt: "2023-06-15",
    updatedAt: "2024-01-10",
  },
  {
    id: "2",
    hostId: "2",
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
    host: {
      id: "2",
      firstName: "Sarah",
      lastName: "Wilson",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      reviewCount: 89,
      isVerified: true,
    },
    createdAt: "2023-07-20",
    updatedAt: "2024-01-05",
  },
];

const mockBookings = [
  {
    id: "1",
    propertyId: "1",
    guestId: "3",
    hostId: "1",
    checkIn: "2024-02-15",
    checkOut: "2024-02-18",
    guests: 2,
    totalPrice: 68000,
    status: "confirmed",
    paymentStatus: "paid",
    property: mockProperties[0],
    guest: {
      id: "3",
      firstName: "Emma",
      lastName: "Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612c2c5?w=150&h=150&fit=crop&crop=face",
      email: "emma@example.com",
    },
    createdAt: "2024-01-15",
  },
];

const mockReviews = [
  {
    id: "1",
    bookingId: "1",
    propertyId: "1",
    reviewerId: "3",
    rating: 5,
    comment:
      "Amazing loft with incredible views! John was a fantastic host and very responsive.",
    type: "guest-to-host",
    createdAt: "2024-02-20",
    reviewer: {
      id: "3",
      firstName: "Emma",
      lastName: "Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612c2c5?w=150&h=150&fit=crop&crop=face",
    },
  },
];

// API Routes

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    version: "v1",
    environment: "development",
  });
});

// API Documentation
app.get("/api/v1", (req, res) => {
  res.json({
    message: "Fusion Booking Platform API",
    version: "v1",
    endpoints: {
      properties: "/api/v1/properties",
      bookings: "/api/v1/bookings",
      reviews: "/api/v1/reviews",
      search: "/api/v1/search",
      health: "/api/health",
    },
  });
});

// Properties Routes
app.get("/api/v1/properties", (req, res) => {
  const { page = 1, limit = 20, location, guests, minRating } = req.query;

  let filteredProperties = [...mockProperties];

  // Apply filters
  if (location) {
    const searchTerm = location.toLowerCase();
    filteredProperties = filteredProperties.filter(
      (p) =>
        p.location.city.toLowerCase().includes(searchTerm) ||
        p.location.state.toLowerCase().includes(searchTerm) ||
        p.location.country.toLowerCase().includes(searchTerm),
    );
  }

  if (guests) {
    filteredProperties = filteredProperties.filter(
      (p) => p.capacity.guests >= parseInt(guests),
    );
  }

  if (minRating) {
    filteredProperties = filteredProperties.filter(
      (p) => p.rating >= parseFloat(minRating),
    );
  }

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  const paginatedProperties = filteredProperties.slice(startIndex, endIndex);

  res.json({
    success: true,
    message: "Properties retrieved successfully",
    data: paginatedProperties,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: filteredProperties.length,
      totalPages: Math.ceil(filteredProperties.length / limit),
    },
  });
});

app.get("/api/v1/properties/:id", (req, res) => {
  const property = mockProperties.find((p) => p.id === req.params.id);

  if (!property) {
    return res.status(404).json({
      success: false,
      message: "Property not found",
    });
  }

  res.json({
    success: true,
    message: "Property retrieved successfully",
    data: property,
  });
});

// Bookings Routes
app.get("/api/v1/bookings", (req, res) => {
  res.json({
    success: true,
    message: "Bookings retrieved successfully",
    data: mockBookings,
    pagination: {
      page: 1,
      limit: 20,
      total: mockBookings.length,
      totalPages: 1,
    },
  });
});

app.post("/api/v1/bookings", (req, res) => {
  const { propertyId, checkIn, checkOut, guests } = req.body;

  const property = mockProperties.find((p) => p.id === propertyId);
  if (!property) {
    return res.status(404).json({
      success: false,
      message: "Property not found",
    });
  }

  const newBooking = {
    id: (mockBookings.length + 1).toString(),
    propertyId,
    guestId: "3", // Mock guest ID
    hostId: property.hostId,
    checkIn,
    checkOut,
    guests: parseInt(guests),
    totalPrice: property.pricing.basePrice * 3, // Mock calculation
    status: property.availability.instantBook ? "confirmed" : "pending",
    paymentStatus: "pending",
    property,
    guest: {
      id: "3",
      firstName: "Emma",
      lastName: "Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612c2c5?w=150&h=150&fit=crop&crop=face",
      email: "emma@example.com",
    },
    createdAt: new Date().toISOString(),
  };

  mockBookings.push(newBooking);

  res.status(201).json({
    success: true,
    message: "Booking created successfully",
    data: newBooking,
  });
});

// Reviews Routes
app.get("/api/v1/reviews", (req, res) => {
  res.json({
    success: true,
    message: "Reviews retrieved successfully",
    data: mockReviews,
    pagination: {
      page: 1,
      limit: 20,
      total: mockReviews.length,
      totalPages: 1,
    },
  });
});

app.get("/api/v1/reviews/property/:propertyId", (req, res) => {
  const propertyReviews = mockReviews.filter(
    (r) => r.propertyId === req.params.propertyId,
  );

  res.json({
    success: true,
    message: "Property reviews retrieved successfully",
    data: propertyReviews,
    pagination: {
      page: 1,
      limit: 20,
      total: propertyReviews.length,
      totalPages: 1,
    },
  });
});

// Search Routes
app.get("/api/v1/search/properties", (req, res) => {
  // This would normally do the same filtering as /api/v1/properties
  // For demo purposes, return the same data
  const { location, guests, checkIn, checkOut } = req.query;

  let results = [...mockProperties];

  if (location) {
    const searchTerm = location.toLowerCase();
    results = results.filter(
      (p) =>
        p.location.city.toLowerCase().includes(searchTerm) ||
        p.location.state.toLowerCase().includes(searchTerm),
    );
  }

  if (guests) {
    results = results.filter((p) => p.capacity.guests >= parseInt(guests));
  }

  res.json({
    success: true,
    message: "Search results retrieved successfully",
    data: results,
    pagination: {
      page: 1,
      limit: 20,
      total: results.length,
      totalPages: Math.ceil(results.length / 20),
    },
  });
});

app.get("/api/v1/search/suggestions", (req, res) => {
  const { query } = req.query;

  if (!query || query.length < 2) {
    return res.status(400).json({
      success: false,
      message: "Query must be at least 2 characters long",
    });
  }

  const suggestions = [
    "New York",
    "Santa Monica",
    "Los Angeles",
    "San Francisco",
    "Miami",
    "Chicago",
  ].filter((city) => city.toLowerCase().includes(query.toLowerCase()));

  res.json({
    success: true,
    message: "Search suggestions retrieved successfully",
    data: suggestions.slice(0, 5),
  });
});

// Analytics Routes
app.get("/api/v1/analytics/platform", (req, res) => {
  res.json({
    success: true,
    message: "Platform analytics retrieved successfully",
    data: {
      overview: {
        totalUsers: 150,
        totalHosts: 45,
        totalProperties: mockProperties.length,
        totalBookings: mockBookings.length,
        totalRevenue: 450000,
        averageBookingValue: 75000,
      },
      growth: {
        userGrowth: [
          { _id: { year: 2024, month: 1 }, count: 25 },
          { _id: { year: 2024, month: 2 }, count: 30 },
        ],
        bookingTrends: [
          { _id: { year: 2024, month: 1 }, bookings: 15, revenue: 225000 },
          { _id: { year: 2024, month: 2 }, revenue: 18, revenue: 270000 },
        ],
      },
    },
  });
});

// Users Routes
app.get("/api/v1/users", (req, res) => {
  const users = [
    {
      id: "1",
      email: "john.doe@example.com",
      firstName: "John",
      lastName: "Doe",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      isHost: true,
      isVerified: true,
      rating: 4.9,
      reviewCount: 127,
    },
    {
      id: "2",
      email: "sarah.wilson@example.com",
      firstName: "Sarah",
      lastName: "Wilson",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      isHost: true,
      isVerified: true,
      rating: 4.8,
      reviewCount: 89,
    },
  ];

  res.json({
    success: true,
    message: "Users retrieved successfully",
    data: users,
    pagination: {
      page: 1,
      limit: 20,
      total: users.length,
      totalPages: 1,
    },
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
🚀 Fusion Backend API is running!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 URL:            http://localhost:${PORT}
🌍 Environment:    development
📚 API Docs:       http://localhost:${PORT}/api/v1
❤️  Health Check:  http://localhost:${PORT}/api/health
🏠 Properties:     http://localhost:${PORT}/api/v1/properties
📅 Bookings:       http://localhost:${PORT}/api/v1/bookings
⭐ Reviews:        http://localhost:${PORT}/api/v1/reviews
🔍 Search:         http://localhost:${PORT}/api/v1/search/properties
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `);
});
