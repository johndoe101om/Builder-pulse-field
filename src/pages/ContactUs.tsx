import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PhoneIcon,
  MessageCircleIcon,
  MailIcon,
  ClockIcon,
  MapPinIcon,
  HeadphonesIcon,
  AlertCircleIcon,
  HelpCircleIcon,
  CreditCardIcon,
  HomeIcon,
  UserIcon,
  SendIcon,
  CheckCircleIcon,
} from "lucide-react";
import { toast } from "sonner";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
    urgency: "normal",
  });

  const contactOptions = [
    {
      icon: MessageCircleIcon,
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "24/7",
      responseTime: "< 2 minutes",
      badge: "Fastest",
      color: "bg-green-500",
    },
    {
      icon: PhoneIcon,
      title: "Phone Support",
      description: "Speak directly with our experts",
      availability: "24/7",
      responseTime: "Immediate",
      badge: "Direct",
      color: "bg-blue-500",
    },
    {
      icon: MailIcon,
      title: "Email Support",
      description: "Send us a detailed message",
      availability: "24/7",
      responseTime: "< 24 hours",
      badge: "Detailed",
      color: "bg-purple-500",
    },
  ];

  const supportCategories = [
    {
      icon: AlertCircleIcon,
      title: "Emergency Support",
      description: "Urgent issues during your stay",
    },
    {
      icon: CreditCardIcon,
      title: "Payment & Billing",
      description: "Payment issues, refunds, receipts",
    },
    {
      icon: HomeIcon,
      title: "Booking Support",
      description: "Reservations, modifications, cancellations",
    },
    {
      icon: UserIcon,
      title: "Account Help",
      description: "Profile, verification, login issues",
    },
    {
      icon: HelpCircleIcon,
      title: "General Questions",
      description: "Platform questions and guidance",
    },
    {
      icon: HeadphonesIcon,
      title: "Technical Issues",
      description: "Website, app, or system problems",
    },
  ];

  const officeLocations = [
    {
      city: "Mumbai",
      address: "BKC, Bandra East, Mumbai, Maharashtra 400051",
      phone: "+91-22-6789-0123",
      hours: "24/7 Support Center",
    },
    {
      city: "Bangalore",
      address: "Electronic City, Bengaluru, Karnataka 560100",
      phone: "+91-80-1234-5678",
      hours: "24/7 Support Center",
    },
    {
      city: "Delhi",
      address: "Connaught Place, New Delhi, Delhi 110001",
      phone: "+91-11-9876-5432",
      hours: "24/7 Support Center",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    toast.success("Message sent successfully! We'll respond within 24 hours.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      category: "",
      message: "",
      urgency: "normal",
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="container text-center">
            <HeadphonesIcon className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              We're Here to Help
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Get in touch with our support team. We're available 24/7 to assist
              you with any questions or concerns about your StayConnect
              experience.
            </p>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="py-8 bg-red-50">
          <div className="container">
            <Card className="border-red-200 bg-red-50 max-w-4xl mx-auto">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <AlertCircleIcon className="h-6 w-6 text-red-600" />
                  <div>
                    <h3 className="font-semibold text-red-800">
                      Emergency Support
                    </h3>
                    <p className="text-red-700">
                      For urgent issues during your stay, call our emergency
                      line:
                      <strong className="ml-2">+91-800-URGENT (864368)</strong>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Options */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Choose How to Reach Us
              </h2>
              <p className="text-gray-600 text-lg">
                Select the method that works best for you
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {contactOptions.map((option, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <CardContent className="p-8">
                    <div
                      className={`w-16 h-16 ${option.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <option.icon className="h-8 w-8 text-white" />
                    </div>
                    <Badge className="mb-3">{option.badge}</Badge>
                    <h3 className="font-semibold text-xl mb-2">
                      {option.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{option.description}</p>
                    <div className="space-y-2 text-sm text-gray-500">
                      <div className="flex items-center justify-center">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {option.availability}
                      </div>
                      <div>Response time: {option.responseTime}</div>
                    </div>
                    <Button className="w-full mt-4">Get Help Now</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Support Categories */}
              <div>
                <h2 className="text-3xl font-bold mb-8">
                  What can we help you with?
                </h2>
                <div className="space-y-4">
                  {supportCategories.map((category, index) => (
                    <Card
                      key={index}
                      className="hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <category.icon className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{category.title}</h3>
                            <p className="text-gray-600 text-sm">
                              {category.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a message</CardTitle>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you soon
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleChange("email", e.target.value)
                          }
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        onValueChange={(value) =>
                          handleChange("category", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="emergency">
                            Emergency Support
                          </SelectItem>
                          <SelectItem value="booking">
                            Booking Support
                          </SelectItem>
                          <SelectItem value="payment">
                            Payment & Billing
                          </SelectItem>
                          <SelectItem value="account">Account Help</SelectItem>
                          <SelectItem value="technical">
                            Technical Issues
                          </SelectItem>
                          <SelectItem value="general">
                            General Questions
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) =>
                          handleChange("subject", e.target.value)
                        }
                        placeholder="Brief description of your issue"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="urgency">Urgency Level</Label>
                      <Select
                        value={formData.urgency}
                        onValueChange={(value) =>
                          handleChange("urgency", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">
                            Low - General inquiry
                          </SelectItem>
                          <SelectItem value="normal">
                            Normal - Standard support
                          </SelectItem>
                          <SelectItem value="high">
                            High - Urgent issue
                          </SelectItem>
                          <SelectItem value="critical">
                            Critical - Emergency
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) =>
                          handleChange("message", e.target.value)
                        }
                        placeholder="Please provide detailed information about your issue..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      <SendIcon className="mr-2 h-5 w-5" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Office Locations */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Offices</h2>
              <p className="text-gray-600 text-lg">
                Visit us at any of our support centers across India
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {officeLocations.map((office, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <MapPinIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-semibold text-xl mb-2">
                      {office.city}
                    </h3>
                    <p className="text-gray-600 mb-3">{office.address}</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-center text-sm">
                        <PhoneIcon className="h-4 w-4 mr-2 text-gray-500" />
                        {office.phone}
                      </div>
                      <div className="flex items-center justify-center text-sm">
                        <ClockIcon className="h-4 w-4 mr-2 text-gray-500" />
                        {office.hours}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-blue-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 text-lg">
                Quick answers to common questions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  question: "How quickly will I get a response?",
                  answer:
                    "Live chat: < 2 minutes, Phone: Immediate, Email: < 24 hours",
                },
                {
                  question: "Is support available 24/7?",
                  answer:
                    "Yes, all our support channels are available 24 hours a day, 7 days a week.",
                },
                {
                  question: "Can I call for emergency help?",
                  answer:
                    "Yes, call +91-800-URGENT (864368) for immediate assistance during emergencies.",
                },
                {
                  question: "Do you offer support in multiple languages?",
                  answer:
                    "We provide support in English, Hindi, and several regional Indian languages.",
                },
                {
                  question: "How do I escalate my issue?",
                  answer:
                    "Mark your inquiry as 'High' or 'Critical' priority, or ask to speak with a supervisor.",
                },
                {
                  question: "Can I track my support request?",
                  answer:
                    "Yes, you'll receive a reference number to track your request status in your account.",
                },
              ].map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3">
                      <CheckCircleIcon className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-2">{faq.question}</h3>
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Help */}
        <section className="py-16">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Need More Help?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Explore our comprehensive help center or connect with our
              community for additional support
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline">
                Visit Help Center
              </Button>
              <Button size="lg" variant="outline">
                Community Forum
              </Button>
              <Button size="lg">Start Live Chat</Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactUs;
