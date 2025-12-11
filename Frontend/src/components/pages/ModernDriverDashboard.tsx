import {
  Search,
  MapPin,
  Clock,
  Star,
  Heart,
  Filter,
  Car,
  Navigation,
  Calendar,
  CreditCard,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { StatsCard, QuickActionCard, SectionHeader } from "../ui/modern-main-layout";
import { ParkingAvailabilityIndicator } from "../ui/status-indicator";

interface ModernDriverDashboardProps {
  onNavigate: (page: string) => void;
}

export function ModernDriverDashboard({ onNavigate }: ModernDriverDashboardProps) {
  const parkingSpots = [
    {
      id: 1,
      name: "Central Plaza Parking",
      distance: "0.2 miles",
      price: "$2.50/hour",
      rating: 4.8,
      available: 12,
      type: "Garage",
      image: "/api/placeholder/300/200",
    },
    {
      id: 2,
      name: "Downtown Garage",
      distance: "0.4 miles", 
      price: "$3.00/hour",
      rating: 4.6,
      available: 8,
      type: "Covered",
      image: "/api/placeholder/300/200",
    },
    {
      id: 3,
      name: "Mall Parking",
      distance: "0.6 miles",
      price: "$1.50/hour",
      rating: 4.5,
      available: 25,
      type: "Open Lot",
      image: "/api/placeholder/300/200",
    },
  ];

  const recentBookings = [
    {
      id: 1,
      location: "Central Plaza",
      date: "Today, 2:00 PM",
      duration: "2 hours",
      amount: "$5.00",
      status: "active",
    },
    {
      id: 2,
      location: "Mall Parking",
      date: "Yesterday",
      duration: "1 hour",
      amount: "$1.50",
      status: "completed",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
          <p className="text-purple-100 mb-6">
            Find and book parking spots with ease. Your personalized driver dashboard is ready.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="font-medium">Active Booking</span>
              </div>
              <span className="text-sm text-purple-100">Central Plaza - 45 min left</span>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="font-medium">Available Nearby</span>
              </div>
              <span className="text-sm text-purple-100">2,847 spaces found</span>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="font-medium">Total Savings</span>
              </div>
              <span className="text-sm text-purple-100">$127 this month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <Card className="p-6">
        <SectionHeader
          title="Find Parking"
          subtitle="Search for available parking spots near your destination"
        />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Enter destination or address..."
                className="pl-12 h-12 text-base border-gray-200 focus:border-purple-500"
              />
            </div>
          </div>
          <Button
            size="lg"
            className="h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <Search className="w-5 h-5 mr-2" />
            Search
          </Button>
        </div>
        
        {/* Quick Filters */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          <Badge variant="secondary" className="bg-purple-100 text-purple-700 whitespace-nowrap">
            Nearest
          </Badge>
          <Badge variant="outline" className="whitespace-nowrap">
            Cheapest
          </Badge>
          <Badge variant="outline" className="whitespace-nowrap">
            Available Now
          </Badge>
          <Button
            variant="outline"
            size="sm"
            className="whitespace-nowrap"
            onClick={() => onNavigate("filters")}
          >
            <Filter className="w-4 h-4 mr-1" />
            More Filters
          </Button>
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Active Bookings"
          value="1"
          change="+1 today"
          changeType="positive"
          icon={<Car className="w-6 h-6" />}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <StatsCard
          title="Total Bookings"
          value="47"
          change="+5 this week"
          changeType="positive"
          icon={<Calendar className="w-6 h-6" />}
          color="bg-gradient-to-br from-green-500 to-green-600"
        />
        <StatsCard
          title="Money Saved"
          value="$127"
          change="+$23 this month"
          changeType="positive"
          icon={<CreditCard className="w-6 h-6" />}
          color="bg-gradient-to-br from-orange-500 to-orange-600"
        />
        <StatsCard
          title="Favorite Spots"
          value="8"
          change="2 new"
          changeType="neutral"
          icon={<Heart className="w-6 h-6" />}
          color="bg-gradient-to-br from-pink-500 to-pink-600"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <SectionHeader
          title="Quick Actions"
          subtitle="Access frequently used features instantly"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <QuickActionCard
            title="Find Nearby Parking"
            description="Search for available spots around your location"
            icon={<MapPin className="w-5 h-5" />}
            onClick={() => onNavigate("map")}
            color="border-purple-200 hover:border-purple-400"
          />
          <QuickActionCard
            title="Reserve for Later"
            description="Schedule parking for future dates and times"
            icon={<Clock className="w-5 h-5" />}
            onClick={() => onNavigate("reserve")}
            color="border-blue-200 hover:border-blue-400"
          />
          <QuickActionCard
            title="Payment Methods"
            description="Manage your payment options and wallets"
            icon={<CreditCard className="w-5 h-5" />}
            onClick={() => onNavigate("payment")}
            color="border-green-200 hover:border-green-400"
          />
        </div>
      </div>

      {/* Available Parking Spots */}
      <div>
        <SectionHeader
          title="Available Spots Near You"
          subtitle="Real-time availability in your area"
          action={
            <Button variant="outline" onClick={() => onNavigate("map")}>
              <MapPin className="w-4 h-4 mr-2" />
              View on Map
            </Button>
          }
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {parkingSpots.map((spot) => (
            <Card key={spot.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative">
                <div className="absolute inset-0 bg-gray-300 rounded-t-lg"></div>
                <div className="absolute top-3 right-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 bg-white/80 hover:bg-white text-gray-600 hover:text-red-500"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{spot.name}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Navigation className="w-3 h-3" />
                        {spot.distance}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span>{spot.rating}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {spot.type}
                  </Badge>
                </div>
                
                <div className="mb-4">
                  <ParkingAvailabilityIndicator
                    available={spot.available}
                    total={spot.available + 5}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xl font-bold text-purple-600">{spot.price}</div>
                    <div className="text-xs text-gray-500">per hour</div>
                  </div>
                  <Button
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <SectionHeader
          title="Recent Bookings"
          subtitle="Your parking history and current reservations"
          action={
            <Button variant="outline" onClick={() => onNavigate("bookings")}>
              View All
            </Button>
          }
        />
        <div className="space-y-3">
          {recentBookings.map((booking) => (
            <Card key={booking.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{booking.location}</h4>
                    <p className="text-sm text-gray-500">{booking.date} • {booking.duration}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{booking.amount}</div>
                  <Badge
                    variant={booking.status === "active" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {booking.status}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}