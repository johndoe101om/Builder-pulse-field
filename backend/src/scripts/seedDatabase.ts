import dotenv from "dotenv";
import connectDB from "../config/database.js";
import { User, Property, Booking, Review } from "../models/index.js";

// Load environment variables
dotenv.config();

const seedData = async () => {
  try {
    console.log("🌱 Starting database seed...");

    // Connect to database
    await connectDB();

    // Clear existing data
    console.log("🧹 Clearing existing data...");
    await Promise.all([
      User.deleteMany({}),
      Property.deleteMany({}),
      Booking.deleteMany({}),
      Review.deleteMany({}),
    ]);

    // Create users
    console.log("👥 Creating users...");
    const users = await User.create([
      {
        email: "john.doe@example.com",
        firstName: "John",
        lastName: "Doe",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        phone: "+1234567890",
        isHost: true,
        isVerified: true,
        joinedDate: new Date("2023-01-15"),
        rating: 4.9,
        reviewCount: 127,
      },
      {
        email: "sarah.wilson@example.com",
        firstName: "Sarah",
        lastName: "Wilson",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        isHost: true,
        isVerified: true,
        joinedDate: new Date("2022-08-22"),
        rating: 4.8,
        reviewCount: 89,
      },
      {
        email: "mike.chen@example.com",
        firstName: "Mike",
        lastName: "Chen",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        isHost: true,
        isVerified: true,
        joinedDate: new Date("2023-03-10"),
        rating: 4.7,
        reviewCount: 45,
      },
      {
        email: "guest1@example.com",
        firstName: "Emma",
        lastName: "Johnson",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612c2c5?w=150&h=150&fit=crop&crop=face",
        isHost: false,
        isVerified: true,
        joinedDate: new Date("2023-05-12"),
        reviewCount: 0,
      },
      {
        email: "guest2@example.com",
        firstName: "David",
        lastName: "Miller",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        isHost: false,
        isVerified: true,
        joinedDate: new Date("2023-07-08"),
        reviewCount: 0,
      },
    ]);

    console.log(`✅ Created ${users.length} users`);

    // Create properties
    console.log("🏠 Creating properties...");
    const properties = await Property.create([
      {
        hostId: users[0]._id,
        title: "Stunning Downtown Loft with City Views",
        description:
          "Experience the heart of the city in this beautifully designed loft featuring floor-to-ceiling windows, modern amenities, and breathtaking skyline views. Perfect for business travelers and couples seeking a sophisticated urban retreat.",
        type: "entire-home",
        location: {
          address: "123 Main St",
          city: "New York",
          state: "NY",
          country: "United States",
          latitude: 40.7128,
          longitude: -74.006,
        },
        pricing: {
          basePrice: 20000,
          cleaningFee: 4000,
          serviceFee: 2800,
          currency: "INR",
        },
        capacity: {
          guests: 4,
          bedrooms: 2,
          beds: 2,
          bathrooms: 2,
        },
        amenities: [
          "WiFi",
          "Kitchen",
          "Air conditioning",
          "TV",
          "Dedicated workspace",
          "Elevator",
          "Gym",
        ],
        images: [
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
        ],
        availability: {
          minStay: 2,
          maxStay: 30,
          instantBook: true,
        },
        rules: ["No smoking", "No pets", "No parties or events"],
        rating: 4.9,
        reviewCount: 47,
        isActive: true,
      },
      {
        hostId: users[1]._id,
        title: "Cozy Beach House with Ocean Views",
        description:
          "Wake up to the sound of waves in this charming beach house. Features a private deck, fully equipped kitchen, and direct beach access. Ideal for families and beach lovers looking for a peaceful getaway.",
        type: "entire-home",
        location: {
          address: "456 Ocean Drive",
          city: "Santa Monica",
          state: "CA",
          country: "United States",
          latitude: 34.0195,
          longitude: -118.4912,
        },
        pricing: {
          basePrice: 14400,
          cleaningFee: 3200,
          serviceFee: 2240,
          currency: "INR",
        },
        capacity: {
          guests: 6,
          bedrooms: 3,
          beds: 4,
          bathrooms: 2,
        },
        amenities: [
          "WiFi",
          "Kitchen",
          "Washer",
          "Dryer",
          "Free parking",
          "TV",
          "Fireplace",
          "Private entrance",
        ],
        images: [
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1595877244574-e90ce41ce089?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop",
        ],
        availability: {
          minStay: 3,
          maxStay: 14,
          instantBook: false,
        },
        rules: ["No smoking", "Pets allowed", "No parties or events"],
        rating: 4.8,
        reviewCount: 32,
        isActive: true,
      },
      {
        hostId: users[2]._id,
        title: "Mountain Cabin Retreat",
        description:
          "Escape to nature in this rustic yet comfortable mountain cabin. Surrounded by hiking trails and offering stunning mountain views, this is the perfect retreat for outdoor enthusiasts.",
        type: "entire-home",
        location: {
          address: "789 Pine Ridge Road",
          city: "Aspen",
          state: "CO",
          country: "United States",
          latitude: 39.1911,
          longitude: -106.8175,
        },
        pricing: {
          basePrice: 25600,
          cleaningFee: 4800,
          serviceFee: 3600,
          currency: "INR",
        },
        capacity: {
          guests: 8,
          bedrooms: 4,
          beds: 5,
          bathrooms: 3,
        },
        amenities: [
          "WiFi",
          "Kitchen",
          "Fireplace",
          "Hot tub",
          "Free parking",
          "Heating",
          "Washer",
          "Dryer",
        ],
        images: [
          "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&h=600&fit=crop",
        ],
        availability: {
          minStay: 2,
          maxStay: 21,
          instantBook: true,
        },
        rules: [
          "No smoking",
          "Pets allowed",
          "No parties or events",
          "Quiet hours after 10 PM",
        ],
        rating: 4.7,
        reviewCount: 28,
        isActive: true,
      },
      {
        hostId: users[0]._id,
        title: "Modern Studio in Arts District",
        description:
          "A sleek, minimalist studio in the heart of the arts district. Perfect for solo travelers or couples who want to be in the center of the cultural scene.",
        type: "entire-home",
        location: {
          address: "321 Gallery Street",
          city: "Los Angeles",
          state: "CA",
          country: "United States",
          latitude: 34.0522,
          longitude: -118.2437,
        },
        pricing: {
          basePrice: 9600,
          cleaningFee: 2400,
          serviceFee: 1600,
          currency: "INR",
        },
        capacity: {
          guests: 2,
          bedrooms: 1,
          beds: 1,
          bathrooms: 1,
        },
        amenities: [
          "WiFi",
          "Kitchen",
          "Air conditioning",
          "TV",
          "Dedicated workspace",
        ],
        images: [
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
        ],
        availability: {
          minStay: 1,
          maxStay: 28,
          instantBook: true,
        },
        rules: ["No smoking", "No pets", "No parties or events"],
        rating: 4.6,
        reviewCount: 19,
        isActive: true,
      },
    ]);

    console.log(`✅ Created ${properties.length} properties`);

    // Create bookings
    console.log("📅 Creating bookings...");
    const bookings = await Booking.create([
      {
        propertyId: properties[0]._id,
        guestId: users[3]._id,
        hostId: properties[0].hostId,
        checkIn: new Date("2024-02-15"),
        checkOut: new Date("2024-02-18"),
        guests: 2,
        totalPrice: 68000,
        status: "confirmed",
        paymentStatus: "paid",
      },
      {
        propertyId: properties[1]._id,
        guestId: users[4]._id,
        hostId: properties[1].hostId,
        checkIn: new Date("2024-03-10"),
        checkOut: new Date("2024-03-17"),
        guests: 4,
        totalPrice: 129920,
        status: "pending",
        paymentStatus: "pending",
      },
      {
        propertyId: properties[2]._id,
        guestId: users[3]._id,
        hostId: properties[2].hostId,
        checkIn: new Date("2024-04-05"),
        checkOut: new Date("2024-04-10"),
        guests: 6,
        totalPrice: 168000,
        status: "completed",
        paymentStatus: "paid",
      },
    ]);

    console.log(`✅ Created ${bookings.length} bookings`);

    // Create reviews
    console.log("⭐ Creating reviews...");
    const reviews = await Review.create([
      {
        bookingId: bookings[0]._id,
        propertyId: properties[0]._id,
        reviewerId: users[3]._id,
        rating: 5,
        comment:
          "Amazing loft with incredible views! John was a fantastic host and very responsive. The space was exactly as described and perfectly clean. Would definitely stay again!",
        type: "guest-to-host",
      },
      {
        bookingId: bookings[2]._id,
        propertyId: properties[2]._id,
        reviewerId: users[3]._id,
        rating: 4,
        comment:
          "Beautiful mountain cabin with great views. The location was perfect for our hiking vacation. The house had everything we needed for a comfortable stay.",
        type: "guest-to-host",
      },
      {
        bookingId: bookings[0]._id,
        propertyId: properties[0]._id,
        reviewerId: users[0]._id,
        rating: 5,
        comment:
          "Emma was a wonderful guest! Very respectful of the space and followed all house rules. Would be happy to host her again.",
        type: "host-to-guest",
      },
    ]);

    console.log(`✅ Created ${reviews.length} reviews`);

    console.log("🎉 Database seeding completed successfully!");
    console.log(`
📊 Summary:
   Users: ${users.length}
   Properties: ${properties.length}
   Bookings: ${bookings.length}
   Reviews: ${reviews.length}
    `);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

// Run the seeder
seedData();
