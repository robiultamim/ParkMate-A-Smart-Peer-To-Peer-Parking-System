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
  Settings,
  FileText,
  BarChart3,
  Eye,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { StatsCard, QuickActionCard, SectionHeader } from "../ui/modern-main-layout";
import { Progress } from "../ui/progress";

interface ModernAdminDashboardProps {
  onNavigate: (page: string) => void;
}

export function ModernAdminDashboard({ onNavigate }: ModernAdminDashboardProps) {
  const platformStats = {
    totalUsers: 2847,
    totalHosts: 342,
    totalDrivers: 2505,
    activeBookings: 156,
    dailyRevenue: 3429,
    monthlyRevenue: 89750,
    totalSpaces: 1289,
    averageOccupancy: 73,
  };

  const pendingVerifications = [
    {
      id: 1,
      type: "host",
      name: "John Smith",
      email: "john.smith@email.com",
      property: "Downtown Garage Complex",
      submittedDate: "2 days ago",
      status: "pending_review",
    },
    {
      id: 2,
      type: "host",
      name: "Maria Garcia",
      email: "maria.garcia@email.com",
      property: "Residential Driveway",
      submittedDate: "1 day ago",
      status: "pending_documents",
    },
    {
      id: 3,
      type: "space",
      name: "Central Plaza Parking",
      host: "Sarah Johnson",
      location: "123 Main St, Downtown",
      submittedDate: "5 hours ago",
      status: "pending_inspection",
    },
  ];

  const activeDisputes = [
    {
      id: 1,
      type: "payment",
      complainant: "Driver: Mike R.",
      respondent: "Host: Lisa P.",
      issue: "Charged for extra time not used",
      amount: "$12.50",
      submittedDate: "3 days ago",
      priority: "medium",
    },
    {
      id: 2,
      type: "property",
      complainant: "Driver: Emma W.",
      respondent: "Host: David L.",
      issue: "Space not as described",
      amount: "$25.00",
      submittedDate: "1 day ago",
      priority: "high",
    },
    {
      id: 3,
      type: "access",
      complainant: "Driver: Tom H.",
      respondent: "Host: Amy K.",
      issue: "Unable to access booked space",
      amount: "$8.00",
      submittedDate: "6 hours ago",
      priority: "high",
    },
  ];

  const systemAlerts = [
    {
      id: 1,
      type: "security",
      title: "Unusual login pattern detected",
      description: "Multiple failed login attempts from IP: 192.168.1.100",
      severity: "high",
      time: "10 min ago",
    },
    {
      id: 2,
      type: "performance",
      title: "High server load detected",
      description: "API response time increased by 200ms",
      severity: "medium",
      time: "25 min ago",
    },
    {
      id: 3,
      type: "business",
      title: "Revenue milestone reached",
      description: "Monthly revenue target of $85k achieved",
      severity: "low",
      time: "2 hours ago",
    },
  ];

  const topPerformingSpaces = [
    {
      id: 1,
      name: "Central Plaza Garage",
      host: "Sarah J.",
      occupancy: 95,
      monthlyRevenue: 2840,
      bookings: 167,
      rating: 4.9,
    },
    {
      id: 2,
      name: "Downtown Business Center",
      host: "Mike R.",
      occupancy: 89,
      monthlyRevenue: 2150,
      bookings: 134,
      rating: 4.7,
    },
    {
      id: 3,
      name: "Mall Parking Complex",
      host: "Lisa M.",
      occupancy: 82,
      monthlyRevenue: 1960,
      bookings: 98,
      rating: 4.6,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Admin Control Center</h1>
          <p className="text-indigo-100 mb-6">
            Oversee platform operations and analytics. Complete admin control at your fingertips.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="font-medium">System Status</span>
              </div>
              <span className="text-sm text-indigo-100">All systems operational</span>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="font-medium">Pending Verifications</span>
              </div>
              <span className="text-sm text-indigo-100">{pendingVerifications.length} awaiting review</span>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span className="font-medium">Active Disputes</span>
              </div>
              <span className="text-sm text-indigo-100">{activeDisputes.length} need resolution</span>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="font-medium">Platform Health</span>
              </div>
              <span className="text-sm text-indigo-100">99.9% uptime</span>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value={platformStats.totalUsers.toLocaleString()}
          change="+24 today"
          changeType="positive"
          icon={<Users className="w-6 h-6" />}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <StatsCard
          title="Daily Revenue"
          value={`$${platformStats.dailyRevenue.toLocaleString()}`}
          change="+8% vs yesterday"
          changeType="positive"
          icon={<DollarSign className="w-6 h-6" />}
          color="bg-gradient-to-br from-green-500 to-emerald-600"
        />
        <StatsCard
          title="Active Bookings"
          value={platformStats.activeBookings}
          change="12 completed today"
          changeType="neutral"
          icon={<MapPin className="w-6 h-6" />}
          color="bg-gradient-to-br from-purple-500 to-purple-600"
        />
        <StatsCard
          title="Platform Health"
          value="99.9%"
          change="Uptime this month"
          changeType="positive"
          icon={<TrendingUp className="w-6 h-6" />}
          color="bg-gradient-to-br from-orange-500 to-red-500"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <SectionHeader
          title="Administrative Tools"
          subtitle="Access key platform management features"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickActionCard
            title="User Management"
            description="Manage user accounts and permissions"
            icon={<Users className="w-5 h-5" />}
            onClick={() => onNavigate("users")}
            color="border-blue-200 hover:border-blue-400"
          />
          <QuickActionCard
            title="Verification Queue"
            description="Review pending host verifications"
            icon={<Shield className="w-5 h-5" />}
            onClick={() => onNavigate("verifications")}
            color="border-orange-200 hover:border-orange-400"
            badge={`${pendingVerifications.length} pending`}
          />
          <QuickActionCard
            title="Dispute Resolution"
            description="Handle user conflicts and issues"
            icon={<AlertTriangle className="w-5 h-5" />}
            onClick={() => onNavigate("disputes")}
            color="border-red-200 hover:border-red-400"
            badge={`${activeDisputes.length} active`}
          />
          <QuickActionCard
            title="Platform Analytics"
            description="View detailed performance metrics"
            icon={<BarChart3 className="w-5 h-5" />}
            onClick={() => onNavigate("analytics")}
            color="border-purple-200 hover:border-purple-400"
          />
        </div>
      </div>

      {/* System Alerts */}
      <div>
        <SectionHeader
          title="System Alerts"
          subtitle="Important notifications requiring admin attention"
          action={
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Alert Settings
            </Button>
          }
        />
        <div className="space-y-3">
          {systemAlerts.map((alert) => {
            const getSeverityColor = (severity: string) => {
              switch (severity) {
                case "high":
                  return "border-l-red-500 bg-red-50";
                case "medium":
                  return "border-l-orange-500 bg-orange-50";
                case "low":
                  return "border-l-blue-500 bg-blue-50";
                default:
                  return "border-l-gray-500 bg-gray-50";
              }
            };

            const getSeverityIcon = (severity: string) => {
              switch (severity) {
                case "high":
                  return <AlertTriangle className="w-5 h-5 text-red-600" />;
                case "medium":
                  return <Clock className="w-5 h-5 text-orange-600" />;
                case "low":
                  return <CheckCircle className="w-5 h-5 text-blue-600" />;
                default:
                  return <AlertTriangle className="w-5 h-5 text-gray-600" />;
              }
            };

            return (
              <Card key={alert.id} className={`p-4 border-l-4 ${getSeverityColor(alert.severity)}`}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                    {getSeverityIcon(alert.severity)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900">{alert.title}</h4>
                      <Badge
                        variant={
                          alert.severity === "high"
                            ? "destructive"
                            : alert.severity === "medium"
                            ? "secondary"
                            : "outline"
                        }
                        className="text-xs"
                      >
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{alert.description}</p>
                    <p className="text-xs text-gray-500">{alert.time}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Pending Verifications */}
      <div>
        <SectionHeader
          title="Pending Verifications"
          subtitle="Host and space verifications awaiting review"
          action={
            <Badge variant="secondary" className="bg-orange-100 text-orange-700">
              {pendingVerifications.length} pending
            </Badge>
          }
        />
        <div className="space-y-3">
          {pendingVerifications.map((verification) => (
            <Card key={verification.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {verification.name || verification.property}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {verification.type === "host" 
                        ? `${verification.email} • ${verification.property}`
                        : `Host: ${verification.host} • ${verification.location}`
                      }
                    </p>
                    <p className="text-xs text-gray-400">
                      Submitted {verification.submittedDate} • Status: {verification.status.replace('_', ' ')}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                    <XCircle className="w-4 h-4 mr-1" />
                    Reject
                  </Button>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Approve
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Active Disputes */}
      <div>
        <SectionHeader
          title="Active Disputes"
          subtitle="User conflicts requiring admin intervention"
          action={
            <Badge variant="destructive">
              {activeDisputes.length} active
            </Badge>
          }
        />
        <div className="space-y-3">
          {activeDisputes.map((dispute) => (
            <Card key={dispute.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-100 to-pink-100 rounded-xl flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900">{dispute.issue}</h4>
                      <Badge
                        variant={dispute.priority === "high" ? "destructive" : "secondary"}
                        className="text-xs"
                      >
                        {dispute.priority} priority
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">
                      {dispute.complainant} vs {dispute.respondent}
                    </p>
                    <p className="text-xs text-gray-400">
                      Amount: {dispute.amount} • Submitted {dispute.submittedDate}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <FileText className="w-4 h-4 mr-1" />
                    Review
                  </Button>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Eye className="w-4 h-4 mr-1" />
                    Resolve
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Top Performing Spaces */}
      <div>
        <SectionHeader
          title="Top Performing Spaces"
          subtitle="Highest earning and rated parking spaces"
          action={
            <Button variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              Full Report
            </Button>
          }
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {topPerformingSpaces.map((space, index) => (
            <Card key={space.id} className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center font-bold text-purple-600">
                  #{index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">{space.name}</h4>
                  <p className="text-sm text-gray-500 mb-3">Host: {space.host}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Occupancy</span>
                      <span className="font-medium">{space.occupancy}%</span>
                    </div>
                    <Progress value={space.occupancy} className="h-2" />
                    
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div>
                        <div className="text-xs text-gray-500">Monthly Revenue</div>
                        <div className="font-semibold text-green-600">${space.monthlyRevenue}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Rating</div>
                        <div className="font-semibold">{space.rating}/5.0</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}