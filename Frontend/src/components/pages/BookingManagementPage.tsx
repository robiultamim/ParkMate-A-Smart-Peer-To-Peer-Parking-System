import { Clock, CheckCircle, XCircle, MapPin, Car, User, Phone, Star, Timer } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar } from '../ui/avatar';
import { useState } from 'react';

export function BookingManagementPage() {
  const [pendingBookings, setPendingBookings] = useState([
    {
      id: 1,
      customerName: "John Doe",
      customerRating: 4.8,
      customerPhone: "+1234567890",
      space: "Central Plaza Garage",
      spotRequested: "Any available",
      vehicle: "Toyota Camry (ABC-123)",
      vehicleType: "Car",
      checkIn: "Today 2:00 PM",
      checkOut: "Today 5:00 PM",
      duration: "3 hours",
      totalAmount: 7.50,
      bookingTime: "2 minutes ago",
      notes: "Need a spot close to the elevator if possible"
    },
    {
      id: 2,
      customerName: "Sarah Wilson",
      customerRating: 4.6,
      customerPhone: "+1987654321",
      space: "Mall Parking Lot",
      spotRequested: "Covered area",
      vehicle: "Honda CR-V (XYZ-789)",
      vehicleType: "SUV",
      checkIn: "Tomorrow 10:00 AM",
      checkOut: "Tomorrow 2:00 PM", 
      duration: "4 hours",
      totalAmount: 10.00,
      bookingTime: "15 minutes ago",
      notes: "First time parking here"
    }
  ]);

  const confirmedBookings = [
    {
      id: 3,
      customerName: "Mike Johnson",
      customerRating: 4.9,
      space: "Central Plaza Garage",
      spot: "A-12",
      vehicle: "BMW 320i (DEF-456)",
      vehicleType: "Car",
      checkIn: "Today 6:00 PM",
      checkOut: "Today 9:00 PM",
      duration: "3 hours",
      totalAmount: 7.50,
      status: "confirmed"
    }
  ];

  const handleBookingAction = (bookingId: number, action: 'approve' | 'reject') => {
    setPendingBookings(prev => prev.filter(booking => booking.id !== bookingId));
    // In real app, would make API call here
  };

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