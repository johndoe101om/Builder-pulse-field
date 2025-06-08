import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Star,
  Coffee,
  Utensils,
  Camera,
  Mountain,
  Music,
  Car,
  Plus,
  Heart,
  Share,
  MessageCircle,
  Award,
  Shield,
  Globe,
  DollarSign,
  CheckCircle,
  X,
  Filter,
  Search,
  Bookmark,
} from "lucide-react";

interface HostMeetup {
  id: string;
  host: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    reviewCount: number;
    verified: boolean;
    superhost: boolean;
    languages: string[];
    responseRate: number;
    joinedDate: string;
  };
  title: string;
  description: string;
  category:
    | "food"
    | "culture"
    | "adventure"
    | "nightlife"
    | "nature"
    | "shopping"
    | "photography";
  date: string;
  time: string;
  duration: string;
  location: {
    name: string;
    address: string;
    coordinates: [number, number];
  };
  maxAttendees: number;
  currentAttendees: number;
  price: {
    amount: number;
    includes: string[];
  };
  images: string[];
  difficulty: "easy" | "moderate" | "challenging";
  tags: string[];
  attendees: {
    id: string;
    name: string;
    avatar: string;
  }[];
  isBookmarked: boolean;
  isJoined: boolean;
  meetingPoint: string;
  cancellationPolicy: string;
  requirements?: string[];
}

export const LocalHostMeetups: React.FC = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [meetups] = useState<HostMeetup[]>([
    {
      id: "1",
      host: {
        id: "1",
        name: "Rajesh Kumar",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        rating: 4.9,
        reviewCount: 127,
        verified: true,
        superhost: true,
        languages: ["English", "Hindi", "Gujarati"],
        responseRate: 98,
        joinedDate: "2019-03-15",
      },
      title: "Authentic Goan Cooking Experience",
      description:
        "Join me for a hands-on cooking session where we'll prepare traditional Goan dishes using family recipes passed down through generations. We'll visit the local spice market, learn about indigenous ingredients, and cook a full meal together. Perfect for food lovers who want to dive deep into Goan culture!",
      category: "food",
      date: "2024-12-18",
      time: "10:00 AM",
      duration: "4 hours",
      location: {
        name: "Rajesh's Home Kitchen",
        address: "Fontainhas, Panaji, Goa",
        coordinates: [15.4909, 73.8278],
      },
      maxAttendees: 6,
      currentAttendees: 4,
      price: {
        amount: 1200,
        includes: ["All ingredients", "Recipe cards", "Lunch", "Market tour"],
      },
      images: [
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop",
      ],
      difficulty: "easy",
      tags: [
        "cooking",
        "traditional",
        "cultural",
        "market tour",
        "lunch included",
      ],
      attendees: [
        {
          id: "1",
          name: "Sarah",
          avatar:
            "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=50&h=50&fit=crop&crop=face",
        },
        {
          id: "2",
          name: "Marco",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
        },
      ],
      isBookmarked: true,
      isJoined: false,
      meetingPoint: "Municipal Market entrance, Panaji",
      cancellationPolicy:
        "Free cancellation up to 24 hours before the experience",
      requirements: [
        "Comfortable walking shoes",
        "Basic English communication",
      ],
    },
    {
      id: "2",
      host: {
        id: "2",
        name: "Maria D'Souza",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        rating: 4.8,
        reviewCount: 89,
        verified: true,
        superhost: false,
        languages: ["English", "Portuguese", "Konkani"],
        responseRate: 95,
        joinedDate: "2020-07-22",
      },
      title: "Hidden Beaches & Sunset Photography",
      description:
        "Discover secret beaches that locals love! We'll explore 3 hidden gems away from tourist crowds, learn photography tips for capturing the perfect sunset, and end with traditional feni tasting. I'll share stories about Goan coastal life and the best spots for swimming and relaxation.",
      category: "photography",
      date: "2024-12-19",
      time: "3:00 PM",
      duration: "5 hours",
      location: {
        name: "Cabo de Rama Beach",
        address: "Cabo de Rama, South Goa",
        coordinates: [15.0881, 73.9137],
      },
      maxAttendees: 8,
      currentAttendees: 2,
      price: {
        amount: 1800,
        includes: [
          "Transportation",
          "Photography tips",
          "Feni tasting",
          "Snacks",
        ],
      },
      images: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop",
      ],
      difficulty: "moderate",
      tags: ["photography", "beaches", "sunset", "hidden gems", "feni tasting"],
      attendees: [
        {
          id: "3",
          name: "Alex",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
        },
      ],
      isBookmarked: false,
      isJoined: true,
      meetingPoint: "Margao Railway Station",
      cancellationPolicy: "Flexible cancellation policy",
      requirements: [
        "Camera or smartphone",
        "Comfortable walking shoes",
        "Swimming attire",
      ],
    },
    {
      id: "3",
      host: {
        id: "3",
        name: "Carlos Fernandes",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        rating: 4.7,
        reviewCount: 156,
        verified: true,
        superhost: true,
        languages: ["English", "Portuguese", "Spanish"],
        responseRate: 97,
        joinedDate: "2018-11-10",
      },
      title: "Goan Nightlife & Music Scene Tour",
      description:
        "Experience authentic Goan nightlife beyond the tourist spots! We'll visit local bars with live fado music, traditional tavernas, and underground music venues. Learn about Goan music culture, try local cocktails, and dance to live bands. Perfect for music lovers and night owls!",
      category: "nightlife",
      date: "2024-12-20",
      time: "8:00 PM",
      duration: "4 hours",
      location: {
        name: "Fontainhas Heritage Quarter",
        address: "Fontainhas, Panaji, Goa",
        coordinates: [15.4955, 73.8275],
      },
      maxAttendees: 10,
      currentAttendees: 7,
      price: {
        amount: 2200,
        includes: [
          "Venue entries",
          "Welcome drink",
          "Live music",
          "Local snacks",
        ],
      },
      images: [
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
      ],
      difficulty: "easy",
      tags: ["nightlife", "music", "bars", "culture", "drinks"],
      attendees: [
        {
          id: "4",
          name: "Priya",
          avatar:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
        },
        {
          id: "5",
          name: "James",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
        },
      ],
      isBookmarked: false,
      isJoined: false,
      meetingPoint: "Fontainhas Community Center",
      cancellationPolicy: "Moderate cancellation policy",
      requirements: ["21+ age requirement", "Valid ID"],
    },
  ]);

  const categories = [
    { value: "all", label: "All", icon: Globe },
    { value: "food", label: "Food & Drink", icon: Utensils },
    { value: "culture", label: "Culture", icon: Camera },
    { value: "adventure", label: "Adventure", icon: Mountain },
    { value: "nightlife", label: "Nightlife", icon: Music },
    { value: "photography", label: "Photography", icon: Camera },
    { value: "nature", label: "Nature", icon: Mountain },
  ];

  const getCategoryIcon = (category: string) => {
    const icons = {
      food: Utensils,
      culture: Globe,
      adventure: Hiking,
      nightlife: Music,
      nature: Hiking,
      shopping: Car,
      photography: Camera,
    };
    const IconComponent = icons[category as keyof typeof icons] || Coffee;
    return <IconComponent className="w-4 h-4" />;
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      easy: "bg-green-100 text-green-800",
      moderate: "bg-yellow-100 text-yellow-800",
      challenging: "bg-red-100 text-red-800",
    };
    return colors[difficulty as keyof typeof colors];
  };

  const filteredMeetups = meetups.filter((meetup) => {
    const matchesCategory =
      selectedCategory === "all" || meetup.category === selectedCategory;
    const matchesSearch =
      meetup.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meetup.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meetup.host.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Local Host Meetups
        </h2>
        <p className="text-gray-600">
          Discover authentic experiences with local hosts
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="hosting">Host Experience</TabsTrigger>
          <TabsTrigger value="joined">Joined</TabsTrigger>
          <TabsTrigger value="bookmarked">Saved</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search experiences..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Host Experience
              </Button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Button
                  key={category.value}
                  variant={
                    selectedCategory === category.value ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category.value)}
                  className="whitespace-nowrap flex items-center space-x-2"
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{category.label}</span>
                </Button>
              );
            })}
          </div>

          {/* Meetup Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredMeetups.map((meetup) => (
              <Card
                key={meetup.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img
                    src={meetup.images[0]}
                    alt={meetup.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3 flex space-x-2">
                    <Badge className="bg-black/60 text-white">
                      {getCategoryIcon(meetup.category)}
                      <span className="ml-1 capitalize">{meetup.category}</span>
                    </Badge>
                    <Badge
                      className={`${getDifficultyColor(meetup.difficulty)} text-xs`}
                    >
                      {meetup.difficulty}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3 flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-white/80 hover:bg-white"
                    >
                      <Heart
                        className={`w-4 h-4 ${meetup.isBookmarked ? "fill-current text-red-500" : ""}`}
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-white/80 hover:bg-white"
                    >
                      <Share className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <Badge className="bg-white text-gray-900 font-semibold">
                      ₹{meetup.price.amount}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">
                        {meetup.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(meetup.date)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{meetup.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{meetup.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Host Info */}
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={meetup.host.avatar} />
                      <AvatarFallback>
                        {meetup.host.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{meetup.host.name}</span>
                        {meetup.host.verified && (
                          <Shield className="w-4 h-4 text-blue-500" />
                        )}
                        {meetup.host.superhost && (
                          <Award className="w-4 h-4 text-yellow-500" />
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span>{meetup.host.rating}</span>
                          <span>({meetup.host.reviewCount})</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Globe className="w-3 h-3" />
                          <span>{meetup.host.languages.join(", ")}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                    {meetup.description}
                  </p>

                  {/* Location */}
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {meetup.location.name}, {meetup.location.address}
                    </span>
                  </div>

                  {/* Attendees */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {meetup.currentAttendees}/{meetup.maxAttendees}{" "}
                          attending
                        </span>
                      </div>
                      <div className="flex -space-x-2">
                        {meetup.attendees.slice(0, 3).map((attendee, index) => (
                          <Avatar
                            key={index}
                            className="w-6 h-6 border-2 border-white"
                          >
                            <AvatarImage src={attendee.avatar} />
                            <AvatarFallback className="text-xs">
                              {attendee.name[0]}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {meetup.attendees.length > 3 && (
                          <div className="w-6 h-6 bg-gray-100 border-2 border-white rounded-full flex items-center justify-center">
                            <span className="text-xs text-gray-600">
                              +{meetup.attendees.length - 3}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Price includes */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Includes:</p>
                    <div className="flex flex-wrap gap-1">
                      {meetup.price.includes.map((item, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {meetup.tags.slice(0, 4).map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        #{tag}
                      </Badge>
                    ))}
                    {meetup.tags.length > 4 && (
                      <Badge variant="secondary" className="text-xs">
                        +{meetup.tags.length - 4}
                      </Badge>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    {meetup.isJoined ? (
                      <Button variant="outline" className="flex-1">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Joined
                      </Button>
                    ) : (
                      <Button className="flex-1">Join Experience</Button>
                    )}
                    <Button variant="outline">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contact Host
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="hosting" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Become a Host</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Plus className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Share Your Local Knowledge
                </h3>
                <p className="text-gray-600 mb-6">
                  Create unique experiences for travelers and earn while sharing
                  your passion
                </p>
                <Button>Start Hosting</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="joined" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Joined Experiences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {meetups
                  .filter((m) => m.isJoined)
                  .map((meetup) => (
                    <div
                      key={meetup.id}
                      className="flex items-center space-x-4 p-4 border rounded-lg"
                    >
                      <img
                        src={meetup.images[0]}
                        alt={meetup.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{meetup.title}</h4>
                        <div className="text-sm text-gray-600 flex items-center space-x-4">
                          <span>{formatDate(meetup.date)}</span>
                          <span>{meetup.time}</span>
                          <span>with {meetup.host.name}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-green-100 text-green-800 mb-2">
                          Confirmed
                        </Badge>
                        <div className="text-sm text-gray-600">
                          ₹{meetup.price.amount}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookmarked" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Saved Experiences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {meetups
                  .filter((m) => m.isBookmarked)
                  .map((meetup) => (
                    <div
                      key={meetup.id}
                      className="flex items-center space-x-4 p-4 border rounded-lg"
                    >
                      <img
                        src={meetup.images[0]}
                        alt={meetup.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{meetup.title}</h4>
                        <div className="text-sm text-gray-600">
                          {meetup.host.name} • {formatDate(meetup.date)}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm">Join</Button>
                        <Button variant="ghost" size="sm">
                          <Bookmark className="w-4 h-4 fill-current" />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
