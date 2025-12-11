import { Filter, Clock, MapPin, DollarSign, Car, Zap, Shield, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Slider } from '../ui/slider';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { useState } from 'react';

export function FiltersPage() {
  const [distance, setDistance] = useState([1]);
  const [priceRange, setPriceRange] = useState([1, 5]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['garage']);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(['security']);

  const parkingTypes = [
    { id: 'garage', label: 'Garage', icon: Car },
    { id: 'open-lot', label: 'Open Lot', icon: MapPin },
    { id: 'street', label: 'Street Parking', icon: MapPin },
    { id: 'covered', label: 'Covered', icon: Shield },
  ];

  const amenities = [
    { id: 'security', label: 'Security Camera', icon: Shield },
    { id: 'ev-charging', label: 'EV Charging', icon: Zap },
    { id: 'covered', label: 'Weather Protection', icon: Shield },
    { id: 'lighting', label: 'Well Lit', icon: Zap },
    { id: 'attendant', label: 'Parking Attendant', icon: Car },
    { id: 'disabled', label: 'Accessible', icon: Car },
  ];

  const timeSlots = [
    '6:00 AM - 9:00 AM',
    '9:00 AM - 12:00 PM', 
    '12:00 PM - 3:00 PM',
    '3:00 PM - 6:00 PM',
    '6:00 PM - 9:00 PM',
    'All Day'
  ];

  const toggleType = (typeId: string) => {
    setSelectedTypes(prev => 
      prev.includes(typeId) 
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  const toggleAmenity = (amenityId: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenityId)
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">{/* Modern desktop layout */}
      {/* Enhanced Filter Header */}
      <div className="text-center space-y-4 animate-fade-in">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center">
            <Filter className="w-6 h-6 text-purple-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900">Search Filters</h2>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Customize your search to find the perfect parking spot
        </p>
        <Button variant="outline" className="text-purple-600 border-purple-200 hover:bg-purple-50 px-6 py-3">
          Reset All Filters
        </Button>
      </div>

      {/* Enhanced Distance and Price Range */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="glass-card professional-shadow-lg p-8 border-0 animate-slide-in-left">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Search Distance</h3>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 px-4 py-2 text-lg">
              {distance[0]} miles
            </Badge>
          </div>
          <div className="space-y-6">
            <Slider
              value={distance}
              onValueChange={setDistance}
              max={5}
              min={0.1}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600 font-medium">
              <span>0.1 mi</span>
              <span>5 mi</span>
            </div>
          </div>
        </Card>

        <Card className="glass-card professional-shadow-lg p-8 border-0 animate-slide-in-right">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Price Range</h3>
            <Badge variant="secondary" className="bg-green-100 text-green-700 px-4 py-2 text-lg">
              ${priceRange[0]} - ${priceRange[1]}/hr
            </Badge>
          </div>
          <div className="space-y-6">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={10}
              min={1}
              step={0.5}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600 font-medium">
              <span>$1/hr</span>
              <span>$10/hr</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Enhanced Parking Type */}
      <Card className="glass-card professional-shadow-lg p-8 border-0 animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Car className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">Parking Type</h3>
          <p className="text-gray-600">Select your preferred parking types</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {parkingTypes.map((type, index) => (
            <Button
              key={type.id}
              variant={selectedTypes.includes(type.id) ? 'default' : 'outline'}
              className={`flex items-center gap-4 justify-start h-auto p-6 rounded-xl transition-all duration-300 hover-lift animate-fade-in stagger-${(index % 2) + 1} ${
                selectedTypes.includes(type.id) 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 border-0' 
                  : 'border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50'
              }`}
              onClick={() => toggleType(type.id)}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                selectedTypes.includes(type.id) 
                  ? 'bg-white/20' 
                  : 'bg-gradient-to-br from-purple-100 to-blue-100'
              }`}>
                <type.icon className={`w-6 h-6 ${selectedTypes.includes(type.id) ? 'text-white' : 'text-purple-600'}`} />
              </div>
              <span className={`font-medium ${selectedTypes.includes(type.id) ? 'text-white' : 'text-gray-900'}`}>
                {type.label}
              </span>
              {selectedTypes.includes(type.id) && (
                <Check className="w-5 h-5 ml-auto text-white" />
              )}
            </Button>
          ))}
        </div>
      </Card>

      {/* Time Preference */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/20 p-4 space-y-4">
        <Label className="font-medium">Preferred Time</Label>
        <div className="space-y-2">
          {timeSlots.map((slot, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
              <span className="text-sm">{slot}</span>
              <Switch />
            </div>
          ))}
        </div>
      </Card>

      {/* Amenities */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/20 p-4 space-y-4">
        <Label className="font-medium">Amenities</Label>
        <div className="grid grid-cols-2 gap-3">
          {amenities.map((amenity) => (
            <Button
              key={amenity.id}
              variant={selectedAmenities.includes(amenity.id) ? 'default' : 'outline'}
              className={`flex items-center gap-2 justify-start h-auto p-3 text-xs ${
                selectedAmenities.includes(amenity.id) 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600' 
                  : ''
              }`}
              onClick={() => toggleAmenity(amenity.id)}
            >
              <amenity.icon className="w-4 h-4" />
              <span>{amenity.label}</span>
              {selectedAmenities.includes(amenity.id) && (
                <Check className="w-3 h-3 ml-auto" />
              )}
            </Button>
          ))}
        </div>
      </Card>

      {/* Apply Filters */}
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1">
          Clear All
        </Button>
        <Button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600">
          Apply Filters
        </Button>
      </div>
    </div>
  );
}