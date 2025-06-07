import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CalendarIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  UsersIcon,
  MapPinIcon,
  StarIcon,
  LockIcon,
  CheckCircleIcon,
} from "lucide-react";
import { format } from "date-fns";
import { mockProperties } from "@/lib/mockData";
import { CURRENCY_SYMBOL } from "@/lib/constants";
import { RatingDisplay } from "@/components/common/RatingDisplay";
import { cn } from "@/lib/utils";

const BookingPayment = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const property = mockProperties.find((p) => p.id === id);

  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(1);
  const [paymentStep, setPaymentStep] = useState<
    "details" | "payment" | "confirmation"
  >("details");

  // Payment form state
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    billingAddress: "",
    city: "",
    zipCode: "",
  });

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Property not found</h1>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </div>
    );
  }

  // Calculate costs
  const nights =
    checkIn && checkOut
      ? Math.ceil(
          (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24),
        )
      : 0;
  const baseTotal = nights * property.pricing.basePrice;
  const serviceFee = Math.round(baseTotal * 0.03); // 3% service fee
  const totalCost = baseTotal + property.pricing.cleaningFee + serviceFee;

  const canProceed =
    checkIn && checkOut && nights > 0 && guests <= property.capacity.guests;

  const handlePayment = () => {
    // Simulate payment processing
    setPaymentStep("confirmation");

    // In real app, process payment here
    setTimeout(() => {
      alert("🎉 Booking confirmed! Check your email for details.");
      navigate("/guest-dashboard");
    }, 2000);
  };

  const renderBookingDetails = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Booking Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Property Summary */}
          <div className="flex gap-4">
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-semibold line-clamp-2">{property.title}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPinIcon className="h-3 w-3" />
                <span>
                  {property.location.city}, {property.location.state}
                </span>
              </div>
              <RatingDisplay
                rating={property.rating}
                reviewCount={property.reviewCount}
                size="sm"
              />
            </div>
          </div>

          <Separator />

          {/* Date Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Check-in Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal mt-1",
                      !checkIn && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkIn ? format(checkIn, "MMM dd, yyyy") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
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
              <Label>Check-out Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal mt-1",
                      !checkOut && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkOut
                      ? format(checkOut, "MMM dd, yyyy")
                      : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
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
            <Label htmlFor="guests">Number of Guests *</Label>
            <div className="relative mt-1">
              <UsersIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="guests"
                type="number"
                min="1"
                max={property.capacity.guests}
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                className="pl-10"
              />
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Maximum {property.capacity.guests} guests allowed
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Price Breakdown */}
      {nights > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Price Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>
                  {CURRENCY_SYMBOL}
                  {property.pricing.basePrice} × {nights} nights
                </span>
                <span>
                  {CURRENCY_SYMBOL}
                  {baseTotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Cleaning fee</span>
                <span>
                  {CURRENCY_SYMBOL}
                  {property.pricing.cleaningFee}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Service fee</span>
                <span>
                  {CURRENCY_SYMBOL}
                  {serviceFee}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>
                  {CURRENCY_SYMBOL}
                  {totalCost.toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Button
        onClick={() => setPaymentStep("payment")}
        disabled={!canProceed}
        className="w-full"
        size="lg"
      >
        Continue to Payment
      </Button>
    </div>
  );

  const renderPaymentForm = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCardIcon className="h-5 w-5" />
            Payment Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="cardNumber">Card Number *</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={paymentData.cardNumber}
              onChange={(e) =>
                setPaymentData((prev) => ({
                  ...prev,
                  cardNumber: e.target.value,
                }))
              }
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiryDate">Expiry Date *</Label>
              <Input
                id="expiryDate"
                placeholder="MM/YY"
                value={paymentData.expiryDate}
                onChange={(e) =>
                  setPaymentData((prev) => ({
                    ...prev,
                    expiryDate: e.target.value,
                  }))
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="cvv">CVV *</Label>
              <Input
                id="cvv"
                placeholder="123"
                value={paymentData.cvv}
                onChange={(e) =>
                  setPaymentData((prev) => ({ ...prev, cvv: e.target.value }))
                }
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="cardholderName">Cardholder Name *</Label>
            <Input
              id="cardholderName"
              placeholder="John Doe"
              value={paymentData.cardholderName}
              onChange={(e) =>
                setPaymentData((prev) => ({
                  ...prev,
                  cardholderName: e.target.value,
                }))
              }
              className="mt-1"
            />
          </div>

          <Separator />

          <div>
            <Label htmlFor="billingAddress">Billing Address *</Label>
            <Input
              id="billingAddress"
              placeholder="123 Main Street"
              value={paymentData.billingAddress}
              onChange={(e) =>
                setPaymentData((prev) => ({
                  ...prev,
                  billingAddress: e.target.value,
                }))
              }
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                placeholder="New York"
                value={paymentData.city}
                onChange={(e) =>
                  setPaymentData((prev) => ({ ...prev, city: e.target.value }))
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="zipCode">ZIP Code *</Label>
              <Input
                id="zipCode"
                placeholder="10001"
                value={paymentData.zipCode}
                onChange={(e) =>
                  setPaymentData((prev) => ({
                    ...prev,
                    zipCode: e.target.value,
                  }))
                }
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-green-800">
            <LockIcon className="h-4 w-4" />
            <span className="text-sm font-medium">Secure Payment</span>
          </div>
          <p className="text-sm text-green-700 mt-1">
            Your payment information is encrypted and secure. We never store
            your card details.
          </p>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={() => setPaymentStep("details")}
          className="flex-1"
        >
          Back
        </Button>
        <Button
          onClick={handlePayment}
          className="flex-1 bg-green-600 hover:bg-green-700"
          size="lg"
        >
          Pay {CURRENCY_SYMBOL}
          {totalCost.toLocaleString()}
        </Button>
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <CheckCircleIcon className="h-8 w-8 text-green-600" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-green-600 mb-2">
          Payment Processing
        </h2>
        <p className="text-muted-foreground">
          Please wait while we confirm your booking...
        </p>
      </div>
      <div className="animate-spin w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full mx-auto"></div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-50">
        <div className="container py-8">
          <div className="max-w-2xl mx-auto">
            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    paymentStep === "details"
                      ? "bg-blue-600 text-white"
                      : "bg-green-600 text-white"
                  }`}
                >
                  1
                </div>
                <div
                  className={`w-16 h-1 ${
                    paymentStep === "details" ? "bg-gray-300" : "bg-green-600"
                  }`}
                ></div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    paymentStep === "details"
                      ? "bg-gray-300 text-gray-600"
                      : paymentStep === "payment"
                        ? "bg-blue-600 text-white"
                        : "bg-green-600 text-white"
                  }`}
                >
                  2
                </div>
                <div
                  className={`w-16 h-1 ${
                    paymentStep === "confirmation"
                      ? "bg-green-600"
                      : "bg-gray-300"
                  }`}
                ></div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    paymentStep === "confirmation"
                      ? "bg-green-600 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  3
                </div>
              </div>
            </div>

            {/* Step Content */}
            {paymentStep === "details" && renderBookingDetails()}
            {paymentStep === "payment" && renderPaymentForm()}
            {paymentStep === "confirmation" && renderConfirmation()}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookingPayment;
