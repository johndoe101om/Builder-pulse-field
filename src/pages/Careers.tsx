import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BriefcaseIcon,
  MapPinIcon,
  ClockIcon,
  TrendingUpIcon,
  UsersIcon,
  HeartIcon,
  GlobeIcon,
  RocketIcon,
} from "lucide-react";

const Careers = () => {
  const openPositions = [
    {
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      experience: "4-6 years",
      description:
        "Join our engineering team to build scalable solutions for millions of travelers.",
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Bangalore, India",
      type: "Full-time",
      experience: "3-5 years",
      description:
        "Drive product strategy and execution for our host and guest experiences.",
    },
    {
      title: "Marketing Manager",
      department: "Marketing",
      location: "Delhi, India",
      type: "Full-time",
      experience: "2-4 years",
      description:
        "Lead marketing campaigns to grow our user base across India.",
    },
    {
      title: "Customer Success Specialist",
      department: "Support",
      location: "Remote",
      type: "Full-time",
      experience: "1-3 years",
      description:
        "Help hosts and guests have amazing experiences on our platform.",
    },
  ];

  const benefits = [
    {
      title: "Competitive Salary",
      description: "Industry-leading compensation packages",
      icon: TrendingUpIcon,
    },
    {
      title: "Health & Wellness",
      description: "Comprehensive health insurance for you and family",
      icon: HeartIcon,
    },
    {
      title: "Work-Life Balance",
      description: "Flexible hours and remote work options",
      icon: ClockIcon,
    },
    {
      title: "Travel Credits",
      description: "Annual travel credits to explore new destinations",
      icon: GlobeIcon,
    },
    {
      title: "Growth Opportunities",
      description: "Learning budget and career development programs",
      icon: RocketIcon,
    },
    {
      title: "Great Team",
      description: "Work with passionate, talented individuals",
      icon: UsersIcon,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
          <div className="container text-center">
            <BriefcaseIcon className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Join Our Journey
            </h1>
            <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Help us revolutionize travel in India. Build meaningful products,
              work with amazing people, and make a real impact on millions of
              travelers.
            </p>
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100"
            >
              View Open Positions
            </Button>
          </div>
        </section>

        {/* Why Work With Us */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Work With Us</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Join a team that's passionate about creating positive impact
                through travel and technology
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-8">
                    <benefit.icon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="font-semibold text-xl mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Open Positions</h2>
              <p className="text-gray-600 text-lg">
                Join our growing team across India
              </p>
            </div>

            <div className="space-y-6 max-w-4xl mx-auto">
              {openPositions.map((position, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold">
                            {position.title}
                          </h3>
                          <Badge>{position.department}</Badge>
                        </div>
                        <p className="text-gray-600 mb-4">
                          {position.description}
                        </p>
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <div className="flex items-center">
                            <MapPinIcon className="h-4 w-4 mr-1" />
                            {position.location}
                          </div>
                          <div className="flex items-center">
                            <ClockIcon className="h-4 w-4 mr-1" />
                            {position.type}
                          </div>
                          <div className="flex items-center">
                            <BriefcaseIcon className="h-4 w-4 mr-1" />
                            {position.experience}
                          </div>
                        </div>
                      </div>
                      <div className="ml-6">
                        <Button>Apply Now</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Culture */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Culture</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                We're building more than just a company - we're creating a
                community
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6">
                  What makes us different
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-2">
                      Innovation First
                    </h4>
                    <p className="text-gray-600">
                      We encourage experimentation and creative problem-solving
                      to build the future of travel.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">
                      Impact Driven
                    </h4>
                    <p className="text-gray-600">
                      Every team member contributes to meaningful change in how
                      people travel and connect.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">
                      Growth Mindset
                    </h4>
                    <p className="text-gray-600">
                      We invest in our people's growth with learning
                      opportunities and career development.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                  alt="Team collaboration"
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-purple-600 text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Make an Impact?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Don't see the perfect role? We're always looking for exceptional
              talent. Send us your resume and let's talk.
            </p>
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100"
            >
              Contact Us
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;
