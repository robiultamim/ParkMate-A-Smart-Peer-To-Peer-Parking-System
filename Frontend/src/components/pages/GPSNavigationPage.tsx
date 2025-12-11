import React, { useState, useEffect } from "react";
import {
  Navigation,
  MapPin,
  Clock,
  Route,
  Car,
  AlertTriangle,
  Volume2,
  VolumeX,
  RotateCcw,
  Phone,
  Share2,
  Zap,
  Construction,
  ArrowUp,
  ArrowRight,
  ArrowLeft,
  ArrowDown,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export function GPSNavigationPage() {
  const [isNavigating, setIsNavigating] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [remainingTime, setRemainingTime] = useState(8 * 60); // 8 minutes in seconds

  // Mock navigation data
  const destination = {
    name: "Central Plaza Garage",
    address: "123 Main St, Downtown",
    spots: 12,
    price: "$2.50/hour",
  };

  const navigationSteps = [
    {
      instruction: "Head northeast on Oak Street toward Main Street",
      distance: "0.3 mi",
      duration: "1 min",
      direction: "straight",
      icon: ArrowUp,
    },
    {
      instruction: "Turn right onto Main Street",
      distance: "0.5 mi",
      duration: "2 min",
      direction: "right",
      icon: ArrowRight,
    },
    {
      instruction: "Continue on Main Street for 3 blocks",
      distance: "0.8 mi",
      duration: "3 min",
      direction: "straight",
      icon: ArrowUp,
    },
    {
      instruction: "Turn left into Central Plaza Garage entrance",
      distance: "0.1 mi",
      duration: "1 min",
      direction: "left",
      icon: ArrowLeft,
    },
    {
      instruction: "Arrive at Central Plaza Garage",
      distance: "0.0 mi",
      duration: "0 min",
      direction: "arrive",
      icon: MapPin,
    },
  ];

  const alternativeRoutes = [
    {
      id: 1,
      name: "Fastest Route",
      duration: "8 min",
      distance: "1.7 mi",
      traffic: "light",
      isCurrent: true,
    },
    {
      id: 2,
      name: "Avoid Traffic",
      duration: "12 min",
      distance: "2.1 mi",
      traffic: "moderate",
      isCurrent: false,
    },
    {
      id: 3,
      name: "Shortest Distance",
      duration: "15 min",
      distance: "1.3 mi",
      traffic: "heavy",
      isCurrent: false,
    },
  ];

  const nearbyAlerts = [
    {
      type: "construction",
      message: "Road work on Elm Street - Lane closure",
      icon: Construction,
      color: "text-orange-600",
    },
    {
      type: "traffic",
      message: "Heavy traffic on Broadway Ave",
      icon: Car,
      color: "text-red-600",
    },
    {
      type: "parking",
      message: "Mall Parking - Only 5 spots left",
      icon: Car,
      color: "text-blue-600",
    },
  ];

  // Simulate navigation progress
  useEffect(() => {
    if (!isNavigating) return;

    const interval = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 0) {
          setIsNavigating(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isNavigating]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTrafficColor = (traffic: string) => {
    switch (traffic) {
      case "light":
        return "text-green-600 bg-green-100";
      case "moderate":
        return "text-orange-600 bg-orange-100";
      case "heavy":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="space-y-6">
      {/* Navigation Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">GPS Navigation</h1>
              <p className="text-blue-100">
                Turn-by-turn directions to your parking spot
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="icon"
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className={voiceEnabled ? "bg-white text-blue-600" : "bg-white/20 text-white"}
              >
                {voiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="bg-white/20 text-white hover:bg-white hover:text-blue-600"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Destination Info */}
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-1">{destination.name}</h3>
                <p className="text-blue-100 text-sm">{destination.address}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-blue-100">Available Spots</div>
                <div className="text-lg font-bold">{destination.spots}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Current Navigation Step */}
      {isNavigating && (
        <Card className="p-6 border-2 border-blue-200 bg-blue-50">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white">
              {React.createElement(navigationSteps[currentStep]?.icon || ArrowUp, {
                className: "w-6 h-6"
              })}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-blue-900 mb-1">
                {navigationSteps[currentStep]?.instruction}
              </h3>
              <p className="text-blue-700">
                {navigationSteps[currentStep]?.distance} • {navigationSteps[currentStep]?.duration}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{formatTime(remainingTime)}</div>
              <div className="text-sm text-blue-700">remaining</div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsNavigating(false)}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              End Navigation
            </Button>
            <Button variant="outline" size="sm">
              <Phone className="w-4 h-4 mr-2" />
              Call Garage
            </Button>
          </div>
        </Card>
      )}

      <Tabs defaultValue="routes" className="space-y-6">
        <TabsList>
          <TabsTrigger value="routes">Routes</TabsTrigger>
          <TabsTrigger value="steps">Turn-by-Turn</TabsTrigger>
          <TabsTrigger value="alerts">Traffic Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="routes" className="space-y-4">
          {/* Route Options */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Route Options
              </h3>
              {!isNavigating && (
                <Button
                  onClick={() => setIsNavigating(true)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Start Navigation
                </Button>
              )}
            </div>

            <div className="space-y-4">
              {alternativeRoutes.map((route) => (
                <Card
                  key={route.id}
                  className={`p-4 border-2 cursor-pointer transition-all duration-200 ${
                    route.isCurrent
                      ? "border-blue-300 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                        <Route className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">
                          {route.name}
                        </h4>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {route.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Navigation className="w-3 h-3" />
                            {route.distance}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        className={`${getTrafficColor(route.traffic)} border-0`}
                        variant="secondary"
                      >
                        {route.traffic} traffic
                      </Badge>
                      {route.isCurrent && (
                        <Badge className="bg-blue-100 text-blue-800">
                          Current
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          {/* Map Placeholder */}
          <Card className="p-8 text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <MapPin className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Interactive Map
            </h3>
            <p className="text-gray-600 mb-4">
              View your route on an interactive map with real-time traffic updates
            </p>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
              Load Map View
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="steps" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Turn-by-Turn Directions
            </h3>

            <div className="space-y-4">
              {navigationSteps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-200 ${
                    isNavigating && index === currentStep
                      ? "bg-blue-50 border-2 border-blue-200"
                      : index < currentStep
                      ? "bg-green-50 border border-green-200"
                      : "bg-gray-50 border border-gray-200"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isNavigating && index === currentStep
                        ? "bg-blue-600 text-white"
                        : index < currentStep
                        ? "bg-green-600 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {React.createElement(step.icon, { className: "w-5 h-5" })}
                  </div>
                  <div className="flex-1">
                    <h4
                      className={`font-medium mb-1 ${
                        isNavigating && index === currentStep
                          ? "text-blue-900"
                          : index < currentStep
                          ? "text-green-900"
                          : "text-gray-900"
                      }`}
                    >
                      {step.instruction}
                    </h4>
                    <p
                      className={`text-sm ${
                        isNavigating && index === currentStep
                          ? "text-blue-700"
                          : index < currentStep
                          ? "text-green-700"
                          : "text-gray-600"
                      }`}
                    >
                      {step.distance} • {step.duration}
                    </p>
                  </div>
                  {isNavigating && index === currentStep && (
                    <Badge className="bg-blue-100 text-blue-800">
                      Current
                    </Badge>
                  )}
                  {index < currentStep && (
                    <Badge className="bg-green-100 text-green-800">
                      Completed
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Traffic & Parking Alerts
            </h3>

            <div className="space-y-4">
              {nearbyAlerts.map((alert, index) => (
                <Card key={index} className="p-4 border border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center ${alert.color}`}>
                      {React.createElement(alert.icon, { className: "w-4 h-4" })}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium">{alert.message}</p>
                      <p className="text-sm text-gray-500 mt-1">2 minutes ago</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* EV Charging Stations */}
            <Card className="p-4 border-2 border-green-200 bg-green-50">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-green-900 mb-1">
                    EV Charging Available
                  </h4>
                  <p className="text-sm text-green-700">
                    Central Plaza Garage has 4 EV charging stations available
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  Available
                </Badge>
              </div>
            </Card>
          </Card>

          {/* Navigation Settings */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Navigation Preferences
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Avoid</h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Tolls</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Highways</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">Heavy Traffic</span>
                  </label>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Preferences</h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">Voice Guidance</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">Real-time Updates</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Speed Limit Alerts</span>
                  </label>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}