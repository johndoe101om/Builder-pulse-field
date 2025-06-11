import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/fusion-booking";

    if (!mongoURI) {
      console.log(
        "⚠️  No MongoDB URI provided, using default local connection",
      );
    }

    const conn = await mongoose.connect(mongoURI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

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
        console.log("MongoDB connection closed through app termination");
      } catch (error) {
        console.error("Error closing MongoDB connection:", error);
      }
      process.exit(0);
    });
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    console.log(
      "📝 Make sure MongoDB is running or provide a valid MONGODB_URI",
    );
    console.log("   You can start MongoDB locally with: mongod");
    console.log("   Or use MongoDB Atlas: https://www.mongodb.com/atlas");
    console.log(
      "   Or install MongoDB Community: https://www.mongodb.com/try/download/community",
    );
    process.exit(1);
  }
};

export default connectDB;
