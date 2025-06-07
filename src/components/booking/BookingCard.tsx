import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, UsersIcon } from "lucide-react";
import { format } from "date-fns";
import { Property } from "@/lib/types";
import { CURRENCY_SYMBOL, PLATFORM_FEE_PERCENTAGE } from "@/lib/constants";
import { RatingDisplay } from "@/components/common/RatingDisplay";
import { PriceDisplay } from "@/components/common/PriceDisplay";
import { cn } from "@/lib/utils";

interface BookingCardProps {
  property: Property;
  className?: string;
}

export const BookingCard = ({ property, className }: BookingCardProps) => {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(1);

  const { pricing, capacity, availability, rating, reviewCount } = property;

  // Calculate nights
  const nights =
    checkIn && checkOut
      ? Math.ceil(
          (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24),
        )
      : 0;

  // Calculate costs
  const baseTotal = nights * pricing.basePrice;
  const serviceFee = baseTotal * PLATFORM_FEE_PERCENTAGE;
  const totalCost = baseTotal + pricing.cleaningFee + serviceFee;

  const canBook =
    checkIn &&
    checkOut &&
    nights > 0 &&
    guests <= capacity.guests &&
    nights >= availability.minStay &&
    nights <= availability.maxStay;

  const handleReserve = () => {
    if (!canBook) return;

    // In a real app, this would navigate to booking confirmation or payment
    alert(`Booking request submitted for ${nights} nights!`);
  };

  return (
    <Card className={cn("sticky top-24", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <PriceDisplay price={pricing.basePrice} size="lg" />
          <RatingDisplay rating={rating} reviewCount={reviewCount} size="sm" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Date Selection */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-xs font-semibold">CHECK-IN</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !checkIn && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkIn ? format(checkIn, "MMM dd") : "Add date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkIn}
                  onSelect={setCheckIn}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label className="text-xs font-semibold">CHECK-OUT</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !checkOut && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkOut ? format(checkOut, "MMM dd") : "Add date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkOut}
                  onSelect={setCheckOut}
                  disabled={(date) =>
                    date < new Date() || (checkIn && date <= checkIn)
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Guests */}
        <div>
          <Label className="text-xs font-semibold">GUESTS</Label>
          <div className="relative">
            <UsersIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="number"
              min="1"
              max={capacity.guests}
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
              className="pl-10"
              placeholder="1 guest"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Maximum {capacity.guests} guests
          </p>
        </div>

        {/* Reserve Button */}
        <Button
          onClick={handleReserve}
          disabled={!canBook}
          className="w-full"
          size="lg"
        >
          {availability.instantBook ? "Reserve" : "Request to book"}
        </Button>

        {/* Booking Info */}
        {!availability.instantBook && (
          <p className="text-center text-sm text-muted-foreground">
            You won't be charged yet
          </p>
        )}

        {/* Price Breakdown */}
        {nights > 0 && (
          <div className="space-y-3">
            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="underline">
                  {CURRENCY_SYMBOL}
                  {pricing.basePrice} × {nights} nights
                </span>
                <span>
                  {CURRENCY_SYMBOL}
                  {baseTotal.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="underline">Cleaning fee</span>
                <span>
                  {CURRENCY_SYMBOL}
                  {pricing.cleaningFee}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="underline">Service fee</span>
                <span>
                  {CURRENCY_SYMBOL}
                  {Math.round(serviceFee)}
                </span>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>
                {CURRENCY_SYMBOL}
                {Math.round(totalCost).toLocaleString()}
              </span>
            </div>
          </div>
        )}

        {/* Stay Requirements */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Minimum stay: {availability.minStay} nights</p>
          <p>• Maximum stay: {availability.maxStay} nights</p>
          {availability.instantBook && <p>• Instant Book available</p>}
        </div>
      </CardContent>
    </Card>
  );
};
