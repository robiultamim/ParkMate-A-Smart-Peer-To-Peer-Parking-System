import { useState } from 'react';
import { 
  Users, 
  DollarSign, 
  Shield, 
  AlertTriangle, 
  TrendingUp, 
  MapPin, 
  Clock, 
  CheckCircle, 
  XCircle,
  BarChart3,
  Settings,
  UserCheck,
  Gavel,
  Eye,
  Search,
  Filter,
  Download,
  RefreshCw,
  Bell,
  Star,
  CreditCard,
  Calendar,
  FileText,
  Activity,
  Zap,
  Target,
  Award,
  Globe,
  Smartphone
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const platformMetrics = [
    {
      id: 'users',
      title: 'Total Users',
      value: '18,542',
      change: '+324',
      changeType: 'increase',
      percentage: '+2.1%',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100',
      textColor: 'text-blue-700'
    },
    {
      id: 'revenue',
      title: 'Platform Revenue',
      value: '$47,892',
      change: '+$3,247',
      changeType: 'increase',
      percentage: '+7.3%',
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100',
      textColor: 'text-green-700'
    },
    {
      id: 'disputes',
      title: 'Active Disputes',
      value: '23',
      change: '-5',
      changeType: 'decrease',
      percentage: '-17.9%',
      icon: Gavel,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-50 to-orange-100',
      textColor: 'text-orange-700'
    },
    {
      id: 'pending',
      title: 'Pending Verifications',
      value: '47',
      change: '+12',
      changeType: 'increase',
      percentage: '+34.3%',
      icon: Shield,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100',
      textColor: 'text-purple-700'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'verification',
      title: 'New host verification request',
      user: 'Sarah Johnson',
      time: '5 minutes ago',
      status: 'pending',
      priority: 'high'
    },
    {
      id: 2,
      type: 'dispute',
      title: 'Parking dispute reported',
      user: 'Mike Chen',
      time: '12 minutes ago',
      status: 'active',
      priority: 'urgent'
    },
    {
      id: 3,
      type: 'revenue',
      title: 'Commission payment processed',
      user: 'Downtown Garage',
      time: '1 hour ago',
      status: 'completed',
      priority: 'low'
    },
    {
      id: 4,
      type: 'user',
      title: 'New user registration',
      user: 'Alex Rivera',
      time: '2 hours ago',
      status: 'completed',
      priority: 'low'
    }
  ];

  const verificationQueue = [
    {
      id: 1,
      name: 'Central Plaza Parking',
      owner: 'Sarah Johnson',
      type: 'Commercial Garage',
      spaces: 45,
      location: 'Downtown District',
      submitted: '2 days ago',
      documents: 8,
      status: 'review'
    },
    {
      id: 2,
      name: 'Residential Driveway',
      owner: 'Mike Chen',
      type: 'Private Space',
      spaces: 2,
      location: 'Suburban Area',
      submitted: '4 hours ago',
      documents: 5,
      status: 'pending'
    },
    {
      id: 3,
      name: 'Mall Parking Complex',
      owner: 'Commerce Corp',
      type: 'Shopping Center',
      spaces: 150,
      location: 'Shopping District',
      submitted: '1 week ago',
      documents: 12,
      status: 'approved'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Admin Header with Actions */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Administrative Control Center</h1>
          <p className="text-lg text-gray-600">Complete platform oversight and management tools</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={refreshing}
            className="border-purple-200 text-purple-700 hover:bg-purple-50"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh Data
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Platform Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {platformMetrics.map((metric, index) => (
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
                  variant={metric.changeType === 'increase' ? 'default' : 'secondary'}
                  className={`${
                    metric.changeType === 'increase' 
                      ? 'bg-green-100 text-green-700 border-green-200' 
                      : 'bg-red-100 text-red-700 border-red-200'
                  }`}
                >
                  {metric.percentage}
                </Badge>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">{metric.title}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900">{metric.value}</span>
                  <span className={`text-sm font-medium ${
                    metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid bg-white border border-gray-200 p-1">
          <TabsTrigger value="overview" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
            <BarChart3 className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="verifications" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
            <UserCheck className="w-4 h-4 mr-2" />
            Verifications
          </TabsTrigger>
          <TabsTrigger value="disputes" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
            <Gavel className="w-4 h-4 mr-2" />
            Disputes
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
            <TrendingUp className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card className="glass-card professional-shadow-lg p-6 border-0">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
                <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
                  <Eye className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      activity.priority === 'urgent' ? 'bg-red-100' :
                      activity.priority === 'high' ? 'bg-orange-100' : 'bg-blue-100'
                    }`}>
                      {activity.type === 'verification' && <Shield className={`w-5 h-5 ${
                        activity.priority === 'urgent' ? 'text-red-600' :
                        activity.priority === 'high' ? 'text-orange-600' : 'text-blue-600'
                      }`} />}
                      {activity.type === 'dispute' && <Gavel className="w-5 h-5 text-red-600" />}
                      {activity.type === 'revenue' && <DollarSign className="w-5 h-5 text-green-600" />}
                      {activity.type === 'user' && <Users className="w-5 h-5 text-blue-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.user}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                    <Badge 
                      variant={activity.status === 'completed' ? 'default' : 'secondary'}
                      className={`${
                        activity.status === 'completed' ? 'bg-green-100 text-green-700' :
                        activity.status === 'active' ? 'bg-orange-100 text-orange-700' :
                        'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Platform Health */}
            <Card className="glass-card professional-shadow-lg p-6 border-0">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Platform Health</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">System Uptime</span>
                    <span className="text-sm font-semibold text-green-600">99.9%</span>
                  </div>
                  <Progress value={99.9} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">User Satisfaction</span>
                    <span className="text-sm font-semibold text-blue-600">4.8/5</span>
                  </div>
                  <Progress value={96} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Payment Success Rate</span>
                    <span className="text-sm font-semibold text-purple-600">98.5%</span>
                  </div>
                  <Progress value={98.5} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Host Verification Rate</span>
                    <span className="text-sm font-semibold text-indigo-600">87.3%</span>
                  </div>
                  <Progress value={87.3} className="h-2" />
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="glass-card professional-shadow-lg p-6 border-0">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Administrative Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="flex flex-col items-center gap-3 p-6 h-auto border-2 hover:border-purple-300 hover:bg-purple-50">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900">Verify Hosts</div>
                  <div className="text-sm text-gray-500">47 pending</div>
                </div>
              </Button>
              <Button variant="outline" className="flex flex-col items-center gap-3 p-6 h-auto border-2 hover:border-orange-300 hover:bg-orange-50">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Gavel className="w-6 h-6 text-orange-600" />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900">Resolve Disputes</div>
                  <div className="text-sm text-gray-500">23 active</div>
                </div>
              </Button>
              <Button variant="outline" className="flex flex-col items-center gap-3 p-6 h-auto border-2 hover:border-blue-300 hover:bg-blue-50">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900">View Analytics</div>
                  <div className="text-sm text-gray-500">Real-time data</div>
                </div>
              </Button>
              <Button variant="outline" className="flex flex-col items-center gap-3 p-6 h-auto border-2 hover:border-green-300 hover:bg-green-50">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Settings className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900">Platform Settings</div>
                  <div className="text-sm text-gray-500">Configure system</div>
                </div>
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Verifications Tab */}
        <TabsContent value="verifications" className="space-y-6">
          <Card className="glass-card professional-shadow-lg border-0">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Host Verification Queue</h3>
                  <p className="text-gray-600">Review and approve new parking space hosts</p>
                </div>
                <div className="flex gap-3 w-full lg:w-auto">
                  <div className="relative flex-1 lg:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input placeholder="Search hosts..." className="pl-10" />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {verificationQueue.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-xl p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
                            <MapPin className="w-6 h-6 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 text-lg mb-1">{item.name}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                              <div>
                                <span className="font-medium">Owner:</span> {item.owner}
                              </div>
                              <div>
                                <span className="font-medium">Type:</span> {item.type}
                              </div>
                              <div>
                                <span className="font-medium">Location:</span> {item.location}
                              </div>
                              <div>
                                <span className="font-medium">Spaces:</span> {item.spaces}
                              </div>
                              <div>
                                <span className="font-medium">Documents:</span> {item.documents}
                              </div>
                              <div>
                                <span className="font-medium">Submitted:</span> {item.submitted}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge 
                          variant={item.status === 'approved' ? 'default' : 'secondary'}
                          className={`${
                            item.status === 'approved' ? 'bg-green-100 text-green-700' :
                            item.status === 'review' ? 'bg-orange-100 text-orange-700' :
                            'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {item.status}
                        </Badge>
                        {item.status !== 'approved' && (
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Approve
                            </Button>
                            <Button size="sm" variant="outline" className="border-red-200 text-red-700 hover:bg-red-50">
                              <XCircle className="w-4 h-4 mr-2" />
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Disputes Tab */}
        <TabsContent value="disputes" className="space-y-6">
          <Card className="glass-card professional-shadow-lg p-6 border-0">
            <div className="text-center py-12">
              <Gavel className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Dispute Resolution Center</h3>
              <p className="text-gray-600 mb-6">Manage user conflicts and platform disputes</p>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                View Active Disputes
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <Card className="glass-card professional-shadow-lg p-6 border-0">
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Advanced Analytics Dashboard</h3>
              <p className="text-gray-600 mb-6">Comprehensive platform performance metrics and insights</p>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                Open Analytics Console
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}