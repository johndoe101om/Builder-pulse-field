import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  ClockIcon,
  IndianRupeeIcon,
  InfoIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  RefreshCwIcon,
  ShieldIcon,
} from "lucide-react";

const CancellationOptions = () => {
  const cancellationPolicies = [
    {
      name: "Flexible",
      icon: CheckCircleIcon,
      color: "bg-green-500",
      tagline: "Free cancellation until 24 hours before check-in",
      description: "Perfect for uncertain travel plans",
      features: [
        "Full refund if cancelled 24+ hours before check-in",
        "50% refund if cancelled within 24 hours",
        "No refund if cancelled after check-in",
      ],
      timeline: "24 hours",
      refundAmount: "100%",
      bestFor: "Uncertain travel plans",
    },
    {
      name: "Moderate",
      icon: ClockIcon,
      color: "bg-orange-500",
      tagline: "Free cancellation until 5 days before check-in",
      description: "Balanced flexibility and commitment",
      features: [
        "Full refund if cancelled 5+ days before check-in",
        "50% refund if cancelled within 5 days",
        "No refund if cancelled within 48 hours of check-in",
      ],
      timeline: "5 days",
      refundAmount: "100%",
      bestFor: "Most bookings",
    },
    {
      name: "Strict",
      icon: XCircleIcon,
      color: "bg-red-500",
      tagline: "Free cancellation until 14 days before check-in",
      description: "Lower rates, stricter terms",
      features: [
        "Full refund if cancelled 14+ days before check-in",
        "50% refund if cancelled within 14 days",
        "No refund if cancelled within 7 days of check-in",
      ],
      timeline: "14 days",
      refundAmount: "100%",
      bestFor: "Confirmed travel plans",
    },
    {
      name: "Non-refundable",
      icon: XCircleIcon,
      color: "bg-gray-500",
      tagline: "No cancellation allowed",
      description: "Lowest prices, no flexibility",
      features: [
        "No refund for any cancellation",
        "Significant discount on booking price",
        "Best rates available",
      ],
      timeline: "No cancellation",
      refundAmount: "0%",
      bestFor: "Definite travel plans",
    },
  ];

  const refundTimeline = [
    {
      step: 1,
      title: "Request Cancellation",
      description: "Cancel through your StayConnect account",
      time: "Immediate",
    },
    {
      step: 2,
      title: "Policy Review",
      description: "We review your cancellation against the property's policy",
      time: "Within 24 hours",
    },
    {
      step: 3,
      title: "Refund Processing",
      description:
        "Eligible refunds are processed to your original payment method",
      time: "3-5 business days",
    },
    {
      step: 4,
      title: "Refund Completion",
      description: "Funds appear in your account",
      time: "5-10 business days",
    },
  ];

  const specialCircumstances = [
    {
      title: "Extenuating Circumstances",
      icon: ShieldIcon,
      description: "We may provide full refunds for unavoidable situations",
      examples: [
        "Natural disasters affecting travel",
        "Government travel restrictions",
        "Serious illness or injury",
        "Family emergencies",
        "Property becomes uninhabitable",
      ],
    },
    {
      title: "Host Cancellation",
      icon: AlertTriangleIcon,
      description: "If your host cancels, you're fully protected",
      benefits: [
        "Full refund of all payments",
        "Assistance finding alternative accommodation",
        "Rebooking assistance with similar properties",
        "Host penalties to prevent future cancellations",
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
            <RefreshCwIcon className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Cancellation Policies
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Understand your cancellation options and refund policies for
              stress-free travel planning
            </p>
          </div>
        </section>

        {/* Important Notice */}
        <section className="py-8 bg-amber-50">
          <div className="container">
            <Alert className="border-amber-200 bg-amber-50">
              <InfoIcon className="h-5 w-5 text-amber-600" />
              <AlertDescription className="text-amber-800">
                <strong>Important:</strong> Cancellation policies vary by
                property. Always check the specific policy before booking. The
                policy shown on the property listing applies to your
                reservation.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Cancellation Policies */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Cancellation Policy Types
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Different properties offer different cancellation policies.
                Choose what works best for your travel style.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {cancellationPolicies.map((policy, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 ${policy.color} rounded-full flex items-center justify-center`}
                        >
                          <policy.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">
                            {policy.name}
                          </CardTitle>
                          <Badge variant="outline" className="mt-1">
                            {policy.bestFor}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 mt-2">{policy.tagline}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{policy.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <CalendarIcon className="h-5 w-5 mx-auto mb-1 text-gray-600" />
                        <div className="text-sm text-gray-600">
                          Free cancellation until
                        </div>
                        <div className="font-semibold">{policy.timeline}</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <IndianRupeeIcon className="h-5 w-5 mx-auto mb-1 text-gray-600" />
                        <div className="text-sm text-gray-600">
                          Max refund amount
                        </div>
                        <div className="font-semibold">
                          {policy.refundAmount}
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-2">
                      {policy.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircleIcon className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">
                            {feature}
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

        {/* Refund Timeline */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How Refunds Work</h2>
              <p className="text-gray-600 text-lg">
                Step-by-step process for getting your refund
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {refundTimeline.map((step, index) => (
                  <Card key={index} className="text-center relative">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                        {step.step}
                      </div>
                      <h3 className="font-semibold text-lg mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {step.description}
                      </p>
                      <Badge variant="secondary">{step.time}</Badge>
                    </CardContent>
                    {index < refundTimeline.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-blue-200"></div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Special Circumstances */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Special Circumstances</h2>
              <p className="text-gray-600 text-lg">
                Additional protections for unexpected situations
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {specialCircumstances.map((circumstance, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <circumstance.icon className="h-6 w-6 text-blue-600 mr-3" />
                      {circumstance.title}
                    </CardTitle>
                    <p className="text-gray-600">{circumstance.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {(circumstance.examples || circumstance.benefits)?.map(
                        (item, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircleIcon className="h-4 w-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How to Cancel */}
        <section className="py-16 bg-blue-50">
          <div className="container">
            <Card className="max-w-3xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">
                  How to Cancel Your Booking
                </CardTitle>
                <p className="text-gray-600">
                  Follow these simple steps to cancel your reservation
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold">Log in to your account</h3>
                      <p className="text-gray-600">
                        Access your StayConnect account and go to your trips
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold">Find your booking</h3>
                      <p className="text-gray-600">
                        Locate the reservation you want to cancel
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        Review cancellation policy
                      </h3>
                      <p className="text-gray-600">
                        Check the refund amount and policy details
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="font-semibold">Confirm cancellation</h3>
                      <p className="text-gray-600">
                        Click "Cancel booking" and confirm your decision
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-8">
                  <Button size="lg">View My Bookings</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Need Help */}
        <section className="py-16">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">
              Need Help with Cancellation?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Our support team is here to help you understand your options and
              process cancellations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">Contact Support</Button>
              <Button size="lg" variant="outline">
                View Help Center
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CancellationOptions;
