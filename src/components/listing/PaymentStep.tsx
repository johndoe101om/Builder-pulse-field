import { Control, UseFormWatch } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CreditCardIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  DollarSignIcon,
  CalendarIcon,
  HomeIcon,
} from "lucide-react";
import { ListingFormData } from "@/lib/types";
import { CURRENCY_SYMBOL } from "@/lib/constants";

interface PaymentStepProps {
  control: Control<ListingFormData>;
  watch: UseFormWatch<ListingFormData>;
  setValue: (name: keyof ListingFormData, value: any) => void;
}

export const PaymentStep = ({ control, watch, setValue }: PaymentStepProps) => {
  const watchedData = watch();

  // Calculate listing fees
  const setupFee = 0; // Free to list
  const monthlyFee = 0; // No monthly fee
  const commissionRate = 3; // 3% commission per booking
  const estimatedMonthlyBookings = 10;
  const estimatedCommission = watchedData.pricing?.basePrice
    ? (watchedData.pricing.basePrice *
        estimatedMonthlyBookings *
        commissionRate) /
      100
    : 0;

  const listingFeatures = [
    "Professional listing appearance",
    "Advanced booking management",
    "Instant notifications",
    "Guest messaging system",
    "Calendar synchronization",
    "Review management",
    "24/7 customer support",
    "Marketing exposure",
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCardIcon className="h-5 w-5" />
            Listing Fees & Pricing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Free to List */}
          <div className="text-center py-6 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircleIcon className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-green-900 mb-2">
              Free to List Your Property!
            </h3>
            <p className="text-green-700">
              No upfront costs, no monthly fees. You only pay when you earn.
            </p>
          </div>

          {/* Pricing Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-900 flex items-center gap-2">
                  <DollarSignIcon className="h-5 w-5" />
                  Host Fees
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Setup Fee</span>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    FREE
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Monthly Fee</span>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    FREE
                  </Badge>
                </div>
                <Separator />
                <div className="flex justify-between items-center font-semibold">
                  <span>Commission per booking</span>
                  <span className="text-blue-700">{commissionRate}%</span>
                </div>
                <p className="text-sm text-blue-600">
                  Only charged when you receive a booking
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Estimated Earnings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {watchedData.pricing?.basePrice ? (
                  <>
                    <div className="flex justify-between">
                      <span>Nightly Rate</span>
                      <span>
                        {CURRENCY_SYMBOL}
                        {watchedData.pricing.basePrice}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Est. Monthly Bookings</span>
                      <span>{estimatedMonthlyBookings}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Gross Revenue</span>
                      <span>
                        {CURRENCY_SYMBOL}
                        {(
                          watchedData.pricing.basePrice *
                          estimatedMonthlyBookings
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Platform Commission</span>
                      <span>
                        -{CURRENCY_SYMBOL}
                        {estimatedCommission.toFixed(2)}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg text-green-600">
                      <span>Your Earnings</span>
                      <span>
                        {CURRENCY_SYMBOL}
                        {(
                          watchedData.pricing.basePrice *
                            estimatedMonthlyBookings -
                          estimatedCommission
                        ).toFixed(2)}
                      </span>
                    </div>
                  </>
                ) : (
                  <p className="text-muted-foreground">
                    Set your pricing to see earnings estimate
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* What's Included */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheckIcon className="h-5 w-5" />
                What's Included with Your Listing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {listingFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircleIcon className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Terms and Conditions */}
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="text-orange-900">
                Terms & Conditions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-orange-800 space-y-2">
                <p>
                  • By creating this listing, you agree to our Host Terms of
                  Service
                </p>
                <p>
                  • You confirm that you have the right to rent this property
                </p>
                <p>• All information provided is accurate and up to date</p>
                <p>
                  • You understand the commission structure and payment terms
                </p>
                <p>
                  • You agree to maintain property standards and respond to
                  guests promptly
                </p>
              </div>

              <div className="flex items-start gap-2 mt-4">
                <input type="checkbox" id="terms" className="mt-1" required />
                <label htmlFor="terms" className="text-sm text-orange-800">
                  I agree to the{" "}
                  <a href="#" className="underline font-medium">
                    Terms of Service
                  </a>{" "}
                  and
                  <a href="#" className="underline font-medium ml-1">
                    Privacy Policy
                  </a>
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Payment Security */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheckIcon className="h-5 w-5 text-green-600" />
              <span className="font-semibold">Secure & Protected</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your earnings are protected by our Host Guarantee and secure
              payment processing. All transactions are encrypted and processed
              through industry-standard payment systems.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Listing Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HomeIcon className="h-5 w-5" />
            Listing Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="font-medium text-gray-700">Property Title</div>
              <div className="line-clamp-2">
                {watchedData.title || "Not set"}
              </div>
            </div>
            <div>
              <div className="font-medium text-gray-700">Location</div>
              <div>
                {watchedData.location?.city && watchedData.location?.state
                  ? `${watchedData.location.city}, ${watchedData.location.state}`
                  : "Not set"}
              </div>
            </div>
            <div>
              <div className="font-medium text-gray-700">Nightly Rate</div>
              <div>
                {watchedData.pricing?.basePrice
                  ? `${CURRENCY_SYMBOL}${watchedData.pricing.basePrice}`
                  : "Not set"}
              </div>
            </div>
            <div>
              <div className="font-medium text-gray-700">Property Type</div>
              <div className="capitalize">
                {watchedData.type?.replace("-", " ") || "Not set"}
              </div>
            </div>
            <div>
              <div className="font-medium text-gray-700">Capacity</div>
              <div>
                {watchedData.capacity?.guests
                  ? `${watchedData.capacity.guests} guests, ${watchedData.capacity.bedrooms} bedrooms`
                  : "Not set"}
              </div>
            </div>
            <div>
              <div className="font-medium text-gray-700">Amenities</div>
              <div>{watchedData.amenities?.length || 0} selected</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
