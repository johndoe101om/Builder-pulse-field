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
  Search,
  Menu,
  Home as HomeIcon,
  User,
  LogOut,
  Settings,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useWishlist } from "@/contexts/WishlistContext";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export const Header = ({ onSearch }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
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
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        isHomePage && "bg-transparent border-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <HomeIcon className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">StayConnect</span>
        </Link>

        {/* Search Bar - Hidden on mobile */}
        {!isHomePage && (
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md mx-8"
          >
            <div className="relative w-full">
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
        )}

        {/* Navigation */}
        <nav className="flex items-center space-x-4">
          {/* Wishlist Button - only show for non-super-admin users */}
          {(!user || user.role !== "superadmin") && (
            <Button
              variant="ghost"
              size="sm"
              className="relative"
              onClick={() => {
                if (user) {
                  navigate("/wishlist");
                } else {
                  navigate("/login", {
                    state: { from: { pathname: "/wishlist" } },
                  });
                }
              }}
            >
              <Heart className="h-4 w-4" />
              {user && wishlistCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
                >
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </Badge>
              )}
            </Button>
          )}

          {/* Host Link - only show for non-super-admin users */}
          {(!user || user.role !== "superadmin") && (
            <Button
              variant="ghost"
              className="text-sm font-medium"
              onClick={() => {
                if (user) {
                  navigate("/add-listing");
                } else {
                  navigate("/signup", {
                    state: {
                      from: { pathname: "/add-listing" },
                      hostingIntent: true,
                    },
                  });
                }
              }}
            >
              Become a host
            </Button>
          )}

          {/* User Menu */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Menu className="h-4 w-4" />
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.firstName} />
                    <AvatarFallback>
                      {user.firstName[0]}
                      {user.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {/* Super Admin gets different menu */}
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
                        <SettingsIcon className="mr-2 h-4 w-4" />
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
                        <Link
                          to="/host-dashboard"
                          className="flex items-center"
                        >
                          <HomeIcon className="mr-2 h-4 w-4" />
                          Host dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/signup">Sign up</Link>
              </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
