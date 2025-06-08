import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Users,
  BarChart3,
  PieChart,
  LineChart,
  Download,
  Filter,
  RefreshCw,
  Target,
  Award,
  Clock,
  Home,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Percent,
} from "lucide-react";

interface RevenueData {
  totalRevenue: number;
  monthlyRevenue: number;
  revenueGrowth: number;
  occupancyRate: number;
  averageDailyRate: number;
  totalBookings: number;
  cancelledBookings: number;
  repeatGuests: number;
}

interface PropertyPerformance {
  id: string;
  name: string;
  revenue: number;
  occupancy: number;
  averageRating: number;
  bookings: number;
  growth: number;
}

export const RevenueAnalytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("this_month");
  const [selectedProperty, setSelectedProperty] = useState("all");

  const revenueData: RevenueData = {
    totalRevenue: 245890,
    monthlyRevenue: 45230,
    revenueGrowth: 12.5,
    occupancyRate: 78,
    averageDailyRate: 2850,
    totalBookings: 156,
    cancelledBookings: 8,
    repeatGuests: 34,
  };

  const monthlyData = [
    { month: "Jan", revenue: 32000, bookings: 45, occupancy: 65 },
    { month: "Feb", revenue: 38000, bookings: 52, occupancy: 71 },
    { month: "Mar", revenue: 42000, bookings: 58, occupancy: 76 },
    { month: "Apr", revenue: 39000, bookings: 54, occupancy: 73 },
    { month: "May", revenue: 45000, bookings: 62, occupancy: 78 },
    { month: "Jun", revenue: 48000, bookings: 65, occupancy: 82 },
  ];

  const propertyPerformance: PropertyPerformance[] = [
    {
      id: "1",
      name: "Beachfront Villa Goa",
      revenue: 98000,
      occupancy: 85,
      averageRating: 4.9,
      bookings: 67,
      growth: 15.2,
    },
    {
      id: "2",
      name: "Mumbai Central Apartment",
      revenue: 67000,
      occupancy: 78,
      averageRating: 4.7,
      bookings: 89,
      growth: 8.7,
    },
    {
      id: "3",
      name: "Heritage Homestay Kerala",
      revenue: 45000,
      occupancy: 72,
      averageRating: 4.8,
      bookings: 45,
      growth: -3.2,
    },
  ];

  const revenueStreams = [
    {
      source: "Accommodation",
      amount: 198000,
      percentage: 80.5,
      color: "bg-blue-500",
    },
    {
      source: "Cleaning Fees",
      amount: 24000,
      percentage: 9.8,
      color: "bg-green-500",
    },
    {
      source: "Service Fees",
      amount: 15000,
      percentage: 6.1,
      color: "bg-purple-500",
    },
    {
      source: "Extra Services",
      amount: 8890,
      percentage: 3.6,
      color: "bg-orange-500",
    },
  ];

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Revenue Analytics
          </h1>
          <p className="text-gray-600 mt-2">
            Track your earnings and optimize your property performance
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm"
          >
            <option value="this_week">This Week</option>
            <option value="this_month">This Month</option>
            <option value="this_quarter">This Quarter</option>
            <option value="this_year">This Year</option>
          </select>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(revenueData.totalRevenue)}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">
                    {formatPercentage(revenueData.revenueGrowth)}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">
                    vs last period
                  </span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Occupancy Rate
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {revenueData.occupancyRate}%
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">
                    +5.2%
                  </span>
                  <span className="text-sm text-gray-500 ml-1">
                    vs last period
                  </span>
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Percent className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Average Daily Rate
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(revenueData.averageDailyRate)}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  <span className="text-sm text-red-600 font-medium">
                    -2.1%
                  </span>
                  <span className="text-sm text-gray-500 ml-1">
                    vs last period
                  </span>
                </div>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Bookings
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {revenueData.totalBookings}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">
                    +8.7%
                  </span>
                  <span className="text-sm text-gray-500 ml-1">
                    vs last period
                  </span>
                </div>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Trends</TabsTrigger>
          <TabsTrigger value="properties">Property Performance</TabsTrigger>
          <TabsTrigger value="guests">Guest Analytics</TabsTrigger>
          <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Streams */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="w-5 h-5 text-blue-500" />
                  <span>Revenue Streams</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueStreams.map((stream, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {stream.source}
                        </span>
                        <span className="text-sm text-gray-600">
                          {formatCurrency(stream.amount)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Progress
                          value={stream.percentage}
                          className="flex-1 h-2"
                        />
                        <span className="text-xs text-gray-500 w-12">
                          {stream.percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Monthly Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-green-500" />
                  <span>Monthly Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {formatCurrency(revenueData.monthlyRevenue)}
                    </div>
                    <div className="text-sm text-gray-600">
                      This Month's Revenue
                    </div>
                  </div>

                  <div className="space-y-3">
                    {monthlyData.slice(-3).map((month, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm font-medium">
                          {month.month}
                        </span>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm">
                            {formatCurrency(month.revenue)}
                          </span>
                          <div className="w-20">
                            <Progress value={month.occupancy} className="h-2" />
                          </div>
                          <span className="text-xs text-gray-500 w-8">
                            {month.occupancy}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="properties" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Property Performance Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {propertyPerformance.map((property) => (
                  <div key={property.id} className="border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {property.name}
                        </h3>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">
                              {property.averageRating}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">
                              {property.bookings} bookings
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">
                          {formatCurrency(property.revenue)}
                        </div>
                        <div className="flex items-center space-x-1">
                          {property.growth >= 0 ? (
                            <ArrowUpRight className="w-4 h-4 text-green-500" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4 text-red-500" />
                          )}
                          <span
                            className={`text-sm font-medium ${property.growth >= 0 ? "text-green-600" : "text-red-600"}`}
                          >
                            {formatPercentage(property.growth)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-gray-600">
                          Occupancy Rate
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <Progress
                            value={property.occupancy}
                            className="flex-1 h-2"
                          />
                          <span className="text-sm font-medium">
                            {property.occupancy}%
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">
                          Revenue Share
                        </div>
                        <div className="text-lg font-semibold mt-1">
                          {(
                            (property.revenue /
                              propertyPerformance.reduce(
                                (sum, p) => sum + p.revenue,
                                0,
                              )) *
                            100
                          ).toFixed(1)}
                          %
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">
                          Avg. per Booking
                        </div>
                        <div className="text-lg font-semibold mt-1">
                          {formatCurrency(
                            Math.round(property.revenue / property.bookings),
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guests" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Guest Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {revenueData.repeatGuests}
                    </div>
                    <div className="text-sm text-blue-700">Repeat Guests</div>
                    <div className="text-xs text-blue-600 mt-1">
                      {(
                        (revenueData.repeatGuests / revenueData.totalBookings) *
                        100
                      ).toFixed(1)}
                      % of total
                    </div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {(
                        ((revenueData.totalBookings -
                          revenueData.cancelledBookings) /
                          revenueData.totalBookings) *
                        100
                      ).toFixed(1)}
                      %
                    </div>
                    <div className="text-sm text-green-700">
                      Booking Success Rate
                    </div>
                    <div className="text-xs text-green-600 mt-1">
                      {revenueData.cancelledBookings} cancellations
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Guest Demographics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Domestic Guests</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={65} className="w-20 h-2" />
                        <span className="text-sm">65%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">International Guests</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={35} className="w-20 h-2" />
                        <span className="text-sm">35%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Booking Patterns</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Average Stay Duration</span>
                      <span className="font-medium">3.2 nights</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Peak Booking Day</span>
                      <span className="font-medium">Friday</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Lead Time</span>
                      <span className="font-medium">14 days</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Optimization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Target className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-900">
                        Optimization Opportunity
                      </h4>
                      <p className="text-sm text-yellow-800 mt-1">
                        Increase rates for weekends by 15% to maximize revenue
                        during high-demand periods.
                      </p>
                      <div className="mt-3">
                        <span className="text-sm font-medium text-yellow-900">
                          Potential increase:{" "}
                        </span>
                        <span className="text-sm text-yellow-800">
                          ₹8,500/month
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Award className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">
                        Performance Achievement
                      </h4>
                      <p className="text-sm text-blue-800 mt-1">
                        Your occupancy rate is 15% higher than market average in
                        your area.
                      </p>
                      <div className="mt-3">
                        <span className="text-sm font-medium text-blue-900">
                          Market average:{" "}
                        </span>
                        <span className="text-sm text-blue-800">63%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-900">Quick Win</h4>
                      <p className="text-sm text-green-800 mt-1">
                        Update your property photos to increase booking
                        conversion by up to 25%.
                      </p>
                      <Button size="sm" className="mt-3">
                        Update Photos
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="forecasting" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Forecasting</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <LineChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Advanced Forecasting
                </h3>
                <p className="text-gray-600 mb-6">
                  AI-powered revenue predictions and market trend analysis
                </p>
                <Button>Enable Forecasting</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
