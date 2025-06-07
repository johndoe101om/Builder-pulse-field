import { StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingDisplayProps {
  rating: number;
  reviewCount?: number;
  showCount?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const RatingDisplay = ({
  rating,
  reviewCount,
  showCount = true,
  size = "md",
  className,
}: RatingDisplayProps) => {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className={cn("flex items-center", className)}>
      <StarIcon
        className={cn(
          "fill-yellow-400 text-yellow-400 mr-1",
          sizeClasses[size],
        )}
      />
      <span className={cn("font-medium", textSizeClasses[size])}>
        {rating.toFixed(1)}
      </span>
      {showCount && reviewCount !== undefined && (
        <span
          className={cn("text-muted-foreground ml-1", textSizeClasses[size])}
        >
          ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
        </span>
      )}
    </div>
  );
};
