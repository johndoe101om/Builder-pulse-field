import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Plus,
  HomeIcon,
  CalendarIcon,
  DollarSign,
  StarIcon,
  TrendingUpIcon,
  EyeIcon,
  MessageCircleIcon,
  SettingsIcon,
} from "lucide-react";
import { mockProperties, mockBookings } from "@/lib/mockData";
import { CURRENCY_SYMBOL } from "@/lib/constants";

const HostDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock current host ID
  const hostId = "1";

  // Filter data for current host
  const hostProperties = mockProperties.filter(
    (property) => property.hostId === hostId,
  );
  const hostBookings = mockBookings.filter(
    (booking) => booking.hostId === hostId,
  );

  // Calculate stats
  const totalEarnings = hostBookings
    .filter(
      (booking) =>
        booking.status === "confirmed" || booking.status === "completed",
    )
    .reduce((sum, booking) => sum + booking.totalPrice, 0);

  const pendingBookings = hostBookings.filter(
    (booking) => booking.status === "pending",
  );
  const confirmedBookings = hostBookings.filter(
    (booking) => booking.status === "confirmed",
  );

  const averageRating =
    hostProperties.length > 0
      ? hostProperties.reduce((sum, property) => sum + property.rating, 0) /
        hostProperties.length
      : 0;

  const PropertyCard = ({ property }: { property: any }) => {
    const propertyBookings = hostBookings.filter(
      (booking) => booking.propertyId === property.id,
    );
    const occupancyRate = Math.floor(Math.random() * 40) + 60; // Mock occupancy rate

    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            {/* Property Image */}
            <div className="w-24 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Property Details */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold">
                    <Link
                      to={`/property/${property.id}`}
                      className="hover:text-primary transition-colors"
                    >
                      {property.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {property.location.city}, {property.location.state}
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  <SettingsIcon className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                <div className="text-center">
                  <div className="text-sm font-semibold">
                    {CURRENCY_SYMBOL}
                    {property.pricing.basePrice}
                  </div>
                  <div className="text-xs text-muted-foreground">per night</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold">{property.rating}</div>
                  <div className="text-xs text-muted-foreground">rating</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold">
                    {propertyBookings.length}
                  </div>
                  <div className="text-xs text-muted-foreground">bookings</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold">{occupancyRate}%</div>
                  <div className="text-xs text-muted-foreground">occupancy</div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Edit listing
                </Button>
                <Button variant="outline" size="sm">
                  View calendar
                </Button>
                <Button variant="outline" size="sm">
                  <EyeIcon className="h-4 w-4 mr-1" />
                  View
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const BookingCard = ({ booking }: { booking: any }) => {
    const checkInDate = new Date(booking.checkIn);
    const checkOutDate = new Date(booking.checkOut);

    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-semibold">
                {booking.guest.firstName} {booking.guest.lastName}
              </h3>
              <p className="text-sm text-muted-foreground">
                {booking.property.title}
              </p>
            </div>
            <Badge
              variant={
                booking.status === "confirmed"
                  ? "default"
                  : booking.status === "pending"
                    ? "secondary"
                    : "outline"
              }
            >
              {booking.status}
            </Badge>
          </div>

          <div className="text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1 mb-1">
              <CalendarIcon className="h-3 w-3" />
              <span>
                {checkInDate.toLocaleDateString()} -{" "}
                {checkOutDate.toLocaleDateString()}
              </span>
            </div>
            <div>
              {booking.guests} guests • {CURRENCY_SYMBOL}
              {booking.totalPrice}
            </div>
          </div>

          <div className="flex gap-2">
            {booking.status === "pending" && (
              <>
                <Button size="sm">Accept</Button>
                <Button variant="outline" size="sm">
                  Decline
                </Button>
              </>
            )}
            <Button variant="outline" size="sm">
              <MessageCircleIcon className="h-4 w-4 mr-1" />
              Message
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-gray-50">
        <div className="container py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Host Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your properties and bookings
              </p>
            </div>
            <Button asChild>
              <Link to="/add-listing">
                <Plus className="h-4 w-4 mr-2" />
                Add listing
              </Link>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Earnings
                    </p>
                    <p className="text-2xl font-bold">
                      {CURRENCY_SYMBOL}
                      {totalEarnings.toLocaleString()}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Active Listings
                    </p>
                    <p className="text-2xl font-bold">
                      {hostProperties.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <HomeIcon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Pending Requests
                    </p>
                    <p className="text-2xl font-bold">
                      {pendingBookings.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <CalendarIcon className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Average Rating
                    </p>
                    <p className="text-2xl font-bold">
                      {averageRating.toFixed(1)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <StarIcon className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="properties">
                Properties ({hostProperties.length})
              </TabsTrigger>
              <TabsTrigger value="bookings">
                Bookings ({hostBookings.length})
              </TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6 space-y-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">
                        New booking request from Sarah Wilson
                      </span>
                      <span className="text-xs text-muted-foreground ml-auto">
                        2 hours ago
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">
                        Your listing "Downtown Loft" was viewed 15 times
                      </span>
                      <span className="text-xs text-muted-foreground ml-auto">
                        1 day ago
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">
                        New review received (5 stars)
                      </span>
                      <span className="text-xs text-muted-foreground ml-auto">
                        2 days ago
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUpIcon className="h-5 w-5" />
                      This Month's Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Occupancy Rate</span>
                          <span>78%</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Response Rate</span>
                          <span>95%</span>
                        </div>
                        <Progress value={95} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Guest Satisfaction</span>
                          <span>4.8/5</span>
                        </div>
                        <Progress value={96} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Earnings Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          This month
                        </span>
                        <span className="font-semibold">
                          {CURRENCY_SYMBOL}2,450
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Last month
                        </span>
                        <span className="font-semibold">
                          {CURRENCY_SYMBOL}1,890
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          This year
                        </span>
                        <span className="font-semibold">
                          {CURRENCY_SYMBOL}
                          {totalEarnings.toLocaleString()}
                        </span>
                      </div>
                      <div className="pt-2 border-t">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-green-600">
                            Growth rate
                          </span>
                          <span className="text-sm font-semibold text-green-600">
                            +29.6%
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="properties" className="mt-6">
              <div className="space-y-4">
                {hostProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}

                {hostProperties.length === 0 && (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-semibold mb-2">
                      No properties listed
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Start earning by listing your first property
                    </p>
                    <Button asChild>
                      <Link to="/add-listing">
                        <Plus className="h-4 w-4 mr-2" />
                        Create listing
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="bookings" className="mt-6">
              <div className="space-y-4">
                {hostBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}

                {hostBookings.length === 0 && (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-semibold mb-2">
                      No bookings yet
                    </h3>
                    <p className="text-muted-foreground">
                      Your booking requests will appear here
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Views & Bookings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold">1,247</div>
                        <div className="text-sm text-muted-foreground">
                          Total views this month
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold">23</div>
                        <div className="text-sm text-muted-foreground">
                          Booking requests
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold">1.8%</div>
                        <div className="text-sm text-muted-foreground">
                          Conversion rate
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Guest Demographics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Business travelers</span>
                          <span>45%</span>
                        </div>
                        <Progress value={45} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Leisure travelers</span>
                          <span>35%</span>
                        </div>
                        <Progress value={35} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Families</span>
                          <span>20%</span>
                        </div>
                        <Progress value={20} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default HostDashboard;
