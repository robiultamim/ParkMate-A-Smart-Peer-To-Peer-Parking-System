import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";
import {
  Search,
  MapPin,
  Filter,
  Star,
  Navigation,
  Clock,
  Car,
  Truck,
  Bike,
  Zap,
  Shield,
  Wifi,
  Camera,
  Accessibility
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Slider } from "../ui/slider";
import { Checkbox } from "../ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface SmartSearchPageProps {
  onNavigate?: (page: string, params?: any) => void;
}

export function SmartSearchPage({ onNavigate }: SmartSearchPageProps) {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [maxDistance, setMaxDistance] = useState([2]);
  const [selectedVehicleType, setSelectedVehicleType] = useState("car");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("distance");

  const [appliedFilters, setAppliedFilters] = useState({
    vehicleType: "car",
    priceRange: [0, 50],
    maxDistance: [2],
    amenities: [] as string[],
    sortBy: "distance"
  });

  const [spots, setSpots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userBookings, setUserBookings] = useState<any[]>([]);
  const [activeBookings, setActiveBookings] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
    const spacesSub = supabase
      .channel('search-spaces')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'parking_spaces' }, () => fetchData())
      .subscribe();

    const bookingsSub = supabase
      .channel('search-bookings')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, () => fetchData())
      .subscribe();

    return () => {
      supabase.removeChannel(spacesSub);
      supabase.removeChannel(bookingsSub);
    };
  }, [user]);

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([
      fetchSpots(),
      fetchActiveBookings()
    ]);
    if (user) {
      await fetchUserBookings();
    }
    setLoading(false);
  };

  const fetchSpots = async () => {
    try {
      const { data, error } = await supabase
        .from('parking_spaces')
        .select('*')
        .eq('availability_status', 'available');

      if (error) throw error;
      setSpots(data || []);
    } catch (error) {
      console.error('Error fetching spots:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchActiveBookings = async () => {
    try {
      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from('bookings')
        .select('space_id, status')
        .in('status', ['pending', 'confirmed'])
        .lte('start_time', now)
        .gte('end_time', now);

      if (error) throw error;
      setActiveBookings(data || []);
    } catch (error) {
      console.error('Error fetching active bookings:', error);
    }
  };

  const fetchUserBookings = async () => {
    if (!user) return;

    try {
      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from('bookings')
        .select('space_id, status')
        .eq('driver_id', user.id)
        .in('status', ['pending', 'confirmed'])
        .gte('end_time', now);

      if (error) throw error;
      setUserBookings(data || []);
    } catch (error) {
      console.error('Error fetching user bookings:', error);
    }
  };

  const getBookingStatus = (spaceId: string) => {
    const booking = userBookings.find(b => b.space_id === spaceId);
    return booking?.status || null;
  };

  const handleApplyFilters = () => {
    setAppliedFilters({
      vehicleType: selectedVehicleType,
      priceRange,
      maxDistance,
      amenities: selectedAmenities,
      sortBy
    });
  };

  const filteredSpots = spots.filter(spot => {
    // 1. Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!spot.name.toLowerCase().includes(q) && !spot.address.toLowerCase().includes(q)) {
        return false;
      }
    }

    // 2. Vehicle Type
    if (appliedFilters.vehicleType && spot.space_type) {
      if (appliedFilters.vehicleType === 'bike' && spot.space_type !== 'motorcycle') return false;
      if (appliedFilters.vehicleType === 'truck' && spot.space_type !== 'truck') return false;
    }

    // 3. Price Range
    const price = spot.hourly_rate || 0;
    if (price < appliedFilters.priceRange[0] || price > appliedFilters.priceRange[1]) {
      return false;
    }

    // 4. Amenities
    if (appliedFilters.amenities.length > 0) {
      const spotAmenities = spot.amenities || [];
      const hasAll = appliedFilters.amenities.every(a => spotAmenities.includes(a));
      if (!hasAll) return false;
    }

    return true;
  }).sort((a, b) => {
    switch (appliedFilters.sortBy) {
      case 'price-low':
        return (a.hourly_rate || 0) - (b.hourly_rate || 0);
      case 'price-high':
        return (b.hourly_rate || 0) - (a.hourly_rate || 0);
      default:
        return 0;
    }
  });

  const parkingResults = filteredSpots.map(spot => {
    const occupantCount = activeBookings.filter(b => b.space_id === spot.id).length;
    const currentAvailable = Math.max(0, (spot.total_spots || 1) - occupantCount);

    return {
      id: spot.id,
      name: spot.name,
      address: spot.address,
      distance: 0.5,
      price: spot.hourly_rate || 0,
      rating: 4.8,
      reviews: 12,
      available: currentAvailable,
      total: spot.total_spots || 1,
      type: spot.space_type || "Standard",
      amenities: spot.amenities || [],
      image: spot.photos && spot.photos.length > 0 ? spot.photos[0] : "/api/placeholder/300/200",
    };
  });

  const amenityIcons: Record<string, any> = {
    covered: Shield,
    security: Shield,
    "ev-charging": Zap,
    wifi: Wifi,
    cctv: Camera,
    "disabled-access": Accessibility,
  };

  const amenityLabels: Record<string, string> = {
    covered: "Covered Parking",
    security: "24/7 Security",
    "ev-charging": "EV Charging",
    wifi: "Free WiFi",
    cctv: "CCTV Surveillance",
    "disabled-access": "Disabled Access",
  };

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const getAvailabilityColor = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage > 50) return "text-green-600 bg-green-50";
    if (percentage > 20) return "text-orange-600 bg-orange-50";
    return "text-red-600 bg-red-50";
  };

  const getAvailabilityText = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage > 50) return "High Availability";
    if (percentage > 20) return "Limited Spots";
    return "Nearly Full";
  };

  if (loading) {
    return <div className="p-8 text-center">Loading parking spots...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="relative z-10">
          <h1 className="text-2xl font-bold mb-2">Smart Parking Search</h1>
          <p className="text-purple-100 mb-6">
            Find the perfect parking spot with AI-powered recommendations
          </p>

          {/* Main Search Bar */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Enter destination, address, or landmark..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white focus:text-gray-900 focus:placeholder:text-gray-500"
                />
              </div>
            </div>
            <Button
              size="lg"
              className="h-12 bg-white text-purple-600 hover:bg-gray-100 font-semibold"
            >
              <Search className="w-5 h-5 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-6">
            <div className="flex items-center gap-2 mb-6">
              <Filter className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-gray-900">Smart Filters</h3>
            </div>

            <div className="space-y-6">
              {/* Vehicle Type */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">
                  Vehicle Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={selectedVehicleType === "car" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedVehicleType("car")}
                    className="flex flex-col gap-1 h-auto py-3"
                  >
                    <Car className="w-4 h-4" />
                    <span className="text-xs">Car</span>
                  </Button>
                  <Button
                    variant={selectedVehicleType === "bike" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedVehicleType("bike")}
                    className="flex flex-col gap-1 h-auto py-3"
                  >
                    <Bike className="w-4 h-4" />
                    <span className="text-xs">Bike</span>
                  </Button>
                  <Button
                    variant={selectedVehicleType === "truck" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedVehicleType("truck")}
                    className="flex flex-col gap-1 h-auto py-3"
                  >
                    <Truck className="w-4 h-4" />
                    <span className="text-xs">Truck</span>
                  </Button>
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">
                  Price Range (per hour)
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={50}
                  min={0}
                  step={0.5}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              {/* Distance */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">
                  Maximum Distance
                </label>
                <Slider
                  value={maxDistance}
                  onValueChange={setMaxDistance}
                  max={10}
                  min={0.1}
                  step={0.1}
                  className="mb-2"
                />
                <div className="text-sm text-gray-500">
                  Within {maxDistance[0]} miles
                </div>
              </div>

              {/* Amenities */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">
                  Amenities
                </label>
                <div className="space-y-3">
                  {Object.entries(amenityLabels).map(([key, label]) => {
                    const IconComponent = amenityIcons[key];
                    return (
                      <div key={key} className="flex items-center space-x-2">
                        <Checkbox
                          id={key}
                          checked={selectedAmenities.includes(key)}
                          onCheckedChange={() => handleAmenityToggle(key)}
                        />
                        <label
                          htmlFor={key}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
                        >
                          <IconComponent className="w-4 h-4 text-purple-600" />
                          {label}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Sort By */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">
                  Sort By
                </label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="distance">Nearest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="availability">Most Available</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
                onClick={handleApplyFilters}
              >
                Apply Filters
              </Button>
            </div>
          </Card>
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="list" className="w-full">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Search Results
                </h2>
                <p className="text-gray-600">
                  Found {parkingResults.length} parking spots near you
                </p>
              </div>
              <TabsList>
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="map">Map View</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="list" className="space-y-4">
              {parkingResults.map((spot) => (
                <Card key={spot.id} className="p-6 hover:shadow-lg transition-shadow duration-200">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Image */}
                    <div className="lg:col-span-1">
                      <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg relative overflow-hidden">
                        <img
                          src={spot.image}
                          alt={spot.name}
                          className="w-full h-full object-cover"
                          onError={(e: any) => (e.currentTarget.src = 'https://via.placeholder.com/300x200?text=No+Preview')}
                        />
                        <div className="absolute top-2 left-2">
                          <Badge variant="secondary" className="bg-white/90">
                            {spot.type}
                          </Badge>
                        </div>
                        <div className="absolute top-2 right-2">
                          <Badge
                            className={`${getAvailabilityColor(spot.available, spot.total)} border-0`}
                          >
                            {getAvailabilityText(spot.available, spot.total)}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="lg:col-span-2">
                      <div className="h-full flex flex-col">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {spot.name}
                          </h3>
                          <p className="text-gray-600 mb-3 flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {spot.address}
                          </p>

                          <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-1">
                              <Navigation className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-600">{spot.distance} miles</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium">{spot.rating}</span>
                              <span className="text-sm text-gray-500">({spot.reviews})</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Car className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-600">
                                {spot.available}/{spot.total} available
                              </span>
                            </div>
                          </div>

                          {/* Amenities */}
                          <div className="flex flex-wrap gap-2">
                            {spot.amenities.map((amenity: string) => {
                              const IconComponent = amenityIcons[amenity];
                              if (!IconComponent) return null;
                              return (
                                <div
                                  key={amenity}
                                  className="flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-700 rounded-md text-xs"
                                >
                                  <IconComponent className="w-3 h-3" />
                                  {amenityLabels[amenity]}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Price & Actions */}
                    <div className="lg:col-span-1">
                      <div className="text-center lg:text-right">
                        <div className="mb-4">
                          <div className="text-2xl font-bold text-purple-600">
                            ${spot.price}
                          </div>
                          <div className="text-sm text-gray-500">per hour</div>
                        </div>

                        <div className="space-y-2">
                          {(() => {
                            const bookingStatus = getBookingStatus(spot.id);
                            if (bookingStatus === 'pending') {
                              return (
                                <Badge className="w-full bg-orange-100 text-orange-700 border-orange-200 px-4 py-3 justify-center">
                                  <Clock className="w-4 h-4 mr-2" />
                                  Pending Approval
                                </Badge>
                              );
                            } else if (bookingStatus === 'confirmed') {
                              return (
                                <Badge className="w-full bg-green-100 text-green-700 border-green-200 px-4 py-3 justify-center">
                                  Confirmed
                                </Badge>
                              );
                            } else {
                              return (
                                <Button
                                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                                  onClick={() => onNavigate?.('book-now', { id: spot.id })}
                                >
                                  <Clock className="w-4 h-4 mr-2" />
                                  Book Now
                                </Button>
                              );
                            }
                          })()}
                          <Button variant="outline" className="w-full" onClick={() => onNavigate?.('map')}>
                            <MapPin className="w-4 h-4 mr-2" />
                            View on Map
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="map" className="space-y-4">
              <Card className="p-8 text-center">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Interactive Map View
                </h3>
                <p className="text-gray-600 mb-4">
                  View all parking spots on an interactive map with real-time availability
                </p>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600" onClick={() => onNavigate?.('map')}>
                  Load Map View
                </Button>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}