import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  HomeIcon,
  EyeIcon,
  EyeOffIcon,
  CompassIcon,
  AlertCircleIcon,
  UserIcon,
  BuildingIcon,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Signup = () => {
  const location = useLocation();
  const isHostingIntent = location.state?.hostingIntent;
  const from = location.state?.from?.pathname || "/";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: (isHostingIntent ? "host" : "guest") as "guest" | "host",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const success = await signup({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    });

    if (success) {
      navigate(from, { replace: true });
    } else {
      setError("Email already exists or signup failed");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <CompassIcon className="absolute top-20 left-20 h-16 w-16 text-white/10 animate-spin" />
        <HomeIcon className="absolute bottom-20 right-20 h-12 w-12 text-white/10" />
        <UserIcon className="absolute top-40 right-40 h-10 w-10 text-white/10" />
        <div className="absolute top-32 right-32 w-32 h-32 border-2 border-white/10 rounded-full"></div>
        <div className="absolute bottom-32 left-32 w-24 h-24 border-2 border-white/10 rotate-45"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-6">
            <HomeIcon className="h-10 w-10 text-white" />
            <span className="text-3xl font-black text-white">StayConnect</span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">
            {isHostingIntent
              ? "Start Your Hosting Journey!"
              : "Join the Adventure!"}
          </h1>
          <p className="text-white/80">
            {isHostingIntent
              ? "Create your account to list your property and start earning"
              : "Create your account and start exploring"}
          </p>
        </div>

        <Card className="backdrop-blur-lg bg-white/95 border-white/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Create Account
            </CardTitle>
            <CardDescription className="text-center">
              {isHostingIntent
                ? "Set up your hosting account to start earning"
                : "Choose your adventure type and get started"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircleIcon className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {isHostingIntent && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 text-green-800 mb-2">
                  <BuildingIcon className="h-4 w-4" />
                  <span className="font-medium">Hosting Account</span>
                </div>
                <p className="text-sm text-green-700">
                  You're signing up to become a host! You'll be able to list
                  your property and start earning.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Account Type - only show if not hosting intent */}
              {!isHostingIntent && (
                <>
                  <div className="space-y-3">
                    <Label>I want to...</Label>
                    <RadioGroup
                      value={formData.role}
                      onValueChange={(value) =>
                        handleInputChange("role", value)
                      }
                      className="grid grid-cols-2 gap-4"
                    >
                      <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="guest" id="guest" />
                        <Label
                          htmlFor="guest"
                          className="flex items-center gap-2 cursor-pointer flex-1"
                        >
                          <UserIcon className="h-4 w-4 text-blue-600" />
                          <div>
                            <div className="font-medium">Explore & Travel</div>
                            <div className="text-xs text-gray-500">
                              Find amazing places to stay
                            </div>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="host" id="host" />
                        <Label
                          htmlFor="host"
                          className="flex items-center gap-2 cursor-pointer flex-1"
                        >
                          <BuildingIcon className="h-4 w-4 text-green-600" />
                          <div>
                            <div className="font-medium">Host & Earn</div>
                            <div className="text-xs text-gray-500">
                              Share your space
                            </div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <Separator />
                </>
              )}

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={isLoading}
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <span className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  state={location.state}
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </Link>
              </span>
            </div>

            <div className="mt-4 text-center">
              <Link
                to="/"
                className="text-sm text-muted-foreground hover:underline"
              >
                ← Back to home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
