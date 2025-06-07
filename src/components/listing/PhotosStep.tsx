import { useState } from "react";
import { Control, UseFormWatch } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageIcon, XIcon, UploadIcon } from "lucide-react";
import { ListingFormData } from "@/lib/types";

interface PhotosStepProps {
  control: Control<ListingFormData>;
  watch: UseFormWatch<ListingFormData>;
  setValue: (name: keyof ListingFormData, value: any) => void;
}

export const PhotosStep = ({ control, watch, setValue }: PhotosStepProps) => {
  const [dragOver, setDragOver] = useState(false);
  const watchedImages = watch("images") || [];

  // Sample images for demo (in real app, this would be file upload)
  const sampleImages = [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1595877244574-e90ce41ce089?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop",
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    // In real app, handle file upload here
    // For demo, we'll add a sample image
    addSampleImage();
  };

  const addSampleImage = () => {
    const availableImages = sampleImages.filter(
      (img) => !watchedImages.includes(img),
    );
    if (availableImages.length > 0) {
      const randomImage =
        availableImages[Math.floor(Math.random() * availableImages.length)];
      setValue("images", [...watchedImages, randomImage]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...watchedImages];
    newImages.splice(index, 1);
    setValue("images", newImages);
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    const newImages = [...watchedImages];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    setValue("images", newImages);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Property Photos
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Add at least 5 high-quality photos. The first photo will be your
            cover image.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Upload Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
              ${
                dragOver
                  ? "border-primary bg-primary/5"
                  : "border-gray-300 hover:border-gray-400"
              }
            `}
            onClick={addSampleImage}
          >
            <UploadIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Upload Photos</h3>
            <p className="text-gray-600 mb-4">
              Drag and drop your photos here, or click to browse
            </p>
            <Button variant="outline">Choose Files</Button>
            <p className="text-sm text-gray-500 mt-2">
              For demo purposes, clicking will add sample images
            </p>
          </div>

          {/* Photo Guidelines */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-900 mb-2">
              Photo Guidelines
            </h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Upload at least 5 photos (24 photos maximum)</li>
              <li>• Use high-resolution images (1024x683 pixels minimum)</li>
              <li>• Show all rooms and key areas</li>
              <li>• Take photos during the day with good lighting</li>
              <li>
                • First photo should be your best exterior or main room shot
              </li>
            </ul>
          </div>

          {/* Image Grid */}
          {watchedImages.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">
                  Your Photos ({watchedImages.length})
                </h3>
                <Badge
                  variant={watchedImages.length >= 5 ? "default" : "secondary"}
                >
                  {watchedImages.length >= 5
                    ? "Requirements met"
                    : `Need ${5 - watchedImages.length} more`}
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {watchedImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative group aspect-[4/3] rounded-lg overflow-hidden border"
                  >
                    <img
                      src={image}
                      alt={`Property photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />

                    {/* Cover Image Badge */}
                    {index === 0 && (
                      <Badge className="absolute top-2 left-2">
                        Cover Photo
                      </Badge>
                    )}

                    {/* Remove Button */}
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      <XIcon className="h-4 w-4" />
                    </Button>

                    {/* Photo Number */}
                    <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                      {index + 1}
                    </div>

                    {/* Move Buttons */}
                    <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {index > 0 && (
                        <Button
                          variant="secondary"
                          size="sm"
                          className="h-6 w-6 p-0 text-xs"
                          onClick={() => moveImage(index, index - 1)}
                        >
                          ←
                        </Button>
                      )}
                      {index < watchedImages.length - 1 && (
                        <Button
                          variant="secondary"
                          size="sm"
                          className="h-6 w-6 p-0 text-xs"
                          onClick={() => moveImage(index, index + 1)}
                        >
                          →
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-sm text-muted-foreground mt-4">
                Drag the arrow buttons to reorder photos. The first photo will
                be your main listing image.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
