import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CreditCard,
  Wallet,
  Shield,
  Users,
  Calendar,
  DollarSign,
  Zap,
  Bitcoin,
  Smartphone,
  Globe,
  Lock,
  CheckCircle,
  Clock,
  AlertTriangle,
  Plus,
  Minus,
  Settings,
  Download,
  Share,
  TrendingUp,
  Gift,
  Star,
  Award,
} from "lucide-react";

interface PaymentMethod {
  id: string;
  type: "card" | "wallet" | "crypto" | "bank" | "bnpl";
  name: string;
  icon: React.ComponentType<any>;
  enabled: boolean;
  fees: number;
  processingTime: string;
  currencies: string[];
  regions: string[];
}

interface SplitPayment {
  id: string;
  guestName: string;
  email: string;
  amount: number;
  status: "pending" | "paid" | "failed";
  dueDate: string;
}

interface InstallmentPlan {
  id: string;
  name: string;
  installments: number;
  frequency: string;
  interestRate: number;
  fees: number;
  minAmount: number;
}

export const PaymentSystem: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("methods");
  const [splitPaymentEnabled, setSplitPaymentEnabled] = useState(true);
  const [dynamicPricingEnabled, setDynamicPricingEnabled] = useState(true);

  const paymentMethods: PaymentMethod[] = [
    {
      id: "cards",
      type: "card",
      name: "Credit/Debit Cards",
      icon: CreditCard,
      enabled: true,
      fees: 2.9,
      processingTime: "Instant",
      currencies: ["INR", "USD", "EUR", "GBP"],
      regions: ["Global"],
    },
    {
      id: "upi",
      type: "wallet",
      name: "UPI & Digital Wallets",
      icon: Smartphone,
      enabled: true,
      fees: 1.5,
      processingTime: "Instant",
      currencies: ["INR"],
      regions: ["India"],
    },
    {
      id: "crypto",
      type: "crypto",
      name: "Cryptocurrency",
      icon: Bitcoin,
      enabled: false,
      fees: 1.0,
      processingTime: "10-30 minutes",
      currencies: ["BTC", "ETH", "USDT", "USDC"],
      regions: ["Global"],
    },
    {
      id: "bank",
      type: "bank",
      name: "Bank Transfer",
      icon: Globe,
      enabled: true,
      fees: 0.5,
      processingTime: "1-3 business days",
      currencies: ["INR", "USD", "EUR"],
      regions: ["India", "US", "EU"],
    },
    {
      id: "bnpl",
      type: "bnpl",
      name: "Buy Now Pay Later",
      icon: Calendar,
      enabled: true,
      fees: 3.5,
      processingTime: "Instant",
      currencies: ["INR", "USD"],
      regions: ["India", "US"],
    },
  ];

  const installmentPlans: InstallmentPlan[] = [
    {
      id: "plan_3",
      name: "3-Month Plan",
      installments: 3,
      frequency: "Monthly",
      interestRate: 0,
      fees: 99,
      minAmount: 10000,
    },
    {
      id: "plan_6",
      name: "6-Month Plan",
      installments: 6,
      frequency: "Monthly",
      interestRate: 8.9,
      fees: 199,
      minAmount: 25000,
    },
    {
      id: "plan_12",
      name: "12-Month Plan",
      installments: 12,
      frequency: "Monthly",
      interestRate: 12.9,
      fees: 399,
      minAmount: 50000,
    },
  ];

  const splitPayments: SplitPayment[] = [
    {
      id: "1",
      guestName: "Sarah Johnson",
      email: "sarah@email.com",
      amount: 14000,
      status: "paid",
      dueDate: "2024-12-15",
    },
    {
      id: "2",
      guestName: "Mike Chen",
      email: "mike@email.com",
      amount: 14000,
      status: "pending",
      dueDate: "2024-12-15",
    },
    {
      id: "3",
      guestName: "Alex Rodriguez",
      email: "alex@email.com",
      amount: 14000,
      status: "pending",
      dueDate: "2024-12-15",
    },
  ];

  const revenueSharing = {
    totalRevenue: 245890,
    hostShare: 85,
    platformShare: 15,
    partnerCommissions: 3200,
    loyaltyRewards: 5600,
  };

  const loyaltyProgram = {
    totalMembers: 1247,
    pointsIssued: 156780,
    redemptions: 23450,
    averageSpend: 15670,
    retentionRate: 78,
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      paid: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      failed: "bg-red-100 text-red-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payment System</h1>
          <p className="text-gray-600 mt-2">
            Manage payment methods, pricing, and financial features
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Transaction Report
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Transactions
                </p>
                <p className="text-2xl font-bold text-gray-900">₹2,45,890</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">
                    +12.5%
                  </span>
                </div>
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
                  Success Rate
                </p>
                <p className="text-2xl font-bold text-gray-900">98.7%</p>
                <div className="flex items-center mt-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-gray-600">+0.3%</span>
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Split Payments
                </p>
                <p className="text-2xl font-bold text-gray-900">156</p>
                <div className="flex items-center mt-2">
                  <Users className="w-4 h-4 text-purple-500 mr-1" />
                  <span className="text-sm text-gray-600">Active</span>
                </div>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Processing Fees
                </p>
                <p className="text-2xl font-bold text-gray-900">₹7,250</p>
                <div className="flex items-center mt-2">
                  <Wallet className="w-4 h-4 text-orange-500 mr-1" />
                  <span className="text-sm text-gray-600">2.9% avg</span>
                </div>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Wallet className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="split">Split Payments</TabsTrigger>
          <TabsTrigger value="installments">Installments</TabsTrigger>
          <TabsTrigger value="crypto">Cryptocurrency</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Sharing</TabsTrigger>
          <TabsTrigger value="loyalty">Loyalty Program</TabsTrigger>
        </TabsList>

        <TabsContent value="methods" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {paymentMethods.map((method) => {
              const IconComponent = method.icon;
              return (
                <Card
                  key={method.id}
                  className={`${method.enabled ? "border-green-200" : "border-gray-200"}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-3 rounded-full ${method.enabled ? "bg-green-100" : "bg-gray-100"}`}
                        >
                          <IconComponent
                            className={`w-6 h-6 ${method.enabled ? "text-green-600" : "text-gray-400"}`}
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            {method.name}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge
                              className={
                                method.enabled
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }
                            >
                              {method.enabled ? "Enabled" : "Disabled"}
                            </Badge>
                            <span className="text-sm text-gray-600">
                              {method.fees}% fees
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          method.enabled ? "bg-green-600" : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            method.enabled ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">
                            Processing Time:
                          </span>
                          <div className="font-medium">
                            {method.processingTime}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-600">Regions:</span>
                          <div className="font-medium">
                            {method.regions.join(", ")}
                          </div>
                        </div>
                      </div>

                      <div>
                        <span className="text-sm text-gray-600">
                          Supported Currencies:
                        </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {method.currencies.map((currency, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {currency}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 pt-2">
                        <Shield className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-600">
                          PCI DSS Compliant
                        </span>
                        <Lock className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-600">
                          256-bit SSL
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="split" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-purple-500" />
                  <span>Split Payment Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Enable Split Payments</div>
                    <div className="text-sm text-gray-600">
                      Allow guests to split costs among group members
                    </div>
                  </div>
                  <button
                    onClick={() => setSplitPaymentEnabled(!splitPaymentEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      splitPaymentEnabled ? "bg-purple-600" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        splitPaymentEnabled ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Maximum Group Size
                    </label>
                    <Input type="number" defaultValue="8" max="20" min="2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Payment Deadline (days)
                    </label>
                    <Input type="number" defaultValue="7" max="30" min="1" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Minimum Split Amount
                    </label>
                    <Input type="number" defaultValue="1000" step="100" />
                  </div>
                </div>

                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Users className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-purple-900">
                        How Split Payments Work
                      </h4>
                      <p className="text-sm text-purple-800 mt-1">
                        The primary guest creates the booking and invites
                        others. Each member receives a payment link with their
                        share amount.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Split Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {splitPayments.map((payment) => (
                    <div key={payment.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="font-medium">{payment.guestName}</div>
                          <div className="text-sm text-gray-600">
                            {payment.email}
                          </div>
                        </div>
                        <Badge className={getStatusColor(payment.status)}>
                          {payment.status}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-lg font-semibold">
                            {formatCurrency(payment.amount)}
                          </div>
                          <div className="text-sm text-gray-600">
                            Due:{" "}
                            {new Date(payment.dueDate).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          {payment.status === "pending" && (
                            <Button size="sm" variant="outline">
                              Send Reminder
                            </Button>
                          )}
                          <Button size="sm" variant="ghost">
                            <Share className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="installments" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {installmentPlans.map((plan) => (
              <Card key={plan.id} className="border-2">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-blue-600">
                    {plan.installments}
                  </div>
                  <div className="text-sm text-gray-600">Monthly Payments</div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        Interest Rate
                      </span>
                      <span className="font-medium">
                        {plan.interestRate}% p.a.
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        Processing Fee
                      </span>
                      <span className="font-medium">
                        {formatCurrency(plan.fees)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        Minimum Amount
                      </span>
                      <span className="font-medium">
                        {formatCurrency(plan.minAmount)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Frequency</span>
                      <span className="font-medium">{plan.frequency}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="text-sm text-gray-600 mb-2">
                      Example for ₹25,000 booking:
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="flex justify-between text-sm">
                        <span>Monthly Payment:</span>
                        <span className="font-medium">
                          ₹
                          {Math.round(
                            ((25000 + plan.fees) *
                              (1 + plan.interestRate / 100)) /
                              plan.installments,
                          ).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    variant={plan.interestRate === 0 ? "default" : "outline"}
                  >
                    {plan.interestRate === 0 ? "Most Popular" : "Enable Plan"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="crypto" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bitcoin className="w-5 h-5 text-orange-500" />
                  <span>Cryptocurrency Payments</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-orange-900">
                        Beta Feature
                      </h4>
                      <p className="text-sm text-orange-800 mt-1">
                        Cryptocurrency payments are currently in beta. Enable
                        with caution and monitor transactions closely.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Enable Crypto Payments</div>
                      <div className="text-sm text-gray-600">
                        Accept Bitcoin, Ethereum, and stablecoins
                      </div>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Supported Cryptocurrencies
                    </label>
                    <div className="space-y-2">
                      {[
                        "Bitcoin (BTC)",
                        "Ethereum (ETH)",
                        "Tether (USDT)",
                        "USD Coin (USDC)",
                      ].map((crypto, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3"
                        >
                          <input
                            type="checkbox"
                            className="rounded"
                            defaultChecked={index < 2}
                          />
                          <span className="text-sm">{crypto}</span>
                          <Badge variant="outline" className="text-xs">
                            {index < 2 ? "1.0% fee" : "0.5% fee"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Auto-conversion to INR
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="rounded"
                        defaultChecked
                      />
                      <span className="text-sm">
                        Automatically convert crypto to INR upon receipt
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Crypto Transaction Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Bitcoin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No Crypto Transactions Yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Enable cryptocurrency payments to start accepting digital
                    currencies
                  </p>
                  <Button variant="outline">Enable Crypto Payments</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Share className="w-5 h-5 text-green-500" />
                  <span>Revenue Sharing Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">
                    {formatCurrency(revenueSharing.totalRevenue)}
                  </div>
                  <div className="text-gray-600">Total Revenue This Month</div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div>
                      <div className="font-medium text-green-900">
                        Your Share ({revenueSharing.hostShare}%)
                      </div>
                      <div className="text-sm text-green-700">
                        After platform fees
                      </div>
                    </div>
                    <div className="text-xl font-bold text-green-600">
                      {formatCurrency(
                        Math.round(
                          (revenueSharing.totalRevenue *
                            revenueSharing.hostShare) /
                            100,
                        ),
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <div className="font-medium text-blue-900">
                        Platform Share ({revenueSharing.platformShare}%)
                      </div>
                      <div className="text-sm text-blue-700">
                        Service & support fees
                      </div>
                    </div>
                    <div className="text-xl font-bold text-blue-600">
                      {formatCurrency(
                        Math.round(
                          (revenueSharing.totalRevenue *
                            revenueSharing.platformShare) /
                            100,
                        ),
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-lg font-bold">
                        {formatCurrency(revenueSharing.partnerCommissions)}
                      </div>
                      <div className="text-sm text-gray-600">
                        Partner Commissions
                      </div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-lg font-bold">
                        {formatCurrency(revenueSharing.loyaltyRewards)}
                      </div>
                      <div className="text-sm text-gray-600">
                        Loyalty Rewards
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Sharing Programs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium">Referral Program</h4>
                      <p className="text-sm text-gray-600">
                        Earn commission for each new host you refer
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Commission Rate:</span>
                      <div className="font-medium">5% for 12 months</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Referrals Made:</span>
                      <div className="font-medium">3 active</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium">Co-hosting Program</h4>
                      <p className="text-sm text-gray-600">
                        Share revenue with co-hosts
                      </p>
                    </div>
                    <Badge variant="outline">Not Active</Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    Split revenue with trusted co-hosts who help manage your
                    properties
                  </div>
                  <Button size="sm" className="mt-3">
                    Set Up Co-hosting
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium">Affiliate Program</h4>
                      <p className="text-sm text-gray-600">
                        Earn from guest bookings you refer
                      </p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Commission Rate:</span>
                      <div className="font-medium">3% per booking</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Clicks This Month:</span>
                      <div className="font-medium">156</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="loyalty" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Gift className="w-5 h-5 text-purple-500" />
                  <span>Loyalty Program Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {loyaltyProgram.totalMembers.toLocaleString()}
                    </div>
                    <div className="text-sm text-purple-700">Total Members</div>
                  </div>
                  <div className="text-center p-4 bg-gold-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">
                      {loyaltyProgram.retentionRate}%
                    </div>
                    <div className="text-sm text-yellow-700">
                      Retention Rate
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Points Issued:
                    </span>
                    <span className="font-medium">
                      {loyaltyProgram.pointsIssued.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Points Redeemed:
                    </span>
                    <span className="font-medium">
                      {loyaltyProgram.redemptions.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Average Member Spend:
                    </span>
                    <span className="font-medium">
                      {formatCurrency(loyaltyProgram.averageSpend)}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-2">
                    Program Tiers
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>🥉 Bronze (0-999 points):</span>
                      <span>5% cashback</span>
                    </div>
                    <div className="flex justify-between">
                      <span>🥈 Silver (1000-2999 points):</span>
                      <span>8% cashback</span>
                    </div>
                    <div className="flex justify-between">
                      <span>🥇 Gold (3000+ points):</span>
                      <span>12% cashback</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Loyalty Program Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Points per ₹100 spent
                    </label>
                    <Input type="number" defaultValue="10" min="1" max="100" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Cashback Rate (%)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <Input placeholder="Bronze" defaultValue="5" />
                      <Input placeholder="Silver" defaultValue="8" />
                      <Input placeholder="Gold" defaultValue="12" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Tier Thresholds (points)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="Silver" defaultValue="1000" />
                      <Input placeholder="Gold" defaultValue="3000" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Point Expiry (months)
                    </label>
                    <Input type="number" defaultValue="24" min="12" max="36" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Bonus Rewards</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">
                        Birthday bonus (500 points)
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">
                        Referral bonus (1000 points)
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Review bonus (100 points)</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full">Update Loyalty Settings</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
