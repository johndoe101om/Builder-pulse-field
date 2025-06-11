# Fusion Booking Platform - Backend API

A comprehensive backend API for an Airbnb-like booking platform built with Node.js, Express, TypeScript, and MongoDB.

## Features

### 🏠 Property Management

- CRUD operations for properties
- Advanced search and filtering
- Property availability checking
- Image management
- Host property management

### 📅 Booking System

- Complete booking lifecycle management
- Availability checking
- Pricing calculations
- Booking status tracking
- Cancellation handling

### ⭐ Review System

- Guest-to-host and host-to-guest reviews
- Review analytics and sentiment analysis
- Review helpfulness tracking
- Moderation capabilities

### 🔍 Search & Discovery

- Advanced property search
- Location-based search
- Search suggestions
- Popular destinations
- Filters and sorting

### 👥 User Management

- User profiles and authentication preparation
- Host verification
- User statistics and analytics
- Host dashboard

### 📊 Analytics & Insights

- Platform-wide analytics
- Property performance metrics
- Financial analytics
- Booking trends
- Review insights

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM
- **Joi** - Data validation
- **Helmet** - Security headers
- **Morgan** - Request logging
- **CORS** - Cross-origin resource sharing

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB
- npm or yarn

### Installation

1. Clone the repository and navigate to backend:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Start MongoDB locally or use MongoDB Atlas

5. Run the development server:
   ```bash
   npm run dev
   ```

### Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run typecheck` - Run TypeScript type checking
- `npm test` - Run tests

## API Documentation

### Base URL

```
http://localhost:5000/api/v1
```

### Authentication

Currently, the API doesn't include authentication middleware, but it's prepared for future integration. All endpoints that require user identification use mock user IDs.

### Core Endpoints

#### Properties

- `GET /properties` - Get all properties with filters
- `GET /properties/:id` - Get property by ID
- `POST /properties` - Create new property
- `PUT /properties/:id` - Update property
- `DELETE /properties/:id` - Delete property

#### Bookings

- `GET /bookings` - Get all bookings
- `GET /bookings/:id` - Get booking by ID
- `POST /bookings` - Create new booking
- `PUT /bookings/:id` - Update booking
- `PATCH /bookings/:id/cancel` - Cancel booking

#### Reviews

- `GET /reviews` - Get all reviews
- `POST /reviews` - Create new review
- `GET /reviews/property/:propertyId` - Get property reviews

#### Search

- `GET /search/properties` - Search properties
- `GET /search/suggestions` - Get search suggestions
- `GET /search/destinations/popular` - Get popular destinations

#### Users

- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `GET /users/:id/dashboard` - Get host dashboard

#### Analytics

- `GET /analytics/platform` - Platform analytics
- `GET /analytics/bookings` - Booking analytics
- `GET /analytics/properties` - Property analytics

### Error Handling

The API uses consistent error response format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error messages"]
}
```

### Pagination

Most list endpoints support pagination:

```
GET /api/v1/properties?page=1&limit=20&sortBy=rating&sortOrder=desc
```

Response includes pagination metadata:

```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

## Data Models

### Property

- Basic information (title, description, type)
- Location details with coordinates
- Capacity and amenities
- Pricing structure
- Availability settings
- Host information

### Booking

- Property and user references
- Check-in/check-out dates
- Guest count and special requests
- Pricing and payment status
- Booking status lifecycle

### Review

- Rating and comment
- Reviewer and property references
- Review type (guest-to-host, host-to-guest)
- Helpfulness and moderation flags

### User

- Profile information
- Host verification status
- Rating and review count
- Join date and activity

## Security Features

- Rate limiting
- CORS configuration
- Input validation and sanitization
- Security headers with Helmet
- Error handling without information leakage
- MongoDB injection prevention

## Development Guidelines

### Code Organization

- Controllers handle business logic
- Models define data structure and validation
- Routes define API endpoints
- Middleware handles cross-cutting concerns
- Utils provide helper functions

### Validation

- Request validation using Joi schemas
- MongoDB ObjectId validation
- Date range validation
- Pagination parameter validation

### Error Handling

- Centralized error handling middleware
- Consistent error response format
- Async error catching
- Database error handling

## Deployment

### Environment Variables

Set these variables in production:

```env
NODE_ENV=production
MONGODB_URI=mongodb://your-production-db
JWT_SECRET=your-secure-secret
ALLOWED_ORIGINS=https://your-frontend-domain.com
```

### Production Build

```bash
npm run build
npm start
```

### Docker Support

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 5000
CMD ["npm", "start"]
```

## Future Enhancements

### Authentication & Authorization

- JWT token-based authentication
- Role-based access control
- OAuth integration (Google, Facebook)
- Email verification

### Payment Integration

- Stripe payment processing
- Refund handling
- Payment analytics
- Commission tracking

### Real-time Features

- WebSocket integration for messaging
- Real-time notifications
- Live availability updates

### Advanced Features

- Image upload and processing
- Geocoding and mapping
- Email notifications
- PDF generation for bookings
- Multi-language support

## Contributing

1. Follow TypeScript best practices
2. Add validation for all inputs
3. Include error handling
4. Write clear commit messages
5. Update documentation

## License

This project is licensed under the MIT License.
