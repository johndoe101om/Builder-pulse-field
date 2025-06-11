import { Router } from "express";
import { userController } from "../controllers/userController.js";
import {
  validate,
  validateObjectId,
  validatePagination,
} from "../middleware/validation.js";
import { userUpdateSchema, paginationSchema } from "../utils/validators.js";

const router = Router();

// User CRUD operations
router.get("/", validatePagination, userController.getAllUsers);

router.get("/:id", validateObjectId(), userController.getUserById);

router.post("/", userController.createUser);

router.put(
  "/:id",
  validateObjectId(),
  validate({ body: userUpdateSchema }),
  userController.updateUserProfile,
);

router.delete("/:id", validateObjectId(), userController.deleteUser);

// User-specific operations
router.get("/:id/stats", validateObjectId(), userController.getUserStats);

router.patch("/:id/verify", validateObjectId(), userController.verifyUser);

router.patch("/:id/become-host", validateObjectId(), userController.becomeHost);

// Host-specific operations
router.get(
  "/:id/dashboard",
  validateObjectId(),
  userController.getHostDashboard,
);

// Search users
router.get("/search/query", validatePagination, userController.searchUsers);

export default router;
