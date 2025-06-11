import cors from "cors";

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [
  "http://localhost:8080",
  "http://localhost:3000",
  "http://localhost:5173",
];

export const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
    "Cache-Control",
    "Pragma",
  ],
  exposedHeaders: ["X-Total-Count", "X-Total-Pages"],
  maxAge: 86400, // 24 hours
};

export default cors(corsOptions);
