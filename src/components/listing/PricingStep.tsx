import { Control, UseFormRegister, UseFormWatch } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { DollarSign, InfoIcon } from "lucide-react";
import { CURRENCY_SYMBOL } from "@/lib/constants";
import { ListingFormData } from "@/lib/types";

interface PricingStepProps {
  register: UseFormRegister<ListingFormData>;
  control: Control<ListingFormData>;
  watch: UseFormWatch<ListingFormData>;
  setValue: (name: keyof ListingFormData, value: any) => void;
}

export const PricingStep = ({
  register,
  control,
  watch,
  setValue,
}: PricingStepProps) => {
  const watchedBasePrice = watch("pricing.basePrice") || 0;
  const watchedCleaningFee = watch("pricing.cleaningFee") || 0;
  const watchedInstantBook = watch("availability.instantBook") || false;
  const watchedMinStay = watch("availability.minStay") || 1;
  const watchedMaxStay = watch("availability.maxStay") || 30;

  // Calculate estimated earnings (simplified)
  const estimatedNightsPerMonth = 15;
  const platformFee = 0.03; // 3%
  const hostEarningsPerNight = watchedBasePrice * (1 - platformFee);
  const monthlyEarnings = hostEarningsPerNight * estimatedNightsPerMonth;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Pricing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Base Price */}
          <div>
            <Label htmlFor="basePrice">Base Price per Night *</Label>
            <div className="relative mt-1">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                {CURRENCY_SYMBOL}
              </span>
              <Input
                id="basePrice"
                type="number"
                min="10"
                step="1"
                {...register("pricing.basePrice", {
                  required: "Base price is required",
                  min: 10,
                  valueAsNumber: true,
                })}
                className="pl-8"
                placeholder="100"
              />
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Set your nightly rate. You can adjust this anytime.
            </p>
          </div>

          {/* Additional Fees */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cleaningFee">Cleaning Fee</Label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  {CURRENCY_SYMBOL}
                </span>
                <Input
                  id="cleaningFee"
                  type="number"
                  min="0"
                  step="1"
                  {...register("pricing.cleaningFee", {
                    valueAsNumber: true,
                    min: 0,
                  })}
                  className="pl-8"
                  placeholder="25"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="serviceFee">Service Fee (Optional)</Label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  {CURRENCY_SYMBOL}
                </span>
                <Input
                  id="serviceFee"
                  type="number"
                  min="0"
                  step="1"
                  {...register("pricing.serviceFee", {
                    valueAsNumber: true,
                    min: 0,
                  })}
                  className="pl-8"
                  placeholder="15"
                />
              </div>
            </div>
          </div>

          {/* Earnings Estimate */}
          {watchedBasePrice > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                <InfoIcon className="h-4 w-4" />
                Estimated Monthly Earnings
              </h4>
              <div className="text-sm text-green-800 space-y-1">
                <div className="flex justify-between">
                  <span>Base price per night:</span>
                  <span>
                    {CURRENCY_SYMBOL}
                    {watchedBasePrice}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>After platform fee (3%):</span>
                  <span>
                    {CURRENCY_SYMBOL}
                    {hostEarningsPerNight.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Est. {estimatedNightsPerMonth} nights/month:</span>
                  <span className="font-semibold">
                    {CURRENCY_SYMBOL}
                    {monthlyEarnings.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Booking Rules</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stay Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="minStay">Minimum Stay (nights) *</Label>
              <Input
                id="minStay"
                type="number"
                min="1"
                max="30"
                {...register("availability.minStay", {
                  required: "Minimum stay is required",
                  min: 1,
                  max: 30,
                  valueAsNumber: true,
                })}
                className="mt-1"
                placeholder="1"
              />
            </div>

            <div>
              <Label htmlFor="maxStay">Maximum Stay (nights) *</Label>
              <Input
                id="maxStay"
                type="number"
                min="1"
                max="365"
                {...register("availability.maxStay", {
                  required: "Maximum stay is required",
                  min: 1,
                  max: 365,
                  valueAsNumber: true,
                })}
                className="mt-1"
                placeholder="30"
              />
            </div>
          </div>

          {/* Instant Book */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="instantBook"
              checked={watchedInstantBook}
              onCheckedChange={(checked) =>
                setValue("availability.instantBook", checked)
              }
            />
            <div className="flex-1">
              <Label htmlFor="instantBook" className="cursor-pointer">
                Enable Instant Book
              </Label>
              <p className="text-sm text-muted-foreground">
                Guests can book immediately without waiting for approval
              </p>
            </div>
          </div>

          {/* Booking Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Pricing Tips</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Research similar properties in your area</li>
              <li>• Consider seasonal pricing adjustments</li>
              <li>• Instant Book can increase your bookings by 30%</li>
              <li>• Keep cleaning fees reasonable (under 20% of base price)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
