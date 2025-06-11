import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/database.js";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

// Graceful shutdown handler
const gracefulShutdown = () => {
  console.log("Received shutdown signal, closing HTTP server gracefully...");
  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });

  // Force close after 30 seconds
  setTimeout(() => {
    console.log(
      "Could not close connections in time, forcefully shutting down",
    );
    process.exit(1);
  }, 30000);
};

// Global error handlers
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (err: any) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);

// Connect to database and start server
const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    // Start server
    const server = app.listen(PORT, () => {
      console.log(`
🚀 Server is running!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 URL:            http://localhost:${PORT}
🌍 Environment:    ${NODE_ENV}
📚 API Docs:       http://localhost:${PORT}/api/v1
❤️  Health Check:  http://localhost:${PORT}/api/health
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      `);
    });

    // Set server timeout
    server.timeout = 30000; // 30 seconds

    return server;
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Start the server
const server = await startServer();

export default server;
