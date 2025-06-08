import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  UserIcon,
  ShieldCheckIcon,
  BellIcon,
  CreditCardIcon,
  StarIcon,
  CalendarIcon,
  MessageCircleIcon,
  EditIcon,
} from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  // Mock user data - in real app this would come from auth context
  const [userData, setUserData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Travel enthusiast and photography lover. I enjoy discovering new places and meeting people from different cultures.",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    joinDate: "2023-01-15",
    isVerified: true,
    isHost: true,
    guestRating: 4.9,
    hostRating: 4.8,
    totalGuest: 23,
    totalHost: 15,
  });

  const [notifications, setNotifications] = useState({
    bookingUpdates: true,
    messages: true,
    reviews: true,
    marketing: false,
    recommendations: true,
  });

  const handleSave = () => {
    setIsEditing(false);
    // In real app, this would save to backend
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-50">
        <div className="container py-8">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                {/* Avatar */}
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src={userData.avatar}
                      alt={userData.firstName}
                    />
                    <AvatarFallback className="text-lg">
                      {userData.firstName[0]}
                      {userData.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 h-8 w-8 p-0 rounded-full"
                  >
                    <EditIcon className="h-3 w-3" />
                  </Button>
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold">
                      {userData.firstName} {userData.lastName}
                    </h1>
                    {userData.isVerified && (
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        <ShieldCheckIcon className="h-3 w-3" />
                        Verified
                      </Badge>
                    )}
                  </div>

                  <p className="text-muted-foreground mb-4">{userData.bio}</p>

                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="h-4 w-4" />
                      <span>
                        Joined {new Date(userData.joinDate).getFullYear()}
                      </span>
                    </div>

                    {userData.guestRating && (
                      <div className="flex items-center gap-1">
                        <StarIcon className="h-4 w-4 fill-current" />
                        <span>
                          {userData.guestRating} ({userData.totalGuest} reviews
                          as guest)
                        </span>
                      </div>
                    )}

                    {userData.isHost && userData.hostRating && (
                      <div className="flex items-center gap-1">
                        <StarIcon className="h-4 w-4 fill-current" />
                        <span>
                          {userData.hostRating} ({userData.totalHost} reviews as
                          host)
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline">
                    <MessageCircleIcon className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                  <Button onClick={() => setIsEditing(!isEditing)}>
                    <EditIcon className="h-4 w-4 mr-2" />
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="verification">Verification</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserIcon className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First name</Label>
                      <Input
                        id="firstName"
                        value={userData.firstName}
                        onChange={(e) =>
                          setUserData((prev) => ({
                            ...prev,
                            firstName: e.target.value,
                          }))
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last name</Label>
                      <Input
                        id="lastName"
                        value={userData.lastName}
                        onChange={(e) =>
                          setUserData((prev) => ({
                            ...prev,
                            lastName: e.target.value,
                          }))
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userData.email}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      disabled={!isEditing}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone number</Label>
                    <Input
                      id="phone"
                      value={userData.phone}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      disabled={!isEditing}
                    />
                  </div>

                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={userData.bio}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          bio: e.target.value,
                        }))
                      }
                      disabled={!isEditing}
                      rows={4}
                      placeholder="Tell us a bit about yourself..."
                    />
                  </div>

                  {isEditing && (
                    <div className="flex gap-2">
                      <Button onClick={handleSave}>Save changes</Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Verification Tab */}
            <TabsContent value="verification" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShieldCheckIcon className="h-5 w-5" />
                    Account Verification
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <ShieldCheckIcon className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Email address</h3>
                          <p className="text-sm text-muted-foreground">
                            Verified
                          </p>
                        </div>
                      </div>
                      <Badge variant="default">Verified</Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <ShieldCheckIcon className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Phone number</h3>
                          <p className="text-sm text-muted-foreground">
                            Verified
                          </p>
                        </div>
                      </div>
                      <Badge variant="default">Verified</Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <UserIcon className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Government ID</h3>
                          <p className="text-sm text-muted-foreground">
                            Not verified
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Verify
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-2">
                      Why verify your identity?
                    </h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Increase your booking success rate</li>
                      <li>• Build trust with hosts and guests</li>
                      <li>• Access exclusive features and properties</li>
                      <li>• Enhanced account security</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BellIcon className="h-5 w-5" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Booking updates</h3>
                        <p className="text-sm text-muted-foreground">
                          Get notified about booking confirmations, changes, and
                          reminders
                        </p>
                      </div>
                      <Switch
                        checked={notifications.bookingUpdates}
                        onCheckedChange={(checked) =>
                          handleNotificationChange("bookingUpdates", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Messages</h3>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications for new messages from hosts and
                          guests
                        </p>
                      </div>
                      <Switch
                        checked={notifications.messages}
                        onCheckedChange={(checked) =>
                          handleNotificationChange("messages", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Reviews</h3>
                        <p className="text-sm text-muted-foreground">
                          Get notified when you receive new reviews
                        </p>
                      </div>
                      <Switch
                        checked={notifications.reviews}
                        onCheckedChange={(checked) =>
                          handleNotificationChange("reviews", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">
                          Marketing communications
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Receive promotional emails and special offers
                        </p>
                      </div>
                      <Switch
                        checked={notifications.marketing}
                        onCheckedChange={(checked) =>
                          handleNotificationChange("marketing", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Recommendations</h3>
                        <p className="text-sm text-muted-foreground">
                          Get personalized property recommendations
                        </p>
                      </div>
                      <Switch
                        checked={notifications.recommendations}
                        onCheckedChange={(checked) =>
                          handleNotificationChange("recommendations", checked)
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payment Tab */}
            <TabsContent value="payment" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCardIcon className="h-5 w-5" />
                    Payment Methods
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <CreditCardIcon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">•••• •••• •••• 4242</h3>
                          <p className="text-sm text-muted-foreground">
                            Expires 12/25
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Remove
                        </Button>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      <CreditCardIcon className="h-4 w-4 mr-2" />
                      Add payment method
                    </Button>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-4">
                      Payout preferences (for hosts)
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Bank account</h4>
                          <p className="text-sm text-muted-foreground">
                            •••• •••• •••• 1234
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>

                      <Button variant="outline" className="w-full">
                        Add payout method
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export { Profile };
