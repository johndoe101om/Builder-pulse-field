import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { FilterIcon, XIcon } from "lucide-react";
import { SearchFilters as SearchFiltersType } from "@/lib/types";
import { PROPERTY_TYPES, AMENITIES, PRICE_RANGES } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFiltersChange: (filters: SearchFiltersType) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const SearchFilters = ({
  filters,
  onFiltersChange,
  isOpen,
  onToggle,
}: SearchFiltersProps) => {
  const [localFilters, setLocalFilters] = useState<SearchFiltersType>(filters);

  const updateFilter = (key: keyof SearchFiltersType, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
    onToggle();
  };

  const clearFilters = () => {
    const emptyFilters: SearchFiltersType = {};
    setLocalFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  const activeFilterCount = Object.keys(filters).filter((key) => {
    const value = filters[key as keyof SearchFiltersType];
    return (
      value !== undefined &&
      value !== null &&
      (Array.isArray(value) ? value.length > 0 : true)
    );
  }).length;

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        onClick={onToggle}
        className="flex items-center gap-2"
      >
        <FilterIcon className="h-4 w-4" />
        Filters
        {activeFilterCount > 0 && (
          <Badge variant="secondary" className="ml-1">
            {activeFilterCount}
          </Badge>
        )}
      </Button>
    );
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Filters</CardTitle>
        <Button variant="ghost" size="sm" onClick={onToggle}>
          <XIcon className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Price Range */}
        <div>
          <Label className="text-sm font-semibold">
            Price range (per night)
          </Label>
          <div className="mt-3">
            <Slider
              value={localFilters.priceRange || [0, 1000]}
              onValueChange={(value) =>
                updateFilter("priceRange", value as [number, number])
              }
              max={1000}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>₹{localFilters.priceRange?.[0] || 0}</span>
              <span>₹{localFilters.priceRange?.[1] || 80000}+</span>
            </div>
          </div>
        </div>

        {/* Property Types */}
        <div>
          <Label className="text-sm font-semibold">Property type</Label>
          <div className="mt-3 space-y-3">
            {PROPERTY_TYPES.map((type) => (
              <div key={type.value} className="flex items-center space-x-2">
                <Checkbox
                  id={type.value}
                  checked={
                    localFilters.propertyTypes?.includes(type.value) || false
                  }
                  onCheckedChange={(checked) => {
                    const currentTypes = localFilters.propertyTypes || [];
                    const newTypes = checked
                      ? [...currentTypes, type.value]
                      : currentTypes.filter((t) => t !== type.value);
                    updateFilter("propertyTypes", newTypes);
                  }}
                />
                <Label htmlFor={type.value} className="text-sm">
                  {type.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Instant Book */}
        <div className="flex items-center justify-between">
          <Label htmlFor="instant-book" className="text-sm font-semibold">
            Instant Book
          </Label>
          <Switch
            id="instant-book"
            checked={localFilters.instantBook || false}
            onCheckedChange={(checked) => updateFilter("instantBook", checked)}
          />
        </div>

        {/* Amenities */}
        <div>
          <Label className="text-sm font-semibold">Amenities</Label>
          <div className="mt-3 space-y-3 max-h-48 overflow-y-auto">
            {AMENITIES.slice(0, 10).map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity}
                  checked={localFilters.amenities?.includes(amenity) || false}
                  onCheckedChange={(checked) => {
                    const currentAmenities = localFilters.amenities || [];
                    const newAmenities = checked
                      ? [...currentAmenities, amenity]
                      : currentAmenities.filter((a) => a !== amenity);
                    updateFilter("amenities", newAmenities);
                  }}
                />
                <Label htmlFor={amenity} className="text-sm">
                  {amenity}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Minimum Rating */}
        <div>
          <Label className="text-sm font-semibold">Minimum rating</Label>
          <div className="mt-3">
            <Slider
              value={[localFilters.minRating || 0]}
              onValueChange={(value) => updateFilter("minRating", value[0])}
              max={5}
              step={0.1}
              className="w-full"
            />
            <div className="text-sm text-muted-foreground mt-2">
              {localFilters.minRating
                ? `${localFilters.minRating.toFixed(1)}+ stars`
                : "Any rating"}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          <Button onClick={clearFilters} variant="outline" className="flex-1">
            Clear all
          </Button>
          <Button onClick={applyFilters} className="flex-1">
            Apply filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
