import { useParams } from "react-router-dom";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { BookingCard } from "@/components/booking/BookingCard";
import PropertyExperience from "@/components/property/PropertyExperience";
import AdvancedBooking from "@/components/booking/AdvancedBooking";
import PricePrediction from "@/components/insights/PricePrediction";
import { RatingDisplay } from "@/components/common/RatingDisplay";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  MapPinIcon,
  UsersIcon,
  BedIcon,
  BathIcon,
  WifiIcon,
  CarIcon,
  TvIcon,
  AirVentIcon,
  UtensilsIcon,
  WashingMachineIcon,
  StarIcon,
  ShareIcon,
  HeartIcon,
} from "lucide-react";
import { mockProperties, mockReviews } from "@/lib/mockData";
import { PROPERTY_TYPES } from "@/lib/constants";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const property = mockProperties.find((p) => p.id === id);
  const propertyReviews = mockReviews.filter((r) => r.propertyId === id);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Property not found</h1>
          <p className="text-muted-foreground">
            The property you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const propertyTypeLabel =
    PROPERTY_TYPES.find((t) => t.value === property.type)?.label ||
    property.type;

  const amenityIcons: Record<string, any> = {
    WiFi: WifiIcon,
    "Free parking": CarIcon,
    TV: TvIcon,
    "Air conditioning": AirVentIcon,
    Kitchen: UtensilsIcon,
    Washer: WashingMachineIcon,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="container py-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-start justify-between mb-2">
              <h1 className="text-2xl font-bold">{property.title}</h1>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <ShareIcon className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="ghost" size="sm">
                  <Heart className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <RatingDisplay
                rating={property.rating}
                reviewCount={property.reviewCount}
                size="sm"
              />
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>
                  {property.location.city}, {property.location.state},{" "}
                  {property.location.country}
                </span>
              </div>
            </div>
          </div>

          {/* Gallery */}
          <div className="mb-8">
            <PropertyGallery images={property.images} title={property.title} />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Property Info */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">
                      {propertyTypeLabel} hosted by {property.host.firstName}
                    </h2>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span>{property.capacity.guests} guests</span>
                      <span>•</span>
                      <span>{property.capacity.bedrooms} bedrooms</span>
                      <span>•</span>
                      <span>{property.capacity.beds} beds</span>
                      <span>•</span>
                      <span>{property.capacity.bathrooms} baths</span>
                    </div>
                  </div>
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={property.host.avatar}
                      alt={property.host.firstName}
                    />
                    <AvatarFallback>
                      {property.host.firstName[0]}
                      {property.host.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* Quick Features */}
                <div className="flex gap-2 mb-4">
                  {property.availability.instantBook && (
                    <Badge variant="secondary">Instant Book</Badge>
                  )}
                  <Badge variant="outline">Superhost</Badge>
                </div>

                <Separator />
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold mb-3">About this place</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  What this place offers
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {property.amenities.slice(0, 10).map((amenity) => {
                    const IconComponent = amenityIcons[amenity] || WifiIcon;
                    return (
                      <div key={amenity} className="flex items-center gap-3">
                        <IconComponent className="h-5 w-5 text-muted-foreground" />
                        <span>{amenity}</span>
                      </div>
                    );
                  })}
                </div>
                {property.amenities.length > 10 && (
                  <Button variant="outline" className="mt-4">
                    Show all {property.amenities.length} amenities
                  </Button>
                )}
              </div>

              {/* Rules */}
              <div>
                <h3 className="text-lg font-semibold mb-4">House rules</h3>
                <div className="space-y-2">
                  {property.rules.map((rule, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-1 h-1 bg-current rounded-full" />
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              {propertyReviews.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <Star className="h-6 w-6 fill-current" />
                    <h3 className="text-lg font-semibold">
                      {property.rating} · {property.reviewCount} reviews
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {propertyReviews.slice(0, 6).map((review) => (
                      <Card key={review.id} className="border-0 shadow-none">
                        <CardContent className="p-0">
                          <div className="flex items-start gap-3 mb-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={review.reviewer.avatar}
                                alt={review.reviewer.firstName}
                              />
                              <AvatarFallback>
                                {review.reviewer.firstName[0]}
                                {review.reviewer.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-semibold">
                                {review.reviewer.firstName}{" "}
                                {review.reviewer.lastName}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {new Date(
                                  review.createdAt,
                                ).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <p className="text-sm leading-relaxed line-clamp-4">
                            {review.comment}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {propertyReviews.length > 6 && (
                    <Button variant="outline" className="mt-6">
                      Show all {propertyReviews.length} reviews
                    </Button>
                  )}
                </div>
              )}

              {/* Host Info */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src={property.host.avatar}
                        alt={property.host.firstName}
                      />
                      <AvatarFallback>
                        {property.host.firstName[0]}
                        {property.host.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>Hosted by {property.host.firstName}</CardTitle>
                      <p className="text-muted-foreground">
                        Joined in{" "}
                        {new Date(property.host.joinedDate).getFullYear()}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="font-semibold">
                        {property.host.rating}
                      </span>
                      <span className="text-muted-foreground">
                        ({property.host.reviewCount} reviews)
                      </span>
                    </div>
                    {property.host.isVerified && (
                      <Badge variant="secondary">Verified</Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">Contact host</Button>
                    <Button variant="outline">Show profile</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Booking */}
            <div className="lg:col-span-1">
              <BookingCard property={property} />
            </div>
          </div>
        </div>

        {/* Enhanced Property Experience Section */}
        <div className="container mx-auto px-4 py-8">
          <PropertyExperience
            propertyId={property.id}
            images={property.images}
            videos={[]} // Add video URLs when available
            location={{
              lat: 19.076,
              lng: 72.8777,
              address: property.location,
              city: "Mumbai",
              neighborhood: "Bandra West",
            }}
          />
        </div>

        {/* Advanced Booking Options */}
        <div className="container mx-auto px-4 py-8 bg-gray-50">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">
              Flexible Booking Options
            </h2>
            <p className="text-gray-600">
              Explore different ways to book and save on your stay
            </p>
          </div>
          <AdvancedBooking propertyId={property.id} />
        </div>

        {/* Price Intelligence */}
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Price Intelligence</h2>
            <p className="text-gray-600">
              AI-powered insights to help you book at the best time
            </p>
          </div>
          <PricePrediction location={property.location} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export { PropertyDetail };
