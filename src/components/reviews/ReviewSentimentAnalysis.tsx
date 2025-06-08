import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Activity,
  Smile,
  Frown,
  Meh,
  Heart,
  AlertTriangle,
  CheckCircle,
  Star,
  ThumbsUp,
  MessageCircle,
  Calendar,
  Filter,
  Download,
  Share,
  Eye,
  Users,
  Zap,
} from "lucide-react";

interface SentimentData {
  overall: {
    score: number; // -1 to 1
    label:
      | "very_negative"
      | "negative"
      | "neutral"
      | "positive"
      | "very_positive";
    confidence: number;
  };
  aspects: {
    [key: string]: {
      score: number;
      mentions: number;
      trending: "up" | "down" | "stable";
      keywords: string[];
    };
  };
  emotions: {
    joy: number;
    anger: number;
    sadness: number;
    fear: number;
    surprise: number;
    disgust: number;
  };
  trends: {
    period: string;
    sentiment: number;
    reviewCount: number;
  }[];
  summary: {
    totalReviews: number;
    averageRating: number;
    sentimentDistribution: {
      positive: number;
      neutral: number;
      negative: number;
    };
    topKeywords: {
      positive: string[];
      negative: string[];
    };
  };
}

interface ReviewSample {
  id: string;
  content: string;
  rating: number;
  sentiment: {
    score: number;
    label: string;
    confidence: number;
  };
  aspects: {
    [key: string]: number;
  };
  timestamp: Date;
  helpful: number;
}

export const ReviewSentimentAnalysis: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("last_6_months");
  const [selectedAspect, setSelectedAspect] = useState("all");

  const [sentimentData] = useState<SentimentData>({
    overall: {
      score: 0.74,
      label: "positive",
      confidence: 0.89,
    },
    aspects: {
      location: {
        score: 0.82,
        mentions: 156,
        trending: "up",
        keywords: ["convenient", "central", "accessible", "walkable"],
      },
      cleanliness: {
        score: 0.78,
        mentions: 134,
        trending: "stable",
        keywords: ["spotless", "clean", "tidy", "maintained"],
      },
      host: {
        score: 0.91,
        mentions: 189,
        trending: "up",
        keywords: ["responsive", "helpful", "friendly", "welcoming"],
      },
      amenities: {
        score: 0.65,
        mentions: 98,
        trending: "down",
        keywords: ["basic", "adequate", "missing", "outdated"],
      },
      value: {
        score: 0.71,
        mentions: 112,
        trending: "up",
        keywords: ["reasonable", "worth it", "fair price", "good deal"],
      },
      wifi: {
        score: 0.43,
        mentions: 87,
        trending: "down",
        keywords: ["slow", "unreliable", "poor connection", "intermittent"],
      },
    },
    emotions: {
      joy: 0.45,
      anger: 0.12,
      sadness: 0.08,
      fear: 0.05,
      surprise: 0.15,
      disgust: 0.15,
    },
    trends: [
      { period: "Jan 2024", sentiment: 0.68, reviewCount: 23 },
      { period: "Feb 2024", sentiment: 0.72, reviewCount: 31 },
      { period: "Mar 2024", sentiment: 0.75, reviewCount: 28 },
      { period: "Apr 2024", sentiment: 0.71, reviewCount: 35 },
      { period: "May 2024", sentiment: 0.78, reviewCount: 42 },
      { period: "Jun 2024", sentiment: 0.74, reviewCount: 38 },
    ],
    summary: {
      totalReviews: 197,
      averageRating: 4.2,
      sentimentDistribution: {
        positive: 68,
        neutral: 22,
        negative: 10,
      },
      topKeywords: {
        positive: [
          "amazing",
          "perfect",
          "excellent",
          "beautiful",
          "comfortable",
          "clean",
          "helpful",
        ],
        negative: [
          "disappointing",
          "dirty",
          "noisy",
          "expensive",
          "uncomfortable",
          "slow",
          "broken",
        ],
      },
    },
  });

  const [reviewSamples] = useState<ReviewSample[]>([
    {
      id: "1",
      content:
        "Absolutely amazing stay! The host was incredibly responsive and the location was perfect for exploring the city.",
      rating: 5,
      sentiment: {
        score: 0.89,
        label: "very_positive",
        confidence: 0.94,
      },
      aspects: {
        host: 0.92,
        location: 0.87,
        overall: 0.89,
      },
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      helpful: 23,
    },
    {
      id: "2",
      content:
        "The wifi was really disappointing and made it difficult to work. Otherwise the place was clean and comfortable.",
      rating: 3,
      sentiment: {
        score: -0.12,
        label: "slightly_negative",
        confidence: 0.76,
      },
      aspects: {
        wifi: -0.78,
        cleanliness: 0.65,
        comfort: 0.42,
      },
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      helpful: 15,
    },
  ]);

  const getSentimentColor = (score: number) => {
    if (score >= 0.6) return "text-green-600";
    if (score >= 0.2) return "text-yellow-600";
    if (score >= -0.2) return "text-gray-600";
    if (score >= -0.6) return "text-orange-600";
    return "text-red-600";
  };

  const getSentimentBg = (score: number) => {
    if (score >= 0.6) return "bg-green-100";
    if (score >= 0.2) return "bg-yellow-100";
    if (score >= -0.2) return "bg-gray-100";
    if (score >= -0.6) return "bg-orange-100";
    return "bg-red-100";
  };

  const getSentimentIcon = (score: number) => {
    if (score >= 0.6) return <Smile className="w-5 h-5 text-green-600" />;
    if (score >= 0.2) return <Meh className="w-5 h-5 text-yellow-600" />;
    if (score >= -0.2) return <Meh className="w-5 h-5 text-gray-600" />;
    return <Frown className="w-5 h-5 text-red-600" />;
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "up")
      return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (trend === "down")
      return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Activity className="w-4 h-4 text-gray-500" />;
  };

  const formatSentimentScore = (score: number) => {
    return ((score + 1) * 50).toFixed(1) + "%";
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Review Sentiment Analysis
            </h2>
            <p className="text-gray-600">
              AI-powered insights from guest reviews
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" size="sm">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Time Range Filter */}
      <div className="mb-6 flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium">Time Range:</span>
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="border rounded-md px-3 py-1 text-sm"
          >
            <option value="last_month">Last Month</option>
            <option value="last_3_months">Last 3 Months</option>
            <option value="last_6_months">Last 6 Months</option>
            <option value="last_year">Last Year</option>
            <option value="all_time">All Time</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Overall Sentiment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-blue-500" />
              <span>Overall Sentiment</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                {getSentimentIcon(sentimentData.overall.score)}
              </div>
              <div className="text-3xl font-bold mb-2 text-gray-900">
                {formatSentimentScore(sentimentData.overall.score)}
              </div>
              <div className="text-sm text-gray-600 mb-4 capitalize">
                {sentimentData.overall.label.replace("_", " ")}
              </div>
              <Progress
                value={(sentimentData.overall.score + 1) * 50}
                className="h-3 mb-2"
              />
              <div className="text-xs text-gray-500">
                Confidence:{" "}
                {(sentimentData.overall.confidence * 100).toFixed(1)}%
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Review Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="w-5 h-5 text-purple-500" />
              <span>Sentiment Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Positive</span>
                </div>
                <span className="font-medium">
                  {sentimentData.summary.sentimentDistribution.positive}%
                </span>
              </div>
              <Progress
                value={sentimentData.summary.sentimentDistribution.positive}
                className="h-2"
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">Neutral</span>
                </div>
                <span className="font-medium">
                  {sentimentData.summary.sentimentDistribution.neutral}%
                </span>
              </div>
              <Progress
                value={sentimentData.summary.sentimentDistribution.neutral}
                className="h-2"
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm">Negative</span>
                </div>
                <span className="font-medium">
                  {sentimentData.summary.sentimentDistribution.negative}%
                </span>
              </div>
              <Progress
                value={sentimentData.summary.sentimentDistribution.negative}
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-orange-500" />
              <span>Key Metrics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Reviews</span>
                <span className="font-semibold">
                  {sentimentData.summary.totalReviews}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Average Rating</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-semibold">
                    {sentimentData.summary.averageRating}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Analysis Confidence
                </span>
                <span className="font-semibold">
                  {(sentimentData.overall.confidence * 100).toFixed(0)}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Sentiment Trend</span>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="font-semibold text-green-600">↑ 6%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Aspect Analysis */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-green-500" />
            <span>Aspect-based Sentiment Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(sentimentData.aspects).map(([aspect, data]) => (
              <div
                key={aspect}
                className={`p-4 rounded-lg border ${getSentimentBg(data.score)}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium capitalize">{aspect}</h4>
                  <div className="flex items-center space-x-1">
                    {getTrendIcon(data.trending)}
                    <span
                      className={`text-sm font-medium ${getSentimentColor(data.score)}`}
                    >
                      {formatSentimentScore(data.score)}
                    </span>
                  </div>
                </div>

                <Progress value={(data.score + 1) * 50} className="h-2 mb-3" />

                <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                  <span>{data.mentions} mentions</span>
                  <Badge variant="outline" className="text-xs">
                    {data.trending}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-1">
                  {data.keywords.slice(0, 3).map((keyword, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                  {data.keywords.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{data.keywords.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emotion Analysis */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-pink-500" />
            <span>Emotion Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(sentimentData.emotions).map(([emotion, value]) => {
              const emotionIcons = {
                joy: "😊",
                anger: "😠",
                sadness: "😢",
                fear: "😨",
                surprise: "😲",
                disgust: "🤢",
              };

              return (
                <div
                  key={emotion}
                  className="text-center p-4 border rounded-lg"
                >
                  <div className="text-2xl mb-2">
                    {emotionIcons[emotion as keyof typeof emotionIcons]}
                  </div>
                  <div className="font-medium capitalize text-sm">
                    {emotion}
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    {(value * 100).toFixed(0)}%
                  </div>
                  <Progress value={value * 100} className="h-2 mt-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Sentiment Trends */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <span>Sentiment Trends Over Time</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sentimentData.trends.map((trend, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-20 text-sm text-gray-600">{trend.period}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-sm font-medium ${getSentimentColor(trend.sentiment)}`}
                    >
                      {formatSentimentScore(trend.sentiment)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {trend.reviewCount} reviews
                    </span>
                  </div>
                  <Progress
                    value={(trend.sentiment + 1) * 50}
                    className="h-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sample Reviews with Sentiment */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-indigo-500" />
            <span>Review Samples with Sentiment Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reviewSamples.map((review) => (
              <div
                key={review.id}
                className={`p-4 rounded-lg border ${getSentimentBg(review.sentiment.score)}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="text-gray-700 mb-2">{review.content}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>{review.rating}/5</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ThumbsUp className="w-4 h-4 text-gray-400" />
                        <span>{review.helpful} helpful</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div
                      className={`font-medium ${getSentimentColor(review.sentiment.score)}`}
                    >
                      {formatSentimentScore(review.sentiment.score)}
                    </div>
                    <div className="text-xs text-gray-500 capitalize">
                      {review.sentiment.label.replace("_", " ")}
                    </div>
                    <div className="text-xs text-gray-500">
                      {(review.sentiment.confidence * 100).toFixed(0)}%
                      confidence
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {Object.entries(review.aspects).map(([aspect, score]) => (
                    <Badge
                      key={aspect}
                      variant="outline"
                      className={`text-xs ${getSentimentColor(score)}`}
                    >
                      {aspect}: {formatSentimentScore(score)}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Keywords */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-700">
              <CheckCircle className="w-5 h-5" />
              <span>Most Mentioned Positive Aspects</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {sentimentData.summary.topKeywords.positive.map(
                (keyword, index) => (
                  <Badge key={index} className="bg-green-100 text-green-800">
                    {keyword}
                  </Badge>
                ),
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-700">
              <AlertTriangle className="w-5 h-5" />
              <span>Areas for Improvement</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {sentimentData.summary.topKeywords.negative.map(
                (keyword, index) => (
                  <Badge key={index} className="bg-red-100 text-red-800">
                    {keyword}
                  </Badge>
                ),
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
