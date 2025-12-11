import { MapPin, Navigation, Filter, Search, Target, Layers, Star, Clock, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';

export function MapPage() {
  const nearbySpots = [
    { id: 1, name: "Central Plaza", distance: "0.2 mi", price: "$2.50/hr", available: 12, type: "Garage", rating: 4.8 },
    { id: 2, name: "Downtown Parking", distance: "0.4 mi", price: "$3.00/hr", available: 8, type: "Open Lot", rating: 4.6 },
    { id: 3, name: "Mall Parking", distance: "0.6 mi", price: "$1.50/hr", available: 25, type: "Covered", rating: 4.5 },
    { id: 4, name: "Business District", distance: "0.8 mi", price: "$4.00/hr", available: 5, type: "Valet", rating: 4.9 },
    { id: 5, name: "Sports Arena", distance: "1.2 mi", price: "$2.00/hr", available: 45, type: "Stadium", rating: 4.3 },
  ];

  return (
    <div className="space-y-8">
      {/* Enhanced Page Header */}
      <div className="text-center space-y-4 animate-fade-in">
        <h2 className="text-4xl font-bold text-gray-900">Interactive Map</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover available parking spots in real-time with our interactive map and smart recommendations
        </p>
      </div>

      {/* Enhanced Desktop Layout: Map + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[700px]">
        
        {/* Enhanced Left Sidebar - Search and Filters */}
        <div className="lg:col-span-1 space-y-6 overflow-y-auto h-full animate-slide-in-left">
          {/* Enhanced Search Section */}
          <Card className="glass-card professional-shadow-lg p-6 border-0">
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Search Location</h3>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search location or address..."
                  className="pl-12 bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500 h-12"
                />
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                <Button variant="outline" className="flex items-center gap-3 justify-center h-12 border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50">
                  <Filter className="w-5 h-5 text-purple-600" />
                  Advanced Filters
                </Button>
                <Button className="flex items-center gap-3 justify-center h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <Target className="w-5 h-5" />
                  Use My Location
                </Button>
              </div>
            </div>
          </Card>

          {/* Enhanced Map Controls */}
          <Card className="glass-card professional-shadow-lg p-6 border-0">
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Layers className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Map Controls</h3>
            </div>
            <div className="space-y-3">
              <Button variant="outline" className="w-full flex items-center gap-3 justify-start h-12 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50">
                <Layers className="w-5 h-5 text-blue-600" />
                Satellite View
              </Button>
              <Button variant="outline" className="w-full flex items-center gap-3 justify-start h-12 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50">
                <MapPin className="w-5 h-5 text-blue-600" />
                Show All Markers
              </Button>
            </div>
          </Card>

          {/* Enhanced Legend */}
          <Card className="glass-card professional-shadow-lg p-6 border-0">
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Availability Legend</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-6 h-6 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium text-green-800">Available (10+ spots)</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                <div className="w-6 h-6 bg-yellow-500 rounded-full animate-pulse"></div>
                <span className="font-medium text-yellow-800">Limited (1-9 spots)</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                <div className="w-6 h-6 bg-red-500 rounded-full animate-pulse"></div>
                <span className="font-medium text-red-800">Full (0 spots)</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Enhanced Main Map Area */}
        <div className="lg:col-span-3 h-full animate-slide-in-right">
          <Card className="glass-card professional-shadow-xl h-full overflow-hidden border-0">
            <div className="relative h-full bg-gradient-to-br from-purple-200 via-blue-200 to-indigo-200">
              {/* Enhanced Center Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center animate-scale-in">
                  <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-float backdrop-blur-sm">
                    <MapPin className="w-12 h-12 text-purple-700" />
                  </div>
                  <h3 className="text-3xl font-bold text-purple-800 mb-3">Interactive Map View</h3>
                  <p className="text-xl text-purple-700 mb-4">Real-time parking availability and smart navigation</p>
                  <div className="flex items-center justify-center gap-4 text-purple-600">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">Live Updates</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Navigation className="w-4 h-4" />
                      <span className="text-sm font-medium">GPS Navigation</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Map Markers with improved tooltips */}
              <div className="absolute top-12 left-12">
                <div className="relative group">
                  <div className="w-6 h-6 bg-green-500 rounded-full animate-pulse cursor-pointer hover:scale-150 transition-all duration-300 shadow-lg border-2 border-white"></div>
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity shadow-lg border">
                    Central Plaza - 12 spots
                  </div>
                </div>
              </div>
              <div className="absolute top-20 right-16">
                <div className="relative group">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full animate-pulse cursor-pointer hover:scale-150 transition-all duration-300 shadow-lg border-2 border-white"></div>
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity shadow-lg border">
                    Downtown - 8 spots
                  </div>
                </div>
              </div>
              <div className="absolute bottom-20 left-16">
                <div className="relative group">
                  <div className="w-6 h-6 bg-red-500 rounded-full animate-pulse cursor-pointer hover:scale-150 transition-all duration-300 shadow-lg border-2 border-white"></div>
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity shadow-lg border">
                    Mall - Full
                  </div>
                </div>
              </div>
              <div className="absolute top-1/3 right-1/3">
                <div className="relative group">
                  <div className="w-6 h-6 bg-green-500 rounded-full animate-pulse cursor-pointer hover:scale-150 transition-all duration-300 shadow-lg border-2 border-white"></div>
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity shadow-lg border">
                    Business District - 5 spots
                  </div>
                </div>
              </div>
              
              {/* Enhanced Current Location Button */}
              <div className="absolute bottom-8 right-8">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-50 professional-shadow-lg hover-lift rounded-2xl">
                  <Navigation className="w-6 h-6 mr-2" />
                  My Location
                </Button>
              </div>

              {/* Enhanced Map Controls */}
              <div className="absolute top-8 right-8 space-y-3">
                <Button size="icon" className="w-12 h-12 bg-white/95 backdrop-blur-sm text-purple-600 hover:bg-white professional-shadow hover-scale rounded-xl">
                  <span className="text-xl font-bold">+</span>
                </Button>
                <Button size="icon" className="w-12 h-12 bg-white/95 backdrop-blur-sm text-purple-600 hover:bg-white professional-shadow hover-scale rounded-xl">
                  <span className="text-xl font-bold">-</span>
                </Button>
              </div>

              {/* Live Status Indicator */}
              <div className="absolute top-8 left-8">
                <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl professional-shadow flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-800">Live Updates Active</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Enhanced Nearby Spots List */}
      <div className="space-y-8 pt-12 border-t border-gray-200">
        <div className="flex items-center justify-between animate-fade-in">
          <div>
            <h3 className="text-3xl font-bold text-gray-900">Nearby Parking Spots</h3>
            <p className="text-lg text-gray-600 mt-2">Available parking options sorted by distance and rating</p>
          </div>
          <Button variant="outline" className="text-purple-600 border-purple-200 hover:bg-purple-50 px-6 py-3 hover-lift">
            <MapPin className="w-4 h-4 mr-2" />
            View All Locations
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {nearbySpots.map((spot, index) => (
            <Card key={spot.id} className={`glass-card professional-shadow hover:professional-shadow-xl transition-all duration-300 hover-lift border-0 animate-fade-in stagger-${(index % 3) + 1}`}>
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center hover-scale transition-all duration-300">
                      <MapPin className="w-8 h-8 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">{spot.name}</h4>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm text-gray-600 font-medium flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {spot.distance}
                        </span>
                        <Badge variant="outline" className="border-purple-200 text-purple-700 bg-purple-50">
                          {spot.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-700">{spot.rating}</span>
                        <span className="text-xs text-gray-500">(245 reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <div className="text-2xl font-bold text-purple-600 mb-1">{spot.price}</div>
                    <div className="text-sm text-green-600 font-medium">
                      {spot.available} spots available
                    </div>
                  </div>
                  <div className="text-right">
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover-scale professional-shadow px-6">
                      Book Now
                    </Button>
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