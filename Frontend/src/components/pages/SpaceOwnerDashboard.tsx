import { useState } from 'react';
import { 
  DollarSign, 
  MapPin, 
  Car, 
  Clock, 
  TrendingUp, 
  Plus, 
  Settings, 
  Eye,
  Calendar,
  Users,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit,
  BarChart3,
  Smartphone,
  CreditCard,
  RefreshCw,
  Filter,
  Download,
  Bell,
  Zap,
  Target,
  Award,
  Camera,
  MapIcon,
  Timer,
  Bike,
  Truck
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';

interface SpaceOwnerDashboardProps {
  onNavigate: (page: string) => void;
}

export function SpaceOwnerDashboard({ onNavigate }: SpaceOwnerDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const earningsMetrics = [
    {
      id: 'monthly',
      title: 'Monthly Earnings',
      value: '$2,847',
      change: '+$324',
      changeType: 'increase',
      percentage: '+12.8%',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-100',
      textColor: 'text-green-700'
    },
    {
      id: 'spaces',
      title: 'Active Spaces',
      value: '5',
      change: '+1',
      changeType: 'increase',
      percentage: '+25%',
      icon: MapPin,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100',
      textColor: 'text-blue-700'
    },
    {
      id: 'bookings',
      title: 'This Month\'s Bookings',
      value: '147',
      change: '+23',
      changeType: 'increase',
      percentage: '+18.5%',
      icon: Calendar,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100',
      textColor: 'text-purple-700'
    },
    {
      id: 'rating',
      title: 'Average Rating',
      value: '4.8',
      change: '+0.2',
      changeType: 'increase',
      percentage: '+4.3%',
      icon: Star,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-100',
      textColor: 'text-orange-700'
    }
  ];

  const parkingSpaces = [
    {
      id: 1,
      name: 'Downtown Garage Spot A',
      type: 'Covered Garage',
      location: 'Central Business District',
      pricing: { car: '$3.50/hr', bike: '$1.50/hr', truck: '$5.00/hr' },
      availability: 'Available',
      occupancy: 85,
      earnings: '$456',
      bookings: 34,
      rating: 4.9,
      status: 'active',
      images: 4,
      lastBooked: '2 hours ago'
    },
    {
      id: 2,
      name: 'Residential Driveway',
      type: 'Private Driveway',
      location: 'Suburban Neighborhood',
      pricing: { car: '$2.00/hr', bike: '$1.00/hr', truck: 'N/A' },
      availability: 'Occupied',
      occupancy: 45,
      earnings: '$189',
      bookings: 12,
      rating: 4.7,
      status: 'active',
      images: 3,
      lastBooked: '1 day ago'
    },
    {
      id: 3,
      name: 'Shopping Mall Spot',
      type: 'Open Lot',
      location: 'Shopping District',
      pricing: { car: '$2.50/hr', bike: '$1.25/hr', truck: '$4.00/hr' },
      availability: 'Available',
      occupancy: 72,
      earnings: '$623',
      bookings: 56,
      rating: 4.6,
      status: 'active',
      images: 6,
      lastBooked: '30 minutes ago'
    }
  ];

  const pendingRequests = [
    {
      id: 1,
      renterName: 'John Smith',
      spaceId: 1,
      spaceName: 'Downtown Garage Spot A',
      vehicleType: 'Car',
      duration: '3 hours',
      startTime: 'Today 2:00 PM',
      amount: '$10.50',
      requestTime: '15 minutes ago',
      renterRating: 4.8
    },
    {
      id: 2,
      renterName: 'Maria Garcia',
      spaceId: 3,
      spaceName: 'Shopping Mall Spot',
      vehicleType: 'SUV',
      duration: '2.5 hours',
      startTime: 'Tomorrow 10:00 AM',
      amount: '$6.25',
      requestTime: '1 hour ago',
      renterRating: 4.9
    },
    {
      id: 3,
      renterName: 'Alex Chen',
      spaceId: 2,
      spaceName: 'Residential Driveway',
      vehicleType: 'Motorcycle',
      duration: '4 hours',
      startTime: 'Today 6:00 PM',
      amount: '$4.00',
      requestTime: '2 hours ago',
      renterRating: 4.6
    }
  ];

  const recentEarnings = [
    { date: 'Today', amount: '$47.50', bookings: 8 },
    { date: 'Yesterday', amount: '$89.25', bookings: 12 },
    { date: '2 days ago', amount: '$62.00', bookings: 9 },
    { date: '3 days ago', amount: '$75.80', bookings: 11 },
    { date: '4 days ago', amount: '$53.40', bookings: 7 }
  ];

  return (
    <div className="space-y-8">
      {/* Host Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Host Control Center</h1>
          <p className="text-lg text-gray-600">Manage your parking spaces and maximize earnings</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <Button
            variant="outline"
            onClick={() => onNavigate('add-space')}
            className="border-purple-200 text-purple-700 hover:bg-purple-50"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Space
          </Button>
          <Button 
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            onClick={() => onNavigate('earnings')}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Earnings Dashboard
          </Button>
        </div>
      </div>

      {/* Earnings Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {earningsMetrics.map((metric, index) => (
          <Card 
            key={metric.id} 
            className={`glass-card professional-shadow-lg overflow-hidden hover-lift animate-fade-in border-0`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${metric.bgColor} rounded-xl flex items-center justify-center`}>
                  <metric.icon className={`w-6 h-6 ${metric.textColor}`} />
                </div>
                <Badge 
                  variant="default"
                  className="bg-green-100 text-green-700 border-green-200"
                >
                  {metric.percentage}
                </Badge>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">{metric.title}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900">{metric.value}</span>
                  <span className="text-sm font-medium text-green-600">{metric.change}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid bg-white border border-gray-200 p-1">
          <TabsTrigger 
            value="overview" 
            className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 transition-all duration-200 hover:bg-purple-50 hover:text-purple-600 hover:scale-105 hover:shadow-sm"
          >
            <Eye className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="spaces" 
            className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 transition-all duration-200 hover:bg-purple-50 hover:text-purple-600 hover:scale-105 hover:shadow-sm"
          >
            <MapPin className="w-4 h-4 mr-2" />
            My Spaces
          </TabsTrigger>
          <TabsTrigger 
            value="requests" 
            className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 transition-all duration-200 hover:bg-purple-50 hover:text-purple-600 hover:scale-105 hover:shadow-sm"
          >
            <Clock className="w-4 h-4 mr-2" />
            Requests
          </TabsTrigger>
          <TabsTrigger 
            value="earnings" 
            className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 transition-all duration-200 hover:bg-purple-50 hover:text-purple-600 hover:scale-105 hover:shadow-sm"
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Earnings
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card className="glass-card professional-shadow-lg p-6 border-0">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Recent Bookings</h3>
                <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
                  <Eye className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {recentEarnings.map((earning, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{earning.date}</p>
                        <p className="text-sm text-gray-600">{earning.bookings} bookings</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{earning.amount}</p>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        Paid
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Performance Overview */}
            <Card className="glass-card professional-shadow-lg p-6 border-0">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Performance Overview</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Overall Occupancy</span>
                    <span className="text-sm font-semibold text-purple-600">67%</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Host Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-semibold text-gray-900">4.8</span>
                    </div>
                  </div>
                  <Progress value={96} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Response Time</span>
                    <span className="text-sm font-semibold text-blue-600">&lt; 15 min</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Monthly Goal</span>
                    <span className="text-sm font-semibold text-green-600">$2,847 / $3,000</span>
                  </div>
                  <Progress value={94.9} className="h-2" />
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="glass-card professional-shadow-lg p-6 border-0">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="flex flex-col items-center gap-3 p-6 h-auto border-2 hover:border-purple-300 hover:bg-purple-50"
                onClick={() => onNavigate('add-space')}
              >
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Plus className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900">Add Space</div>
                  <div className="text-sm text-gray-500">List new parking</div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="flex flex-col items-center gap-3 p-6 h-auto border-2 hover:border-green-300 hover:bg-green-50"
                onClick={() => onNavigate('earnings')}
              >
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900">Earnings Dashboard</div>
                  <div className="text-sm text-gray-500">Detailed insights</div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="flex flex-col items-center gap-3 p-6 h-auto border-2 hover:border-orange-300 hover:bg-orange-50"
                onClick={() => onNavigate('withdrawal')}
              >
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-orange-600" />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900">Withdraw Funds</div>
                  <div className="text-sm text-gray-500">To mobile wallet</div>
                </div>
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* My Spaces Tab */}
        <TabsContent value="spaces" className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-gray-900">My Parking Spaces</h3>
            <Button 
              className="bg-gradient-to-r from-purple-600 to-blue-600"
              onClick={() => onNavigate('add-space')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Space
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {parkingSpaces.map((space) => (
              <Card key={space.id} className="glass-card professional-shadow-lg overflow-hidden hover-lift border-0">
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                    <div className="text-center">
                      <Camera className="w-12 h-12 text-purple-400 mx-auto mb-2" />
                      <p className="text-sm text-purple-600">{space.images} photos</p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge 
                      variant={space.availability === 'Available' ? 'default' : 'secondary'}
                      className={`${
                        space.availability === 'Available' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {space.availability}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-lg mb-1">{space.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{space.type}</p>
                      <p className="text-xs text-gray-500">{space.location}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-900">{space.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Car Rate:</span>
                      <span className="font-medium text-gray-900">{space.pricing.car}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Bike Rate:</span>
                      <span className="font-medium text-gray-900">{space.pricing.bike}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Truck Rate:</span>
                      <span className="font-medium text-gray-900">{space.pricing.truck}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                    <div>
                      <p className="text-lg font-bold text-green-600">{space.earnings}</p>
                      <p className="text-xs text-gray-600">This Month</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-blue-600">{space.bookings}</p>
                      <p className="text-xs text-gray-600">Bookings</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-purple-600">{space.occupancy}%</p>
                      <p className="text-xs text-gray-600">Occupancy</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Booking Requests Tab */}
        <TabsContent value="requests" className="space-y-6">
          <Card className="glass-card professional-shadow-lg border-0">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Pending Booking Requests</h3>
                  <p className="text-gray-600">Review and approve parking requests from drivers</p>
                </div>
                <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                  {pendingRequests.length} pending
                </Badge>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {pendingRequests.map((request) => (
                  <div key={request.id} className="border border-gray-200 rounded-xl p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                            <Users className="w-6 h-6 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-semibold text-gray-900">{request.renterName}</h4>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-sm text-gray-600">{request.renterRating}</span>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                              <div>
                                <span className="font-medium">Space:</span> {request.spaceName}
                              </div>
                              <div>
                                <span className="font-medium">Vehicle:</span> {request.vehicleType}
                              </div>
                              <div>
                                <span className="font-medium">Duration:</span> {request.duration}
                              </div>
                              <div>
                                <span className="font-medium">Start Time:</span> {request.startTime}
                              </div>
                            </div>
                            <div className="flex items-center gap-4 mt-3">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Amount:</span>
                                <span className="font-semibold text-green-600">{request.amount}</span>
                              </div>
                              <div className="text-xs text-gray-500">
                                Requested {request.requestTime}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-200 text-red-700 hover:bg-red-50">
                          <XCircle className="w-4 h-4 mr-2" />
                          Decline
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Earnings Tab */}
        <TabsContent value="earnings" className="space-y-6">
          <Card className="glass-card professional-shadow-lg p-6 border-0">
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Detailed Earnings Analytics</h3>
              <p className="text-gray-600 mb-6">Comprehensive revenue tracking and performance insights</p>
              <Button 
                className="bg-gradient-to-r from-purple-600 to-blue-600"
                onClick={() => onNavigate('earnings')}
              >
                Open Earnings Dashboard
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}