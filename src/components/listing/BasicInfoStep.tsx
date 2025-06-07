import { Control, UseFormRegister, UseFormWatch } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PROPERTY_TYPES } from "@/lib/constants";
import { ListingFormData } from "@/lib/types";

interface BasicInfoStepProps {
  register: UseFormRegister<ListingFormData>;
  control: Control<ListingFormData>;
  watch: UseFormWatch<ListingFormData>;
  setValue: (name: keyof ListingFormData, value: any) => void;
}

export const BasicInfoStep = ({
  register,
  control,
  watch,
  setValue,
}: BasicInfoStepProps) => {
  const watchedType = watch("type");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Property Title */}
          <div>
            <Label htmlFor="title">Property Title *</Label>
            <Input
              id="title"
              {...register("title", { required: "Property title is required" })}
              placeholder="e.g., Stunning Downtown Loft with City Views"
              className="mt-1"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Create a catchy title that highlights your property's best
              features
            </p>
          </div>

          {/* Property Type */}
          <div>
            <Label>Property Type *</Label>
            <RadioGroup
              value={watchedType}
              onValueChange={(value) => setValue("type", value as any)}
              className="mt-2"
            >
              {PROPERTY_TYPES.map((type) => (
                <div key={type.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={type.value} id={type.value} />
                  <Label htmlFor={type.value} className="flex-1 cursor-pointer">
                    <div className="font-medium">{type.label}</div>
                    <div className="text-sm text-muted-foreground">
                      {type.value === "entire-home" &&
                        "Guests have the whole place to themselves"}
                      {type.value === "private-room" &&
                        "Guests have a private room and share common areas"}
                      {type.value === "shared-room" &&
                        "Guests share a room with others"}
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Describe your property, its features, and what makes it special..."
              rows={6}
              className="mt-1"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Minimum 50 characters. Be descriptive and highlight unique
              features.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Property Capacity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="guests">Max Guests *</Label>
              <Input
                id="guests"
                type="number"
                min="1"
                max="16"
                {...register("capacity.guests", {
                  required: "Number of guests is required",
                  min: 1,
                  max: 16,
                })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="bedrooms">Bedrooms *</Label>
              <Input
                id="bedrooms"
                type="number"
                min="0"
                max="10"
                {...register("capacity.bedrooms", {
                  required: "Number of bedrooms is required",
                  min: 0,
                })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="beds">Beds *</Label>
              <Input
                id="beds"
                type="number"
                min="1"
                max="20"
                {...register("capacity.beds", {
                  required: "Number of beds is required",
                  min: 1,
                })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="bathrooms">Bathrooms *</Label>
              <Input
                id="bathrooms"
                type="number"
                min="0.5"
                max="10"
                step="0.5"
                {...register("capacity.bathrooms", {
                  required: "Number of bathrooms is required",
                  min: 0.5,
                })}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
