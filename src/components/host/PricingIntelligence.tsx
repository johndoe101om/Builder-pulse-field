import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Target,
  BarChart3,
  Zap,
  Calendar,
  MapPin,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  Lightbulb,
  Award,
  RefreshCw,
  Settings,
  Eye,
  Star,
} from "lucide-react";

interface CompetitorData {
  id: string;
  name: string;
  price: number;
  rating: number;
  distance: number;
  occupancy: number;
  amenities: string[];
  lastUpdated: string;
}

interface PricingRecommendation {
  type: "increase" | "decrease" | "maintain";
  currentPrice: number;
  suggestedPrice: number;
  potentialIncrease: number;
  confidence: number;
  reason: string;
  timeframe: string;
}

export const PricingIntelligence: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState("villa-goa");
  const [autoOptimization, setAutoOptimization] = useState(false);

  const competitorData: CompetitorData[] = [
    {
      id: "1",
      name: "Ocean View Villa",
      price: 3200,
      rating: 4.8,
      distance: 0.8,
      occupancy: 82,
      amenities: ["Pool", "Beach Access", "WiFi", "Kitchen"],
      lastUpdated: "2 hours ago",
    },
    {
      id: "2",
      name: "Sunset Beach House",
      price: 2900,
      rating: 4.6,
      distance: 1.2,
      occupancy: 75,
      amenities: ["Beach Access", "WiFi", "Garden"],
      lastUpdated: "4 hours ago",
    },
    {
      id: "3",
      name: "Paradise Villa",
      price: 3500,
      rating: 4.9,
      distance: 0.5,
      occupancy: 88,
      amenities: ["Pool", "Beach Access", "WiFi", "Kitchen", "Gym"],
      lastUpdated: "1 hour ago",
    },
    {
      id: "4",
      name: "Coastal Retreat",
      price: 2750,
      rating: 4.4,
      distance: 1.5,
      occupancy: 70,
      amenities: ["WiFi", "Kitchen", "Garden"],
      lastUpdated: "3 hours ago",
    },
  ];

  const pricingRecommendations: PricingRecommendation[] = [
    {
      type: "increase",
      currentPrice: 2850,
      suggestedPrice: 3100,
      potentialIncrease: 8.8,
      confidence: 92,
      reason: "High demand period with limited availability in your area",
      timeframe: "Next 2 weeks",
    },
    {
      type: "maintain",
      currentPrice: 2850,
      suggestedPrice: 2850,
      potentialIncrease: 0,
      confidence: 85,
      reason: "Optimal pricing for current market conditions",
      timeframe: "Current week",
    },
  ];

  const demandForecast = [
    {
      date: "2024-12-15",
      demand: "High",
      score: 85,
      events: ["Weekend", "Holiday Season"],
    },
    {
      date: "2024-12-16",
      demand: "High",
      score: 88,
      events: ["Weekend", "Holiday Season"],
    },
    {
      date: "2024-12-17",
      demand: "Medium",
      score: 65,
      events: ["Holiday Season"],
    },
    {
      date: "2024-12-18",
      demand: "Medium",
      score: 62,
      events: ["Holiday Season"],
    },
    {
      date: "2024-12-19",
      demand: "High",
      score: 82,
      events: ["Holiday Season", "Local Festival"],
    },
    {
      date: "2024-12-20",
      demand: "High",
      score: 90,
      events: ["Holiday Season", "Local Festival"],
    },
    {
      date: "2024-12-21",
      demand: "Very High",
      score: 95,
      events: ["Weekend", "Holiday Season", "Local Festival"],
    },
  ];

  const getDemandColor = (demand: string) => {
    const colors = {
      Low: "bg-gray-100 text-gray-800",
      Medium: "bg-yellow-100 text-yellow-800",
      High: "bg-orange-100 text-orange-800",
      "Very High": "bg-red-100 text-red-800",
    };
    return colors[demand as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
  };

  const calculateMarketPosition = () => {
    const currentPrice = 2850;
    const avgCompetitorPrice =
      competitorData.reduce((sum, comp) => sum + comp.price, 0) /
      competitorData.length;
    const position =
      ((currentPrice - avgCompetitorPrice) / avgCompetitorPrice) * 100;
    return {
      position: position.toFixed(1),
      status:
        position > 10 ? "premium" : position < -10 ? "budget" : "competitive",
    };
  };

  const marketPosition = calculateMarketPosition();

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Pricing Intelligence
          </h1>
          <p className="text-gray-600 mt-2">
            Optimize your pricing with AI-powered market analysis
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Auto-optimization:</span>
            <button
              onClick={() => setAutoOptimization(!autoOptimization)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                autoOptimization ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  autoOptimization ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Current Pricing Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Current Rate
                </p>
                <p className="text-2xl font-bold text-gray-900">₹2,850</p>
                <p className="text-sm text-gray-500 mt-1">per night</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Market Position
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {marketPosition.position}%
                </p>
                <Badge
                  className={`mt-1 text-xs ${
                    marketPosition.status === "premium"
                      ? "bg-purple-100 text-purple-800"
                      : marketPosition.status === "budget"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {marketPosition.status}
                </Badge>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Revenue Potential
                </p>
                <p className="text-2xl font-bold text-gray-900">+12.5%</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">₹8,500/month</span>
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Optimization Score
                </p>
                <p className="text-2xl font-bold text-gray-900">92%</p>
                <div className="flex items-center mt-1">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">Excellent</span>
                </div>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Zap className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recommendations" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="competitors">Competitor Analysis</TabsTrigger>
          <TabsTrigger value="demand">Demand Forecast</TabsTrigger>
          <TabsTrigger value="automation">Automation Rules</TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  <span>AI Pricing Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pricingRecommendations.map((rec, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {rec.type === "increase" ? (
                          <TrendingUp className="w-5 h-5 text-green-500" />
                        ) : rec.type === "decrease" ? (
                          <TrendingDown className="w-5 h-5 text-red-500" />
                        ) : (
                          <CheckCircle className="w-5 h-5 text-blue-500" />
                        )}
                        <span className="font-medium capitalize">
                          {rec.type} Price
                        </span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {rec.confidence}% confidence
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <div className="text-sm text-gray-600">Current</div>
                        <div className="font-semibold">
                          {formatCurrency(rec.currentPrice)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Suggested</div>
                        <div className="font-semibold">
                          {formatCurrency(rec.suggestedPrice)}
                        </div>
                      </div>
                    </div>

                    <div className="text-sm text-gray-700 mb-3">
                      {rec.reason}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {rec.timeframe}
                      </span>
                      {rec.potentialIncrease > 0 && (
                        <span className="text-sm font-medium text-green-600">
                          +{rec.potentialIncrease.toFixed(1)}% revenue
                        </span>
                      )}
                    </div>

                    <div className="mt-4 flex space-x-2">
                      <Button size="sm" className="flex-1">
                        Apply Recommendation
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Market Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-blue-500" />
                  <span>Market Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">
                        Strong Market Position
                      </h4>
                      <p className="text-sm text-blue-800 mt-1">
                        Your property is priced optimally for the current
                        market. Consider seasonal adjustments.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-orange-900">
                        Peak Season Opportunity
                      </h4>
                      <p className="text-sm text-orange-800 mt-1">
                        Holiday season is approaching. Consider increasing rates
                        by 15-20% for peak dates.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-900">
                        Competitive Advantage
                      </h4>
                      <p className="text-sm text-green-800 mt-1">
                        Your amenities justify a 10% premium over similar
                        properties in the area.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Key Performance Indicators</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Booking Conversion Rate</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={78} className="w-20 h-2" />
                        <span className="text-sm font-medium">78%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Price Competitiveness</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={85} className="w-20 h-2" />
                        <span className="text-sm font-medium">85%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Revenue Optimization</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={92} className="w-20 h-2" />
                        <span className="text-sm font-medium">92%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="competitors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Competitor Analysis</CardTitle>
              <p className="text-sm text-gray-600">
                Compare your pricing with similar properties in your area
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {competitorData.map((competitor) => (
                  <div key={competitor.id} className="border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {competitor.name}
                        </h3>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">
                              {competitor.rating}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">
                              {competitor.distance} km away
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            Updated {competitor.lastUpdated}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">
                          {formatCurrency(competitor.price)}
                        </div>
                        <div className="text-sm text-gray-600">per night</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-gray-600">
                          Occupancy Rate
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <Progress
                            value={competitor.occupancy}
                            className="flex-1 h-2"
                          />
                          <span className="text-sm font-medium">
                            {competitor.occupancy}%
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">
                          Price Difference
                        </div>
                        <div className="mt-1">
                          {competitor.price > 2850 ? (
                            <span className="text-red-600 font-medium">
                              +{formatCurrency(competitor.price - 2850)}
                            </span>
                          ) : (
                            <span className="text-green-600 font-medium">
                              -{formatCurrency(2850 - competitor.price)}
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Amenities</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {competitor.amenities
                            .slice(0, 3)
                            .map((amenity, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {amenity}
                              </Badge>
                            ))}
                          {competitor.amenities.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{competitor.amenities.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demand" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-green-500" />
                <span>7-Day Demand Forecast</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {demandForecast.map((day, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="font-medium">
                          {new Date(day.date).toLocaleDateString("en-US", {
                            weekday: "short",
                          })}
                        </div>
                        <div className="text-sm text-gray-600">
                          {new Date(day.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                      <div>
                        <Badge className={getDemandColor(day.demand)}>
                          {day.demand} Demand
                        </Badge>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {day.events.map((event, eventIndex) => (
                            <Badge
                              key={eventIndex}
                              variant="outline"
                              className="text-xs"
                            >
                              {event}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-2">
                        <Progress value={day.score} className="w-24 h-2" />
                        <span className="text-sm font-medium">
                          {day.score}%
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Suggested:{" "}
                        <span className="font-medium">
                          ₹{(2850 * (1 + (day.score - 70) / 100)).toFixed(0)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Automated Pricing Rules</CardTitle>
              <p className="text-sm text-gray-600">
                Set up rules to automatically adjust your pricing based on
                market conditions
              </p>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Smart Pricing Automation
                </h3>
                <p className="text-gray-600 mb-6">
                  Let AI optimize your pricing automatically based on demand,
                  competition, and market trends
                </p>
                <Button>Set Up Automation Rules</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
