import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageCircleIcon,
  SearchIcon,
  TrendingUpIcon,
  ClockIcon,
  UsersIcon,
  ThumbsUpIcon,
  MessageSquareIcon,
  PinIcon,
  StarIcon,
  EyeIcon,
  PlusIcon,
  FilterIcon,
  HomeIcon,
  IndianRupeeIcon,
  CameraIcon,
  ShieldIcon,
  HelpCircleIcon,
} from "lucide-react";

const CommunityForum = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const forumCategories = [
    {
      id: "getting-started",
      name: "Getting Started",
      icon: HomeIcon,
      description: "New host questions and basics",
      posts: 1247,
      members: 8932,
      color: "bg-blue-500",
    },
    {
      id: "hosting-tips",
      name: "Hosting Tips & Tricks",
      icon: StarIcon,
      description: "Share experiences and best practices",
      posts: 2156,
      members: 12045,
      color: "bg-green-500",
    },
    {
      id: "pricing-revenue",
      name: "Pricing & Revenue",
      icon: IndianRupeeIcon,
      description: "Discuss pricing strategies and earnings",
      posts: 943,
      members: 7832,
      color: "bg-orange-500",
    },
    {
      id: "photography",
      name: "Photography & Listings",
      icon: CameraIcon,
      description: "Improve your listing photos and descriptions",
      posts: 687,
      members: 5421,
      color: "bg-purple-500",
    },
    {
      id: "safety-legal",
      name: "Safety & Legal",
      icon: ShieldIcon,
      description: "Safety concerns and legal questions",
      posts: 534,
      members: 4298,
      color: "bg-red-500",
    },
    {
      id: "general-help",
      name: "General Help",
      icon: HelpCircleIcon,
      description: "General questions and platform help",
      posts: 1872,
      members: 15672,
      color: "bg-gray-500",
    },
  ];

  const featuredPosts = [
    {
      id: 1,
      title: "How I increased my bookings by 300% in 6 months",
      author: "Priya Sharma",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b9493bd0?w=150&h=150&fit=crop&crop=face",
      category: "Hosting Tips & Tricks",
      replies: 45,
      likes: 127,
      views: 2340,
      timeAgo: "2 hours ago",
      featured: true,
      tags: ["success-story", "optimization", "marketing"],
    },
    {
      id: 2,
      title: "Essential safety measures every host should implement",
      author: "Rajesh Kumar",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      category: "Safety & Legal",
      replies: 32,
      likes: 89,
      views: 1876,
      timeAgo: "4 hours ago",
      featured: true,
      tags: ["safety", "guest-protection", "guidelines"],
    },
    {
      id: 3,
      title: "Photography guide: Before and after listing makeover",
      author: "Meera Patel",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      category: "Photography & Listings",
      replies: 28,
      likes: 156,
      views: 3421,
      timeAgo: "6 hours ago",
      featured: true,
      tags: ["photography", "listing-optimization", "makeover"],
    },
  ];

  const recentPosts = [
    {
      id: 4,
      title: "New host here - questions about pricing in Mumbai",
      author: "Ankit Singh",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      category: "Getting Started",
      replies: 12,
      likes: 8,
      views: 145,
      timeAgo: "30 minutes ago",
      tags: ["pricing", "mumbai", "new-host"],
    },
    {
      id: 5,
      title: "Guest left a negative review - how to handle?",
      author: "Kavita Reddy",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      category: "General Help",
      replies: 7,
      likes: 15,
      views: 89,
      timeAgo: "1 hour ago",
      tags: ["reviews", "guest-issues", "help"],
    },
    {
      id: 6,
      title: "Best cleaning service recommendations for Bangalore?",
      author: "Dev Sharma",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      category: "Hosting Tips & Tricks",
      replies: 19,
      likes: 23,
      views: 267,
      timeAgo: "2 hours ago",
      tags: ["cleaning", "bangalore", "services"],
    },
    {
      id: 7,
      title: "Tax implications for short-term rental income in India",
      author: "CA Ravi Gupta",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      category: "Safety & Legal",
      replies: 34,
      likes: 67,
      views: 892,
      timeAgo: "3 hours ago",
      tags: ["taxes", "legal", "income", "india"],
    },
  ];

  const topContributors = [
    {
      name: "Priya Sharma",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b9493bd0?w=150&h=150&fit=crop&crop=face",
      posts: 234,
      reputation: 4876,
      badge: "Expert Host",
    },
    {
      name: "Rajesh Kumar",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      posts: 189,
      reputation: 3942,
      badge: "Safety Specialist",
    },
    {
      name: "Meera Patel",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      posts: 156,
      reputation: 3021,
      badge: "Photo Pro",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
          <div className="container text-center">
            <MessageCircleIcon className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Host Community Forum
            </h1>
            <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
              Connect with 50,000+ hosts across India. Share experiences, get
              advice, and grow your hosting business together.
            </p>
            <div className="flex items-center justify-center space-x-8 text-indigo-100">
              <div className="text-center">
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-sm">Active Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">12K+</div>
                <div className="text-sm">Daily Posts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm">Questions Answered</div>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Actions */}
        <section className="py-8 bg-gray-50">
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-lg">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search discussions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline">
                  <FilterIcon className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button>
                  <PlusIcon className="mr-2 h-4 w-4" />
                  New Post
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <Tabs defaultValue="all" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All Posts</TabsTrigger>
                    <TabsTrigger value="featured">Featured</TabsTrigger>
                    <TabsTrigger value="trending">Trending</TabsTrigger>
                    <TabsTrigger value="recent">Recent</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-6">
                    {/* Featured Posts */}
                    <div>
                      <div className="flex items-center space-x-2 mb-4">
                        <PinIcon className="h-5 w-5 text-orange-500" />
                        <h2 className="text-xl font-semibold">
                          Featured Discussions
                        </h2>
                      </div>
                      <div className="space-y-4">
                        {featuredPosts.map((post) => (
                          <Card
                            key={post.id}
                            className="hover:shadow-lg transition-shadow"
                          >
                            <CardContent className="p-6">
                              <div className="flex items-start space-x-4">
                                <Avatar className="w-12 h-12">
                                  <AvatarImage
                                    src={post.avatar}
                                    alt={post.author}
                                  />
                                  <AvatarFallback>
                                    {post.author[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <Badge variant="secondary">
                                      {post.category}
                                    </Badge>
                                    <Badge className="bg-orange-100 text-orange-800">
                                      Featured
                                    </Badge>
                                    {post.tags.map((tag) => (
                                      <Badge
                                        key={tag}
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                  <h3 className="text-lg font-semibold mb-2 hover:text-blue-600 cursor-pointer">
                                    {post.title}
                                  </h3>
                                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                                    <span className="font-medium text-gray-700">
                                      {post.author}
                                    </span>
                                    <div className="flex items-center">
                                      <MessageSquareIcon className="h-4 w-4 mr-1" />
                                      {post.replies}
                                    </div>
                                    <div className="flex items-center">
                                      <ThumbsUpIcon className="h-4 w-4 mr-1" />
                                      {post.likes}
                                    </div>
                                    <div className="flex items-center">
                                      <EyeIcon className="h-4 w-4 mr-1" />
                                      {post.views}
                                    </div>
                                    <div className="flex items-center">
                                      <ClockIcon className="h-4 w-4 mr-1" />
                                      {post.timeAgo}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Recent Posts */}
                    <div>
                      <h2 className="text-xl font-semibold mb-4">
                        Recent Discussions
                      </h2>
                      <div className="space-y-4">
                        {recentPosts.map((post) => (
                          <Card
                            key={post.id}
                            className="hover:shadow-lg transition-shadow"
                          >
                            <CardContent className="p-6">
                              <div className="flex items-start space-x-4">
                                <Avatar className="w-10 h-10">
                                  <AvatarImage
                                    src={post.avatar}
                                    alt={post.author}
                                  />
                                  <AvatarFallback>
                                    {post.author[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <Badge variant="secondary">
                                      {post.category}
                                    </Badge>
                                    {post.tags.map((tag) => (
                                      <Badge
                                        key={tag}
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                  <h3 className="font-semibold mb-2 hover:text-blue-600 cursor-pointer">
                                    {post.title}
                                  </h3>
                                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                                    <span className="font-medium text-gray-700">
                                      {post.author}
                                    </span>
                                    <div className="flex items-center">
                                      <MessageSquareIcon className="h-4 w-4 mr-1" />
                                      {post.replies}
                                    </div>
                                    <div className="flex items-center">
                                      <ThumbsUpIcon className="h-4 w-4 mr-1" />
                                      {post.likes}
                                    </div>
                                    <div className="flex items-center">
                                      <EyeIcon className="h-4 w-4 mr-1" />
                                      {post.views}
                                    </div>
                                    <div className="flex items-center">
                                      <ClockIcon className="h-4 w-4 mr-1" />
                                      {post.timeAgo}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="featured">
                    <div className="space-y-4">
                      {featuredPosts.map((post) => (
                        <Card
                          key={post.id}
                          className="hover:shadow-lg transition-shadow"
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start space-x-4">
                              <Avatar className="w-12 h-12">
                                <AvatarImage
                                  src={post.avatar}
                                  alt={post.author}
                                />
                                <AvatarFallback>
                                  {post.author[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <Badge variant="secondary">
                                    {post.category}
                                  </Badge>
                                  <Badge className="bg-orange-100 text-orange-800">
                                    Featured
                                  </Badge>
                                </div>
                                <h3 className="text-lg font-semibold mb-2 hover:text-blue-600 cursor-pointer">
                                  {post.title}
                                </h3>
                                <div className="flex items-center space-x-6 text-sm text-gray-500">
                                  <span className="font-medium text-gray-700">
                                    {post.author}
                                  </span>
                                  <div className="flex items-center">
                                    <MessageSquareIcon className="h-4 w-4 mr-1" />
                                    {post.replies}
                                  </div>
                                  <div className="flex items-center">
                                    <ThumbsUpIcon className="h-4 w-4 mr-1" />
                                    {post.likes}
                                  </div>
                                  <div className="flex items-center">
                                    <EyeIcon className="h-4 w-4 mr-1" />
                                    {post.views}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="trending">
                    <div className="space-y-4">
                      {[...featuredPosts, ...recentPosts]
                        .sort((a, b) => b.likes - a.likes)
                        .slice(0, 5)
                        .map((post) => (
                          <Card
                            key={post.id}
                            className="hover:shadow-lg transition-shadow"
                          >
                            <CardContent className="p-6">
                              <div className="flex items-start space-x-4">
                                <Avatar className="w-10 h-10">
                                  <AvatarImage
                                    src={post.avatar}
                                    alt={post.author}
                                  />
                                  <AvatarFallback>
                                    {post.author[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <Badge variant="secondary">
                                      {post.category}
                                    </Badge>
                                    <TrendingUpIcon className="h-4 w-4 text-red-500" />
                                  </div>
                                  <h3 className="font-semibold mb-2 hover:text-blue-600 cursor-pointer">
                                    {post.title}
                                  </h3>
                                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                                    <span className="font-medium text-gray-700">
                                      {post.author}
                                    </span>
                                    <div className="flex items-center">
                                      <ThumbsUpIcon className="h-4 w-4 mr-1" />
                                      {post.likes}
                                    </div>
                                    <div className="flex items-center">
                                      <MessageSquareIcon className="h-4 w-4 mr-1" />
                                      {post.replies}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="recent">
                    <div className="space-y-4">
                      {recentPosts.map((post) => (
                        <Card
                          key={post.id}
                          className="hover:shadow-lg transition-shadow"
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start space-x-4">
                              <Avatar className="w-10 h-10">
                                <AvatarImage
                                  src={post.avatar}
                                  alt={post.author}
                                />
                                <AvatarFallback>
                                  {post.author[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <Badge variant="secondary">
                                    {post.category}
                                  </Badge>
                                </div>
                                <h3 className="font-semibold mb-2 hover:text-blue-600 cursor-pointer">
                                  {post.title}
                                </h3>
                                <div className="flex items-center space-x-6 text-sm text-gray-500">
                                  <span className="font-medium text-gray-700">
                                    {post.author}
                                  </span>
                                  <div className="flex items-center">
                                    <ClockIcon className="h-4 w-4 mr-1" />
                                    {post.timeAgo}
                                  </div>
                                  <div className="flex items-center">
                                    <MessageSquareIcon className="h-4 w-4 mr-1" />
                                    {post.replies}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Categories */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Forum Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {forumCategories.map((category) => (
                        <div
                          key={category.id}
                          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                        >
                          <div
                            className={`w-8 h-8 ${category.color} rounded-lg flex items-center justify-center`}
                          >
                            <category.icon className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-sm">
                              {category.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {category.posts} posts
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Top Contributors */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Top Contributors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {topContributors.map((contributor, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3"
                        >
                          <Avatar className="w-10 h-10">
                            <AvatarImage
                              src={contributor.avatar}
                              alt={contributor.name}
                            />
                            <AvatarFallback>
                              {contributor.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-medium text-sm">
                              {contributor.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {contributor.posts} posts •{" "}
                              {contributor.reputation} reputation
                            </div>
                            <Badge variant="outline" className="text-xs mt-1">
                              {contributor.badge}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Community Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Community Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Total Members
                        </span>
                        <span className="font-medium">52,341</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Posts Today
                        </span>
                        <span className="font-medium">127</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Active Now
                        </span>
                        <span className="font-medium">892</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Questions Answered
                        </span>
                        <span className="font-medium">98.2%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Community Guidelines */}
        <section className="py-16 bg-blue-50">
          <div className="container">
            <Card className="max-w-4xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Community Guidelines</CardTitle>
                <p className="text-gray-600">
                  Help us maintain a helpful and respectful community
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3 text-green-700">Do:</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                        <span>Be helpful and share your experiences</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                        <span>Search before posting duplicate questions</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                        <span>Use clear, descriptive titles</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                        <span>
                          Respect different perspectives and experiences
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 text-red-700">Don't:</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                        <span>Share personal guest information</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                        <span>Post spam or promotional content</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                        <span>Use offensive or inappropriate language</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                        <span>Share contact information publicly</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CommunityForum;
