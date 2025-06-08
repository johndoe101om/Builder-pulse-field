import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  Calendar,
  MapPin,
  DollarSign,
  Plus,
  Vote,
  MessageCircle,
  Settings,
  Share,
  Download,
  Check,
  X,
  Clock,
  Plane,
  Hotel,
  Car,
  Camera,
  Utensils,
  Activity,
  ShoppingBag,
  Coffee,
  Star,
  Edit,
  Trash2,
} from "lucide-react";

interface GroupMember {
  id: string;
  name: string;
  avatar: string;
  role: "organizer" | "member";
  status: "confirmed" | "pending" | "declined";
  budget: number;
  preferences: string[];
}

interface TripItem {
  id: string;
  type: "accommodation" | "activity" | "transport" | "restaurant";
  title: string;
  description: string;
  cost: number;
  duration?: string;
  location: string;
  votes: { memberId: string; vote: "yes" | "no" | "maybe" }[];
  status: "proposed" | "approved" | "rejected";
  proposedBy: string;
  date?: string;
  image?: string;
}

interface GroupTrip {
  id: string;
  name: string;
  destination: string;
  dates: {
    start: string;
    end: string;
  };
  members: GroupMember[];
  budget: {
    total: number;
    perPerson: number;
    collected: number;
  };
  itinerary: TripItem[];
  status: "planning" | "confirmed" | "completed";
  createdBy: string;
  createdAt: string;
}

export const GroupTripPlanner: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedTrip, setSelectedTrip] = useState<GroupTrip | null>(null);

  const [groupTrips] = useState<GroupTrip[]>([
    {
      id: "1",
      name: "Goa Beach Adventure",
      destination: "Goa, India",
      dates: {
        start: "2024-12-15",
        end: "2024-12-22",
      },
      members: [
        {
          id: "1",
          name: "Sarah Johnson",
          avatar:
            "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100&h=100&fit=crop&crop=face",
          role: "organizer",
          status: "confirmed",
          budget: 1500,
          preferences: ["beaches", "nightlife", "photography"],
        },
        {
          id: "2",
          name: "Marco Silva",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
          role: "member",
          status: "confirmed",
          budget: 1200,
          preferences: ["music", "adventure", "local food"],
        },
        {
          id: "3",
          name: "Priya Patel",
          avatar:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
          role: "member",
          status: "pending",
          budget: 800,
          preferences: ["culture", "wellness", "budget travel"],
        },
        {
          id: "4",
          name: "Alex Chen",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
          role: "member",
          status: "confirmed",
          budget: 1800,
          preferences: ["luxury", "food", "spa"],
        },
      ],
      budget: {
        total: 5200,
        perPerson: 1300,
        collected: 3500,
      },
      itinerary: [
        {
          id: "1",
          type: "accommodation",
          title: "Beachfront Villa with Pool",
          description:
            "Luxury 4-bedroom villa with private pool and beach access",
          cost: 2400,
          location: "Candolim Beach, Goa",
          votes: [
            { memberId: "1", vote: "yes" },
            { memberId: "2", vote: "yes" },
            { memberId: "4", vote: "maybe" },
          ],
          status: "proposed",
          proposedBy: "1",
          date: "2024-12-15",
          image:
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&h=200&fit=crop",
        },
        {
          id: "2",
          type: "activity",
          title: "Sunset Dolphin Cruise",
          description: "Boat cruise to spot dolphins with dinner and drinks",
          cost: 320,
          duration: "4 hours",
          location: "Panjim, Goa",
          votes: [
            { memberId: "1", vote: "yes" },
            { memberId: "2", vote: "yes" },
            { memberId: "3", vote: "yes" },
          ],
          status: "approved",
          proposedBy: "2",
          date: "2024-12-17",
          image:
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop",
        },
        {
          id: "3",
          type: "restaurant",
          title: "Traditional Goan Feast",
          description:
            "Authentic local cuisine at a traditional Goan restaurant",
          cost: 240,
          location: "Old Goa",
          votes: [
            { memberId: "1", vote: "yes" },
            { memberId: "2", vote: "yes" },
            { memberId: "3", vote: "yes" },
            { memberId: "4", vote: "no" },
          ],
          status: "approved",
          proposedBy: "3",
          date: "2024-12-18",
        },
      ],
      status: "planning",
      createdBy: "1",
      createdAt: "2024-11-01",
    },
  ]);

  React.useEffect(() => {
    if (groupTrips.length > 0) {
      setSelectedTrip(groupTrips[0]);
    }
  }, [groupTrips]);

  const getTypeIcon = (type: TripItem["type"]) => {
    const icons = {
      accommodation: Hotel,
      activity: Activity,
      transport: Car,
      restaurant: Utensils,
    };
    const IconComponent = icons[type];
    return <IconComponent className="w-4 h-4" />;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      confirmed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      declined: "bg-red-100 text-red-800",
      proposed: "bg-blue-100 text-blue-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const calculateVotePercentage = (votes: TripItem["votes"]) => {
    const yesVotes = votes.filter((v) => v.vote === "yes").length;
    return votes.length > 0 ? (yesVotes / votes.length) * 100 : 0;
  };

  if (!selectedTrip) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {selectedTrip.name}
            </h2>
            <div className="flex items-center space-x-4 text-gray-600">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{selectedTrip.destination}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(selectedTrip.dates.start).toLocaleDateString()} -{" "}
                  {new Date(selectedTrip.dates.end).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{selectedTrip.members.length} members</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="chat">Group Chat</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Trip Summary */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Trip Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Progress */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">
                      Planning Progress
                    </span>
                    <span className="text-sm text-gray-600">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Planning Started</span>
                    <span>Ready to Book</span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {
                        selectedTrip.itinerary.filter(
                          (i) => i.status === "approved",
                        ).length
                      }
                    </div>
                    <div className="text-sm text-blue-700">Approved Items</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      ₹{selectedTrip.budget.collected.toLocaleString()}
                    </div>
                    <div className="text-sm text-green-700">
                      Budget Collected
                    </div>
                  </div>
                </div>

                {/* Upcoming Votes */}
                <div>
                  <h4 className="font-medium mb-3">Pending Votes</h4>
                  <div className="space-y-3">
                    {selectedTrip.itinerary
                      .filter((item) => item.status === "proposed")
                      .map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg">
                              {getTypeIcon(item.type)}
                            </div>
                            <div>
                              <h5 className="font-medium">{item.title}</h5>
                              <p className="text-sm text-gray-600">
                                ₹{item.cost} • {item.location}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="text-right">
                              <div className="text-sm font-medium">
                                {calculateVotePercentage(item.votes).toFixed(0)}
                                % approved
                              </div>
                              <div className="text-xs text-gray-500">
                                {item.votes.length} votes
                              </div>
                            </div>
                            <Button size="sm" variant="outline">
                              <Vote className="w-4 h-4 mr-1" />
                              Vote
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Members Preview */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Group Members</CardTitle>
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-1" />
                    Invite
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedTrip.members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-sm">
                              {member.name}
                            </span>
                            {member.role === "organizer" && (
                              <Badge variant="secondary" className="text-xs">
                                Organizer
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-gray-600">
                            ₹{member.budget.toLocaleString()} budget
                          </div>
                        </div>
                      </div>
                      <Badge
                        className={`text-xs ${getStatusColor(member.status)}`}
                      >
                        {member.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="itinerary" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Trip Itinerary</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>

          <div className="space-y-4">
            {selectedTrip.itinerary.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-24 h-20 object-cover rounded-lg flex-shrink-0"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg">
                              {getTypeIcon(item.type)}
                            </div>
                            <div>
                              <h4 className="font-semibold">{item.title}</h4>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span>₹{item.cost}</span>
                                <span className="flex items-center space-x-1">
                                  <MapPin className="w-3 h-3" />
                                  <span>{item.location}</span>
                                </span>
                                {item.duration && (
                                  <span className="flex items-center space-x-1">
                                    <Clock className="w-3 h-3" />
                                    <span>{item.duration}</span>
                                  </span>
                                )}
                                {item.date && (
                                  <span className="flex items-center space-x-1">
                                    <Calendar className="w-3 h-3" />
                                    <span>
                                      {new Date(item.date).toLocaleDateString()}
                                    </span>
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700 mb-3">
                            {item.description}
                          </p>
                          <div className="flex items-center space-x-4">
                            <Badge className={getStatusColor(item.status)}>
                              {item.status}
                            </Badge>
                            <span className="text-sm text-gray-600">
                              Proposed by{" "}
                              {
                                selectedTrip.members.find(
                                  (m) => m.id === item.proposedBy,
                                )?.name
                              }
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Voting Section */}
                      {item.status === "proposed" && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium">Member Votes</span>
                            <span className="text-sm text-gray-600">
                              {calculateVotePercentage(item.votes).toFixed(0)}%
                              approval
                            </span>
                          </div>

                          <div className="grid grid-cols-4 gap-3 mb-3">
                            {selectedTrip.members.map((member) => {
                              const vote = item.votes.find(
                                (v) => v.memberId === member.id,
                              );
                              return (
                                <div key={member.id} className="text-center">
                                  <Avatar className="w-8 h-8 mx-auto mb-1">
                                    <AvatarImage src={member.avatar} />
                                    <AvatarFallback className="text-xs">
                                      {member.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="text-xs text-gray-600">
                                    {member.name.split(" ")[0]}
                                  </div>
                                  {vote ? (
                                    <Badge
                                      variant={
                                        vote.vote === "yes"
                                          ? "default"
                                          : vote.vote === "no"
                                            ? "destructive"
                                            : "secondary"
                                      }
                                      className="text-xs mt-1"
                                    >
                                      {vote.vote}
                                    </Badge>
                                  ) : (
                                    <Badge
                                      variant="outline"
                                      className="text-xs mt-1"
                                    >
                                      pending
                                    </Badge>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          <div className="flex space-x-2">
                            <Button size="sm" className="flex-1">
                              <Check className="w-4 h-4 mr-1" />
                              Yes
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1"
                            >
                              Maybe
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="flex-1"
                            >
                              <X className="w-4 h-4 mr-1" />
                              No
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="budget" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Budget Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Budget Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">
                    ₹{selectedTrip.budget.total.toLocaleString()}
                  </div>
                  <div className="text-gray-600">Total Trip Cost</div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Per Person</span>
                    <span className="font-medium">
                      ₹{selectedTrip.budget.perPerson.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Collected</span>
                    <span className="font-medium text-green-600">
                      ₹{selectedTrip.budget.collected.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Remaining</span>
                    <span className="font-medium text-orange-600">
                      ₹
                      {(
                        selectedTrip.budget.total -
                        selectedTrip.budget.collected
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Collection Progress</span>
                    <span>
                      {(
                        (selectedTrip.budget.collected /
                          selectedTrip.budget.total) *
                        100
                      ).toFixed(0)}
                      %
                    </span>
                  </div>
                  <Progress
                    value={
                      (selectedTrip.budget.collected /
                        selectedTrip.budget.total) *
                      100
                    }
                    className="h-3"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Member Contributions */}
            <Card>
              <CardHeader>
                <CardTitle>Member Contributions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedTrip.members.map((member) => {
                    const contribution =
                      (member.budget / selectedTrip.budget.total) * 100;
                    return (
                      <div key={member.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={member.avatar} />
                              <AvatarFallback className="text-xs">
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{member.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">
                              ₹{member.budget.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-600">
                              {contribution.toFixed(0)}%
                            </div>
                          </div>
                        </div>
                        <Progress value={contribution} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Expense Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Expense Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedTrip.itinerary
                  .filter((item) => item.status === "approved")
                  .map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg">
                          {getTypeIcon(item.type)}
                        </div>
                        <div>
                          <h5 className="font-medium">{item.title}</h5>
                          <p className="text-sm text-gray-600 capitalize">
                            {item.type}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          ₹{item.cost.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">
                          ₹
                          {(
                            item.cost /
                            selectedTrip.members.filter(
                              (m) => m.status === "confirmed",
                            ).length
                          ).toLocaleString()}{" "}
                          per person
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Group Members</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Invite Members
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedTrip.members.map((member) => (
              <Card key={member.id}>
                <CardContent className="p-6">
                  <div className="text-center">
                    <Avatar className="w-16 h-16 mx-auto mb-4">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h4 className="font-semibold">{member.name}</h4>
                    <div className="flex items-center justify-center space-x-2 mt-2">
                      <Badge className={getStatusColor(member.status)}>
                        {member.status}
                      </Badge>
                      {member.role === "organizer" && (
                        <Badge variant="secondary">Organizer</Badge>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Budget</span>
                      <span className="font-medium">
                        ₹{member.budget.toLocaleString()}
                      </span>
                    </div>

                    <div>
                      <span className="text-sm text-gray-600 block mb-2">
                        Interests
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {member.preferences.map((pref, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {pref}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Message
                    </Button>
                    {member.role !== "organizer" && (
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="chat" className="space-y-6">
          <Card className="h-96">
            <CardHeader>
              <CardTitle>Group Chat</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-64">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Start the Conversation
                </h3>
                <p className="text-gray-600 mb-4">
                  Chat with your group members about the trip
                </p>
                <Button>Send First Message</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
