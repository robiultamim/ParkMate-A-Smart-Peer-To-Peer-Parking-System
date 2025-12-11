import { MapPin, Camera, Upload, Car, Shield, Zap, Clock, Plus, X, ImagePlus, DollarSign } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Badge } from '../ui/badge';
import { useState } from 'react';

export function AddSpacePage() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [vehicleTypes, setVehicleTypes] = useState<string[]>(['car']);

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

  const toggleAmenity = (amenityId: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenityId)
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  const toggleVehicleType = (typeId: string) => {
    setVehicleTypes(prev => 
      prev.includes(typeId)
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">{/* Modern desktop layout */}
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Add New Parking Space</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          List your parking space and start earning. Complete all sections below to create an attractive listing.
        </p>
      </div>

      {/* Photo Upload - Enhanced */}
      <Card className="glass-card professional-shadow-lg p-8 border-0">
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ImagePlus className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Space Photos</h3>
            <p className="text-gray-600">Add high-quality photos to attract more bookings</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((photo, index) => (
              <div key={index} className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden hover-lift professional-shadow">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-blue-200 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-purple-600" />
                </div>
                <Button 
                  size="icon" 
                  variant="destructive" 
                  className="absolute top-3 right-3 h-8 w-8 rounded-full professional-shadow"
                  onClick={() => setPhotos(photos.filter((_, i) => i !== index))}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            {photos.length < 6 && (
              <Button 
                variant="outline" 
                className="aspect-square border-dashed border-2 border-purple-300 bg-purple-50 hover:bg-purple-100 hover:border-purple-400 rounded-xl transition-all duration-300"
                onClick={() => setPhotos([...photos, `photo-${photos.length + 1}`])}
              >
                <div className="text-center">
                  <Plus className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <span className="text-sm font-medium text-purple-600">Add Photo</span>
                </div>
              </Button>
            )}
          </div>
          <p className="text-center text-sm text-gray-600">
            Add up to 6 photos of your parking space • High-resolution images perform better
          </p>
        </div>
      </Card>

      {/* Basic Details - Enhanced */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="glass-card professional-shadow-lg p-8 border-0">
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Basic Details</h3>
              <p className="text-gray-600">Essential information about your parking space</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="spaceName" className="text-base font-medium text-gray-900 mb-2 block">Space Name</Label>
                <Input 
                  id="spaceName" 
                  placeholder="e.g., Downtown Garage A"
                  className="bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500 h-12"
                />
              </div>
              
              <div>
                <Label htmlFor="address" className="text-base font-medium text-gray-900 mb-2 block">Full Address</Label>
                <Input 
                  id="address" 
                  placeholder="Full address of parking space"
                  className="bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500 h-12"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="spaceType" className="text-base font-medium text-gray-900 mb-2 block">Space Type</Label>
                  <Select>
                    <SelectTrigger className="bg-white border-gray-300 focus:border-purple-500 h-12">
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
                
                <div>
                  <Label htmlFor="totalSpots" className="text-base font-medium text-gray-900 mb-2 block">Number of Spots</Label>
                  <Input 
                    id="totalSpots" 
                    type="number"
                    placeholder="Number of spots"
                    className="bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500 h-12"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-base font-medium text-gray-900 mb-2 block">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe your parking space, access instructions, etc."
                  className="bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500 min-h-[120px]"
                  rows={4}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Pricing Section */}
        <Card className="glass-card professional-shadow-lg p-8 border-0">
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Pricing</h3>
              <p className="text-gray-600">Set competitive rates for your space</p>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hourlyRate" className="text-base font-medium text-gray-900 mb-2 block">Hourly Rate</Label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">$</span>
                    <Input 
                      id="hourlyRate" 
                      type="number"
                      step="0.25"
                      placeholder="2.50"
                      className="pl-12 bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500 h-12"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="dailyRate" className="text-base font-medium text-gray-900 mb-2 block">Daily Rate</Label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">$</span>
                    <Input 
                      id="dailyRate" 
                      type="number"
                      step="1"
                      placeholder="15.00"
                      className="pl-12 bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500 h-12"
                    />
                  </div>
                </div>
              </div>

              {/* Availability Settings */}
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900">Availability Settings</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <Label className="font-medium text-gray-900">24/7 Available</Label>
                      <p className="text-sm text-gray-600">Space is available all the time</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <Label className="font-medium text-gray-900">Instant Booking</Label>
                      <p className="text-sm text-gray-600">Allow automatic approvals</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <Label className="font-medium text-gray-900">Advance Booking</Label>
                      <p className="text-sm text-gray-600">Allow reservations in advance</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Vehicle Types and Amenities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Allowed Vehicle Types */}
        <Card className="glass-card professional-shadow-lg p-8 border-0">
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Allowed Vehicle Types</h3>
              <p className="text-gray-600">Select which vehicles can use your space</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {vehicleTypesList.map((type) => (
                <Button
                  key={type.id}
                  variant={vehicleTypes.includes(type.id) ? 'default' : 'outline'}
                  className={`flex items-center gap-4 justify-start h-auto p-4 rounded-xl transition-all duration-300 ${
                    vehicleTypes.includes(type.id) 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover-lift' 
                      : 'border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                  }`}
                  onClick={() => toggleVehicleType(type.id)}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    vehicleTypes.includes(type.id) 
                      ? 'bg-white/20' 
                      : 'bg-gradient-to-br from-purple-100 to-blue-100'
                  }`}>
                    <Car className={`w-5 h-5 ${vehicleTypes.includes(type.id) ? 'text-white' : 'text-purple-600'}`} />
                  </div>
                  <span className={`font-medium ${vehicleTypes.includes(type.id) ? 'text-white' : 'text-gray-900'}`}>
                    {type.label}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Amenities */}
        <Card className="glass-card professional-shadow-lg p-8 border-0">
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Amenities & Features</h3>
              <p className="text-gray-600">Highlight what makes your space special</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {amenitiesList.map((amenity) => (
                <Button
                  key={amenity.id}
                  variant={selectedAmenities.includes(amenity.id) ? 'default' : 'outline'}
                  className={`flex items-center gap-4 justify-start h-auto p-4 rounded-xl transition-all duration-300 ${
                    selectedAmenities.includes(amenity.id) 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover-lift' 
                      : 'border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                  }`}
                  onClick={() => toggleAmenity(amenity.id)}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    selectedAmenities.includes(amenity.id) 
                      ? 'bg-white/20' 
                      : 'bg-gradient-to-br from-purple-100 to-blue-100'
                  }`}>
                    <amenity.icon className={`w-5 h-5 ${selectedAmenities.includes(amenity.id) ? 'text-white' : 'text-purple-600'}`} />
                  </div>
                  <span className={`font-medium ${selectedAmenities.includes(amenity.id) ? 'text-white' : 'text-gray-900'}`}>
                    {amenity.label}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Submit Actions - Enhanced */}
      <Card className="glass-card professional-shadow-lg p-8 border-0">
        <div className="text-center space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to List Your Space?</h3>
            <p className="text-gray-600">Review your listing details and publish when ready</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Button 
              variant="outline" 
              className="flex-1 h-12 border-2 border-gray-300 hover:border-gray-400 font-medium"
            >
              Save Draft
            </Button>
            <Button 
              className="flex-1 h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 font-medium professional-shadow hover-lift"
            >
              Publish Space
            </Button>
          </div>
          <p className="text-sm text-gray-500">
            Your listing will be reviewed by our team before going live
          </p>
        </div>
      </Card>
    </div>
  );
}