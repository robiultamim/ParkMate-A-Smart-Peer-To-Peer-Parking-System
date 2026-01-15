import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';
import { Clock, CheckCircle, XCircle, MapPin, Car, User, Phone, Star, Timer } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar } from '../ui/avatar';
import { Label } from '../ui/label';

export function BookingManagementPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      // Fetch bookings for spots owned by current user
      // Assuming parking_spaces has owner_id and bookings has parking_spot_id FK to parking_spaces

      // First get my spots
      const { data: spots, error: spotsError } = await supabase
        .from('parking_spaces')
        .select('id')
        .eq('owner_id', user!.id);

      if (spotsError) throw spotsError;

      const spotIds = spots.map(s => s.id);

      if (spotIds.length === 0) {
        setBookings([]);
        setLoading(false);
        return;
      }

      // Then get bookings for those spots
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          parking_spaces!space_id (name, address),
          profiles:driver_id (full_name, phone_number, avatar_url) 
        `) // Assuming 'profiles' relationship
        .in('space_id', spotIds)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookingAction = async (bookingId: number, action: 'approve' | 'reject') => {
    const status = action === 'approve' ? 'confirmed' : 'rejected';

    // Optimistic update
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status } : b));

    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', bookingId);

      if (error) throw error;

      toast.success(`Booking ${action}d successfully`);
    } catch (error) {
      console.error('Error updating booking:', error);
      toast.error('Failed to update booking status');
      // Revert optimistic update
      fetchBookings();
    }
  };

  const pendingBookings = bookings.filter(b => b.status === 'pending').map(b => ({
    id: b.id,
    customerName: b.profiles?.full_name || 'Unknown User',
    customerRating: 5.0, // Placeholder
    customerPhone: b.profiles?.phone_number || 'N/A',
    space: b.parking_spaces?.name || 'Unknown Space',
    spotRequested: 'General',
    vehicle: `${b.vehicle_type} (${b.license_plate})`,
    vehicleType: b.vehicle_type,
    checkIn: new Date(b.start_time).toLocaleString(),
    checkOut: new Date(b.end_time).toLocaleString(),
    duration: `${Math.ceil((new Date(b.end_time).getTime() - new Date(b.start_time).getTime()) / (1000 * 60 * 60))} hours`,
    totalAmount: b.total_price,
    bookingTime: new Date(b.created_at).toLocaleDateString(),
    notes: ''
  }));

  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').map(b => ({
    id: b.id,
    customerName: b.profiles?.full_name || 'Unknown User',
    customerRating: 5.0,
    space: b.parking_spaces?.name,
    spot: 'Assigned',
    vehicle: `${b.vehicle_type} (${b.license_plate})`,
    vehicleType: b.vehicle_type,
    checkIn: new Date(b.start_time).toLocaleString(),
    checkOut: new Date(b.end_time).toLocaleString(),
    duration: `${Math.ceil((new Date(b.end_time).getTime() - new Date(b.start_time).getTime()) / (1000 * 60 * 60))} hours`,
    totalAmount: b.total_price,
    status: 'confirmed'
  }));

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading bookings...</div>;
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-6 pb-24">
      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 p-3 text-center">
          <p className="text-2xl font-bold text-orange-600">{pendingBookings.length}</p>
          <p className="text-xs text-gray-600">Pending</p>
        </Card>
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 p-3 text-center">
          <p className="text-2xl font-bold text-green-600">{confirmedBookings.length}</p>
          <p className="text-xs text-gray-600">Confirmed</p>
        </Card>
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 p-3 text-center">
          <p className="text-2xl font-bold text-blue-600">12</p>
          <p className="text-xs text-gray-600">Today Total</p>
        </Card>
      </div>

      {/* Booking Tabs */}
      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingBookings.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Booking Requests</h3>
                <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                  {pendingBookings.length} pending
                </Badge>
              </div>

              {pendingBookings.map((booking) => (
                <Card key={booking.id} className="bg-white/80 backdrop-blur-sm border-white/20 p-4 space-y-4">
                  {/* Customer Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{booking.customerName}</h4>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600">{booking.customerRating}</span>
                          </div>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-500">{booking.bookingTime}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-purple-600">${booking.totalAmount.toFixed(2)}</div>
                      <div className="text-sm text-gray-500">{booking.duration}</div>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{booking.space}</span>
                      <Badge variant="outline" className="text-xs">{booking.spotRequested}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Car className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{booking.vehicle}</span>
                      <Badge variant="outline" className="text-xs">{booking.vehicleType}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{booking.checkIn} - {booking.checkOut}</span>
                    </div>
                    {booking.notes && (
                      <div className="bg-gray-50 p-2 rounded text-gray-600 text-xs">
                        <strong>Note:</strong> {booking.notes}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2 border-t border-gray-200">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleBookingAction(booking.id, 'reject')}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Decline
                    </Button>
                    <Button
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600"
                      onClick={() => handleBookingAction(booking.id, 'approve')}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No pending booking requests</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="confirmed" className="space-y-4">
          <div className="space-y-3">
            {confirmedBookings.map((booking) => (
              <Card key={booking.id} className="bg-white/80 backdrop-blur-sm border-white/20 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{booking.customerName}</h4>
                      <p className="text-sm text-gray-600">{booking.space} - Spot {booking.spot}</p>
                      <p className="text-xs text-gray-500">{booking.checkIn} - {booking.checkOut}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-600">${booking.totalAmount.toFixed(2)}</div>
                    <Badge className="bg-green-500">Confirmed</Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <div className="text-center py-8">
            <Timer className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No active bookings</p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Booking Settings */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/20 p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Booking Settings</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <Label>Auto-approve bookings</Label>
              <p className="text-sm text-gray-600">Automatically accept booking requests</p>
            </div>
            <Button variant="outline" size="sm">
              Configure
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Minimum booking duration</Label>
              <p className="text-sm text-gray-600">Set minimum time requirement</p>
            </div>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}