import { Router } from "express";
import { searchController } from "../controllers/searchController.js";
import {
  validate,
  validatePagination,
  sanitizeSearchQuery,
  validateDateRange,
} from "../middleware/validation.js";
import { searchQuerySchema, paginationSchema } from "../utils/validators.js";

const router = Router();

// Property search endpoints
router.get(
  "/properties",
  validatePagination,
  sanitizeSearchQuery,
  validateDateRange,
  validate({ query: searchQuerySchema }),
  searchController.searchProperties,
);

router.get(
  "/properties/coordinates",
  validatePagination,
  searchController.searchByCoordinates,
);

router.get(
  "/properties/advanced",
  validatePagination,
  sanitizeSearchQuery,
  searchController.advancedSearch,
);

// Search suggestions and discovery
router.get("/suggestions", searchController.getSearchSuggestions);

router.get("/destinations/popular", searchController.getPopularDestinations);

export default router;
