import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Star,
  ThumbsUp,
  ThumbsDown,
  Share,
  Flag,
  Camera,
  Upload,
  Mic,
  MicOff,
  VideoIcon as Video,
  VideoOff,
  RotateCcw,
  Download,
  Calendar,
  MapPin,
  Eye,
  MessageCircle,
  Shield,
  CheckCircle,
  Filter,
  Search,
  MoreVertical,
} from "lucide-react";

interface VideoReview {
  id: string;
  reviewer: {
    id: string;
    name: string;
    avatar: string;
    verified: boolean;
    totalReviews: number;
    memberSince: string;
  };
  property: {
    id: string;
    name: string;
    location: string;
    image: string;
  };
  video: {
    url: string;
    thumbnail: string;
    duration: number;
    quality: "720p" | "1080p" | "4K";
  };
  rating: number;
  title: string;
  transcript?: string;
  stayDates: {
    start: string;
    end: string;
  };
  highlights: string[];
  tags: string[];
  likes: number;
  dislikes: number;
  views: number;
  comments: number;
  timestamp: Date;
  helpful: number;
  isHelpful: boolean;
  isLiked: boolean;
  isDisliked: boolean;
  language: string;
  subtitles: boolean;
  verified: boolean;
}

export const VideoReviews: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoReview | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [videoReviews] = useState<VideoReview[]>([
    {
      id: "1",
      reviewer: {
        id: "1",
        name: "Sarah Johnson",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100&h=100&fit=crop&crop=face",
        verified: true,
        totalReviews: 23,
        memberSince: "2022-01-15",
      },
      property: {
        id: "1",
        name: "Beachfront Villa Goa",
        location: "Candolim Beach, Goa",
        image:
          "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=200&h=120&fit=crop",
      },
      video: {
        url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
        thumbnail:
          "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=300&fit=crop",
        duration: 180, // 3 minutes
        quality: "1080p",
      },
      rating: 5,
      title: "Perfect Beachfront Getaway - Everything You Need to Know!",
      transcript:
        "Hi everyone! I just spent the most amazing week at this beachfront villa in Goa, and I had to share my experience with you all. From the moment I walked in, I was blown away by the stunning ocean views...",
      stayDates: {
        start: "2024-11-15",
        end: "2024-11-22",
      },
      highlights: [
        "Ocean views",
        "Private pool",
        "Responsive host",
        "Great location",
      ],
      tags: ["beachfront", "family-friendly", "pool", "luxury"],
      likes: 127,
      dislikes: 3,
      views: 2840,
      comments: 34,
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      helpful: 89,
      isHelpful: true,
      isLiked: true,
      isDisliked: false,
      language: "English",
      subtitles: true,
      verified: true,
    },
    {
      id: "2",
      reviewer: {
        id: "2",
        name: "Marco Silva",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        verified: true,
        totalReviews: 15,
        memberSince: "2021-08-20",
      },
      property: {
        id: "2",
        name: "Mumbai Central Apartment",
        location: "Bandra West, Mumbai",
        image:
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200&h=120&fit=crop",
      },
      video: {
        url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
        thumbnail:
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
        duration: 240, // 4 minutes
        quality: "720p",
      },
      rating: 4,
      title: "Modern Apartment in Heart of Mumbai - Detailed Tour",
      transcript:
        "Hey travelers! Let me give you a complete walkthrough of this fantastic apartment in Bandra. The location is unbeatable - you're walking distance from everything...",
      stayDates: {
        start: "2024-11-10",
        end: "2024-11-17",
      },
      highlights: [
        "Central location",
        "Modern amenities",
        "Great transport links",
        "Shopping nearby",
      ],
      tags: ["city-center", "modern", "transport", "business"],
      likes: 89,
      dislikes: 7,
      views: 1560,
      comments: 22,
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      helpful: 67,
      isHelpful: false,
      isLiked: false,
      isDisliked: false,
      language: "English",
      subtitles: true,
      verified: true,
    },
    {
      id: "3",
      reviewer: {
        id: "3",
        name: "Priya Patel",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        verified: false,
        totalReviews: 8,
        memberSince: "2023-03-10",
      },
      property: {
        id: "3",
        name: "Heritage Homestay Kerala",
        location: "Alleppey, Kerala",
        image:
          "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=200&h=120&fit=crop",
      },
      video: {
        url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4",
        thumbnail:
          "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=400&h=300&fit=crop",
        duration: 360, // 6 minutes
        quality: "1080p",
      },
      rating: 5,
      title: "Authentic Kerala Experience - Backwaters & Traditional Food",
      transcript:
        "Namaste! I want to share my incredible experience at this traditional homestay in Kerala. The backwaters, the food, the hospitality - everything was beyond my expectations...",
      stayDates: {
        start: "2024-10-20",
        end: "2024-10-27",
      },
      highlights: [
        "Authentic experience",
        "Amazing food",
        "Backwater access",
        "Friendly hosts",
      ],
      tags: ["traditional", "authentic", "backwaters", "food", "culture"],
      likes: 156,
      dislikes: 2,
      views: 3240,
      comments: 45,
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      helpful: 134,
      isHelpful: false,
      isLiked: false,
      isDisliked: false,
      language: "English",
      subtitles: true,
      verified: false,
    },
  ]);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
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

  const filteredReviews = videoReviews.filter((review) => {
    const matchesRating =
      filterRating === null || review.rating === filterRating;
    const matchesSearch =
      review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.reviewer.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRating && matchesSearch;
  });

  const RecordVideoModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Record Video Review</CardTitle>
            <Button variant="ghost" onClick={() => setShowRecordModal(false)}>
              ×
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-gray-900 rounded-lg p-8 text-center">
            <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-white mb-4">Camera preview will appear here</p>
            <div className="flex items-center justify-center space-x-4">
              <Button variant="outline" className="bg-white">
                <Camera className="w-4 h-4 mr-2" />
                Start Camera
              </Button>
              <Button variant="outline" className="bg-white">
                <Upload className="w-4 h-4 mr-2" />
                Upload Video
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Property</label>
              <select className="w-full p-2 border rounded-md">
                <option>Select property you stayed at</option>
                <option>Beachfront Villa Goa</option>
                <option>Mumbai Central Apartment</option>
                <option>Heritage Homestay Kerala</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Rating</label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-6 h-6 text-gray-300 hover:text-yellow-400 cursor-pointer"
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Video Title
            </label>
            <input
              type="text"
              placeholder="Give your video review a catchy title..."
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Key Highlights
            </label>
            <input
              type="text"
              placeholder="e.g., Great location, Amazing view, Responsive host..."
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="subtitles" defaultChecked />
              <label htmlFor="subtitles" className="text-sm">
                Auto-generate subtitles
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="public" defaultChecked />
              <label htmlFor="public" className="text-sm">
                Make public
              </label>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button className="flex-1">
              <Video className="w-4 h-4 mr-2" />
              Start Recording
            </Button>
            <Button variant="outline" onClick={() => setShowRecordModal(false)}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Video Reviews
            </h2>
            <p className="text-gray-600">
              See authentic experiences through guest videos
            </p>
          </div>
          <Button onClick={() => setShowRecordModal(true)}>
            <Camera className="w-4 h-4 mr-2" />
            Record Review
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search video reviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Rating Filter */}
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium">Filter by rating:</span>
          <div className="flex space-x-2">
            <Button
              variant={filterRating === null ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterRating(null)}
            >
              All
            </Button>
            {[5, 4, 3, 2, 1].map((rating) => (
              <Button
                key={rating}
                variant={filterRating === rating ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterRating(rating)}
                className="flex items-center space-x-1"
              >
                <span>{rating}</span>
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Video Reviews Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredReviews.map((review) => (
          <Card
            key={review.id}
            className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="relative" onClick={() => setSelectedVideo(review)}>
              <img
                src={review.video.thumbnail}
                alt={review.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Play className="w-12 h-12 text-white" />
              </div>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                {formatDuration(review.video.duration)}
              </div>
              <div className="absolute top-2 left-2 flex space-x-2">
                <Badge className="bg-black bg-opacity-70 text-white">
                  {review.video.quality}
                </Badge>
                {review.verified && (
                  <Badge className="bg-blue-500 text-white">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <div className="absolute top-2 right-2">
                <div className="flex items-center space-x-1 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span>{review.rating}</span>
                </div>
              </div>
            </div>

            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                {review.title}
              </h3>

              {/* Reviewer Info */}
              <div className="flex items-center space-x-3 mb-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={review.reviewer.avatar} />
                  <AvatarFallback>
                    {review.reviewer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm">
                      {review.reviewer.name}
                    </span>
                    {review.reviewer.verified && (
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                    )}
                  </div>
                  <div className="text-xs text-gray-500">
                    {review.reviewer.totalReviews} reviews • Member since{" "}
                    {new Date(review.reviewer.memberSince).getFullYear()}
                  </div>
                </div>
              </div>

              {/* Property Info */}
              <div className="flex items-center space-x-3 mb-3">
                <img
                  src={review.property.image}
                  alt={review.property.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <h4 className="font-medium text-sm">
                    {review.property.name}
                  </h4>
                  <div className="flex items-center space-x-1 text-xs text-gray-600">
                    <MapPin className="w-3 h-3" />
                    <span>{review.property.location}</span>
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="mb-3">
                <div className="flex flex-wrap gap-1">
                  {review.highlights.slice(0, 3).map((highlight, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {highlight}
                    </Badge>
                  ))}
                  {review.highlights.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{review.highlights.length - 3}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{formatViews(review.views)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{review.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{review.comments}</span>
                  </div>
                </div>
                <span>{formatTimeAgo(review.timestamp)}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={review.isLiked ? "text-blue-500" : ""}
                  >
                    <ThumbsUp
                      className={`w-4 h-4 ${review.isLiked ? "fill-current" : ""}`}
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={review.isDisliked ? "text-red-500" : ""}
                  >
                    <ThumbsDown
                      className={`w-4 h-4 ${review.isDisliked ? "fill-current" : ""}`}
                    />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="max-w-6xl w-full max-h-[90vh] bg-white rounded-lg overflow-hidden">
            <div className="flex h-full">
              {/* Video Player */}
              <div className="flex-1 bg-black flex items-center justify-center relative">
                <video
                  className="max-w-full max-h-full"
                  controls
                  autoPlay
                  poster={selectedVideo.video.thumbnail}
                >
                  <source src={selectedVideo.video.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                <Button
                  variant="ghost"
                  className="absolute top-4 right-4 text-white bg-black/50"
                  onClick={() => setSelectedVideo(null)}
                >
                  ×
                </Button>
              </div>

              {/* Video Info Sidebar */}
              <div className="w-96 flex flex-col max-h-full">
                <div className="p-4 border-b">
                  <h3 className="font-semibold text-lg mb-2">
                    {selectedVideo.title}
                  </h3>

                  <div className="flex items-center space-x-3 mb-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={selectedVideo.reviewer.avatar} />
                      <AvatarFallback>
                        {selectedVideo.reviewer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">
                          {selectedVideo.reviewer.name}
                        </span>
                        {selectedVideo.reviewer.verified && (
                          <CheckCircle className="w-4 h-4 text-blue-500" />
                        )}
                      </div>
                      <div className="text-sm text-gray-600">
                        {selectedVideo.reviewer.totalReviews} reviews
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{formatViews(selectedVideo.views)} views</span>
                    </div>
                    <span>{formatTimeAgo(selectedVideo.timestamp)}</span>
                  </div>

                  <div className="flex items-center space-x-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${star <= selectedVideo.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="ml-2 font-medium">
                      {selectedVideo.rating}/5
                    </span>
                  </div>
                </div>

                <div className="flex-1 p-4 overflow-y-auto">
                  {/* Property Info */}
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Property</h4>
                    <div className="flex items-center space-x-3">
                      <img
                        src={selectedVideo.property.image}
                        alt={selectedVideo.property.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <div className="font-medium">
                          {selectedVideo.property.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {selectedVideo.property.location}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stay Dates */}
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Stayed{" "}
                        {new Date(
                          selectedVideo.stayDates.start,
                        ).toLocaleDateString()}{" "}
                        -{" "}
                        {new Date(
                          selectedVideo.stayDates.end,
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Highlights</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedVideo.highlights.map((highlight, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Transcript */}
                  {selectedVideo.transcript && (
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Transcript</h4>
                      <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded max-h-32 overflow-y-auto">
                        {selectedVideo.transcript}
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedVideo.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant={selectedVideo.isLiked ? "default" : "outline"}
                        size="sm"
                        className="flex items-center space-x-2"
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span>{selectedVideo.likes}</span>
                      </Button>
                      <Button
                        variant={
                          selectedVideo.isDisliked ? "destructive" : "outline"
                        }
                        size="sm"
                        className="flex items-center space-x-2"
                      >
                        <ThumbsDown className="w-4 h-4" />
                        <span>{selectedVideo.dislikes}</span>
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Share className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Flag className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="text-center">
                    <Button
                      variant={selectedVideo.isHelpful ? "default" : "outline"}
                      className="w-full"
                    >
                      <ThumbsUp className="w-4 h-4 mr-2" />
                      {selectedVideo.isHelpful
                        ? "Marked as Helpful"
                        : "Mark as Helpful"}
                    </Button>
                    <div className="text-xs text-gray-500 mt-1">
                      {selectedVideo.helpful} people found this helpful
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Record Video Modal */}
      {showRecordModal && <RecordVideoModal />}
    </div>
  );
};
