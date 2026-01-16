import { useEffect, useState } from 'react';
import { DollarSign, TrendingUp, Calendar, Download, Car, ArrowUpRight, BarChart3 } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface EarningsPageProps {
  onNavigate?: (page: string) => void;
}

export function EarningsPage({ onNavigate }: EarningsPageProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [earningsData, setEarningsData] = useState({
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
    total: 0,
    pendingWithdrawal: 0
  });
  const [recentEarnings, setRecentEarnings] = useState<any[]>([]);
  const [monthlyStats, setMonthlyStats] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      fetchEarningsData();
    }
  }, [user]);

  const fetchEarningsData = async () => {
    try {
      // Get owner's parking spaces
      const { data: spaces, error: spacesError } = await supabase
        .from('parking_spaces')
        .select('id')
        .eq('owner_id', user!.id);

      if (spacesError) throw spacesError;

      const spaceIds = spaces?.map(s => s.id) || [];

      if (spaceIds.length === 0) {
        setLoading(false);
        return;
      }

      // Fetch all confirmed bookings
      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select(`
          *,
          parking_spaces!space_id (name)
        `)
        .in('space_id', spaceIds)
        .eq('status', 'confirmed')
        .order('created_at', { ascending: false });

      if (bookingsError) throw bookingsError;

      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

      let todayEarnings = 0;
      let weekEarnings = 0;
      let monthEarnings = 0;
      let totalEarnings = 0;

      // Calculate earnings
      bookings?.forEach((booking: any) => {
        const bookingDate = new Date(booking.created_at);
        const amount = parseFloat(booking.total_price) || 0;

        totalEarnings += amount;

        if (bookingDate >= today) {
          todayEarnings += amount;
        }

        if (bookingDate >= weekAgo) {
          weekEarnings += amount;
        }

        if (bookingDate >= monthStart) {
          monthEarnings += amount;
        }
      });

      setEarningsData({
        today: todayEarnings,
        thisWeek: weekEarnings,
        thisMonth: monthEarnings,
        total: totalEarnings,
        pendingWithdrawal: totalEarnings * 0.9 // Assuming 10% platform fee
      });

      // Format recent earnings
      const recent = bookings?.slice(0, 10).map((booking: any) => ({
        id: booking.id,
        space: booking.parking_spaces?.name || 'Unknown Space',
        customer: 'Driver',
        amount: parseFloat(booking.total_price) || 0,
        duration: `${Math.ceil((new Date(booking.end_time).getTime() - new Date(booking.start_time).getTime()) / (1000 * 60 * 60))} hours`,
        date: new Date(booking.created_at).toLocaleString(),
        status: 'completed',
        vehicle: booking.vehicle_type || 'Car'
      })) || [];

      setRecentEarnings(recent);

      // Calculate monthly stats (last 6 months)
      const monthlyData: any = {};
      bookings?.forEach((booking: any) => {
        const date = new Date(booking.created_at);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

        if (!monthlyData[monthKey]) {
          monthlyData[monthKey] = {
            earnings: 0,
            bookings: 0
          };
        }

        monthlyData[monthKey].earnings += parseFloat(booking.total_price) || 0;
        monthlyData[monthKey].bookings += 1;
      });

      // Convert to array and sort by date (most recent first)
      const monthlyArray = Object.keys(monthlyData)
        .sort((a, b) => b.localeCompare(a))
        .slice(0, 6)
        .map((monthKey, index, arr) => {
          const [year, month] = monthKey.split('-');
          const monthName = new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

          // Calculate change from previous month
          let change = '+0%';
          if (index < arr.length - 1) {
            const prevMonthKey = arr[index + 1];
            const prevEarnings = monthlyData[prevMonthKey].earnings;
            const currentEarnings = monthlyData[monthKey].earnings;

            if (prevEarnings > 0) {
              const percentChange = ((currentEarnings - prevEarnings) / prevEarnings * 100).toFixed(1);
              change = `${parseFloat(percentChange) >= 0 ? '+' : ''}${percentChange}%`;
            }
          }

          return {
            month: monthName,
            earnings: monthlyData[monthKey].earnings,
            bookings: monthlyData[monthKey].bookings,
            change
          };
        });

      setMonthlyStats(monthlyArray);
    } catch (error) {
      console.error('Error fetching earnings:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading earnings data...</p>
        </div>
      </div>
    );
  }

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
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Monthly Cumulative Earnings</h3>
            <Badge className="bg-purple-100 text-purple-700 border-purple-200">
              Last 6 Months
            </Badge>
          </div>
          <div className="space-y-3">
            {monthlyStats.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No monthly data available</div>
            ) : (
              monthlyStats.map((stat, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm border-white/20 p-5 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg">{stat.month}</h4>
                        <p className="text-sm text-gray-600">{stat.bookings} confirmed bookings</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            Monthly Total
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-2xl text-gray-900 mb-1">${stat.earnings.toFixed(2)}</div>
                      <div className="flex items-center gap-1 justify-end">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-green-600">{stat.change}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">vs previous month</p>
                    </div>
                  </div>
                </Card>
              ))
            )}
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