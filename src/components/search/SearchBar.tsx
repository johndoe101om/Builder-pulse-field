import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Calendar as CalendarIcon,
  MapPin,
  Search,
  User,
  CalendarDays,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  variant?: "hero" | "compact";
  onSearch?: (params: {
    location: string;
    checkIn?: Date;
    checkOut?: Date;
    guests: number;
  }) => void;
}

export const SearchBar = ({ variant = "hero", onSearch }: SearchBarProps) => {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(1);
  const navigate = useNavigate();

  const handleSearch = () => {
    const searchParams = {
      location,
      checkIn,
      checkOut,
      guests,
    };

    if (onSearch) {
      onSearch(searchParams);
    } else {
      // Navigate to search page with query params
      const params = new URLSearchParams();
      if (location) params.set("location", location);
      if (checkIn) params.set("checkIn", checkIn.toISOString().split("T")[0]);
      if (checkOut)
        params.set("checkOut", checkOut.toISOString().split("T")[0]);
      params.set("guests", guests.toString());

      navigate(`/search?${params.toString()}`);
    }
  };

  const incrementGuests = () => {
    if (guests < 16) setGuests(guests + 1);
  };

  const decrementGuests = () => {
    if (guests > 1) setGuests(guests - 1);
  };

  const isHero = variant === "hero";

  return (
    <div
      className={cn(
        "bg-white rounded-full shadow-lg border",
        isHero ? "p-2 max-w-4xl mx-auto" : "p-1 max-w-2xl",
      )}
    >
      <div
        className={cn(
          "grid gap-2",
          isHero ? "grid-cols-1 md:grid-cols-4" : "grid-cols-1 sm:grid-cols-4",
        )}
      >
        {/* Location */}
        <div className={cn("relative p-3", isHero && "md:border-r md:pr-4")}>
          <Label className="text-xs font-semibold text-gray-800 mb-1 block">
            Where
          </Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search destinations"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10 border-0 shadow-none focus-visible:ring-0 bg-transparent placeholder:text-gray-500 text-sm"
            />
          </div>
        </div>

        {/* Check-in */}
        <div className={cn("relative p-3", isHero && "md:border-r md:pr-4")}>
          <Label className="text-xs font-semibold text-gray-800 mb-1 block">
            Check in
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-left font-normal border-0 shadow-none h-auto p-0 hover:bg-transparent",
                  !checkIn && "text-gray-500",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                <span className="text-sm">
                  {checkIn ? format(checkIn, "MMM dd, yyyy") : "Select date"}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check-out */}
        <div className={cn("relative p-3", isHero && "md:border-r md:pr-4")}>
          <Label className="text-xs font-semibold text-gray-800 mb-1 block">
            Check out
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-left font-normal border-0 shadow-none h-auto p-0 hover:bg-transparent",
                  !checkOut && "text-gray-500",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                <span className="text-sm">
                  {checkOut ? format(checkOut, "MMM dd, yyyy") : "Select date"}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                disabled={(date) =>
                  date < new Date() || (checkIn && date <= checkIn)
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests */}
        <div className="relative flex items-center p-3">
          <div className="flex-1">
            <Label className="text-xs font-semibold text-gray-800 mb-1 block">
              Who
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left font-normal border-0 shadow-none h-auto p-0 hover:bg-transparent"
                >
                  <UsersIcon className="mr-2 h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-700">
                    {guests} {guests === 1 ? "guest" : "guests"}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4" align="start">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Guests</div>
                      <div className="text-sm text-gray-500">
                        Ages 13 or above
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 rounded-full"
                        onClick={decrementGuests}
                        disabled={guests <= 1}
                      >
                        <MinusIcon className="h-4 w-4" />
                      </Button>
                      <span className="font-medium w-8 text-center">
                        {guests}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 rounded-full"
                        onClick={incrementGuests}
                        disabled={guests >= 16}
                      >
                        <PlusIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <Button
            onClick={handleSearch}
            size={isHero ? "lg" : "sm"}
            className={cn(
              "rounded-full flex-shrink-0 bg-primary hover:bg-primary/90 ml-2",
              isHero ? "h-12 w-12 p-0" : "h-8 w-8 p-0",
            )}
          >
            <SearchIcon className={cn(isHero ? "h-5 w-5" : "h-4 w-4")} />
          </Button>
        </div>
      </div>
    </div>
  );
};
