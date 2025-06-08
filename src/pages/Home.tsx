import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SearchBar } from "@/components/search/SearchBar";
import AdvancedSearch from "@/components/search/AdvancedSearch";
import AppDownload from "@/components/mobile/AppDownload";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Home as HomeIcon,
  MapPin,
  Star,
  Users,
  TrendingUp,
  Globe,
  Sparkles,
  ArrowRight,
  PlayCircle,
  ChevronDown,
  Compass,
  Plane,
  Mountain,
  Camera,
  Navigation,
  Sun,
  Waves,
  Trees,
  Train,
  Bus,
  Car,
  Shield,
} from "lucide-react";
import { mockProperties } from "@/lib/mockData";

const Home = () => {
  const [currentDestination, setCurrentDestination] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const featuredProperties = mockProperties.slice(0, 3);

  const handleHostingClick = () => {
    if (user) {
      navigate("/add-listing");
    } else {
      navigate("/signup", {
        state: { from: { pathname: "/add-listing" }, hostingIntent: true },
      });
    }
  };

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentDestination((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const travelDestinations = [
    {
      emoji: "🏝️",
      name: "Tropical Paradise",
      desc: "Crystal clear waters & white sand beaches",
    },
    {
      emoji: "🏔️",
      name: "Mountain Escapes",
      desc: "Breathtaking peaks & alpine adventures",
    },
    {
      emoji: "🌆",
      name: "Urban Adventures",
      desc: "Vibrant cities & cultural experiences",
    },
    {
      emoji: "🏛️",
      name: "Historic Wonders",
      desc: "Ancient ruins & timeless architecture",
    },
    {
      emoji: "🌲",
      name: "Forest Retreats",
      desc: "Peaceful cabins & nature immersion",
    },
    {
      emoji: "🏖️",
      name: "Coastal Getaways",
      desc: "Seaside charm & ocean views",
    },
  ];

  const wanderlustStats = [
    {
      number: "195",
      label: "Countries",
      icon: Globe,
      color: "from-blue-500 to-cyan-500",
    },
    {
      number: "50K+",
      label: "Adventures",
      icon: Compass,
      color: "from-green-500 to-emerald-500",
    },
    {
      number: "12K+",
      label: "Unique Stays",
      icon: HomeIcon,
      color: "from-purple-500 to-pink-500",
    },
    {
      number: "1M+",
      label: "Wanderers",
      icon: Plane,
      color: "from-orange-500 to-red-500",
    },
  ];

  const travelExperiences = [
    {
      icon: Camera,
      title: "Capture Moments",
      desc: "Instagram-worthy spots at every destination",
    },
    {
      icon: Compass,
      title: "Discover Hidden Gems",
      desc: "Secret places locals love to share",
    },
    {
      icon: Globe,
      title: "Cultural Immersion",
      desc: "Live like a local, think like a traveler",
    },
    {
      icon: Mountain,
      title: "Adventure Awaits",
      desc: "From city tours to mountain hikes",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header />

      {/* Hero Section - Travel-Inspired */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 text-white overflow-hidden">
        {/* Animated Travel Elements */}
        <div className="absolute inset-0">
          {/* Floating Travel Icons */}
          <div className="absolute top-20 left-20 animate-bounce delay-1000">
            <Plane className="h-8 w-8 text-white/30 rotate-45" />
          </div>
          <div className="absolute top-40 right-32 animate-pulse delay-2000">
            <Compass className="h-6 w-6 text-white/40" />
          </div>
          <div className="absolute bottom-32 left-40 animate-bounce delay-500">
            <Navigation className="h-7 w-7 text-white/35 rotate-12" />
          </div>
          <div className="absolute top-60 right-60 animate-pulse">
            <Sun className="h-10 w-10 text-yellow-300/40" />
          </div>

          {/* Moving Transportation Vehicles */}
          <div className="absolute top-32 left-10">
            <div className="animate-[moveRight_20s_linear_infinite]">
              <Train className="h-9 w-9 text-white/35" />
            </div>
          </div>
          <div className="absolute bottom-40 right-20">
            <div className="animate-[moveLeft_25s_linear_infinite]">
              <Bus className="h-7 w-7 text-white/30" />
            </div>
          </div>
          <div className="absolute top-72 left-60">
            <div className="animate-[moveRightSlow_30s_linear_infinite]">
              <Car className="h-6 w-6 text-white/40" />
            </div>
          </div>
          <div className="absolute bottom-60 left-20">
            <div className="animate-[moveRightFast_15s_linear_infinite]">
              <Train className="h-8 w-8 text-white/25" />
            </div>
          </div>
          <div className="absolute top-36 right-80">
            <div className="animate-[moveLeft_22s_linear_infinite]">
              <Bus className="h-8 w-8 text-white/35" />
            </div>
          </div>
          <div className="absolute bottom-20 right-40">
            <div className="animate-[moveLeftFast_18s_linear_infinite]">
              <Car className="h-7 w-7 text-white/30" />
            </div>
          </div>

          {/* Additional moving vehicles for more activity */}
          <div className="absolute top-80 left-80">
            <div className="animate-[moveRight_35s_linear_infinite] delay-1000">
              <Plane className="h-6 w-6 text-white/25 rotate-45" />
            </div>
          </div>
          <div className="absolute bottom-80 right-60">
            <div className="animate-[moveLeft_28s_linear_infinite] delay-2000">
              <Car className="h-5 w-5 text-white/30" />
            </div>
          </div>

          {/* Travel Route Lines */}
          <div className="absolute top-32 left-1/4 w-32 h-0.5 bg-white/20 rotate-45 animate-pulse"></div>
          <div className="absolute bottom-40 right-1/3 w-24 h-0.5 bg-white/20 -rotate-12 animate-pulse delay-1000"></div>

          {/* Cloud-like Floating Elements */}
          <div className="absolute top-16 right-20 w-96 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-32 w-80 h-40 bg-blue-300/20 rounded-full blur-3xl animate-pulse delay-1500"></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-cyan-300/20 rounded-full blur-3xl animate-pulse delay-3000"></div>
        </div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Adventure Content */}
            <div
              className={`transform transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"}`}
            >
              <div className="mb-8">
                <span className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 text-sm font-medium">
                  <Compass className="h-5 w-5 animate-spin" />
                  Your Adventure Starts Here
                  <Plane className="h-4 w-4" />
                </span>
              </div>

              <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
                <span className="block">Wander</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300">
                  Explore
                </span>
                <span className="block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
                    Discover
                  </span>
                </span>
              </h1>

              <p className="text-2xl text-white/90 mb-8 leading-relaxed max-w-lg">
                🌍 Pack your dreams, not just your bags. Every journey tells a
                story, every destination holds a secret, every stay becomes a
                memory.
              </p>

              {/* Dynamic Travel Destinations */}
              <div className="bg-white/15 backdrop-blur-sm border border-white/30 rounded-3xl p-6 mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">
                    {travelDestinations[currentDestination].emoji}
                  </span>
                  <div>
                    <h3 className="font-bold text-lg">
                      {travelDestinations[currentDestination].name}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {travelDestinations[currentDestination].desc}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {travelDestinations.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentDestination
                          ? "bg-white"
                          : "bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
                  asChild
                >
                  <Link to="/search">
                    <Compass className="mr-2 h-5 w-5" />
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/50 text-white hover:bg-white/20 hover:border-white/70 backdrop-blur-sm bg-white/10 shadow-lg"
                >
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Watch Travel Stories
                </Button>
              </div>

              {/* Travel Quick Links */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-3 text-sm">
                <Button
                  variant="outline"
                  className="rounded-full border-white/40 text-white hover:bg-white/20 hover:border-white/60 backdrop-blur-sm bg-white/10"
                  asChild
                >
                  <Link to="/search?amenities=Pool,Hot tub">
                    🏖️ Beach Vibes
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full border-white/40 text-white hover:bg-white/20 hover:border-white/60 backdrop-blur-sm bg-white/10"
                  asChild
                >
                  <Link to="/search?amenities=Fireplace,Heating">
                    ⛰️ Mountain Escape
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full border-white/40 text-white hover:bg-white/20 hover:border-white/60 backdrop-blur-sm bg-white/10"
                  asChild
                >
                  <Link to="/search?propertyTypes=entire-home">
                    🏙️ City Explorer
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full border-white/40 text-white hover:bg-white/20 hover:border-white/60 backdrop-blur-sm bg-white/10"
                  asChild
                >
                  <Link to="/search">✨ Unique Adventures</Link>
                </Button>
              </div>
            </div>

            {/* Right Side - Travel Search */}
            <div
              className={`transform transition-all duration-1000 delay-300 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"}`}
            >
              <div className="bg-white/20 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-2">
                    Find Your Perfect Stay
                  </h2>
                  <p className="text-white/80">
                    Where will your next adventure take you?
                  </p>
                </div>

                <AdvancedSearch />

                <div className="mt-8">
                  <p className="text-white/80 text-lg font-medium mb-6 text-center">
                    ✨ Popular destinations this week
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      {
                        name: "Goa",
                        subtitle: "Beach Paradise",
                        image:
                          "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=300&fit=crop",
                        properties: "2,340+ stays",
                        price: "from ₹3,200",
                        trending: true,
                        emoji: "🏖️",
                      },
                      {
                        name: "Manali",
                        subtitle: "Mountain Escape",
                        image:
                          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
                        properties: "1,890+ stays",
                        price: "from ₹2,800",
                        trending: true,
                        emoji: "🏔️",
                      },
                      {
                        name: "Udaipur",
                        subtitle: "City of Lakes",
                        image:
                          "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&h=300&fit=crop",
                        properties: "1,567+ stays",
                        price: "from ₹4,100",
                        trending: false,
                        emoji: "🏰",
                      },
                      {
                        name: "Rishikesh",
                        subtitle: "Yoga Capital",
                        image:
                          "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop",
                        properties: "945+ stays",
                        price: "from ₹2,500",
                        trending: true,
                        emoji: "🧘",
                      },
                    ].map((dest, index) => (
                      <Link
                        key={dest.name}
                        to={`/search?location=${dest.name}`}
                        className="group block"
                      >
                        <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:bg-white/15">
                          {dest.trending && (
                            <div className="absolute top-3 right-3 z-10">
                              <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                🔥 Hot
                              </div>
                            </div>
                          )}

                          <div className="relative h-32 overflow-hidden">
                            <img
                              src={dest.image}
                              alt={dest.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            <div className="absolute bottom-2 left-3 text-white">
                              <div className="text-lg font-bold flex items-center gap-1">
                                {dest.emoji} {dest.name}
                              </div>
                              <div className="text-xs text-white/80">
                                {dest.subtitle}
                              </div>
                            </div>
                          </div>

                          <div className="p-3">
                            <div className="flex justify-between items-center text-white">
                              <div className="text-xs text-white/70">
                                {dest.properties}
                              </div>
                              <div className="text-sm font-semibold">
                                {dest.price}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Quick search suggestions */}
                  <div className="mt-6 text-center">
                    <p className="text-white/60 text-sm mb-3">
                      Quick searches:
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {[
                        "🏖️ Beaches",
                        "🏔️ Mountains",
                        "🏛️ Heritage",
                        "🍃 Nature",
                        "🏙️ Cities",
                        "🧘 Wellness",
                        "🍷 Wine Tours",
                        "🏕️ Adventure",
                      ].map((tag) => (
                        <button
                          key={tag}
                          className="px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white/80 text-xs transition-all hover:scale-105"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wanderlust Stats Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Fueling Global Wanderlust
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join millions of travelers discovering extraordinary places and
              creating unforgettable memories around the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {wanderlustStats.map((stat, index) => (
              <div
                key={index}
                className={`transform transition-all duration-700 hover:scale-105 group ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <div
                      className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center group-hover:animate-pulse`}
                    >
                      <stat.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-4xl font-black text-gray-900 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Handpicked for You
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most loved properties, carefully selected for their
              unique charm and exceptional guest experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <Link to="/search">
                View All Properties
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Become a Host Section */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-amber-500 to-orange-600 text-white">
        <Compass className="absolute bottom-10 left-20 h-24 w-24 text-amber-100" />
        <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-8">
              <span className="inline-flex items-center gap-3 bg-amber-100 text-amber-800 border border-amber-200 rounded-full px-6 py-3 text-sm font-medium">
                <Sparkles className="h-5 w-5" />
                Share Your Space, Earn Great Income
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Become a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                Host
              </span>
            </h2>

            <p className="text-xl text-amber-100 mb-8 leading-relaxed">
              ✨ Turn your extra space into extra income. Join thousands of
              hosts earning up to{" "}
              <span className="font-bold text-yellow-300">₹50,000</span> per
              month by sharing their properties with travelers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                className="bg-white text-amber-600 hover:bg-amber-50 font-bold shadow-xl"
                onClick={handleHostingClick}
              >
                <HomeIcon className="mr-2 h-5 w-5" />
                Start Hosting Today
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/50 text-white hover:bg-white/20 hover:border-white/70 backdrop-blur-sm bg-white/10"
              >
                <PlayCircle className="mr-2 h-5 w-5" />
                Watch Host Stories
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "₹2,24,000",
                  subtitle: "Average monthly earnings",
                  icon: "💰",
                },
                {
                  title: "⭐ 4.8+",
                  subtitle: "Average host rating",
                  icon: "⭐",
                },
                {
                  title: "24/7",
                  subtitle: "Support & protection",
                  icon: "🛡️",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4"
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {stat.title}
                  </div>
                  <div className="text-amber-100 text-sm">{stat.subtitle}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-white">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      <Camera className="h-12 w-12 text-pink-600" />
                      <div className="ml-4">
                        <h3 className="font-bold">Professional Photos</h3>
                        <p className="text-white/80 text-sm">
                          Free photography service
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-white">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      <Shield className="h-12 w-12 text-green-600" />
                      <div className="ml-4">
                        <h3 className="font-bold">Host Protection</h3>
                        <p className="text-white/80 text-sm">
                          ₹10L+ coverage included
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6 mt-8">
                <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-white">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      <TrendingUp className="h-12 w-12 text-blue-600" />
                      <div className="ml-4">
                        <h3 className="font-bold">Smart Pricing</h3>
                        <p className="text-white/80 text-sm">
                          AI-powered optimization
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-white">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      <Users className="h-12 w-12 text-purple-600" />
                      <div className="ml-4">
                        <h3 className="font-bold">Guest Screening</h3>
                        <p className="text-white/80 text-sm">
                          Verified guest profiles
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Travel Experiences Section */}
      <section className="py-16 relative overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-600 text-white">
        <Mountain className="absolute bottom-40 left-40 h-20 w-20 text-white/10" />
        <div className="absolute top-20 right-20 flex space-x-6">
          <Compass className="h-20 w-20 text-yellow-300/30" />
          <Waves className="h-20 w-20 text-blue-300/30" />
          <Camera className="h-20 w-20 text-pink-300/30" />
        </div>

        <div className="container relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">More Than Just a Stay</h2>
            <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
              We connect you with experiences that transform ordinary trips into
              extraordinary adventures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {travelExperiences.map((experience, index) => (
              <Card
                key={index}
                className="text-center bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all"
              >
                <CardContent className="p-8">
                  <experience.icon className="h-12 w-12 mx-auto mb-4 text-emerald-200" />
                  <h3 className="font-semibold text-lg mb-3">
                    {experience.title}
                  </h3>
                  <p className="text-emerald-100 text-sm">{experience.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile App Download Section */}
      <section className="py-16">
        <div className="container">
          <AppDownload />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
