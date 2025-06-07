import { CURRENCY_SYMBOL } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface PriceDisplayProps {
  price: number;
  period?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const PriceDisplay = ({
  price,
  period = "night",
  size = "md",
  className,
}: PriceDisplayProps) => {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
  };

  const periodSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  // Format numbers in Indian style (e.g., 1,00,000 instead of 100,000)
  const formatIndianNumber = (num: number) => {
    return num.toLocaleString("en-IN");
  };

  return (
    <div className={cn("flex items-baseline", className)}>
      <span className={cn("font-semibold text-gray-900", sizeClasses[size])}>
        {CURRENCY_SYMBOL}
        {formatIndianNumber(price)}
      </span>
      {period && (
        <span
          className={cn("text-muted-foreground ml-1", periodSizeClasses[size])}
        >
          {period}
        </span>
      )}
    </div>
  );
};
