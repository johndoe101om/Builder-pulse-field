import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  ThumbsUp,
  ThumbsDown,
  Star,
  TrendingUp,
  Award,
  MessageCircle,
  Flag,
  Eye,
  Calendar,
  MapPin,
  Shield,
  CheckCircle,
  MoreVertical,
  Heart,
  Share,
  Users,
  Filter,
  SortAsc,
} from "lucide-react";

interface Review {
  id: string;
  reviewer: {
    id: string;
    name: string;
    avatar: string;
    verified: boolean;
    totalReviews: number;
    helpfulReviews: number;
    memberSince: string;
    level: "bronze" | "silver" | "gold" | "platinum";
  };
  property: {
    id: string;
    name: string;
    location: string;
    image: string;
  };
  rating: number;
  title: string;
  content: string;
  pros: string[];
  cons: string[];
  stayDates: {
    start: string;
    end: string;
  };
  roomType: string;
  tripType: "business" | "leisure" | "family" | "solo" | "couple" | "friends";
  photos: string[];
  timestamp: Date;
  helpful: {
    count: number;
    users: string[];
  };
  notHelpful: {
    count: number;
    users: string[];
  };
  responses: {
    host?: {
      content: string;
      timestamp: Date;
    };
    management?: {
      content: string;
      timestamp: Date;
    };
  };
  tags: string[];
  isHelpful: boolean;
  isNotHelpful: boolean;
  helpfulnessRatio: number;
  qualityScore: number;
  detailLevel: "basic" | "detailed" | "comprehensive";
  verified: boolean;
  language: string;
}

export const ReviewHelpfulness: React.FC = () => {
  const [sortBy, setSortBy] = useState<
    "helpful" | "recent" | "rating" | "detailed"
  >("helpful");
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [filterTripType, setFilterTripType] = useState<string>("all");

  const [reviews] = useState<Review[]>([
    {
      id: "1",
      reviewer: {
        id: "1",
        name: "Sarah Johnson",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100&h=100&fit=crop&crop=face",
        verified: true,
        totalReviews: 47,
        helpfulReviews: 42,
        memberSince: "2020-03-15",
        level: "gold",
      },
      property: {
        id: "1",
        name: "Beachfront Villa Goa",
        location: "Candolim Beach, Goa",
        image:
          "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=200&h=120&fit=crop",
      },
      rating: 5,
      title: "Perfect beachfront escape - exceeded all expectations!",
      content:
        "This villa truly delivered an unforgettable experience. The location is absolutely prime - you step out and you're on the pristine Candolim beach. The infinity pool overlooking the ocean was my favorite spot for morning coffee and evening relaxation. The villa is exactly as pictured, with high-end furnishings and a fully equipped kitchen. The host, Raj, was incredibly responsive and provided excellent local recommendations. The wifi was strong enough for work calls, making it perfect for a workcation. I particularly loved the outdoor shower and the spacious terrace. Small details like welcome drinks, fresh flowers, and beach towels made the stay special.",
      pros: [
        "Prime beachfront location",
        "Stunning infinity pool",
        "Responsive host",
        "High-quality furnishings",
        "Strong wifi",
        "Well-equipped kitchen",
      ],
      cons: [
        "Slight noise from beach activities during peak hours",
        "No grocery store within walking distance",
      ],
      stayDates: {
        start: "2024-11-15",
        end: "2024-11-22",
      },
      roomType: "Entire Villa",
      tripType: "couple",
      photos: [
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop",
      ],
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      helpful: {
        count: 89,
        users: ["user1", "user2", "user3"],
      },
      notHelpful: {
        count: 3,
        users: ["user4"],
      },
      responses: {
        host: {
          content:
            "Thank you so much for this wonderful review, Sarah! It was a pleasure hosting you and your partner. I'm thrilled that you enjoyed the villa and the beachfront location. Hope to welcome you back soon!",
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        },
      },
      tags: ["detailed", "photos", "pros-cons", "host-response"],
      isHelpful: true,
      isNotHelpful: false,
      helpfulnessRatio: 96.7,
      qualityScore: 9.2,
      detailLevel: "comprehensive",
      verified: true,
      language: "English",
    },
    {
      id: "2",
      reviewer: {
        id: "2",
        name: "Marco Silva",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        verified: true,
        totalReviews: 23,
        helpfulReviews: 19,
        memberSince: "2021-07-20",
        level: "silver",
      },
      property: {
        id: "2",
        name: "Mumbai Central Apartment",
        location: "Bandra West, Mumbai",
        image:
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200&h=120&fit=crop",
      },
      rating: 4,
      title: "Great location, minor issues with amenities",
      content:
        "The apartment is in an excellent location in Bandra West, walking distance to restaurants, cafes, and the train station. The space is modern and clean, with a comfortable bed and good air conditioning. However, I had some issues with the hot water heater - it took a long time to heat up and sometimes ran out during showers. The wifi was reliable but not very fast. The host was responsive to my concerns about the water heater and arranged for a technician to check it. Overall, good value for money given the prime location.",
      pros: [
        "Excellent location",
        "Modern and clean",
        "Responsive host",
        "Good AC",
        "Near transport",
      ],
      cons: ["Hot water issues", "Slow wifi", "Street noise at night"],
      stayDates: {
        start: "2024-11-10",
        end: "2024-11-17",
      },
      roomType: "Entire Apartment",
      tripType: "business",
      photos: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      ],
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      helpful: {
        count: 56,
        users: ["user5", "user6"],
      },
      notHelpful: {
        count: 7,
        users: ["user7", "user8"],
      },
      responses: {
        host: {
          content:
            "Thank you for the honest feedback, Marco. I've since replaced the water heater and upgraded the wifi. I appreciate your patience during your stay.",
          timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        },
      },
      tags: ["honest", "constructive", "host-response"],
      isHelpful: false,
      isNotHelpful: false,
      helpfulnessRatio: 88.9,
      qualityScore: 8.1,
      detailLevel: "detailed",
      verified: true,
      language: "English",
    },
    {
      id: "3",
      reviewer: {
        id: "3",
        name: "Priya Patel",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        verified: false,
        totalReviews: 12,
        helpfulReviews: 8,
        memberSince: "2023-01-10",
        level: "bronze",
      },
      property: {
        id: "3",
        name: "Heritage Homestay Kerala",
        location: "Alleppey, Kerala",
        image:
          "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=200&h=120&fit=crop",
      },
      rating: 5,
      title: "Authentic Kerala experience with amazing hosts",
      content:
        "What an incredible experience! This traditional homestay gave me a genuine taste of Kerala culture. The family was so welcoming and treated me like their own daughter. Mrs. Nair taught me how to cook traditional Kerala dishes - the fish curry and appam were divine! The backwater views from the room were stunning, especially during sunrise. The house is beautifully maintained with traditional architecture and modern comforts. They arranged a backwater cruise and helped me book an Ayurvedic massage. The homemade breakfast was fresh and delicious every day. This is how travel should be - authentic, personal, and memorable.",
      pros: [
        "Authentic cultural experience",
        "Amazing hosts",
        "Traditional cooking lessons",
        "Beautiful backwater views",
        "Homemade meals",
        "Great local arrangements",
      ],
      cons: ["Limited dining options nearby", "Basic wifi"],
      stayDates: {
        start: "2024-10-20",
        end: "2024-10-27",
      },
      roomType: "Private Room",
      tripType: "solo",
      photos: [
        "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      ],
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      helpful: {
        count: 73,
        users: ["user9", "user10", "user11"],
      },
      notHelpful: {
        count: 2,
        users: ["user12"],
      },
      responses: {
        host: {
          content:
            "Dear Priya, thank you for this heartwarming review! It was wonderful having you as our guest. You're welcome back anytime - our family misses you already!",
          timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
        },
      },
      tags: ["cultural", "heartwarming", "detailed", "authentic"],
      isHelpful: false,
      isNotHelpful: false,
      helpfulnessRatio: 97.3,
      qualityScore: 9.0,
      detailLevel: "comprehensive",
      verified: false,
      language: "English",
    },
  ]);

  const getLevelBadge = (level: string) => {
    const levels = {
      bronze: { color: "bg-orange-100 text-orange-800", icon: "🥉" },
      silver: { color: "bg-gray-100 text-gray-800", icon: "🥈" },
      gold: { color: "bg-yellow-100 text-yellow-800", icon: "🥇" },
      platinum: { color: "bg-purple-100 text-purple-800", icon: "💎" },
    };
    const levelInfo = levels[level as keyof typeof levels];
    return (
      <Badge className={`${levelInfo.color} text-xs`}>
        {levelInfo.icon} {level.charAt(0).toUpperCase() + level.slice(1)}
      </Badge>
    );
  };

  const getQualityBadge = (score: number) => {
    if (score >= 9)
      return { label: "Excellent", color: "bg-green-100 text-green-800" };
    if (score >= 8)
      return { label: "Very Good", color: "bg-blue-100 text-blue-800" };
    if (score >= 7)
      return { label: "Good", color: "bg-yellow-100 text-yellow-800" };
    return { label: "Basic", color: "bg-gray-100 text-gray-800" };
  };

  const formatTimeAgo = (date: Date) => {
    const days = Math.floor(
      (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24),
    );
    if (days === 0) return "Today";
    if (days === 1) return "1 day ago";
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case "helpful":
        return b.helpful.count - a.helpful.count;
      case "recent":
        return b.timestamp.getTime() - a.timestamp.getTime();
      case "rating":
        return b.rating - a.rating;
      case "detailed":
        return b.qualityScore - a.qualityScore;
      default:
        return 0;
    }
  });

  const filteredReviews = sortedReviews.filter((review) => {
    const matchesRating =
      filterRating === null || review.rating === filterRating;
    const matchesTripType =
      filterTripType === "all" || review.tripType === filterTripType;
    return matchesRating && matchesTripType;
  });

  const handleHelpfulVote = (reviewId: string, isHelpful: boolean) => {
    // Handle helpful/not helpful voting
    console.log(
      `Voted ${isHelpful ? "helpful" : "not helpful"} for review ${reviewId}`,
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Guest Reviews</h2>
        <p className="text-gray-600">
          Help fellow travelers by marking helpful reviews
        </p>
      </div>

      {/* Filters and Sorting */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <SortAsc className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="border rounded-md px-3 py-1 text-sm"
              >
                <option value="helpful">Most Helpful</option>
                <option value="recent">Most Recent</option>
                <option value="rating">Highest Rating</option>
                <option value="detailed">Most Detailed</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">Rating:</span>
              <select
                value={filterRating || ""}
                onChange={(e) =>
                  setFilterRating(
                    e.target.value ? parseInt(e.target.value) : null,
                  )
                }
                className="border rounded-md px-3 py-1 text-sm"
              >
                <option value="">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Trip Type:</span>
              <select
                value={filterTripType}
                onChange={(e) => setFilterTripType(e.target.value)}
                className="border rounded-md px-3 py-1 text-sm"
              >
                <option value="all">All Types</option>
                <option value="business">Business</option>
                <option value="leisure">Leisure</option>
                <option value="family">Family</option>
                <option value="solo">Solo</option>
                <option value="couple">Couple</option>
                <option value="friends">Friends</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.map((review) => {
          const qualityInfo = getQualityBadge(review.qualityScore);

          return (
            <Card key={review.id} className="overflow-hidden">
              <CardContent className="p-6">
                {/* Review Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={review.reviewer.avatar} />
                      <AvatarFallback>
                        {review.reviewer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold">
                          {review.reviewer.name}
                        </span>
                        {review.reviewer.verified && (
                          <CheckCircle className="w-4 h-4 text-blue-500" />
                        )}
                        {getLevelBadge(review.reviewer.level)}
                        {review.verified && (
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            <Shield className="w-3 h-3 mr-1" />
                            Verified Stay
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{review.reviewer.totalReviews} reviews</span>
                        <span>{review.reviewer.helpfulReviews} helpful</span>
                        <span>
                          Member since{" "}
                          {new Date(review.reviewer.memberSince).getFullYear()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${star <= review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatTimeAgo(review.timestamp)}
                    </div>
                  </div>
                </div>

                {/* Property and Trip Info */}
                <div className="flex items-center space-x-4 mb-4 p-3 bg-gray-50 rounded-lg">
                  <img
                    src={review.property.image}
                    alt={review.property.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{review.property.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{review.property.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {new Date(
                            review.stayDates.start,
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <span className="capitalize">{review.tripType} trip</span>
                      <span>{review.roomType}</span>
                    </div>
                  </div>
                </div>

                {/* Review Content */}
                <div className="mb-4">
                  <h3 className="font-semibold text-lg mb-2">{review.title}</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {review.content}
                  </p>
                </div>

                {/* Pros and Cons */}
                {(review.pros.length > 0 || review.cons.length > 0) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {review.pros.length > 0 && (
                      <div>
                        <h4 className="font-medium text-green-700 mb-2 flex items-center">
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          What guests loved
                        </h4>
                        <ul className="space-y-1">
                          {review.pros.map((pro, index) => (
                            <li
                              key={index}
                              className="text-sm text-green-700 flex items-start"
                            >
                              <span className="mr-2">•</span>
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {review.cons.length > 0 && (
                      <div>
                        <h4 className="font-medium text-orange-700 mb-2 flex items-center">
                          <ThumbsDown className="w-4 h-4 mr-1" />
                          Areas for improvement
                        </h4>
                        <ul className="space-y-1">
                          {review.cons.map((con, index) => (
                            <li
                              key={index}
                              className="text-sm text-orange-700 flex items-start"
                            >
                              <span className="mr-2">•</span>
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Photos */}
                {review.photos.length > 0 && (
                  <div className="mb-4">
                    <div className="flex space-x-2 overflow-x-auto">
                      {review.photos.map((photo, index) => (
                        <img
                          key={index}
                          src={photo}
                          alt={`Review photo ${index + 1}`}
                          className="w-24 h-24 object-cover rounded-lg flex-shrink-0 cursor-pointer hover:opacity-80"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Review Quality Indicators */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className={`${qualityInfo.color} text-xs`}>
                    <Award className="w-3 h-3 mr-1" />
                    {qualityInfo.label} Review
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {review.helpfulnessRatio.toFixed(1)}% helpful
                  </Badge>
                  <Badge variant="outline" className="text-xs capitalize">
                    {review.detailLevel}
                  </Badge>
                  {review.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Host Response */}
                {review.responses.host && (
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className="bg-blue-100 text-blue-800 text-xs">
                        Host Response
                      </Badge>
                      <span className="text-xs text-gray-600">
                        {formatTimeAgo(review.responses.host.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-blue-900">
                      {review.responses.host.content}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant={review.isHelpful ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleHelpfulVote(review.id, true)}
                        className="flex items-center space-x-1"
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span>Helpful ({review.helpful.count})</span>
                      </Button>
                      <Button
                        variant={
                          review.isNotHelpful ? "destructive" : "outline"
                        }
                        size="sm"
                        onClick={() => handleHelpfulVote(review.id, false)}
                        className="flex items-center space-x-1"
                      >
                        <ThumbsDown className="w-4 h-4" />
                        <span>({review.notHelpful.count})</span>
                      </Button>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <TrendingUp className="w-4 h-4" />
                      <span>
                        {review.helpful.count + review.notHelpful.count} votes
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Reply
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share className="w-4 h-4 mr-1" />
                      Share
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Flag className="w-4 h-4 mr-1" />
                      Report
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Helpfulness Guidelines */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ThumbsUp className="w-5 h-5 text-blue-500" />
            <span>How to Mark Reviews as Helpful</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-green-700 mb-3">
                Mark as Helpful if the review:
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Provides specific, detailed information</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Includes both pros and cons</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Contains relevant photos</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Gives context about the trip type</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Offers practical tips and insights</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-red-700 mb-3">
                Mark as Not Helpful if the review:
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <X className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Is too short or vague</span>
                </li>
                <li className="flex items-start">
                  <X className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Contains inappropriate content</span>
                </li>
                <li className="flex items-start">
                  <X className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Seems fake or biased</span>
                </li>
                <li className="flex items-start">
                  <X className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Focuses only on personal preferences</span>
                </li>
                <li className="flex items-start">
                  <X className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Is not relevant to the property</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
