import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SearchBar } from "@/components/search/SearchBar";
import { SearchFilters } from "@/components/search/SearchFilters";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Grid, List, Map } from "lucide-react";
import { mockProperties } from "@/lib/mockData";
import { SearchFilters as SearchFiltersType, Property } from "@/lib/types";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [filteredProperties, setFilteredProperties] =
    useState<Property[]>(mockProperties);
  const [filters, setFilters] = useState<SearchFiltersType>({});
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<string>("recommended");

  // Initialize filters from URL params
  useEffect(() => {
    const urlFilters: SearchFiltersType = {};

    const location = searchParams.get("location");
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");
    const guests = searchParams.get("guests");

    if (location) urlFilters.location = location;
    if (checkIn) urlFilters.checkIn = checkIn;
    if (checkOut) urlFilters.checkOut = checkOut;
    if (guests) urlFilters.guests = parseInt(guests);

    setFilters(urlFilters);
  }, [searchParams]);

  // Filter properties based on current filters
  useEffect(() => {
    let filtered = [...properties];

    // Filter by location
    if (filters.location) {
      filtered = filtered.filter(
        (property) =>
          property.location.city
            .toLowerCase()
            .includes(filters.location!.toLowerCase()) ||
          property.location.state
            .toLowerCase()
            .includes(filters.location!.toLowerCase()) ||
          property.title
            .toLowerCase()
            .includes(filters.location!.toLowerCase()),
      );
    }

    // Filter by guests
    if (filters.guests) {
      filtered = filtered.filter(
        (property) => property.capacity.guests >= filters.guests!,
      );
    }

    // Filter by price range
    if (filters.priceRange) {
      filtered = filtered.filter(
        (property) =>
          property.pricing.basePrice >= filters.priceRange![0] &&
          property.pricing.basePrice <= filters.priceRange![1],
      );
    }

    // Filter by property types
    if (filters.propertyTypes && filters.propertyTypes.length > 0) {
      filtered = filtered.filter((property) =>
        filters.propertyTypes!.includes(property.type),
      );
    }

    // Filter by instant book
    if (filters.instantBook) {
      filtered = filtered.filter(
        (property) => property.availability.instantBook,
      );
    }

    // Filter by amenities
    if (filters.amenities && filters.amenities.length > 0) {
      filtered = filtered.filter((property) =>
        filters.amenities!.every((amenity) =>
          property.amenities.includes(amenity),
        ),
      );
    }

    // Filter by minimum rating
    if (filters.minRating) {
      filtered = filtered.filter(
        (property) => property.rating >= filters.minRating!,
      );
    }

    // Sort properties
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.pricing.basePrice - b.pricing.basePrice);
        break;
      case "price-high":
        filtered.sort((a, b) => b.pricing.basePrice - a.pricing.basePrice);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
      default:
        // Keep original order for 'recommended'
        break;
    }

    setFilteredProperties(filtered);
  }, [properties, filters, sortBy]);

  const handleFiltersChange = (newFilters: SearchFiltersType) => {
    setFilters(newFilters);

    // Update URL params
    const params = new URLSearchParams(searchParams);
    if (newFilters.location) {
      params.set("location", newFilters.location);
    } else {
      params.delete("location");
    }
    if (newFilters.guests) {
      params.set("guests", newFilters.guests.toString());
    } else {
      params.delete("guests");
    }
    setSearchParams(params);
  };

  const handleSearch = (searchData: any) => {
    const newFilters = {
      ...filters,
      location: searchData.location,
      guests: searchData.guests,
    };
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSearch={handleSearch} />

      {/* Search Bar */}
      <div className="border-b bg-white sticky top-16 z-40">
        <div className="container py-4">
          <SearchBar variant="compact" onSearch={handleSearch} />
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Sidebar - Desktop */}
        <div className="hidden lg:block w-80 border-r bg-white sticky top-32 h-fit">
          <div className="p-6">
            <SearchFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              isOpen={true}
              onToggle={() => {}}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Controls Bar */}
          <div className="border-b bg-white">
            <div className="container py-4">
              <div className="flex items-center justify-between">
                {/* Results Info */}
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    {filteredProperties.length} stays
                    {filters.location && ` in ${filters.location}`}
                  </span>

                  {/* Mobile Filters */}
                  <div className="lg:hidden">
                    <SearchFilters
                      filters={filters}
                      onFiltersChange={handleFiltersChange}
                      isOpen={showFilters}
                      onToggle={() => setShowFilters(!showFilters)}
                    />
                  </div>
                </div>

                {/* View and Sort Controls */}
                <div className="flex items-center gap-4">
                  {/* Sort */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recommended">Recommended</SelectItem>
                      <SelectItem value="price-low">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="price-high">
                        Price: High to Low
                      </SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* View Mode */}
                  <div className="hidden md:flex border rounded-lg">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="rounded-r-none"
                    >
                      <Grid className="mr-2 h-4 w-4" />
                      Grid
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="mr-2 h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-l-none"
                    >
                      <Map className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Properties Grid */}
          <div className="container py-6">
            {filteredProperties.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">
                  No properties found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or filters
                </p>
                <Button onClick={() => setFilters({})}>
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
                    : "space-y-6"
                }
              >
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    className={viewMode === "list" ? "flex-row" : ""}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export { Search };
