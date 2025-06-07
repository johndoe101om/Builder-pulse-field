import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  ShieldIcon,
  AlertTriangleIcon,
  PhoneIcon,
  EyeIcon,
  LockIcon,
  UserCheckIcon,
  MapPinIcon,
  CameraIcon,
  MessageCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
  InfoIcon,
} from "lucide-react";

const SafetyInformation = () => {
  const safetyFeatures = [
    {
      icon: UserCheckIcon,
      title: "Verified Users",
      description: "All hosts and guests go through our verification process",
    },
    {
      icon: EyeIcon,
      title: "Background Checks",
      description: "Host identity verification and background screening",
    },
    {
      icon: LockIcon,
      title: "Secure Payments",
      description:
        "Your payment information is protected with bank-level security",
    },
    {
      icon: CameraIcon,
      title: "Photo Verification",
      description: "Properties are verified with authentic photos",
    },
    {
      icon: MessageCircleIcon,
      title: "24/7 Support",
      description: "Round-the-clock customer support and safety assistance",
    },
    {
      icon: MapPinIcon,
      title: "Location Verification",
      description: "All property addresses are verified for accuracy",
    },
  ];

  const safetyTips = [
    {
      category: "Before Booking",
      tips: [
        "Read the property description and reviews carefully",
        "Verify the host's profile and reviews from other guests",
        "Check if the property has safety amenities listed",
        "Communicate with the host through StayConnect messaging",
        "Never transfer money outside the platform",
      ],
    },
    {
      category: "During Your Stay",
      tips: [
        "Follow the check-in process provided by your host",
        "Familiarize yourself with emergency exits and safety equipment",
        "Keep emergency contact numbers accessible",
        "Report any safety concerns immediately",
        "Document any issues with photos if necessary",
      ],
    },
    {
      category: "After Your Stay",
      tips: [
        "Leave an honest review about your safety experience",
        "Report any safety violations to StayConnect",
        "Keep copies of important documents and receipts",
        "Contact support if you have any concerns",
      ],
    },
  ];

  const emergencyContacts = [
    {
      country: "India",
      police: "100",
      fire: "101",
      medical: "102",
      disaster: "108",
    },
    {
      country: "Global",
      police: "Local emergency services",
      fire: "Local emergency services",
      medical: "Local emergency services",
      disaster: "Local emergency services",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
          <div className="container text-center">
            <ShieldIcon className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Your Safety is Our Priority
            </h1>
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
              We're committed to creating a safe and secure environment for all
              our users. Learn about our safety measures and best practices for
              safe travel.
            </p>
          </div>
        </section>

        {/* Emergency Alert */}
        <section className="py-8 bg-red-50">
          <div className="container">
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangleIcon className="h-5 w-5 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>Emergency Contact:</strong> In case of immediate danger,
                always call local emergency services first. For non-emergency
                safety concerns, contact StayConnect support at
                +91-800-123-4567.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Safety Features */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                How StayConnect Keeps You Safe
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Our comprehensive safety measures work together to protect every
                aspect of your travel experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {safetyFeatures.map((feature, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-8 w-8 text-green-600" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Safety Tips */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Safety Tips for Travelers
              </h2>
              <p className="text-gray-600 text-lg">
                Follow these guidelines to ensure a safe and enjoyable stay
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {safetyTips.map((section, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2" />
                      {section.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* What to Do and Avoid */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">
              Safety Do's and Don'ts
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Do's */}
              <Card className="border-green-200">
                <CardHeader className="bg-green-50">
                  <CardTitle className="flex items-center text-green-800">
                    <CheckCircleIcon className="h-6 w-6 mr-2" />
                    Do's - Follow These Practices
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-4">
                    {[
                      "Always book through StayConnect platform",
                      "Verify host identity through our verification system",
                      "Read all house rules and safety information",
                      "Keep important documents in a safe place",
                      "Share your travel itinerary with trusted contacts",
                      "Report any suspicious activity immediately",
                      "Trust your instincts and prioritize your safety",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircleIcon className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Don'ts */}
              <Card className="border-red-200">
                <CardHeader className="bg-red-50">
                  <CardTitle className="flex items-center text-red-800">
                    <XCircleIcon className="h-6 w-6 mr-2" />
                    Don'ts - Avoid These Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-4">
                    {[
                      "Never make payments outside the platform",
                      "Don't share personal financial information",
                      "Avoid meeting hosts in private locations",
                      "Don't ignore red flags or safety concerns",
                      "Never leave valuables unattended",
                      "Don't provide access to your accounts",
                      "Avoid traveling to unverified properties",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <XCircleIcon className="h-5 w-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Emergency Contacts */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Emergency Contact Numbers
              </h2>
              <p className="text-gray-600">
                Important numbers to keep handy during your travels
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {emergencyContacts.map((contact, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <PhoneIcon className="h-5 w-5 mr-2 text-red-600" />
                      {contact.country}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium">Police:</span>
                        <Badge variant="outline">{contact.police}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Fire Department:</span>
                        <Badge variant="outline">{contact.fire}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Medical Emergency:</span>
                        <Badge variant="outline">{contact.medical}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">
                          Disaster Management:
                        </span>
                        <Badge variant="outline">{contact.disaster}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Reporting Safety Issues */}
        <section className="py-16">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Report Safety Concerns</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              If you encounter any safety issues during your stay, report them
              immediately. Your safety reports help us maintain a secure
              community for everyone.
            </p>

            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8">
                <InfoIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">
                  24/7 Safety Support
                </h3>
                <p className="text-gray-600 mb-6">
                  Our dedicated safety team is available around the clock to
                  assist with any safety-related concerns.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Badge variant="outline" className="p-3">
                    <PhoneIcon className="h-4 w-4 mr-2" />
                    +91-800-123-4567
                  </Badge>
                  <Badge variant="outline" className="p-3">
                    <MessageCircleIcon className="h-4 w-4 mr-2" />
                    safety@stayconnect.com
                  </Badge>
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

export default SafetyInformation;
