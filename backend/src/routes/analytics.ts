import { Router } from "express";
import { analyticsController } from "../controllers/analyticsController.js";
import { validate } from "../middleware/validation.js";
import { analyticsQuerySchema } from "../utils/validators.js";

const router = Router();

// Platform-wide analytics
router.get(
  "/platform",
  validate({ query: analyticsQuerySchema }),
  analyticsController.getPlatformAnalytics,
);

// Booking analytics
router.get(
  "/bookings",
  validate({ query: analyticsQuerySchema }),
  analyticsController.getBookingAnalytics,
);

// Property analytics
router.get(
  "/properties",
  validate({ query: analyticsQuerySchema }),
  analyticsController.getPropertyAnalytics,
);

// Review analytics
router.get(
  "/reviews",
  validate({ query: analyticsQuerySchema }),
  analyticsController.getReviewAnalytics,
);

// Financial analytics
router.get(
  "/financial",
  validate({ query: analyticsQuerySchema }),
  analyticsController.getFinancialAnalytics,
);

export default router;
