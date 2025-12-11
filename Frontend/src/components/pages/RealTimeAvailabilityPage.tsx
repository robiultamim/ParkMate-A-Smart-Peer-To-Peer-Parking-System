import { useState, useEffect } from "react";
import {
  MapPin,
  Clock,
  Activity,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  RefreshCw,
  Car,
  Timer,
  Calendar,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export function RealTimeAvailabilityPage() {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLive, setIsLive] = useState(true);

  // Mock real-time data
  const [parkingData, setParkingData] = useState([
    {
      id: 1,
      name: "Central Plaza Garage",
      location: "Downtown",
      available: 47,
      total: 120,
      trend: "stable",
      lastChanged: "2 min ago",
      price: 2.5,
      status: "operational",
      peakTime: "2:00 PM - 4:00 PM",
      estimatedFull: "3:30 PM",
    },
    {
      id: 2,
      name: "Business District Lot",
      location: "Financial District",
      available: 12,
      total: 80,
      trend: "decreasing",
      lastChanged: "30 sec ago",
      price: 3.0,
      status: "operational",
      peakTime: "9:00 AM - 11:00 AM",
      estimatedFull: "12:30 PM",
    },
    {
      id: 3,
      name: "Mall Parking Complex",
      location: "Shopping Center",
      available: 89,
      total: 200,
      trend: "increasing",
      lastChanged: "1 min ago",
      price: 1.5,
      status: "operational",
      peakTime: "6:00 PM - 8:00 PM",
      estimatedFull: null,
    },
    {
      id: 4,
      name: "Airport Terminal A",
      location: "Airport",
      available: 0,
      total: 150,
      trend: "stable",
      lastChanged: "5 min ago",
      price: 4.0,
      status: "full",
      peakTime: "All day",
      estimatedFull: "Full",
    },
    {
      id: 5,
      name: "Stadium Parking",
      location: "Sports Complex",
      available: 0,
      total: 300,
      trend: "stable",
      lastChanged: "10 min ago",
      price: 5.0,
      status: "maintenance",
      peakTime: "Event days",
      estimatedFull: "Maintenance",
    },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setParkingData(prev => prev.map(spot => {
        // Random availability changes for simulation
        const changeChance = Math.random();
        if (changeChance < 0.3) { // 30% chance of change
          const maxChange = Math.floor(spot.total * 0.1); // Max 10% change
          const change = Math.floor(Math.random() * maxChange * 2) - maxChange;
          const newAvailable = Math.max(0, Math.min(spot.total, spot.available + change));
          
          return {
            ...spot,
            available: newAvailable,
            lastChanged: "Just now",
            trend: change > 0 ? "increasing" : change < 0 ? "decreasing" : "stable",
          };
        }
        return spot;
      }));
      setLastUpdated(new Date());
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [isLive]);

  const getAvailabilityPercentage = (available: number, total: number) => {
    return Math.round((available / total) * 100);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-100 text-green-800";
      case "full":
        return "bg-red-100 text-red-800";
      case "maintenance":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing":
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "decreasing":
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage > 60) return "bg-green-500";
    if (percentage > 30) return "bg-orange-500";
    return "bg-red-500";
  };

  const totalSpaces = parkingData.reduce((acc, spot) => acc + spot.total, 0);
  const totalAvailable = parkingData.reduce((acc, spot) => acc + spot.available, 0);
  const overallAvailability = Math.round((totalAvailable / totalSpaces) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">Real-Time Availability</h1>
              <p className="text-blue-100">
                Live parking availability across the city
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-blue-100">Last Updated</div>
                <div className="font-medium">
                  {lastUpdated.toLocaleTimeString()}
                </div>
              </div>
              <Button
                variant={isLive ? "secondary" : "outline"}
                size="sm"
                onClick={() => setIsLive(!isLive)}
                className={isLive ? "bg-white text-blue-600" : "border-white text-white hover:bg-white hover:text-blue-600"}
              >
                <Activity className={`w-4 h-4 mr-2 ${isLive ? "animate-pulse" : ""}`} />
                {isLive ? "Live" : "Paused"}
              </Button>
            </div>
          </div>

          {/* Overall Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Car className="w-5 h-5" />
                <span className="font-medium">Total Spaces</span>
              </div>
              <div className="text-2xl font-bold">{totalSpaces.toLocaleString()}</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Available Now</span>
              </div>
              <div className="text-2xl font-bold">{totalAvailable.toLocaleString()}</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-5 h-5" />
                <span className="font-medium">Availability Rate</span>
              </div>
              <div className="text-2xl font-bold">{overallAvailability}%</div>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Real-time Parking Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {parkingData.map((spot) => {
              const percentage = getAvailabilityPercentage(spot.available, spot.total);
              
              return (
                <Card key={spot.id} className="p-6 hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{spot.name}</h3>
                        <Badge className={getStatusColor(spot.status)} variant="secondary">
                          {spot.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 flex items-center gap-1 mb-3">
                        <MapPin className="w-3 h-3" />
                        {spot.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">
                        {spot.available}
                      </div>
                      <div className="text-sm text-gray-500">of {spot.total}</div>
                    </div>
                  </div>

                  {/* Availability Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Availability</span>
                      <span className="font-medium">{percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(percentage)}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600 mb-1">Trend</div>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(spot.trend)}
                        <span className="capitalize">{spot.trend}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">Last Update</div>
                      <div className="font-medium">{spot.lastChanged}</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">Price/Hour</div>
                      <div className="font-medium">${spot.price}</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">Peak Time</div>
                      <div className="font-medium text-xs">{spot.peakTime}</div>
                    </div>
                  </div>

                  {spot.estimatedFull && spot.estimatedFull !== "Full" && spot.estimatedFull !== "Maintenance" && (
                    <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                      <div className="flex items-center gap-2 text-orange-700">
                        <Timer className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          Estimated full by {spot.estimatedFull}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600"
                      disabled={spot.status !== "operational" || spot.available === 0}
                    >
                      <Car className="w-4 h-4 mr-2" />
                      Reserve Now
                    </Button>
                    <Button variant="outline" size="sm">
                      <MapPin className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6 border-orange-200 bg-orange-50">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-600 mt-1" />
                <div>
                  <h4 className="font-medium text-orange-900 mb-1">
                    High Demand Alert
                  </h4>
                  <p className="text-sm text-orange-700 mb-3">
                    Business District Lot is filling up quickly. Only 12 spots remaining.
                  </p>
                  <Badge className="bg-orange-100 text-orange-800">
                    15% availability
                  </Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-red-200 bg-red-50">
              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-600 mt-1" />
                <div>
                  <h4 className="font-medium text-red-900 mb-1">
                    Full Capacity
                  </h4>
                  <p className="text-sm text-red-700 mb-3">
                    Airport Terminal A is completely full. Consider alternative options.
                  </p>
                  <Badge className="bg-red-100 text-red-800">
                    0% availability
                  </Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-orange-200 bg-orange-50">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-600 mt-1" />
                <div>
                  <h4 className="font-medium text-orange-900 mb-1">
                    Maintenance Notice
                  </h4>
                  <p className="text-sm text-orange-700 mb-3">
                    Stadium Parking is temporarily closed for maintenance. Reopens tomorrow.
                  </p>
                  <Badge className="bg-orange-100 text-orange-800">
                    Closed
                  </Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-green-200 bg-green-50">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h4 className="font-medium text-green-900 mb-1">
                    Good Availability
                  </h4>
                  <p className="text-sm text-green-700 mb-3">
                    Mall Parking Complex has plenty of spaces available.
                  </p>
                  <Badge className="bg-green-100 text-green-800">
                    45% availability
                  </Badge>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Availability Predictions
            </h3>
            
            <div className="space-y-6">
              {parkingData.slice(0, 3).map((spot) => (
                <div key={spot.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">{spot.name}</h4>
                    <Badge variant="outline">{spot.location}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm text-blue-600 mb-1">Next Hour</div>
                      <div className="text-lg font-semibold text-blue-700">
                        {Math.max(0, spot.available - Math.floor(Math.random() * 10))}
                      </div>
                      <div className="text-xs text-blue-500">spaces</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-sm text-purple-600 mb-1">Peak Hours</div>
                      <div className="text-lg font-semibold text-purple-700">
                        {Math.max(0, Math.floor(spot.available * 0.3))}
                      </div>
                      <div className="text-xs text-purple-500">spaces</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-sm text-green-600 mb-1">Off-Peak</div>
                      <div className="text-lg font-semibold text-green-700">
                        {Math.min(spot.total, Math.floor(spot.available * 1.5))}
                      </div>
                      <div className="text-xs text-green-500">spaces</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}