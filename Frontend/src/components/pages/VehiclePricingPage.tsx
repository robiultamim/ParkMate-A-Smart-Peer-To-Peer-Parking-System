import { Car, Truck, Bike, Zap, Save, RotateCcw } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useState } from 'react';

export function VehiclePricingPage() {
  const [pricingData, setPricingData] = useState({
    car: { hourly: 2.50, daily: 15.00, enabled: true },
    motorcycle: { hourly: 1.50, daily: 8.00, enabled: true },
    truck: { hourly: 4.00, daily: 25.00, enabled: true },
    van: { hourly: 3.50, daily: 20.00, enabled: true },
    bicycle: { hourly: 0.50, daily: 3.00, enabled: false },
    ev: { hourly: 3.00, daily: 18.00, enabled: true }
  });

  const vehicleTypes = [
    {
      id: 'car',
      name: 'Car',
      icon: Car,
      description: 'Standard passenger vehicles',
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 'motorcycle',
      name: 'Motorcycle',
      icon: Bike,
      description: 'Motorcycles and scooters',
      color: 'from-green-500 to-blue-500'
    },
    {
      id: 'truck',
      name: 'Truck',
      icon: Truck,
      description: 'Pickup trucks and large vehicles',
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 'van',
      name: 'Van',
      icon: Car,
      description: 'Vans and minivans',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'bicycle',
      name: 'Bicycle',
      icon: Bike,
      description: 'Bicycles and e-bikes',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'ev',
      name: 'Electric Vehicle',
      icon: Zap,
      description: 'Electric cars with charging needs',
      color: 'from-yellow-500 to-green-500'
    }
  ];

  const updatePricing = (vehicleId: string, field: string, value: number | boolean) => {
    setPricingData(prev => ({
      ...prev,
      [vehicleId]: {
        ...prev[vehicleId as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const spaces = [
    { id: 1, name: "Central Plaza Garage", totalSpots: 20 },
    { id: 2, name: "Mall Parking Lot", totalSpots: 50 },
    { id: 3, name: "Office Complex", totalSpots: 15 }
  ];

  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-6 pb-24">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4">
        <div className="text-center">
          <h2 className="text-xl font-bold">Vehicle-Based Pricing</h2>
          <p className="text-purple-100 text-sm mt-1">Set different rates for different vehicle types</p>
        </div>
      </Card>

      {/* Space Selection */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/20 p-4">
        <Label className="font-semibold text-gray-900">Select Parking Space</Label>
        <div className="grid grid-cols-1 gap-2 mt-3">
          {spaces.map((space) => (
            <Button key={space.id} variant="outline" className="justify-start">
              <Car className="w-4 h-4 mr-2" />
              {space.name} ({space.totalSpots} spots)
            </Button>
          ))}
        </div>
      </Card>

      {/* Pricing Tabs */}
      <Tabs defaultValue="individual" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-sm">
          <TabsTrigger value="individual">Individual Pricing</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="individual" className="space-y-4">
          {vehicleTypes.map((vehicle) => {
            const pricing = pricingData[vehicle.id as keyof typeof pricingData];
            return (
              <Card key={vehicle.id} className="bg-white/80 backdrop-blur-sm border-white/20 p-4">
                <div className="space-y-4">
                  {/* Vehicle Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 bg-gradient-to-r ${vehicle.color} rounded-lg flex items-center justify-center`}>
                        <vehicle.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{vehicle.name}</h4>
                        <p className="text-sm text-gray-600">{vehicle.description}</p>
                      </div>
                    </div>
                    <Switch 
                      checked={pricing.enabled}
                      onCheckedChange={(checked) => updatePricing(vehicle.id, 'enabled', checked)}
                    />
                  </div>

                  {/* Pricing Inputs */}
                  {pricing.enabled && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor={`${vehicle.id}-hourly`}>Hourly Rate</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                          <Input 
                            id={`${vehicle.id}-hourly`}
                            type="number"
                            step="0.25"
                            value={pricing.hourly}
                            onChange={(e) => updatePricing(vehicle.id, 'hourly', parseFloat(e.target.value))}
                            className="pl-8 bg-white/60"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor={`${vehicle.id}-daily`}>Daily Rate</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                          <Input 
                            id={`${vehicle.id}-daily`}
                            type="number"
                            step="1"
                            value={pricing.daily}
                            onChange={(e) => updatePricing(vehicle.id, 'daily', parseFloat(e.target.value))}
                            className="pl-8 bg-white/60"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Price Preview */}
                  {pricing.enabled && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Example pricing:</p>
                      <div className="flex justify-between text-sm mt-1">
                        <span>2 hours:</span>
                        <span className="font-medium">${(pricing.hourly * 2).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Full day:</span>
                        <span className="font-medium">${pricing.daily.toFixed(2)}</span>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="bulk" className="space-y-4">
          <Card className="bg-white/80 backdrop-blur-sm border-white/20 p-4 space-y-4">
            <Label className="font-semibold text-gray-900">Bulk Price Adjustment</Label>
            
            <div className="space-y-3">
              <div>
                <Label>Apply percentage change to all enabled vehicles</Label>
                <div className="flex gap-2 mt-2">
                  <Input 
                    type="number"
                    placeholder="10"
                    className="bg-white/60"
                  />
                  <Button variant="outline">
                    +10%
                  </Button>
                  <Button variant="outline">
                    -10%
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline">
                  Enable All
                </Button>
                <Button variant="outline">
                  Disable All
                </Button>
              </div>
            </div>
          </Card>

          {/* Pricing Templates */}
          <Card className="bg-white/80 backdrop-blur-sm border-white/20 p-4 space-y-4">
            <Label className="font-semibold text-gray-900">Pricing Templates</Label>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Badge className="mr-2">Budget</Badge>
                Low rates for high volume
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Badge className="mr-2">Premium</Badge>
                Higher rates for premium service
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Badge className="mr-2">Dynamic</Badge>
                Rates based on demand
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Actions */}
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
        <Button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600">
          <Save className="w-4 h-4 mr-2" />
          Save Pricing
        </Button>
      </div>

      {/* Pricing Summary */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/20 p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Current Pricing Summary</h3>
        <div className="space-y-2">
          {vehicleTypes.filter(v => pricingData[v.id as keyof typeof pricingData].enabled).map((vehicle) => {
            const pricing = pricingData[vehicle.id as keyof typeof pricingData];
            return (
              <div key={vehicle.id} className="flex justify-between text-sm">
                <span className="flex items-center gap-2">
                  <vehicle.icon className="w-4 h-4" />
                  {vehicle.name}
                </span>
                <span>${pricing.hourly}/hr • ${pricing.daily}/day</span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}