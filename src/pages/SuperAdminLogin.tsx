import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import {
  ShieldIcon,
  EyeIcon,
  EyeOffIcon,
  AlertCircleIcon,
  LockIcon,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const SuperAdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const success = await login(email, password);
    if (success) {
      // Check if user is super admin
      const storedUser = localStorage.getItem("auth_user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.role === "superadmin") {
          navigate("/super-admin-dashboard");
        } else {
          setError("Access denied. Super admin credentials required.");
          localStorage.removeItem("auth_user");
        }
      }
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center p-4">
      {/* Security-themed background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 border border-red-500/20 rotate-45"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-red-500/20 rounded-full"></div>
        <div className="absolute top-40 right-40 w-16 h-16 border border-red-500/30 rotate-12"></div>
        <LockIcon className="absolute top-32 left-1/3 h-8 w-8 text-red-500/20" />
        <ShieldIcon className="absolute bottom-32 right-1/3 h-12 w-12 text-red-500/20" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full border border-red-500/30 mb-4">
            <ShieldIcon className="h-8 w-8 text-red-400" />
          </div>
          <h1 className="text-3xl font-black text-white mb-2">SUPER ADMIN</h1>
          <p className="text-red-300/80">Restricted Access Only</p>
        </div>

        <Card className="bg-gray-900/80 backdrop-blur-lg border-red-500/30 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-white flex items-center justify-center gap-2">
              <LockIcon className="h-6 w-6 text-red-400" />
              Secure Access
            </CardTitle>
            <CardDescription className="text-center text-gray-300">
              Enter super admin credentials to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert
                variant="destructive"
                className="mb-6 bg-red-900/50 border-red-500/50"
              >
                <AlertCircleIcon className="h-4 w-4" />
                <AlertDescription className="text-red-200">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Admin Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@stayconnect.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Admin Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-400"
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

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Authenticating..." : "Access Admin Panel"}
              </Button>
            </form>

            {/* Demo Credentials for Super Admin */}
            <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-600">
              <div className="text-sm text-gray-300 mb-2">
                Demo Super Admin:
              </div>
              <div className="text-xs text-gray-400 space-y-1">
                <div>Email: admin@stayconnect.com</div>
                <div>Password: admin123</div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2 w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                onClick={() => {
                  setEmail("admin@stayconnect.com");
                  setPassword("admin123");
                }}
              >
                Use Demo Credentials
              </Button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-400">
                ⚠️ This is a restricted area. All access is logged and
                monitored.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuperAdminLogin;
