import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { MapPin, Filter, Search, Target, ArrowRight, Clock, Activity, Zap } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { SharedLeafletMap } from '../ui/shared-leaflet-map';

interface MapPageProps {
  onNavigate?: (page: string, params?: any) => void;
}

export function MapPage({ onNavigate }: MapPageProps) {
  const { user } = useAuth();
  const [spots, setSpots] = useState<any[]>([]);
  const [activeBookings, setActiveBookings] = useState<any[]>([]);
  const [userBookings, setUserBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [selectedType, setSelectedType] = useState<string>('all');

  const [mapCenter, setMapCenter] = useState<[number, number]>([37.7749, -122.4194]);
  const [mapZoom, setMapZoom] = useState(13);

  useEffect(() => {
    fetchInitialData();
    const spacesSub = supabase
      .channel('map-spaces')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'parking_spaces' }, () => fetchInitialData())
      .subscribe();

    const bookingsSub = supabase
      .channel('map-bookings')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, () => fetchInitialData())
      .subscribe();

    return () => {
      supabase.removeChannel(spacesSub);
      supabase.removeChannel(bookingsSub);
    };
  }, [user]);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const now = new Date().toISOString();
      const { data: spotsData } = await supabase.from('parking_spaces').select('*').eq('availability_status', 'available');
      const { data: bookingsData } = await supabase
        .from('bookings')
        .select('space_id, status')
        .in('status', ['pending', 'confirmed'])
        .lte('start_time', now)
        .gte('end_time', now);

      if (user) {
        const { data: userBookingsData } = await supabase
          .from('bookings')
          .select('space_id, status')
          .eq('driver_id', user.id)
          .in('status', ['pending', 'confirmed'])
          .gte('end_time', now);
        setUserBookings(userBookingsData || []);
      }

      setSpots(spotsData || []);
      setActiveBookings(bookingsData || []);
    } catch (error) {
      console.error('Error fetching map data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getBookingStatus = (spaceId: string) => {
    const booking = userBookings.find(b => b.space_id === spaceId);
    return booking?.status || null;
  };

  const spotsWithAvailability = useMemo(() => {
    return spots.map(spot => {
      const activeCount = activeBookings.filter(b => b.space_id === spot.id).length;
      return {
        ...spot,
        current_availability: Math.max(0, (spot.total_spots || 1) - activeCount)
      };
    });
  }, [spots, activeBookings]);

  const filteredSpots = useMemo(() => {
    return spotsWithAvailability.filter(spot => {
      const matchesSearch = spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        spot.address.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = spot.hourly_rate >= priceRange[0] && spot.hourly_rate <= priceRange[1];
      const matchesType = selectedType === 'all' || spot.space_type === selectedType;
      return matchesSearch && matchesPrice && matchesType;
    });
  }, [spotsWithAvailability, searchQuery, priceRange, selectedType]);

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter([position.coords.latitude, position.coords.longitude]);
          setMapZoom(15);
        }
      );
    }
  };

  if (loading) {
    return (
      <div className="h-[700px] flex items-center justify-center bg-gray-50 rounded-2xl">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="text-gray-500 font-medium tracking-tight">Syncing map coordinates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in p-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Neighborhood Map</h2>
          <p className="text-lg text-gray-400 mt-1 font-medium">
            {filteredSpots.length} verified spots available now
          </p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-96">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter City, Mall or Hub Name..."
              className="pl-12 h-14 bg-white professional-shadow-lg border-0 focus:ring-2 focus:ring-purple-500 rounded-2xl text-gray-900 font-medium"
            />
          </div>
          <Button variant="outline" className="h-14 w-14 rounded-2xl border-0 bg-white professional-shadow-lg p-0 flex items-center justify-center">
            <Filter className="w-6 h-6 text-purple-600" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[750px] relative">
        <div className="lg:col-span-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
          <Card className="glass-card professional-shadow-lg p-6 border-0 rounded-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Filter className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Advanced Filters</h3>
            </div>

            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Property Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {['all', 'garage', 'open-lot', 'street'].map((type) => (
                    <Button
                      key={type}
                      variant={selectedType === type ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedType(type)}
                      className={`capitalize rounded-xl ${selectedType === type ? 'bg-purple-600' : 'border-gray-100 text-gray-500'}`}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Max Hourly Rate</label>
                  <span className="text-sm font-bold text-purple-600">${priceRange[1]}</span>
                </div>
                <input
                  type="range" min="0" max="50" step="5"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full accent-purple-600 cursor-pointer"
                />
              </div>

              <Button className="w-full bg-gray-900 hover:bg-black rounded-2xl h-12 font-bold professional-shadow hover-lift" onClick={handleUseMyLocation}>
                <Target className="w-4 h-4 mr-2" />
                Center My Location
              </Button>
            </div>
          </Card>

          <Card className="glass-card professional-shadow-lg border-0 rounded-3xl overflow-hidden flex flex-col flex-1">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h4 className="font-black text-gray-900 flex items-center gap-2 uppercase tracking-tighter text-sm">
                <Activity className="w-4 h-4 text-purple-600" />
                Live Hub Activity
              </h4>
              <Badge className="bg-green-100 text-green-700 border-0 text-[10px] font-black uppercase">Active</Badge>
            </div>
            <div className="p-4 space-y-3 overflow-y-auto flex-1 custom-scrollbar">
              {filteredSpots.slice(0, 8).map((spot) => {
                const bookingStatus = getBookingStatus(spot.id);
                const occupancy = Math.round(((spot.total_spots - spot.current_availability) / spot.total_spots) * 100);

                return (
                  <div key={spot.id} className="group cursor-pointer flex items-center gap-4 p-3 rounded-2xl hover:bg-white hover:professional-shadow-md transition-all border border-transparent hover:border-gray-100">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 relative">
                      {spot.photos?.[0] ?
                        <img src={spot.photos[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /> :
                        <div className="w-full h-full bg-purple-50 flex items-center justify-center text-purple-200">
                          <MapPin size={20} />
                        </div>
                      }
                      <div className="absolute top-1 right-1">
                        <div className={`w-2.5 h-2.5 rounded-full border-2 border-white ${spot.current_availability > 0 ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between items-center mb-0.5">
                        <div className="flex items-center gap-2 min-w-0">
                          <p className="text-sm font-black text-gray-900 truncate tracking-tight">{spot.name}</p>
                          {bookingStatus && (
                            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${bookingStatus === 'pending' ? 'bg-orange-500' : 'bg-green-500'} animate-pulse`} />
                          )}
                        </div>
                        <span className="text-[10px] font-black text-purple-600">${spot.hourly_rate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-1000 ${occupancy > 80 ? 'bg-orange-500' : 'bg-purple-500'}`}
                            style={{ width: `${occupancy}%` }}
                          />
                        </div>
                        <span className="text-[9px] font-bold text-gray-400 uppercase">{occupancy}% Full</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-3 h-full relative group">
          <Card className="h-full overflow-hidden border-0 professional-shadow-2xl rounded-[2.5rem] relative z-0">
            <SharedLeafletMap
              spots={filteredSpots}
              onNavigate={onNavigate}
              getBookingStatus={getBookingStatus}
              center={mapCenter}
              zoom={mapZoom}
            />

            <div className="absolute top-6 left-6 z-[1000] space-y-3 pointer-events-none">
              <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl professional-shadow-lg flex items-center gap-3 border border-white/50 animate-slide-in-left">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black text-gray-800 uppercase tracking-widest flex items-center gap-2">
                  <Activity className="w-3 h-3 text-purple-600" />
                  Live Matrix Sync Active
                </span>
              </div>

              <div className="bg-gray-900/90 backdrop-blur-md px-4 py-2.5 rounded-2xl professional-shadow-xl flex items-center gap-4 border border-white/10 animate-slide-in-left stagger-1">
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-0.5">System Health</span>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className={`w-1.5 h-3 rounded-sm ${i <= 4 ? 'bg-green-400' : 'bg-gray-700'}`} />
                    ))}
                    <span className="text-[10px] font-black text-white ml-2">99.4%</span>
                  </div>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Nearby Load</span>
                  <span className="text-xs font-black text-white">OPTIMAL</span>
                </div>
              </div>
            </div>

            <div className="absolute bottom-6 right-6 z-[1000] pointer-events-none">
              <div className="bg-white/95 backdrop-blur-md px-6 py-4 rounded-3xl professional-shadow-2xl border border-white overflow-hidden animate-slide-in-right">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-4 h-4 text-purple-600 fill-current" />
                    <span className="text-[10px] font-black text-gray-900 uppercase tracking-wider">Fast-Track Status</span>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-black text-gray-900 tracking-tighter">{filteredSpots.filter(s => s.current_availability > 0).length}</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase mb-1">Instant Spots Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="pt-12 border-t border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">Nearby Parking Spots</h3>
            <p className="text-gray-400 font-medium">Verified parking spots near your location with real-time availability</p>
          </div>
          <Button variant="ghost" className="text-purple-600 font-bold hover:bg-purple-50 rounded-xl px-6" onClick={() => onNavigate?.('search')}>
            View All Nearby
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSpots.slice(0, 4).map((spot) => (
            <Card key={spot.id} className="group glass-card border-0 professional-shadow hover:professional-shadow-xl transition-all duration-300 hover-lift overflow-hidden rounded-[2rem]">
              <div className="aspect-video relative overflow-hidden bg-gray-100 p-2">
                <div className="w-full h-full rounded-2xl overflow-hidden">
                  {spot.photos?.[0] ? (
                    <img src={spot.photos[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-purple-50">
                      <MapPin className="w-8 h-8 text-purple-100" />
                    </div>
                  )}
                </div>
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/95 backdrop-blur-sm text-purple-700 font-black border-0 px-3">
                    {spot.space_type}
                  </Badge>
                </div>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-black text-gray-900 leading-tight group-hover:text-purple-600 transition-colors uppercase tracking-tight">{spot.name}</h4>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                  <p className="text-xl font-black text-purple-600">${spot.hourly_rate}<span className="text-xs text-gray-400 font-bold">/hr</span></p>
                  {(() => {
                    const bookingStatus = getBookingStatus(spot.id);
                    if (bookingStatus === 'pending') {
                      return (
                        <Badge className="bg-orange-100 text-orange-700 border-0 px-3 h-8 flex items-center font-black text-[9px] uppercase tracking-widest">
                          <Clock className="w-3 h-3 mr-1" />
                          Pending Approval
                        </Badge>
                      );
                    } else if (bookingStatus === 'confirmed') {
                      return (
                        <Badge className="bg-green-100 text-green-700 border-0 px-3 h-8 flex items-center font-black text-[9px] uppercase tracking-widest">
                          Confirmed
                        </Badge>
                      );
                    } else {
                      return (
                        <Button
                          size="sm"
                          className="bg-gray-900 rounded-xl h-8 px-4 font-black text-[10px] tracking-widest uppercase"
                          onClick={() => onNavigate?.('book-now', { id: spot.id })}
                          disabled={spot.current_availability <= 0}
                        >
                          {spot.current_availability > 0 ? 'Book Now' : 'Full'}
                        </Button>
                      );
                    }
                  })()}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}