import express from "express";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import corsMiddleware from "./middleware/cors.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import routes from "./routes/index.js";

const app = express();

// Trust proxy for rate limiting and logging
app.set("trust proxy", 1);

// Security middleware
app.use(helmet());

// CORS middleware
app.use(corsMiddleware);

// Compression middleware
app.use(compression());

// Logging middleware
app.use(
  morgan(process.env.LOG_FORMAT || "combined", {
    skip: (req, res) => res.statusCode < 400 && process.env.NODE_ENV === "test",
  }),
);

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100"), // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
app.use("/api", routes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Fusion Booking Platform API",
    version: process.env.API_VERSION || "v1",
    status: "Running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    endpoints: {
      health: "/api/health",
      documentation: `/api/${process.env.API_VERSION || "v1"}`,
    },
  });
});

// 404 handler
app.use(notFoundHandler);

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;
