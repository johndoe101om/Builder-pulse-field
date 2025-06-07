import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AccessibilityIcon,
  HeartIcon,
  EyeIcon,
  EarIcon,
  MoveIcon,
  BrainIcon,
  CheckCircleIcon,
  SearchIcon,
  PhoneIcon,
  MessageCircleIcon,
  InfoIcon,
  ShieldIcon,
  HomeIcon,
} from "lucide-react";

const DisabilitySupport = () => {
  const accessibilityFeatures = [
    {
      icon: MoveIcon,
      title: "Mobility Accessibility",
      description: "Features for guests with mobility impairments",
      features: [
        "Step-free entrance",
        "Wide doorways (32+ inches)",
        "Accessible parking space",
        "Step-free shower",
        "Shower grab bars",
        "Toilet grab bars",
        "Step-free bedroom access",
        "Wide hallways",
      ],
    },
    {
      icon: EyeIcon,
      title: "Vision Accessibility",
      description: "Features for guests with visual impairments",
      features: [
        "Well-lit spaces",
        "Step-free path to entrance",
        "High-contrast lighting",
        "Tactile guidance features",
        "Clear pathways",
        "Audio announcements available",
        "Braille signage (where available)",
        "Voice-guided controls",
      ],
    },
    {
      icon: EarIcon,
      title: "Hearing Accessibility",
      description: "Features for guests with hearing impairments",
      features: [
        "Visual smoke alarms",
        "Vibrating smoke alarms",
        "Visual carbon monoxide alarms",
        "Visual doorbell alerts",
        "TTY/TDD telephone access",
        "Closed captioning on TV",
        "Visual notification devices",
        "Sign language interpretation (on request)",
      ],
    },
    {
      icon: BrainIcon,
      title: "Cognitive Accessibility",
      description: "Features for guests with cognitive differences",
      features: [
        "Clear, simple instructions",
        "Quiet spaces available",
        "Reduced sensory stimulation options",
        "Flexible check-in/out procedures",
        "Clear signage and directions",
        "Simplified controls",
        "Consistent layout and design",
        "Emergency procedure explanations",
      ],
    },
  ];

  const searchTips = [
    {
      title: "Use Accessibility Filters",
      description:
        "Filter properties by specific accessibility features you need",
    },
    {
      title: "Read Property Descriptions",
      description: "Look for detailed accessibility information in listings",
    },
    {
      title: "Check Photos Carefully",
      description: "Review photos to verify accessibility features",
    },
    {
      title: "Contact Hosts Directly",
      description: "Ask hosts specific questions about accessibility features",
    },
    {
      title: "Read Recent Reviews",
      description: "Look for reviews from other guests with similar needs",
    },
    {
      title: "Plan Arrival Details",
      description: "Coordinate accessible arrival and check-in procedures",
    },
  ];

  const supportServices = [
    {
      icon: PhoneIcon,
      title: "Dedicated Support Line",
      description: "Specialized assistance for accessibility needs",
      details: "+91-800-ACCESS (800-222377)",
    },
    {
      icon: MessageCircleIcon,
      title: "Priority Chat Support",
      description: "Fast-track support for accessibility-related questions",
      details: "Available 24/7 through your account",
    },
    {
      icon: SearchIcon,
      title: "Accessibility Search Assistance",
      description: "Help finding properties that meet your specific needs",
      details: "Free consultation service",
    },
    {
      icon: ShieldIcon,
      title: "Accessibility Guarantee",
      description: "Protection if accessibility features aren't as described",
      details: "Full refund + rebooking assistance",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
          <div className="container text-center">
            <AccessibilityIcon className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Accessibility & Inclusion
            </h1>
            <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Everyone deserves to travel with confidence. We're committed to
              making travel accessible for guests of all abilities.
            </p>
            <div className="flex items-center justify-center space-x-2 text-purple-100">
              <HeartIcon className="h-5 w-5" />
              <span>Building a more inclusive travel community</span>
            </div>
          </div>
        </section>

        {/* Commitment Statement */}
        <section className="py-12 bg-blue-50">
          <div className="container">
            <Alert className="border-blue-200 bg-blue-50 max-w-4xl mx-auto">
              <InfoIcon className="h-5 w-5 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>Our Commitment:</strong> StayConnect is dedicated to
                providing equal access to travel experiences for people with
                disabilities. We work continuously with hosts to improve
                accessibility and provide comprehensive accessibility
                information for informed travel decisions.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Accessibility Features */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Accessibility Features
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Discover the range of accessibility features available across
                our properties
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {accessibilityFeatures.map((category, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <category.icon className="h-6 w-6 text-purple-600" />
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {category.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircleIcon className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How to Search */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                How to Find Accessible Properties
              </h2>
              <p className="text-gray-600 text-lg">
                Tips for finding accommodations that meet your accessibility
                needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchTips.map((tip, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-blue-600 font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{tip.title}</h3>
                    <p className="text-gray-600">{tip.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" asChild>
                <a href="/search?accessibility=true">
                  <SearchIcon className="mr-2 h-5 w-5" />
                  Search Accessible Properties
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Support Services */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Accessibility Support Services
              </h2>
              <p className="text-gray-600 text-lg">
                Specialized support to help you plan and book accessible travel
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {supportServices.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <service.icon className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {service.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-3">{service.description}</p>
                    <Badge variant="outline" className="font-medium">
                      {service.details}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Protection */}
        <section className="py-16 bg-green-50">
          <div className="container">
            <Card className="max-w-4xl mx-auto">
              <CardHeader className="text-center">
                <ShieldIcon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-2xl">
                  Accessibility Guarantee
                </CardTitle>
                <p className="text-gray-600">
                  Your protection when accessibility features don't match
                  descriptions
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">
                      What's Covered:
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "Accessibility features not as described",
                        "Missing essential accessibility equipment",
                        "Unsafe accessibility conditions",
                        "Blocked accessible pathways",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircleIcon className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-3">
                      Your Protection:
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "Full refund of your booking",
                        "Help finding alternative accommodation",
                        "Rebooking assistance at no extra cost",
                        "Additional compensation for inconvenience",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircleIcon className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Resources */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Additional Resources</h2>
              <p className="text-gray-600 text-lg">
                Helpful information and external resources for accessible travel
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookIcon className="h-5 w-5 mr-2 text-blue-600" />
                    Travel Guides
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a href="#" className="text-blue-600 hover:underline">
                        Accessible Travel Planning Guide
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-blue-600 hover:underline">
                        City Accessibility Guides
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-blue-600 hover:underline">
                        Transportation Accessibility
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-blue-600 hover:underline">
                        Emergency Procedures for Travelers
                      </a>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <HomeIcon className="h-5 w-5 mr-2 text-green-600" />
                    For Hosts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a href="#" className="text-blue-600 hover:underline">
                        Making Your Property Accessible
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-blue-600 hover:underline">
                        Accessibility Feature Guidelines
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-blue-600 hover:underline">
                        Guest Communication Tips
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-blue-600 hover:underline">
                        Accessibility Grants & Resources
                      </a>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <LinkIcon className="h-5 w-5 mr-2 text-purple-600" />
                    External Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a href="#" className="text-blue-600 hover:underline">
                        Disability Rights Organizations
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-blue-600 hover:underline">
                        Accessible Tourism Boards
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-blue-600 hover:underline">
                        Assistive Technology Resources
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-blue-600 hover:underline">
                        Travel Insurance for Disabilities
                      </a>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Get Help */}
        <section className="py-16 bg-purple-50">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">
              Need Accessibility Assistance?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Our accessibility support team is ready to help you find the
              perfect accessible accommodation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                <PhoneIcon className="mr-2 h-5 w-5" />
                Call Accessibility Support
              </Button>
              <Button size="lg" variant="outline">
                <MessageCircleIcon className="mr-2 h-5 w-5" />
                Start Live Chat
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Accessibility Support: +91-800-ACCESS (222377) • Available 24/7
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DisabilitySupport;
