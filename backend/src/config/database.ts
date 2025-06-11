import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongod: MongoMemoryServer | null = null;

const connectDB = async (): Promise<void> => {
  try {
    let mongoURI = process.env.MONGODB_URI;

    // If no URI provided or connection fails, use in-memory MongoDB
    if (!mongoURI || mongoURI.includes("localhost:27017")) {
      console.log("🎭 Starting in-memory MongoDB server...");

      try {
        mongod = await MongoMemoryServer.create({
          instance: {
            dbName: "fusion-booking",
          },
        });

        mongoURI = mongod.getUri();
        console.log("✅ In-memory MongoDB server started");
      } catch (memoryError) {
        console.error("❌ Failed to start in-memory MongoDB:", memoryError);
        throw memoryError;
      }
    }

    const conn = await mongoose.connect(mongoURI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);

    // Handle connection events
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });

    process.on("SIGINT", async () => {
      try {
        await mongoose.connection.close();
        if (mongod) {
          await mongod.stop();
          console.log("In-memory MongoDB server stopped");
        }
        console.log("MongoDB connection closed through app termination");
      } catch (error) {
        console.error("Error closing MongoDB connection:", error);
      }
      process.exit(0);
    });
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    console.log(
      "📝 If you have a local MongoDB instance, make sure it's running",
    );
    console.log("   Or provide a valid MONGODB_URI in your .env file");
    process.exit(1);
  }
};

export default connectDB;
