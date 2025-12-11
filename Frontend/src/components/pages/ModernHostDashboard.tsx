import {
  DollarSign,
  MapPin,
  Plus,
  Calendar,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star,
  Car,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { StatsCard, QuickActionCard, SectionHeader } from "../ui/modern-main-layout";
import { Progress } from "../ui/progress";

interface ModernHostDashboardProps {
  onNavigate: (page: string) => void;
}

export function ModernHostDashboard({ onNavigate }: ModernHostDashboardProps) {
  const mySpaces = [
    {
      id: 1,
      name: "Downtown Garage - Space A1",
      location: "123 Main St, Downtown",
      type: "Covered",
      price: "$3.00/hour",
      occupancyRate: 85,
      totalBookings: 142,
      monthlyEarnings: "$426.00",
      status: "active",
      rating: 4.8,
      image: "/api/placeholder/300/200",
    },
    {
      id: 2,
      name: "Residential Driveway",
      location: "456 Oak Ave, Suburbs",
      type: "Open",
      price: "$2.00/hour",
      occupancyRate: 92,
      totalBookings: 89,
      monthlyEarnings: "$178.00",
      status: "active",
      rating: 4.6,
      image: "/api/placeholder/300/200",
    },
    {
      id: 3,
      name: "Mall Parking - Section B",
      location: "789 Shopping Blvd",
      type: "Garage",
      price: "$1.50/hour",
      occupancyRate: 67,
      totalBookings: 76,
      monthlyEarnings: "$114.00",
      status: "maintenance",
      rating: 4.4,
      image: "/api/placeholder/300/200",
    },
  ];

  const pendingRequests = [
    {
      id: 1,
      driverName: "John D.",
      space: "Downtown Garage - Space A1",
      date: "Today, 2:00 PM",
      duration: "3 hours",
      amount: "$9.00",
      requestTime: "5 min ago",
    },
    {
      id: 2,
      driverName: "Sarah M.",
      space: "Residential Driveway",
      date: "Tomorrow, 9:00 AM",
      duration: "8 hours",
      amount: "$16.00",
      requestTime: "12 min ago",
    },
    {
      id: 3,
      driverName: "Mike R.",
      space: "Downtown Garage - Space A1",
      date: "Dec 15, 4:00 PM",
      duration: "2 hours",
      amount: "$6.00",
      requestTime: "25 min ago",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "booking_completed",
      driver: "Emma W.",
      space: "Downtown Garage",
      amount: "$4.50",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "payment_received",
      driver: "David L.",
      space: "Residential Driveway",
      amount: "$8.00",
      time: "4 hours ago",
    },
    {
      id: 3,
      type: "new_review",
      driver: "Lisa P.",
      space: "Mall Parking",
      rating: 5,
      time: "6 hours ago",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Host Dashboard</h1>
          <p className="text-green-100 mb-6">
            Manage your parking spaces and track your earnings. Your host control center is ready.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span className="font-medium">Active Spaces</span>
              </div>
              <span className="text-sm text-green-100">3 spaces earning</span>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="font-medium">Monthly Revenue</span>
              </div>
              <span className="text-sm text-green-100">$718 earned</span>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="font-medium">Pending Requests</span>
              </div>
              <span className="text-sm text-green-100">5 awaiting approval</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Monthly Earnings"
          value="$718"
          change="+12% from last month"
          changeType="positive"
          icon={<DollarSign className="w-6 h-6" />}
          color="bg-gradient-to-br from-green-500 to-emerald-600"
        />
        <StatsCard
          title="Total Bookings"
          value="307"
          change="+23 this week"
          changeType="positive"
          icon={<Calendar className="w-6 h-6" />}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <StatsCard
          title="Average Rating"
          value="4.7"
          change="85 reviews"
          changeType="neutral"
          icon={<Star className="w-6 h-6" />}
          color="bg-gradient-to-br from-yellow-500 to-orange-500"
        />
        <StatsCard
          title="Occupancy Rate"
          value="81%"
          change="+5% this month"
          changeType="positive"
          icon={<TrendingUp className="w-6 h-6" />}
          color="bg-gradient-to-br from-purple-500 to-purple-600"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <SectionHeader
          title="Quick Actions"
          subtitle="Manage your hosting business efficiently"
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <QuickActionCard
            title="Add New Space"
            description="List a new parking space for rent"
            icon={<Plus className="w-5 h-5" />}
            onClick={() => onNavigate("add-space")}
            color="border-green-200 hover:border-green-400"
            badge="Popular"
          />
          <QuickActionCard
            title="View Earnings"
            description="Track your income and payouts"
            icon={<DollarSign className="w-5 h-5" />}
            onClick={() => onNavigate("earnings")}
            color="border-blue-200 hover:border-blue-400"
          />
          <QuickActionCard
            title="Manage Bookings"
            description="Approve or decline requests"
            icon={<Calendar className="w-5 h-5" />}
            onClick={() => onNavigate("bookings-manage")}
            color="border-purple-200 hover:border-purple-400"
            badge={`${pendingRequests.length} pending`}
          />
        </div>
      </div>

      {/* Pending Requests */}
      <div>
        <SectionHeader
          title="Pending Booking Requests"
          subtitle="Review and respond to driver requests"
          action={
            <Badge variant="secondary" className="bg-orange-100 text-orange-700">
              {pendingRequests.length} pending
            </Badge>
          }
        />
        <div className="space-y-3">
          {pendingRequests.map((request) => (
            <Card key={request.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{request.driverName}</h4>
                    <p className="text-sm text-gray-500">{request.space}</p>
                    <p className="text-xs text-gray-400">
                      {request.date} • {request.duration} • Requested {request.requestTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{request.amount}</div>
                    <div className="text-xs text-gray-500">{request.duration}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                      <XCircle className="w-4 h-4 mr-1" />
                      Decline
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* My Parking Spaces */}
      <div>
        <SectionHeader
          title="My Parking Spaces"
          subtitle="Overview of your listed spaces and their performance"
          action={
            <Button onClick={() => onNavigate("add-space")}>
              <Plus className="w-4 h-4 mr-2" />
              Add Space
            </Button>
          }
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {mySpaces.map((space) => (
            <Card key={space.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative">
                <div className="absolute inset-0 bg-gray-300 rounded-t-lg"></div>
                <div className="absolute top-3 left-3">
                  <Badge
                    variant={space.status === "active" ? "default" : "secondary"}
                    className={
                      space.status === "active"
                        ? "bg-green-600"
                        : space.status === "maintenance"
                        ? "bg-orange-500"
                        : "bg-gray-500"
                    }
                  >
                    {space.status}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <div className="bg-black/50 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    {space.rating}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="mb-3">
                  <h3 className="font-semibold text-gray-900 mb-1">{space.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{space.location}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {space.type}
                    </Badge>
                    <span className="font-semibold text-purple-600">{space.price}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Occupancy Rate</span>
                      <span className="font-medium">{space.occupancyRate}%</span>
                    </div>
                    <Progress value={space.occupancyRate} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">Monthly Earnings</div>
                      <div className="font-semibold text-green-600">{space.monthlyEarnings}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Total Bookings</div>
                      <div className="font-semibold">{space.totalBookings}</div>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Manage Space
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <SectionHeader
          title="Recent Activity"
          subtitle="Latest updates from your parking spaces"
          action={
            <Button variant="outline">
              View All
            </Button>
          }
        />
        <div className="space-y-3">
          {recentActivity.map((activity) => {
            const getActivityIcon = () => {
              switch (activity.type) {
                case "booking_completed":
                  return <CheckCircle className="w-5 h-5 text-green-600" />;
                case "payment_received":
                  return <DollarSign className="w-5 h-5 text-blue-600" />;
                case "new_review":
                  return <Star className="w-5 h-5 text-yellow-500" />;
                default:
                  return <AlertCircle className="w-5 h-5 text-gray-500" />;
              }
            };

            const getActivityText = () => {
              switch (activity.type) {
                case "booking_completed":
                  return `${activity.driver} completed booking at ${activity.space}`;
                case "payment_received":
                  return `Payment of ${activity.amount} received from ${activity.driver}`;
                case "new_review":
                  return `${activity.driver} left a ${activity.rating}-star review for ${activity.space}`;
                default:
                  return "Unknown activity";
              }
            };

            return (
              <Card key={activity.id} className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                    {getActivityIcon()}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{getActivityText()}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  {activity.amount && (
                    <div className="font-semibold text-green-600">{activity.amount}</div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}