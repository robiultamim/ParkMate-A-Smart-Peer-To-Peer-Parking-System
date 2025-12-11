import { useState } from "react";
import {
  CreditCard,
  Plus,
  Smartphone,
  Shield,
  CheckCircle,
  XCircle,
  DollarSign,
  History,
  Settings,
  Star,
  AlertTriangle,
  RefreshCw,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Switch } from "../ui/switch";

export function MobilePaymentsPage() {
  const [showBalance, setShowBalance] = useState(true);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("bkash");

  const walletBalance = 145.50;
  
  const paymentMethods = [
    {
      id: "bkash",
      name: "bKash",
      type: "mobile_wallet",
      number: "+880 1712-345678",
      isDefault: true,
      isActive: true,
      balance: 450.00,
      logo: "🔴", // In real app, this would be an image
    },
    {
      id: "nagad",
      name: "Nagad",
      type: "mobile_wallet",
      number: "+880 1823-456789",
      isDefault: false,
      isActive: true,
      balance: 275.30,
      logo: "🟠",
    },
    {
      id: "rocket",
      name: "Rocket",
      type: "mobile_wallet",
      number: "+880 1634-567890",
      isDefault: false,
      isActive: false,
      balance: 120.75,
      logo: "🟣",
    },
    {
      id: "visa",
      name: "Visa Card",
      type: "credit_card",
      number: "**** **** **** 4532",
      isDefault: false,
      isActive: true,
      balance: null,
      logo: "💳",
    },
  ];

  const transactions = [
    {
      id: 1,
      type: "payment",
      description: "Parking at Central Plaza",
      amount: -5.50,
      date: "2024-01-15T14:30:00",
      status: "completed",
      method: "bKash",
      reference: "TXN001234567",
    },
    {
      id: 2,
      type: "refund",
      description: "Refund - Cancelled booking",
      amount: 8.00,
      date: "2024-01-14T09:15:00",
      status: "completed",
      method: "bKash",
      reference: "REF001234568",
    },
    {
      id: 3,
      type: "topup",
      description: "Wallet top-up",
      amount: 50.00,
      date: "2024-01-13T16:45:00",
      status: "completed",
      method: "Bank Transfer",
      reference: "TOP001234569",
    },
    {
      id: 4,
      type: "payment",
      description: "Parking at Mall Complex",
      amount: -3.75,
      date: "2024-01-12T11:20:00",
      status: "failed",
      method: "Nagad",
      reference: "TXN001234570",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "payment":
        return <CreditCard className="w-4 h-4 text-red-600" />;
      case "refund":
        return <RefreshCw className="w-4 h-4 text-green-600" />;
      case "topup":
        return <Plus className="w-4 h-4 text-blue-600" />;
      default:
        return <DollarSign className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">Mobile Payments</h1>
              <p className="text-green-100">
                Manage your payment methods and transactions
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-green-100 mb-1">Wallet Balance</div>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold">
                  {showBalance ? `$${walletBalance.toFixed(2)}` : "••••••"}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowBalance(!showBalance)}
                  className="h-6 w-6 text-white hover:bg-white/20"
                >
                  {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button
              variant="secondary"
              className="bg-white/10 hover:bg-white/20 border-0 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Top Up
            </Button>
            <Button
              variant="secondary"
              className="bg-white/10 hover:bg-white/20 border-0 text-white"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Pay Now
            </Button>
            <Button
              variant="secondary"
              className="bg-white/10 hover:bg-white/20 border-0 text-white"
            >
              <History className="w-4 h-4 mr-2" />
              History
            </Button>
            <Button
              variant="secondary"
              className="bg-white/10 hover:bg-white/20 border-0 text-white"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="methods" className="space-y-6">
        <TabsList>
          <TabsTrigger value="methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="methods" className="space-y-6">
          {/* Add Payment Method */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Payment Methods
              </h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-green-600 to-emerald-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Method
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Payment Method</DialogTitle>
                    <DialogDescription>
                      Add a new payment method to your account for seamless parking payments.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="payment-type">Payment Type</Label>
                      <Select defaultValue="mobile_wallet">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mobile_wallet">Mobile Wallet</SelectItem>
                          <SelectItem value="credit_card">Credit Card</SelectItem>
                          <SelectItem value="debit_card">Debit Card</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="provider">Provider</Label>
                      <Select defaultValue="bkash">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bkash">bKash</SelectItem>
                          <SelectItem value="nagad">Nagad</SelectItem>
                          <SelectItem value="rocket">Rocket</SelectItem>
                          <SelectItem value="upay">Upay</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="number">Phone Number</Label>
                      <Input
                        id="number"
                        placeholder="+880 1712-345678"
                        type="tel"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1">Add Method</Button>
                      <Button variant="outline" className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paymentMethods.map((method) => (
                <Card
                  key={method.id}
                  className={`p-4 border-2 transition-all duration-200 cursor-pointer ${
                    method.isDefault
                      ? "border-green-300 bg-green-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{method.logo}</div>
                      <div>
                        <h4 className="font-medium text-gray-900">{method.name}</h4>
                        <p className="text-sm text-gray-600">{method.number}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      {method.isDefault && (
                        <Badge className="bg-green-100 text-green-800">
                          <Star className="w-3 h-3 mr-1" />
                          Default
                        </Badge>
                      )}
                      <Badge
                        variant={method.isActive ? "default" : "secondary"}
                        className={method.isActive ? "bg-green-600" : ""}
                      >
                        {method.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>

                  {method.balance !== null && (
                    <div className="mb-3">
                      <div className="text-sm text-gray-600 mb-1">Available Balance</div>
                      <div className="text-lg font-semibold text-green-600">
                        ${method.balance.toFixed(2)}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    {!method.isDefault && (
                      <Button size="sm" variant="outline" className="flex-1">
                        Set Default
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          {/* Security Features */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Security Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <Shield className="w-8 h-8 text-blue-600" />
                <div>
                  <h4 className="font-medium text-blue-900">PIN Protection</h4>
                  <p className="text-sm text-blue-700">Secure PIN for transactions</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div>
                  <h4 className="font-medium text-green-900">SSL Encrypted</h4>
                  <p className="text-sm text-green-700">Bank-level security</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                <Smartphone className="w-8 h-8 text-purple-600" />
                <div>
                  <h4 className="font-medium text-purple-900">OTP Verification</h4>
                  <p className="text-sm text-purple-700">SMS verification</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Transaction History
              </h3>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="payment">Payments</SelectItem>
                    <SelectItem value="refund">Refunds</SelectItem>
                    <SelectItem value="topup">Top-ups</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {transactions.map((transaction) => (
                <Card key={transaction.id} className="p-4 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {transaction.description}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {new Date(transaction.date).toLocaleDateString()} • {transaction.method}
                        </p>
                        <p className="text-xs text-gray-400">
                          Ref: {transaction.reference}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-lg font-semibold ${
                          transaction.amount > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                      </div>
                      <Badge
                        className={getStatusColor(transaction.status)}
                        variant="secondary"
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center mt-6">
              <Button variant="outline">Load More Transactions</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Payment Settings
            </h3>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Auto-pay for parking</h4>
                  <p className="text-sm text-gray-600">
                    Automatically pay for parking when booking
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Low balance alerts</h4>
                  <p className="text-sm text-gray-600">
                    Get notified when wallet balance is low
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Transaction notifications</h4>
                  <p className="text-sm text-gray-600">
                    Receive SMS for all transactions
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Auto top-up</h4>
                    <p className="text-sm text-gray-600">
                      Automatically add funds when balance is low
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="min-balance">Minimum Balance</Label>
                    <Select defaultValue="10">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">$5</SelectItem>
                        <SelectItem value="10">$10</SelectItem>
                        <SelectItem value="20">$20</SelectItem>
                        <SelectItem value="50">$50</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="topup-amount">Top-up Amount</Label>
                    <Select defaultValue="25">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="20">$20</SelectItem>
                        <SelectItem value="25">$25</SelectItem>
                        <SelectItem value="50">$50</SelectItem>
                        <SelectItem value="100">$100</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-medium text-gray-900 mb-4">Security Settings</h4>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Change Payment PIN
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Smartphone className="w-4 h-4 mr-2" />
                    Update Phone Number
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
                    <XCircle className="w-4 h-4 mr-2" />
                    Remove All Payment Methods
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}