import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SearchBar } from "@/components/search/SearchBar";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  HomeIcon,
  MapPinIcon,
  StarIcon,
  UsersIcon,
  TrendingUpIcon,
  GlobeIcon,
  SparklesIcon,
  ArrowRightIcon,
  PlayCircleIcon,
  ChevronDownIcon,
} from "lucide-react";
import { mockProperties } from "@/lib/mockData";

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const featuredProperties = mockProperties.slice(0, 3);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      text: "Found my dream vacation home in minutes!",
      author: "Sarah M.",
      location: "New York",
    },
    {
      text: "The hosts are incredible, felt like family.",
      author: "Marcus L.",
      location: "London",
    },
    {
      text: "Best travel experience of my life!",
      author: "Elena K.",
      location: "Tokyo",
    },
  ];

  const stats = [
    { number: "50K+", label: "Happy Travelers", icon: UsersIcon },
    { number: "12K+", label: "Unique Properties", icon: HomeIcon },
    { number: "95%", label: "Satisfaction Rate", icon: StarIcon },
    { number: "180+", label: "Countries", icon: GlobeIcon },
  ];

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header />

      {/* Hero Section - Asymmetric Design */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Floating Orbs */}
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>

          {/* Geometric Shapes */}
          <div className="absolute top-40 right-40 w-8 h-8 border-2 border-white/30 rotate-45 animate-spin"></div>
          <div className="absolute bottom-60 left-60 w-6 h-6 border-2 border-white/20 rotate-12 animate-bounce"></div>
        </div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Right Side - Interactive Search */}
            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
              <div className="bg-white/15 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-2xl">
                <h3 className="text-2xl font-bold mb-6 text-center text-white">Find Your Next Adventure</h3>

                {/* Enhanced Search Form */}
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl p-4 shadow-lg">
                    <SearchBar variant="compact" />
                  </div>

                  {/* Quick Filters */}
                  <div>
                    <p className="text-sm text-white/80 mb-3 font-medium">Popular destinations</p>
                    <div className="grid grid-cols-2 gap-2">
                      {['🏖️ Bali', '🗼 Paris', '🏔️ Alps', '🌴 Miami'].map((dest) => (
                        <Button
                          key={dest}
                          variant="outline"
                          size="sm"
                          className="border-white/40 text-white hover:bg-white/20 hover:border-white/60 backdrop-blur-sm bg-white/10 justify-start"
                        >
                          {dest}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Search CTA */}
                  <Button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold border-0">
                    Search Properties
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                Stay
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">
                  Unique
                </span>
                <br />
                Live
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
                  Local
                </span>
              </h1>

              <p className="text-xl text-white/80 mb-8 leading-relaxed max-w-lg">
                Break free from ordinary hotels. Discover extraordinary spaces
                where every stay becomes an adventure and every host becomes a
                friend.
              </p>

              {/* Dynamic Testimonials */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 mb-8">
                <div className="transition-all duration-500">
                  <p className="text-white/90 italic mb-3">
                    "{testimonials[currentTestimonial].text}"
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">
                        {testimonials[currentTestimonial].author}
                      </p>
                      <p className="text-xs text-white/60">
                        {testimonials[currentTestimonial].location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold shadow-lg hover:shadow-xl transition-all">
                  Start Exploring
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/20 hover:border-white/70 backdrop-blur-sm bg-white/10 shadow-lg">
                  <PlayCircleIcon className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>
            </div>

            {/* Right Side - Interactive Search */}
            <div
              className={`transform transition-all duration-1000 delay-300 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"}`}
            >
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">
                  Find Your Next Adventure
                </h3>
                <SearchBar variant="compact" />

                {/* Quick Filters */}
                <div className="mt-6">
                  <p className="text-sm text-white/70 mb-3">
                    Popular destinations
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["🏖️ Bali", "🗼 Paris", "🏔️ Alps", "🌴 Miami"].map(
                      (dest) => (
                        <Button
                          key={dest}
                          variant="outline"
                          size="sm"
                          className="border-white/30 text-white hover:bg-white/10"
                        >
                          {dest}
                        </Button>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDownIcon className="h-6 w-6 text-white/60" />
        </div>
      </section>

      {/* Stats Section - Floating Cards */}
      <section className="py-20 bg-gray-50 relative">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card
                  key={index}
                  className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-3xl font-black text-gray-900 mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Properties - Diagonal Layout */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-50 to-transparent"></div>
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Handpicked for
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                {" "}
                You
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every property is carefully selected to ensure an extraordinary
              experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProperties.map((property, index) => (
              <div
                key={property.id}
                className={`transform transition-all duration-700 hover:scale-105 ${
                  index % 2 === 0 ? "md:translate-y-8" : "md:-translate-y-8"
                }`}
              >
                <PropertyCard
                  property={property}
                  className="border-0 shadow-lg hover:shadow-2xl"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section - Split Design */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black mb-6">
                More Than Just a Stay
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Local Connections",
                    desc: "Meet hosts who become lifelong friends",
                  },
                  {
                    title: "Unique Experiences",
                    desc: "Access exclusive local activities and hidden gems",
                  },
                  {
                    title: "Authentic Living",
                    desc: "Live like a local, not like a tourist",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-black font-bold text-sm">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-white/80">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  {["🎭 Culture", "🍕 Food", "🎨 Art", "🌊 Adventure"].map(
                    (activity, index) => (
                      <div
                        key={index}
                        className="bg-white/10 rounded-xl p-4 text-center hover:bg-white/20 transition-colors"
                      >
                        <div className="text-2xl mb-2">
                          {activity.split(" ")[0]}
                        </div>
                        <div className="text-sm font-medium">
                          {activity.split(" ")[1]}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Host CTA - Geometric Design */}
      <section className="py-20 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 border-2 border-yellow-400/30 rotate-45"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 border-2 border-purple-400/30 rotate-12"></div>
        </div>

        <div className="container relative z-10 text-center">
          <h2 className="text-5xl font-black mb-6">
            Turn Your Space Into
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              {" "}
              Income
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of hosts earning extra income by sharing their unique
            spaces
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold"
              asChild
            >
              <Link to="/add-listing">
                <HomeIcon className="mr-2 h-5 w-5" />
                Start Hosting Today
              </Link>
            </Button>
            <span className="text-gray-400">or</span>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              Learn More
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "$2,500", subtitle: "Average monthly earnings" },
              { title: "3 mins", subtitle: "To create your listing" },
              { title: "24/7", subtitle: "Host support team" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-black text-yellow-400 mb-2">
                  {stat.title}
                </div>
                <div className="text-gray-400">{stat.subtitle}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;