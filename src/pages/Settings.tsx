import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Settings as SettingsIcon,
  Bell,
  Shield,
  CreditCard,
  Globe,
  Eye,
  Lock,
  Camera,
  Save,
  Edit,
  Trash2,
  LogOut,
  Home as HomeIcon,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  Heart,
  MessageCircle,
  HelpCircle,
  FileText,
  Download,
  Upload,
  Check,
  X,
  AlertTriangle,
  Info,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

interface SettingsSection {
  id: string;
  title: string;
  description: string;
  icon: any;
}

const Settings = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Form states
  const [profile, setProfile] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ")[1] || "",
    email: user?.email || "",
    phone: "+91 98765 43210",
    bio: "Travel enthusiast who loves exploring new cultures and meeting people from around the world.",
    location: "Mumbai, India",
    dateOfBirth: "1990-05-15",
    languages: ["English", "Hindi", "Marathi"],
    profileImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  });

  const [notifications, setNotifications] = useState({
    emailBookings: true,
    emailMessages: true,
    emailPromotions: false,
    pushBookings: true,
    pushMessages: true,
    pushPromotions: false,
    smsBookings: true,
    smsMessages: false,
    weeklyUpdates: true,
    specialOffers: false,
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    showReviews: true,
    showWishlist: false,
    showActivity: true,
    dataSharing: false,
    marketingEmails: false,
    allowContactFromHosts: true,
    showPhoneNumber: false,
  });

  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: "24h",
    dataDownload: false,
    accountDeletion: false,
  });

  const [hosting, setHosting] = useState({
    autoAccept: false,
    instantBook: true,
    minStayLength: "1",
    maxStayLength: "14",
    advanceNotice: "3",
    checkInTime: "15:00",
    checkOutTime: "11:00",
    weekendPricing: true,
    smartPricing: false,
  });

  const [preferences, setPreferences] = useState({
    language: "en",
    currency: "INR",
    timezone: "Asia/Kolkata",
    dateFormat: "DD/MM/YYYY",
    theme: "light",
    emailFrequency: "weekly",
    measurementUnit: "metric",
  });

  const settingsSections: SettingsSection[] = [
    {
      id: "profile",
      title: "Profile Information",
      description: "Update your personal details and profile picture",
      icon: User,
    },
    {
      id: "notifications",
      title: "Notifications",
      description: "Manage your notification preferences",
      icon: Bell,
    },
    {
      id: "privacy",
      title: "Privacy & Sharing",
      description: "Control your privacy and data sharing settings",
      icon: Eye,
    },
    {
      id: "security",
      title: "Security",
      description: "Manage your account security and login settings",
      icon: Shield,
    },
    {
      id: "hosting",
      title: "Hosting Preferences",
      description: "Configure your hosting settings and policies",
      icon: HomeIcon,
    },
    {
      id: "payments",
      title: "Payments & Billing",
      description: "Manage your payment methods and billing information",
      icon: CreditCard,
    },
    {
      id: "preferences",
      title: "App Preferences",
      description: "Customize your app experience and regional settings",
      icon: SettingsIcon,
    },
  ];

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setHasChanges(false);
    setIsLoading(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const renderProfileSection = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-6">
        <div className="relative">
          <Avatar className="h-24 w-24">
            <AvatarImage src={profile.profileImage} alt={profile.firstName} />
            <AvatarFallback className="text-lg font-semibold">
              {profile.firstName[0]}
              {profile.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <Button
            size="sm"
            className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0"
            onClick={() => {
              /* Handle image upload */
            }}
          >
            <Camera className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">
            {profile.firstName} {profile.lastName}
          </h3>
          <p className="text-sm text-muted-foreground">{profile.email}</p>
          <div className="flex items-center space-x-2 mt-2">
            <Badge variant="secondary" className="text-xs">
              <Star className="h-3 w-3 mr-1" />
              4.9 Host Rating
            </Badge>
            <Badge variant="outline" className="text-xs">
              <Shield className="h-3 w-3 mr-1" />
              Verified
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={profile.firstName}
            onChange={(e) => {
              setProfile((prev) => ({ ...prev, firstName: e.target.value }));
              setHasChanges(true);
            }}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={profile.lastName}
            onChange={(e) => {
              setProfile((prev) => ({ ...prev, lastName: e.target.value }));
              setHasChanges(true);
            }}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={profile.email}
            onChange={(e) => {
              setProfile((prev) => ({ ...prev, email: e.target.value }));
              setHasChanges(true);
            }}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={profile.phone}
            onChange={(e) => {
              setProfile((prev) => ({ ...prev, phone: e.target.value }));
              setHasChanges(true);
            }}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={profile.location}
            onChange={(e) => {
              setProfile((prev) => ({ ...prev, location: e.target.value }));
              setHasChanges(true);
            }}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={profile.dateOfBirth}
            onChange={(e) => {
              setProfile((prev) => ({ ...prev, dateOfBirth: e.target.value }));
              setHasChanges(true);
            }}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <textarea
          id="bio"
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={profile.bio}
          onChange={(e) => {
            setProfile((prev) => ({ ...prev, bio: e.target.value }));
            setHasChanges(true);
          }}
          placeholder="Tell us about yourself..."
        />
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Email Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Booking Updates</Label>
              <p className="text-sm text-muted-foreground">
                Get notified about booking confirmations, changes, and
                cancellations
              </p>
            </div>
            <Switch
              checked={notifications.emailBookings}
              onCheckedChange={(checked) => {
                setNotifications((prev) => ({
                  ...prev,
                  emailBookings: checked,
                }));
                setHasChanges(true);
              }}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Messages</Label>
              <p className="text-sm text-muted-foreground">
                Receive messages from hosts and guests
              </p>
            </div>
            <Switch
              checked={notifications.emailMessages}
              onCheckedChange={(checked) => {
                setNotifications((prev) => ({
                  ...prev,
                  emailMessages: checked,
                }));
                setHasChanges(true);
              }}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Promotions & Special Offers</Label>
              <p className="text-sm text-muted-foreground">
                Get updates about deals and discounts
              </p>
            </div>
            <Switch
              checked={notifications.emailPromotions}
              onCheckedChange={(checked) => {
                setNotifications((prev) => ({
                  ...prev,
                  emailPromotions: checked,
                }));
                setHasChanges(true);
              }}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">Push Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Booking Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Real-time notifications for booking activities
              </p>
            </div>
            <Switch
              checked={notifications.pushBookings}
              onCheckedChange={(checked) => {
                setNotifications((prev) => ({
                  ...prev,
                  pushBookings: checked,
                }));
                setHasChanges(true);
              }}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">New Messages</Label>
              <p className="text-sm text-muted-foreground">
                Instant notifications for new messages
              </p>
            </div>
            <Switch
              checked={notifications.pushMessages}
              onCheckedChange={(checked) => {
                setNotifications((prev) => ({
                  ...prev,
                  pushMessages: checked,
                }));
                setHasChanges(true);
              }}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">SMS Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Booking Confirmations</Label>
              <p className="text-sm text-muted-foreground">
                SMS confirmations for bookings
              </p>
            </div>
            <Switch
              checked={notifications.smsBookings}
              onCheckedChange={(checked) => {
                setNotifications((prev) => ({ ...prev, smsBookings: checked }));
                setHasChanges(true);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacySection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Profile Visibility</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Who can see your profile</Label>
            <Select
              value={privacy.profileVisibility}
              onValueChange={(value) => {
                setPrivacy((prev) => ({ ...prev, profileVisibility: value }));
                setHasChanges(true);
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Everyone</SelectItem>
                <SelectItem value="users">StayConnect users only</SelectItem>
                <SelectItem value="verified">Verified users only</SelectItem>
                <SelectItem value="private">Only me</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Show Reviews</Label>
              <p className="text-sm text-muted-foreground">
                Display reviews you've received on your profile
              </p>
            </div>
            <Switch
              checked={privacy.showReviews}
              onCheckedChange={(checked) => {
                setPrivacy((prev) => ({ ...prev, showReviews: checked }));
                setHasChanges(true);
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Show Wishlist</Label>
              <p className="text-sm text-muted-foreground">
                Let others see your saved properties
              </p>
            </div>
            <Switch
              checked={privacy.showWishlist}
              onCheckedChange={(checked) => {
                setPrivacy((prev) => ({ ...prev, showWishlist: checked }));
                setHasChanges(true);
              }}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">Data & Privacy</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Data Sharing</Label>
              <p className="text-sm text-muted-foreground">
                Allow StayConnect to share your data with partners
              </p>
            </div>
            <Switch
              checked={privacy.dataSharing}
              onCheckedChange={(checked) => {
                setPrivacy((prev) => ({ ...prev, dataSharing: checked }));
                setHasChanges(true);
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Marketing Communications</Label>
              <p className="text-sm text-muted-foreground">
                Receive personalized marketing emails
              </p>
            </div>
            <Switch
              checked={privacy.marketingEmails}
              onCheckedChange={(checked) => {
                setPrivacy((prev) => ({ ...prev, marketingEmails: checked }));
                setHasChanges(true);
              }}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div className="bg-muted/50 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <Info className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-sm">Privacy Information</h4>
            <p className="text-sm text-muted-foreground mt-1">
              We take your privacy seriously. You can download your data or
              delete your account at any time from the Security section.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Account Security</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </p>
            </div>
            <Switch
              checked={security.twoFactorAuth}
              onCheckedChange={(checked) => {
                setSecurity((prev) => ({ ...prev, twoFactorAuth: checked }));
                setHasChanges(true);
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Login Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when someone logs into your account
              </p>
            </div>
            <Switch
              checked={security.loginAlerts}
              onCheckedChange={(checked) => {
                setSecurity((prev) => ({ ...prev, loginAlerts: checked }));
                setHasChanges(true);
              }}
            />
          </div>

          <div className="space-y-2">
            <Label>Session Timeout</Label>
            <Select
              value={security.sessionTimeout}
              onValueChange={(value) => {
                setSecurity((prev) => ({ ...prev, sessionTimeout: value }));
                setHasChanges(true);
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">1 hour</SelectItem>
                <SelectItem value="6h">6 hours</SelectItem>
                <SelectItem value="24h">24 hours</SelectItem>
                <SelectItem value="never">Never</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">
          Password & Authentication
        </h3>
        <div className="space-y-4">
          <Button variant="outline" className="w-full justify-start">
            <Lock className="h-4 w-4 mr-2" />
            Change Password
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button variant="outline" className="justify-start">
              <Download className="h-4 w-4 mr-2" />
              Download Data
            </Button>
            <Button variant="outline" className="justify-start">
              <FileText className="h-4 w-4 mr-2" />
              Login History
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-sm text-red-900">Danger Zone</h4>
            <p className="text-sm text-red-700 mt-1 mb-3">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <Button variant="destructive" size="sm">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHostingSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Booking Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Instant Book</Label>
              <p className="text-sm text-muted-foreground">
                Guests can book without waiting for approval
              </p>
            </div>
            <Switch
              checked={hosting.instantBook}
              onCheckedChange={(checked) => {
                setHosting((prev) => ({ ...prev, instantBook: checked }));
                setHasChanges(true);
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minStay">Minimum Stay (nights)</Label>
              <Select
                value={hosting.minStayLength}
                onValueChange={(value) => {
                  setHosting((prev) => ({ ...prev, minStayLength: value }));
                  setHasChanges(true);
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 night</SelectItem>
                  <SelectItem value="2">2 nights</SelectItem>
                  <SelectItem value="3">3 nights</SelectItem>
                  <SelectItem value="7">1 week</SelectItem>
                  <SelectItem value="30">1 month</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxStay">Maximum Stay (nights)</Label>
              <Select
                value={hosting.maxStayLength}
                onValueChange={(value) => {
                  setHosting((prev) => ({ ...prev, maxStayLength: value }));
                  setHasChanges(true);
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">1 week</SelectItem>
                  <SelectItem value="14">2 weeks</SelectItem>
                  <SelectItem value="30">1 month</SelectItem>
                  <SelectItem value="90">3 months</SelectItem>
                  <SelectItem value="365">1 year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="checkIn">Check-in Time</Label>
              <Input
                id="checkIn"
                type="time"
                value={hosting.checkInTime}
                onChange={(e) => {
                  setHosting((prev) => ({
                    ...prev,
                    checkInTime: e.target.value,
                  }));
                  setHasChanges(true);
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="checkOut">Check-out Time</Label>
              <Input
                id="checkOut"
                type="time"
                value={hosting.checkOutTime}
                onChange={(e) => {
                  setHosting((prev) => ({
                    ...prev,
                    checkOutTime: e.target.value,
                  }));
                  setHasChanges(true);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">Pricing Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Weekend Pricing</Label>
              <p className="text-sm text-muted-foreground">
                Automatically increase rates for weekends
              </p>
            </div>
            <Switch
              checked={hosting.weekendPricing}
              onCheckedChange={(checked) => {
                setHosting((prev) => ({ ...prev, weekendPricing: checked }));
                setHasChanges(true);
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Smart Pricing</Label>
              <p className="text-sm text-muted-foreground">
                Let StayConnect optimize your pricing automatically
              </p>
            </div>
            <Switch
              checked={hosting.smartPricing}
              onCheckedChange={(checked) => {
                setHosting((prev) => ({ ...prev, smartPricing: checked }));
                setHasChanges(true);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderPaymentsSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
        <div className="space-y-3">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">VISA</span>
                </div>
                <div>
                  <p className="font-medium">•••• •••• •••• 1234</p>
                  <p className="text-sm text-muted-foreground">Expires 12/26</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">Default</Badge>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-16 bg-gradient-to-r from-orange-500 to-red-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">MC</span>
                </div>
                <div>
                  <p className="font-medium">•••• •••• •••• 5678</p>
                  <p className="text-sm text-muted-foreground">Expires 08/25</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </Card>

          <Button variant="outline" className="w-full">
            <CreditCard className="h-4 w-4 mr-2" />
            Add Payment Method
          </Button>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">Billing Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="billingName">Full Name</Label>
            <Input id="billingName" defaultValue="John Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="billingEmail">Email</Label>
            <Input
              id="billingEmail"
              type="email"
              defaultValue="john@example.com"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="billingAddress">Address</Label>
            <Input id="billingAddress" defaultValue="123 Main Street" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="billingCity">City</Label>
            <Input id="billingCity" defaultValue="Mumbai" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="billingZip">PIN Code</Label>
            <Input id="billingZip" defaultValue="400001" />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">Payout Settings</h3>
        <div className="space-y-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Bank Account</p>
                  <p className="text-sm text-muted-foreground">
                    HDFC Bank •••• 9876
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </Card>

          <Button variant="outline" className="w-full">
            Add Payout Method
          </Button>
        </div>
      </div>
    </div>
  );

  const renderPreferencesSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Language & Region</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select
              value={preferences.language}
              onValueChange={(value) => {
                setPreferences((prev) => ({ ...prev, language: value }));
                setHasChanges(true);
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
                <SelectItem value="mr">मराठी (Marathi)</SelectItem>
                <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
                <SelectItem value="te">తెలుగు (Telugu)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select
              value={preferences.currency}
              onValueChange={(value) => {
                setPreferences((prev) => ({ ...prev, currency: value }));
                setHasChanges(true);
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="INR">₹ Indian Rupee (INR)</SelectItem>
                <SelectItem value="USD">$ US Dollar (USD)</SelectItem>
                <SelectItem value="EUR">€ Euro (EUR)</SelectItem>
                <SelectItem value="GBP">£ British Pound (GBP)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select
              value={preferences.timezone}
              onValueChange={(value) => {
                setPreferences((prev) => ({ ...prev, timezone: value }));
                setHasChanges(true);
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Asia/Kolkata">
                  India Standard Time
                </SelectItem>
                <SelectItem value="Asia/Dubai">Gulf Standard Time</SelectItem>
                <SelectItem value="America/New_York">Eastern Time</SelectItem>
                <SelectItem value="Europe/London">
                  Greenwich Mean Time
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateFormat">Date Format</Label>
            <Select
              value={preferences.dateFormat}
              onValueChange={(value) => {
                setPreferences((prev) => ({ ...prev, dateFormat: value }));
                setHasChanges(true);
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">App Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <Select
              value={preferences.theme}
              onValueChange={(value) => {
                setPreferences((prev) => ({ ...prev, theme: value }));
                setHasChanges(true);
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="measurementUnit">Measurement Units</Label>
            <Select
              value={preferences.measurementUnit}
              onValueChange={(value) => {
                setPreferences((prev) => ({ ...prev, measurementUnit: value }));
                setHasChanges(true);
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="metric">Metric (km, °C)</SelectItem>
                <SelectItem value="imperial">Imperial (miles, °F)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">Help & Support</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button variant="outline" className="justify-start">
            <HelpCircle className="h-4 w-4 mr-2" />
            Help Center
          </Button>
          <Button variant="outline" className="justify-start">
            <MessageCircle className="h-4 w-4 mr-2" />
            Contact Support
          </Button>
          <Button variant="outline" className="justify-start">
            <FileText className="h-4 w-4 mr-2" />
            Terms of Service
          </Button>
          <Button variant="outline" className="justify-start">
            <Shield className="h-4 w-4 mr-2" />
            Privacy Policy
          </Button>
        </div>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return renderProfileSection();
      case "notifications":
        return renderNotificationsSection();
      case "privacy":
        return renderPrivacySection();
      case "security":
        return renderSecuritySection();
      case "hosting":
        return renderHostingSection();
      case "payments":
        return renderPaymentsSection();
      case "preferences":
        return renderPreferencesSection();
      default:
        return renderProfileSection();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {settingsSections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={cn(
                      "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors",
                      activeSection === section.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <div>
                      <p className="font-medium text-sm">{section.title}</p>
                      <p
                        className={cn(
                          "text-xs",
                          activeSection === section.id
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground",
                        )}
                      >
                        {section.description}
                      </p>
                    </div>
                  </button>
                );
              })}

              <Separator className="my-4" />

              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors hover:bg-red-50 text-red-600"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium text-sm">Sign Out</span>
              </button>
            </nav>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>
                    {
                      settingsSections.find((s) => s.id === activeSection)
                        ?.title
                    }
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {
                      settingsSections.find((s) => s.id === activeSection)
                        ?.description
                    }
                  </p>
                </div>
                {hasChanges && (
                  <Button onClick={handleSave} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <span className="animate-spin mr-2">⌛</span>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                )}
              </CardHeader>
              <CardContent>{renderSection()}</CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export { Settings };
