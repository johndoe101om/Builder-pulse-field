import React from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  Eye,
  Heart,
  Star,
  TrendingUp,
  Clock,
  MapPin,
  Shield,
  CheckCircle,
  Award,
  Flame,
  Calendar,
  MessageCircle,
} from "lucide-react";

interface SocialActivity {
  id: string;
  type: "booking" | "view" | "favorite" | "review";
  user: {
    name: string;
    avatar?: string;
    location: string;
  };
  timestamp: Date;
  property?: {
    name: string;
    location: string;
  };
}

interface SocialProofProps {
  propertyId?: string;
  showRealTimeActivity?: boolean;
  showTrustSignals?: boolean;
  showPopularityMetrics?: boolean;
  compact?: boolean;
}

export const SocialProofIndicators: React.FC<SocialProofProps> = ({
  propertyId,
  showRealTimeActivity = true,
  showTrustSignals = true,
  showPopularityMetrics = true,
  compact = false,
}) => {
  const recentActivity: SocialActivity[] = [
    {
      id: "1",
      type: "booking",
      user: {
        name: "Sarah from Mumbai",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=50&h=50&fit=crop&crop=face",
        location: "Mumbai, India",
      },
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      property: {
        name: "Beachfront Villa",
        location: "Goa",
      },
    },
    {
      id: "2",
      type: "view",
      user: {
        name: "Alex from Delhi",
        location: "Delhi, India",
      },
      timestamp: new Date(Date.now() - 8 * 60 * 1000),
    },
    {
      id: "3",
      type: "favorite",
      user: {
        name: "Priya from Bangalore",
        location: "Bangalore, India",
      },
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
    },
    {
      id: "4",
      type: "review",
      user: {
        name: "James from London",
        location: "London, UK",
      },
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
    },
  ];

  const trustSignals = [
    {
      icon: Shield,
      label: "Verified Host",
      value: "ID & Background Checked",
      color: "text-blue-600",
    },
    {
      icon: Award,
      label: "Superhost",
      value: "98% Rating, 50+ Reviews",
      color: "text-yellow-600",
    },
    {
      icon: CheckCircle,
      label: "Instant Book",
      value: "Book without waiting",
      color: "text-green-600",
    },
  ];

  const popularityMetrics = {
    totalViews: 2340,
    viewsToday: 127,
    favorites: 89,
    bookingRate: 85,
    responseTime: "< 1 hour",
    trending: true,
  };

  const getTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / (1000 * 60));
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const getActivityIcon = (type: SocialActivity["type"]) => {
    const icons = {
      booking: Calendar,
      view: Eye,
      favorite: Heart,
      review: Star,
    };
    return icons[type];
  };

  const getActivityColor = (type: SocialActivity["type"]) => {
    const colors = {
      booking: "text-green-600",
      view: "text-blue-600",
      favorite: "text-red-600",
      review: "text-yellow-600",
    };
    return colors[type];
  };

  const getActivityText = (activity: SocialActivity) => {
    const actions = {
      booking: "booked this property",
      view: "is viewing this property",
      favorite: "added this to favorites",
      review: "left a 5-star review",
    };
    return actions[activity.type];
  };

  if (compact) {
    return (
      <div className="space-y-3">
        {/* Compact Trust Signals */}
        {showTrustSignals && (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Shield className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">Verified</span>
            </div>
            <div className="flex items-center space-x-1">
              <Award className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium">Superhost</span>
            </div>
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium">Trending</span>
            </div>
          </div>
        )}

        {/* Compact Activity */}
        {showRealTimeActivity && recentActivity.length > 0 && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>
              {recentActivity[0].user.name} {getActivityText(recentActivity[0])}{" "}
              {getTimeAgo(recentActivity[0].timestamp)}
            </span>
          </div>
        )}

        {/* Compact Popularity */}
        {showPopularityMetrics && (
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{popularityMetrics.viewsToday} views today</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>{popularityMetrics.favorites} favorites</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Trust Signals */}
      {showTrustSignals && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-green-900 mb-3 flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Trust & Safety</span>
          </h4>
          <div className="space-y-3">
            {trustSignals.map((signal, index) => (
              <div key={index} className="flex items-center space-x-3">
                <signal.icon className={`w-5 h-5 ${signal.color}`} />
                <div>
                  <div className="font-medium text-gray-900">
                    {signal.label}
                  </div>
                  <div className="text-sm text-gray-600">{signal.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Popularity Metrics */}
      {showPopularityMetrics && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-3 flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Popularity Insights</span>
            {popularityMetrics.trending && (
              <Badge className="bg-orange-100 text-orange-800 text-xs">
                <Flame className="w-3 h-3 mr-1" />
                Trending
              </Badge>
            )}
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {popularityMetrics.totalViews.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Views</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {popularityMetrics.bookingRate}%
              </div>
              <div className="text-sm text-gray-600">Booking Rate</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-red-600">
                {popularityMetrics.favorites}
              </div>
              <div className="text-sm text-gray-600">Favorites</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">
                {popularityMetrics.responseTime}
              </div>
              <div className="text-sm text-gray-600">Response Time</div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-white rounded border">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Views Today</span>
              <span className="text-sm text-green-600 font-semibold">
                +{popularityMetrics.viewsToday}
              </span>
            </div>
            <div className="mt-2 bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min((popularityMetrics.viewsToday / 200) * 100, 100)}%`,
                }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {((popularityMetrics.viewsToday / 200) * 100).toFixed(0)}% of
              daily target
            </div>
          </div>
        </div>
      )}

      {/* Real-time Activity */}
      {showRealTimeActivity && (
        <div className="bg-gray-50 border rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Recent Activity</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </h4>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {recentActivity.map((activity) => {
              const ActivityIcon = getActivityIcon(activity.type);
              return (
                <div
                  key={activity.id}
                  className="flex items-center space-x-3 p-2 hover:bg-white rounded transition-colors"
                >
                  <div className="flex-shrink-0">
                    {activity.user.avatar ? (
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={activity.user.avatar} />
                        <AvatarFallback className="text-xs">
                          {activity.user.name.split(" ")[0][0]}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">
                          {activity.user.name.split(" ")[0][0]}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <ActivityIcon
                        className={`w-4 h-4 ${getActivityColor(activity.type)}`}
                      />
                      <span className="text-sm">
                        <span className="font-medium">
                          {activity.user.name}
                        </span>
                        <span className="text-gray-600">
                          {" "}
                          {getActivityText(activity)}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{getTimeAgo(activity.timestamp)}</span>
                      <span>•</span>
                      <MapPin className="w-3 h-3" />
                      <span>{activity.user.location}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t">
            <div className="text-center">
              <div className="text-sm text-gray-600">
                <strong>127 people</strong> viewed this property in the last 24
                hours
              </div>
              <div className="text-xs text-gray-500 mt-1">
                <strong>8 people</strong> are currently viewing this property
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Social Validation */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-semibold text-yellow-900 mb-3 flex items-center space-x-2">
          <Star className="w-5 h-5" />
          <span>Guest Experiences</span>
        </h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="flex -space-x-2">
              <Avatar className="w-8 h-8 border-2 border-white">
                <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=50&h=50&fit=crop&crop=face" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <Avatar className="w-8 h-8 border-2 border-white">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face" />
                <AvatarFallback>MS</AvatarFallback>
              </Avatar>
              <Avatar className="w-8 h-8 border-2 border-white">
                <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face" />
                <AvatarFallback>PP</AvatarFallback>
              </Avatar>
              <div className="w-8 h-8 bg-gray-100 border-2 border-white rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">+12</span>
              </div>
            </div>
            <div>
              <div className="text-sm font-medium">
                Recent guests loved this place
              </div>
              <div className="text-xs text-gray-600">
                15 guests gave 5-star reviews this month
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-4 h-4 text-yellow-400 fill-current"
                />
              ))}
            </div>
            <span className="text-sm font-medium">4.9</span>
            <span className="text-sm text-gray-600">• 127 reviews</span>
          </div>

          <div className="bg-white p-3 rounded border">
            <div className="flex items-start space-x-3">
              <Avatar className="w-6 h-6">
                <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=50&h=50&fit=crop&crop=face" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="text-sm">
                  <span className="font-medium">Sarah</span>
                  <span className="text-gray-600"> • 2 days ago</span>
                </div>
                <p className="text-sm text-gray-700 mt-1">
                  "Amazing beachfront location! The host was incredibly
                  responsive and helpful..."
                </p>
                <div className="flex items-center space-x-1 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-3 h-3 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Urgency & Scarcity */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h4 className="font-semibold text-red-900 mb-3 flex items-center space-x-2">
          <Clock className="w-5 h-5" />
          <span>Booking Information</span>
        </h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-red-700">
              Only 2 similar properties left in this area
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-orange-700">
              Booked 3 times in the last week
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-green-700">
              Free cancellation until 24 hours before
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
