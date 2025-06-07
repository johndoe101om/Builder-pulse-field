import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  HomeIcon,
  UsersIcon,
  GlobeIcon,
  HeartIcon,
  TrendingUpIcon,
  StarIcon,
  MapPinIcon,
  CalendarIcon,
  AwardIcon,
  RocketIcon,
  EyeIcon,
  TargetIcon,
} from "lucide-react";

const About = () => {
  const stats = [
    { number: "2M+", label: "Happy Travelers", icon: UsersIcon },
    { number: "500K+", label: "Properties Listed", icon: HomeIcon },
    { number: "50+", label: "Cities Covered", icon: MapPinIcon },
    { number: "4.8★", label: "Average Rating", icon: StarIcon },
  ];

  const timeline = [
    {
      year: "2019",
      title: "The Beginning",
      description:
        "Founded in Mumbai with a vision to revolutionize travel accommodation in India",
      icon: RocketIcon,
    },
    {
      year: "2020",
      title: "Rapid Growth",
      description:
        "Expanded to 10 major cities and onboarded 10,000+ properties",
      icon: TrendingUpIcon,
    },
    {
      year: "2021",
      title: "Trust & Safety",
      description:
        "Launched comprehensive host protection and guest safety programs",
      icon: HeartIcon,
    },
    {
      year: "2022",
      title: "Technology Innovation",
      description:
        "Introduced AI-powered recommendations and smart pricing tools",
      icon: GlobeIcon,
    },
    {
      year: "2023",
      title: "Sustainability Focus",
      description:
        "Launched responsible hosting program and eco-friendly initiatives",
      icon: AwardIcon,
    },
    {
      year: "2024",
      title: "Global Expansion",
      description:
        "Expanding across South Asia while maintaining our Indian roots",
      icon: MapPinIcon,
    },
  ];

  const leadership = [
    {
      name: "Rajesh Sharma",
      position: "CEO & Co-Founder",
      description:
        "Former hospitality executive with 15+ years experience in travel technology",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      background: "IIT Delhi, Ex-OYO, Ex-MakeMyTrip",
    },
    {
      name: "Priya Patel",
      position: "CTO & Co-Founder",
      description:
        "Technology leader passionate about creating seamless user experiences",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b9493bd0?w=150&h=150&fit=crop&crop=face",
      background: "IIT Bombay, Ex-Flipkart, Ex-Google",
    },
    {
      name: "Amit Kumar",
      position: "Head of Growth",
      description:
        "Growth strategist focused on expanding access to quality accommodations",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      background: "ISB Hyderabad, Ex-Uber, Ex-Zomato",
    },
    {
      name: "Meera Singh",
      position: "Head of Community",
      description:
        "Community builder dedicated to creating positive travel experiences",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      background: "XLRI Jamshedpur, Ex-Airbnb, Ex-BookMyShow",
    },
  ];

  const values = [
    {
      title: "Trust & Safety",
      description:
        "Building trust between hosts and guests through verification, protection, and transparent communication",
      icon: HeartIcon,
      color: "bg-red-500",
    },
    {
      title: "Cultural Connection",
      description:
        "Celebrating India's diverse culture by connecting travelers with authentic local experiences",
      icon: GlobeIcon,
      color: "bg-blue-500",
    },
    {
      title: "Inclusive Growth",
      description:
        "Empowering hosts from all backgrounds to participate in the sharing economy",
      icon: UsersIcon,
      color: "bg-green-500",
    },
    {
      title: "Innovation",
      description:
        "Continuously improving our platform with cutting-edge technology and user feedback",
      icon: RocketIcon,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="container text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/20">
              About StayConnect
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Connecting India, One Stay at a Time
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              We're on a mission to make travel more accessible, authentic, and
              meaningful by connecting travelers with unique homes and
              experiences across India.
            </p>
            <div className="flex items-center justify-center space-x-2 text-blue-100">
              <CalendarIcon className="h-5 w-5" />
              <span>Founded in 2019 • Based in Mumbai, India</span>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-8">
                    <stat.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4">Our Mission</Badge>
                <h2 className="text-3xl font-bold mb-6">
                  Making Travel Accessible for Everyone
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  At StayConnect, we believe that everyone deserves access to
                  quality accommodation and authentic travel experiences. We're
                  democratizing travel by empowering individuals to share their
                  homes and create meaningful connections.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <EyeIcon className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Authentic Experiences</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <TargetIcon className="h-5 w-5 text-green-600" />
                    <span className="font-medium">Quality Standards</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <UsersIcon className="h-5 w-5 text-purple-600" />
                    <span className="font-medium">Community First</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <GlobeIcon className="h-5 w-5 text-orange-600" />
                    <span className="font-medium">Cultural Bridge</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
                  alt="Modern home interior"
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute inset-0 bg-blue-600/20 rounded-lg"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                The principles that guide everything we do and every decision we
                make
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-12 h-12 ${value.color} rounded-xl flex items-center justify-center`}
                      >
                        <value.icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{value.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
              <p className="text-gray-600 text-lg">
                Milestones in our mission to transform travel in India
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-blue-200"></div>

              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    <div
                      className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:text-right md:pr-8" : "md:text-left md:pl-8"}`}
                    >
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <Badge className="mb-3">{item.year}</Badge>
                          <h3 className="text-xl font-semibold mb-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-600">{item.description}</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Timeline dot */}
                    <div className="hidden md:flex w-2/12 justify-center">
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                        <item.icon className="h-8 w-8 text-white" />
                      </div>
                    </div>

                    <div className="hidden md:block w-5/12"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Leadership Team</h2>
              <p className="text-gray-600 text-lg">
                Meet the visionaries building the future of travel
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {leadership.map((leader, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <img
                      src={leader.avatar}
                      alt={leader.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="font-semibold text-lg">{leader.name}</h3>
                    <p className="text-blue-600 font-medium mb-2">
                      {leader.position}
                    </p>
                    <p className="text-gray-600 text-sm mb-3">
                      {leader.description}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {leader.background}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Creating Positive Impact
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Beyond accommodation, we're building bridges between communities
                and cultures
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="p-8">
                  <UsersIcon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-xl mb-3">
                    Economic Empowerment
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Enabling hosts to earn supplemental income and achieve
                    financial independence
                  </p>
                  <div className="text-2xl font-bold text-green-600">
                    ₹500Cr+
                  </div>
                  <div className="text-sm text-gray-500">Earned by hosts</div>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-8">
                  <GlobeIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-xl mb-3">
                    Cultural Exchange
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Facilitating meaningful connections between travelers and
                    local communities
                  </p>
                  <div className="text-2xl font-bold text-blue-600">1M+</div>
                  <div className="text-sm text-gray-500">
                    Cultural exchanges
                  </div>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-8">
                  <HeartIcon className="h-12 w-12 text-red-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-xl mb-3">
                    Community Support
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Supporting local businesses and community development
                    initiatives
                  </p>
                  <div className="text-2xl font-bold text-red-600">25K+</div>
                  <div className="text-sm text-gray-500">
                    Local businesses supported
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Recognition */}
        <section className="py-16 bg-blue-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Recognition & Awards</h2>
              <p className="text-gray-600 text-lg">
                Honored for our impact on travel and technology
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  year: "2024",
                  award: "Best Travel Tech Startup",
                  org: "India Startup Awards",
                },
                {
                  year: "2023",
                  award: "Excellence in Hospitality",
                  org: "Tourism Ministry",
                },
                { year: "2022", award: "Top 50 Startups", org: "Forbes India" },
                {
                  year: "2021",
                  award: "Innovation in Travel",
                  org: "FICCI Travel Awards",
                },
              ].map((recognition, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <AwardIcon className="h-10 w-10 text-yellow-600 mx-auto mb-3" />
                    <div className="font-semibold text-lg mb-2">
                      {recognition.award}
                    </div>
                    <div className="text-gray-600 text-sm mb-1">
                      {recognition.org}
                    </div>
                    <Badge variant="outline">{recognition.year}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Whether you're a traveler seeking authentic experiences or someone
              with a space to share, become part of our growing community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <HomeIcon className="mr-2 h-5 w-5" />
                Start Hosting
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/20"
              >
                <UsersIcon className="mr-2 h-5 w-5" />
                Join Our Team
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
