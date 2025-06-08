import { Link } from "react-router-dom";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Search, Compass, Home } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { useAuth } from "@/contexts/AuthContext";

const Wishlist = () => {
  const { wishlistItems, clearWishlist } = useWishlist();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 bg-gray-50 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-8">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Sign in to save your favorites
            </h1>
            <p className="text-gray-600 mb-6">
              Create an account to save properties and access your wishlist from
              any device.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild>
                <Link to="/login">Sign in</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/signup">Sign up</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-50">
        <div className="container py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="h-8 w-8 text-red-500 fill-current" />
              <h1 className="text-3xl font-bold text-gray-900">
                Your Wishlist
              </h1>
            </div>
            <p className="text-gray-600">
              {wishlistItems.length > 0
                ? `${wishlistItems.length} saved ${wishlistItems.length === 1 ? "property" : "properties"}`
                : "Save properties you love to plan your perfect trip"}
            </p>
          </div>

          {wishlistItems.length === 0 ? (
            /* Empty State */
            <div className="text-center py-16">
              <Card className="max-w-md mx-auto">
                <CardContent className="p-12">
                  <Heart className="h-16 w-16 text-gray-300 mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    No saved properties yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Start exploring and save properties you love!
                  </p>
                  <div className="space-y-3">
                    <Button asChild className="w-full">
                      <Link to="/search">
                        <Search className="mr-2 h-4 w-4" />
                        Explore Properties
                      </Link>
                    </Button>
                    <Button variant="outline" asChild className="w-full">
                      <Link to="/search?amenities=Pool,Hot tub">
                        <Compass className="mr-2 h-4 w-4" />
                        Discover Adventures
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            /* Wishlist Content */
            <>
              {/* Actions Bar */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                  <Button variant="outline" asChild>
                    <Link to="/search">
                      <Search className="mr-2 h-4 w-4" />
                      Find More Properties
                    </Link>
                  </Button>
                </div>

                {wishlistItems.length > 0 && (
                  <Button
                    variant="outline"
                    onClick={clearWishlist}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Clear All
                  </Button>
                )}
              </div>

              {/* Properties Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlistItems.map((property) => (
                  <div key={property.id} className="relative group">
                    <PropertyCard
                      property={property}
                      className="transition-all duration-300 hover:shadow-xl"
                    />
                    {/* Wishlist Badge */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-1">
                        <Heart className="h-4 w-4 text-red-500 fill-current" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tips Section */}
              <Card className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Compass className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        💡 Travel Planning Tips
                      </h3>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>
                          • Save properties in different destinations to compare
                          options
                        </li>
                        <li>
                          • Check saved properties regularly as prices and
                          availability change
                        </li>
                        <li>
                          • Share your wishlist with travel companions for group
                          planning
                        </li>
                        <li>
                          • Book early for popular destinations and peak seasons
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Wishlist;
