import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Camera,
  Heart,
  MessageCircle,
  Share,
  Upload,
  MapPin,
  Star,
  Calendar,
  Eye,
  Award,
  Filter,
  Grid3X3,
  List,
  Search,
  Download,
  Flag,
  MoreHorizontal,
  ThumbsUp,
  Bookmark,
  Send,
  Tag,
  Users,
  Shield,
} from "lucide-react";

interface PhotoPost {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
    verified: boolean;
    stayCount: number;
  };
  property: {
    id: string;
    name: string;
    location: string;
  };
  images: string[];
  caption: string;
  tags: string[];
  location: string;
  timestamp: Date;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isBookmarked: boolean;
  stayDates: {
    start: string;
    end: string;
  };
  rating?: number;
  category: "room" | "amenity" | "view" | "food" | "activity" | "other";
}

interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: Date;
  likes: number;
}

export const PhotoSharing: React.FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PhotoPost | null>(null);

  const [photoPosts] = useState<PhotoPost[]>([
    {
      id: "1",
      user: {
        id: "1",
        name: "Sarah Johnson",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100&h=100&fit=crop&crop=face",
        verified: true,
        stayCount: 12,
      },
      property: {
        id: "1",
        name: "Beachfront Villa Goa",
        location: "Candolim Beach, Goa",
      },
      images: [
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
      ],
      caption:
        "Woke up to this incredible sunrise view from our beachfront villa! The sound of waves and this golden light made for a perfect morning. Highly recommend this place for couples seeking a romantic getaway 🌅✨",
      tags: ["sunrise", "beachfront", "romantic", "goa", "villa"],
      location: "Candolim Beach, Goa",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 142,
      comments: 23,
      shares: 8,
      isLiked: false,
      isBookmarked: true,
      stayDates: {
        start: "2024-12-15",
        end: "2024-12-22",
      },
      rating: 5,
      category: "view",
    },
    {
      id: "2",
      user: {
        id: "2",
        name: "Marco Silva",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        verified: true,
        stayCount: 8,
      },
      property: {
        id: "1",
        name: "Beachfront Villa Goa",
        location: "Candolim Beach, Goa",
      },
      images: [
        "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&h=400&fit=crop",
      ],
      caption:
        "The infinity pool overlooking the ocean is absolutely stunning! Perfect spot for evening relaxation after a day of exploring Goa. The water temperature was just right 🏊‍♂️",
      tags: ["pool", "infinity", "evening", "relaxation"],
      location: "Candolim Beach, Goa",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      likes: 89,
      comments: 12,
      shares: 4,
      isLiked: true,
      isBookmarked: false,
      stayDates: {
        start: "2024-12-16",
        end: "2024-12-23",
      },
      rating: 5,
      category: "amenity",
    },
    {
      id: "3",
      user: {
        id: "3",
        name: "Priya Patel",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        verified: false,
        stayCount: 5,
      },
      property: {
        id: "2",
        name: "Traditional Goan House",
        location: "Old Goa",
      },
      images: [
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600&h=400&fit=crop",
      ],
      caption:
        "Authentic Goan breakfast served by our wonderful host! Fresh local fruits, traditional breads, and the best cashew feni I've ever tasted. This is what authentic travel experiences are made of! 🥭🍞",
      tags: ["breakfast", "authentic", "local", "traditional", "food"],
      location: "Old Goa",
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      likes: 67,
      comments: 18,
      shares: 12,
      isLiked: false,
      isBookmarked: true,
      stayDates: {
        start: "2024-12-14",
        end: "2024-12-21",
      },
      rating: 4,
      category: "food",
    },
  ]);

  const categories = [
    { value: "all", label: "All Photos", count: photoPosts.length },
    { value: "room", label: "Rooms", count: 12 },
    { value: "view", label: "Views", count: 8 },
    { value: "amenity", label: "Amenities", count: 15 },
    { value: "food", label: "Food", count: 6 },
    { value: "activity", label: "Activities", count: 9 },
  ];

  const formatTimeAgo = (date: Date) => {
    const hours = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60));
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const handleLike = (postId: string) => {
    // Handle like functionality
  };

  const handleBookmark = (postId: string) => {
    // Handle bookmark functionality
  };

  const PhotoUploadModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Share Your Experience</CardTitle>
            <Button variant="ghost" onClick={() => setShowUploadModal(false)}>
              ×
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">
              Drag and drop photos here, or click to browse
            </p>
            <Button variant="outline">
              <Camera className="w-4 h-4 mr-2" />
              Choose Photos
            </Button>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Caption</label>
            <Textarea
              placeholder="Share your experience at this property..."
              className="min-h-[100px]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <Input placeholder="Add location..." />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tags</label>
            <Input placeholder="Add tags separated by commas..." />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select className="w-full p-2 border rounded-md">
              <option value="room">Room</option>
              <option value="view">View</option>
              <option value="amenity">Amenity</option>
              <option value="food">Food</option>
              <option value="activity">Activity</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" id="rating" />
            <label htmlFor="rating" className="text-sm">
              Include rating with this post
            </label>
          </div>

          <div className="flex space-x-3">
            <Button className="flex-1">
              <Send className="w-4 h-4 mr-2" />
              Share Photo
            </Button>
            <Button variant="outline" onClick={() => setShowUploadModal(false)}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Guest Photos
            </h2>
            <p className="text-gray-600">
              Real experiences shared by travelers
            </p>
          </div>
          <Button onClick={() => setShowUploadModal(true)}>
            <Camera className="w-4 h-4 mr-2" />
            Share Photos
          </Button>
        </div>
      </div>

      {/* Filters and View Controls */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Search photos..." className="pl-10 w-64" />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
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
              <Badge variant="secondary" className="ml-2 text-xs">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      {/* Photo Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photoPosts.map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div className="relative">
                <img
                  src={post.images[0]}
                  alt={post.caption}
                  className="w-full h-64 object-cover"
                />
                {post.images.length > 1 && (
                  <Badge className="absolute top-3 right-3 bg-black/60 text-white">
                    +{post.images.length - 1}
                  </Badge>
                )}
                <div className="absolute bottom-3 left-3 right-3">
                  <Badge className="bg-black/60 text-white text-xs">
                    {post.category}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="flex items-start space-x-3 mb-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={post.user.avatar} />
                    <AvatarFallback>
                      {post.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm">
                        {post.user.name}
                      </span>
                      {post.user.verified && (
                        <Shield className="w-4 h-4 text-blue-500" />
                      )}
                    </div>
                    <div className="text-xs text-gray-600">
                      {post.user.stayCount} stays •{" "}
                      {formatTimeAgo(post.timestamp)}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-700 line-clamp-3 mb-3">
                  {post.caption}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-4">
                    <button
                      className={`flex items-center space-x-1 ${post.isLiked ? "text-red-500" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(post.id);
                      }}
                    >
                      <Heart
                        className={`w-4 h-4 ${post.isLiked ? "fill-current" : ""}`}
                      />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </button>
                  </div>

                  <button
                    className={`${post.isBookmarked ? "text-blue-500" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookmark(post.id);
                    }}
                  >
                    <Bookmark
                      className={`w-4 h-4 ${post.isBookmarked ? "fill-current" : ""}`}
                    />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {photoPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={post.user.avatar} />
                    <AvatarFallback>
                      {post.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{post.user.name}</span>
                          {post.user.verified && (
                            <Shield className="w-4 h-4 text-blue-500" />
                          )}
                          <Badge variant="outline" className="text-xs">
                            {post.user.stayCount} stays
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 flex items-center space-x-4 mt-1">
                          <span className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{post.property.name}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatTimeAgo(post.timestamp)}</span>
                          </span>
                          {post.rating && (
                            <span className="flex items-center space-x-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span>{post.rating}/5</span>
                            </span>
                          )}
                        </div>
                      </div>

                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>

                    <p className="text-gray-700 mb-4">{post.caption}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                      {post.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${post.caption} - ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => setSelectedPost(post)}
                        />
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <button
                          className={`flex items-center space-x-2 ${post.isLiked ? "text-red-500" : "text-gray-600"}`}
                          onClick={() => handleLike(post.id)}
                        >
                          <Heart
                            className={`w-5 h-5 ${post.isLiked ? "fill-current" : ""}`}
                          />
                          <span>{post.likes} likes</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-600">
                          <MessageCircle className="w-5 h-5" />
                          <span>{post.comments} comments</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-600">
                          <Share className="w-5 h-5" />
                          <span>{post.shares} shares</span>
                        </button>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          className={`${post.isBookmarked ? "text-blue-500" : "text-gray-600"}`}
                          onClick={() => handleBookmark(post.id)}
                        >
                          <Bookmark
                            className={`w-5 h-5 ${post.isBookmarked ? "fill-current" : ""}`}
                          />
                        </button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Flag className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Photo Upload Modal */}
      {showUploadModal && <PhotoUploadModal />}

      {/* Photo Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="max-w-4xl w-full max-h-[90vh] bg-white rounded-lg overflow-hidden">
            <div className="flex h-full">
              <div className="flex-1 bg-black flex items-center justify-center">
                <img
                  src={selectedPost.images[0]}
                  alt={selectedPost.caption}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              <div className="w-96 flex flex-col">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={selectedPost.user.avatar} />
                        <AvatarFallback>
                          {selectedPost.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">
                            {selectedPost.user.name}
                          </span>
                          {selectedPost.user.verified && (
                            <Shield className="w-4 h-4 text-blue-500" />
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          {selectedPost.property.name}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={() => setSelectedPost(null)}
                    >
                      ×
                    </Button>
                  </div>
                </div>

                <div className="flex-1 p-4 overflow-y-auto">
                  <p className="text-gray-700 mb-4">{selectedPost.caption}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedPost.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedPost.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Stayed{" "}
                        {new Date(
                          selectedPost.stayDates.start,
                        ).toLocaleDateString()}{" "}
                        -{" "}
                        {new Date(
                          selectedPost.stayDates.end,
                        ).toLocaleDateString()}
                      </span>
                    </div>
                    {selectedPost.rating && (
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>{selectedPost.rating}/5 stars</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 border-t">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <button
                        className={`flex items-center space-x-1 ${selectedPost.isLiked ? "text-red-500" : "text-gray-600"}`}
                        onClick={() => handleLike(selectedPost.id)}
                      >
                        <Heart
                          className={`w-5 h-5 ${selectedPost.isLiked ? "fill-current" : ""}`}
                        />
                        <span>{selectedPost.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-600">
                        <MessageCircle className="w-5 h-5" />
                        <span>{selectedPost.comments}</span>
                      </button>
                    </div>

                    <button
                      className={`${selectedPost.isBookmarked ? "text-blue-500" : "text-gray-600"}`}
                      onClick={() => handleBookmark(selectedPost.id)}
                    >
                      <Bookmark
                        className={`w-5 h-5 ${selectedPost.isBookmarked ? "fill-current" : ""}`}
                      />
                    </button>
                  </div>

                  <div className="flex space-x-2">
                    <Input placeholder="Add a comment..." className="flex-1" />
                    <Button size="sm">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
