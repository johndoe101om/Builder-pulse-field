import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  SearchIcon,
  BookOpenIcon,
  ShieldIcon,
  CreditCardIcon,
  HeadphonesIcon,
  HomeIcon,
  PhoneIcon,
  MessageCircleIcon,
  ArrowRightIcon,
  HelpCircleIcon,
  UserIcon,
  CalendarIcon,
} from "lucide-react";

const HelpCenter = () => {
  const helpCategories = [
    {
      title: "Getting Started",
      icon: BookOpenIcon,
      description: "Learn the basics of using StayConnect",
      articles: [
        "How to create an account",
        "Searching for accommodations",
        "Understanding listing details",
        "Making your first booking",
      ],
    },
    {
      title: "Safety & Security",
      icon: ShieldIcon,
      description: "Stay safe while traveling",
      articles: [
        "Safety guidelines for guests",
        "Verified listings and hosts",
        "Emergency contact information",
        "Reporting safety concerns",
      ],
    },
    {
      title: "Payment & Refunds",
      icon: CreditCardIcon,
      description: "Payment methods and refund policies",
      articles: [
        "Accepted payment methods",
        "Understanding fees",
        "Cancellation policies",
        "Refund process and timeline",
      ],
    },
    {
      title: "Booking Management",
      icon: CalendarIcon,
      description: "Manage your reservations",
      articles: [
        "Modifying your booking",
        "Canceling a reservation",
        "Check-in instructions",
        "Extending your stay",
      ],
    },
    {
      title: "Host Support",
      icon: HomeIcon,
      description: "Resources for hosts",
      articles: [
        "Creating your first listing",
        "Pricing your property",
        "Managing bookings",
        "Host protection policies",
      ],
    },
    {
      title: "Account & Profile",
      icon: UserIcon,
      description: "Manage your account settings",
      articles: [
        "Updating profile information",
        "Verification process",
        "Privacy settings",
        "Deleting your account",
      ],
    },
  ];

  const quickActions = [
    {
      title: "Contact Support",
      description: "Get help from our support team",
      icon: HeadphonesIcon,
      link: "/contact",
      color: "bg-blue-500",
    },
    {
      title: "Community Forum",
      description: "Connect with other users",
      icon: MessageCircleIcon,
      link: "/community-forum",
      color: "bg-green-500",
    },
    {
      title: "Call Us",
      description: "Speak with us directly",
      icon: PhoneIcon,
      link: "tel:+91-800-123-4567",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="container text-center">
            <HelpCircleIcon className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              How can we help you?
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Find answers to common questions or get in touch with our support
              team
            </p>

            {/* Search Bar */}
            <div className="max-w-lg mx-auto relative">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search for help articles..."
                className="pl-12 pr-4 py-3 text-lg bg-white text-gray-900"
              />
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-12 bg-gray-50">
          <div className="container">
            <h2 className="text-2xl font-bold text-center mb-8">
              Need immediate help?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {quickActions.map((action, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">
                      {action.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{action.description}</p>
                    <Button
                      asChild
                      variant="outline"
                      className="group-hover:bg-primary group-hover:text-white"
                    >
                      <Link to={action.link}>
                        Get Help <ArrowRightIcon className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Help Categories */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Browse help topics</h2>
              <p className="text-gray-600 text-lg">
                Find detailed guides and answers organized by category
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {helpCategories.map((category, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <category.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {category.title}
                        </CardTitle>
                      </div>
                    </div>
                    <p className="text-gray-600">{category.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.articles.map((article, idx) => (
                        <li key={idx}>
                          <Link
                            to="#"
                            className="text-gray-700 hover:text-primary transition-colors flex items-center group"
                          >
                            <ArrowRightIcon className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                            {article}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant="outline"
                      className="w-full mt-4 group-hover:bg-primary group-hover:text-white"
                    >
                      View All Articles
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Articles */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Popular articles</h2>
              <p className="text-gray-600">
                Most frequently viewed help articles
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                "How to cancel a booking and get a refund",
                "What to do if your host cancels",
                "Understanding StayConnect fees",
                "How to contact your host",
                "Safety tips for solo travelers",
                "How to leave a review",
              ].map((article, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{article}</h3>
                      <ArrowRightIcon className="h-4 w-4 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Still Need Help */}
        <section className="py-16">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Still need help?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Our support team is available 24/7 to assist you with any
              questions or concerns
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/contact">
                  <MessageCircleIcon className="mr-2 h-5 w-5" />
                  Contact Support
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/community-forum">
                  <MessageCircleIcon className="mr-2 h-5 w-5" />
                  Ask the Community
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HelpCenter;
