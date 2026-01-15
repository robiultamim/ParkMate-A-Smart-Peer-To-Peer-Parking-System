import { useState, useEffect } from 'react';
import {
  DollarSign,
  MapPin,
  Clock,
  TrendingUp,
  Plus,
  Eye,
  Calendar,
  Users,
  Star,
  CheckCircle,
  XCircle,
  Edit,
  BarChart3,
  Smartphone,
  Camera,
  Loader2,
  Shield,
  Zap,
  Car,
  Trash2
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { toast } from 'sonner';
import { ScrollArea } from '../ui/scroll-area';

interface SpaceOwnerDashboardProps {
  onNavigate: (page: string) => void;
  defaultTab?: string;
}

export function SpaceOwnerDashboard({ onNavigate, defaultTab = 'overview' }: SpaceOwnerDashboardProps) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    if (defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab]);
  const [spaces, setSpaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpace, setSelectedSpace] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [pendingBookings, setPendingBookings] = useState<any[]>([]);

  // Edit form state
  const [editName, setEditName] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editType, setEditType] = useState('');
  const [editHourlyRate, setEditHourlyRate] = useState('');
  const [editDailyRate, setEditDailyRate] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editTotalSpots, setEditTotalSpots] = useState('');
  const [editAmenities, setEditAmenities] = useState<string[]>([]);
  const [editVehicleTypes, setEditVehicleTypes] = useState<string[]>([]);
  const [editAvailability, setEditAvailability] = useState('available');

  const amenitiesList = [
    { id: 'security', label: 'Security Camera', icon: Shield },
    { id: 'covered', label: 'Covered Parking', icon: Shield },
    { id: 'ev-charging', label: 'EV Charging', icon: Zap },
    { id: 'lighting', label: 'Well Lit', icon: Zap },
    { id: 'accessible', label: 'Wheelchair Accessible', icon: Car },
    { id: 'attendant', label: 'Parking Attendant', icon: Car },
  ];

  const vehicleTypesList = [
    { id: 'car', label: 'Car' },
    { id: 'motorcycle', label: 'Motorcycle' },
    { id: 'truck', label: 'Truck' },
    { id: 'van', label: 'Van' },
    { id: 'bicycle', label: 'Bicycle' },
  ];

  const fetchSpaces = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('parking_spaces')
        .select('*')
        .eq('owner_id', user.id);

      if (error) throw error;
      setSpaces(data || []);

      // After fetching spaces, fetch pending requests for these spaces
      if (data && data.length > 0) {
        fetchPendingRequests(data.map((s: any) => s.id));
      }
    } catch (err) {
      console.error('Error fetching name:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingRequests = async (spaceIds: string[]) => {
    try {
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select(`
            *,
            parking_spaces!space_id (name)
          `)
        .in('space_id', spaceIds)
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (bookingsError) throw bookingsError;

      const bookings = bookingsData || [];

      // Manually fetch profiles since foreign key relationship is missing or ambiguous
      const driverIds = [...new Set(bookings.map((b: any) => b.driver_id))];

      let profilesMap: Record<string, any> = {};

      if (driverIds.length > 0) {
        const { data: profilesData } = await supabase
          .from('user_profiles')
          .select('user_id, first_name, last_name, phone')
          .in('user_id', driverIds);

        if (profilesData) {
          profilesData.forEach((p: any) => {
            profilesMap[p.user_id] = p;
          });
        }
      }

      const formattedRequests = bookings.map((b: any) => {
        const profile = profilesMap[b.driver_id];
        const fullName = profile ? `${profile.first_name} ${profile.last_name}` : 'Unknown User';

        return {
          id: b.id,
          renterName: fullName,
          renterRating: 5.0, // Placeholder
          spaceName: b.parking_spaces?.name || 'Unknown Space',
          vehicleType: b.vehicle_type || 'Car',
          amount: `$${b.total_price}`,
          duration: `${Math.ceil((new Date(b.end_time).getTime() - new Date(b.start_time).getTime()) / (1000 * 60 * 60))} hours`,
          startTime: new Date(b.start_time).toLocaleString(),
          requestTime: new Date(b.created_at).toLocaleDateString()
        };
      });

      setPendingBookings(formattedRequests);
    } catch (err) {
      console.error('Error fetching pending bookings:', err);
    }
  };

  const handleBookingAction = async (bookingId: number, action: 'approve' | 'reject') => {
    const status = action === 'approve' ? 'confirmed' : 'rejected';

    // Optimistic update
    setPendingBookings(prev => prev.filter(b => b.id !== bookingId));

    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', bookingId);

      if (error) throw error;

      toast.success(`Booking ${action}d successfully`);
      // Refresh to ensure sync
      const spaceIds = spaces.map(s => s.id);
      if (spaceIds.length > 0) fetchPendingRequests(spaceIds);

    } catch (error) {
      console.error('Error updating booking:', error);
      toast.error('Failed to update booking status');
      // Revert optimistic update ideally, but re-fetching covers it
      const spaceIds = spaces.map(s => s.id);
      if (spaceIds.length > 0) fetchPendingRequests(spaceIds);
    }
  };

  useEffect(() => {
    fetchSpaces();
  }, [user]);

  const handleEditClick = (space: any) => {
    setSelectedSpace(space);
    setEditName(space.name || '');
    setEditAddress(space.address || '');
    setEditType(space.space_type || '');
    setEditHourlyRate(space.hourly_rate?.toString() || '');
    setEditDailyRate(space.daily_rate?.toString() || '');
    setEditDescription(space.description || '');
    setEditTotalSpots(space.total_spots?.toString() || '1');
    setEditAmenities(space.amenities || []);
    setEditVehicleTypes(space.vehicle_types || []);
    setEditAvailability(space.availability_status || 'available');
    setIsEditDialogOpen(true);
  };

  const handleViewClick = (space: any) => {
    setSelectedSpace(space);
    setIsViewDialogOpen(true);
  };

  const handleUpdateSpace = async () => {
    if (!selectedSpace) return;
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('parking_spaces')
        .update({
          name: editName,
          address: editAddress,
          space_type: editType,
          hourly_rate: parseFloat(editHourlyRate),
          daily_rate: parseFloat(editDailyRate) || null,
          description: editDescription,
          total_spots: parseInt(editTotalSpots),
          amenities: editAmenities,
          vehicle_types: editVehicleTypes,
          availability_status: editAvailability,
        })
        .eq('id', selectedSpace.id);

      if (error) throw error;
      toast.success('Space updated successfully');
      await fetchSpaces();
      setIsEditDialogOpen(false);
    } catch (err: any) {
      toast.error(err.message || 'Failed to update space');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteSpace = async () => {
    if (!selectedSpace) return;
    if (!window.confirm('Are you sure you want to delete this parking space? This action cannot be undone.')) return;

    setIsUpdating(true);
    try {
      console.log('Attempting to delete space:', selectedSpace.id);

      const { data, error } = await supabase
        .from('parking_spaces')
        .delete()
        .eq('id', selectedSpace.id)
        .select();

      if (error) {
        console.error('Supabase delete error:', error);
        if (error.code === '23503') { // Foreign Key Violation code
          throw new Error('Cannot delete this space because it has active bookings associated with it.');
        }
        throw error;
      }

      if (!data || data.length === 0) {
        console.warn('Delete operation returned no data. Possible RLS issue or space not found.');
        throw new Error('Could not delete the space. It may have already been deleted or you do not have permission.');
      }

      toast.success('Space deleted successfully');

      // Update local state immediately to reflect change
      setSpaces(currentSpaces => currentSpaces.filter(s => s.id !== selectedSpace.id));

      setIsEditDialogOpen(false);
      setIsViewDialogOpen(false);
    } catch (err: any) {
      console.error('Delete function error:', err);
      toast.error(err.message || 'Failed to delete space');
    } finally {
      setIsUpdating(false);
    }
  };

  const toggleEditAmenity = (id: string) => {
    setEditAmenities(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const toggleEditVehicleType = (id: string) => {
    setEditVehicleTypes(prev =>
      prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]
    );
  };

  const earningsMetrics = [
    {
      id: 'monthly',
      title: 'Monthly Earnings',
      value: '$2,847',
      change: '+$324',
      changeType: 'increase',
      percentage: '+12.8%',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-100',
      textColor: 'text-green-700'
    },
    {
      id: 'spaces',
      title: 'Active Spaces',
      value: spaces.length.toString(),
      change: '+1',
      changeType: 'increase',
      percentage: '+25%',
      icon: MapPin,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100',
      textColor: 'text-blue-700'
    },
    {
      id: 'bookings',
      title: 'This Month\'s Bookings',
      value: '147',
      change: '+23',
      changeType: 'increase',
      percentage: '+18.5%',
      icon: Calendar,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100',
      textColor: 'text-purple-700'
    },
    {
      id: 'rating',
      title: 'Average Rating',
      value: '4.8',
      change: '+0.2',
      changeType: 'increase',
      percentage: '+4.3%',
      icon: Star,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-100',
      textColor: 'text-orange-700'
    }
  ];

  /* 
     Map fetched spaces to UI model. 
     Supabase columns: name, address, space_type, hourly_rate, availability_status, photos 
  */
  const parkingSpaces = spaces.map(space => ({
    id: space.id,
    name: space.name,
    type: space.space_type || 'Parking Space',
    location: space.address,
    pricing: {
      car: space.hourly_rate ? `$${space.hourly_rate} /hr` : 'N/A',
      bike: space.hourly_rate ? `$${space.hourly_rate}/hr` : 'N/A',
      truck: space.hourly_rate ? `$${space.hourly_rate}/hr` : 'N/A'
    },
    availability: space.availability_status === 'available' ? 'Available' : 'Occupied',
    occupancy: 0, // mock
    earnings: '$0', // mock
    bookings: 0, // mock
    rating: 5.0, // mock
    status: 'active',
    images: space.photos ? space.photos.length : 0,
    imageUrl: space.photos && space.photos.length > 0 ? space.photos[0] : null,
    lastBooked: 'Never',
    raw: space
  }));



  const recentEarnings = [
    { date: 'Today', amount: '$47.50', bookings: 8 },
    { date: 'Yesterday', amount: '$89.25', bookings: 12 },
    { date: '2 days ago', amount: '$62.00', bookings: 9 },
    { date: '3 days ago', amount: '$75.80', bookings: 11 },
    { date: '4 days ago', amount: '$53.40', bookings: 7 }
  ];

  return (
    <div className="space-y-8">
      {/* Host Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Host Control Center</h1>
          <p className="text-lg text-gray-600">Manage your parking spaces and maximize earnings</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <Button
            variant="outline"
            onClick={() => onNavigate('add-space')}
            className="border-purple-200 text-purple-700 hover:bg-purple-50"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Space
          </Button>
          <Button
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            onClick={() => onNavigate('earnings')}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Earnings Dashboard
          </Button>
        </div>
      </div>

      {/* Earnings Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {earningsMetrics.map((metric, index) => (
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
                  variant="default"
                  className="bg-green-100 text-green-700 border-green-200"
                >
                  {metric.percentage}
                </Badge>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">{metric.title}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900">{metric.value}</span>
                  <span className="text-sm font-medium text-green-600">{metric.change}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid bg-white border border-gray-200 p-1">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 transition-all duration-200 hover:bg-purple-50 hover:text-purple-600 hover:scale-105 hover:shadow-sm"
          >
            <Eye className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="spaces"
            className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 transition-all duration-200 hover:bg-purple-50 hover:text-purple-600 hover:scale-105 hover:shadow-sm"
          >
            <MapPin className="w-4 h-4 mr-2" />
            My Spaces
          </TabsTrigger>
          <TabsTrigger
            value="requests"
            className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 transition-all duration-200 hover:bg-purple-50 hover:text-purple-600 hover:scale-105 hover:shadow-sm"
          >
            <Clock className="w-4 h-4 mr-2" />
            Requests
          </TabsTrigger>
          <TabsTrigger
            value="earnings"
            className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 transition-all duration-200 hover:bg-purple-50 hover:text-purple-600 hover:scale-105 hover:shadow-sm"
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Earnings
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card className="glass-card professional-shadow-lg p-6 border-0">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Recent Bookings</h3>
                <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
                  <Eye className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {recentEarnings.map((earning, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{earning.date}</p>
                        <p className="text-sm text-gray-600">{earning.bookings} bookings</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{earning.amount}</p>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        Paid
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Performance Overview */}
            <Card className="glass-card professional-shadow-lg p-6 border-0">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Performance Overview</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Overall Occupancy</span>
                    <span className="text-sm font-semibold text-purple-600">67%</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Host Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-semibold text-gray-900">4.8</span>
                    </div>
                  </div>
                  <Progress value={96} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Response Time</span>
                    <span className="text-sm font-semibold text-blue-600">&lt; 15 min</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Monthly Goal</span>
                    <span className="text-sm font-semibold text-green-600">$2,847 / $3,000</span>
                  </div>
                  <Progress value={94.9} className="h-2" />
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="glass-card professional-shadow-lg p-6 border-0">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="flex flex-col items-center gap-3 p-6 h-auto border-2 hover:border-purple-300 hover:bg-purple-50"
                onClick={() => onNavigate('add-space')}
              >
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Plus className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900">Add Space</div>
                  <div className="text-sm text-gray-500">List new parking</div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center gap-3 p-6 h-auto border-2 hover:border-green-300 hover:bg-green-50"
                onClick={() => onNavigate('earnings')}
              >
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900">Earnings Dashboard</div>
                  <div className="text-sm text-gray-500">Detailed insights</div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center gap-3 p-6 h-auto border-2 hover:border-orange-300 hover:bg-orange-50"
                onClick={() => onNavigate('withdrawal')}
              >
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-orange-600" />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900">Withdraw Funds</div>
                  <div className="text-sm text-gray-500">To mobile wallet</div>
                </div>
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* My Spaces Tab */}
        <TabsContent value="spaces" className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-gray-900">My Parking Spaces</h3>
            <Button
              className="bg-gradient-to-r from-purple-600 to-blue-600"
              onClick={() => onNavigate('add-space')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Space
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {parkingSpaces.length === 0 && !loading && (
              <div className="col-span-full text-center py-10 text-gray-500">
                No spaces found. Add a space to get started.
              </div>
            )}
            {parkingSpaces.map((space) => (
              <Card key={space.id} className="glass-card professional-shadow-lg overflow-hidden hover-lift border-0">
                <div className="relative">
                  {space.imageUrl ? (
                    <div className="h-48 relative overflow-hidden">
                      <img
                        src={space.imageUrl || 'https://via.placeholder.com/400x300?text=No+Preview'}
                        alt={space.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Error+Loading')}
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                      <div className="text-center">
                        <Camera className="w-12 h-12 text-purple-400 mx-auto mb-2" />
                        <p className="text-sm text-purple-600">{space.images} photos</p>
                      </div>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <Badge
                      variant={space.availability === 'Available' ? 'default' : 'secondary'}
                      className={`${space.availability === 'Available'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-orange-100 text-orange-700'
                        }`}
                    >
                      {space.availability}
                    </Badge>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-lg mb-1">{space.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{space.type}</p>
                      <p className="text-xs text-gray-500">{space.location}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-900">{space.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Car Rate:</span>
                      <span className="font-medium text-gray-900">{space.pricing.car}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Bike Rate:</span>
                      <span className="font-medium text-gray-900">{space.pricing.bike}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Truck Rate:</span>
                      <span className="font-medium text-gray-900">{space.pricing.truck}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                    <div>
                      <p className="text-lg font-bold text-green-600">{space.earnings}</p>
                      <p className="text-xs text-gray-600">This Month</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-blue-600">{space.bookings}</p>
                      <p className="text-xs text-gray-600">Bookings</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-purple-600">{space.occupancy}%</p>
                      <p className="text-xs text-gray-600">Occupancy</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 hover:bg-purple-50 hover:text-purple-600 border-purple-100 transition-all duration-200"
                      onClick={() => handleEditClick(space.raw)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 hover:bg-blue-50 hover:text-blue-600 border-blue-100 transition-all duration-200"
                      onClick={() => handleViewClick(space.raw)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Booking Requests Tab */}
        <TabsContent value="requests" className="space-y-6">
          <Card className="glass-card professional-shadow-lg border-0">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Pending Booking Requests</h3>
                  <p className="text-gray-600">Review and approve parking requests from drivers</p>
                </div>
                <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                  {pendingBookings.length} pending
                </Badge>
              </div>
            </div>
            <div className="p-6">
              {pendingBookings.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No pending requests</div>
              ) : (
                <div className="space-y-4">
                  {pendingBookings.map((request) => (
                    <div key={request.id} className="border border-gray-200 rounded-xl p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                              <Users className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="font-semibold text-gray-900">{request.renterName}</h4>
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                  <span className="text-sm text-gray-600">{request.renterRating}</span>
                                </div>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                                <div>
                                  <span className="font-medium">Space:</span> {request.spaceName}
                                </div>
                                <div>
                                  <span className="font-medium">Vehicle:</span> {request.vehicleType}
                                </div>
                                <div>
                                  <span className="font-medium">Duration:</span> {request.duration}
                                </div>
                                <div>
                                  <span className="font-medium">Start Time:</span> {request.startTime}
                                </div>
                              </div>
                              <div className="flex items-center gap-4 mt-3">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-gray-600">Amount:</span>
                                  <span className="font-semibold text-green-600">{request.amount}</span>
                                </div>
                                <div className="text-xs text-gray-500">
                                  Requested {request.requestTime}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => handleBookingAction(request.id, 'approve')}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-200 text-red-700 hover:bg-red-50"
                            onClick={() => handleBookingAction(request.id, 'reject')}
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Decline
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </TabsContent>

        {/* Earnings Tab */}
        <TabsContent value="earnings" className="space-y-6">
          <Card className="glass-card professional-shadow-lg p-6 border-0">
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Detailed Earnings Analytics</h3>
              <p className="text-gray-600 mb-6">Comprehensive revenue tracking and performance insights</p>
              <Button
                className="bg-gradient-to-r from-purple-600 to-blue-600"
                onClick={() => onNavigate('earnings')}
              >
                Open Earnings Dashboard
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View Space Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] flex flex-col p-0 overflow-hidden bg-white border-0 professional-shadow-2xl">
          {selectedSpace && (
            <div className="flex flex-col">
              <div className="h-32 relative shrink-0">
                {selectedSpace.photos && selectedSpace.photos.length > 0 ? (
                  <img
                    src={selectedSpace.photos[0]}
                    alt={selectedSpace.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                    <Camera className="w-10 h-10 text-purple-300" />
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-12 flex flex-col justify-end text-white">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <Badge className="mb-2 bg-purple-500 hover:bg-purple-600 border-0 text-[10px] h-5 px-2 backdrop-blur-sm">
                        {selectedSpace.space_type || 'Parking Space'}
                      </Badge>
                      <h2 className="text-xl font-bold leading-tight truncate mb-1">{selectedSpace.name}</h2>
                      <div className="flex items-center gap-1.5 text-white/90">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <p className="text-xs font-medium truncate">{selectedSpace.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <ScrollArea className="flex-1 p-5">
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Location</h4>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                            <MapPin className="w-4 h-4 text-blue-600" />
                          </div>
                          <p className="text-gray-700 leading-relaxed text-sm pt-1">{selectedSpace.address}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Pricing</h4>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center shrink-0">
                            <DollarSign className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-lg font-bold text-gray-900">${selectedSpace.hourly_rate}<span className="text-xs font-normal text-gray-500">/hr</span></p>
                            {selectedSpace.daily_rate && (
                              <p className="text-xs text-gray-600">${selectedSpace.daily_rate} per day</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Capacity</h4>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center shrink-0">
                            <Car className="w-4 h-4 text-orange-600" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{selectedSpace.total_spots} Total Spots</p>
                            <p className="text-xs text-gray-600">Availability: {selectedSpace.availability_status}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Host Note</h4>
                        <p className="text-gray-600 italic leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                          "{selectedSpace.description || 'No description provided.'}"
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-6">
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Amenities & Features</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSpace.amenities && selectedSpace.amenities.map((amenityId: string) => {
                        const amenity = amenitiesList.find(a => a.id === amenityId);
                        return amenity ? (
                          <Badge key={amenityId} variant="secondary" className="px-4 py-2 bg-gray-50 text-gray-700 border border-gray-100 flex items-center gap-2">
                            <amenity.icon className="w-4 h-4 text-purple-600" />
                            {amenity.label}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-6">
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Allowed Vehicles</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSpace.vehicle_types && selectedSpace.vehicle_types.map((typeId: string) => {
                        const type = vehicleTypesList.find(v => v.id === typeId);
                        return type ? (
                          <Badge key={typeId} variant="secondary" className="px-4 py-2 bg-purple-50 text-purple-700 border border-purple-100 flex items-center gap-2">
                            <Car className="w-4 h-4" />
                            {type.label}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>
              </ScrollArea>

              <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>Close</Button>
                <Button
                  className="bg-gradient-to-r from-purple-600 to-blue-600"
                  onClick={() => {
                    setIsViewDialogOpen(false);
                    handleEditClick(selectedSpace);
                  }}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Space
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Space Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] flex flex-col p-0 overflow-hidden bg-white border-0 professional-shadow-2xl">
          <DialogHeader className="p-6 border-b border-gray-100">
            <DialogTitle className="text-2xl font-bold text-gray-900">Edit Parking Space</DialogTitle>
          </DialogHeader>

          <ScrollArea className="flex-1 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Basic Info */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Space Name</Label>
                  <Input
                    id="edit-name"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="e.g. Downtown Garage Spot A"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-address">Full Address</Label>
                  <Input
                    id="edit-address"
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                    placeholder="123 Main St, City, Country"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-type">Space Type</Label>
                    <Select value={editType} onValueChange={setEditType}>
                      <SelectTrigger id="edit-type" className="w-full">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="garage">Covered Garage</SelectItem>
                        <SelectItem value="open-lot">Open Lot</SelectItem>
                        <SelectItem value="street">Street Parking</SelectItem>
                        <SelectItem value="underground">Underground</SelectItem>
                        <SelectItem value="building">Building Parking</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-spots">Total Spots</Label>
                    <Input
                      id="edit-spots"
                      type="number"
                      value={editTotalSpots}
                      onChange={(e) => setEditTotalSpots(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    rows={4}
                    placeholder="Tell drivers about accessibility, security, etc."
                  />
                </div>
              </div>

              {/* Pricing & Amenities */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-hourly">Hourly Rate ($)</Label>
                    <Input
                      id="edit-hourly"
                      type="number"
                      step="0.01"
                      value={editHourlyRate}
                      onChange={(e) => setEditHourlyRate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-daily">Daily Rate ($)</Label>
                    <Input
                      id="edit-daily"
                      type="number"
                      step="0.01"
                      value={editDailyRate}
                      onChange={(e) => setEditDailyRate(e.target.value)}
                      placeholder="Optional"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Amenities</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {amenitiesList.map((amenity) => (
                      <Button
                        key={amenity.id}
                        variant={editAmenities.includes(amenity.id) ? 'default' : 'outline'}
                        className={`justify-start gap-2 h-auto py-2 px-3 text-xs w-full ${editAmenities.includes(amenity.id) ? 'bg-purple-600' : ''}`}
                        onClick={() => toggleEditAmenity(amenity.id)}
                      >
                        <amenity.icon className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{amenity.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Allowed Vehicles</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {vehicleTypesList.map((type) => (
                      <Button
                        key={type.id}
                        variant={editVehicleTypes.includes(type.id) ? 'default' : 'outline'}
                        className={`justify-start gap-2 h-auto py-2 px-3 text-xs w-full ${editVehicleTypes.includes(type.id) ? 'bg-blue-600' : ''}`}
                        onClick={() => toggleEditVehicleType(type.id)}
                      >
                        <Car className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{type.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-orange-800">Available Status</p>
                      <p className="text-xs text-gray-500">
                        Current: <span className={`font-bold uppercase ${editAvailability === 'available' ? 'text-green-600' : 'text-orange-600'}`}>{editAvailability}</span>
                      </p>
                    </div>
                    <Switch
                      checked={editAvailability === 'available'}
                      onCheckedChange={(checked: boolean) => {
                        setEditAvailability(checked ? 'available' : 'occupied');
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>

          <DialogFooter className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-3">
            <Button
              variant="destructive"
              onClick={handleDeleteSpace}
              disabled={isUpdating}
              className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Space
            </Button>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} disabled={isUpdating}>
                Cancel
              </Button>
              <Button
                className="bg-gradient-to-r from-purple-600 to-blue-600 min-w-[120px]"
                onClick={handleUpdateSpace}
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}