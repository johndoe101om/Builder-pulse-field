import { useState, useEffect, useCallback } from "react";
import { addDays, format, differenceInDays } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  CalendarDays,
  Clock,
  Users,
  MapPin,
  Zap,
  TrendingDown,
  Gift,
  Star,
  Bell,
  Plus,
  Minus,
  X,
  Info,
  Sparkles,
  Award,
  Percent,
  Tag,
  RefreshCw,
  Globe,
  Smartphone,
  Laptop,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BookingOption {
  id: string;
  type: "single" | "split" | "group";
  properties: PropertyBooking[];
  totalPrice: number;
  savings?: number;
  recommended?: boolean;
}

interface PropertyBooking {
  id: string;
  name: string;
  image: string;
  location: string;
  basePrice: number;
  discountedPrice?: number;
  dates: {
    checkIn: Date;
    checkOut: Date;
  };
  guests: number;
  rooms: number;
}

interface Deal {
  id: string;
  type: "early-bird" | "last-minute" | "group" | "extended-stay" | "seasonal";
  title: string;
  description: string;
  discount: number;
  validUntil: Date;
  minStay?: number;
  minGuests?: number;
  propertyIds: string[];
  isLimited?: boolean;
  claimed?: number;
  total?: number;
}

interface FlexibleDate {
  date: Date;
  price: number;
  availability: "high" | "medium" | "low";
  isWeekend: boolean;
  hasDiscount?: boolean;
}

const AdvancedBooking = ({ propertyId }: { propertyId: string }) => {
  const [bookingType, setBookingType] = useState<"single" | "split" | "group">(
    "single",
  );
  const [selectedDates, setSelectedDates] = useState<{
    checkIn: Date | null;
    checkOut: Date | null;
  }>({
    checkIn: null,
    checkOut: null,
  });
  const [flexibleDates, setFlexibleDates] = useState(false);
  const [dateFlexibility, setDateFlexibility] = useState(3);
  const [groupBooking, setGroupBooking] = useState({
    isGroup: false,
    totalGuests: 0,
    rooms: [{ adults: 2, children: 0 }] as Array<{
      adults: number;
      children: number;
    }>,
  });
  const [splitStay, setSplitStay] = useState({
    enabled: false,
    properties: [] as string[],
  });
  const [calendarSync, setCalendarSync] = useState({
    google: false,
    outlook: false,
    apple: false,
  });
  const [priceAlerts, setPriceAlerts] = useState(false);
  const [rebookingSuggestions, setRebookingSuggestions] = useState<
    BookingOption[]
  >([]);

  // Mock data
  const availableDeals: Deal[] = [
    {
      id: "1",
      type: "early-bird",
      title: "Early Bird Special",
      description: "Book 30 days in advance and save 25%",
      discount: 25,
      validUntil: addDays(new Date(), 30),
      minStay: 3,
      propertyIds: [propertyId],
      isLimited: true,
      claimed: 45,
      total: 100,
    },
    {
      id: "2",
      type: "last-minute",
      title: "Last Minute Deal",
      description: "Book within 48 hours for instant savings",
      discount: 20,
      validUntil: addDays(new Date(), 2),
      propertyIds: [propertyId],
      isLimited: true,
      claimed: 12,
      total: 20,
    },
    {
      id: "3",
      type: "group",
      title: "Group Booking Discount",
      description: "Save more when booking for 6+ guests",
      discount: 15,
      validUntil: addDays(new Date(), 60),
      minGuests: 6,
      propertyIds: [propertyId],
    },
  ];

  const flexibleDateOptions: FlexibleDate[] = [
    { date: new Date(), price: 4500, availability: "high", isWeekend: false },
    {
      date: addDays(new Date(), 1),
      price: 4200,
      availability: "high",
      isWeekend: false,
      hasDiscount: true,
    },
    {
      date: addDays(new Date(), 2),
      price: 5200,
      availability: "medium",
      isWeekend: true,
    },
    {
      date: addDays(new Date(), 3),
      price: 5500,
      availability: "low",
      isWeekend: true,
    },
    {
      date: addDays(new Date(), 4),
      price: 4800,
      availability: "high",
      isWeekend: false,
    },
    {
      date: addDays(new Date(), 5),
      price: 4600,
      availability: "medium",
      isWeekend: false,
    },
    {
      date: addDays(new Date(), 6),
      price: 4100,
      availability: "high",
      isWeekend: false,
      hasDiscount: true,
    },
  ];

  const nearbyProperties = [
    {
      id: "2",
      name: "Modern Studio Apartment",
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&h=200&fit=crop",
      location: "Andheri East",
      basePrice: 3200,
      distance: "2.5 km away",
    },
    {
      id: "3",
      name: "Luxury Penthouse",
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop",
      location: "Powai",
      basePrice: 6500,
      distance: "3.8 km away",
    },
  ];

  useEffect(() => {
    const suggestions: BookingOption[] = [
      {
        id: "1",
        type: "single",
        properties: [
          {
            id: propertyId,
            name: "Current Property",
            image:
              "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&h=200&fit=crop",
            location: "Bandra West",
            basePrice: 5500,
            discountedPrice: 4950,
            dates: {
              checkIn: addDays(new Date(), 30),
              checkOut: addDays(new Date(), 35),
            },
            guests: 2,
            rooms: 1,
          },
        ],
        totalPrice: 24750,
        savings: 2750,
        recommended: true,
      },
    ];
    setRebookingSuggestions(suggestions);
  }, [propertyId]);

  const addRoom = () => {
    setGroupBooking((prev) => ({
      ...prev,
      rooms: [...prev.rooms, { adults: 2, children: 0 }],
    }));
  };

  const removeRoom = (index: number) => {
    setGroupBooking((prev) => ({
      ...prev,
      rooms: prev.rooms.filter((_, i) => i !== index),
    }));
  };

  const updateRoom = (
    index: number,
    field: "adults" | "children",
    value: number,
  ) => {
    setGroupBooking((prev) => ({
      ...prev,
      rooms: prev.rooms.map((room, i) =>
        i === index ? { ...room, [field]: value } : room,
      ),
    }));
  };

  const calculateTotalGuests = useCallback(() => {
    return groupBooking.rooms.reduce(
      (total, room) => total + room.adults + room.children,
      0,
    );
  }, [groupBooking.rooms]);

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "high":
        return "bg-green-100 text-green-800 border-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getDealIcon = (type: string) => {
    switch (type) {
      case "early-bird":
        return <Clock className="h-4 w-4" />;
      case "last-minute":
        return <Zap className="h-4 w-4" />;
      case "group":
        return <Users className="h-4 w-4" />;
      default:
        return <Tag className="h-4 w-4" />;
    }
  };

  const FlexibleDatePicker = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5" />
          Flexible Dates
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Date flexibility</Label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              ±{dateFlexibility} days
            </span>
            <Slider
              value={[dateFlexibility]}
              onValueChange={(value) => setDateFlexibility(value[0])}
              max={7}
              min={1}
              step={1}
              className="w-20"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {flexibleDateOptions.map((option, index) => (
            <button
              key={index}
              className="p-3 border rounded-lg hover:border-primary transition-colors text-left"
              onClick={() => {
                setSelectedDates({
                  checkIn: option.date,
                  checkOut: addDays(option.date, 3),
                });
              }}
            >
              <div className="font-medium text-sm">
                {format(option.date, "MMM dd")}
              </div>
              <div className="text-xs text-gray-600 mb-2">
                {format(option.date, "EEEE")}
              </div>
              <div className="flex items-center justify-between">
                <div className="font-bold text-sm">
                  ₹{option.price.toLocaleString()}
                </div>
                {option.hasDiscount && (
                  <Badge variant="secondary" className="text-xs">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    Deal
                  </Badge>
                )}
              </div>
              <Badge
                className={cn(
                  "mt-2 text-xs",
                  getAvailabilityColor(option.availability),
                )}
              >
                {option.availability} availability
              </Badge>
            </button>
          ))}
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-900">
                Flexible Date Benefits
              </p>
              <ul className="mt-1 text-blue-800 space-y-1">
                <li>• Save up to 30% by adjusting your dates</li>
                <li>• Get notified of price drops within your range</li>
                <li>• Access to exclusive flexible booking deals</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const GroupBookingManager = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Group Booking
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Enable group booking</Label>
          <Switch
            checked={groupBooking.isGroup}
            onCheckedChange={(checked) =>
              setGroupBooking((prev) => ({ ...prev, isGroup: checked }))
            }
          />
        </div>

        {groupBooking.isGroup && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Rooms Configuration</h4>
              <Button size="sm" onClick={addRoom}>
                <Plus className="h-4 w-4 mr-1" />
                Add Room
              </Button>
            </div>

            {groupBooking.rooms.map((room, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium">Room {index + 1}</h5>
                  {groupBooking.rooms.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeRoom(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">Adults</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateRoom(
                            index,
                            "adults",
                            Math.max(1, room.adults - 1),
                          )
                        }
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{room.adults}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateRoom(
                            index,
                            "adults",
                            Math.min(6, room.adults + 1),
                          )
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm">Children</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateRoom(
                            index,
                            "children",
                            Math.max(0, room.children - 1),
                          )
                        }
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{room.children}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateRoom(
                            index,
                            "children",
                            Math.min(4, room.children + 1),
                          )
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between text-sm">
                <span>Total Guests:</span>
                <span className="font-medium">{calculateTotalGuests()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Total Rooms:</span>
                <span className="font-medium">{groupBooking.rooms.length}</span>
              </div>
            </div>

            {calculateTotalGuests() >= 6 && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    Group Discount Eligible!
                  </span>
                </div>
                <p className="text-xs text-green-700 mt-1">
                  Save 15% on your booking for groups of 6 or more
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );

  const SplitStayManager = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Split Stay Experience
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label>Enable split stay</Label>
            <p className="text-xs text-gray-600">
              Stay at multiple properties during your trip
            </p>
          </div>
          <Switch
            checked={splitStay.enabled}
            onCheckedChange={(checked) =>
              setSplitStay((prev) => ({ ...prev, enabled: checked }))
            }
          />
        </div>

        {splitStay.enabled && (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-900">
                    Split Stay Benefits
                  </p>
                  <ul className="mt-1 text-blue-800 space-y-1">
                    <li>• Experience different neighborhoods</li>
                    <li>• Optimize location for activities</li>
                    <li>• Potential cost savings</li>
                    <li>• More flexibility in your itinerary</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Recommended Split Options</h4>
              <div className="space-y-3">
                {nearbyProperties.map((property) => (
                  <div key={property.id} className="p-3 border rounded-lg">
                    <div className="flex gap-3">
                      <img
                        src={property.image}
                        alt={property.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h5 className="font-medium text-sm">{property.name}</h5>
                        <p className="text-xs text-gray-600 mb-1">
                          {property.location}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {property.distance}
                          </span>
                          <span className="font-medium text-sm">
                            ₹{property.basePrice}/night
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Add
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const DealsSection = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Available Deals
          </div>
          <Badge variant="secondary">{availableDeals.length} offers</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {availableDeals.map((deal) => (
          <div
            key={deal.id}
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                {getDealIcon(deal.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium">{deal.title}</h4>
                  <Badge variant="outline" className="text-xs">
                    <Percent className="h-3 w-3 mr-1" />
                    {deal.discount}% OFF
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{deal.description}</p>

                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Valid until {format(deal.validUntil, "MMM dd")}
                  </span>
                  {deal.minStay && <span>Min {deal.minStay} nights</span>}
                  {deal.minGuests && <span>Min {deal.minGuests} guests</span>}
                </div>

                {deal.isLimited && deal.claimed && deal.total && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Claimed</span>
                      <span>
                        {deal.claimed}/{deal.total}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-orange-500 h-1.5 rounded-full"
                        style={{
                          width: `${(deal.claimed / deal.total) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
              <Button size="sm">Apply Deal</Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  const CalendarSyncSettings = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RefreshCw className="h-5 w-5" />
          Calendar Synchronization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">
          Sync your bookings with your personal calendar to avoid conflicts
        </p>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                <Globe className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <div className="font-medium text-sm">Google Calendar</div>
                <div className="text-xs text-gray-600">
                  Sync with your Google account
                </div>
              </div>
            </div>
            <Switch
              checked={calendarSync.google}
              onCheckedChange={(checked) =>
                setCalendarSync((prev) => ({ ...prev, google: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                <Laptop className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-sm">Outlook Calendar</div>
                <div className="text-xs text-gray-600">
                  Sync with Microsoft Outlook
                </div>
              </div>
            </div>
            <Switch
              checked={calendarSync.outlook}
              onCheckedChange={(checked) =>
                setCalendarSync((prev) => ({ ...prev, outlook: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                <Smartphone className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <div className="font-medium text-sm">Apple Calendar</div>
                <div className="text-xs text-gray-600">
                  Sync with iCloud calendar
                </div>
              </div>
            </div>
            <Switch
              checked={calendarSync.apple}
              onCheckedChange={(checked) =>
                setCalendarSync((prev) => ({ ...prev, apple: checked }))
              }
            />
          </div>
        </div>

        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Bell className="h-4 w-4 text-blue-600" />
            <span className="font-medium text-sm">Price Alerts</span>
            <Switch checked={priceAlerts} onCheckedChange={setPriceAlerts} />
          </div>
          <p className="text-xs text-gray-600">
            Get notified when prices drop for your selected dates
          </p>
        </div>
      </CardContent>
    </Card>
  );

  const RebookingSuggestions = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RefreshCw className="h-5 w-5" />
          Smart Rebooking Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {rebookingSuggestions.map((suggestion) => (
          <div key={suggestion.id} className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Badge variant={suggestion.recommended ? "default" : "outline"}>
                  {suggestion.type === "single"
                    ? "Single Stay"
                    : suggestion.type === "split"
                      ? "Split Stay"
                      : "Group Booking"}
                </Badge>
                {suggestion.recommended && (
                  <Badge variant="secondary" className="text-xs">
                    <Star className="h-3 w-3 mr-1" />
                    Recommended
                  </Badge>
                )}
              </div>
              {suggestion.savings && (
                <div className="text-right">
                  <div className="text-sm font-medium text-green-600">
                    Save ₹{suggestion.savings.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-600">vs regular price</div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {suggestion.properties.map((property, index) => (
                <div
                  key={property.id}
                  className="flex gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h5 className="font-medium text-sm">{property.name}</h5>
                    <p className="text-xs text-gray-600">{property.location}</p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                      <span>
                        {format(property.dates.checkIn, "MMM dd")} -{" "}
                        {format(property.dates.checkOut, "MMM dd")}
                      </span>
                      <span>{property.guests} guests</span>
                      <span>{property.rooms} room</span>
                    </div>
                  </div>
                  <div className="text-right">
                    {property.discountedPrice ? (
                      <>
                        <div className="text-sm line-through text-gray-500">
                          ₹{property.basePrice}
                        </div>
                        <div className="font-medium">
                          ₹{property.discountedPrice}
                        </div>
                      </>
                    ) : (
                      <div className="font-medium">₹{property.basePrice}</div>
                    )}
                    <div className="text-xs text-gray-600">per night</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-4 pt-3 border-t">
              <div>
                <div className="font-medium">
                  Total: ₹{suggestion.totalPrice.toLocaleString()}
                </div>
                <div className="text-xs text-gray-600">
                  {differenceInDays(
                    suggestion.properties[suggestion.properties.length - 1]
                      .dates.checkOut,
                    suggestion.properties[0].dates.checkIn,
                  )}{" "}
                  nights
                </div>
              </div>
              <Button>Book This Option</Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <Tabs
        value={bookingType}
        onValueChange={(value: any) => setBookingType(value)}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="single">Single Stay</TabsTrigger>
          <TabsTrigger value="split">Split Stay</TabsTrigger>
          <TabsTrigger value="group">Group Booking</TabsTrigger>
        </TabsList>

        <div className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Booking Options</h3>
            <div className="flex items-center gap-2">
              <Label className="text-sm">Flexible dates</Label>
              <Switch
                checked={flexibleDates}
                onCheckedChange={setFlexibleDates}
              />
            </div>
          </div>

          {flexibleDates && <FlexibleDatePicker />}

          <TabsContent value="single">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DealsSection />
              <CalendarSyncSettings />
            </div>
          </TabsContent>

          <TabsContent value="split">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SplitStayManager />
              <RebookingSuggestions />
            </div>
          </TabsContent>

          <TabsContent value="group">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GroupBookingManager />
              <DealsSection />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default AdvancedBooking;
