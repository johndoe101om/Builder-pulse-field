import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Calendar,
  MapPin,
  Users,
  Mail,
  Download,
  Share,
  MessageCircle,
  Home,
  Star,
} from "lucide-react";

export const BookingConfirmation: React.FC = () => {
  // Mock booking data
  const booking = {
    id: "BK123456789",
    propertyId: "1",
    property: {
      name: "Beachfront Villa Goa",
      location: "Candolim Beach, Goa",
      image:
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=300&fit=crop",
      rating: 4.8,
      host: {
        name: "Rajesh Kumar",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      },
    },
    checkIn: "2024-12-15",
    checkOut: "2024-12-22",
    guests: 4,
    totalPrice: 42000,
    status: "confirmed",
    guest: {
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
    },
    confirmationDate: new Date().toISOString(),
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const nights = Math.ceil(
    (new Date(booking.checkOut).getTime() -
      new Date(booking.checkIn).getTime()) /
      (1000 * 60 * 60 * 24),
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-gray-600">
            Your reservation has been successfully confirmed. You'll receive a
            confirmation email shortly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Details */}
            <Card>
              <CardHeader>
                <CardTitle>Your Reservation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <img
                    src={booking.property.image}
                    alt={booking.property.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">
                      {booking.property.name}
                    </h3>
                    <div className="flex items-center space-x-2 text-gray-600 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{booking.property.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-medium">
                          {booking.property.rating}
                        </span>
                      </div>
                      <span className="text-gray-600">
                        • Hosted by {booking.property.host.name}
                      </span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      {booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Details */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Confirmation Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-600">Booking ID</span>
                      <p className="font-semibold">{booking.id}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Booked by</span>
                      <p className="font-semibold">{booking.guest.name}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Stay Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-blue-500" />
                      <div>
                        <span className="text-sm text-gray-600">Check-in</span>
                        <p className="font-semibold">
                          {formatDate(booking.checkIn)}
                        </p>
                        <p className="text-sm text-gray-500">After 3:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-red-500" />
                      <div>
                        <span className="text-sm text-gray-600">Check-out</span>
                        <p className="font-semibold">
                          {formatDate(booking.checkOut)}
                        </p>
                        <p className="text-sm text-gray-500">Before 11:00 AM</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-green-500" />
                      <div>
                        <span className="text-sm text-gray-600">Guests</span>
                        <p className="font-semibold">{booking.guests} guests</p>
                        <p className="text-sm text-gray-500">{nights} nights</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Payment Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>
                        ₹{(booking.totalPrice / nights).toLocaleString()} ×{" "}
                        {nights} nights
                      </span>
                      <span>₹{booking.totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cleaning fee</span>
                      <span>₹2,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service fee</span>
                      <span>₹3,500</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Total (INR)</span>
                      <span>
                        ₹{(booking.totalPrice + 2000 + 3500).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Important Information */}
            <Card>
              <CardHeader>
                <CardTitle>Important Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-green-700">
                      What's included
                    </h4>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• Entire villa for your group</li>
                      <li>• Welcome refreshments</li>
                      <li>• Beach towels and loungers</li>
                      <li>• Free WiFi</li>
                      <li>• Air conditioning</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-700">
                      Things to remember
                    </h4>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• Bring valid government-issued ID</li>
                      <li>• No smoking inside the property</li>
                      <li>• No pets allowed</li>
                      <li>• Quiet hours: 10 PM - 8 AM</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download Confirmation
                </Button>
                <Button className="w-full" variant="outline">
                  <Share className="w-4 h-4 mr-2" />
                  Share Details
                </Button>
                <Button className="w-full" variant="outline">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact Host
                </Button>
                <Button className="w-full" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Add to Calendar
                </Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Confirmation sent to:</h4>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{booking.guest.email}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Questions?</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Contact our support team 24/7 for any assistance.
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Get Support
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <Button variant="outline" className="w-full">
                    <Home className="w-4 h-4 mr-2" />
                    Back to Home
                  </Button>
                  <Button className="w-full">View My Bookings</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
