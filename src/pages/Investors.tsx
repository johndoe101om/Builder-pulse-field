import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUpIcon,
  DollarSign,
  UsersIcon,
  BarChart3Icon,
  PieChartIcon,
  CalendarIcon,
  DownloadIcon,
  MailIcon,
  FileTextIcon,
  AwardIcon,
  GlobeIcon,
  RocketIcon,
} from "lucide-react";

const Investors = () => {
  const keyMetrics = [
    {
      title: "Revenue Growth",
      value: "300%",
      period: "YoY 2023",
      icon: TrendingUpIcon,
      color: "text-green-600",
    },
    {
      title: "Total Bookings",
      value: "2M+",
      period: "Lifetime",
      icon: CalendarIcon,
      color: "text-blue-600",
    },
    {
      title: "Active Properties",
      value: "500K+",
      period: "Current",
      icon: PieChartIcon,
      color: "text-purple-600",
    },
    {
      title: "Monthly Users",
      value: "1.2M",
      period: "Active",
      icon: UsersIcon,
      color: "text-orange-600",
    },
  ];

  const financialHighlights = [
    {
      quarter: "Q4 2023",
      revenue: "₹45 Cr",
      growth: "+85%",
      bookings: "650K",
    },
    {
      quarter: "Q3 2023",
      revenue: "₹32 Cr",
      growth: "+72%",
      bookings: "480K",
    },
    {
      quarter: "Q2 2023",
      revenue: "₹28 Cr",
      growth: "+65%",
      bookings: "420K",
    },
    {
      quarter: "Q1 2023",
      revenue: "₹22 Cr",
      growth: "+58%",
      bookings: "350K",
    },
  ];

  const investors = [
    {
      name: "Accel Partners",
      type: "Lead Investor",
      round: "Series A",
      description:
        "Leading venture capital firm focused on early-stage technology investments",
    },
    {
      name: "Sequoia Capital India",
      type: "Strategic Investor",
      round: "Series A",
      description:
        "Global venture capital firm with strong presence in Indian startup ecosystem",
    },
    {
      name: "Matrix Partners India",
      type: "Co-Investor",
      round: "Seed",
      description:
        "Early-stage venture capital firm investing in technology startups",
    },
    {
      name: "Kalaari Capital",
      type: "Seed Investor",
      round: "Seed",
      description:
        "India-focused venture capital firm supporting innovative startups",
    },
  ];

  const milestones = [
    {
      date: "Jan 2024",
      title: "Series A Funding",
      description: "Raised ₹100 Cr in Series A funding led by Accel Partners",
      amount: "₹100 Cr",
    },
    {
      date: "Jun 2023",
      title: "Profitability Milestone",
      description: "Achieved positive unit economics and monthly profitability",
      amount: "Break-even",
    },
    {
      date: "Dec 2022",
      title: "Seed Funding",
      description: "Completed ₹25 Cr seed round from leading VCs",
      amount: "₹25 Cr",
    },
    {
      date: "Mar 2021",
      title: "Pre-Seed Round",
      description: "Initial funding from angel investors and early supporters",
      amount: "₹5 Cr",
    },
  ];

  const marketOpportunity = [
    {
      title: "Addressable Market",
      value: "₹2.5 Lakh Cr",
      description: "Total Indian travel and hospitality market size",
      icon: GlobeIcon,
    },
    {
      title: "Digital Penetration",
      value: "15%",
      description: "Current online booking penetration in India",
      icon: BarChart3Icon,
    },
    {
      title: "Growth Rate",
      value: "25%",
      description: "Annual growth rate of Indian travel market",
      icon: TrendingUpIcon,
    },
    {
      title: "Opportunity",
      value: "₹50K Cr",
      description: "Serviceable addressable market for home-sharing",
      icon: RocketIcon,
    },
  ];

  const documents = [
    {
      title: "Q4 2023 Investor Update",
      date: "January 2024",
      type: "Quarterly Report",
      access: "Investors Only",
    },
    {
      title: "Annual Report 2023",
      date: "December 2023",
      type: "Annual Report",
      access: "Public",
    },
    {
      title: "Corporate Governance Guidelines",
      date: "Updated 2024",
      type: "Governance",
      access: "Public",
    },
    {
      title: "Investor Presentation Deck",
      date: "Latest Version",
      type: "Presentation",
      access: "Investors Only",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
          <div className="container text-center">
            <BarChart3Icon className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Investor Relations
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Building the future of travel in India. Get insights into our
              growth, financial performance, and investment opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <DownloadIcon className="mr-2 h-5 w-5" />
                Investor Kit
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/20"
              >
                <MailIcon className="mr-2 h-5 w-5" />
                Contact IR Team
              </Button>
            </div>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Key Performance Metrics
              </h2>
              <p className="text-gray-600 text-lg">
                Strong fundamentals driving sustainable growth
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {keyMetrics.map((metric, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-8">
                    <metric.icon
                      className={`h-12 w-12 mx-auto mb-4 ${metric.color}`}
                    />
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {metric.value}
                    </div>
                    <div className="text-gray-600 mb-1">{metric.title}</div>
                    <Badge variant="outline" className="text-xs">
                      {metric.period}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Financial Performance */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Financial Performance</h2>
              <p className="text-gray-600 text-lg">
                Consistent growth across key financial metrics
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full max-w-4xl mx-auto">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">
                      Quarter
                    </th>
                    <th className="text-left py-3 px-4 font-semibold">
                      Revenue
                    </th>
                    <th className="text-left py-3 px-4 font-semibold">
                      Growth
                    </th>
                    <th className="text-left py-3 px-4 font-semibold">
                      Bookings
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {financialHighlights.map((quarter, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium">
                        {quarter.quarter}
                      </td>
                      <td className="py-4 px-4">{quarter.revenue}</td>
                      <td className="py-4 px-4">
                        <Badge className="bg-green-100 text-green-800">
                          {quarter.growth}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">{quarter.bookings}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Market Opportunity */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Market Opportunity</h2>
              <p className="text-gray-600 text-lg">
                Massive addressable market with significant growth potential
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {marketOpportunity.map((item, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-8">
                    <item.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <div className="text-2xl font-bold text-gray-900 mb-2">
                      {item.value}
                    </div>
                    <div className="font-semibold mb-2">{item.title}</div>
                    <div className="text-gray-600 text-sm">
                      {item.description}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Investment Milestones */}
        <section className="py-16 bg-blue-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Investment Milestones</h2>
              <p className="text-gray-600 text-lg">
                Our funding journey and key achievements
              </p>
            </div>

            <div className="relative max-w-4xl mx-auto">
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-blue-200"></div>

              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative flex items-center">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <Card className="ml-6 hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <Badge variant="outline">{milestone.date}</Badge>
                              <Badge className="bg-blue-600 text-white">
                                {milestone.amount}
                              </Badge>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                              {milestone.title}
                            </h3>
                            <p className="text-gray-600">
                              {milestone.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Investors */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Investors</h2>
              <p className="text-gray-600 text-lg">
                Backed by leading venture capital firms and strategic partners
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {investors.map((investor, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <AwardIcon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">
                            {investor.name}
                          </h3>
                          <Badge variant="outline">{investor.round}</Badge>
                        </div>
                        <p className="text-blue-600 font-medium mb-2">
                          {investor.type}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {investor.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Investor Documents */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Investor Documents</h2>
              <p className="text-gray-600 text-lg">
                Access financial reports, presentations, and governance
                materials
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {documents.map((doc, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <FileTextIcon className="h-5 w-5 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{doc.title}</h3>
                          <p className="text-gray-600 text-sm mb-2">
                            {doc.date}
                          </p>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {doc.type}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={`text-xs ${doc.access === "Public" ? "text-green-700 border-green-200" : "text-orange-700 border-orange-200"}`}
                            >
                              {doc.access}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <DownloadIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact IR */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container">
            <Card className="max-w-3xl mx-auto bg-white text-gray-900">
              <CardHeader className="text-center">
                <MailIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-2xl">
                  Investor Relations Contact
                </CardTitle>
                <p className="text-gray-600">
                  Get in touch with our investor relations team
                </p>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">Amit Sharma</h3>
                    <p className="text-blue-600 font-medium">
                      Head of Investor Relations
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <a
                        href="mailto:investors@stayconnect.com"
                        className="hover:text-blue-600 transition-colors"
                      >
                        investors@stayconnect.com
                      </a>
                    </p>
                    <p className="text-gray-600">
                      <a
                        href="tel:+91-98765-43212"
                        className="hover:text-blue-600 transition-colors"
                      >
                        +91-98765-43212
                      </a>
                    </p>
                  </div>
                  <div className="pt-4">
                    <Button className="bg-blue-600 text-white hover:bg-blue-700">
                      Schedule a Call
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Investors;
