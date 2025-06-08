import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Maximize,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Camera,
  Video,
  Map as MapIcon,
  Navigation,
  Car,
  Train,
  Bus,
  Plane,
  Coffee,
  ShoppingBag,
  Utensils,
  GraduationCap,
  Building,
  Trees,
  Waves,
  Mountain,
  Sun,
  Cloud,
  CloudRain,
  Thermometer,
  Wind,
  Eye,
  Smartphone,
  Tablet,
  Monitor,
  Download,
  Share,
  Heart,
  Star,
  MapPin,
  Clock,
  Users,
  Wifi,
  Target,
  Compass,
  Home as HomeIcon,
  Layers,
  Info,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize,
  Grid3x3,
  Scan,
  Box,
  RotateCw as Rotate3D,
  Move,
  MousePointer,
  Sparkles,
  Zap,
  Shield,
  Award,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyExperienceProps {
  propertyId: string;
  images: string[];
  videos?: string[];
  location: {
    lat: number;
    lng: number;
    address: string;
    city: string;
    neighborhood: string;
  };
}

interface VirtualTourHotspot {
  id: string;
  x: number;
  y: number;
  title: string;
  description: string;
  targetRoom?: string;
  type: "room" | "feature" | "view";
}

interface FloorPlanRoom {
  id: string;
  name: string;
  type: "bedroom" | "bathroom" | "kitchen" | "living" | "dining" | "balcony";
  area: number;
  coordinates: { x: number; y: number; width: number; height: number };
}

interface LocalAttraction {
  id: string;
  name: string;
  type:
    | "restaurant"
    | "shopping"
    | "transport"
    | "education"
    | "entertainment"
    | "healthcare";
  distance: number;
  rating: number;
  walkTime: number;
  description: string;
  icon: any;
}

const PropertyExperience = ({
  propertyId,
  images,
  videos = [],
  location,
}: PropertyExperienceProps) => {
  const [currentView, setCurrentView] = useState<
    "gallery" | "virtual" | "ar" | "floorplan" | "neighborhood"
  >("gallery");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [vrRotation, setVrRotation] = useState({ x: 0, y: 0 });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isArSupported, setIsArSupported] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mock data for demonstration
  const virtualTourHotspots: VirtualTourHotspot[] = [
    {
      id: "1",
      x: 30,
      y: 40,
      title: "Master Bedroom",
      description: "Spacious bedroom with city view",
      targetRoom: "bedroom",
      type: "room",
    },
    {
      id: "2",
      x: 70,
      y: 60,
      title: "Modern Kitchen",
      description: "Fully equipped kitchen with premium appliances",
      targetRoom: "kitchen",
      type: "room",
    },
    {
      id: "3",
      x: 50,
      y: 80,
      title: "Balcony View",
      description: "Stunning panoramic city view",
      type: "view",
    },
  ];

  const floorPlanRooms: FloorPlanRoom[] = [
    {
      id: "living",
      name: "Living Room",
      type: "living",
      area: 25,
      coordinates: { x: 10, y: 10, width: 40, height: 30 },
    },
    {
      id: "kitchen",
      name: "Kitchen",
      type: "kitchen",
      area: 12,
      coordinates: { x: 55, y: 10, width: 30, height: 20 },
    },
    {
      id: "bedroom1",
      name: "Master Bedroom",
      type: "bedroom",
      area: 18,
      coordinates: { x: 10, y: 45, width: 35, height: 25 },
    },
    {
      id: "bathroom",
      name: "Bathroom",
      type: "bathroom",
      area: 6,
      coordinates: { x: 50, y: 45, width: 15, height: 15 },
    },
    {
      id: "balcony",
      name: "Balcony",
      type: "balcony",
      area: 8,
      coordinates: { x: 70, y: 45, width: 15, height: 25 },
    },
  ];

  const localAttractions: LocalAttraction[] = [
    {
      id: "1",
      name: "Starbucks Coffee",
      type: "restaurant",
      distance: 0.2,
      rating: 4.5,
      walkTime: 3,
      description: "Popular coffee chain",
      icon: Coffee,
    },
    {
      id: "2",
      name: "Metro Station",
      type: "transport",
      distance: 0.5,
      rating: 4.2,
      walkTime: 7,
      description: "Direct connection to city center",
      icon: Train,
    },
    {
      id: "3",
      name: "Phoenix Mall",
      type: "shopping",
      distance: 1.2,
      rating: 4.6,
      walkTime: 15,
      description: "Large shopping complex",
      icon: ShoppingBag,
    },
    {
      id: "4",
      name: "Mumbai University",
      type: "education",
      distance: 2.1,
      rating: 4.8,
      walkTime: 25,
      description: "Prestigious university",
      icon: GraduationCap,
    },
  ];

  // Check AR support on component mount
  useEffect(() => {
    // Check if device supports AR
    const checkArSupport = async () => {
      if ("xr" in navigator) {
        try {
          const supported = await (navigator as any).xr.isSessionSupported(
            "immersive-ar",
          );
          setIsArSupported(supported);
        } catch (error) {
          setIsArSupported(false);
        }
      }
    };

    checkArSupport();

    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Mock weather data
    setWeatherData({
      temperature: 28,
      condition: "sunny",
      humidity: 65,
      windSpeed: 12,
      forecast: [
        { day: "Today", high: 30, low: 24, condition: "sunny" },
        { day: "Tomorrow", high: 28, low: 22, condition: "cloudy" },
        { day: "Friday", high: 26, low: 20, condition: "rainy" },
      ],
    });

    return () => clearInterval(interval);
  }, []);

  const handle360Rotation = (deltaX: number, deltaY: number) => {
    setVrRotation((prev) => ({
      x: Math.max(-90, Math.min(90, prev.x + deltaY * 0.5)),
      y: prev.y + deltaX * 0.5,
    }));
  };

  const startArExperience = async () => {
    if (!isArSupported) {
      alert("AR is not supported on this device");
      return;
    }

    try {
      // In a real implementation, this would start WebXR AR session
      alert("AR Experience would start here! This is a demo.");
    } catch (error) {
      console.error("AR Error:", error);
    }
  };

  const getRoomTypeIcon = (type: string) => {
    switch (type) {
      case "bedroom":
        return <HomeIcon className="h-4 w-4" />;
      case "kitchen":
        return <Utensils className="h-4 w-4" />;
      case "bathroom":
        return <Target className="h-4 w-4" />;
      case "living":
        return <Monitor className="h-4 w-4" />;
      case "balcony":
        return <Trees className="h-4 w-4" />;
      default:
        return <HomeIcon className="h-4 w-4" />;
    }
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="h-5 w-5 text-yellow-500" />;
      case "cloudy":
        return <Cloud className="h-5 w-5 text-gray-500" />;
      case "rainy":
        return <CloudRain className="h-5 w-5 text-blue-500" />;
      default:
        return <Sun className="h-5 w-5" />;
    }
  };

  const VirtualTourViewer = () => (
    <div className="relative h-96 bg-gray-900 rounded-lg overflow-hidden">
      {loadingProgress < 100 ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="text-center text-white">
            <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="mb-2">Loading Virtual Tour...</p>
            <Progress value={loadingProgress} className="w-48" />
          </div>
        </div>
      ) : (
        <>
          <div
            className="w-full h-full bg-cover bg-center cursor-move"
            style={{
              backgroundImage: `url(${images[currentImageIndex]})`,
              transform: `rotateX(${vrRotation.x}deg) rotateY(${vrRotation.y}deg)`,
            }}
            onMouseDown={(e) => {
              const startX = e.clientX;
              const startY = e.clientY;

              const handleMouseMove = (moveEvent: MouseEvent) => {
                const deltaX = moveEvent.clientX - startX;
                const deltaY = moveEvent.clientY - startY;
                handle360Rotation(deltaX * 0.1, deltaY * 0.1);
              };

              const handleMouseUp = () => {
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
              };

              document.addEventListener("mousemove", handleMouseMove);
              document.addEventListener("mouseup", handleMouseUp);
            }}
          >
            {/* Virtual Tour Hotspots */}
            {virtualTourHotspots.map((hotspot) => (
              <div
                key={hotspot.id}
                className="absolute cursor-pointer group"
                style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
              >
                <div className="w-6 h-6 bg-blue-500 border-2 border-white rounded-full animate-pulse flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-black bg-opacity-80 text-white p-2 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  <div className="font-semibold">{hotspot.title}</div>
                  <div className="text-xs text-gray-300">
                    {hotspot.description}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* VR Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setVrRotation({ x: 0, y: 0 })}
            >
              <Compass className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              <Maximize className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                setCurrentImageIndex((prev) => (prev + 1) % images.length)
              }
            >
              <RotateCw className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  );

  const ArViewer = () => (
    <Card className="h-96">
      <CardContent className="p-6 h-full flex flex-col items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
            <Box className="h-10 w-10 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">AR Room Preview</h3>
            <p className="text-gray-600 mb-4">
              Experience the space in augmented reality using your device camera
            </p>
          </div>

          {isArSupported ? (
            <div className="space-y-3">
              <Button onClick={startArExperience} size="lg" className="w-full">
                <Scan className="h-5 w-5 mr-2" />
                Start AR Experience
              </Button>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <Smartphone className="h-4 w-4" />
                <span>Works best on mobile devices</span>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <Button disabled size="lg" className="w-full">
                <X className="h-5 w-5 mr-2" />
                AR Not Supported
              </Button>
              <p className="text-sm text-gray-500">
                AR features require a compatible device and browser
              </p>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <Move className="h-6 w-6 mx-auto mb-1 text-purple-500" />
              <div className="text-xs text-gray-600">3D Movement</div>
            </div>
            <div className="text-center">
              <Rotate3D className="h-6 w-6 mx-auto mb-1 text-purple-500" />
              <div className="text-xs text-gray-600">360° Rotation</div>
            </div>
            <div className="text-center">
              <MousePointer className="h-6 w-6 mx-auto mb-1 text-purple-500" />
              <div className="text-xs text-gray-600">Interactive</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const FloorPlanViewer = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Grid3x3 className="h-5 w-5" />
          Interactive Floor Plan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative bg-gray-50 rounded-lg p-4 h-80">
          <svg viewBox="0 0 100 80" className="w-full h-full">
            {/* Floor plan rooms */}
            {floorPlanRooms.map((room) => (
              <g key={room.id}>
                <rect
                  x={room.coordinates.x}
                  y={room.coordinates.y}
                  width={room.coordinates.width}
                  height={room.coordinates.height}
                  fill={selectedRoom === room.id ? "#3b82f6" : "#e5e7eb"}
                  stroke="#6b7280"
                  strokeWidth="0.5"
                  className="cursor-pointer transition-colors hover:fill-blue-200"
                  onClick={() =>
                    setSelectedRoom(selectedRoom === room.id ? null : room.id)
                  }
                />
                <text
                  x={room.coordinates.x + room.coordinates.width / 2}
                  y={room.coordinates.y + room.coordinates.height / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs font-medium fill-gray-700"
                >
                  {room.name}
                </text>
                <text
                  x={room.coordinates.x + room.coordinates.width / 2}
                  y={room.coordinates.y + room.coordinates.height / 2 + 3}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs fill-gray-500"
                >
                  {room.area}m²
                </text>
              </g>
            ))}
          </svg>

          {/* Room details panel */}
          {selectedRoom && (
            <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg border w-48">
              <div className="flex items-center gap-2 mb-2">
                {getRoomTypeIcon(
                  floorPlanRooms.find((r) => r.id === selectedRoom)?.type || "",
                )}
                <h4 className="font-semibold">
                  {floorPlanRooms.find((r) => r.id === selectedRoom)?.name}
                </h4>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <div>
                  Area:{" "}
                  {floorPlanRooms.find((r) => r.id === selectedRoom)?.area}m²
                </div>
                <div className="capitalize">
                  Type:{" "}
                  {floorPlanRooms.find((r) => r.id === selectedRoom)?.type}
                </div>
              </div>
              <Button size="sm" className="w-full mt-3">
                <Camera className="h-4 w-4 mr-1" />
                View Photos
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
          {floorPlanRooms.map((room) => (
            <Button
              key={room.id}
              variant={selectedRoom === room.id ? "default" : "outline"}
              size="sm"
              onClick={() =>
                setSelectedRoom(selectedRoom === room.id ? null : room.id)
              }
              className="flex items-center gap-2"
            >
              {getRoomTypeIcon(room.type)}
              <span className="hidden md:inline">{room.name}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const NeighborhoodGuide = () => (
    <div className="space-y-6">
      {/* Weather Widget */}
      {weatherData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="h-5 w-5" />
              Local Weather
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4">
                {getWeatherIcon(weatherData.condition)}
                <div>
                  <div className="text-3xl font-bold">
                    {weatherData.temperature}°C
                  </div>
                  <div className="text-gray-600 capitalize">
                    {weatherData.condition}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Humidity:</span>
                  <span>{weatherData.humidity}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Wind:</span>
                  <span>{weatherData.windSpeed} km/h</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4">
              {weatherData.forecast.map((day: any, index: number) => (
                <div
                  key={index}
                  className="text-center p-3 bg-gray-50 rounded-lg"
                >
                  <div className="text-sm font-medium">{day.day}</div>
                  <div className="my-2">{getWeatherIcon(day.condition)}</div>
                  <div className="text-xs text-gray-600">
                    {day.high}° / {day.low}°
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Local Attractions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Nearby Attractions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {localAttractions.map((attraction) => {
              const Icon = attraction.icon;
              return (
                <div
                  key={attraction.id}
                  className="flex items-center gap-4 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{attraction.name}</h4>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-current text-yellow-500" />
                        <span className="text-sm">{attraction.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      {attraction.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>{attraction.distance} km away</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {attraction.walkTime} min walk
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Navigation className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Transportation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            Transportation Options
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Train className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="font-medium">Metro Station</div>
                  <div className="text-sm text-gray-600">7 min walk</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Bus className="h-5 w-5 text-green-600" />
                <div>
                  <div className="font-medium">Bus Stop</div>
                  <div className="text-sm text-gray-600">3 min walk</div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Car className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="font-medium">Taxi/Uber</div>
                  <div className="text-sm text-gray-600">2 min pickup</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Plane className="h-5 w-5 text-orange-600" />
                <div>
                  <div className="font-medium">Airport</div>
                  <div className="text-sm text-gray-600">45 min drive</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Experience Navigation */}
      <Card>
        <CardContent className="p-4">
          <Tabs
            value={currentView}
            onValueChange={(value: any) => setCurrentView(value)}
          >
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="gallery" className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                <span className="hidden sm:inline">Gallery</span>
              </TabsTrigger>
              <TabsTrigger value="virtual" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span className="hidden sm:inline">360° Tour</span>
              </TabsTrigger>
              <TabsTrigger value="ar" className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                <span className="hidden sm:inline">AR View</span>
              </TabsTrigger>
              <TabsTrigger
                value="floorplan"
                className="flex items-center gap-2"
              >
                <Grid3x3 className="h-4 w-4" />
                <span className="hidden sm:inline">Floor Plan</span>
              </TabsTrigger>
              <TabsTrigger
                value="neighborhood"
                className="flex items-center gap-2"
              >
                <MapIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Area</span>
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <TabsContent value="gallery">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="relative">
                          <img
                            src={images[currentImageIndex]}
                            alt="Property"
                            className="w-full h-80 object-cover rounded-lg"
                          />
                          <div className="absolute top-4 right-4 flex gap-2">
                            <Button variant="secondary" size="sm">
                              <Heart className="h-4 w-4" />
                            </Button>
                            <Button variant="secondary" size="sm">
                              <Share className="h-4 w-4" />
                            </Button>
                            <Button variant="secondary" size="sm">
                              <Maximize className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                            {currentImageIndex + 1} / {images.length}
                          </div>
                        </div>
                        <div className="flex justify-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setCurrentImageIndex(
                                Math.max(0, currentImageIndex - 1),
                              )
                            }
                            disabled={currentImageIndex === 0}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setCurrentImageIndex(
                                Math.min(
                                  images.length - 1,
                                  currentImageIndex + 1,
                                ),
                              )
                            }
                            disabled={currentImageIndex === images.length - 1}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Video Tour */}
                      {videos.length > 0 && (
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Video className="h-5 w-5" />
                            Video Tour
                          </h3>
                          <div className="relative">
                            <video
                              ref={videoRef}
                              className="w-full h-80 object-cover rounded-lg"
                              poster={images[0]}
                              controls
                            >
                              <source src={videos[0]} type="video/mp4" />
                              Your browser does not support video playback.
                            </video>
                          </div>
                          <div className="flex justify-center gap-2">
                            <Button
                              variant="outline"
                              onClick={() => {
                                if (videoRef.current) {
                                  if (isVideoPlaying) {
                                    videoRef.current.pause();
                                  } else {
                                    videoRef.current.play();
                                  }
                                  setIsVideoPlaying(!isVideoPlaying);
                                }
                              }}
                            >
                              {isVideoPlaying ? (
                                <Pause className="h-4 w-4" />
                              ) : (
                                <Play className="h-4 w-4" />
                              )}
                            </Button>
                            <Button variant="outline">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="virtual">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      360° Virtual Tour
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <VirtualTourViewer />
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium text-blue-900">
                            How to navigate:
                          </p>
                          <ul className="mt-1 text-blue-800 space-y-1">
                            <li>• Click and drag to look around</li>
                            <li>• Click hotspots to explore different areas</li>
                            <li>
                              • Use controls to reset view or go fullscreen
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ar">
                <ArViewer />
              </TabsContent>

              <TabsContent value="floorplan">
                <FloorPlanViewer />
              </TabsContent>

              <TabsContent value="neighborhood">
                <NeighborhoodGuide />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertyExperience;
