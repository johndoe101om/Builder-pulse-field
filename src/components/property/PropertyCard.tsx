import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Heart, MapPin } from "lucide-react";
import { Property } from "@/lib/types";
import { CURRENCY_SYMBOL } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/contexts/WishlistContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface PropertyCardProps {
  property: Property;
  className?: string;
}

export const PropertyCard = ({ property, className }: PropertyCardProps) => {
  const {
    id,
    title,
    location,
    pricing,
    capacity,
    images,
    rating,
    reviewCount,
    availability,
  } = property;

  const navigate = useNavigate();
  const { user } = useAuth();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isWishlisted = isInWishlist(id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error("Please log in to save properties to your wishlist");
      navigate("/login", {
        state: { from: { pathname: window.location.pathname } },
      });
      return;
    }

    toggleWishlist(property);

    if (isWishlisted) {
      toast.success("Removed from wishlist");
    } else {
      toast.success("Added to wishlist");
    }
  };

  return (
    <Card
      className={cn(
        "group overflow-hidden border-0 shadow-none hover:shadow-lg transition-all duration-300",
        className,
      )}
    >
      <div className="relative">
        {/* Image */}
        <div className="relative aspect-[3/2] overflow-hidden rounded-lg">
          <img
            src={images[0]}
            alt={title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
          {/* Wishlist Button */}
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-3 right-3 h-8 w-8 p-0 bg-white/80 hover:bg-white/90 rounded-full transition-all duration-200 hover:scale-110"
            onClick={handleWishlistClick}
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-all duration-200",
                isWishlisted
                  ? "text-red-500 fill-red-500"
                  : "text-gray-600 hover:text-red-500",
              )}
            />
          </Button>

          {/* Instant Book Badge */}
          {availability.instantBook && (
            <Badge className="absolute top-3 left-3 bg-white text-gray-900 hover:bg-white">
              Instant Book
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="p-4">
        {/* Location and Rating */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-3 w-3 mr-1" />
            <span>
              {location.city}, {location.state}
            </span>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{rating}</span>
            <span className="text-sm text-muted-foreground ml-1">
              ({reviewCount})
            </span>
          </div>
        </div>

        {/* Title */}
        <Link to={`/booking/${id}`}>
          <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-primary transition-colors mb-2">
            {title}
          </h3>
        </Link>

        {/* Property Details */}
        <div className="text-sm text-muted-foreground mb-3">
          {capacity.guests} guests · {capacity.bedrooms} bedrooms ·{" "}
          {capacity.beds} beds · {capacity.bathrooms} baths
        </div>

        {/* Price */}
        <div className="flex items-baseline">
          <span className="text-lg font-semibold text-gray-900">
            {CURRENCY_SYMBOL}
            {pricing.basePrice}
          </span>
          <span className="text-sm text-muted-foreground ml-1">night</span>
        </div>
      </CardContent>
    </Card>
  );
};
