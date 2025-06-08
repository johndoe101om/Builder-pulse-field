import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  MapPin,
  Users,
  Star,
  Clock,
  Globe,
  Ticket,
  Trophy,
  Music,
  Camera,
  Utensils,
  Heart,
  Share,
  MessageCircle,
  Bell,
  Plus,
  Filter,
  Search,
  TrendingUp,
  Award,
  CheckCircle,
  Eye,
  ThumbsUp,
  Gift,
  Sparkles,
  Zap,
} from "lucide-react";

interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  type: "meetup" | "contest" | "workshop" | "social" | "celebration" | "launch";
  category:
    | "general"
    | "photography"
    | "food"
    | "culture"
    | "travel"
    | "social";
  organizer: {
    id: string;
    name: string;
    avatar: string;
    role: "admin" | "community_manager" | "host" | "user";
    verified: boolean;
  };
  date: string;
  time: string;
  duration?: string;
  location: {
    type: "online" | "physical" | "hybrid";
    address?: string;
    platform?: string;
  };
  attendees: {
    confirmed: number;
    interested: number;
    limit?: number;
  };
  image: string;
  status: "upcoming" | "live" | "ended";
  featured: boolean;
  tags: string[];
  prizes?: {
    first: string;
    second?: string;
    third?: string;
  };
  requirements?: string[];
  isAttending: boolean;
  isInterested: boolean;
  rsvpRequired: boolean;
  price?: number;
}

export const CommunityEvents: React.FC = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [events] = useState<CommunityEvent[]>([
    {
      id: "1",
      title: "StayConnect Travel Photography Contest 2024",
      description:
        "Submit your best travel photos from your stays! Win amazing prizes including free stays, photography equipment, and feature spots on our platform. Show us the world through your lens and inspire fellow travelers.",
      type: "contest",
      category: "photography",
      organizer: {
        id: "1",
        name: "StayConnect Team",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        role: "admin",
        verified: true,
      },
      date: "2024-12-15",
      time: "12:00 PM",
      duration: "30 days",
      location: {
        type: "online",
        platform: "StayConnect Platform",
      },
      attendees: {
        confirmed: 1247,
        interested: 3421,
        limit: 5000,
      },
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
      status: "upcoming",
      featured: true,
      tags: ["photography", "contest", "prizes", "travel", "global"],
      prizes: {
        first: "₹50,000 + 5 Free Nights",
        second: "₹25,000 + 3 Free Nights",
        third: "₹10,000 + 1 Free Night",
      },
      requirements: [
        "Must be StayConnect user",
        "Original photos only",
        "Taken during StayConnect stay",
      ],
      isAttending: true,
      isInterested: false,
      rsvpRequired: true,
    },
    {
      id: "2",
      title: "Virtual Cooking Class: Authentic Indian Cuisine",
      description:
        "Join celebrity chef Priya Sharma for an interactive cooking session! Learn to make 3 authentic Indian dishes that you can recreate anywhere in the world. Perfect for digital nomads and food lovers.",
      type: "workshop",
      category: "food",
      organizer: {
        id: "2",
        name: "Chef Priya Sharma",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        role: "host",
        verified: true,
      },
      date: "2024-12-18",
      time: "6:00 PM",
      duration: "2 hours",
      location: {
        type: "online",
        platform: "Zoom",
      },
      attendees: {
        confirmed: 89,
        interested: 156,
        limit: 100,
      },
      image:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
      status: "upcoming",
      featured: false,
      tags: ["cooking", "indian cuisine", "virtual", "interactive", "chef"],
      requirements: [
        "Basic cooking ingredients",
        "Kitchen access",
        "Stable internet",
      ],
      isAttending: false,
      isInterested: true,
      rsvpRequired: true,
      price: 599,
    },
    {
      id: "3",
      title: "Mumbai Travelers Meetup - Coffee & Stories",
      description:
        'Monthly meetup for Mumbai-based travelers! Share your travel stories, get tips for upcoming trips, and connect with like-minded explorers. This month we\'re discussing "Solo Travel Safety Tips".',
      type: "meetup",
      category: "social",
      organizer: {
        id: "3",
        name: "Mumbai Travel Community",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        role: "community_manager",
        verified: true,
      },
      date: "2024-12-20",
      time: "4:00 PM",
      duration: "3 hours",
      location: {
        type: "physical",
        address: "Blue Tokai Coffee, Bandra West, Mumbai",
      },
      attendees: {
        confirmed: 23,
        interested: 45,
        limit: 30,
      },
      image:
        "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&h=400&fit=crop",
      status: "upcoming",
      featured: false,
      tags: ["meetup", "mumbai", "coffee", "networking", "stories"],
      isAttending: false,
      isInterested: false,
      rsvpRequired: true,
    },
    {
      id: "4",
      title: "New Year Global Virtual Party 2025",
      description:
        "Celebrate New Year with the StayConnect community worldwide! Join travelers from different time zones as we countdown together. Live music, games, prizes, and special announcements!",
      type: "celebration",
      category: "social",
      organizer: {
        id: "1",
        name: "StayConnect Team",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        role: "admin",
        verified: true,
      },
      date: "2024-12-31",
      time: "11:00 PM",
      duration: "2 hours",
      location: {
        type: "online",
        platform: "StayConnect Live",
      },
      attendees: {
        confirmed: 2847,
        interested: 5623,
      },
      image:
        "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=600&h=400&fit=crop",
      status: "upcoming",
      featured: true,
      tags: ["celebration", "new year", "global", "party", "prizes"],
      prizes: {
        first: "Free Stay Package",
        second: "StayConnect Merchandise",
        third: "Platform Credits",
      },
      isAttending: true,
      isInterested: false,
      rsvpRequired: false,
    },
    {
      id: "5",
      title: "Travel Budget Masterclass",
      description:
        "Learn from expert travel bloggers how to travel more while spending less. Get insider tips on finding deals, budget planning, and maximizing your travel experiences.",
      type: "workshop",
      category: "travel",
      organizer: {
        id: "4",
        name: "Travel Experts Collective",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100&h=100&fit=crop&crop=face",
        role: "host",
        verified: true,
      },
      date: "2024-12-22",
      time: "3:00 PM",
      duration: "90 minutes",
      location: {
        type: "hybrid",
        platform: "Zoom + Live Stream",
      },
      attendees: {
        confirmed: 156,
        interested: 298,
        limit: 200,
      },
      image:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop",
      status: "upcoming",
      featured: false,
      tags: ["budget", "masterclass", "travel tips", "savings", "expert"],
      isAttending: false,
      isInterested: true,
      rsvpRequired: true,
      price: 299,
    },
  ]);

  const categories = [
    { value: "all", label: "All Events" },
    { value: "photography", label: "Photography" },
    { value: "food", label: "Food & Cooking" },
    { value: "social", label: "Social & Meetups" },
    { value: "travel", label: "Travel Tips" },
    { value: "culture", label: "Culture" },
  ];

  const getEventTypeIcon = (type: string) => {
    const icons = {
      contest: Trophy,
      workshop: Award,
      meetup: Users,
      celebration: Sparkles,
      social: MessageCircle,
      launch: Zap,
    };
    const IconComponent = icons[type as keyof typeof icons] || Calendar;
    return <IconComponent className="w-4 h-4" />;
  };

  const getEventTypeColor = (type: string) => {
    const colors = {
      contest: "bg-purple-100 text-purple-800",
      workshop: "bg-blue-100 text-blue-800",
      meetup: "bg-green-100 text-green-800",
      celebration: "bg-yellow-100 text-yellow-800",
      social: "bg-pink-100 text-pink-800",
      launch: "bg-orange-100 text-orange-800",
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getStatusColor = (status: string) => {
    const colors = {
      upcoming: "bg-blue-100 text-blue-800",
      live: "bg-red-100 text-red-800",
      ended: "bg-gray-100 text-gray-800",
    };
    return colors[status as keyof typeof colors];
  };

  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      selectedCategory === "all" || event.category === selectedCategory;
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const upcomingEvents = filteredEvents.filter((e) => e.status === "upcoming");
  const myEvents = filteredEvents.filter((e) => e.isAttending);
  const featuredEvents = filteredEvents.filter((e) => e.featured);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Community Events
        </h2>
        <p className="text-gray-600">
          Connect, learn, and celebrate with the StayConnect community
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="upcoming">
            <Calendar className="w-4 h-4 mr-2" />
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="featured">
            <Star className="w-4 h-4 mr-2" />
            Featured
          </TabsTrigger>
          <TabsTrigger value="my-events">
            <Ticket className="w-4 h-4 mr-2" />
            My Events
          </TabsTrigger>
          <TabsTrigger value="create">
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search events..."
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
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={
                  selectedCategory === category.value ? "default" : "outline"
                }
                size="sm"
                onClick={() => setSelectedCategory(category.value)}
                className="whitespace-nowrap"
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Card
                key={event.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3 flex space-x-2">
                    <Badge
                      className={`${getEventTypeColor(event.type)} flex items-center space-x-1`}
                    >
                      {getEventTypeIcon(event.type)}
                      <span className="capitalize">{event.type}</span>
                    </Badge>
                    <Badge className={getStatusColor(event.status)}>
                      {event.status}
                    </Badge>
                  </div>
                  {event.featured && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-yellow-500 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="bg-black/60 text-white text-sm px-3 py-1 rounded">
                      {formatDate(event.date)} • {event.time}
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {event.description}
                  </p>

                  {/* Organizer */}
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={event.organizer.avatar} />
                      <AvatarFallback>{event.organizer.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm">
                          {event.organizer.name}
                        </span>
                        {event.organizer.verified && (
                          <CheckCircle className="w-3 h-3 text-blue-500" />
                        )}
                      </div>
                      <span className="text-xs text-gray-500 capitalize">
                        {event.organizer.role.replace("_", " ")}
                      </span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center space-x-2 mb-4">
                    {event.location.type === "online" ? (
                      <Globe className="w-4 h-4 text-blue-500" />
                    ) : (
                      <MapPin className="w-4 h-4 text-green-500" />
                    )}
                    <span className="text-sm text-gray-600">
                      {event.location.type === "online"
                        ? `Online • ${event.location.platform}`
                        : event.location.address}
                    </span>
                  </div>

                  {/* Attendees */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {event.attendees.confirmed} going
                        {event.attendees.limit &&
                          ` • ${event.attendees.limit - event.attendees.confirmed} spots left`}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">
                        {event.attendees.interested} interested
                      </span>
                    </div>
                  </div>

                  {/* Prizes */}
                  {event.prizes && (
                    <div className="mb-4 p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Trophy className="w-4 h-4 text-yellow-600" />
                        <span className="font-medium text-yellow-800">
                          Prizes
                        </span>
                      </div>
                      <div className="text-sm text-yellow-700">
                        🏆 {event.prizes.first}
                        {event.prizes.second && (
                          <div>🥈 {event.prizes.second}</div>
                        )}
                        {event.prizes.third && (
                          <div>🥉 {event.prizes.third}</div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Price */}
                  {event.price && (
                    <div className="mb-4">
                      <span className="text-lg font-bold text-green-600">
                        ₹{event.price}
                      </span>
                      <span className="text-sm text-gray-500 ml-2">
                        per person
                      </span>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {event.tags.slice(0, 3).map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        #{tag}
                      </Badge>
                    ))}
                    {event.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{event.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    {event.isAttending ? (
                      <Button variant="outline" className="flex-1">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Attending
                      </Button>
                    ) : (
                      <Button className="flex-1">
                        {event.price ? `Join • ₹${event.price}` : "Join Event"}
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className={event.isInterested ? "text-red-500" : ""}
                    >
                      <Heart
                        className={`w-4 h-4 ${event.isInterested ? "fill-current" : ""}`}
                      />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="featured" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredEvents.map((event) => (
              <Card
                key={event.id}
                className="overflow-hidden border-2 border-yellow-200"
              >
                <div className="relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-yellow-500 text-white">
                      <Star className="w-4 h-4 mr-1" />
                      Featured
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-3">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-500">
                        {formatDate(event.date)} • {event.time}
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">
                          {event.attendees.confirmed} attending
                        </span>
                      </div>
                    </div>
                    <Button>Join Event</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-events" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Events</CardTitle>
            </CardHeader>
            <CardContent>
              {myEvents.length > 0 ? (
                <div className="space-y-4">
                  {myEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center space-x-4 p-4 border rounded-lg"
                    >
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{event.title}</h4>
                        <div className="text-sm text-gray-600">
                          {formatDate(event.date)} • {event.time}
                        </div>
                        <Badge
                          className={getEventTypeColor(event.type)}
                          size="sm"
                        >
                          {getEventTypeIcon(event.type)}
                          <span className="ml-1 capitalize">{event.type}</span>
                        </Badge>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-green-100 text-green-800 mb-2">
                          Attending
                        </Badge>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No Events Yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Join some events to see them here
                  </p>
                  <Button>Browse Events</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create Community Event</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Plus className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Host Your Own Event
                </h3>
                <p className="text-gray-600 mb-6">
                  Create workshops, meetups, or contests for the community
                </p>
                <Button>Start Creating</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
