import { useState } from 'react';
import { MapPin, Clock, Calendar, CreditCard, Car, Bike, Truck, Star, Info, Check, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { BackButton } from '../ui/back-button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Separator } from '../ui/separator';
import { Alert, AlertDescription } from '../ui/alert';

interface BookNowPageProps {
  spotId?: string;
  onBack?: () => void;
}

export function BookNowPage({ spotId, onBack }: BookNowPageProps) {
  const [selectedVehicle, setSelectedVehicle] = useState('car');
  const [selectedDuration, setSelectedDuration] = useState('2');
  const [paymentMethod, setPaymentMethod] = useState('bkash');

  // Mock parking spot data
  const spotData = {
    id: spotId || '1',
    name: 'Central Plaza Parking',
    address: '123 Main Street, Downtown',
    distance: '0.2 miles away',
    rating: 4.8,
    reviews: 127,
    type: 'Covered Garage',
    security: 'CCTV Monitored',
    features: ['24/7 Access', 'Security Guard', 'Car Wash', 'EV Charging'],
    pricing: {
      car: { hourly: 2.50, daily: 15.00 },
      bike: { hourly: 1.00, daily: 6.00 },
      truck: { hourly: 4.00, daily: 25.00 }
    },
    availability: 8,
    images: ['/placeholder-parking.jpg']
  };

  const calculateTotal = () => {
    const vehicleRate = spotData.pricing[selectedVehicle].hourly;
    const hours = parseInt(selectedDuration);
    const subtotal = vehicleRate * hours;
    const serviceFee = subtotal * 0.1; // 10% service fee
    const total = subtotal + serviceFee;
    return { subtotal, serviceFee, total };
  };

  const { subtotal, serviceFee, total } = calculateTotal();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Book Parking Spot</h2>
          <p className="text-gray-600 text-lg">Complete your reservation details</p>
        </div>
        {onBack && (
          <BackButton onClick={onBack} variant="outline" />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Booking Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Parking Spot Details */}
          <Card className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
                <MapPin className="w-10 h-10 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{spotData.name}</h3>
                <p className="text-gray-600 mb-2">{spotData.address}</p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{spotData.rating} ({spotData.reviews} reviews)</span>
                  </div>
                  <Badge variant="outline" className="border-purple-200 text-purple-700">
                    {spotData.type}
                  </Badge>
                  <span className="text-green-600">{spotData.availability} spots available</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Parking Features</h4>
              <div className="grid grid-cols-2 gap-3">
                {spotData.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Information */}
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                This parking spot is {spotData.security} and includes 24/7 security monitoring for your vehicle's safety.
              </AlertDescription>
            </Alert>
          </Card>

          {/* Vehicle Selection */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Vehicle Type</h3>
            <RadioGroup value={selectedVehicle} onValueChange={setSelectedVehicle}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <RadioGroupItem value="car" id="car" className="peer sr-only" />
                  <Label
                    htmlFor="car"
                    className="flex flex-col items-center gap-3 p-4 border-2 rounded-lg cursor-pointer peer-checked:border-purple-500 peer-checked:bg-purple-50 hover:bg-gray-50"
                  >
                    <Car className="w-8 h-8 text-purple-600" />
                    <div className="text-center">
                      <div className="font-medium">Car</div>
                      <div className="text-sm text-gray-600">${spotData.pricing.car.hourly}/hour</div>
                    </div>
                  </Label>
                </div>

                <div className="relative">
                  <RadioGroupItem value="bike" id="bike" className="peer sr-only" />
                  <Label
                    htmlFor="bike"
                    className="flex flex-col items-center gap-3 p-4 border-2 rounded-lg cursor-pointer peer-checked:border-purple-500 peer-checked:bg-purple-50 hover:bg-gray-50"
                  >
                    <Bike className="w-8 h-8 text-purple-600" />
                    <div className="text-center">
                      <div className="font-medium">Motorcycle/Bike</div>
                      <div className="text-sm text-gray-600">${spotData.pricing.bike.hourly}/hour</div>
                    </div>
                  </Label>
                </div>

                <div className="relative">
                  <RadioGroupItem value="truck" id="truck" className="peer sr-only" />
                  <Label
                    htmlFor="truck"
                    className="flex flex-col items-center gap-3 p-4 border-2 rounded-lg cursor-pointer peer-checked:border-purple-500 peer-checked:bg-purple-50 hover:bg-gray-50"
                  >
                    <Truck className="w-8 h-8 text-purple-600" />
                    <div className="text-center">
                      <div className="font-medium">Truck/Large Vehicle</div>
                      <div className="text-sm text-gray-600">${spotData.pricing.truck.hourly}/hour</div>
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </Card>

          {/* Booking Duration */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Duration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start-time">Start Time</Label>
                <Input
                  id="start-time"
                  type="datetime-local"
                  defaultValue={new Date().toISOString().slice(0, 16)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="duration">Duration (hours)</Label>
                <Select value={selectedDuration} onValueChange={setSelectedDuration}>
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
          </Card>

          {/* Vehicle Details */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="license-plate">License Plate Number</Label>
                <Input
                  id="license-plate"
                  placeholder="Enter license plate"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="vehicle-model">Vehicle Make/Model (Optional)</Label>
                <Input
                  id="vehicle-model"
                  placeholder="e.g., Toyota Camry"
                  className="mt-1"
                />
              </div>
            </div>
          </Card>

          {/* Special Requirements */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Special Requirements</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="ev-charging" className="rounded" />
                <Label htmlFor="ev-charging">EV Charging Required (+$2/hour)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="valet" className="rounded" />
                <Label htmlFor="valet">Valet Service (+$5)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="car-wash" className="rounded" />
                <Label htmlFor="car-wash">Car Wash Service (+$10)</Label>
              </div>
            </div>
          </Card>
        </div>

        {/* Booking Summary Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Vehicle Type</span>
                <span className="font-medium capitalize">{selectedVehicle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration</span>
                <span className="font-medium">{selectedDuration} hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rate</span>
                <span className="font-medium">${spotData.pricing[selectedVehicle].hourly}/hour</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Service Fee (10%)</span>
                <span className="font-medium">${serviceFee.toFixed(2)}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between text-lg">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-purple-600">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="mb-6">
              <Label className="text-sm font-medium mb-3 block">Payment Method</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="bkash" id="bkash" />
                    <Label htmlFor="bkash" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-pink-600 rounded flex items-center justify-center text-white text-xs font-bold">bK</div>
                        <span>bKash</span>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="nagad" id="nagad" />
                    <Label htmlFor="nagad" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center text-white text-xs font-bold">N</div>
                        <span>Nagad</span>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="rocket" id="rocket" />
                    <Label htmlFor="rocket" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center text-white text-xs font-bold">R</div>
                        <span>Rocket</span>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-6 h-6 text-gray-600" />
                        <span>Credit/Debit Card</span>
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Terms and Conditions */}
            <div className="mb-6">
              <div className="flex items-start space-x-2">
                <input type="checkbox" id="terms" className="mt-1 rounded" />
                <Label htmlFor="terms" className="text-sm text-gray-600 leading-tight">
                  I agree to the <a href="#" className="text-purple-600 hover:underline">Terms of Service</a> and <a href="#" className="text-purple-600 hover:underline">Cancellation Policy</a>
                </Label>
              </div>
            </div>

            {/* Book Now Button */}
            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg py-3"
              size="lg"
            >
              <CreditCard className="w-5 h-5 mr-2" />
              Book Now - ${total.toFixed(2)}
            </Button>

            {/* Security Information */}
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-green-600 mt-0.5" />
                <div className="text-sm text-green-700">
                  <div className="font-medium">Secure Booking</div>
                  <div>Your payment is protected and spot is guaranteed upon confirmation.</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Requirements Information */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">📋 Booking Requirements & Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-medium text-blue-900 mb-2">Required Information:</h4>
            <ul className="space-y-1 text-blue-800">
              <li>• Valid license plate number</li>
              <li>• Mobile phone number for verification</li>
              <li>• Valid payment method</li>
              <li>• Arrive within 15 minutes of start time</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-blue-900 mb-2">Cancellation Policy:</h4>
            <ul className="space-y-1 text-blue-800">
              <li>• Free cancellation up to 1 hour before</li>
              <li>• 50% refund if cancelled within 1 hour</li>
              <li>• No refund for no-shows</li>
              <li>• Contact support for emergencies</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}