import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Search,
  Mic,
  Camera,
  MapPin,
  Calendar,
  Users,
  Filter,
  Star,
  Wifi,
  Car,
  Utensils,
  Tv,
  AirVent,
  WashingMachine,
  Coffee,
  Gamepad2,
  Dumbbell,
  Waves,
  TreePine,
  Building,
  Home as HomeIcon,
  Heart,
  DollarSign,
  Clock,
  TrendingUp,
  Sparkles,
  Brain,
  Eye,
  Volume2,
  VolumeX,
  Upload,
  X,
  Check,
  Zap,
  Shield,
  Baby,
  Dog,
  Briefcase,
  Moon,
  Sun,
  Snowflake,
  Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchFilters {
  location: string;
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
  priceRange: [number, number];
  propertyTypes: string[];
  amenities: string[];
  instantBook: boolean;
  superhost: boolean;
  petFriendly: boolean;
  workFriendly: boolean;
  accessible: boolean;
  smoking: boolean;
  familyFriendly: boolean;
  rating: number;
  cancellationPolicy: string;
}

interface SearchSuggestion {
  id: string;
  text: string;
  type: "location" | "property" | "experience";
  popularity: number;
  icon: any;
  subtitle?: string;
}

const AdvancedSearch = () => {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [isVisualSearchOpen, setIsVisualSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [savedSearches, setSavedSearches] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [filters, setFilters] = useState<SearchFilters>({
    location: "",
    checkIn: null,
    checkOut: null,
    guests: 1,
    priceRange: [1000, 20000],
    propertyTypes: [],
    amenities: [],
    instantBook: false,
    superhost: false,
    petFriendly: false,
    workFriendly: false,
    accessible: false,
    smoking: false,
    familyFriendly: false,
    rating: 0,
    cancellationPolicy: "any",
  });

  // AI-powered search suggestions
  const aiSuggestions: SearchSuggestion[] = [
    {
      id: "1",
      text: "Beachfront villas in Goa",
      type: "experience",
      popularity: 95,
      icon: Waves,
      subtitle: "Trending this week • 250+ properties",
    },
    {
      id: "2",
      text: "Mountain retreats near Manali",
      type: "experience",
      popularity: 87,
      icon: TreePine,
      subtitle: "Perfect for winter • 180+ cabins",
    },
    {
      id: "3",
      text: "Heritage hotels in Rajasthan",
      type: "property",
      popularity: 92,
      icon: Building,
      subtitle: "Royal experience • 120+ palaces",
    },
    {
      id: "4",
      text: "Work-friendly spaces in Bangalore",
      type: "experience",
      popularity: 89,
      icon: Briefcase,
      subtitle: "Digital nomad ready • 300+ listings",
    },
    {
      id: "5",
      text: "Mumbai",
      type: "location",
      popularity: 98,
      icon: MapPin,
      subtitle: "Financial capital • 1200+ stays",
    },
  ];

  const propertyTypes = [
    { id: "apartment", label: "Apartment", icon: Building },
    { id: "house", label: "House", icon: HomeIcon },
    { id: "villa", label: "Villa", icon: HomeIcon },
    { id: "hotel", label: "Hotel", icon: Building },
    { id: "resort", label: "Resort", icon: Waves },
    { id: "cabin", label: "Cabin", icon: TreePine },
    { id: "cottage", label: "Cottage", icon: HomeIcon },
    { id: "loft", label: "Loft", icon: Building },
  ];

  const amenities = [
    { id: "wifi", label: "WiFi", icon: Wifi },
    { id: "parking", label: "Parking", icon: Car },
    { id: "kitchen", label: "Kitchen", icon: Utensils },
    { id: "tv", label: "TV", icon: Tv },
    { id: "ac", label: "Air Conditioning", icon: AirVent },
    { id: "washer", label: "Washer", icon: WashingMachine },
    { id: "coffee", label: "Coffee Maker", icon: Coffee },
    { id: "games", label: "Games", icon: Gamepad2 },
    { id: "gym", label: "Gym", icon: Dumbbell },
    { id: "pool", label: "Pool", icon: Waves },
  ];

  // Voice search functionality
  const startVoiceSearch = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsRecording(true);
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        handleSearch(transcript);
      };

      recognition.onerror = () => {
        setIsRecording(false);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert("Voice search is not supported in this browser");
    }
  };

  // Visual search functionality
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setUploadedImage(imageUrl);
        // In a real app, you'd send this to an AI service for analysis
        simulateImageAnalysis(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateImageAnalysis = (imageUrl: string) => {
    // Simulate AI analysis delay
    setTimeout(() => {
      // Mock results based on uploaded image
      const mockResults = [
        "Modern apartment with city view",
        "Minimalist design aesthetic",
        "High-rise building location",
        "Contemporary furnishing style",
      ];

      setSearchQuery(mockResults[0]);
      setIsVisualSearchOpen(false);
      handleSearch(mockResults[0]);
    }, 2000);
  };

  const handleSearch = (query?: string) => {
    const searchTerm = query || searchQuery;
    if (searchTerm.trim()) {
      // Add to recent searches
      const updatedRecent = [
        searchTerm,
        ...recentSearches.filter((s) => s !== searchTerm),
      ].slice(0, 5);
      setRecentSearches(updatedRecent);
      localStorage.setItem("recentSearches", JSON.stringify(updatedRecent));

      // Navigate to search results
      const params = new URLSearchParams({
        q: searchTerm,
        location: filters.location,
        guests: filters.guests.toString(),
        minPrice: filters.priceRange[0].toString(),
        maxPrice: filters.priceRange[1].toString(),
        propertyTypes: filters.propertyTypes.join(","),
        amenities: filters.amenities.join(","),
        instantBook: filters.instantBook.toString(),
        superhost: filters.superhost.toString(),
        petFriendly: filters.petFriendly.toString(),
        workFriendly: filters.workFriendly.toString(),
        accessible: filters.accessible.toString(),
        rating: filters.rating.toString(),
      });

      navigate(`/search?${params.toString()}`);
    }
  };

  const saveSearch = () => {
    if (searchQuery.trim()) {
      const updated = [...savedSearches, searchQuery].slice(0, 10);
      setSavedSearches(updated);
      localStorage.setItem("savedSearches", JSON.stringify(updated));
    }
  };

  // Load saved data on mount
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    const savedSearchesData = localStorage.getItem("savedSearches");

    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
    if (savedSearchesData) {
      setSavedSearches(JSON.parse(savedSearchesData));
    }
  }, []);

  // Filter suggestions based on search query
  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = aiSuggestions.filter((suggestion) =>
        suggestion.text.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setSuggestions(filtered);
    } else {
      setSuggestions(aiSuggestions.slice(0, 3));
    }
  }, [searchQuery]);

  const clearFilter = (filterType: string, value?: string) => {
    switch (filterType) {
      case "propertyTypes":
        setFilters((prev) => ({
          ...prev,
          propertyTypes: prev.propertyTypes.filter((type) => type !== value),
        }));
        break;
      case "amenities":
        setFilters((prev) => ({
          ...prev,
          amenities: prev.amenities.filter((amenity) => amenity !== value),
        }));
        break;
      default:
        setFilters((prev) => ({
          ...prev,
          [filterType]:
            filterType === "priceRange"
              ? [1000, 20000]
              : filterType === "guests"
                ? 1
                : filterType === "rating"
                  ? 0
                  : false,
        }));
    }
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.propertyTypes.length > 0) count++;
    if (filters.amenities.length > 0) count++;
    if (filters.instantBook) count++;
    if (filters.superhost) count++;
    if (filters.petFriendly) count++;
    if (filters.workFriendly) count++;
    if (filters.accessible) count++;
    if (filters.familyFriendly) count++;
    if (filters.rating > 0) count++;
    if (filters.priceRange[0] !== 1000 || filters.priceRange[1] !== 20000)
      count++;
    return count;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main Search Bar */}
      <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search destinations, properties, or experiences..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 h-12 text-lg border-0 focus:ring-2 focus:ring-primary"
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />

              {/* AI Suggestions Dropdown */}
              {suggestions.length > 0 && searchQuery.length > 0 && (
                <Card className="absolute top-full left-0 right-0 mt-2 z-50 border shadow-lg">
                  <CardContent className="p-2">
                    {suggestions.map((suggestion) => {
                      const Icon = suggestion.icon;
                      return (
                        <button
                          key={suggestion.id}
                          onClick={() => {
                            setSearchQuery(suggestion.text);
                            handleSearch(suggestion.text);
                          }}
                          className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg text-left"
                        >
                          <Icon className="h-5 w-5 text-gray-400" />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">
                              {suggestion.text}
                            </p>
                            <p className="text-sm text-gray-500">
                              {suggestion.subtitle}
                            </p>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {suggestion.popularity}%
                          </Badge>
                        </button>
                      );
                    })}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Voice Search */}
            <Button
              onClick={startVoiceSearch}
              variant={isRecording ? "default" : "outline"}
              size="lg"
              className={cn(
                "h-12 w-12 p-0",
                isRecording && "bg-red-500 hover:bg-red-600 animate-pulse",
              )}
              disabled={isListening}
            >
              {isRecording ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
            </Button>

            {/* Visual Search */}
            <Dialog
              open={isVisualSearchOpen}
              onOpenChange={setIsVisualSearchOpen}
            >
              <DialogTrigger asChild>
                <Button variant="outline" size="lg" className="h-12 w-12 p-0">
                  <Camera className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Visual Search
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Upload a photo to find similar properties and experiences
                  </p>

                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                  >
                    {uploadedImage ? (
                      <div className="space-y-2">
                        <img
                          src={uploadedImage}
                          alt="Uploaded"
                          className="max-h-32 mx-auto rounded"
                        />
                        <p className="text-sm text-gray-600">
                          Analyzing image...
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="h-8 w-8 mx-auto text-gray-400" />
                        <p className="text-sm text-gray-600">
                          Click to upload image
                        </p>
                      </div>
                    )}
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </DialogContent>
            </Dialog>

            {/* Advanced Filters */}
            <Dialog open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="lg" className="h-12 relative">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                  {getActiveFilterCount() > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
                      {getActiveFilterCount()}
                    </Badge>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Advanced Filters
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Price Range */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">
                      Price Range (per night)
                    </Label>
                    <div className="px-3">
                      <Slider
                        value={filters.priceRange}
                        onValueChange={(value) =>
                          setFilters((prev) => ({
                            ...prev,
                            priceRange: value as [number, number],
                          }))
                        }
                        max={50000}
                        min={500}
                        step={500}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>₹{filters.priceRange[0].toLocaleString()}</span>
                        <span>₹{filters.priceRange[1].toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Property Types */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">
                      Property Types
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      {propertyTypes.map((type) => {
                        const Icon = type.icon;
                        const isSelected = filters.propertyTypes.includes(
                          type.id,
                        );
                        return (
                          <button
                            key={type.id}
                            onClick={() => {
                              if (isSelected) {
                                setFilters((prev) => ({
                                  ...prev,
                                  propertyTypes: prev.propertyTypes.filter(
                                    (t) => t !== type.id,
                                  ),
                                }));
                              } else {
                                setFilters((prev) => ({
                                  ...prev,
                                  propertyTypes: [
                                    ...prev.propertyTypes,
                                    type.id,
                                  ],
                                }));
                              }
                            }}
                            className={cn(
                              "flex items-center space-x-2 p-3 rounded-lg border transition-all",
                              isSelected
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-gray-200 hover:border-gray-300",
                            )}
                          >
                            <Icon className="h-4 w-4" />
                            <span className="text-sm">{type.label}</span>
                            {isSelected && (
                              <Check className="h-4 w-4 ml-auto" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Amenities</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {amenities.map((amenity) => {
                        const Icon = amenity.icon;
                        const isSelected = filters.amenities.includes(
                          amenity.id,
                        );
                        return (
                          <button
                            key={amenity.id}
                            onClick={() => {
                              if (isSelected) {
                                setFilters((prev) => ({
                                  ...prev,
                                  amenities: prev.amenities.filter(
                                    (a) => a !== amenity.id,
                                  ),
                                }));
                              } else {
                                setFilters((prev) => ({
                                  ...prev,
                                  amenities: [...prev.amenities, amenity.id],
                                }));
                              }
                            }}
                            className={cn(
                              "flex items-center space-x-2 p-3 rounded-lg border transition-all",
                              isSelected
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-gray-200 hover:border-gray-300",
                            )}
                          >
                            <Icon className="h-4 w-4" />
                            <span className="text-sm">{amenity.label}</span>
                            {isSelected && (
                              <Check className="h-4 w-4 ml-auto" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Smart Filters */}
                  <div className="space-y-4">
                    <Label className="text-base font-semibold">
                      Smart Filters
                    </Label>

                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-blue-500" />
                            <Label>Instant Book</Label>
                          </div>
                          <p className="text-xs text-gray-600">
                            Book immediately without waiting for approval
                          </p>
                        </div>
                        <Switch
                          checked={filters.instantBook}
                          onCheckedChange={(checked) =>
                            setFilters((prev) => ({
                              ...prev,
                              instantBook: checked,
                            }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <Label>Superhost</Label>
                          </div>
                          <p className="text-xs text-gray-600">
                            Stay with experienced, highly rated hosts
                          </p>
                        </div>
                        <Switch
                          checked={filters.superhost}
                          onCheckedChange={(checked) =>
                            setFilters((prev) => ({
                              ...prev,
                              superhost: checked,
                            }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Dog className="h-4 w-4 text-green-500" />
                            <Label>Pet-Friendly</Label>
                          </div>
                          <p className="text-xs text-gray-600">
                            Bring your furry friends along
                          </p>
                        </div>
                        <Switch
                          checked={filters.petFriendly}
                          onCheckedChange={(checked) =>
                            setFilters((prev) => ({
                              ...prev,
                              petFriendly: checked,
                            }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-purple-500" />
                            <Label>Work-Friendly</Label>
                          </div>
                          <p className="text-xs text-gray-600">
                            Perfect for remote work and business trips
                          </p>
                        </div>
                        <Switch
                          checked={filters.workFriendly}
                          onCheckedChange={(checked) =>
                            setFilters((prev) => ({
                              ...prev,
                              workFriendly: checked,
                            }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-red-500" />
                            <Label>Accessible</Label>
                          </div>
                          <p className="text-xs text-gray-600">
                            Properties with accessibility features
                          </p>
                        </div>
                        <Switch
                          checked={filters.accessible}
                          onCheckedChange={(checked) =>
                            setFilters((prev) => ({
                              ...prev,
                              accessible: checked,
                            }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Baby className="h-4 w-4 text-pink-500" />
                            <Label>Family-Friendly</Label>
                          </div>
                          <p className="text-xs text-gray-600">
                            Great for families with children
                          </p>
                        </div>
                        <Switch
                          checked={filters.familyFriendly}
                          onCheckedChange={(checked) =>
                            setFilters((prev) => ({
                              ...prev,
                              familyFriendly: checked,
                            }))
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Minimum Rating */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">
                      Minimum Rating
                    </Label>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() =>
                            setFilters((prev) => ({ ...prev, rating }))
                          }
                          className={cn(
                            "p-2 rounded-lg border transition-all",
                            filters.rating >= rating
                              ? "border-yellow-400 bg-yellow-50 text-yellow-600"
                              : "border-gray-200 hover:border-gray-300",
                          )}
                        >
                          <Star
                            className={cn(
                              "h-4 w-4",
                              filters.rating >= rating ? "fill-current" : "",
                            )}
                          />
                        </button>
                      ))}
                      <span className="text-sm text-gray-600 ml-2">
                        {filters.rating > 0
                          ? `${filters.rating}+ stars`
                          : "Any rating"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setFilters({
                        location: "",
                        checkIn: null,
                        checkOut: null,
                        guests: 1,
                        priceRange: [1000, 20000],
                        propertyTypes: [],
                        amenities: [],
                        instantBook: false,
                        superhost: false,
                        petFriendly: false,
                        workFriendly: false,
                        accessible: false,
                        smoking: false,
                        familyFriendly: false,
                        rating: 0,
                        cancellationPolicy: "any",
                      });
                    }}
                  >
                    Clear All
                  </Button>
                  <Button onClick={() => setIsAdvancedOpen(false)}>
                    Apply Filters
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Search Button */}
            <Button
              onClick={() => handleSearch()}
              size="lg"
              className="h-12 px-8 bg-primary hover:bg-primary/90"
            >
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          </div>

          {/* Active Filters Display */}
          {getActiveFilterCount() > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {filters.propertyTypes.map((type) => (
                <Badge
                  key={type}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {propertyTypes.find((p) => p.id === type)?.label}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => clearFilter("propertyTypes", type)}
                  />
                </Badge>
              ))}
              {filters.amenities.map((amenity) => (
                <Badge
                  key={amenity}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {amenities.find((a) => a.id === amenity)?.label}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => clearFilter("amenities", amenity)}
                  />
                </Badge>
              ))}
              {filters.instantBook && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Instant Book
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => clearFilter("instantBook")}
                  />
                </Badge>
              )}
              {filters.superhost && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Superhost
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => clearFilter("superhost")}
                  />
                </Badge>
              )}
              {filters.petFriendly && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Pet-Friendly
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => clearFilter("petFriendly")}
                  />
                </Badge>
              )}
              {filters.workFriendly && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Work-Friendly
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => clearFilter("workFriendly")}
                  />
                </Badge>
              )}
            </div>
          )}

          {/* Recent & Saved Searches */}
          {(recentSearches.length > 0 || savedSearches.length > 0) &&
            searchQuery.length === 0 && (
              <div className="mt-4 space-y-3">
                {recentSearches.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Recent searches
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.slice(0, 5).map((search, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSearchQuery(search);
                            handleSearch(search);
                          }}
                          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {savedSearches.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      Saved searches
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {savedSearches.slice(0, 5).map((search, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSearchQuery(search);
                            handleSearch(search);
                          }}
                          className="px-3 py-1 bg-blue-100 hover:bg-blue-200 rounded-full text-sm transition-colors"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
        </CardContent>
      </Card>

      {/* Quick Action Buttons */}
      <div className="mt-4 flex justify-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={saveSearch}
          disabled={!searchQuery.trim()}
          className="text-white/80 hover:text-white hover:bg-white/10"
        >
          <Heart className="h-4 w-4 mr-1" />
          Save Search
        </Button>
      </div>
    </div>
  );
};

export default AdvancedSearch;
