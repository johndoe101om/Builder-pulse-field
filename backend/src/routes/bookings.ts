import { Router } from "express";
import { bookingController } from "../controllers/bookingController.js";
import {
  validate,
  validateObjectId,
  validatePagination,
} from "../middleware/validation.js";
import {
  bookingCreateSchema,
  bookingUpdateSchema,
  paginationSchema,
  analyticsQuerySchema,
} from "../utils/validators.js";

const router = Router();

// Booking CRUD operations
router.get("/", validatePagination, bookingController.getAllBookings);

router.get("/:id", validateObjectId(), bookingController.getBookingById);

router.post(
  "/",
  validate({ body: bookingCreateSchema }),
  bookingController.createBooking,
);

router.put(
  "/:id",
  validateObjectId(),
  validate({ body: bookingUpdateSchema }),
  bookingController.updateBooking,
);

router.patch(
  "/:id/cancel",
  validateObjectId(),
  bookingController.cancelBooking,
);

// User-specific booking operations
router.get(
  "/guest/:guestId",
  validateObjectId("guestId"),
  validatePagination,
  bookingController.getBookingsByGuest,
);

router.get(
  "/host/:hostId",
  validateObjectId("hostId"),
  validatePagination,
  bookingController.getBookingsByHost,
);

// Analytics
router.get(
  "/analytics/overview",
  validate({ query: analyticsQuerySchema }),
  bookingController.getBookingAnalytics,
);

export default router;
