import { useState } from 'react';
import { Calendar, Clock, MapPin, Car, Bike, Truck, Plus, Edit, Trash2, Eye, Bell, Info } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Switch } from '../ui/switch';
import { Textarea } from '../ui/textarea';
import { Alert, AlertDescription } from '../ui/alert';

export function ReserveLaterPage() {
  const [newReservation, setNewReservation] = useState({
    location: '',
    date: '',
    startTime: '',
    duration: '2',
    vehicleType: 'car',
    recurring: false,
    recurringType: 'weekly',
    endDate: '',
    reminderTime: '30',
    notes: ''
  });

  const [reservations, setReservations] = useState([
    {
      id: 1,
      location: 'Central Plaza Parking',
      address: '123 Main Street, Downtown',
      date: '2024-12-15',
      startTime: '09:00',
      duration: 4,
      vehicleType: 'car',
      status: 'confirmed',
      price: 10.00,
      recurring: false,
      reminderSet: true
    },
    {
      id: 2,
      location: 'Business District Garage',
      address: '456 Business Ave',
      date: '2024-12-16',
      startTime: '14:30',
      duration: 2,
      vehicleType: 'car',
      status: 'pending',
      price: 6.00,
      recurring: true,
      recurringType: 'weekly',
      reminderSet: true
    },
    {
      id: 3,
      location: 'Mall Parking',
      address: '789 Shopping Center',
      date: '2024-12-20',
      startTime: '18:00',
      duration: 3,
      vehicleType: 'bike',
      status: 'confirmed',
      price: 3.00,
      recurring: false,
      reminderSet: false
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreateReservation = () => {
    // Add validation and create new reservation
    const reservation = {
      id: Date.now(),
      location: newReservation.location,
      address: 'Address placeholder',
      date: newReservation.date,
      startTime: newReservation.startTime,
      duration: parseInt(newReservation.duration),
      vehicleType: newReservation.vehicleType,
      status: 'pending',
      price: calculatePrice(newReservation.vehicleType, parseInt(newReservation.duration)),
      recurring: newReservation.recurring,
      recurringType: newReservation.recurringType,
      reminderSet: true
    };
    
    setReservations([...reservations, reservation]);
    setShowCreateForm(false);
    // Reset form
    setNewReservation({
      location: '',
      date: '',
      startTime: '',
      duration: '2',
      vehicleType: 'car',
      recurring: false,
      recurringType: 'weekly',
      endDate: '',
      reminderTime: '30',
      notes: ''
    });
  };

  const calculatePrice = (vehicleType: string, duration: number) => {
    const rates = {
      car: 2.50,
      bike: 1.00,
      truck: 4.00
    };
    return rates[vehicleType] * duration;
  };

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case 'car': return Car;
      case 'bike': return Bike;
      case 'truck': return Truck;
      default: return Car;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Reserve Later</h2>
          <p className="text-gray-600 text-lg">Schedule parking for future dates and manage recurring bookings</p>
        </div>
        <Button 
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Reservation
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="upcoming">
            Upcoming
            <Badge className="ml-2 bg-blue-500 text-white text-xs">
              {reservations.filter(r => r.status !== 'cancelled').length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="recurring">Recurring</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="create">Create New</TabsTrigger>
        </TabsList>

        {/* Upcoming Reservations */}
        <TabsContent value="upcoming" className="space-y-4">
          {reservations.filter(r => r.status !== 'cancelled').length === 0 ? (
            <Card className="p-8 text-center">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Upcoming Reservations</h3>
              <p className="text-gray-600 mb-4">Schedule your first future parking reservation to get started.</p>
              <Button 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                onClick={() => setShowCreateForm(true)}
              >
                Create Reservation
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {reservations.filter(r => r.status !== 'cancelled').map((reservation) => {
                const VehicleIcon = getVehicleIcon(reservation.vehicleType);
                return (
                  <Card key={reservation.id} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
                          <VehicleIcon className="w-6 h-6 text-purple-600" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900">{reservation.location}</h4>
                              <p className="text-gray-600">{reservation.address}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-bold text-purple-600">${reservation.price.toFixed(2)}</div>
                              <Badge className={getStatusColor(reservation.status)}>
                                {reservation.status}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(reservation.date)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{formatTime(reservation.startTime)} ({reservation.duration}h)</span>
                            </div>
                            {reservation.recurring && (
                              <Badge variant="outline" className="border-blue-200 text-blue-700">
                                Recurring {reservation.recurringType}
                              </Badge>
                            )}
                            {reservation.reminderSet && (
                              <div className="flex items-center gap-1 text-green-600">
                                <Bell className="w-4 h-4" />
                                <span>Reminder set</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              View Details
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4 mr-1" />
                              Modify
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4 mr-1" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* Recurring Reservations */}
        <TabsContent value="recurring" className="space-y-4">
          <div className="space-y-4">
            {reservations.filter(r => r.recurring).map((reservation) => {
              const VehicleIcon = getVehicleIcon(reservation.vehicleType);
              return (
                <Card key={reservation.id} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
                      <VehicleIcon className="w-6 h-6 text-purple-600" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{reservation.location}</h4>
                          <p className="text-gray-600">{reservation.address}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-purple-600">${reservation.price.toFixed(2)}</div>
                          <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                            {reservation.recurringType}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>Every {reservation.recurringType} at {formatTime(reservation.startTime)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>{reservation.duration} hours duration</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit Series
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View Schedule
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4 mr-1" />
                          Stop Recurring
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* History */}
        <TabsContent value="history" className="space-y-4">
          <Card className="p-6 text-center">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Reservation History</h3>
            <p className="text-gray-600">Your past reservations will appear here.</p>
          </Card>
        </TabsContent>

        {/* Create New Reservation */}
        <TabsContent value="create" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Schedule New Reservation</h3>
            
            <div className="space-y-6">
              {/* Location Selection */}
              <div>
                <Label htmlFor="location">Parking Location</Label>
                <Select value={newReservation.location} onValueChange={(value) => setNewReservation({...newReservation, location: value})}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select parking location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="central-plaza">Central Plaza Parking</SelectItem>
                    <SelectItem value="downtown-garage">Downtown Garage</SelectItem>
                    <SelectItem value="business-district">Business District Garage</SelectItem>
                    <SelectItem value="mall-parking">Mall Parking</SelectItem>
                    <SelectItem value="sports-arena">Sports Arena Parking</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newReservation.date}
                    onChange={(e) => setNewReservation({...newReservation, date: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={newReservation.startTime}
                    onChange={(e) => setNewReservation({...newReservation, startTime: e.target.value})}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="duration">Duration (hours)</Label>
                  <Select value={newReservation.duration} onValueChange={(value) => setNewReservation({...newReservation, duration: value})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 hour</SelectItem>
                      <SelectItem value="2">2 hours</SelectItem>
                      <SelectItem value="3">3 hours</SelectItem>
                      <SelectItem value="4">4 hours</SelectItem>
                      <SelectItem value="6">6 hours</SelectItem>
                      <SelectItem value="8">8 hours</SelectItem>
                      <SelectItem value="24">Full day (24 hours)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Vehicle Type */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Vehicle Type</Label>
                <RadioGroup 
                  value={newReservation.vehicleType} 
                  onValueChange={(value) => setNewReservation({...newReservation, vehicleType: value})}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                      <RadioGroupItem value="car" id="car-new" className="peer sr-only" />
                      <Label
                        htmlFor="car-new"
                        className="flex flex-col items-center gap-3 p-4 border-2 rounded-lg cursor-pointer peer-checked:border-purple-500 peer-checked:bg-purple-50 hover:bg-gray-50"
                      >
                        <Car className="w-8 h-8 text-purple-600" />
                        <div className="text-center">
                          <div className="font-medium">Car</div>
                          <div className="text-sm text-gray-600">$2.50/hour</div>
                        </div>
                      </Label>
                    </div>

                    <div className="relative">
                      <RadioGroupItem value="bike" id="bike-new" className="peer sr-only" />
                      <Label
                        htmlFor="bike-new"
                        className="flex flex-col items-center gap-3 p-4 border-2 rounded-lg cursor-pointer peer-checked:border-purple-500 peer-checked:bg-purple-50 hover:bg-gray-50"
                      >
                        <Bike className="w-8 h-8 text-purple-600" />
                        <div className="text-center">
                          <div className="font-medium">Motorcycle/Bike</div>
                          <div className="text-sm text-gray-600">$1.00/hour</div>
                        </div>
                      </Label>
                    </div>

                    <div className="relative">
                      <RadioGroupItem value="truck" id="truck-new" className="peer sr-only" />
                      <Label
                        htmlFor="truck-new"
                        className="flex flex-col items-center gap-3 p-4 border-2 rounded-lg cursor-pointer peer-checked:border-purple-500 peer-checked:bg-purple-50 hover:bg-gray-50"
                      >
                        <Truck className="w-8 h-8 text-purple-600" />
                        <div className="text-center">
                          <div className="font-medium">Truck/Large Vehicle</div>
                          <div className="text-sm text-gray-600">$4.00/hour</div>
                        </div>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Recurring Options */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Switch
                    id="recurring"
                    checked={newReservation.recurring}
                    onCheckedChange={(checked) => setNewReservation({...newReservation, recurring: checked})}
                  />
                  <Label htmlFor="recurring">Make this a recurring reservation</Label>
                </div>
                
                {newReservation.recurring && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-purple-50 rounded-lg">
                    <div>
                      <Label htmlFor="recurringType">Repeat</Label>
                      <Select value={newReservation.recurringType} onValueChange={(value) => setNewReservation({...newReservation, recurringType: value})}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="biweekly">Bi-weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="endDate">End Date (Optional)</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={newReservation.endDate}
                        onChange={(e) => setNewReservation({...newReservation, endDate: e.target.value})}
                        min={newReservation.date}
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Reminder Settings */}
              <div>
                <Label htmlFor="reminderTime">Reminder</Label>
                <Select value={newReservation.reminderTime} onValueChange={(value) => setNewReservation({...newReservation, reminderTime: value})}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes before</SelectItem>
                    <SelectItem value="30">30 minutes before</SelectItem>
                    <SelectItem value="60">1 hour before</SelectItem>
                    <SelectItem value="120">2 hours before</SelectItem>
                    <SelectItem value="1440">1 day before</SelectItem>
                    <SelectItem value="none">No reminder</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Special Notes */}
              <div>
                <Label htmlFor="notes">Special Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Any special requirements or notes for this reservation..."
                  value={newReservation.notes}
                  onChange={(e) => setNewReservation({...newReservation, notes: e.target.value})}
                  className="mt-1"
                  rows={3}
                />
              </div>

              {/* Price Estimate */}
              {newReservation.vehicleType && newReservation.duration && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-green-800">Estimated Cost:</span>
                    <span className="text-xl font-bold text-green-700">
                      ${calculatePrice(newReservation.vehicleType, parseInt(newReservation.duration)).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-green-600 mt-1">
                    Final price may vary based on additional services and fees
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6">
                <Button 
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  onClick={handleCreateReservation}
                  disabled={!newReservation.location || !newReservation.date || !newReservation.startTime}
                >
                  Create Reservation
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Requirements Information */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">📋 Reserve Later Requirements & Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-medium text-blue-900 mb-2">Booking Requirements:</h4>
            <ul className="space-y-1 text-blue-800">
              <li>• Minimum 2 hours advance booking required</li>
              <li>• Maximum 30 days advance booking allowed</li>
              <li>• Valid payment method required for confirmation</li>
              <li>• License plate verification for vehicle type</li>
              <li>• Email/SMS confirmation with QR code</li>
              <li>• Automatic reminders based on user preference</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-blue-900 mb-2">Advanced Features:</h4>
            <ul className="space-y-1 text-blue-800">
              <li>• Recurring reservations (daily, weekly, monthly)</li>
              <li>• Smart availability prediction and suggestions</li>
              <li>• Integration with calendar apps</li>
              <li>• Group booking for multiple vehicles</li>
              <li>• Weather-based recommendations</li>
              <li>• Modification and cancellation up to 1 hour before</li>
            </ul>
          </div>
        </div>
        
        <Alert className="mt-4">
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Cancellation Policy:</strong> Free cancellation up to 1 hour before start time. 
            50% refund for cancellations within 1 hour. No refund for no-shows.
          </AlertDescription>
        </Alert>
      </Card>
    </div>
  );
}