import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Search from "./pages/Search";
import PropertyDetail from "./pages/PropertyDetail";
import BookingPayment from "./pages/BookingPayment";
import GuestDashboard from "./pages/GuestDashboard";
import HostDashboard from "./pages/HostDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AddListing from "./pages/AddListing";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SuperAdminLogin from "./pages/SuperAdminLogin";
import NotFound from "./pages/NotFound";

// Support & Help Pages
import HelpCenter from "./pages/HelpCenter";
import SafetyInformation from "./pages/SafetyInformation";
import CancellationOptions from "./pages/CancellationOptions";
import DisabilitySupport from "./pages/DisabilitySupport";
import ContactUs from "./pages/ContactUs";

// Host Resource Pages
import HostResources from "./pages/HostResources";
import CommunityForum from "./pages/CommunityForum";
import ResponsibleHosting from "./pages/ResponsibleHosting";
import HostGuarantee from "./pages/HostGuarantee";

// Company Pages
import About from "./pages/About";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <WishlistProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/property/:id" element={<PropertyDetail />} />
              <Route path="/wishlist" element={<Wishlist />} />

              {/* Protected Routes */}
              <Route
                path="/booking/:id"
                element={
                  <ProtectedRoute>
                    <BookingPayment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/guest-dashboard"
                element={
                  <ProtectedRoute>
                    <GuestDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/host-dashboard"
                element={
                  <ProtectedRoute>
                    <HostDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin-dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add-listing"
                element={
                  <ProtectedRoute>
                    <AddListing />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              {/* Authentication Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Super Admin Route - Separate and Hidden */}
              <Route path="/sa-login" element={<SuperAdminLogin />} />
              <Route
                path="/super-admin-dashboard"
                element={<AdminDashboard />}
              />

              {/* Support & Help Routes */}
              <Route path="/help" element={<HelpCenter />} />
              <Route path="/safety" element={<SafetyInformation />} />
              <Route path="/cancellation" element={<CancellationOptions />} />
              <Route
                path="/disability-support"
                element={<DisabilitySupport />}
              />
              <Route path="/contact" element={<ContactUs />} />

              {/* Host Resource Routes */}
              <Route path="/host-resources" element={<HostResources />} />
              <Route path="/community-forum" element={<CommunityForum />} />
              <Route
                path="/responsible-hosting"
                element={<ResponsibleHosting />}
              />
              <Route path="/host-guarantee" element={<HostGuarantee />} />

              {/* Company Routes */}
              <Route path="/about" element={<About />} />
              <Route
                path="/careers"
                element={<div>Careers page coming soon...</div>}
              />
              <Route
                path="/press"
                element={<div>Press page coming soon...</div>}
              />
              <Route
                path="/investors"
                element={<div>Investors page coming soon...</div>}
              />
              <Route
                path="/terms"
                element={<div>Terms of Service page coming soon...</div>}
              />
              <Route
                path="/privacy"
                element={<div>Privacy Policy page coming soon...</div>}
              />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </WishlistProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
