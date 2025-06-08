import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Search, Filter, Download } from "lucide-react";
import { Booking } from "@/lib/types";
import { CURRENCY_SYMBOL, BOOKING_STATUS_LABELS } from "@/lib/constants";
import { format } from "date-fns";

interface BookingTableProps {
  bookings: Booking[];
  title: string;
}

export const BookingTable = ({ bookings, title }: BookingTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter bookings
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.guest.firstName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      booking.guest.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.property.location.city
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBookings = filteredBookings.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "confirmed":
        return "default";
      case "pending":
        return "secondary";
      case "cancelled":
        return "destructive";
      case "completed":
        return "outline";
      default:
        return "outline";
    }
  };

  const handleExport = () => {
    // In a real app, this would export to CSV/Excel
    const csvContent = [
      "Booking ID,Guest Name,Property,Location,Check-in,Check-out,Guests,Total Price,Status,Created Date",
      ...filteredBookings.map((booking) =>
        [
          booking.id,
          `${booking.guest.firstName} ${booking.guest.lastName}`,
          booking.property.title,
          `${booking.property.location.city}, ${booking.property.location.state}`,
          booking.checkIn,
          booking.checkOut,
          booking.guests,
          booking.totalPrice,
          booking.status,
          booking.createdAt,
        ].join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bookings.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <Button onClick={handleExport} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mt-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Guest</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Guests</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedBookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={booking.guest.avatar}
                        alt={booking.guest.firstName}
                      />
                      <AvatarFallback>
                        {booking.guest.firstName[0]}
                        {booking.guest.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">
                        {booking.guest.firstName} {booking.guest.lastName}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {booking.guest.email}
                      </div>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div>
                    <div className="font-medium line-clamp-1">
                      {booking.property.title}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {booking.property.location.city},{" "}
                      {booking.property.location.state}
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="text-sm">
                    <div>
                      {format(new Date(booking.checkIn), "MMM dd, yyyy")}
                    </div>
                    <div className="text-muted-foreground">
                      to {format(new Date(booking.checkOut), "MMM dd, yyyy")}
                    </div>
                  </div>
                </TableCell>

                <TableCell>{booking.guests}</TableCell>

                <TableCell className="font-medium">
                  {CURRENCY_SYMBOL}
                  {booking.totalPrice.toLocaleString()}
                </TableCell>

                <TableCell>
                  <Badge variant={getStatusBadgeVariant(booking.status)}>
                    {BOOKING_STATUS_LABELS[booking.status]}
                  </Badge>
                </TableCell>

                <TableCell className="text-sm text-muted-foreground">
                  {format(new Date(booking.createdAt), "MMM dd, yyyy")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, filteredBookings.length)} of{" "}
              {filteredBookings.length} results
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>

              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="w-8 h-8 p-0"
                    >
                      {page}
                    </Button>
                  ),
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
