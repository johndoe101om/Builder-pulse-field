import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  Users,
  Calendar,
  Camera,
  Coffee,
  Trophy,
  Star,
  TrendingUp,
  Video,
  Heart,
  Globe,
  Sparkles,
  Award,
  ThumbsUp,
  BarChart3,
} from "lucide-react";

// Import all social components
import { MessagingSystem } from "@/components/social/MessagingSystem";
import { TravelBuddyFinder } from "@/components/social/TravelBuddyFinder";
import { GroupTripPlanner } from "@/components/social/GroupTripPlanner";
import { SocialProofIndicators } from "@/components/social/SocialProofIndicators";
import { PhotoSharing } from "@/components/social/PhotoSharing";
import { LocalHostMeetups } from "@/components/community/LocalHostMeetups";
import { CommunityEvents } from "@/components/community/CommunityEvents";
import { VideoReviews } from "@/components/reviews/VideoReviews";
import { ReviewHelpfulness } from "@/components/reviews/ReviewHelpfulness";
import { ReviewSentimentAnalysis } from "@/components/reviews/ReviewSentimentAnalysis";

export const SocialHub: React.FC = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const socialStats = {
    messages: 1247,
    buddies: 89,
    groups: 23,
    photos: 156,
    meetups: 34,
    events: 12,
    videoReviews: 67,
    helpfulVotes: 234,
  };

  const quickActions = [
    {
      icon: MessageCircle,
      title: "Messages",
      description: "Chat with travelers",
      count: socialStats.messages,
      color: "bg-blue-500",
      action: () => setActiveSection("messaging"),
    },
    {
      icon: Users,
      title: "Find Buddies",
      description: "Connect with travelers",
      count: socialStats.buddies,
      color: "bg-purple-500",
      action: () => setActiveSection("buddy-finder"),
    },
    {
      icon: Calendar,
      title: "Plan Groups",
      description: "Organize trips together",
      count: socialStats.groups,
      color: "bg-green-500",
      action: () => setActiveSection("group-planner"),
    },
    {
      icon: Camera,
      title: "Share Photos",
      description: "Show your experiences",
      count: socialStats.photos,
      color: "bg-pink-500",
      action: () => setActiveSection("photo-sharing"),
    },
    {
      icon: Coffee,
      title: "Local Meetups",
      description: "Meet local hosts",
      count: socialStats.meetups,
      color: "bg-orange-500",
      action: () => setActiveSection("meetups"),
    },
    {
      icon: Sparkles,
      title: "Events",
      description: "Join community events",
      count: socialStats.events,
      color: "bg-indigo-500",
      action: () => setActiveSection("events"),
    },
  ];

  const OverviewSection = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to StayConnect Social Hub
        </h1>
        <p className="text-xl mb-6">
          Connect, share, and discover with fellow travelers worldwide
        </p>
        <div className="flex justify-center items-center space-x-8">
          <div className="text-center">
            <div className="text-3xl font-bold">
              {(socialStats.messages + socialStats.buddies).toLocaleString()}
            </div>
            <div className="text-sm opacity-90">Active Connections</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{socialStats.photos}</div>
            <div className="text-sm opacity-90">Shared Experiences</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">
              {socialStats.events + socialStats.meetups}
            </div>
            <div className="text-sm opacity-90">Community Events</div>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={action.action}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`${action.color} p-3 rounded-lg text-white`}>
                    <action.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{action.title}</h3>
                    <p className="text-gray-600 text-sm">
                      {action.description}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="secondary">{action.count}</Badge>
                      <span className="text-xs text-gray-500">active</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <span>Recent Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
              <MessageCircle className="w-5 h-5 text-blue-500" />
              <div>
                <p className="font-medium">New message from Maria Santos</p>
                <p className="text-sm text-gray-600">
                  About the Goa travel buddy request • 5 minutes ago
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
              <Users className="w-5 h-5 text-green-500" />
              <div>
                <p className="font-medium">3 new travel buddy matches</p>
                <p className="text-sm text-gray-600">
                  For your Mumbai trip • 2 hours ago
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-purple-50 rounded-lg">
              <Sparkles className="w-5 h-5 text-purple-500" />
              <div>
                <p className="font-medium">
                  StayConnect Photography Contest starting
                </p>
                <p className="text-sm text-gray-600">
                  Win amazing prizes • 1 day ago
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Community Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span>Top Contributors</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">🥇</div>
                  <div>
                    <p className="font-medium">Sarah Johnson</p>
                    <p className="text-sm text-gray-600">42 helpful reviews</p>
                  </div>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">Gold</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">🥈</div>
                  <div>
                    <p className="font-medium">Marco Silva</p>
                    <p className="text-sm text-gray-600">38 helpful reviews</p>
                  </div>
                </div>
                <Badge className="bg-gray-100 text-gray-800">Silver</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">🥉</div>
                  <div>
                    <p className="font-medium">Priya Patel</p>
                    <p className="text-sm text-gray-600">31 helpful reviews</p>
                  </div>
                </div>
                <Badge className="bg-orange-100 text-orange-800">Bronze</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-blue-500" />
              <span>Global Community</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active Members</span>
                <span className="font-semibold">12,847</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Countries</span>
                <span className="font-semibold">89</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Languages</span>
                <span className="font-semibold">34</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Photos Shared</span>
                <span className="font-semibold">156K+</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <Tabs
          value={activeSection}
          onValueChange={setActiveSection}
          className="space-y-6"
        >
          <div className="bg-white shadow-sm border-b sticky top-0 z-10">
            <TabsList className="grid w-full grid-cols-11 p-2">
              <TabsTrigger value="overview" className="text-xs">
                <TrendingUp className="w-4 h-4 mr-1" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="messaging" className="text-xs">
                <MessageCircle className="w-4 h-4 mr-1" />
                Messages
              </TabsTrigger>
              <TabsTrigger value="buddy-finder" className="text-xs">
                <Users className="w-4 h-4 mr-1" />
                Buddies
              </TabsTrigger>
              <TabsTrigger value="group-planner" className="text-xs">
                <Calendar className="w-4 h-4 mr-1" />
                Groups
              </TabsTrigger>
              <TabsTrigger value="photo-sharing" className="text-xs">
                <Camera className="w-4 h-4 mr-1" />
                Photos
              </TabsTrigger>
              <TabsTrigger value="meetups" className="text-xs">
                <Coffee className="w-4 h-4 mr-1" />
                Meetups
              </TabsTrigger>
              <TabsTrigger value="events" className="text-xs">
                <Sparkles className="w-4 h-4 mr-1" />
                Events
              </TabsTrigger>
              <TabsTrigger value="video-reviews" className="text-xs">
                <Video className="w-4 h-4 mr-1" />
                Videos
              </TabsTrigger>
              <TabsTrigger value="review-voting" className="text-xs">
                <ThumbsUp className="w-4 h-4 mr-1" />
                Reviews
              </TabsTrigger>
              <TabsTrigger value="sentiment" className="text-xs">
                <BarChart3 className="w-4 h-4 mr-1" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="social-proof" className="text-xs">
                <Award className="w-4 h-4 mr-1" />
                Trust
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="p-6">
            <TabsContent value="overview">
              <OverviewSection />
            </TabsContent>

            <TabsContent value="messaging">
              <MessagingSystem />
            </TabsContent>

            <TabsContent value="buddy-finder">
              <TravelBuddyFinder />
            </TabsContent>

            <TabsContent value="group-planner">
              <GroupTripPlanner />
            </TabsContent>

            <TabsContent value="photo-sharing">
              <PhotoSharing />
            </TabsContent>

            <TabsContent value="meetups">
              <LocalHostMeetups />
            </TabsContent>

            <TabsContent value="events">
              <CommunityEvents />
            </TabsContent>

            <TabsContent value="video-reviews">
              <VideoReviews />
            </TabsContent>

            <TabsContent value="review-voting">
              <ReviewHelpfulness />
            </TabsContent>

            <TabsContent value="sentiment">
              <ReviewSentimentAnalysis />
            </TabsContent>

            <TabsContent value="social-proof">
              <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Social Proof & Trust Signals
                  </h2>
                  <p className="text-gray-600">
                    Build trust with authentic social validation
                  </p>
                </div>
                <SocialProofIndicators
                  showRealTimeActivity={true}
                  showTrustSignals={true}
                  showPopularityMetrics={true}
                  compact={false}
                />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export { SocialHub };
