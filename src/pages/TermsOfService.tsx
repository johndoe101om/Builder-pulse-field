import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  FileTextIcon,
  InfoIcon,
  ShieldIcon,
  UsersIcon,
  CreditCardIcon,
  HomeIcon,
  AlertTriangleIcon,
  CalendarIcon,
} from "lucide-react";

const TermsOfService = () => {
  const lastUpdated = "January 15, 2024";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-slate-600 to-gray-600 text-white py-16">
          <div className="container text-center">
            <FileTextIcon className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-slate-100 mb-6 max-w-3xl mx-auto">
              These terms govern your use of StayConnect services. Please read
              them carefully.
            </p>
            <div className="flex items-center justify-center space-x-2 text-slate-200">
              <CalendarIcon className="h-5 w-5" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>
        </section>

        {/* Important Notice */}
        <section className="py-8 bg-amber-50">
          <div className="container">
            <Alert className="border-amber-200 bg-amber-50 max-w-4xl mx-auto">
              <InfoIcon className="h-5 w-5 text-amber-600" />
              <AlertDescription className="text-amber-800">
                <strong>Important:</strong> By accessing or using StayConnect,
                you agree to be bound by these Terms of Service. If you do not
                agree to these terms, please do not use our platform.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="py-12">
          <div className="container">
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle>Table of Contents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "1. Acceptance of Terms",
                    "2. Description of Service",
                    "3. User Accounts",
                    "4. Host Terms",
                    "5. Guest Terms",
                    "6. Payment Terms",
                    "7. Cancellation Policy",
                    "8. User Conduct",
                    "9. Privacy and Data",
                    "10. Intellectual Property",
                    "11. Limitation of Liability",
                    "12. Dispute Resolution",
                    "13. Governing Law",
                    "14. Changes to Terms",
                    "15. Contact Information",
                  ].map((item, index) => (
                    <a
                      key={index}
                      href={`#section-${index + 1}`}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-8">
          <div className="container">
            <div className="max-w-4xl mx-auto space-y-12">
              {/* Section 1 */}
              <Card id="section-1">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileTextIcon className="h-6 w-6 mr-3 text-blue-600" />
                    1. Acceptance of Terms
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>
                    By accessing and using StayConnect ("Service", "Platform"),
                    operated by StayConnect Private Limited ("Company", "we",
                    "us", or "our"), you accept and agree to be bound by the
                    terms and provision of this agreement.
                  </p>
                  <p>
                    These Terms of Service ("Terms") apply to all users of the
                    service, including without limitation users who are
                    browsers, vendors, customers, merchants, and/or contributors
                    of content.
                  </p>
                </CardContent>
              </Card>

              {/* Section 2 */}
              <Card id="section-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <InfoIcon className="h-6 w-6 mr-3 text-green-600" />
                    2. Description of Service
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>
                    StayConnect is an online marketplace that enables users
                    ("Hosts") to list, offer, search for, and book
                    accommodations ("Listings") with other users ("Guests"). You
                    understand and agree that StayConnect is not a party to any
                    agreements entered into between Hosts and Guests, nor is
                    StayConnect a real estate broker or insurer.
                  </p>
                  <p>Our platform provides:</p>
                  <ul>
                    <li>Property listing and discovery services</li>
                    <li>Booking and payment processing</li>
                    <li>Communication tools between hosts and guests</li>
                    <li>Review and rating systems</li>
                    <li>Customer support services</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Section 3 */}
              <Card id="section-3">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <UsersIcon className="h-6 w-6 mr-3 text-purple-600" />
                    3. User Accounts
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>
                    To access certain features of our Service, you must register
                    for an account. When you create an account, you must provide
                    information that is accurate, complete, and current at all
                    times.
                  </p>
                  <p>You are responsible for:</p>
                  <ul>
                    <li>
                      Safeguarding your account password and all activities
                      under your account
                    </li>
                    <li>
                      Maintaining accurate and up-to-date account information
                    </li>
                    <li>
                      Notifying us immediately of any unauthorized access or
                      security breach
                    </li>
                    <li>
                      Ensuring you meet the minimum age requirement (18 years or
                      older)
                    </li>
                  </ul>
                  <p>
                    You may not create an account if you have been previously
                    banned from our platform or if creating an account would
                    violate any applicable laws.
                  </p>
                </CardContent>
              </Card>

              {/* Section 4 */}
              <Card id="section-4">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <HomeIcon className="h-6 w-6 mr-3 text-orange-600" />
                    4. Host Terms
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>As a Host, you agree to:</p>
                  <ul>
                    <li>
                      Provide accurate information about your listing, including
                      photos, descriptions, and amenities
                    </li>
                    <li>
                      Honor confirmed reservations and provide accommodations as
                      described
                    </li>
                    <li>
                      Comply with applicable laws, regulations, and building
                      rules
                    </li>
                    <li>
                      Maintain appropriate insurance coverage for your property
                    </li>
                    <li>
                      Respond to guest inquiries and booking requests in a
                      timely manner
                    </li>
                    <li>
                      Ensure your property meets safety and cleanliness
                      standards
                    </li>
                  </ul>
                  <p>
                    You acknowledge that you are solely responsible for your
                    listing content and any interactions with guests.
                    StayConnect reserves the right to remove listings that
                    violate these terms or applicable laws.
                  </p>
                </CardContent>
              </Card>

              {/* Section 5 */}
              <Card id="section-5">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <UsersIcon className="h-6 w-6 mr-3 text-blue-600" />
                    5. Guest Terms
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>As a Guest, you agree to:</p>
                  <ul>
                    <li>Provide accurate information when making bookings</li>
                    <li>Use accommodations only for their intended purpose</li>
                    <li>Comply with house rules set by the Host</li>
                    <li>
                      Treat the Host's property and belongings with care and
                      respect
                    </li>
                    <li>Pay all amounts due under the booking agreement</li>
                    <li>
                      Leave the accommodation in the same condition as found
                    </li>
                  </ul>
                  <p>
                    You are responsible for your own acts and omissions and are
                    also responsible for the acts and omissions of any
                    individuals you include in a booking or allow in the
                    accommodation.
                  </p>
                </CardContent>
              </Card>

              {/* Section 6 */}
              <Card id="section-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCardIcon className="h-6 w-6 mr-3 text-green-600" />
                    6. Payment Terms
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>
                    StayConnect processes payments for bookings made through our
                    platform. By making a booking, you authorize us to charge
                    your selected payment method for the total amount due.
                  </p>
                  <p>Payment terms include:</p>
                  <ul>
                    <li>
                      Guests pay the full booking amount at the time of
                      reservation
                    </li>
                    <li>
                      Host payouts are processed according to our payout
                      schedule
                    </li>
                    <li>Platform fees are deducted from Host earnings</li>
                    <li>All payments are processed in Indian Rupees (₹)</li>
                    <li>
                      Refunds are subject to the applicable cancellation policy
                    </li>
                  </ul>
                  <p>
                    You are responsible for any taxes, fees, or other charges
                    imposed by your bank or payment provider.
                  </p>
                </CardContent>
              </Card>

              {/* Section 7 */}
              <Card id="section-7">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CalendarIcon className="h-6 w-6 mr-3 text-red-600" />
                    7. Cancellation Policy
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>
                    Cancellation policies are set by individual Hosts and may
                    vary by listing. The applicable cancellation policy is
                    displayed during the booking process and in your booking
                    confirmation.
                  </p>
                  <p>
                    StayConnect offers several standard cancellation policies:
                  </p>
                  <ul>
                    <li>
                      <strong>Flexible:</strong> Full refund 24 hours before
                      check-in
                    </li>
                    <li>
                      <strong>Moderate:</strong> Full refund 5 days before
                      check-in
                    </li>
                    <li>
                      <strong>Strict:</strong> Full refund 14 days before
                      check-in
                    </li>
                    <li>
                      <strong>Non-refundable:</strong> No refund available
                    </li>
                  </ul>
                  <p>
                    In exceptional circumstances, we may provide refunds outside
                    of the stated cancellation policy, including for qualifying
                    extenuating circumstances.
                  </p>
                </CardContent>
              </Card>

              {/* Section 8 */}
              <Card id="section-8">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ShieldIcon className="h-6 w-6 mr-3 text-indigo-600" />
                    8. User Conduct
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>You agree not to use our Service to:</p>
                  <ul>
                    <li>Violate any applicable laws or regulations</li>
                    <li>Infringe upon the rights of others</li>
                    <li>Post false, misleading, or fraudulent content</li>
                    <li>Engage in discriminatory practices</li>
                    <li>Harass, abuse, or harm other users</li>
                    <li>
                      Use the platform for any commercial purpose not expressly
                      permitted
                    </li>
                    <li>Attempt to circumvent our fee structure</li>
                    <li>
                      Interfere with the proper functioning of our platform
                    </li>
                  </ul>
                  <p>
                    We reserve the right to suspend or terminate accounts that
                    violate these conduct standards.
                  </p>
                </CardContent>
              </Card>

              {/* Section 9 */}
              <Card id="section-9">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ShieldIcon className="h-6 w-6 mr-3 text-gray-600" />
                    9. Privacy and Data
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>
                    Your privacy is important to us. Our Privacy Policy explains
                    how we collect, use, and protect your information when you
                    use our Service. By using our Service, you agree to our
                    Privacy Policy.
                  </p>
                  <p>We collect and process data to:</p>
                  <ul>
                    <li>Provide and improve our services</li>
                    <li>Process bookings and payments</li>
                    <li>Communicate with users</li>
                    <li>Ensure platform safety and security</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Section 10 */}
              <Card id="section-10">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileTextIcon className="h-6 w-6 mr-3 text-purple-600" />
                    10. Intellectual Property
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>
                    The StayConnect platform and its original content, features,
                    and functionality are owned by StayConnect Private Limited
                    and are protected by international copyright, trademark,
                    patent, trade secret, and other intellectual property laws.
                  </p>
                  <p>
                    You retain ownership of content you submit to our platform,
                    but you grant us a worldwide, non-exclusive, royalty-free
                    license to use, copy, modify, and display such content in
                    connection with our Service.
                  </p>
                </CardContent>
              </Card>

              {/* Section 11 */}
              <Card id="section-11">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangleIcon className="h-6 w-6 mr-3 text-red-600" />
                    11. Limitation of Liability
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>
                    StayConnect acts as an intermediary between Hosts and
                    Guests. We do not own, control, offer, or manage any
                    accommodations or experiences. Our role is limited to
                    facilitating introductions and transactions between users.
                  </p>
                  <p>
                    To the maximum extent permitted by law, StayConnect shall
                    not be liable for any indirect, incidental, special,
                    consequential, or punitive damages, including without
                    limitation, loss of profits, data, use, goodwill, or other
                    intangible losses.
                  </p>
                </CardContent>
              </Card>

              {/* Section 12 */}
              <Card id="section-12">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <UsersIcon className="h-6 w-6 mr-3 text-green-600" />
                    12. Dispute Resolution
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>
                    We encourage users to communicate directly to resolve any
                    disputes. If you have a dispute with another user, you
                    should first attempt to resolve it directly with that user.
                  </p>
                  <p>
                    For disputes that cannot be resolved directly, we provide a
                    resolution center to help mediate conflicts. Any unresolved
                    disputes shall be settled through binding arbitration in
                    accordance with the laws of India.
                  </p>
                </CardContent>
              </Card>

              {/* Section 13 */}
              <Card id="section-13">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ShieldIcon className="h-6 w-6 mr-3 text-blue-600" />
                    13. Governing Law
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>
                    These Terms shall be interpreted and governed by the laws of
                    India, without regard to its conflict of law provisions. The
                    courts of Mumbai, India shall have exclusive jurisdiction
                    over any disputes arising from these Terms.
                  </p>
                </CardContent>
              </Card>

              {/* Section 14 */}
              <Card id="section-14">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CalendarIcon className="h-6 w-6 mr-3 text-orange-600" />
                    14. Changes to Terms
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>
                    We reserve the right to modify or replace these Terms at any
                    time. If a revision is material, we will provide at least 30
                    days notice prior to any new terms taking effect.
                  </p>
                  <p>
                    Your continued use of our Service after any such changes
                    constitutes your acceptance of the new Terms of Service.
                  </p>
                </CardContent>
              </Card>

              {/* Section 15 */}
              <Card id="section-15">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <InfoIcon className="h-6 w-6 mr-3 text-indigo-600" />
                    15. Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>
                    If you have any questions about these Terms of Service,
                    please contact us:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p>
                      <strong>StayConnect Private Limited</strong>
                    </p>
                    <p>Email: legal@stayconnect.com</p>
                    <p>Phone: +91-800-123-4567</p>
                    <p>
                      Address: BKC, Bandra East, Mumbai, Maharashtra 400051,
                      India
                    </p>
                  </div>
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

export default TermsOfService;
