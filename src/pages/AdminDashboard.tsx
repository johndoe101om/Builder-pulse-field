import { useState, useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AnalyticsChart,
  StatusPieChart,
} from "@/components/admin/AnalyticsChart";
import { BookingTable } from "@/components/admin/BookingTable";
import {
  CalendarIcon,
  DollarSignIcon,
  UsersIcon,
  TrendingUpIcon,
  HomeIcon,
  MapPinIcon,
  ActivityIcon,
  BarChart3Icon,
} from "lucide-react";
import { mockBookings, mockProperties } from "@/lib/mockData";
import {
  calculateBookingAnalytics,
  getBookingsByDay,
  getBookingsByMonth,
  getBookingsByYear,
  generateExtendedMockBookings,
} from "@/lib/analytics";
import { CURRENCY_SYMBOL } from "@/lib/constants";

const AdminDashboard = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [activeTab, setActiveTab] = useState("overview");

  // Generate extended booking data for better analytics
  const allBookings = useMemo(
    () => generateExtendedMockBookings(mockBookings),
    [],
  );

  // Calculate analytics
  const analytics = useMemo(
    () => calculateBookingAnalytics(allBookings),
    [allBookings],
  );

  // Time series data
  const dailyData = useMemo(
    () => getBookingsByDay(allBookings, selectedYear, selectedMonth),
    [allBookings, selectedYear, selectedMonth],
  );
  const monthlyData = useMemo(
    () => getBookingsByMonth(allBookings, selectedYear),
    [allBookings, selectedYear],
  );
  const yearlyData = useMemo(
    () => getBookingsByYear(allBookings),
    [allBookings],
  );

  // Recent bookings (last 30 days)
  const recentBookings = useMemo(() => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return allBookings
      .filter((booking) => new Date(booking.createdAt) >= thirtyDaysAgo)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }, [allBookings]);

  // Prepare pie chart data
  const statusChartData = analytics.bookingsByStatus.map((item) => ({
    name: item.status,
    value: item.count,
    color:
      item.status === "confirmed"
        ? "#22c55e"
        : item.status === "pending"
          ? "#f59e0b"
          : item.status === "cancelled"
            ? "#ef4444"
            : "#6b7280",
  }));

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const availableYears = [
    ...new Set(
      allBookings.map((booking) => new Date(booking.createdAt).getFullYear()),
    ),
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-50">
        <div className="container py-8">
          {/* Admin Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <BarChart3Icon className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
                <p className="text-muted-foreground">
                  Comprehensive analytics and booking management
                </p>
              </div>
            </div>
            <Badge variant="destructive" className="mb-4">
              Admin Access Only
            </Badge>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Bookings
                    </p>
                    <p className="text-2xl font-bold">
                      {analytics.totalBookings.toLocaleString()}
                    </p>
                    <p className="text-sm text-green-600">
                      +12.5% from last month
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <CalendarIcon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Revenue
                    </p>
                    <p className="text-2xl font-bold">
                      {CURRENCY_SYMBOL}
                      {analytics.totalRevenue.toLocaleString()}
                    </p>
                    <p className="text-sm text-green-600">
                      +18.2% from last month
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <DollarSignIcon className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Active Properties
                    </p>
                    <p className="text-2xl font-bold">
                      {mockProperties.length}
                    </p>
                    <p className="text-sm text-blue-600">+3 new this month</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <HomeIcon className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Occupancy Rate
                    </p>
                    <p className="text-2xl font-bold">
                      {analytics.occupancyRate.toFixed(1)}%
                    </p>
                    <p className="text-sm text-orange-600">
                      +5.3% from last month
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <TrendingUpIcon className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analytics Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="daily">Daily Analytics</TabsTrigger>
              <TabsTrigger value="monthly">Monthly Analytics</TabsTrigger>
              <TabsTrigger value="yearly">Yearly Analytics</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue vs Bookings Chart */}
                <AnalyticsChart
                  data={monthlyData}
                  title="Monthly Revenue Trend"
                  type="area"
                  dataKey="revenue"
                  height={300}
                />

                {/* Booking Status Distribution */}
                <StatusPieChart
                  data={statusChartData}
                  title="Booking Status Distribution"
                />
              </div>

              {/* Top Destinations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPinIcon className="h-5 w-5" />
                    Top Destinations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.topDestinations.map((destination, index) => (
                      <div
                        key={destination.location}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">
                              {destination.location}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {destination.count} bookings
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">
                            {CURRENCY_SYMBOL}
                            {destination.revenue.toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Avg: {CURRENCY_SYMBOL}
                            {Math.round(
                              destination.revenue / destination.count,
                            ).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Bookings */}
              <BookingTable
                bookings={recentBookings.slice(0, 10)}
                title="Recent Bookings (Last 30 Days)"
              />
            </TabsContent>

            {/* Daily Analytics Tab */}
            <TabsContent value="daily" className="mt-6 space-y-6">
              <div className="flex gap-4">
                <Select
                  value={selectedYear.toString()}
                  onValueChange={(value) => setSelectedYear(parseInt(value))}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableYears.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={selectedMonth.toString()}
                  onValueChange={(value) => setSelectedMonth(parseInt(value))}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month, index) => (
                      <SelectItem key={index} value={index.toString()}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AnalyticsChart
                  data={dailyData}
                  title={`Daily Bookings - ${months[selectedMonth]} ${selectedYear}`}
                  type="bar"
                  dataKey="bookings"
                />

                <AnalyticsChart
                  data={dailyData}
                  title={`Daily Revenue - ${months[selectedMonth]} ${selectedYear}`}
                  type="line"
                  dataKey="revenue"
                />
              </div>

              <BookingTable
                bookings={allBookings.filter((booking) => {
                  const bookingDate = new Date(booking.createdAt);
                  return (
                    bookingDate.getFullYear() === selectedYear &&
                    bookingDate.getMonth() === selectedMonth
                  );
                })}
                title={`Bookings for ${months[selectedMonth]} ${selectedYear}`}
              />
            </TabsContent>

            {/* Monthly Analytics Tab */}
            <TabsContent value="monthly" className="mt-6 space-y-6">
              <div className="flex gap-4">
                <Select
                  value={selectedYear.toString()}
                  onValueChange={(value) => setSelectedYear(parseInt(value))}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableYears.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AnalyticsChart
                  data={monthlyData}
                  title={`Monthly Bookings - ${selectedYear}`}
                  type="bar"
                  dataKey="bookings"
                />

                <AnalyticsChart
                  data={monthlyData}
                  title={`Monthly Revenue - ${selectedYear}`}
                  type="area"
                  dataKey="revenue"
                />
              </div>

              <BookingTable
                bookings={allBookings.filter(
                  (booking) =>
                    new Date(booking.createdAt).getFullYear() === selectedYear,
                )}
                title={`All Bookings for ${selectedYear}`}
              />
            </TabsContent>

            {/* Yearly Analytics Tab */}
            <TabsContent value="yearly" className="mt-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AnalyticsChart
                  data={yearlyData}
                  title="Yearly Bookings Trend"
                  type="line"
                  dataKey="bookings"
                />

                <AnalyticsChart
                  data={yearlyData}
                  title="Yearly Revenue Trend"
                  type="area"
                  dataKey="revenue"
                />
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Year-over-Year Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {yearlyData.map((yearData, index) => {
                      const previousYear = yearlyData[index - 1];
                      const bookingGrowth = previousYear
                        ? ((yearData.bookings - previousYear.bookings) /
                            previousYear.bookings) *
                          100
                        : 0;
                      const revenueGrowth = previousYear
                        ? ((yearData.revenue - previousYear.revenue) /
                            previousYear.revenue) *
                          100
                        : 0;

                      return (
                        <Card key={yearData.period}>
                          <CardContent className="p-6">
                            <h3 className="text-lg font-semibold mb-4">
                              {yearData.period}
                            </h3>
                            <div className="space-y-3">
                              <div>
                                <div className="text-2xl font-bold">
                                  {yearData.bookings}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Total Bookings
                                </div>
                                {index > 0 && (
                                  <div
                                    className={`text-sm ${bookingGrowth >= 0 ? "text-green-600" : "text-red-600"}`}
                                  >
                                    {bookingGrowth >= 0 ? "+" : ""}
                                    {bookingGrowth.toFixed(1)}% vs prev year
                                  </div>
                                )}
                              </div>
                              <div>
                                <div className="text-2xl font-bold">
                                  {CURRENCY_SYMBOL}
                                  {yearData.revenue.toLocaleString()}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Total Revenue
                                </div>
                                {index > 0 && (
                                  <div
                                    className={`text-sm ${revenueGrowth >= 0 ? "text-green-600" : "text-red-600"}`}
                                  >
                                    {revenueGrowth >= 0 ? "+" : ""}
                                    {revenueGrowth.toFixed(1)}% vs prev year
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <BookingTable
                bookings={allBookings}
                title="All Bookings (All Time)"
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
