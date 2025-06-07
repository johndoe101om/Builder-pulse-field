import { Control, UseFormRegister } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPinIcon } from "lucide-react";
import { ListingFormData } from "@/lib/types";

interface LocationStepProps {
  register: UseFormRegister<ListingFormData>;
  control: Control<ListingFormData>;
}

export const LocationStep = ({ register, control }: LocationStepProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPinIcon className="h-5 w-5" />
            Property Location
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Street Address */}
          <div>
            <Label htmlFor="address">Street Address *</Label>
            <Input
              id="address"
              {...register("location.address", {
                required: "Street address is required",
              })}
              placeholder="e.g., 123 Main Street"
              className="mt-1"
            />
          </div>

          {/* City and State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                {...register("location.city", { required: "City is required" })}
                placeholder="e.g., New York"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="state">State/Province *</Label>
              <Input
                id="state"
                {...register("location.state", {
                  required: "State is required",
                })}
                placeholder="e.g., NY"
                className="mt-1"
              />
            </div>
          </div>

          {/* Country and Coordinates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="country">Country *</Label>
              <Input
                id="country"
                {...register("location.country", {
                  required: "Country is required",
                })}
                placeholder="e.g., United States"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                type="number"
                step="any"
                {...register("location.latitude", { valueAsNumber: true })}
                placeholder="e.g., 40.7128"
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Optional - for map display
              </p>
            </div>

            <div>
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                type="number"
                step="any"
                {...register("location.longitude", { valueAsNumber: true })}
                placeholder="e.g., -74.0060"
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Optional - for map display
              </p>
            </div>
          </div>

          {/* Location Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Location Tips</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Be as accurate as possible with the address</li>
              <li>• Coordinates help guests find your property on maps</li>
              <li>• Your exact address will only be shared after booking</li>
              <li>• Consider nearby landmarks or attractions to mention</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
