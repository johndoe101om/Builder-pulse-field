import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ShieldIcon,
  IndianRupeeIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  PhoneIcon,
  FileTextIcon,
  CameraIcon,
  AlertTriangleIcon,
  InfoIcon,
  HomeIcon,
  UserIcon,
  CalendarIcon,
  MessageCircleIcon,
} from "lucide-react";

const HostGuarantee = () => {
  const coverageDetails = [
    {
      category: "Property Damage",
      icon: HomeIcon,
      coverage: "Up to ₹10,00,000",
      description: "Protection against guest-caused damage to your property",
      includes: [
        "Furniture and fixture damage",
        "Wall and floor damage",
        "Broken appliances and electronics",
        "Structural damage (excluding wear and tear)",
        "Artwork and decorative items",
      ],
      color: "bg-blue-500",
    },
    {
      category: "Theft Protection",
      icon: ShieldIcon,
      coverage: "Up to ₹5,00,000",
      description: "Coverage for items stolen by guests",
      includes: [
        "Electronics and appliances",
        "Furniture and decor",
        "Personal belongings in common areas",
        "Outdoor equipment and furniture",
        "Keys and access devices",
      ],
      color: "bg-green-500",
    },
    {
      category: "Legal Liability",
      icon: FileTextIcon,
      coverage: "Up to ₹25,00,000",
      description: "Legal protection for third-party claims",
      includes: [
        "Guest injury on property",
        "Third-party property damage",
        "Legal defense costs",
        "Court fees and settlements",
        "Emergency legal consultation",
      ],
      color: "bg-purple-500",
    },
    {
      category: "Income Protection",
      icon: IndianRupeeIcon,
      coverage: "Up to ₹2,00,000",
      description: "Lost income due to covered incidents",
      includes: [
        "Booking cancellations due to damage",
        "Repair period income loss",
        "Alternative accommodation costs",
        "Emergency relocation expenses",
        "Business interruption coverage",
      ],
      color: "bg-orange-500",
    },
  ];

  const claimProcess = [
    {
      step: 1,
      title: "Report Incident",
      description: "Contact us within 24 hours of discovering the issue",
      icon: PhoneIcon,
      timeframe: "Within 24 hours",
      details: [
        "Call our 24/7 claims hotline",
        "Provide initial incident details",
        "Receive claim reference number",
        "Get immediate guidance on next steps",
      ],
    },
    {
      step: 2,
      title: "Document Evidence",
      description: "Gather and submit documentation and photos",
      icon: CameraIcon,
      timeframe: "Within 48 hours",
      details: [
        "Take clear photos of damage/theft",
        "Collect police reports if applicable",
        "Gather guest communication records",
        "Submit original receipts and invoices",
      ],
    },
    {
      step: 3,
      title: "Claim Assessment",
      description: "Our team reviews your claim and evidence",
      icon: FileTextIcon,
      timeframe: "5-7 business days",
      details: [
        "Expert assessment of damage/loss",
        "Verification of submitted evidence",
        "Communication with relevant parties",
        "Determination of coverage eligibility",
      ],
    },
    {
      step: 4,
      title: "Resolution & Payment",
      description: "Approved claims are processed for payment",
      icon: IndianRupeeIcon,
      timeframe: "7-14 business days",
      details: [
        "Claim approval notification",
        "Payment processing to your account",
        "Final settlement documentation",
        "Follow-up support if needed",
      ],
    },
  ];

  const eligibilityRequirements = [
    {
      title: "Property Standards",
      requirements: [
        "Property must be listed on StayConnect",
        "Active hosting with recent bookings",
        "Compliance with local regulations",
        "Proper safety equipment installed",
        "Regular property maintenance records",
      ],
    },
    {
      title: "Host Requirements",
      requirements: [
        "Verified host profile",
        "Minimum 4.0 star rating",
        "Complete property information",
        "Responsive communication (within 24 hours)",
        "Clear house rules and policies",
      ],
    },
    {
      title: "Booking Requirements",
      requirements: [
        "Guest must book through StayConnect platform",
        "Valid guest verification required",
        "Standard check-in/check-out procedures",
        "Written communication records",
        "Proper guest screening conducted",
      ],
    },
  ];

  const exclusions = [
    "Normal wear and tear",
    "Pre-existing damage",
    "Damage caused by natural disasters",
    "Intentional damage by host",
    "Damage during unauthorized parties",
    "Items not disclosed in listing",
    "Cash or securities",
    "Vehicles and boats",
    "Damage during renovation",
    "Business equipment not related to hosting",
  ];

  const preventionTips = [
    {
      title: "Guest Screening",
      icon: UserIcon,
      tips: [
        "Review guest profiles and ratings",
        "Communicate expectations clearly",
        "Verify guest identity before arrival",
        "Set clear house rules and consequences",
      ],
    },
    {
      title: "Property Preparation",
      icon: HomeIcon,
      tips: [
        "Remove or secure valuable items",
        "Install security cameras in common areas",
        "Provide clear usage instructions",
        "Conduct regular property inspections",
      ],
    },
    {
      title: "Documentation",
      icon: CameraIcon,
      tips: [
        "Take photos before each guest arrival",
        "Document existing damage or wear",
        "Keep maintenance and repair records",
        "Save all guest communications",
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="container text-center">
            <ShieldIcon className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Host Protection Guarantee
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Comprehensive protection for hosts with coverage up to ₹42 lakhs.
              Host with confidence knowing your property and income are
              protected.
            </p>
            <div className="flex items-center justify-center space-x-8 text-blue-100">
              <div className="text-center">
                <div className="text-2xl font-bold">₹42L+</div>
                <div className="text-sm">Total Coverage</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm">Claims Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm">Claims Approved</div>
              </div>
            </div>
          </div>
        </section>

        {/* Coverage Overview */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What's Covered</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Comprehensive protection covering multiple aspects of your
                hosting business
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {coverageDetails.map((coverage, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-12 h-12 ${coverage.color} rounded-xl flex items-center justify-center`}
                        >
                          <coverage.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">
                            {coverage.category}
                          </CardTitle>
                          <p className="text-gray-600 text-sm">
                            {coverage.description}
                          </p>
                        </div>
                      </div>
                      <Badge
                        className={`${coverage.color} text-white hover:${coverage.color}`}
                      >
                        {coverage.coverage}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {coverage.includes.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircleIcon className="h-4 w-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Claims Process */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How to File a Claim</h2>
              <p className="text-gray-600 text-lg">
                Simple 4-step process to get your claim resolved quickly
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {claimProcess.map((step, index) => (
                <Card key={index} className="text-center relative">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                      {step.step}
                    </div>
                    <step.icon className="h-8 w-8 text-gray-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {step.description}
                    </p>
                    <Badge variant="outline" className="mb-4">
                      {step.timeframe}
                    </Badge>
                    <ul className="text-xs text-gray-500 space-y-1">
                      {step.details.map((detail, idx) => (
                        <li key={idx}>• {detail}</li>
                      ))}
                    </ul>
                  </CardContent>
                  {index < claimProcess.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-blue-200"></div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Eligibility Requirements */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Eligibility Requirements
              </h2>
              <p className="text-gray-600 text-lg">
                Requirements to qualify for Host Protection Guarantee coverage
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {eligibilityRequirements.map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {category.requirements.map((requirement, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircleIcon className="h-4 w-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">
                            {requirement}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Exclusions */}
        <section className="py-16 bg-red-50">
          <div className="container">
            <Card className="max-w-4xl mx-auto border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center text-red-800">
                  <AlertTriangleIcon className="h-6 w-6 mr-3" />
                  What's Not Covered
                </CardTitle>
                <p className="text-red-700">
                  Important exclusions to be aware of
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {exclusions.map((exclusion, index) => (
                    <div key={index} className="flex items-start">
                      <XCircleIcon className="h-4 w-4 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-red-800 text-sm">{exclusion}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Prevention Tips */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Prevention Best Practices
              </h2>
              <p className="text-gray-600 text-lg">
                Proactive steps to minimize risks and protect your property
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {preventionTips.map((category, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <category.icon className="h-6 w-6 text-blue-600 mr-3" />
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {category.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="py-16 bg-blue-50">
          <div className="container">
            <Card className="max-w-3xl mx-auto">
              <CardHeader className="text-center">
                <PhoneIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-2xl">24/7 Claims Support</CardTitle>
                <p className="text-gray-600">
                  Get immediate assistance when you need it most
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-white rounded-lg">
                    <PhoneIcon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">
                      Emergency Claims Line
                    </h3>
                    <p className="text-2xl font-bold text-blue-600 mb-2">
                      +91-800-CLAIMS
                    </p>
                    <p className="text-sm text-gray-600">(+91-800-252467)</p>
                    <Badge className="mt-2">Available 24/7</Badge>
                  </div>
                  <div className="text-center p-6 bg-white rounded-lg">
                    <MessageCircleIcon className="h-8 w-8 text-green-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Online Claims Portal</h3>
                    <p className="text-gray-600 mb-3">
                      File and track claims online
                    </p>
                    <Button className="w-full">Access Portal</Button>
                  </div>
                </div>

                <Alert className="mt-6 border-blue-200 bg-blue-50">
                  <InfoIcon className="h-5 w-5 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <strong>Quick Tip:</strong> For fastest service, have your
                    property listing URL, guest booking reference, and photos
                    ready when you call.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">
              Start Hosting with Confidence
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Host Protection Guarantee is automatically included for all
              eligible hosts. No additional fees, no complicated sign-up
              process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <HomeIcon className="mr-2 h-5 w-5" />
                Create Your Listing
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

export default HostGuarantee;
