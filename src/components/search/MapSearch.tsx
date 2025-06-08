import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  MapPin,
  Search,
  Filter,
  List,
  Map as MapIcon,
  Layers,
  Navigation,
  Target,
  ZoomIn,
  ZoomOut,
  Home as HomeIcon,
  Star,
  DollarSign,
  Users,
  Wifi,
  Car,
  Coffee,
  Tv,
  Eye,
  Heart,
  Share,
  Phone,
  MessageCircle,
  Calendar,
  Clock,
  TrendingUp,
  Zap,
  Shield,
  Award,
  Camera,
  Info,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Property {
  id: string;
  title: string;
  type: string;
  price: number;
  rating: number;
  reviews: number;
  images: string[];
  location: {
    lat: number;
    lng: number;
    address: string;
    city: string;
  };
  amenities: string[];
  host: {
    name: string;
    avatar: string;
    superhost: boolean;
  };
  instantBook: boolean;
  lastBooked: string;
}

interface MapCluster {
  id: string;
  lat: number;
  lng: number;
  count: number;
  avgPrice: number;
  properties: Property[];
}

interface MapViewport {
  latitude: number;
  longitude: number;
  zoom: number;
}

const MapSearch = () => {
  const [viewport, setViewport] = useState<MapViewport>({
    latitude: 19.076, // Mumbai
    longitude: 72.8777,
    zoom: 11,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null,
  );
  const [hoveredCluster, setHoveredCluster] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const mapRef = useRef<HTMLDivElement>(null);

  // Mock property data
  const mockProperties: Property[] = [
    {
      id: "1",
      title: "Luxury Apartment in Bandra",
      type: "Apartment",
      price: 5500,
      rating: 4.8,
      reviews: 127,
      images: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      ],
      location: {
        lat: 19.0596,
        lng: 72.8295,
        address: "Bandra West, Mumbai",
        city: "Mumbai",
      },
      amenities: ["wifi", "ac", "kitchen", "parking"],
      host: {
        name: "Priya Sharma",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b375?w=40&h=40&fit=crop&crop=face",
        superhost: true,
      },
      instantBook: true,
      lastBooked: "2 hours ago",
    },
    {
      id: "2",
      title: "Cozy Studio in Andheri",
      type: "Studio",
      price: 3200,
      rating: 4.6,
      reviews: 89,
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      ],
      location: {
        lat: 19.1136,
        lng: 72.8697,
        address: "Andheri East, Mumbai",
        city: "Mumbai",
      },
      amenities: ["wifi", "ac", "tv"],
      host: {
        name: "Raj Patel",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        superhost: false,
      },
      instantBook: false,
      lastBooked: "1 day ago",
    },
    {
      id: "3",
      title: "Modern Flat in Powai",
      type: "Apartment",
      price: 4800,
      rating: 4.9,
      reviews: 203,
      images: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      ],
      location: {
        lat: 19.1197,
        lng: 72.9059,
        address: "Powai, Mumbai",
        city: "Mumbai",
      },
      amenities: ["wifi", "ac", "kitchen", "parking", "pool"],
      host: {
        name: "Anjali Singh",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
        superhost: true,
      },
      instantBook: true,
      lastBooked: "30 minutes ago",
    },
  ];

  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [clusters, setClusters] = useState<MapCluster[]>([]);

  // Get user's current location
  const getUserLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setViewport({
            latitude,
            longitude,
            zoom: 13,
          });
        },
        (error) => {
          console.warn("Geolocation error:", error);
        },
      );
    }
  }, []);

  // Create clusters based on zoom level and property proximity
  const createClusters = useCallback(() => {
    if (viewport.zoom > 14) {
      // High zoom - show individual properties
      setClusters([]);
      return;
    }

    // Group nearby properties into clusters
    const clusterMap = new Map<string, MapCluster>();
    const gridSize = viewport.zoom < 10 ? 0.1 : 0.05; // Adjust grid size based on zoom

    properties.forEach((property) => {
      const gridLat = Math.floor(property.location.lat / gridSize) * gridSize;
      const gridLng = Math.floor(property.location.lng / gridSize) * gridSize;
      const key = `${gridLat}-${gridLng}`;

      if (clusterMap.has(key)) {
        const cluster = clusterMap.get(key)!;
        cluster.count += 1;
        cluster.properties.push(property);
        cluster.avgPrice =
          cluster.properties.reduce((sum, p) => sum + p.price, 0) /
          cluster.properties.length;
      } else {
        clusterMap.set(key, {
          id: key,
          lat: gridLat + gridSize / 2,
          lng: gridLng + gridSize / 2,
          count: 1,
          avgPrice: property.price,
          properties: [property],
        });
      }
    });

    setClusters(Array.from(clusterMap.values()));
  }, [properties, viewport.zoom]);

  useEffect(() => {
    createClusters();
  }, [createClusters]);

  const handleSearchLocation = (query: string) => {
    setIsLoading(true);
    // Mock geocoding - in real app, use Google Maps Geocoding API
    setTimeout(() => {
      // Simulate search results
      const locations = [
        { name: "Bandra, Mumbai", lat: 19.0596, lng: 72.8295 },
        { name: "Andheri, Mumbai", lat: 19.1136, lng: 72.8697 },
        { name: "Powai, Mumbai", lat: 19.1197, lng: 72.9059 },
      ];

      const found = locations.find((loc) =>
        loc.name.toLowerCase().includes(query.toLowerCase()),
      );

      if (found) {
        setViewport({
          latitude: found.lat,
          longitude: found.lng,
          zoom: 14,
        });
      }
      setIsLoading(false);
    }, 500);
  };

  const PropertyCard = ({ property }: { property: Property }) => (
    <Card className="w-80 hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-3 left-3">
          {property.instantBook && (
            <Badge className="bg-green-600 hover:bg-green-600">
              <Zap className="h-3 w-3 mr-1" />
              Instant Book
            </Badge>
          )}
        </div>
        <div className="absolute top-3 right-3 flex gap-1">
          <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
            <Heart className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
            <Share className="h-4 w-4" />
          </Button>
        </div>
        {property.lastBooked && (
          <div className="absolute bottom-3 left-3">
            <Badge variant="outline" className="bg-white/90 text-xs">
              <Clock className="h-3 w-3 mr-1" />
              Booked {property.lastBooked}
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-lg">{property.title}</h3>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-current text-yellow-500" />
                <span className="font-medium">{property.rating}</span>
                <span className="text-gray-500 text-sm">
                  ({property.reviews})
                </span>
              </div>
            </div>
            <p className="text-gray-600 text-sm flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {property.location.address}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <img
              src={property.host.avatar}
              alt={property.host.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-gray-600">{property.host.name}</span>
            {property.host.superhost && (
              <Badge variant="outline" className="text-xs">
                <Award className="h-3 w-3 mr-1" />
                Superhost
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {property.amenities.slice(0, 3).map((amenity) => {
                const icons = {
                  wifi: Wifi,
                  ac: Target,
                  kitchen: Coffee,
                  parking: Car,
                  tv: Tv,
                  pool: Target,
                };
                const Icon = icons[amenity as keyof typeof icons] || Target;
                return (
                  <div key={amenity} className="p-1 bg-gray-100 rounded">
                    <Icon className="h-3 w-3 text-gray-600" />
                  </div>
                );
              })}
              {property.amenities.length > 3 && (
                <div className="p-1 bg-gray-100 rounded">
                  <span className="text-xs text-gray-600">
                    +{property.amenities.length - 3}
                  </span>
                </div>
              )}
            </div>
            <div className="text-right">
              <div className="font-bold text-lg">
                ₹{property.price.toLocaleString()}
              </div>
              <div className="text-gray-500 text-sm">per night</div>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button className="flex-1">Book Now</Button>
            <Button variant="outline" size="sm" className="px-3">
              <MessageCircle className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="px-3">
              <Phone className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ClusterMarker = ({ cluster }: { cluster: MapCluster }) => (
    <div
      className="relative cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${(cluster.lng - viewport.longitude) / 0.01 + 50}%`,
        top: `${50 - (cluster.lat - viewport.latitude) / 0.01}%`,
      }}
      onMouseEnter={() => setHoveredCluster(cluster.id)}
      onMouseLeave={() => setHoveredCluster(null)}
      onClick={() => {
        setViewport({
          latitude: cluster.lat,
          longitude: cluster.lng,
          zoom: Math.min(viewport.zoom + 2, 18),
        });
      }}
    >
      <div
        className={cn(
          "flex items-center justify-center rounded-full border-2 border-white shadow-lg transition-all",
          cluster.count > 10
            ? "w-12 h-12 bg-red-500"
            : cluster.count > 5
              ? "w-10 h-10 bg-orange-500"
              : "w-8 h-8 bg-blue-500",
          hoveredCluster === cluster.id && "scale-110",
        )}
      >
        <span className="text-white font-bold text-sm">{cluster.count}</span>
      </div>

      {hoveredCluster === cluster.id && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-10">
          <Card className="w-64 shadow-lg">
            <CardContent className="p-3">
              <div className="text-sm">
                <div className="font-semibold">{cluster.count} properties</div>
                <div className="text-gray-600">
                  Avg: ₹{cluster.avgPrice.toLocaleString()}/night
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Click to zoom in
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );

  const PropertyMarker = ({ property }: { property: Property }) => (
    <div
      className="relative cursor-pointer transform -translate-x-1/2 -translate-y-full"
      style={{
        left: `${(property.location.lng - viewport.longitude) / 0.01 + 50}%`,
        top: `${50 - (property.location.lat - viewport.latitude) / 0.01}%`,
      }}
      onClick={() => setSelectedProperty(property)}
    >
      <div className="bg-white border-2 border-blue-500 rounded-lg px-2 py-1 shadow-lg hover:shadow-xl transition-shadow">
        <div className="text-sm font-semibold">
          ₹{property.price.toLocaleString()}
        </div>
      </div>
      <div className="absolute top-full left-1/2 transform -translate-x-1/2">
        <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-500"></div>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex flex-col">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200 p-4 space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search for a location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && handleSearchLocation(searchQuery)
              }
              className="pl-10"
            />
          </div>

          <Button
            variant="outline"
            onClick={() => setShowFilters(true)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>

          <div className="flex bg-gray-100 rounded-lg p-1">
            <Button
              variant={viewMode === "map" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("map")}
              className="flex items-center gap-1"
            >
              <MapIcon className="h-4 w-4" />
              Map
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="flex items-center gap-1"
            >
              <List className="h-4 w-4" />
              List
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {properties.length} properties found
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={getUserLocation}
              className="flex items-center gap-1"
            >
              <Navigation className="h-4 w-4" />
              Use my location
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative">
        {viewMode === "map" ? (
          <div className="h-full relative">
            {/* Mock Map Container */}
            <div
              ref={mapRef}
              className="h-full bg-gradient-to-br from-green-100 to-blue-100 relative overflow-hidden"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                  radial-gradient(circle at 80% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
                  radial-gradient(circle at 40% 60%, rgba(168, 85, 247, 0.05) 0%, transparent 50%)
                `,
              }}
            >
              {/* Map Controls */}
              <div className="absolute top-4 right-4 z-10 space-y-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    setViewport((prev) => ({
                      ...prev,
                      zoom: Math.min(prev.zoom + 1, 18),
                    }))
                  }
                  className="w-10 h-10 p-0"
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    setViewport((prev) => ({
                      ...prev,
                      zoom: Math.max(prev.zoom - 1, 8),
                    }))
                  }
                  className="w-10 h-10 p-0"
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="sm" className="w-10 h-10 p-0">
                  <Layers className="h-4 w-4" />
                </Button>
              </div>

              {/* User Location Marker */}
              {userLocation && (
                <div
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                  style={{
                    left: `${(userLocation.lng - viewport.longitude) / 0.01 + 50}%`,
                    top: `${50 - (userLocation.lat - viewport.latitude) / 0.01}%`,
                  }}
                >
                  <div className="w-4 h-4 bg-blue-600 border-2 border-white rounded-full animate-pulse"></div>
                </div>
              )}

              {/* Render Clusters or Individual Properties */}
              {viewport.zoom <= 14
                ? clusters.map((cluster) => (
                    <ClusterMarker key={cluster.id} cluster={cluster} />
                  ))
                : properties.map((property) => (
                    <PropertyMarker key={property.id} property={property} />
                  ))}

              {/* Map Info */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                <div className="text-sm">
                  <div className="font-medium">
                    Zoom: {viewport.zoom.toFixed(1)}
                  </div>
                  <div className="text-gray-600">
                    {viewport.latitude.toFixed(4)},{" "}
                    {viewport.longitude.toFixed(4)}
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Property Card */}
            {selectedProperty && (
              <div className="absolute bottom-4 right-4 z-20">
                <div className="relative">
                  <PropertyCard property={selectedProperty} />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedProperty(null)}
                    className="absolute top-2 right-2 h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* List View */
          <div className="h-full overflow-y-auto p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { MapSearch };
