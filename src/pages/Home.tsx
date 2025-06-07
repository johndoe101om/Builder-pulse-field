import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SearchBar } from "@/components/search/SearchBar";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  HomeIcon,
  ShieldCheckIcon,
  HeartIcon,
  TrendingUpIcon,
} from "lucide-react";
import { mockProperties } from "@/lib/mockData";

const Home = () => {
  const featuredProperties = mockProperties.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <div className="container relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Find your perfect stay
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Discover unique homes, apartments, and experiences around the
              world. Book instantly or connect with local hosts.
            </p>

            {/* Search Bar */}
            <div className="mb-8">
              <SearchBar variant="hero" />
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Button variant="outline" className="rounded-full">
                🏖️ Beach homes
              </Button>
              <Button variant="outline" className="rounded-full">
                🏔️ Mountain retreats
              </Button>
              <Button variant="outline" className="rounded-full">
                🏙️ City apartments
              </Button>
              <Button variant="outline" className="rounded-full">
                🏡 Unique stays
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured stays
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Handpicked properties that offer exceptional experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              View all properties
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why choose StayConnect?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-sm">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShieldCheckIcon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Verified hosts</h3>
                <p className="text-gray-600">
                  All our hosts are verified and vetted to ensure your safety
                  and satisfaction.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-sm">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <HeartIcon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Instant booking</h3>
                <p className="text-gray-600">
                  Book instantly with no waiting for host approval on selected
                  properties.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-sm">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUpIcon className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Best prices</h3>
                <p className="text-gray-600">
                  Competitive pricing with no hidden fees. What you see is what
                  you pay.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Host CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            Earn extra income by hosting
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Share your space and earn money by welcoming travelers from around
            the world.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/add-listing">
              <HomeIcon className="mr-2 h-5 w-5" />
              Become a host
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
