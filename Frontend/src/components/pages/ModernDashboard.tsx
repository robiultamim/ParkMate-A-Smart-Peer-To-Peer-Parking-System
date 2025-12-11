import { useState } from 'react';
import {
  Users,
  DollarSign,
  MapPin,
  Clock,
  TrendingUp,
  TrendingDown,
  Car,
  Shield,
  Star,
  Calendar,
  Activity,
  Eye,
  Plus,
  Filter,
  Download,
  RefreshCw,
  BarChart3,
  PieChart,
  Navigation,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface ModernDashboardProps {
  userRole: 'driver' | 'host' | 'admin';
  onNavigate: (page: string) => void;
}

export function ModernDashboard({ userRole, onNavigate }: ModernDashboardProps) {
  const [dateFilter, setDateFilter] = useState('March 30, 2024');

  const getMetricsData = () => {
    switch (userRole) {
      case 'driver':
        return {
          title: 'Driver Overview',
          metrics: [
            {
              id: 'spots',
              label: 'Available spots',
              value: '2,847',
              change: '+124',
              changePercent: '20%',
              trend: 'up',
              icon: MapPin,
              color: 'blue'
            },
            {
              id: 'bookings',
              label: 'Your bookings',
              value: '147',
              change: '+23',
              changePercent: '15%',
              trend: 'up',
              icon: Calendar,
              color: 'green'
            },
            {
              id: 'active',
              label: 'Active now',
              value: '8',
              change: '+2',
              changePercent: '12%',
              trend: 'up',
              icon: Activity,
              color: 'purple'
            }
          ],
          charts: [
            {
              id: 'booking-funnel',
              title: 'Booking funnel',
              type: 'funnel',
              data: [
                { label: 'Search', value: 200, stage: 'search' },
                { label: 'View details', value: 150, stage: 'view' },
                { label: 'Select time', value: 100, stage: 'select' },
                { label: 'Payment', value: 70, stage: 'payment' },
                { label: 'Confirmed', value: 50, stage: 'confirmed' }
              ],
              total: 200
            },
            {
              id: 'location-distribution',
              title: 'Location preferences',
              type: 'donut',
              data: [
                { label: 'Downtown', value: 45, color: '#8b5cf6' },
                { label: 'Shopping areas', value: 30, color: '#06b6d4' },
                { label: 'Residential', value: 15, color: '#10b981' },
                { label: 'Other', value: 10, color: '#f59e0b' }
              ]
            }
          ]
        };
      case 'host':
        return {
          title: 'Host Analytics',
          metrics: [
            {
              id: 'earnings',
              label: 'Monthly earnings',
              value: '$2,847',
              change: '+$324',
              changePercent: '12%',
              trend: 'up',
              icon: DollarSign,
              color: 'green'
            },
            {
              id: 'spaces',
              label: 'Active spaces',
              value: '5',
              change: '+1',
              changePercent: '25%',
              trend: 'up',
              icon: MapPin,
              color: 'blue'
            },
            {
              id: 'bookings',
              label: 'Pending requests',
              value: '12',
              change: '+3',
              changePercent: '18%',
              trend: 'up',
              icon: Clock,
              color: 'orange'
            }
          ],
          charts: [
            {
              id: 'revenue-funnel',
              title: 'Revenue funnel',
              type: 'funnel',
              data: [
                { label: 'Inquiries', value: 200, stage: 'inquiry' },
                { label: 'Site visits', value: 150, stage: 'visit' },
                { label: 'Bookings', value: 100, stage: 'booking' },
                { label: 'Payments', value: 85, stage: 'payment' },
                { label: 'Completed', value: 75, stage: 'completed' }
              ],
              total: 200
            },
            {
              id: 'space-performance',
              title: 'Space performance',
              type: 'donut',
              data: [
                { label: 'Premium garage', value: 45, color: '#8b5cf6' },
                { label: 'Street parking', value: 25, color: '#06b6d4' },
                { label: 'Driveway', value: 20, color: '#10b981' },
                { label: 'Other', value: 10, color: '#f59e0b' }
              ]
            }
          ]
        };
      case 'admin':
        return {
          title: 'Platform Overview',
          metrics: [
            {
              id: 'users',
              label: 'Total users',
              value: '18,542',
              change: '+1,247',
              changePercent: '7%',
              trend: 'up',
              icon: Users,
              color: 'blue'
            },
            {
              id: 'revenue',
              label: 'Platform revenue',
              value: '$47,892',
              change: '+$3,247',
              changePercent: '8%',
              trend: 'up',
              icon: DollarSign,
              color: 'green'
            },
            {
              id: 'disputes',
              label: 'Active issues',
              value: '23',
              change: '-5',
              changePercent: '18%',
              trend: 'down',
              icon: AlertCircle,
              color: 'red'
            }
          ],
          charts: [
            {
              id: 'user-funnel',
              title: 'User acquisition',
              type: 'funnel',
              data: [
                { label: 'Visitors', value: 1000, stage: 'visit' },
                { label: 'Signups', value: 400, stage: 'signup' },
                { label: 'Verification', value: 300, stage: 'verify' },
                { label: 'First booking', value: 200, stage: 'book' },
                { label: 'Active users', value: 150, stage: 'active' }
              ],
              total: 1000
            },
            {
              id: 'platform-health',
              title: 'Platform health',
              type: 'donut',
              data: [
                { label: 'Active users', value: 72, color: '#10b981' },
                { label: 'Pending verification', value: 18, color: '#f59e0b' },
                { label: 'Suspended', value: 6, color: '#ef4444' },
                { label: 'Other', value: 4, color: '#6b7280' }
              ]
            }
          ]
        };
      default:
        return { title: '', metrics: [], charts: [] };
    }
  };

  const dashboardData = getMetricsData();

  const FunnelChart = ({ data, total }: { data: any[], total: number }) => {
    return (
      <div className="space-y-2">
        {data.map((item, index) => {
          const percentage = (item.value / total) * 100;
          const width = Math.max(percentage, 10); // Minimum width for visibility
          
          return (
            <div key={index} className="flex items-center gap-4">
              <div className="w-20 text-sm text-gray-600 text-right">{item.label}</div>
              <div className="flex-1 relative">
                <div 
                  className="h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded flex items-center justify-end pr-3 text-white text-sm font-medium"
                  style={{ width: `${width}%` }}
                >
                  {item.value}
                </div>
              </div>
              <div className="w-16 text-sm text-gray-500">{Math.round(percentage)}%</div>
            </div>
          );
        })}
        <div className="mt-4 text-center">
          <span className="text-lg font-bold text-gray-900">Total {total}</span>
        </div>
      </div>
    );
  };

  const DonutChart = ({ data }: { data: any[] }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    return (
      <div className="flex items-center gap-6">
        <div className="relative w-32 h-32">
          <svg width="128" height="128" className="transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="#f3f4f6"
              strokeWidth="16"
              fill="none"
            />
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const circumference = 2 * Math.PI * 56;
              const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
              const strokeDashoffset = data.slice(0, index).reduce((acc, prev) => {
                return acc - ((prev.value / total) * circumference);
              }, 0);
              
              return (
                <circle
                  key={index}
                  cx="64"
                  cy="64"
                  r="56"
                  stroke={item.color}
                  strokeWidth="16"
                  fill="none"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-300"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{total}%</div>
              <div className="text-xs text-gray-500">Total</div>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-600">{item.label}</span>
              <span className="text-sm font-medium text-gray-900 ml-auto">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ProcessMonitoring = () => {
    const systemHealth = userRole === 'admin' ? 99 : userRole === 'host' ? 87 : 71;
    const statusText = userRole === 'admin' ? 'OPTIMAL' : userRole === 'host' ? 'GOOD' : 'ACTIVE';
    
    return (
      <Card className="glass-card professional-shadow-lg p-6 border-0">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">System monitoring</h3>
          <Badge variant="secondary" className="bg-gray-100 text-gray-700">
            Live
          </Badge>
        </div>
        
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-32 h-32">
            <svg width="128" height="128" className="transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#f3f4f6"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${(systemHealth / 100) * 351.86} 351.86`}
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{systemHealth}%</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-1">System status</div>
          <Badge 
            variant="secondary" 
            className={`${
              systemHealth >= 95 ? 'bg-green-100 text-green-700' :
              systemHealth >= 80 ? 'bg-blue-100 text-blue-700' :
              'bg-orange-100 text-orange-700'
            }`}
          >
            {statusText}
          </Badge>
        </div>
      </Card>
    );
  };

  const ProgressChart = () => {
    const weeklyData = [
      { day: 'Mon', value: 45 },
      { day: 'Tue', value: 62 },
      { day: 'Wed', value: 38 },
      { day: 'Thu', value: 71 },
      { day: 'Fri', value: 84 },
      { day: 'Sat', value: 92 },
      { day: 'Sun', value: 67 }
    ];
    
    const maxValue = Math.max(...weeklyData.map(d => d.value));
    
    return (
      <Card className="glass-card professional-shadow-lg p-6 border-0">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Weekly progress</h3>
          <Button variant="ghost" size="sm" className="text-purple-600">
            Weekly
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="text-sm text-gray-600 mb-2">
            <span className="inline-block w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
            Maximum reached
          </div>
          
          <div className="flex items-end gap-2 h-32">
            {weeklyData.map((item, index) => {
              const height = (item.value / maxValue) * 100;
              const isHighest = item.value === maxValue;
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden" style={{ height: '80px' }}>
                    <div 
                      className={`w-full ${isHighest ? 'bg-purple-500' : 'bg-green-400'} rounded-lg transition-all duration-1000 ease-out`}
                      style={{ 
                        height: `${height}%`,
                        marginTop: `${100 - height}%`
                      }}
                    />
                    {isHighest && (
                      <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">{item.day}</span>
                </div>
              );
            })}
          </div>
          
          <div className="text-center text-sm text-gray-600">
            Peak performance on Friday: <span className="font-semibold text-purple-600">92%</span>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header with date filter */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{dashboardData.title}</h1>
          <p className="text-gray-600 mt-1">Complete overview and analytics</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter data
          </Button>
          <Badge variant="secondary" className="bg-gray-100 text-gray-700 px-3 py-1">
            {dateFilter}
          </Badge>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dashboardData.metrics.map((metric, index) => (
          <Card 
            key={metric.id} 
            className="glass-card professional-shadow-lg p-6 border-0 hover-lift animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  metric.color === 'blue' ? 'bg-blue-100' :
                  metric.color === 'green' ? 'bg-green-100' :
                  metric.color === 'purple' ? 'bg-purple-100' :
                  metric.color === 'orange' ? 'bg-orange-100' :
                  'bg-red-100'
                }`}>
                  <metric.icon className={`w-5 h-5 ${
                    metric.color === 'blue' ? 'text-blue-600' :
                    metric.color === 'green' ? 'text-green-600' :
                    metric.color === 'purple' ? 'text-purple-600' :
                    metric.color === 'orange' ? 'text-orange-600' :
                    'text-red-600'
                  }`} />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">{metric.label}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-gray-600">
                <Eye className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">{metric.value}</div>
              <div className="flex items-center gap-2">
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {metric.changePercent}
                </div>
                <span className="text-sm text-gray-500">{metric.change}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Chart */}
        <Card className="glass-card professional-shadow-lg p-6 border-0">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">{dashboardData.charts[0]?.title}</h3>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {dashboardData.charts[0] && (
            <FunnelChart 
              data={dashboardData.charts[0].data} 
              total={dashboardData.charts[0].total} 
            />
          )}
        </Card>

        {/* Secondary Chart */}
        <Card className="glass-card professional-shadow-lg p-6 border-0">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">{dashboardData.charts[1]?.title}</h3>
            <Badge variant="secondary" className="bg-gray-100 text-gray-700">
              100%
            </Badge>
          </div>
          
          {dashboardData.charts[1] && (
            <DonutChart data={dashboardData.charts[1].data} />
          )}
        </Card>
      </div>

      {/* Bottom Row - Process Monitoring and Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProcessMonitoring />
        <ProgressChart />
      </div>

      {/* Quick Actions */}
      <Card className="glass-card professional-shadow-lg p-6 border-0">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {userRole === 'driver' && (
            <>
              <Button
                variant="outline"
                className="flex items-center gap-3 p-4 h-auto justify-start border-2 hover:border-purple-300 hover:bg-purple-50"
                onClick={() => onNavigate('map')}
              >
                <Navigation className="w-5 h-5 text-purple-600" />
                <div className="text-left">
                  <div className="font-medium">Find parking</div>
                  <div className="text-sm text-gray-500">Search nearby spots</div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-3 p-4 h-auto justify-start border-2 hover:border-green-300 hover:bg-green-50"
                onClick={() => onNavigate('bookings')}
              >
                <Calendar className="w-5 h-5 text-green-600" />
                <div className="text-left">
                  <div className="font-medium">My bookings</div>
                  <div className="text-sm text-gray-500">View history</div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-3 p-4 h-auto justify-start border-2 hover:border-blue-300 hover:bg-blue-50"
                onClick={() => onNavigate('payment')}
              >
                <DollarSign className="w-5 h-5 text-blue-600" />
                <div className="text-left">
                  <div className="font-medium">Payment</div>
                  <div className="text-sm text-gray-500">Manage wallets</div>
                </div>
              </Button>
            </>
          )}
          
          {userRole === 'host' && (
            <>
              <Button
                variant="outline"
                className="flex items-center gap-3 p-4 h-auto justify-start border-2 hover:border-purple-300 hover:bg-purple-50"
                onClick={() => onNavigate('add-space')}
              >
                <Plus className="w-5 h-5 text-purple-600" />
                <div className="text-left">
                  <div className="font-medium">Add space</div>
                  <div className="text-sm text-gray-500">List new parking</div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-3 p-4 h-auto justify-start border-2 hover:border-green-300 hover:bg-green-50"
                onClick={() => onNavigate('earnings')}
              >
                <BarChart3 className="w-5 h-5 text-green-600" />
                <div className="text-left">
                  <div className="font-medium">Analytics</div>
                  <div className="text-sm text-gray-500">View performance</div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-3 p-4 h-auto justify-start border-2 hover:border-orange-300 hover:bg-orange-50"
                onClick={() => onNavigate('withdrawal')}
              >
                <DollarSign className="w-5 h-5 text-orange-600" />
                <div className="text-left">
                  <div className="font-medium">Withdraw</div>
                  <div className="text-sm text-gray-500">Transfer earnings</div>
                </div>
              </Button>
            </>
          )}
          
          {userRole === 'admin' && (
            <>
              <Button
                variant="outline"
                className="flex items-center gap-3 p-4 h-auto justify-start border-2 hover:border-red-300 hover:bg-red-50"
                onClick={() => onNavigate('admin')}
              >
                <Shield className="w-5 h-5 text-red-600" />
                <div className="text-left">
                  <div className="font-medium">Verification</div>
                  <div className="text-sm text-gray-500">Review hosts</div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-3 p-4 h-auto justify-start border-2 hover:border-yellow-300 hover:bg-yellow-50"
                onClick={() => onNavigate('disputes')}
              >
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <div className="text-left">
                  <div className="font-medium">Disputes</div>
                  <div className="text-sm text-gray-500">Resolve issues</div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-3 p-4 h-auto justify-start border-2 hover:border-blue-300 hover:bg-blue-50"
                onClick={() => onNavigate('analytics')}
              >
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <div className="text-left">
                  <div className="font-medium">Analytics</div>
                  <div className="text-sm text-gray-500">Platform metrics</div>
                </div>
              </Button>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}