import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  HomeIcon,
  BookOpenIcon,
  TrendingUpIcon,
  IndianRupeeIcon,
  CameraIcon,
  MessageCircleIcon,
  ShieldIcon,
  StarIcon,
  UsersIcon,
  CalendarIcon,
  BarChart3Icon,
  LightbulbIcon,
  PlayCircleIcon,
  DownloadIcon,
  ExternalLink,
} from "lucide-react";

const HostResources = () => {
  const resourceCategories = [
    {
      title: "Getting Started",
      icon: HomeIcon,
      color: "bg-blue-500",
      description: "Everything you need to start hosting",
      resources: [
        { title: "Host Onboarding Guide", type: "Guide", time: "15 min read" },
        {
          title: "Creating Your First Listing",
          type: "Video",
          time: "12 min watch",
        },
        { title: "Host Welcome Kit", type: "Download", time: "PDF" },
        {
          title: "Property Photography Tips",
          type: "Guide",
          time: "10 min read",
        },
      ],
    },
    {
      title: "Listing Optimization",
      icon: TrendingUpIcon,
      color: "bg-green-500",
      description: "Improve your listing visibility and bookings",
      resources: [
        { title: "SEO for Your Listing", type: "Guide", time: "20 min read" },
        {
          title: "Pricing Strategy Masterclass",
          type: "Video",
          time: "25 min watch",
        },
        { title: "Seasonal Pricing Tips", type: "Guide", time: "8 min read" },
        {
          title: "Amenities That Matter",
          type: "Research",
          time: "5 min read",
        },
      ],
    },
    {
      title: "Guest Experience",
      icon: UsersIcon,
      color: "bg-purple-500",
      description: "Create memorable experiences for your guests",
      resources: [
        {
          title: "Guest Communication Best Practices",
          type: "Guide",
          time: "15 min read",
        },
        { title: "Creating Welcome Books", type: "Template", time: "Download" },
        { title: "Handling Guest Issues", type: "Video", time: "18 min watch" },
        { title: "Local Experience Ideas", type: "Guide", time: "12 min read" },
      ],
    },
    {
      title: "Financial Management",
      icon: IndianRupeeIcon,
      color: "bg-orange-500",
      description: "Maximize your earnings and manage finances",
      resources: [
        {
          title: "Understanding Host Earnings",
          type: "Guide",
          time: "10 min read",
        },
        { title: "Tax Guide for Hosts", type: "Guide", time: "25 min read" },
        {
          title: "Expense Tracking Templates",
          type: "Download",
          time: "Excel",
        },
        { title: "Revenue Optimization", type: "Video", time: "22 min watch" },
      ],
    },
    {
      title: "Marketing & Photography",
      icon: CameraIcon,
      color: "bg-pink-500",
      description: "Professional marketing for your property",
      resources: [
        {
          title: "Professional Photography Guide",
          type: "Guide",
          time: "30 min read",
        },
        {
          title: "Writing Compelling Descriptions",
          type: "Guide",
          time: "15 min read",
        },
        {
          title: "Social Media Marketing",
          type: "Video",
          time: "20 min watch",
        },
        { title: "Photo Editing Basics", type: "Tutorial", time: "35 min" },
      ],
    },
    {
      title: "Safety & Security",
      icon: ShieldIcon,
      color: "bg-red-500",
      description: "Keep your property and guests safe",
      resources: [
        {
          title: "Property Safety Checklist",
          type: "Checklist",
          time: "Download",
        },
        { title: "Emergency Procedures", type: "Guide", time: "12 min read" },
        { title: "Guest Screening Tips", type: "Guide", time: "8 min read" },
        {
          title: "Insurance Guide for Hosts",
          type: "Guide",
          time: "20 min read",
        },
      ],
    },
  ];

  const tools = [
    {
      title: "Host Dashboard",
      description: "Monitor your bookings, earnings, and guest reviews",
      icon: BarChart3Icon,
      link: "/host-dashboard",
    },
    {
      title: "Pricing Calculator",
      description: "Get data-driven pricing recommendations",
      icon: IndianRupeeIcon,
      link: "#",
    },
    {
      title: "Booking Calendar",
      description: "Manage availability and block dates",
      icon: CalendarIcon,
      link: "#",
    },
    {
      title: "Guest Messaging",
      description: "Communicate with guests efficiently",
      icon: MessageCircleIcon,
      link: "#",
    },
  ];

  const successStories = [
    {
      name: "Priya Sharma",
      location: "Goa",
      achievement: "₹2,50,000 monthly earnings",
      story: "From a single room to 5 properties in 2 years",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b9493bd0?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Rajesh Kumar",
      location: "Rishikesh",
      achievement: "4.9★ rating with 200+ reviews",
      story: "Turned family home into a top-rated retreat",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Meera Patel",
      location: "Udaipur",
      achievement: "98% occupancy rate",
      story: "Heritage property restoration success",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Video":
        return PlayCircleIcon;
      case "Download":
        return DownloadIcon;
      case "Template":
        return DownloadIcon;
      case "Checklist":
        return DownloadIcon;
      default:
        return BookOpenIcon;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Video":
        return "bg-red-100 text-red-700";
      case "Download":
        return "bg-green-100 text-green-700";
      case "Template":
        return "bg-blue-100 text-blue-700";
      case "Checklist":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
          <div className="container text-center">
            <HomeIcon className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Host Resources Hub
            </h1>
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
              Everything you need to succeed as a host - from setup guides to
              advanced strategies for maximizing your earnings and guest
              satisfaction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100"
              >
                <BookOpenIcon className="mr-2 h-5 w-5" />
                Browse All Resources
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/20"
              >
                <PlayCircleIcon className="mr-2 h-5 w-5" />
                Watch Host Training
              </Button>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-12 bg-gray-50">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { number: "50,000+", label: "Active Hosts", icon: UsersIcon },
                {
                  number: "₹45,000",
                  label: "Avg Monthly Earnings",
                  icon: IndianRupeeIcon,
                },
                {
                  number: "4.7★",
                  label: "Average Host Rating",
                  icon: StarIcon,
                },
                {
                  number: "95%",
                  label: "Host Satisfaction",
                  icon: TrendingUpIcon,
                },
              ].map((stat, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <stat.icon className="h-8 w-8 text-green-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-900">
                      {stat.number}
                    </div>
                    <div className="text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Resource Categories */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Learning Resources</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Comprehensive guides, videos, and tools to help you excel as a
                host
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {resourceCategories.map((category, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center`}
                      >
                        <category.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">
                          {category.title}
                        </CardTitle>
                        <p className="text-gray-600 text-sm">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.resources.map((resource, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
                        >
                          <div className="flex items-center space-x-3">
                            {(() => {
                              const IconComponent = getTypeIcon(resource.type);
                              return (
                                <IconComponent className="h-4 w-4 text-gray-500" />
                              );
                            })()}
                            <div>
                              <h4 className="font-medium group-hover:text-green-600 transition-colors">
                                {resource.title}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {resource.time}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant="outline"
                              className={getTypeColor(resource.type)}
                            >
                              {resource.type}
                            </Badge>
                            <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-green-600 transition-colors" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Host Tools */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Host Tools & Dashboard
              </h2>
              <p className="text-gray-600 text-lg">
                Powerful tools to manage your hosting business efficiently
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tools.map((tool, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <tool.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{tool.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {tool.description}
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={tool.link}>Access Tool</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Host Success Stories</h2>
              <p className="text-gray-600 text-lg">
                Learn from hosts who've built successful hosting businesses
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <img
                      src={story.avatar}
                      alt={story.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="font-semibold text-lg">{story.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {story.location}
                    </p>
                    <Badge className="mb-3">{story.achievement}</Badge>
                    <p className="text-gray-700 italic">"{story.story}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Content */}
        <section className="py-16 bg-blue-50">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4">Featured Resource</Badge>
                <h2 className="text-3xl font-bold mb-4">
                  Host Academy Masterclass
                </h2>
                <p className="text-gray-600 text-lg mb-6">
                  A comprehensive 6-week program covering everything from
                  property optimization to advanced guest experience strategies.
                  Join thousands of successful hosts who've completed our
                  masterclass.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    "12 hours of video content",
                    "Interactive workshops",
                    "1-on-1 mentoring sessions",
                    "Private host community access",
                    "Certificate of completion",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <LightbulbIcon className="h-4 w-4 text-green-600 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button size="lg">
                  <PlayCircleIcon className="mr-2 h-5 w-5" />
                  Start Free Preview
                </Button>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1560472355-536de3962603?w=600&h=400&fit=crop"
                  alt="Host training"
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute inset-0 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <PlayCircleIcon className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community & Support */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Host Community & Support
              </h2>
              <p className="text-gray-600 text-lg">
                Connect with fellow hosts and get expert support
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="p-8">
                  <MessageCircleIcon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-xl mb-3">
                    Community Forum
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Connect with 50,000+ hosts, share experiences, and get
                    advice
                  </p>
                  <Button variant="outline" asChild>
                    <Link to="/community-forum">Join Community</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-8">
                  <ShieldIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-xl mb-3">
                    Host Protection
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Learn about our host guarantee and protection programs
                  </p>
                  <Button variant="outline" asChild>
                    <Link to="/host-guarantee">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-8">
                  <UsersIcon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-xl mb-3">Expert Support</h3>
                  <p className="text-gray-600 mb-4">
                    Get personalized help from our host success team
                  </p>
                  <Button variant="outline">Contact Support</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Get Started CTA */}
        <section className="py-16 bg-green-600 text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Your Hosting Journey?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Join thousands of successful hosts earning great income while
              sharing their properties with travelers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100"
              >
                <HomeIcon className="mr-2 h-5 w-5" />
                Create Your Listing
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/20"
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HostResources;
