import { DollarSign, TrendingUp, TrendingDown, Calendar, Download, Eye, Car, MapPin, ArrowUpRight, BarChart3, PieChart } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface EarningsPageProps {
  onNavigate?: (page: string) => void;
}

export function EarningsPage({ onNavigate }: EarningsPageProps) {
  const earningsData = {
    today: 152.75,
    thisWeek: 1043.50,
    thisMonth: 4267.80,
    total: 15432.25,
    pendingWithdrawal: 890.25
  };

  const recentEarnings = [
    {
      id: 1,
      space: "Central Plaza Garage",
      customer: "John D.",
      amount: 12.50,
      duration: "2.5 hours",
      date: "Today 2:30 PM",
      status: "completed",
      vehicle: "Car"
    },
    {
      id: 2,
      space: "Mall Parking Lot",
      customer: "Sarah M.",
      amount: 8.75,
      duration: "1.75 hours",
      date: "Today 11:15 AM",
      status: "completed",
      vehicle: "SUV"
    },
    {
      id: 3,
      space: "Central Plaza Garage",
      customer: "Mike R.",
      amount: 25.00,
      duration: "5 hours",
      date: "Yesterday 3:45 PM",
      status: "completed",
      vehicle: "Truck"
    },
    {
      id: 4,
      space: "Office Complex",
      customer: "Lisa K.",
      amount: 15.00,
      duration: "3 hours",
      date: "Yesterday 9:20 AM",
      status: "pending",
      vehicle: "Car"
    }
  ];

  const monthlyStats = [
    { month: "Dec 2024", earnings: 4267.80, bookings: 89, change: "+12%" },
    { month: "Nov 2024", earnings: 3804.25, bookings: 76, change: "+8%" },
    { month: "Oct 2024", earnings: 3521.60, bookings: 72, change: "+15%" },
    { month: "Sep 2024", earnings: 3067.40, bookings: 68, change: "+5%" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">{/* Modern desktop layout */}
      {/* Enhanced Page Header */}
      <div className="text-center space-y-4 animate-fade-in">
        <h2 className="text-4xl font-bold text-gray-900">Earnings Dashboard</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Track your revenue, analyze performance, and manage withdrawals
        </p>
      </div>

      {/* Enhanced Earnings Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-gradient-to-br from-purple-600 to-blue-600 text-white p-8 hover-lift professional-shadow-xl border-0 relative overflow-hidden animate-slide-in-left">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">Today's Earnings</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">${earningsData.today.toFixed(2)}</span>
                    <ArrowUpRight className="w-4 h-4 text-green-300" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <TrendingUp className="w-4 h-4 text-green-300" />
              <span>+15% from yesterday</span>
            </div>
          </div>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-8 hover-lift professional-shadow-xl border-0 relative overflow-hidden animate-slide-in-right">
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">This Month</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">${earningsData.thisMonth.toFixed(2)}</span>
                    <BarChart3 className="w-4 h-4 text-white/60" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <TrendingUp className="w-4 h-4 text-green-300" />
              <span>+12% from last month</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Enhanced Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card professional-shadow p-6 text-center border-0 hover-lift animate-fade-in stagger-1">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-violet-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Calendar className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-purple-600 mb-1">${earningsData.thisWeek.toFixed(2)}</p>
          <p className="text-sm text-gray-600">This Week</p>
        </Card>
        <Card className="glass-card professional-shadow p-6 text-center border-0 hover-lift animate-fade-in stagger-2">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <BarChart3 className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-blue-600 mb-1">${earningsData.total.toFixed(2)}</p>
          <p className="text-sm text-gray-600">Total Earned</p>
        </Card>
        <Card className="glass-card professional-shadow p-6 text-center border-0 hover-lift animate-fade-in stagger-3">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Download className="w-6 h-6 text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-orange-600 mb-1">${earningsData.pendingWithdrawal.toFixed(2)}</p>
          <p className="text-sm text-gray-600">Available to Withdraw</p>
        </Card>
      </div>

      {/* Earnings Tabs */}
      <Tabs defaultValue="recent" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-sm">
          <TabsTrigger value="recent">Recent Earnings</TabsTrigger>
          <TabsTrigger value="monthly">Monthly View</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Recent Transactions</h3>
            <Select defaultValue="all">
              <SelectTrigger className="w-32 bg-white/60">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            {recentEarnings.map((earning) => (
              <Card key={earning.id} className="bg-white/80 backdrop-blur-sm border-white/20 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                      <Car className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{earning.space}</h4>
                      <p className="text-sm text-gray-600">{earning.customer} • {earning.vehicle}</p>
                      <p className="text-xs text-gray-500">{earning.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">${earning.amount.toFixed(2)}</div>
                    <div className="text-sm text-gray-500">{earning.duration}</div>
                    <Badge 
                      variant={earning.status === 'completed' ? 'secondary' : 'outline'}
                      className={earning.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}
                    >
                      {earning.status}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-4">
          <div className="space-y-3">
            {monthlyStats.map((stat, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-white/20 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{stat.month}</h4>
                      <p className="text-sm text-gray-600">{stat.bookings} bookings</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">${stat.earnings.toFixed(2)}</div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-green-500" />
                      <span className="text-sm text-green-600">{stat.change}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Withdrawal Info */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <Download className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-blue-800">Ready to Withdraw</h3>
            <p className="text-sm text-blue-700">${earningsData.pendingWithdrawal.toFixed(2)} available for withdrawal to your mobile wallet</p>
          </div>
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-pointer"
            onClick={() => onNavigate?.('withdrawal')}
          >
            Withdraw
          </Button>
        </div>
      </Card>
    </div>
  );
}