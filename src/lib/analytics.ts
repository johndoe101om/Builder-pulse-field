import { Booking } from "./types";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  eachDayOfInterval,
  eachMonthOfInterval,
} from "date-fns";

export interface BookingAnalytics {
  totalBookings: number;
  totalRevenue: number;
  averageBookingValue: number;
  occupancyRate: number;
  topDestinations: { location: string; count: number; revenue: number }[];
  bookingsByStatus: { status: string; count: number; percentage: number }[];
}

export interface TimeSeriesData {
  period: string;
  bookings: number;
  revenue: number;
  date: Date;
}

export const calculateBookingAnalytics = (
  bookings: Booking[],
): BookingAnalytics => {
  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce(
    (sum, booking) => sum + booking.totalPrice,
    0,
  );
  const averageBookingValue =
    totalBookings > 0 ? totalRevenue / totalBookings : 0;

  // Calculate occupancy rate (simplified)
  const occupancyRate = Math.min(95, Math.max(45, totalBookings * 2.5));

  // Top destinations
  const locationMap = new Map<string, { count: number; revenue: number }>();
  bookings.forEach((booking) => {
    const location = `${booking.property.location.city}, ${booking.property.location.state}`;
    const current = locationMap.get(location) || { count: 0, revenue: 0 };
    locationMap.set(location, {
      count: current.count + 1,
      revenue: current.revenue + booking.totalPrice,
    });
  });

  const topDestinations = Array.from(locationMap.entries())
    .map(([location, data]) => ({ location, ...data }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Bookings by status
  const statusMap = new Map<string, number>();
  bookings.forEach((booking) => {
    statusMap.set(booking.status, (statusMap.get(booking.status) || 0) + 1);
  });

  const bookingsByStatus = Array.from(statusMap.entries()).map(
    ([status, count]) => ({
      status,
      count,
      percentage: (count / totalBookings) * 100,
    }),
  );

  return {
    totalBookings,
    totalRevenue,
    averageBookingValue,
    occupancyRate,
    topDestinations,
    bookingsByStatus,
  };
};

export const getBookingsByDay = (
  bookings: Booking[],
  year: number,
  month: number,
): TimeSeriesData[] => {
  const start = startOfMonth(new Date(year, month));
  const end = endOfMonth(new Date(year, month));
  const days = eachDayOfInterval({ start, end });

  return days.map((day) => {
    const dayBookings = bookings.filter((booking) => {
      const bookingDate = new Date(booking.createdAt);
      return format(bookingDate, "yyyy-MM-dd") === format(day, "yyyy-MM-dd");
    });

    return {
      period: format(day, "MMM dd"),
      bookings: dayBookings.length,
      revenue: dayBookings.reduce(
        (sum, booking) => sum + booking.totalPrice,
        0,
      ),
      date: day,
    };
  });
};

export const getBookingsByMonth = (
  bookings: Booking[],
  year: number,
): TimeSeriesData[] => {
  const start = startOfYear(new Date(year, 0));
  const end = endOfYear(new Date(year, 0));
  const months = eachMonthOfInterval({ start, end });

  return months.map((month) => {
    const monthBookings = bookings.filter((booking) => {
      const bookingDate = new Date(booking.createdAt);
      return (
        bookingDate.getFullYear() === year &&
        bookingDate.getMonth() === month.getMonth()
      );
    });

    return {
      period: format(month, "MMM yyyy"),
      bookings: monthBookings.length,
      revenue: monthBookings.reduce(
        (sum, booking) => sum + booking.totalPrice,
        0,
      ),
      date: month,
    };
  });
};

export const getBookingsByYear = (bookings: Booking[]): TimeSeriesData[] => {
  const years = [
    ...new Set(
      bookings.map((booking) => new Date(booking.createdAt).getFullYear()),
    ),
  ];

  return years.map((year) => {
    const yearBookings = bookings.filter((booking) => {
      return new Date(booking.createdAt).getFullYear() === year;
    });

    return {
      period: year.toString(),
      bookings: yearBookings.length,
      revenue: yearBookings.reduce(
        (sum, booking) => sum + booking.totalPrice,
        0,
      ),
      date: new Date(year, 0),
    };
  });
};

// Generate more realistic mock booking data for better analytics
export const generateExtendedMockBookings = (
  baseBookings: Booking[],
): Booking[] => {
  const extended: Booking[] = [...baseBookings];
  const currentYear = new Date().getFullYear();

  // Generate bookings for the past 2 years
  for (let year = currentYear - 1; year <= currentYear; year++) {
    for (let month = 0; month < 12; month++) {
      const bookingsInMonth = Math.floor(Math.random() * 15) + 5; // 5-20 bookings per month

      for (let i = 0; i < bookingsInMonth; i++) {
        const day = Math.floor(Math.random() * 28) + 1;
        const createdDate = new Date(year, month, day);
        const checkInDate = new Date(
          year,
          month,
          day + Math.floor(Math.random() * 30),
        );
        const checkOutDate = new Date(
          checkInDate.getTime() +
            (Math.floor(Math.random() * 7) + 1) * 24 * 60 * 60 * 1000,
        );

        const mockBooking: Booking = {
          id: `mock-${year}-${month}-${i}`,
          propertyId:
            baseBookings[Math.floor(Math.random() * baseBookings.length)]
              .propertyId,
          guestId: `guest-${Math.floor(Math.random() * 100)}`,
          hostId:
            baseBookings[Math.floor(Math.random() * baseBookings.length)]
              .hostId,
          checkIn: format(checkInDate, "yyyy-MM-dd"),
          checkOut: format(checkOutDate, "yyyy-MM-dd"),
          guests: Math.floor(Math.random() * 6) + 1,
          totalPrice: Math.floor(Math.random() * 160000) + 16000,
          status: ["confirmed", "completed", "pending", "cancelled"][
            Math.floor(Math.random() * 4)
          ] as any,
          paymentStatus: ["paid", "pending", "refunded"][
            Math.floor(Math.random() * 3)
          ] as any,
          property:
            baseBookings[Math.floor(Math.random() * baseBookings.length)]
              .property,
          guest:
            baseBookings[Math.floor(Math.random() * baseBookings.length)].guest,
          createdAt: format(createdDate, "yyyy-MM-dd"),
        };

        extended.push(mockBooking);
      }
    }
  }

  return extended;
};
