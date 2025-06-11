import { Router } from "express";
import propertyRoutes from "./properties.js";
import bookingRoutes from "./bookings.js";
import reviewRoutes from "./reviews.js";
import searchRoutes from "./search.js";
import userRoutes from "./users.js";
import analyticsRoutes from "./analytics.js";

const router = Router();

// API version prefix
const API_VERSION = process.env.API_VERSION || "v1";

// Health check endpoint
router.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    version: API_VERSION,
    environment: process.env.NODE_ENV || "development",
  });
});

// API routes
router.use(`/${API_VERSION}/properties`, propertyRoutes);
router.use(`/${API_VERSION}/bookings`, bookingRoutes);
router.use(`/${API_VERSION}/reviews`, reviewRoutes);
router.use(`/${API_VERSION}/search`, searchRoutes);
router.use(`/${API_VERSION}/users`, userRoutes);
router.use(`/${API_VERSION}/analytics`, analyticsRoutes);

// API documentation endpoint
router.get(`/${API_VERSION}`, (req, res) => {
  res.json({
    message: "Fusion Booking Platform API",
    version: API_VERSION,
    endpoints: {
      properties: `/${API_VERSION}/properties`,
      bookings: `/${API_VERSION}/bookings`,
      reviews: `/${API_VERSION}/reviews`,
      search: `/${API_VERSION}/search`,
      users: `/${API_VERSION}/users`,
      analytics: `/${API_VERSION}/analytics`,
      health: "/health",
    },
    documentation: {
      properties: {
        "GET /properties": "Get all properties with filters and pagination",
        "GET /properties/:id": "Get property by ID",
        "POST /properties": "Create new property",
        "PUT /properties/:id": "Update property",
        "DELETE /properties/:id": "Delete property (soft delete)",
        "GET /properties/:id/availability": "Check property availability",
        "GET /properties/:id/analytics": "Get property analytics",
        "GET /properties/host/:hostId": "Get properties by host",
      },
      bookings: {
        "GET /bookings": "Get all bookings with filters and pagination",
        "GET /bookings/:id": "Get booking by ID",
        "POST /bookings": "Create new booking",
        "PUT /bookings/:id": "Update booking",
        "PATCH /bookings/:id/cancel": "Cancel booking",
        "GET /bookings/guest/:guestId": "Get bookings by guest",
        "GET /bookings/host/:hostId": "Get bookings by host",
        "GET /bookings/analytics/overview": "Get booking analytics",
      },
      reviews: {
        "GET /reviews": "Get all reviews with filters and pagination",
        "GET /reviews/:id": "Get review by ID",
        "POST /reviews": "Create new review",
        "PUT /reviews/:id": "Update review",
        "DELETE /reviews/:id": "Delete review",
        "GET /reviews/property/:propertyId": "Get reviews by property",
        "GET /reviews/reviewer/:reviewerId": "Get reviews by reviewer",
        "GET /reviews/analytics/overview": "Get review analytics",
        "GET /reviews/property/:propertyId/sentiment": "Get sentiment analysis",
        "PATCH /reviews/:id/helpful": "Mark review as helpful",
        "PATCH /reviews/:id/report": "Report review",
      },
      search: {
        "GET /search/properties": "Search properties with filters",
        "GET /search/properties/coordinates": "Search by coordinates",
        "GET /search/properties/advanced": "Advanced property search",
        "GET /search/suggestions": "Get search suggestions",
        "GET /search/destinations/popular": "Get popular destinations",
      },
      users: {
        "GET /users": "Get all users with filters and pagination",
        "GET /users/:id": "Get user by ID",
        "POST /users": "Create new user",
        "PUT /users/:id": "Update user profile",
        "DELETE /users/:id": "Delete user (deactivate)",
        "GET /users/:id/stats": "Get user statistics",
        "PATCH /users/:id/verify": "Verify user",
        "PATCH /users/:id/become-host": "Make user a host",
        "GET /users/:id/dashboard": "Get host dashboard",
        "GET /users/search/query": "Search users",
      },
      analytics: {
        "GET /analytics/platform": "Get platform-wide analytics",
        "GET /analytics/bookings": "Get booking analytics",
        "GET /analytics/properties": "Get property analytics",
        "GET /analytics/reviews": "Get review analytics",
        "GET /analytics/financial": "Get financial analytics",
      },
    },
  });
});

export default router;
