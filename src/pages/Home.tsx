import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
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
  CompassIcon,
  PlaneIcon,
  MountainIcon,
  CameraIcon,
  NavigationIcon,
  SunIcon,
  WavesIcon,
  TreesIcon,
  Train,
  Bus,
  Car,
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
      icon: GlobeIcon,
      color: "from-blue-500 to-cyan-500",
    },
    {
      number: "50K+",
      label: "Adventures",
      icon: CompassIcon,
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
      icon: PlaneIcon,
      color: "from-orange-500 to-red-500",
    },
  ];

  const travelExperiences = [
    {
      icon: CameraIcon,
      title: "Capture Moments",
      desc: "Instagram-worthy spots at every destination",
    },
    {
      icon: CompassIcon,
      title: "Discover Hidden Gems",
      desc: "Secret places locals love to share",
    },
    {
      icon: GlobeIcon,
      title: "Cultural Immersion",
      desc: "Live like a local, think like a traveler",
    },
    {
      icon: MountainIcon,
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
            <PlaneIcon className="h-8 w-8 text-white/30 rotate-45" />
          </div>
          <div className="absolute top-40 right-32 animate-pulse delay-2000">
            <CompassIcon className="h-6 w-6 text-white/40" />
          </div>
          <div className="absolute bottom-32 left-40 animate-bounce delay-500">
            <NavigationIcon className="h-7 w-7 text-white/35 rotate-12" />
          </div>
          <div className="absolute top-60 right-60 animate-pulse">
            <SunIcon className="h-10 w-10 text-yellow-300/40" />
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
              <PlaneIcon className="h-6 w-6 text-white/25 rotate-45" />
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
                  <CompassIcon className="h-5 w-5 animate-spin" />
                  Your Adventure Starts Here
                  <PlaneIcon className="h-4 w-4" />
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
                    <CompassIcon className="mr-2 h-5 w-5" />
                    Start Your Journey
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/50 text-white hover:bg-white/20 hover:border-white/70 backdrop-blur-sm bg-white/10 shadow-lg"
                >
                  <PlayCircleIcon className="mr-2 h-5 w-5" />
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
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <GlobeIcon className="h-6 w-6 text-yellow-300 animate-spin" />
                    <h3 className="text-2xl font-bold text-white">
                      Where To Next?
                    </h3>
                    <PlaneIcon className="h-6 w-6 text-yellow-300" />
                  </div>
                  <p className="text-white/80">
                    ✈️ The world is waiting for you!
                  </p>
                </div>

                {/* Enhanced Search Form */}
                <div className="space-y-6">
                  <div className="bg-white/95 rounded-2xl p-4 shadow-xl">
                    <SearchBar variant="compact" />
                  </div>

                  {/* Dream Destinations */}
                  <div>
                    <p className="text-sm text-white/90 mb-3 font-medium flex items-center gap-2">
                      <MapPinIcon className="h-4 w-4" />
                      Dream Destinations
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "🏝️ Bali Paradise",
                        "🗼 Paris Romance",
                        "🏔️ Swiss Alps",
                        "🌴 Miami Beaches",
                      ].map((dest) => (
                        <Button
                          key={dest}
                          variant="outline"
                          size="sm"
                          className="border-white/50 text-white hover:bg-white/25 hover:border-white/70 backdrop-blur-sm bg-white/15 justify-start text-xs"
                          asChild
                        >
                          <Link to={`/search?location=${dest.split(" ")[1]}`}>
                            {dest}
                          </Link>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Adventure CTA */}
                  <Button
                    className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold border-0 shadow-lg transform hover:scale-105 transition-all"
                    asChild
                  >
                    <Link to="/search">
                      <CompassIcon className="mr-2 h-5 w-5" />
                      Discover Adventures
                      <SparklesIcon className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Adventure Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <ChevronDownIcon className="h-6 w-6 text-white/80" />
            <span className="text-xs text-white/60">Explore More</span>
          </div>
        </div>
      </section>

      {/* Wanderlust Stats Section */}
      <section className="py-20 bg-gradient-to-r from-amber-50 to-orange-50 relative overflow-hidden">
        {/* Travel-themed background */}
        <div className="absolute inset-0">
          <PlaneIcon className="absolute top-10 right-20 h-32 w-32 text-orange-100 rotate-45" />
          <CompassIcon className="absolute bottom-10 left-20 h-24 w-24 text-amber-100" />
        </div>

        <div className="container relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4 flex items-center justify-center gap-3">
              <GlobeIcon className="h-10 w-10 text-blue-600" />
              Join the Global Adventure
              <PlaneIcon className="h-10 w-10 text-orange-600" />
            </h2>
            <p className="text-xl text-gray-600">
              Travelers from every corner of the world choose us
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {wanderlustStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card
                  key={index}
                  className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 transform cursor-pointer group"
                >
                  <CardContent className="p-8 text-center">
                    <div
                      className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center group-hover:animate-pulse`}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-4xl font-black text-gray-900 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 font-bold">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Travel Properties */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              <span className="flex items-center justify-center gap-3 mb-4">
                <CameraIcon className="h-12 w-12 text-pink-600" />
                <span>Wanderlust</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  Collection
                </span>
                <StarIcon className="h-12 w-12 text-yellow-500 fill-current" />
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              📸 Picture-perfect stays that will make your friends jealous and
              your memories unforgettable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProperties.map((property, index) => (
              <div
                key={property.id}
                className={`transform transition-all duration-700 hover:scale-105 group ${
                  index % 2 === 0 ? "md:translate-y-8" : "md:-translate-y-8"
                }`}
              >
                <div className="relative">
                  <PropertyCard
                    property={property}
                    className="border-0 shadow-xl hover:shadow-2xl"
                  />
                  {/* Travel Badge */}
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-full p-3 shadow-lg group-hover:animate-bounce">
                    <PlaneIcon className="h-4 w-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-xl transform hover:scale-105 transition-all"
              asChild
            >
              <Link to="/search">
                <GlobeIcon className="mr-2 h-5 w-5" />
                Explore All Destinations
                <CompassIcon className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Travel Experience Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        {/* Travel Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 animate-float">
            <TreesIcon className="h-16 w-16 text-green-300/30" />
          </div>
          <div className="absolute bottom-20 right-20 animate-float delay-1000">
            <WavesIcon className="h-20 w-20 text-blue-300/30" />
          </div>
          <div className="absolute top-1/2 left-1/3 animate-float delay-2000">
            <MountainIcon className="h-12 w-12 text-white/20" />
          </div>
        </div>

        <div className="container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6 flex items-center justify-center gap-3">
              <CompassIcon className="h-12 w-12 text-yellow-300" />
              More Than Just Travel
              <CameraIcon className="h-12 w-12 text-pink-300" />
            </h2>
            <p className="text-2xl text-white/90 max-w-3xl mx-auto">
              🎒 Create stories worth telling, collect moments not things
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {travelExperiences.map((experience, index) => {
              const IconComponent = experience.icon;
              return (
                <div key={index} className="text-center group cursor-pointer">
                  <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-3xl p-8 hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                    <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center group-hover:animate-bounce">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">
                      {experience.title}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {experience.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Host Wanderlust CTA */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 border-2 border-yellow-400/30 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 border-2 border-cyan-400/30 rotate-45"></div>
          <PlaneIcon className="absolute top-32 right-40 h-16 w-16 text-white/10 rotate-45" />
          <CompassIcon className="absolute bottom-40 left-40 h-12 w-12 text-white/10" />
        </div>

        <div className="container relative z-10 text-center">
          <h2 className="text-6xl font-black mb-8">
            <span className="flex items-center justify-center gap-4 mb-4">
              <HomeIcon className="h-16 w-16 text-blue-400" />
              <span>Share Your</span>
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
              Adventure Space
            </span>
          </h2>
          <p className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            🏡 Turn your space into someone's perfect adventure. Help travelers
            create unforgettable memories while earning extra income.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:to-red-600 text-black font-bold text-lg px-8 py-4 shadow-2xl transform hover:scale-105 transition-all"
              onClick={handleHostingClick}
            >
              <HomeIcon className="mr-3 h-6 w-6" />
              Start Hosting Adventures
              <ArrowRightIcon className="ml-3 h-6 w-6" />
            </Button>
            <span className="text-gray-400 text-lg">or</span>
            <Button
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10 text-lg px-8 py-4"
            >
              <PlayCircleIcon className="mr-2 h-6 w-6" />
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
                title: "2 mins",
                subtitle: "To start your hosting journey",
                icon: "⚡",
              },
              { title: "24/7", subtitle: "Adventure support team", icon: "🛡️" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-4xl font-black text-yellow-400 mb-2">
                  {stat.title}
                </div>
                <div className="text-gray-300">{stat.subtitle}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;
