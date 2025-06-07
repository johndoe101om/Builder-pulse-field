import { Control, UseFormWatch } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  WifiIcon,
  UtensilsIcon,
  CarIcon,
  TvIcon,
  AirVentIcon,
  WashingMachineIcon,
  WavesIcon,
  DumbbellIcon,
  CoffeeIcon,
  FlameIcon,
} from "lucide-react";
import { AMENITIES } from "@/lib/constants";
import { ListingFormData } from "@/lib/types";

interface AmenitiesStepProps {
  control: Control<ListingFormData>;
  watch: UseFormWatch<ListingFormData>;
  setValue: (name: keyof ListingFormData, value: any) => void;
}

export const AmenitiesStep = ({
  control,
  watch,
  setValue,
}: AmenitiesStepProps) => {
  const watchedAmenities = watch("amenities") || [];

  const toggleAmenity = (amenity: string) => {
    const currentAmenities = watchedAmenities;
    const isSelected = currentAmenities.includes(amenity);

    if (isSelected) {
      setValue(
        "amenities",
        currentAmenities.filter((item) => item !== amenity),
      );
    } else {
      setValue("amenities", [...currentAmenities, amenity]);
    }
  };

  const getAmenityIcon = (amenity: string) => {
    const iconMap: Record<string, any> = {
      WiFi: WifiIcon,
      Kitchen: UtensilsIcon,
      "Free parking": CarIcon,
      TV: TvIcon,
      "Air conditioning": AirVentIcon,
      Washer: WashingMachineIcon,
      Pool: WavesIcon,
      Gym: DumbbellIcon,
      Breakfast: CoffeeIcon,
      Fireplace: FlameIcon,
    };

    return iconMap[amenity] || WifiIcon;
  };

  // Group amenities by category
  const amenityCategories = {
    Essential: [
      "WiFi",
      "Kitchen",
      "Washer",
      "Dryer",
      "Air conditioning",
      "Heating",
    ],
    Features: [
      "TV",
      "Dedicated workspace",
      "Hair dryer",
      "Iron",
      "Laptop friendly workspace",
    ],
    Accessibility: ["Wheelchair accessible", "Elevator"],
    Outdoor: ["Free parking", "Pool", "Hot tub", "Private entrance"],
    Safety: [
      "Smoke alarm",
      "Carbon monoxide alarm",
      "First aid kit",
      "Fire extinguisher",
    ],
    Other: AMENITIES.filter(
      (amenity) =>
        ![
          "WiFi",
          "Kitchen",
          "Washer",
          "Dryer",
          "Air conditioning",
          "Heating",
          "TV",
          "Dedicated workspace",
          "Hair dryer",
          "Iron",
          "Laptop friendly workspace",
          "Wheelchair accessible",
          "Elevator",
          "Free parking",
          "Pool",
          "Hot tub",
          "Private entrance",
          "Smoke alarm",
          "Carbon monoxide alarm",
          "First aid kit",
          "Fire extinguisher",
        ].includes(amenity),
    ),
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Property Amenities</CardTitle>
          <p className="text-sm text-muted-foreground">
            Select all amenities available at your property. Selected:{" "}
            {watchedAmenities.length}
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          {Object.entries(amenityCategories).map(([category, amenities]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                {category}
                <Badge variant="outline">
                  {amenities.filter((a) => watchedAmenities.includes(a)).length}
                </Badge>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {amenities.map((amenity) => {
                  const isSelected = watchedAmenities.includes(amenity);
                  const IconComponent = getAmenityIcon(amenity);

                  return (
                    <div
                      key={amenity}
                      onClick={() => toggleAmenity(amenity)}
                      className={`
                        flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all
                        ${
                          isSelected
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }
                      `}
                    >
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleAmenity(amenity)}
                      />
                      <IconComponent
                        className={`h-4 w-4 ${isSelected ? "text-primary" : "text-gray-500"}`}
                      />
                      <Label className="cursor-pointer flex-1 text-sm">
                        {amenity}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Selected Amenities Summary */}
      {watchedAmenities.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>
              Selected Amenities ({watchedAmenities.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {watchedAmenities.map((amenity) => (
                <Badge
                  key={amenity}
                  variant="secondary"
                  className="cursor-pointer hover:bg-red-100 hover:text-red-800"
                  onClick={() => toggleAmenity(amenity)}
                >
                  {amenity} ×
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Click on any badge to remove that amenity
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
