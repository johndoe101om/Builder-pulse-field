import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  LeafIcon,
  RecycleIcon,
  WaterDropIcon,
  ZapIcon,
  TreesIcon,
  UsersIcon,
  HeartIcon,
  GlobeIcon,
  HomeIcon,
  ShieldIcon,
  BookOpenIcon,
  CheckCircleIcon,
  StarIcon,
  AwardIcon,
  TrendingUpIcon,
} from "lucide-react";

const ResponsibleHosting = () => {
  const sustainabilityPrinciples = [
    {
      icon: LeafIcon,
      title: "Environmental Responsibility",
      description:
        "Minimize environmental impact through sustainable practices",
      practices: [
        "Use eco-friendly cleaning products",
        "Provide recycling bins and instructions",
        "Install energy-efficient lighting and appliances",
        "Offer filtered water to reduce plastic bottles",
        "Use renewable energy sources when possible",
      ],
      impact: "Reduce carbon footprint by up to 40%",
    },
    {
      icon: UsersIcon,
      title: "Community Engagement",
      description: "Support and respect local communities and culture",
      practices: [
        "Partner with local businesses for recommendations",
        "Respect neighborhood quiet hours and parking",
        "Support local artisans and service providers",
        "Share cultural information and local customs",
        "Maintain open communication with neighbors",
      ],
      impact: "Strengthen local economy and relationships",
    },
    {
      icon: ShieldIcon,
      title: "Guest Safety & Well-being",
      description: "Prioritize guest safety and positive experiences",
      practices: [
        "Maintain clean and sanitized environments",
        "Provide clear safety information and emergency contacts",
        "Ensure all safety equipment is functional",
        "Offer 24/7 support for guest concerns",
        "Create inclusive and welcoming spaces",
      ],
      impact: "99% guest satisfaction with safety measures",
    },
    {
      icon: GlobeIcon,
      title: "Cultural Sensitivity",
      description: "Promote cultural understanding and respect",
      practices: [
        "Learn about and respect local customs",
        "Provide cultural guides and etiquette tips",
        "Support diverse and inclusive practices",
        "Avoid cultural appropriation in decor",
        "Encourage respectful guest behavior",
      ],
      impact: "Foster cross-cultural understanding",
    },
  ];

  const greenInitiatives = [
    {
      title: "Energy Conservation",
      icon: ZapIcon,
      measures: [
        "LED lighting throughout property",
        "Smart thermostats for optimal temperature control",
        "Energy Star certified appliances",
        "Solar panels for renewable energy",
        "Motion sensors for automatic lighting",
      ],
      savings: "30-50% reduction in energy consumption",
    },
    {
      title: "Water Conservation",
      icon: WaterDropIcon,
      measures: [
        "Low-flow showerheads and faucets",
        "Dual-flush toilets",
        "Greywater recycling systems",
        "Drought-resistant landscaping",
        "Leak detection and monitoring",
      ],
      savings: "25-40% reduction in water usage",
    },
    {
      title: "Waste Reduction",
      icon: RecycleIcon,
      measures: [
        "Comprehensive recycling programs",
        "Composting for organic waste",
        "Bulk amenities to reduce packaging",
        "Reusable items instead of disposables",
        "Digital check-in to reduce paper",
      ],
      savings: "60-80% reduction in waste to landfills",
    },
    {
      title: "Sustainable Materials",
      icon: TreesIcon,
      measures: [
        "Eco-friendly furniture and decor",
        "Organic and sustainable textiles",
        "Non-toxic cleaning products",
        "Locally sourced and recycled materials",
        "Sustainable packaging for amenities",
      ],
      savings: "Reduced environmental impact of materials",
    },
  ];

  const certificationLevels = [
    {
      level: "Green Host",
      requirements: 5,
      benefits: [
        "Green Host badge",
        "Featured in eco-friendly listings",
        "Priority support",
      ],
      color: "bg-green-500",
    },
    {
      level: "Eco Champion",
      requirements: 10,
      benefits: [
        "Eco Champion badge",
        "Reduced platform fees",
        "Marketing support",
      ],
      color: "bg-blue-500",
    },
    {
      level: "Sustainability Leader",
      requirements: 15,
      benefits: [
        "Leadership badge",
        "Case study features",
        "Speaking opportunities",
      ],
      color: "bg-purple-500",
    },
  ];

  const communityImpact = [
    {
      metric: "Local Businesses Supported",
      value: "12,500+",
      description:
        "Host recommendations driving business to local establishments",
    },
    {
      metric: "Carbon Footprint Reduced",
      value: "2.3M kg",
      description: "CO2 savings through sustainable hosting practices",
    },
    {
      metric: "Community Projects Funded",
      value: "₹45 Lakhs",
      description: "Platform contributions to local community initiatives",
    },
    {
      metric: "Cultural Exchanges Facilitated",
      value: "250K+",
      description: "Meaningful connections between hosts and guests",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
          <div className="container text-center">
            <LeafIcon className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Responsible Hosting
            </h1>
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
              Join the movement of conscious hosts creating positive impact for
              the environment, communities, and cultures while providing
              exceptional guest experiences.
            </p>
            <div className="flex items-center justify-center space-x-2 text-green-100">
              <HeartIcon className="h-5 w-5" />
              <span>
                Host responsibly. Travel sustainably. Impact positively.
              </span>
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-12 bg-green-50">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {communityImpact.map((impact, index) => (
                <Card key={index} className="text-center border-green-200">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {impact.value}
                    </div>
                    <div className="font-semibold text-gray-900 mb-2">
                      {impact.metric}
                    </div>
                    <div className="text-sm text-gray-600">
                      {impact.description}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Sustainability Principles */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Pillars of Responsible Hosting
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Our comprehensive approach to sustainable and responsible
                hospitality
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {sustainabilityPrinciples.map((principle, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <principle.icon className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">
                          {principle.title}
                        </CardTitle>
                        <p className="text-gray-600 text-sm">
                          {principle.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-4">
                      {principle.practices.map((practice, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircleIcon className="h-4 w-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">
                            {practice}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center">
                        <TrendingUpIcon className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-green-800 font-medium text-sm">
                          {principle.impact}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Green Initiatives */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Sustainable Practices Guide
              </h2>
              <p className="text-gray-600 text-lg">
                Practical steps to make your property more sustainable
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {greenInitiatives.map((initiative, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <initiative.icon className="h-6 w-6 text-green-600 mr-3" />
                      {initiative.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {initiative.measures.map((measure, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm">
                            {measure}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      {initiative.savings}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Certification Program */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Sustainable Host Certification
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Earn recognition for your sustainable practices and unlock
                exclusive benefits
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {certificationLevels.map((level, index) => (
                <Card
                  key={index}
                  className="text-center relative overflow-hidden"
                >
                  <div className={`h-2 ${level.color}`}></div>
                  <CardHeader>
                    <div
                      className={`w-16 h-16 ${level.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <AwardIcon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{level.level}</CardTitle>
                    <p className="text-gray-600">
                      Complete {level.requirements} sustainable practices
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <Progress
                        value={(level.requirements / 15) * 100}
                        className="mb-2"
                      />
                      <span className="text-sm text-gray-500">
                        {level.requirements}/15 practices required
                      </span>
                    </div>
                    <ul className="space-y-2 text-sm">
                      {level.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center">
                          <StarIcon className="h-4 w-4 text-yellow-500 mr-2" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Community Guidelines */}
        <section className="py-16 bg-blue-50">
          <div className="container">
            <Card className="max-w-4xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">
                  Community Responsibility Guidelines
                </CardTitle>
                <p className="text-gray-600">
                  Building stronger, more inclusive communities through
                  responsible hosting
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <UsersIcon className="h-5 w-5 mr-2 text-blue-600" />
                      Community Engagement
                    </h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-4 w-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span>
                          Introduce guests to local businesses and services
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-4 w-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span>
                          Respect neighborhood customs and quiet hours
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-4 w-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span>Maintain open communication with neighbors</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-4 w-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span>Support local events and initiatives</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <GlobeIcon className="h-5 w-5 mr-2 text-green-600" />
                      Cultural Responsibility
                    </h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-4 w-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span>
                          Share authentic local culture and traditions
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-4 w-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span>Promote respectful cultural exchange</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-4 w-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span>
                          Educate guests about local customs and etiquette
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-4 w-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span>
                          Avoid stereotypes and cultural appropriation
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Resources and Tools */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Resources & Tools</h2>
              <p className="text-gray-600 text-lg">
                Everything you need to implement responsible hosting practices
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <BookOpenIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-3">
                    Sustainability Guides
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Comprehensive guides on implementing sustainable practices
                    in your property
                  </p>
                  <Button variant="outline">Download Guides</Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <CheckCircleIcon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-3">
                    Assessment Tool
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Evaluate your current sustainability practices and get
                    personalized recommendations
                  </p>
                  <Button variant="outline">Start Assessment</Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <UsersIcon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-3">
                    Community Network
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Connect with other sustainable hosts and share best
                    practices
                  </p>
                  <Button variant="outline">Join Network</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-green-600 text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">
              Start Your Responsible Hosting Journey
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Make a positive impact while building a successful hosting
              business. Every small step contributes to a more sustainable
              future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100"
              >
                <LeafIcon className="mr-2 h-5 w-5" />
                Begin Certification
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

export default ResponsibleHosting;
