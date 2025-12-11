import { Clock, MapPin, Calendar, CheckCircle, XCircle, Timer, Navigation, Star, RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export function BookingsPage() {
  const activeBookings = [
    {
      id: 1,
      location: "Central Plaza Parking",
      address: "123 Main St",
      date: "Today",
      time: "2:00 PM - 4:00 PM",
      price: "$5.00",
      status: "active",
      timeLeft: "1h 23m",
      spotNumber: "A-12"
    }
  ];

  const upcomingBookings = [
    {
      id: 2,
      location: "Downtown Garage",
      address: "456 Business Ave",
      date: "Tomorrow",
      time: "9:00 AM - 11:00 AM",
      price: "$6.00",
      status: "confirmed",
      spotNumber: "B-08"
    },
    {
      id: 3,
      location: "Mall Parking",
      address: "789 Shopping Blvd",
      date: "Dec 30",
      time: "3:00 PM - 6:00 PM",
      price: "$4.50",
      status: "confirmed",
      spotNumber: "C-15"
    },
    {
      id: 6,
      location: "Business District",
      address: "100 Corporate Dr",
      date: "Jan 2",
      time: "8:00 AM - 5:00 PM",
      price: "$32.00",
      status: "confirmed",
      spotNumber: "D-22"
    }
  ];

  const pastBookings = [
    {
      id: 4,
      location: "City Center Lot",
      address: "321 Urban St",
      date: "Dec 26",
      time: "10:00 AM - 2:00 PM",
      price: "$8.00",
      status: "completed",
      rating: 4.5
    },
    {
      id: 5,
      location: "Airport Parking",
      address: "Airport Terminal",
      date: "Dec 20",
      time: "6:00 AM - 8:00 PM",
      price: "$25.00",
      status: "completed",
      rating: 4.8
    },
    {
      id: 7,
      location: "Sports Stadium",
      address: "Sports Complex",
      date: "Dec 15",
      time: "6:00 PM - 11:00 PM",
      price: "$15.00",
      status: "completed",
      rating: 4.2
    },
    {
      id: 8,
      location: "Shopping Mall",
      address: "Retail Center",
      date: "Dec 10",
      time: "1:00 PM - 4:00 PM",
      price: "$7.50",
      status: "completed",
      rating: 4.6
    }
  ];

  return (
    <div className="space-y-8">
      {/* Enhanced Page Header */}
      <div className="text-center space-y-4 animate-fade-in">
        <h2 className="text-4xl font-bold text-gray-900">My Bookings</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Manage your parking reservations and track your session history
        </p>
      </div>

      {/* Enhanced Active Booking Alert */}
      {activeBookings.length > 0 && (
        <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-8 hover-lift professional-shadow-xl border-0 relative overflow-hidden animate-slide-in-up">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Timer className="w-8 h-8 text-white animate-pulse" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold">Active Parking Session</h3>
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                </div>
                <p className="text-green-100 text-lg mb-1">
                  Time remaining: <span className="font-bold text-white">{activeBookings[0].timeLeft}</span>
                </p>
                <p className="text-green-100">
                  Location: <span className="font-medium text-white">{activeBookings[0].location}</span>
                </p>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" className="border-white/30 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-3">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Extend Time
                </Button>
                <Button className="bg-white text-green-600 hover:bg-gray-100 px-6 py-3 font-semibold">
                  <Navigation className="w-4 h-4 mr-2" />
                  Navigate
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Enhanced Bookings Tabs */}
      <Tabs defaultValue="upcoming" className="space-y-8">
        <div className="flex justify-center">
          <TabsList className="bg-white/90 backdrop-blur-sm professional-shadow border-0 p-2 rounded-2xl">
            <TabsTrigger 
              value="active" 
              className="px-6 py-3 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white transition-all duration-300"
            >
              <Timer className="w-4 h-4 mr-2" />
              Active ({activeBookings.length})
            </TabsTrigger>
            <TabsTrigger 
              value="upcoming" 
              className="px-6 py-3 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all duration-300"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Upcoming ({upcomingBookings.length})
            </TabsTrigger>
            <TabsTrigger 
              value="past" 
              className="px-6 py-3 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-600 data-[state=active]:to-gray-700 data-[state=active]:text-white transition-all duration-300"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Past ({pastBookings.length})
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="active" className="space-y-8">
          {activeBookings.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {activeBookings.map((booking, index) => (
                <Card key={booking.id} className={`glass-card professional-shadow-lg hover:professional-shadow-xl transition-all duration-300 hover-lift border-0 animate-fade-in stagger-${index + 1}`}>
                  <div className="p-8 space-y-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center hover-scale transition-all duration-300">
                          <MapPin className="w-8 h-8 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-gray-900 mb-2">{booking.location}</h4>
                          <p className="text-gray-600 mb-3">{booking.address}</p>
                          <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-300 px-3 py-1">
                            Spot {booking.spotNumber}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600 mb-2">{booking.price}</div>
                        <Badge className="bg-green-500 hover:bg-green-600 px-3 py-1">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-2"></div>
                          Active Now
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-green-700 font-medium mb-1">Session Time</p>
                          <p className="font-semibold text-gray-900">{booking.date} • {booking.time}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-green-700 font-medium mb-1">Time Remaining</p>
                          <p className="font-semibold text-green-600 text-lg">{booking.timeLeft}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" className="flex-1 h-12 border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50">
                        <Navigation className="w-4 h-4 mr-2" />
                        Navigate
                      </Button>
                      <Button variant="destructive" className="flex-1 h-12 bg-red-500 hover:bg-red-600">
                        <XCircle className="w-4 h-4 mr-2" />
                        End Session
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 animate-fade-in">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Timer className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">No Active Bookings</h3>
              <p className="text-lg text-gray-600 mb-6">You don't have any ongoing parking sessions</p>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-3">
                Find Parking Now
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {upcomingBookings.map((booking, index) => (
              <Card key={booking.id} className={`glass-card professional-shadow hover:professional-shadow-lg transition-all duration-300 hover-lift border-0 animate-fade-in stagger-${(index % 3) + 1}`}>
                <div className="p-6 space-y-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center hover-scale transition-all duration-300">
                        <Calendar className="w-7 h-7 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 mb-1">{booking.location}</h4>
                        <p className="text-sm text-gray-600 mb-3">{booking.address}</p>
                        <Badge variant="outline" className="border-purple-200 text-purple-700 bg-purple-50 px-3 py-1">
                          Spot {booking.spotNumber}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-purple-600 mb-2">{booking.price}</div>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700 px-3 py-1">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Confirmed
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-200">
                    <p className="text-sm text-purple-700 font-medium mb-1">Scheduled Time</p>
                    <p className="font-semibold text-gray-900">{booking.date} • {booking.time}</p>
                  </div>

                  <div className="flex gap-3">
                    <Button size="sm" variant="outline" className="flex-1 h-10 border-2 border-gray-300 hover:border-purple-400 hover:bg-purple-50">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      Modify
                    </Button>
                    <Button size="sm" variant="destructive" className="flex-1 h-10 bg-red-500 hover:bg-red-600">
                      <XCircle className="w-4 h-4 mr-1" />
                      Cancel
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="past" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {pastBookings.map((booking, index) => (
              <Card key={booking.id} className={`glass-card professional-shadow hover:professional-shadow-lg transition-all duration-300 hover-lift border-0 animate-fade-in stagger-${(index % 3) + 1}`}>
                <div className="p-6 space-y-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center hover-scale transition-all duration-300">
                        <CheckCircle className="w-7 h-7 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 mb-1">{booking.location}</h4>
                        <p className="text-sm text-gray-600 mb-3">{booking.address}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${i < Math.floor(booking.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                            ))}
                          </div>
                          <span className="text-sm font-medium text-gray-700">{booking.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-semibold text-gray-700 mb-2">{booking.price}</div>
                      <Badge variant="outline" className="border-gray-300 text-gray-600 bg-gray-50 px-3 py-1">
                        Completed
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                    <p className="text-sm text-gray-600 font-medium mb-1">Date & Time</p>
                    <p className="font-semibold text-gray-900">{booking.date} • {booking.time}</p>
                  </div>

                  <Button variant="outline" className="w-full h-12 border-2 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-400 font-medium">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Book Again
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}