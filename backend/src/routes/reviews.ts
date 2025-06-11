import { Router } from "express";
import { reviewController } from "../controllers/reviewController.js";
import {
  validate,
  validateObjectId,
  validatePagination,
} from "../middleware/validation.js";
import {
  reviewCreateSchema,
  reviewUpdateSchema,
  paginationSchema,
} from "../utils/validators.js";

const router = Router();

// Review CRUD operations
router.get("/", validatePagination, reviewController.getAllReviews);

router.get("/:id", validateObjectId(), reviewController.getReviewById);

router.post(
  "/",
  validate({ body: reviewCreateSchema }),
  reviewController.createReview,
);

router.put(
  "/:id",
  validateObjectId(),
  validate({ body: reviewUpdateSchema }),
  reviewController.updateReview,
);

router.delete("/:id", validateObjectId(), reviewController.deleteReview);

// Property-specific reviews
router.get(
  "/property/:propertyId",
  validateObjectId("propertyId"),
  validatePagination,
  reviewController.getReviewsByProperty,
);

// User-specific reviews
router.get(
  "/reviewer/:reviewerId",
  validateObjectId("reviewerId"),
  validatePagination,
  reviewController.getReviewsByReviewer,
);

// Review analytics and interactions
router.get("/analytics/overview", reviewController.getReviewAnalytics);

router.get(
  "/property/:propertyId/sentiment",
  validateObjectId("propertyId"),
  reviewController.getSentimentAnalysis,
);

router.patch("/:id/helpful", validateObjectId(), reviewController.markHelpful);

router.patch("/:id/report", validateObjectId(), reviewController.reportReview);

export default router;
