import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  MapPin,
  Calendar,
  Users,
  Star,
  Filter,
  MessageCircle,
  Heart,
  Shield,
  Globe,
  Camera,
  Mountain,
  Music,
  Coffee,
  Utensils,
  TreePalm,
  Gamepad,
  Book,
  Plane,
  Car,
  Clock,
} from "lucide-react";

interface TravelBuddy {
  id: string;
  name: string;
  avatar: string;
  age: number;
  location: string;
  destination: string;
  travelDates: {
    start: string;
    end: string;
  };
  interests: string[];
  languages: string[];
  rating: number;
  reviewCount: number;
  verified: boolean;
  bio: string;
  travelStyle: "budget" | "mid-range" | "luxury";
  groupSize: number;
  lookingFor: string[];
  photos: string[];
  compatibility: number;
  distance: string;
  isOnline: boolean;
  lastSeen?: string;
}

export const TravelBuddyFinder: React.FC = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedDates, setSelectedDates] = useState("");
  const [activeTab, setActiveTab] = useState("discover");

  const [travelBuddies] = useState<TravelBuddy[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face",
      age: 28,
      location: "San Francisco, USA",
      destination: "Goa, India",
      travelDates: {
        start: "2024-12-15",
        end: "2024-12-22",
      },
      interests: ["photography", "hiking", "food", "culture", "beaches"],
      languages: ["English", "Spanish"],
      rating: 4.9,
      reviewCount: 23,
      verified: true,
      bio: "Adventure enthusiast and food lover! Looking for someone to explore Goa's beautiful beaches and local cuisine with. I love trying new activities and meeting locals.",
      travelStyle: "mid-range",
      groupSize: 2,
      lookingFor: [
        "sightseeing",
        "food tours",
        "beach activities",
        "nightlife",
      ],
      photos: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&h=200&fit=crop",
      ],
      compatibility: 95,
      distance: "2.3 km away",
      isOnline: true,
    },
    {
      id: "2",
      name: "Marco Silva",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      age: 32,
      location: "London, UK",
      destination: "Goa, India",
      travelDates: {
        start: "2024-12-16",
        end: "2024-12-25",
      },
      interests: ["music", "nightlife", "culture", "adventure", "water sports"],
      languages: ["English", "Portuguese", "Spanish"],
      rating: 4.8,
      reviewCount: 31,
      verified: true,
      bio: "Digital nomad and music lover exploring India! I enjoy meeting locals, trying authentic food, and experiencing the vibrant nightlife. Always up for an adventure!",
      travelStyle: "mid-range",
      groupSize: 1,
      lookingFor: [
        "nightlife",
        "water sports",
        "local experiences",
        "adventure activities",
      ],
      photos: [
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=200&h=200&fit=crop",
      ],
      compatibility: 87,
      distance: "1.8 km away",
      isOnline: false,
      lastSeen: "2 hours ago",
    },
    {
      id: "3",
      name: "Priya Patel",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      age: 26,
      location: "Mumbai, India",
      destination: "Goa, India",
      travelDates: {
        start: "2024-12-14",
        end: "2024-12-21",
      },
      interests: ["yoga", "meditation", "culture", "food", "wellness"],
      languages: ["Hindi", "English", "Gujarati"],
      rating: 4.7,
      reviewCount: 18,
      verified: true,
      bio: "Local guide and wellness enthusiast! Born and raised in India, I love sharing hidden gems and authentic experiences. Perfect for cultural immersion and spiritual journeys.",
      travelStyle: "budget",
      groupSize: 3,
      lookingFor: [
        "cultural experiences",
        "wellness",
        "local insights",
        "budget travel",
      ],
      photos: [
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=200&h=200&fit=crop",
      ],
      compatibility: 82,
      distance: "0.5 km away",
      isOnline: true,
    },
  ]);

  const getInterestIcon = (interest: string) => {
    const icons = {
      photography: Camera,
      hiking: Mountain,
      music: Music,
      food: Utensils,
      culture: Globe,
      beaches: TreePalm,
      nightlife: Music,
      adventure: Mountain,
      "water sports": TreePalm,
      yoga: Users,
      meditation: Users,
      wellness: Heart,
      gaming: Gamepad,
      reading: Book,
    };
    const IconComponent = icons[interest as keyof typeof icons] || Coffee;
    return <IconComponent className="w-4 h-4" />;
  };

  const getTravelStyleBadge = (style: string) => {
    const styles = {
      budget: { label: "Budget", color: "bg-green-100 text-green-800" },
      "mid-range": { label: "Mid-range", color: "bg-blue-100 text-blue-800" },
      luxury: { label: "Luxury", color: "bg-purple-100 text-purple-800" },
    };
    const styleInfo = styles[style as keyof typeof styles];
    return (
      <Badge className={`${styleInfo.color} text-xs`}>{styleInfo.label}</Badge>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Find Travel Buddies
        </h2>
        <p className="text-gray-600">
          Connect with like-minded travelers and explore together
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="my-requests">My Requests</TabsTrigger>
          <TabsTrigger value="matches">Matches</TabsTrigger>
        </TabsList>

        <TabsContent value="discover" className="space-y-6">
          {/* Search Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Find Your Perfect Travel Buddy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Where are you going?"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="date"
                    placeholder="Travel dates"
                    value={selectedDates}
                    onChange={(e) => setSelectedDates(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                </Button>
                <Button className="flex items-center space-x-2">
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Travel Buddy Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {travelBuddies.map((buddy) => (
              <Card
                key={buddy.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  {/* Photo Gallery */}
                  <div className="h-48 bg-gray-200 relative overflow-hidden">
                    <img
                      src={buddy.photos[0]}
                      alt={buddy.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-green-500 text-white text-xs">
                        {buddy.compatibility}% match
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="bg-white/80 hover:bg-white"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="absolute bottom-3 right-3 flex space-x-1">
                      {buddy.photos.slice(1, 3).map((photo, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded border-2 border-white overflow-hidden"
                        >
                          <img
                            src={photo}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      {buddy.photos.length > 3 && (
                        <div className="w-8 h-8 rounded border-2 border-white bg-black/60 flex items-center justify-center">
                          <span className="text-white text-xs">
                            +{buddy.photos.length - 3}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Profile Info */}
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={buddy.avatar} />
                            <AvatarFallback>
                              {buddy.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {buddy.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                          )}
                          {buddy.verified && (
                            <Shield className="absolute -top-1 -right-1 w-4 h-4 text-blue-500 bg-white rounded-full" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {buddy.name}, {buddy.age}
                          </h3>
                          <div className="flex items-center space-x-1 text-sm text-gray-600">
                            <MapPin className="w-3 h-3" />
                            <span>{buddy.distance}</span>
                            {!buddy.isOnline && buddy.lastSeen && (
                              <>
                                <span>•</span>
                                <Clock className="w-3 h-3" />
                                <span>{buddy.lastSeen}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-medium">{buddy.rating}</span>
                          <span className="text-sm text-gray-500">
                            ({buddy.reviewCount})
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Travel Details */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Plane className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium">
                            {buddy.destination}
                          </span>
                        </div>
                        {getTravelStyleBadge(buddy.travelStyle)}
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>
                            {new Date(
                              buddy.travelDates.start,
                            ).toLocaleDateString()}{" "}
                            -{" "}
                            {new Date(
                              buddy.travelDates.end,
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>Group of {buddy.groupSize}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                      {buddy.bio}
                    </p>

                    {/* Interests */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {buddy.interests.slice(0, 4).map((interest, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs flex items-center space-x-1"
                          >
                            {getInterestIcon(interest)}
                            <span className="capitalize">{interest}</span>
                          </Badge>
                        ))}
                        {buddy.interests.length > 4 && (
                          <Badge variant="secondary" className="text-xs">
                            +{buddy.interests.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Languages */}
                    <div className="mb-4">
                      <div className="flex items-center space-x-2">
                        <Globe className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          Speaks: {buddy.languages.join(", ")}
                        </span>
                      </div>
                    </div>

                    {/* Looking For */}
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-2">Looking for:</p>
                      <div className="flex flex-wrap gap-1">
                        {buddy.lookingFor.map((activity, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {activity}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <Button className="flex-1 flex items-center space-x-2">
                        <MessageCircle className="w-4 h-4" />
                        <span>Connect</span>
                      </Button>
                      <Button variant="outline" className="flex-1">
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-requests" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Travel Buddy Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Active Requests
                </h3>
                <p className="text-gray-600 mb-6">
                  Create a travel buddy request to find companions for your next
                  trip
                </p>
                <Button>Create Request</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="matches" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Matches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Matches Yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Start connecting with travel buddies to see your matches here
                </p>
                <Button>Discover Buddies</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
