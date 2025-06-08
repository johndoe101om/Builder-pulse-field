import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Search,
  Menu,
  Home as HomeIcon,
  User,
  LogOut,
  Settings,
  Heart,
  MapPin,
  Users,
  HelpCircle,
  Compass,
  PlusCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useWishlist } from "@/contexts/WishlistContext";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export const Header = ({ onSearch }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { wishlistCount } = useWishlist();

  const isHomePage = location.pathname === "/";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const menuItems = [
    {
      icon: HomeIcon,
      label: "Home",
      path: "/",
      show: true,
    },
    {
      icon: Search,
      label: "Search",
      path: "/search",
      show: true,
    },
    {
      icon: MapPin,
      label: "Map",
      path: "/map",
      show: true,
    },
    {
      icon: Users,
      label: "Community",
      path: "/social",
      show: true,
    },
    {
      icon: Compass,
      label: "Experiences",
      path: "/experiences",
      show: true,
    },
    {
      icon: HelpCircle,
      label: "Help",
      path: "/help",
      show: true,
    },
    {
      icon: Heart,
      label: "Wishlist",
      path: "/wishlist",
      show: user && user.role !== "superadmin",
      badge: user ? wishlistCount : 0,
    },
    {
      icon: PlusCircle,
      label: "Become a host",
      path: "/add-listing",
      show: !user || user.role !== "superadmin",
    },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        isHomePage && "bg-transparent border-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Left Side - Hamburger Menu */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="p-2">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle className="flex items-center space-x-2">
                <HomeIcon className="h-6 w-6 text-primary" />
                <span>StayConnect</span>
              </SheetTitle>
              <SheetDescription>
                Discover amazing places to stay around the world
              </SheetDescription>
            </SheetHeader>

            <div className="mt-8 space-y-2">
              {menuItems.map((item) => {
                if (!item.show) return null;

                return (
                  <Button
                    key={item.path}
                    variant="ghost"
                    className="w-full justify-start h-12 text-left"
                    onClick={() => handleNavigation(item.path)}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && item.badge > 0 && (
                      <Badge variant="secondary">
                        {item.badge > 99 ? "99+" : item.badge}
                      </Badge>
                    )}
                  </Button>
                );
              })}

              {/* User-specific menu items */}
              {user && (
                <>
                  <div className="border-t my-4"></div>

                  {user.role === "superadmin" ? (
                    <>
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-12"
                        onClick={() =>
                          handleNavigation("/super-admin-dashboard")
                        }
                      >
                        <Settings className="mr-3 h-5 w-5" />
                        Super Admin Panel
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-12"
                        onClick={() => handleNavigation("/admin-dashboard")}
                      >
                        <Settings className="mr-3 h-5 w-5" />
                        Analytics Dashboard
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-12"
                        onClick={() => handleNavigation("/profile")}
                      >
                        <User className="mr-3 h-5 w-5" />
                        Profile
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-12"
                        onClick={() => handleNavigation("/guest-dashboard")}
                      >
                        <HomeIcon className="mr-3 h-5 w-5" />
                        Your trips
                      </Button>
                      {(user.role === "host" || user.role === "guest") && (
                        <Button
                          variant="ghost"
                          className="w-full justify-start h-12"
                          onClick={() => handleNavigation("/host-dashboard")}
                        >
                          <HomeIcon className="mr-3 h-5 w-5" />
                          Host dashboard
                        </Button>
                      )}
                    </>
                  )}

                  <div className="border-t my-4"></div>

                  <Button
                    variant="ghost"
                    className="w-full justify-start h-12"
                    onClick={() => handleNavigation("/settings")}
                  >
                    <Settings className="mr-3 h-5 w-5" />
                    Settings
                  </Button>

                  <Button
                    variant="ghost"
                    className="w-full justify-start h-12 text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    Log out
                  </Button>
                </>
              )}

              {/* Login/Signup for non-authenticated users */}
              {!user && (
                <>
                  <div className="border-t my-4"></div>
                  <Button
                    className="w-full"
                    onClick={() => handleNavigation("/login")}
                  >
                    Log in
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleNavigation("/signup")}
                  >
                    Sign up
                  </Button>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>

        {/* Center - Logo (hidden on mobile, visible on larger screens) */}
        <Link to="/" className="hidden md:flex items-center space-x-2">
          <HomeIcon className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">StayConnect</span>
        </Link>

        {/* Right Side - Profile Menu */}
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="p-1">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar} alt={user.firstName} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center space-x-2 p-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.firstName} />
                  <AvatarFallback>
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />

              {user.role === "superadmin" ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/super-admin-dashboard"
                      className="flex items-center"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Super Admin Panel
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/admin-dashboard" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Analytics Dashboard
                    </Link>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/wishlist" className="flex items-center">
                      <Heart className="mr-2 h-4 w-4" />
                      Wishlist
                      {wishlistCount > 0 && (
                        <Badge variant="secondary" className="ml-auto">
                          {wishlistCount}
                        </Badge>
                      )}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/guest-dashboard" className="flex items-center">
                      <HomeIcon className="mr-2 h-4 w-4" />
                      Your trips
                    </Link>
                  </DropdownMenuItem>
                  {(user.role === "host" || user.role === "guest") && (
                    <DropdownMenuItem asChild>
                      <Link to="/host-dashboard" className="flex items-center">
                        <HomeIcon className="mr-2 h-4 w-4" />
                        Host dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                </>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/settings" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center space-x-2">
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Log in
            </Button>
            <Button onClick={() => navigate("/signup")}>Sign up</Button>
          </div>
        )}
      </div>

      {/* Search Bar for non-home pages - Mobile friendly */}
      {!isHomePage && (
        <div className="border-t bg-background/95 backdrop-blur">
          <div className="container py-3">
            <form onSubmit={handleSearch} className="w-full max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
