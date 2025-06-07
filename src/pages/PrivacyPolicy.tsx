import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ShieldIcon,
  InfoIcon,
  EyeIcon,
  LockIcon,
  UsersIcon,
  MailIcon,
  CalendarIcon,
  DatabaseIcon,
  GlobeIcon,
  SettingsIcon,
} from "lucide-react";

const PrivacyPolicy = () => {
  const lastUpdated = "January 15, 2024";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
          <div className="container text-center">
            <ShieldIcon className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-green-100 mb-6 max-w-3xl mx-auto">
              We are committed to protecting your privacy and ensuring the
              security of your personal information.
            </p>
            <div className="flex items-center justify-center space-x-2 text-green-200">
              <CalendarIcon className="h-5 w-5" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>
        </section>

        {/* Important Notice */}
        <section className="py-8 bg-blue-50">
          <div className="container">
            <Alert className="border-blue-200 bg-blue-50 max-w-4xl mx-auto">
              <InfoIcon className="h-5 w-5 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>Your Privacy Matters:</strong> This Privacy Policy
                explains how StayConnect collects, uses, and protects your
                personal information. We are committed to transparency and your
                data rights.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Quick Overview */}
        <section className="py-12">
          <div className="container">
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle>Privacy at a Glance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <LockIcon className="h-8 w-8 text-green-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Data Security</h3>
                    <p className="text-gray-600 text-sm">
                      We use industry-standard encryption and security measures
                      to protect your information.
                    </p>
                  </div>
                  <div className="text-center">
                    <EyeIcon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Transparency</h3>
                    <p className="text-gray-600 text-sm">
                      We clearly explain what data we collect and how we use it
                      for platform operations.
                    </p>
                  </div>
                  <div className="text-center">
                    <SettingsIcon className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Your Control</h3>
                    <p className="text-gray-600 text-sm">
                      You have control over your privacy settings and can manage
                      your data preferences.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Privacy Content */}
        <section className="py-8">
          <div className="container">
            <div className="max-w-4xl mx-auto space-y-12">
              {/* Information We Collect */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DatabaseIcon className="h-6 w-6 mr-3 text-blue-600" />
                    Information We Collect
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <h4>Account Information</h4>
                  <ul>
                    <li>Name, email address, phone number</li>
                    <li>Profile picture and bio</li>
                    <li>Verification documents (ID, address proof)</li>
                    <li>
                      Payment information (processed securely by third-party
                      providers)
                    </li>
                  </ul>

                  <h4>Listing Information</h4>
                  <ul>
                    <li>Property details, photos, and descriptions</li>
                    <li>Location and address information</li>
                    <li>Pricing and availability data</li>
                    <li>House rules and policies</li>
                  </ul>

                  <h4>Usage Information</h4>
                  <ul>
                    <li>Booking history and preferences</li>
                    <li>Search queries and filters</li>
                    <li>Communication between hosts and guests</li>
                    <li>Reviews and ratings</li>
                    <li>Device information and IP address</li>
                    <li>Website usage analytics</li>
                  </ul>
                </CardContent>
              </Card>

              {/* How We Use Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <SettingsIcon className="h-6 w-6 mr-3 text-green-600" />
                    How We Use Your Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <h4>Platform Operations</h4>
                  <ul>
                    <li>Create and manage user accounts</li>
                    <li>Process bookings and payments</li>
                    <li>Facilitate communication between users</li>
                    <li>Provide customer support</li>
                    <li>Verify user identity and prevent fraud</li>
                  </ul>

                  <h4>Service Improvement</h4>
                  <ul>
                    <li>Analyze usage patterns to improve our platform</li>
                    <li>Personalize search results and recommendations</li>
                    <li>Develop new features and services</li>
                    <li>Conduct research and analytics</li>
                  </ul>

                  <h4>Communication</h4>
                  <ul>
                    <li>Send booking confirmations and updates</li>
                    <li>Provide customer support responses</li>
                    <li>Share important platform announcements</li>
                    <li>Send marketing communications (with your consent)</li>
                  </ul>

                  <h4>Legal and Safety</h4>
                  <ul>
                    <li>Comply with legal obligations</li>
                    <li>Enforce our Terms of Service</li>
                    <li>Protect against fraud and abuse</li>
                    <li>Ensure platform safety and security</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Information Sharing */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <UsersIcon className="h-6 w-6 mr-3 text-purple-600" />
                    Information Sharing
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <h4>With Other Users</h4>
                  <p>
                    We share certain information to facilitate bookings and
                    communication between hosts and guests, including profile
                    information, property details, and messages.
                  </p>

                  <h4>With Service Providers</h4>
                  <p>We work with trusted third-party service providers for:</p>
                  <ul>
                    <li>Payment processing (Razorpay, Stripe)</li>
                    <li>Email and SMS communications</li>
                    <li>Data analytics and insights</li>
                    <li>Customer support tools</li>
                    <li>Identity verification services</li>
                  </ul>

                  <h4>Legal Requirements</h4>
                  <p>We may disclose information when required by law or to:</p>
                  <ul>
                    <li>Comply with legal processes or government requests</li>
                    <li>Protect our rights and property</li>
                    <li>Ensure user safety and platform security</li>
                    <li>Investigate potential violations of our terms</li>
                  </ul>

                  <h4>Business Transfers</h4>
                  <p>
                    In the event of a merger, acquisition, or sale, user
                    information may be transferred as part of the business
                    assets, subject to appropriate privacy protections.
                  </p>
                </CardContent>
              </Card>

              {/* Data Security */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <LockIcon className="h-6 w-6 mr-3 text-red-600" />
                    Data Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>
                    We implement comprehensive security measures to protect your
                    personal information:
                  </p>

                  <h4>Technical Safeguards</h4>
                  <ul>
                    <li>SSL/TLS encryption for data transmission</li>
                    <li>Secure data storage with encryption at rest</li>
                    <li>Regular security audits and penetration testing</li>
                    <li>Multi-factor authentication for accounts</li>
                    <li>Secure payment processing with PCI compliance</li>
                  </ul>

                  <h4>Organizational Measures</h4>
                  <ul>
                    <li>
                      Limited access to personal data on a need-to-know basis
                    </li>
                    <li>Employee training on data protection practices</li>
                    <li>Incident response procedures for security breaches</li>
                    <li>Regular privacy and security policy updates</li>
                  </ul>

                  <p>
                    While we strive to protect your information, no method of
                    transmission over the internet or electronic storage is 100%
                    secure. We cannot guarantee absolute security but are
                    committed to using industry best practices.
                  </p>
                </CardContent>
              </Card>

              {/* Your Rights */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <EyeIcon className="h-6 w-6 mr-3 text-indigo-600" />
                    Your Privacy Rights
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>
                    You have the following rights regarding your personal
                    information:
                  </p>

                  <h4>Access and Portability</h4>
                  <ul>
                    <li>Request a copy of your personal data</li>
                    <li>Download your data in a portable format</li>
                    <li>Access information about how we process your data</li>
                  </ul>

                  <h4>Correction and Updates</h4>
                  <ul>
                    <li>Update your profile and account information</li>
                    <li>Correct inaccurate or incomplete data</li>
                    <li>Request verification of data accuracy</li>
                  </ul>

                  <h4>Deletion and Restriction</h4>
                  <ul>
                    <li>Request deletion of your account and data</li>
                    <li>Restrict processing of your information</li>
                    <li>Object to certain types of data processing</li>
                  </ul>

                  <h4>Communication Preferences</h4>
                  <ul>
                    <li>Opt out of marketing communications</li>
                    <li>Manage notification settings</li>
                    <li>Control data sharing preferences</li>
                  </ul>

                  <p>
                    To exercise these rights, contact us at
                    privacy@stayconnect.com. We will respond to your request
                    within 30 days and may require identity verification for
                    security purposes.
                  </p>
                </CardContent>
              </Card>

              {/* Cookies and Tracking */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <GlobeIcon className="h-6 w-6 mr-3 text-orange-600" />
                    Cookies and Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>
                    We use cookies and similar technologies to improve your
                    experience on our platform:
                  </p>

                  <h4>Essential Cookies</h4>
                  <ul>
                    <li>Authentication and account management</li>
                    <li>Security and fraud prevention</li>
                    <li>Basic platform functionality</li>
                  </ul>

                  <h4>Analytics Cookies</h4>
                  <ul>
                    <li>Usage statistics and performance metrics</li>
                    <li>Error tracking and debugging</li>
                    <li>Platform optimization insights</li>
                  </ul>

                  <h4>Preference Cookies</h4>
                  <ul>
                    <li>Language and region settings</li>
                    <li>Search filters and preferences</li>
                    <li>Display customizations</li>
                  </ul>

                  <h4>Marketing Cookies</h4>
                  <ul>
                    <li>Personalized recommendations</li>
                    <li>Targeted advertising (with consent)</li>
                    <li>Social media integrations</li>
                  </ul>

                  <p>
                    You can manage cookie preferences through your browser
                    settings or our cookie consent banner. Note that disabling
                    certain cookies may impact platform functionality.
                  </p>
                </CardContent>
              </Card>

              {/* Data Retention */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CalendarIcon className="h-6 w-6 mr-3 text-gray-600" />
                    Data Retention
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>
                    We retain your personal information for different periods
                    based on the type of data and purpose:
                  </p>

                  <h4>Account Information</h4>
                  <ul>
                    <li>Active accounts: Until account deletion</li>
                    <li>Inactive accounts: 3 years from last activity</li>
                    <li>Verification documents: 5 years for compliance</li>
                  </ul>

                  <h4>Transaction Data</h4>
                  <ul>
                    <li>
                      Booking records: 7 years for tax and legal compliance
                    </li>
                    <li>
                      Payment information: As required by payment processors
                    </li>
                    <li>Communication logs: 2 years for support purposes</li>
                  </ul>

                  <h4>Analytics Data</h4>
                  <ul>
                    <li>Aggregated usage data: Indefinitely (anonymized)</li>
                    <li>Individual usage logs: 2 years</li>
                    <li>Marketing data: Until consent withdrawal</li>
                  </ul>

                  <p>
                    When data is no longer needed, we securely delete or
                    anonymize it. Some information may be retained longer if
                    required by law or for legitimate business purposes.
                  </p>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MailIcon className="h-6 w-6 mr-3 text-blue-600" />
                    Contact Us
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>
                    If you have questions about this Privacy Policy or how we
                    handle your data, please contact us:
                  </p>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4>Data Protection Officer</h4>
                    <p>
                      <strong>StayConnect Private Limited</strong>
                    </p>
                    <p>Email: privacy@stayconnect.com</p>
                    <p>Phone: +91-800-123-4567</p>
                    <p>
                      Address: BKC, Bandra East, Mumbai, Maharashtra 400051,
                      India
                    </p>
                  </div>

                  <p>
                    We are committed to resolving any privacy concerns promptly
                    and will respond to your inquiries within 30 days.
                  </p>
                </CardContent>
              </Card>

              {/* Changes to Policy */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <InfoIcon className="h-6 w-6 mr-3 text-green-600" />
                    Changes to This Policy
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>
                    We may update this Privacy Policy from time to time to
                    reflect changes in our practices, technology, legal
                    requirements, or other factors.
                  </p>

                  <p>When we make changes, we will:</p>
                  <ul>
                    <li>
                      Update the "Last Modified" date at the top of this policy
                    </li>
                    <li>
                      Notify users of material changes via email or platform
                      notification
                    </li>
                    <li>
                      Provide at least 30 days notice for significant changes
                    </li>
                    <li>
                      Obtain consent for changes that expand data collection or
                      use
                    </li>
                  </ul>

                  <p>
                    Your continued use of our platform after any changes
                    indicates your acceptance of the updated policy. We
                    encourage you to review this policy periodically to stay
                    informed about how we protect your information.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
