import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  MapPin,
  DollarSign,
  BarChart3,
  Info,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Target,
  Eye,
  Brain,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PriceData {
  location: string;
  currentPrice: number;
  predictedPrice: number;
  trend: "up" | "down" | "stable";
  percentage: number;
  confidence: number;
  factors: string[];
  bestTimeToBook: string;
  peakSeason: string;
  averagePrice: number;
  lastUpdated: string;
}

interface MarketInsight {
  id: string;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  type: "demand" | "supply" | "seasonal" | "event";
  icon: any;
}

const PricePrediction = ({ location = "Mumbai" }: { location?: string }) => {
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [insights, setInsights] = useState<MarketInsight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<"week" | "month" | "quarter">(
    "month",
  );

  // Mock data - in real app, this would come from AI/ML service
  const mockPriceData: PriceData = {
    location: location,
    currentPrice: 4500,
    predictedPrice: 5200,
    trend: "up",
    percentage: 15.6,
    confidence: 85,
    factors: [
      "High demand due to upcoming festival season",
      "Limited supply from new regulations",
      "Increased business travel",
      "Popular events in the area",
    ],
    bestTimeToBook: "Next 3-5 days",
    peakSeason: "Dec 2024 - Jan 2025",
    averagePrice: 4200,
    lastUpdated: new Date().toISOString(),
  };

  const mockInsights: MarketInsight[] = [
    {
      id: "1",
      title: "Festival Season Surge",
      description: "Prices expected to rise 20-25% due to Diwali celebrations",
      impact: "high",
      type: "seasonal",
      icon: Sparkles,
    },
    {
      id: "2",
      title: "Business Travel Peak",
      description: "Corporate bookings increasing, affecting availability",
      impact: "medium",
      type: "demand",
      icon: TrendingUp,
    },
    {
      id: "3",
      title: "New Properties Added",
      description: "150+ new listings this month may stabilize prices",
      impact: "medium",
      type: "supply",
      icon: CheckCircle,
    },
    {
      id: "4",
      title: "Concert Weekend",
      description: "Major music festival this weekend driving demand",
      impact: "high",
      type: "event",
      icon: Calendar,
    },
  ];

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setPriceData(mockPriceData);
      setInsights(mockInsights);
      setIsLoading(false);
    }, 1500);
  }, [location, timeRange]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-red-500" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-green-500" />;
      default:
        return <BarChart3 className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-red-600 bg-red-50 border-red-200";
      case "down":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 animate-pulse text-blue-500" />
            Analyzing Market Trends...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!priceData) return null;

  return (
    <div className="space-y-6">
      {/* Main Price Prediction Card */}
      <Card className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full transform translate-x-16 -translate-y-16"></div>

        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-500" />
              Price Intelligence
            </div>
            <div className="flex gap-1">
              {["week", "month", "quarter"].map((range) => (
                <Button
                  key={range}
                  variant={timeRange === range ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setTimeRange(range as any)}
                  className="text-xs capitalize"
                >
                  {range}
                </Button>
              ))}
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Current vs Predicted Price */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Current Average</p>
              <p className="text-2xl font-bold text-gray-900">
                ₹{priceData.currentPrice.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">per night</p>
            </div>

            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-600 mb-1">
                Predicted ({timeRange})
              </p>
              <p className="text-2xl font-bold text-blue-900">
                ₹{priceData.predictedPrice.toLocaleString()}
              </p>
              <div
                className={cn(
                  "inline-flex items-center gap-1 px-2 py-1 rounded-full border text-xs font-medium mt-1",
                  getTrendColor(priceData.trend),
                )}
              >
                {getTrendIcon(priceData.trend)}
                {priceData.percentage > 0 ? "+" : ""}
                {priceData.percentage}%
              </div>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-600 mb-1">Confidence</p>
              <p className="text-2xl font-bold text-green-900">
                {priceData.confidence}%
              </p>
              <p className="text-xs text-green-600">AI Accuracy</p>
            </div>
          </div>

          {/* Key Insights */}
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Target className="h-4 w-4" />
              Key Insights
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="h-4 w-4 text-amber-600" />
                  <span className="font-medium text-amber-900">
                    Best Time to Book
                  </span>
                </div>
                <p className="text-sm text-amber-700">
                  {priceData.bestTimeToBook}
                </p>
              </div>

              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="h-4 w-4 text-purple-600" />
                  <span className="font-medium text-purple-900">
                    Peak Season
                  </span>
                </div>
                <p className="text-sm text-purple-700">
                  {priceData.peakSeason}
                </p>
              </div>
            </div>
          </div>

          {/* Price Factors */}
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Price Factors
            </h4>
            <div className="space-y-2">
              {priceData.factors.map((factor, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{factor}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-green-500" />
            Market Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.map((insight) => {
              const Icon = insight.icon;
              return (
                <div
                  key={insight.id}
                  className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Icon className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="font-medium text-gray-900">
                          {insight.title}
                        </h5>
                        <Badge
                          className={cn(
                            "text-xs",
                            getImpactColor(insight.impact),
                          )}
                        >
                          {insight.impact} impact
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {insight.description}
                      </p>
                      <Badge
                        variant="outline"
                        className="mt-2 text-xs capitalize"
                      >
                        {insight.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* AI Disclaimer */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-blue-900 mb-1">
                AI-Powered Predictions
              </p>
              <p className="text-blue-700">
                These predictions are based on historical data, market trends,
                and external factors. Actual prices may vary. Last updated:{" "}
                {new Date(priceData.lastUpdated).toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PricePrediction;
