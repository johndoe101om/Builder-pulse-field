#!/bin/bash

echo "🚀 Starting Fusion Backend API..."
echo "=================================="

# Change to backend directory
cd backend

# Install dependencies if not already installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
fi

# Run database seeder
echo "🌱 Seeding database with sample data..."
npm run seed

# Start the backend server
echo "🚀 Starting backend server on port 5000..."
npm run dev
