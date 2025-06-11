import { Router } from "express";
import { propertyController } from "../controllers/propertyController.js";
import {
  validate,
  validateObjectId,
  validatePagination,
} from "../middleware/validation.js";
import {
  propertyCreateSchema,
  propertyUpdateSchema,
  paginationSchema,
  mongoIdSchema,
} from "../utils/validators.js";

const router = Router();

// Property CRUD operations
router.get("/", validatePagination, propertyController.getAllProperties);

router.get("/:id", validateObjectId(), propertyController.getPropertyById);

router.post(
  "/",
  validate({ body: propertyCreateSchema }),
  propertyController.createProperty,
);

router.put(
  "/:id",
  validateObjectId(),
  validate({ body: propertyUpdateSchema }),
  propertyController.updateProperty,
);

router.delete("/:id", validateObjectId(), propertyController.deleteProperty);

// Property-specific operations
router.get(
  "/:id/availability",
  validateObjectId(),
  propertyController.checkAvailability,
);

router.get(
  "/:id/analytics",
  validateObjectId(),
  propertyController.getPropertyAnalytics,
);

// Host-specific operations
router.get(
  "/host/:hostId",
  validateObjectId("hostId"),
  validatePagination,
  propertyController.getPropertiesByHost,
);

export default router;
