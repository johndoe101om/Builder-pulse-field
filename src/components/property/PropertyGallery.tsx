import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChevronLeftIcon, ChevronRightIcon, GridIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export const PropertyGallery = ({ images, title }: PropertyGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <>
      {/* Main Gallery Grid */}
      <div className="relative">
        <div className="grid grid-cols-4 gap-2 rounded-xl overflow-hidden">
          {/* Main Image */}
          <div
            className="col-span-2 row-span-2 relative group cursor-pointer"
            onClick={() => setIsDialogOpen(true)}
          >
            <img
              src={images[0]}
              alt={`${title} - Main view`}
              className="w-full h-full object-cover"
              style={{ aspectRatio: "1/1" }}
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
          </div>

          {/* Secondary Images */}
          {images.slice(1, 5).map((image, index) => (
            <div
              key={index}
              className="relative group cursor-pointer"
              onClick={() => {
                setCurrentImageIndex(index + 1);
                setIsDialogOpen(true);
              }}
            >
              <img
                src={image}
                alt={`${title} - View ${index + 2}`}
                className="w-full h-full object-cover"
                style={{ aspectRatio: "1/1" }}
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
            </div>
          ))}
        </div>

        {/* Show All Photos Button */}
        <Button
          variant="outline"
          className="absolute bottom-4 right-4 bg-white hover:bg-gray-50"
          onClick={() => setIsDialogOpen(true)}
        >
          <GridIcon className="mr-2 h-4 w-4" />
          Show all photos
        </Button>
      </div>

      {/* Full Screen Gallery Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-7xl w-full h-[90vh] p-0">
          <div className="relative w-full h-full bg-black">
            {/* Main Image */}
            <div className="flex items-center justify-center h-full">
              <img
                src={images[currentImageIndex]}
                alt={`${title} - View ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/90 text-black"
                  onClick={previousImage}
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/90 text-black"
                  onClick={nextImage}
                >
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {images.length}
            </div>

            {/* Thumbnail Strip */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-black/50 p-2 rounded-lg max-w-full overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={cn(
                    "flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-all",
                    index === currentImageIndex
                      ? "border-white"
                      : "border-transparent opacity-60 hover:opacity-80",
                  )}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
