import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  NewspaperIcon,
  DownloadIcon,
  MailIcon,
  CalendarIcon,
  TrendingUpIcon,
  UsersIcon,
  HomeIcon,
  AwardIcon,
  ExternalLink,
  ImageIcon,
} from "lucide-react";

const Press = () => {
  const pressReleases = [
    {
      date: "January 15, 2024",
      title: "StayConnect Announces ₹100 Crore Series A Funding Round",
      excerpt:
        "Funding will accelerate expansion across tier-2 and tier-3 cities in India, bringing quality accommodation to underserved markets.",
      link: "#",
      featured: true,
    },
    {
      date: "December 8, 2023",
      title: "StayConnect Crosses 2 Million Bookings Milestone",
      excerpt:
        "Platform celebrates major milestone with launch of new sustainable hosting program and enhanced safety features.",
      link: "#",
    },
    {
      date: "October 22, 2023",
      title: "Partnership with Tourism Ministry to Promote Rural Tourism",
      excerpt:
        "Strategic collaboration aims to boost rural tourism and provide income opportunities for rural communities.",
      link: "#",
    },
    {
      date: "September 5, 2023",
      title:
        "StayConnect Wins 'Best Travel Tech Startup' at India Startup Awards",
      excerpt:
        "Recognition highlights platform's innovation in democratizing travel accommodation across India.",
      link: "#",
    },
    {
      date: "July 18, 2023",
      title: "Launch of AI-Powered Smart Pricing for Hosts",
      excerpt:
        "New feature helps hosts optimize pricing dynamically based on demand, seasonality, and local events.",
      link: "#",
    },
  ];

  const mediaKit = [
    {
      title: "Brand Guidelines",
      description: "Logo usage, colors, typography, and brand standards",
      format: "PDF",
      size: "2.3 MB",
    },
    {
      title: "High-Resolution Logos",
      description: "Vector and raster formats in various sizes",
      format: "ZIP",
      size: "15.7 MB",
    },
    {
      title: "Product Screenshots",
      description: "App and website interface screenshots",
      format: "ZIP",
      size: "28.4 MB",
    },
    {
      title: "Executive Photos",
      description: "High-resolution headshots of leadership team",
      format: "ZIP",
      size: "12.1 MB",
    },
    {
      title: "Company Fact Sheet",
      description: "Key statistics, milestones, and company information",
      format: "PDF",
      size: "1.2 MB",
    },
  ];

  const mediaContacts = [
    {
      name: "Priya Sharma",
      title: "Head of Communications",
      email: "press@stayconnect.com",
      phone: "+91-98765-43210",
    },
    {
      name: "Rahul Gupta",
      title: "PR Manager",
      email: "media@stayconnect.com",
      phone: "+91-98765-43211",
    },
  ];

  const keyStats = [
    { number: "2M+", label: "Total Bookings", icon: CalendarIcon },
    { number: "500K+", label: "Properties Listed", icon: HomeIcon },
    { number: "50+", label: "Cities Covered", icon: TrendingUpIcon },
    { number: "95%", label: "Customer Satisfaction", icon: UsersIcon },
  ];

  const recentCoverage = [
    {
      outlet: "Economic Times",
      title: "How StayConnect is Revolutionizing Travel in India",
      date: "Jan 10, 2024",
      link: "#",
    },
    {
      outlet: "Business Standard",
      title: "The Rise of Home-sharing Platforms in India",
      date: "Dec 28, 2023",
      link: "#",
    },
    {
      outlet: "Forbes India",
      title: "Top 50 Startups to Watch in 2024",
      date: "Dec 15, 2023",
      link: "#",
    },
    {
      outlet: "TechCrunch",
      title: "Indian Travel Tech Startup Ecosystem Thriving",
      date: "Nov 22, 2023",
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
          <div className="container text-center">
            <NewspaperIcon className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Press & Media
            </h1>
            <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
              Latest news, press releases, and media resources from StayConnect.
              Covering our journey to transform travel in India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-indigo-600 hover:bg-gray-100"
              >
                <MailIcon className="mr-2 h-5 w-5" />
                Media Inquiries
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/20"
              >
                <DownloadIcon className="mr-2 h-5 w-5" />
                Download Media Kit
              </Button>
            </div>
          </div>
        </section>

        {/* Key Statistics */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                StayConnect by the Numbers
              </h2>
              <p className="text-gray-600 text-lg">
                Key metrics and achievements
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {keyStats.map((stat, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-8">
                    <stat.icon className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
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

        {/* Press Releases */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Latest Press Releases</h2>
              <p className="text-gray-600 text-lg">
                Stay updated with our latest announcements and milestones
              </p>
            </div>

            <div className="space-y-6 max-w-4xl mx-auto">
              {pressReleases.map((release, index) => (
                <Card
                  key={index}
                  className={`hover:shadow-lg transition-shadow ${release.featured ? "border-indigo-200 bg-indigo-50" : ""}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Badge variant="outline">{release.date}</Badge>
                          {release.featured && (
                            <Badge className="bg-indigo-600 text-white">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-xl font-semibold mb-3 hover:text-indigo-600 transition-colors">
                          {release.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{release.excerpt}</p>
                      </div>
                      <div className="ml-6">
                        <Button variant="outline" size="sm">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Read More
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Media Coverage */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Recent Media Coverage</h2>
              <p className="text-gray-600 text-lg">
                What the media is saying about StayConnect
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {recentCoverage.map((coverage, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Badge variant="outline" className="mb-3">
                          {coverage.outlet}
                        </Badge>
                        <h3 className="font-semibold text-lg mb-2 hover:text-indigo-600 transition-colors">
                          {coverage.title}
                        </h3>
                        <p className="text-gray-500 text-sm">{coverage.date}</p>
                      </div>
                      <div className="ml-4">
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Media Kit */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Media Kit & Resources</h2>
              <p className="text-gray-600 text-lg">
                Download logos, images, and brand guidelines
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mediaKit.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <DownloadIcon className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500">
                            {item.format} • {item.size}
                          </div>
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Media Contacts */}
        <section className="py-16 bg-indigo-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Media Contact</h2>
              <p className="text-gray-600 text-lg">
                Get in touch with our communications team
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {mediaContacts.map((contact, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MailIcon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-xl mb-2">
                      {contact.name}
                    </h3>
                    <p className="text-indigo-600 font-medium mb-4">
                      {contact.title}
                    </p>
                    <div className="space-y-2">
                      <p className="text-gray-600">
                        <a
                          href={`mailto:${contact.email}`}
                          className="hover:text-indigo-600 transition-colors"
                        >
                          {contact.email}
                        </a>
                      </p>
                      <p className="text-gray-600">
                        <a
                          href={`tel:${contact.phone}`}
                          className="hover:text-indigo-600 transition-colors"
                        >
                          {contact.phone}
                        </a>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Awards & Recognition */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Awards & Recognition</h2>
              <p className="text-gray-600 text-lg">
                Industry recognition and achievements
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
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow"
                >
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
        <section className="py-16 bg-indigo-600 text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Share Our Story?
            </h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              We're always happy to speak with journalists and provide
              additional information, interviews, or custom assets for your
              story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-indigo-600 hover:bg-gray-100"
              >
                <MailIcon className="mr-2 h-5 w-5" />
                Contact Press Team
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/20"
              >
                Schedule Interview
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Press;
