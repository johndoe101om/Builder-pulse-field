// Extended types for listing form
export interface ListingFormData {
  title: string;
  description: string;
  type: "entire-home" | "private-room" | "shared-room";
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    latitude?: number;
    longitude?: number;
  };
  capacity: {
    guests: number;
    bedrooms: number;
    beds: number;
    bathrooms: number;
  };
  amenities: string[];
  pricing: {
    basePrice: number;
    cleaningFee: number;
    serviceFee: number;
    currency: string;
  };
  availability: {
    minStay: number;
    maxStay: number;
    instantBook: boolean;
  };
  rules: string[];
  images: string[];
}
