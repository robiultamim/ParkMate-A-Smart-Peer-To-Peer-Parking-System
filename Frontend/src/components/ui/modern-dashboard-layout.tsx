import { ReactNode } from "react";
import {
  Search,
  MapPin,
  Clock,
  Star,
  User,
  Heart,
  Settings,
  Filter,
  CreditCard,
  Timer,
  Shield,
  Users,
  DollarSign,
  Plus,
  Car,
  ArrowRight,
  TrendingUp,
  Calendar,
  Bell,
  BarChart3,
  PieChart,
  Activity,
  Wallet,
  Building,
  AlertCircle,
  CheckCircle,
  Home,
  Navigation,
  Zap,
  Target,
} from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { Badge } from "./badge";
import { Input } from "./input";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { useAuth } from "../../contexts/AuthContext";
import { ParkMateLogo } from "./parkmate-logo";

// ... existing imports

interface DashboardLayoutProps {
  userRole: "driver" | "host" | "admin";
  onNavigate: (page: string) => void;
  children?: ReactNode;
}

export function ModernDashboardLayout({ userRole, onNavigate, children }: DashboardLayoutProps) {
  const { profile, user } = useAuth(); // Get real user data

  const getRoleTheme = (role: string) => {
    switch (role) {
      case "driver":
        return {
          gradient: "from-blue-600 via-purple-600 to-indigo-700",
          accent: "bg-blue-500",
          bg: "from-blue-50 to-indigo-50"
        };
      case "host":
        return {
          gradient: "from-emerald-600 via-teal-600 to-green-700",
          accent: "bg-emerald-500",
          bg: "from-emerald-50 to-teal-50"
        };
      case "admin":
        return {
          gradient: "from-purple-600 via-indigo-600 to-violet-700",
          accent: "bg-purple-500",
          bg: "from-purple-50 to-indigo-50"
        };
      default:
        return {
          gradient: "from-gray-600 via-slate-600 to-gray-700",
          accent: "bg-gray-500",
          bg: "from-gray-50 to-slate-50"
        };
    }
  };

  const getUserInfo = () => {
    // Fallback logic
    const fallbackName = user?.email?.split('@')[0] || (userRole === 'host' ? 'Host' : 'Driver');
    const displayName = profile?.first_name ? profile.first_name : fallbackName;
    const displayFullName = profile ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() : fallbackName;

    // Default Object structure to ensure we always return something matching the shape
    const defaultStats = {
      name: displayFullName,
      greeting: `Welcome back!`,
      subtitle: "",
      tagline: "",
      primaryColor: "blue",
      stats: [] as any[]
    };

    switch (userRole) {
      case "driver":
        return {
          name: displayFullName || "John Driver",
          greeting: `Welcome back, ${displayName}!`,
          subtitle: "Find your perfect parking spot",
          tagline: "Your parking companion for stress-free journeys",
          primaryColor: "blue",
          stats: [
            {
              label: "Total Bookings",
              value: "45",
              change: "+5 this month",
              color: "blue",
              icon: <Car className="w-5 h-5" />,
              trend: "up"
            },
            {
              label: "Money Saved",
              value: "$267",
              change: "+12% vs last month",
              color: "green",
              icon: <Wallet className="w-5 h-5" />,
              trend: "up"
            },
            {
              label: "Favorite Spots",
              value: "8",
              change: "2 new favorites",
              color: "purple",
              icon: <Heart className="w-5 h-5" />,
              trend: "up"
            },
          ],
        };
      case "host":
        return {
          name: displayFullName || "Sarah Host",
          greeting: `Welcome back, ${displayName}!`,
          subtitle: "Manage your parking spaces",
          tagline: "Transform your space into steady income",
          primaryColor: "green",
          stats: [
            {
              label: "Monthly Earnings",
              value: "$2,847",
              change: "+23% this month",
              color: "green",
              icon: <DollarSign className="w-5 h-5" />,
              trend: "up"
            },
            {
              label: "Active Spaces",
              value: "3",
              change: "All verified",
              color: "blue",
              icon: <Building className="w-5 h-5" />,
              trend: "neutral"
            },
            {
              label: "Booking Rate",
              value: "89%",
              change: "+5% improvement",
              color: "purple",
              icon: <TrendingUp className="w-5 h-5" />,
              trend: "up"
            },
          ],
        };
      case "admin":
        return {
          name: displayFullName || "Admin User",
          greeting: `Welcome back, ${displayName}!`,
          subtitle: "Platform overview and management",
          tagline: "Overseeing the future of smart parking",
          primaryColor: "purple",
          stats: [
            {
              label: "Total Users",
              value: "18,542",
              change: "+347 this week",
              color: "blue",
              icon: <Users className="w-5 h-5" />,
              trend: "up"
            },
            {
              label: "Daily Revenue",
              value: "$15,234",
              change: "+8.2% vs yesterday",
              color: "green",
              icon: <BarChart3 className="w-5 h-5" />,
              trend: "up"
            },
            {
              label: "Active Issues",
              value: "3",
              change: "2 resolved today",
              color: "orange",
              icon: <AlertCircle className="w-5 h-5" />,
              trend: "down"
            },
          ],
        };
      default:
        return defaultStats;
    }
  };

  const getQuickActions = () => {
    switch (userRole) {
      case "driver":
        return [
          {
            icon: <Search className="w-6 h-6" />,
            title: "Find Parking",
            description: "Search nearby spaces",
            color: "bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
            textColor: "text-white",
            action: () => onNavigate("map"),
            category: "primary"
          },
          {
            icon: <Navigation className="w-6 h-6" />,
            title: "Navigate",
            description: "GPS to your spot",
            color: "bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
            textColor: "text-white",
            action: () => onNavigate("gps-navigation"),
            category: "primary"
          },
          {
            icon: <Clock className="w-6 h-6" />,
            title: "Reserve Later",
            description: "Schedule parking",
            color: "bg-gradient-to-br from-indigo-400 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600",
            textColor: "text-white",
            action: () => onNavigate("bookings"),
            category: "secondary"
          },
          {
            icon: <Star className="w-6 h-6" />,
            title: "Favorites",
            description: "Your saved spots",
            color: "bg-gradient-to-br from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600",
            textColor: "text-white",
            action: () => onNavigate("profile"),
            category: "secondary"
          },
          {
            icon: <CreditCard className="w-6 h-6" />,
            title: "Payments",
            description: "Wallet & cards",
            color: "bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700",
            textColor: "text-white",
            action: () => onNavigate("payment"),
            category: "secondary"
          },
          {
            icon: <Activity className="w-6 h-6" />,
            title: "History",
            description: "Past bookings",
            color: "bg-gradient-to-br from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600",
            textColor: "text-white",
            action: () => onNavigate("bookings"),
            category: "secondary"
          },
        ];
      case "host":
        return [
          {
            icon: <Plus className="w-6 h-6" />,
            title: "Add Space",
            description: "List new parking",
            color: "bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700",
            textColor: "text-white",
            action: () => onNavigate("add-space"),
            category: "primary"
          },
          {
            icon: <DollarSign className="w-6 h-6" />,
            title: "Earnings",
            description: "View income",
            color: "bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
            textColor: "text-white",
            action: () => onNavigate("earnings"),
            category: "primary"
          },
          {
            icon: <Calendar className="w-6 h-6" />,
            title: "Bookings",
            description: "Manage requests",
            color: "bg-gradient-to-br from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700",
            textColor: "text-white",
            action: () => onNavigate("bookings-manage"),
            category: "primary"
          },
          {
            icon: <Building className="w-6 h-6" />,
            title: "My Spaces",
            description: "Manage properties",
            color: "bg-gradient-to-br from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600",
            textColor: "text-white",
            action: () => onNavigate("host-dashboard"),
            category: "secondary"
          },
          {
            icon: <BarChart3 className="w-6 h-6" />,
            title: "Analytics",
            description: "Performance data",
            color: "bg-gradient-to-br from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600",
            textColor: "text-white",
            action: () => onNavigate("earnings"),
            category: "secondary"
          },
        ];
      case "admin":
        return [
          {
            icon: <Users className="w-6 h-6" />,
            title: "User Management",
            description: "Manage accounts",
            color: "bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
            textColor: "text-white",
            action: () => onNavigate("users"),
            category: "primary"
          },
          {
            icon: <Shield className="w-6 h-6" />,
            title: "Verification",
            description: "Review requests",
            color: "bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
            textColor: "text-white",
            action: () => onNavigate("admin"),
            category: "primary"
          },
          {
            icon: <TrendingUp className="w-6 h-6" />,
            title: "Analytics",
            description: "Platform metrics",
            color: "bg-gradient-to-br from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700",
            textColor: "text-white",
            action: () => onNavigate("admin"),
            category: "primary"
          },
          {
            icon: <PieChart className="w-6 h-6" />,
            title: "Reports",
            description: "Generate reports",
            color: "bg-gradient-to-br from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600",
            textColor: "text-white",
            action: () => onNavigate("admin"),
            category: "secondary"
          },
          {
            icon: <Settings className="w-6 h-6" />,
            title: "System Config",
            description: "Platform settings",
            color: "bg-gradient-to-br from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700",
            textColor: "text-white",
            action: () => onNavigate("settings"),
            category: "secondary"
          },
          {
            icon: <AlertCircle className="w-6 h-6" />,
            title: "Support",
            description: "Handle disputes",
            color: "bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700",
            textColor: "text-white",
            action: () => onNavigate("help"),
            category: "secondary"
          },
        ];
    }
  };

  const userInfo = getUserInfo();
  const quickActions = getQuickActions();
  const theme = getRoleTheme(userRole);

  const getStatColor = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-gradient-to-br from-blue-50 to-blue-100 text-blue-800 border-blue-200 hover:from-blue-100 hover:to-blue-150";
      case "green":
        return "bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-800 border-emerald-200 hover:from-emerald-100 hover:to-emerald-150";
      case "purple":
        return "bg-gradient-to-br from-purple-50 to-purple-100 text-purple-800 border-purple-200 hover:from-purple-100 hover:to-purple-150";
      case "red":
        return "bg-gradient-to-br from-red-50 to-red-100 text-red-800 border-red-200 hover:from-red-100 hover:to-red-150";
      case "orange":
        return "bg-gradient-to-br from-amber-50 to-amber-100 text-amber-800 border-amber-200 hover:from-amber-100 hover:to-amber-150";
      default:
        return "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 border-gray-200 hover:from-gray-100 hover:to-gray-150";
    }
  };

  return (
    <div className={`min-h-[calc(100vh-4rem)] bg-gradient-to-br ${theme.bg}`}>
      <div className="max-w-7xl mx-auto p-6">
        <div className="w-full space-y-8">
          {/* Welcome Header */}
          <div className="text-center space-y-6 py-8">
            <div className="flex items-center justify-center mb-8">
              <div className={`relative w-20 h-20 bg-gradient-to-r ${theme.gradient} rounded-full flex items-center justify-center shadow-xl animate-float`}>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
                {userRole === "driver" && <Car className="w-10 h-10 text-white drop-shadow-lg" />}
                {userRole === "host" && <Building className="w-10 h-10 text-white drop-shadow-lg" />}
                {userRole === "admin" && <Shield className="w-10 h-10 text-white drop-shadow-lg" />}
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-4 border-white flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent animate-slide-in-up">
                {userInfo.greeting}
              </h1>
              <p className="text-xl text-gray-600 animate-slide-in-up stagger-1 font-medium">
                {userInfo.subtitle}
              </p>
              <p className="text-base text-gray-500 animate-slide-in-up stagger-2 max-w-2xl mx-auto">
                {userInfo.tagline}
              </p>
            </div>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {userInfo.stats.map((stat, index) => (
              <Card
                key={index}
                className={`
                  relative p-6 hover:shadow-2xl transition-all duration-500 animate-slide-in-up border-0 overflow-hidden
                  ${getStatColor(stat.color)} hover:scale-105 cursor-pointer group
                `}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${theme.accent} bg-opacity-10`}>
                      {stat.icon}
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${stat.trend === 'up' ? 'bg-green-100 text-green-800' :
                      stat.trend === 'down' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                      {stat.trend === 'up' ? '↗' : stat.trend === 'down' ? '↘' : '→'} {stat.change.split(' ')[0]}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold opacity-75 uppercase tracking-wide">{stat.label}</p>
                    <p className="text-4xl font-bold leading-none">{stat.value}</p>
                    <p className="text-sm opacity-70 font-medium">{stat.change}</p>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
              </Card>
            ))}
          </div>

          {/* Enhanced Search Section (for drivers) */}
          {userRole === "driver" && (
            <Card className="p-8 animate-fade-in bg-gradient-to-br from-white to-blue-50 border-2 border-blue-100 shadow-xl">
              <div className="text-center space-y-8">
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <Zap className="w-6 h-6 text-blue-500" />
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Smart Parking Search
                    </h2>
                  </div>
                  <p className="text-gray-600">Find, reserve, and navigate to your perfect spot in seconds</p>
                </div>
                <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
                  <div className="flex-1 relative group">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-blue-400 group-focus-within:text-blue-600 transition-colors" />
                    <Input
                      placeholder="Enter destination, address, or landmark..."
                      className="pl-14 h-16 text-lg border-2 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 rounded-2xl bg-white shadow-lg"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <Target className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  <Button
                    size="lg"
                    className={`h-16 px-10 bg-gradient-to-r ${theme.gradient} hover:scale-105 text-lg font-semibold shadow-xl rounded-2xl transition-all duration-300 hover:shadow-2xl`}
                    onClick={() => onNavigate("map")}
                  >
                    <Search className="w-6 h-6 mr-3" />
                    Find Parking
                  </Button>
                </div>
                <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Real-time availability</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Instant booking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Navigation className="w-4 h-4" />
                    <span>GPS navigation</span>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Enhanced Quick Actions */}
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Quick Actions</h2>
              <p className="text-gray-600 text-lg">Access your most used features with one click</p>
            </div>

            {/* Primary Actions */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${theme.accent}`}></div>
                Primary Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {quickActions.filter(action => action.category === "primary").map((action, index) => (
                  <Card
                    key={index}
                    className="group cursor-pointer transition-all duration-500 hover:shadow-2xl border-0 bg-white overflow-hidden animate-scale-in hover:scale-105"
                    style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
                    onClick={action.action}
                  >
                    <div className="p-8 space-y-6 text-center relative">
                      <div className={`w-20 h-20 ${action.color} rounded-3xl flex items-center justify-center mx-auto ${action.textColor} group-hover:scale-110 transition-all duration-300 shadow-xl`}>
                        {action.icon}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"></div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-bold text-gray-900 text-xl group-hover:text-gray-700 transition-colors">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-600 font-medium">{action.description}</p>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent group-hover:via-gray-400 transition-all duration-300"></div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Secondary Actions */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                Additional Tools
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
                {quickActions.filter(action => action.category === "secondary").map((action, index) => (
                  <Card
                    key={index}
                    className="group cursor-pointer transition-all duration-300 hover:shadow-lg border border-gray-100 bg-white hover:bg-gray-50 animate-scale-in"
                    style={{ animationDelay: `${index * 0.05 + 0.6}s` }}
                    onClick={action.action}
                  >
                    <div className="p-4 space-y-3 text-center">
                      <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mx-auto ${action.textColor} group-hover:scale-110 transition-transform duration-300`}>
                        {action.icon}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-semibold text-gray-900 text-sm">
                          {action.title}
                        </h4>
                        <p className="text-xs text-gray-600">{action.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Recent Activity */}
          <Card className="p-8 animate-fade-in bg-white shadow-xl border-0">
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-gray-900">Recent Activity</h2>
                <p className="text-gray-600">Stay updated with your latest actions</p>
              </div>
              <Button
                variant="outline"
                className={`text-${userInfo.primaryColor}-600 hover:bg-${userInfo.primaryColor}-50 border-2 font-semibold px-6 py-2 rounded-xl hover:scale-105 transition-all duration-300`}
              >
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((_, index) => {
                const activities = {
                  driver: [
                    { icon: <CheckCircle className="w-5 h-5" />, title: "Parking spot booked successfully", desc: "Downtown Plaza - Space A7", time: "2 minutes ago", color: "green" },
                    { icon: <Navigation className="w-5 h-5" />, title: "Navigation started", desc: "Route to City Center Mall", time: "1 hour ago", color: "blue" },
                    { icon: <CreditCard className="w-5 h-5" />, title: "Payment completed", desc: "$12.50 for 3 hours", time: "3 hours ago", color: "purple" }
                  ],
                  host: [
                    { icon: <Calendar className="w-5 h-5" />, title: "New booking request", desc: "Sarah Johnson - Tomorrow 9:00 AM", time: "2 minutes ago", color: "blue" },
                    { icon: <DollarSign className="w-5 h-5" />, title: "Payment received", desc: "$24.00 from recent booking", time: "1 hour ago", color: "green" },
                    { icon: <Building className="w-5 h-5" />, title: "Space verified", desc: "Parking Space #3 approved", time: "3 hours ago", color: "purple" }
                  ],
                  admin: [
                    { icon: <Shield className="w-5 h-5" />, title: "User verification completed", desc: "5 new hosts approved", time: "2 minutes ago", color: "green" },
                    { icon: <AlertCircle className="w-5 h-5" />, title: "Dispute resolved", desc: "Refund issued to customer", time: "1 hour ago", color: "orange" },
                    { icon: <Users className="w-5 h-5" />, title: "System report generated", desc: "Weekly analytics report", time: "3 hours ago", color: "blue" }
                  ]
                };

                const activity = activities[userRole][index];

                return (
                  <div
                    key={index}
                    className="group p-5 bg-gradient-to-r from-gray-50 to-white rounded-xl hover:from-gray-100 hover:to-gray-50 transition-all duration-300 border border-gray-100 hover:border-gray-200 hover:scale-102 cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${activity.color === 'green' ? 'bg-emerald-100 text-emerald-600' :
                        activity.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                          activity.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                            activity.color === 'orange' ? 'bg-amber-100 text-amber-600' :
                              'bg-gray-100 text-gray-600'
                        } rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        {activity.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-base group-hover:text-gray-700 transition-colors">
                          {activity.title}
                        </p>
                        <p className="text-sm text-gray-600 font-medium mt-1">{activity.desc}</p>
                        <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {activity.time}
                        </p>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {children}
        </div>
      </div>
    </div>
  );
}