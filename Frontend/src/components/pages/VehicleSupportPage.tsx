import { useState } from "react";
import {
  Car,
  Truck,
  Bike,
  Plus,
  Edit3,
  Trash2,
  Zap,
  Fuel,
  Settings,
  Shield,
  AlertCircle,
  CheckCircle,
  Camera,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";

export function VehicleSupportPage() {
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      type: "car",
      make: "Toyota",
      model: "Camry",
      year: 2021,
      color: "Silver",
      licensePlate: "ABC-1234",
      fuelType: "gasoline",
      isDefault: true,
      dimensions: {
        length: 16.1,
        width: 6.0,
        height: 4.8,
      },
      features: ["electric-charging", "handicap-accessible"],
      imageUrl: "/api/placeholder/300/200",
    },
    {
      id: 2,
      type: "bike",
      make: "Yamaha",
      model: "YZF-R3",
      year: 2022,
      color: "Blue",
      licensePlate: "XYZ-5678",
      fuelType: "gasoline",
      isDefault: false,
      dimensions: {
        length: 6.9,
        width: 2.4,
        height: 3.7,
      },
      features: [],
      imageUrl: "/api/placeholder/300/200",
    },
  ]);

  const vehicleTypes = [
    {
      id: "car",
      name: "Car",
      icon: Car,
      description: "Standard passenger vehicles",
      basePrice: 2.5,
      supportedFeatures: ["electric-charging", "handicap-accessible", "covered-parking", "valet-service"],
    },
    {
      id: "truck",
      name: "Truck/SUV",
      icon: Truck,
      description: "Large vehicles and trucks",
      basePrice: 4.0,
      supportedFeatures: ["oversized-parking", "covered-parking"],
    },
    {
      id: "bike",
      name: "Motorcycle",
      icon: Bike,
      description: "Motorcycles and scooters",
      basePrice: 1.5,
      supportedFeatures: ["covered-parking", "security-camera"],
    },
  ];

  const availableFeatures = [
    {
      id: "electric-charging",
      name: "Electric Charging",
      icon: Zap,
      description: "EV charging stations",
      applicable: ["car"],
    },
    {
      id: "handicap-accessible",
      name: "Handicap Accessible",
      icon: Shield,
      description: "Accessible parking spaces",
      applicable: ["car"],
    },
    {
      id: "covered-parking",
      name: "Covered Parking",
      icon: Shield,
      description: "Protected from weather",
      applicable: ["car", "truck", "bike"],
    },
    {
      id: "valet-service",
      name: "Valet Service",
      icon: Settings,
      description: "Professional parking service",
      applicable: ["car"],
    },
    {
      id: "oversized-parking",
      name: "Oversized Spaces",
      icon: Truck,
      description: "Extra large parking spaces",
      applicable: ["truck"],
    },
    {
      id: "security-camera",
      name: "Security Camera",
      icon: Camera,
      description: "24/7 surveillance",
      applicable: ["bike", "car", "truck"],
    },
  ];

  const getVehicleIcon = (type: string) => {
    const vehicleType = vehicleTypes.find(v => v.id === type);
    return vehicleType ? vehicleType.icon : Car;
  };

  const getFuelTypeIcon = (fuelType: string) => {
    return fuelType === "electric" ? Zap : Fuel;
  };

  const getFuelTypeColor = (fuelType: string) => {
    switch (fuelType) {
      case "electric":
        return "text-green-600 bg-green-100";
      case "hybrid":
        return "text-blue-600 bg-blue-100";
      case "diesel":
        return "text-orange-600 bg-orange-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getFeatureIcon = (featureId: string) => {
    const feature = availableFeatures.find(f => f.id === featureId);
    return feature ? feature.icon : Settings;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">Vehicle Support</h1>
              <p className="text-purple-100">
                Manage your vehicles and find compatible parking spaces
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="secondary"
                  className="bg-white text-purple-600 hover:bg-gray-100"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Vehicle
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Vehicle</DialogTitle>
                </DialogHeader>
                <VehicleForm onSubmit={() => {}} />
              </DialogContent>
            </Dialog>
          </div>

          {/* Vehicle Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Car className="w-5 h-5" />
                <span className="font-medium">Total Vehicles</span>
              </div>
              <div className="text-2xl font-bold">{vehicles.length}</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5" />
                <span className="font-medium">Electric Vehicles</span>
              </div>
              <div className="text-2xl font-bold">
                {vehicles.filter(v => v.fuelType === "electric").length}
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5" />
                <span className="font-medium">Active Default</span>
              </div>
              <div className="text-lg font-bold">
                {vehicles.find(v => v.isDefault)?.make} {vehicles.find(v => v.isDefault)?.model}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="vehicles" className="space-y-6">
        <TabsList>
          <TabsTrigger value="vehicles">My Vehicles</TabsTrigger>
          <TabsTrigger value="compatibility">Compatibility</TabsTrigger>
          <TabsTrigger value="features">Features Guide</TabsTrigger>
        </TabsList>

        <TabsContent value="vehicles" className="space-y-6">
          {/* Vehicle List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => {
              const VehicleIcon = getVehicleIcon(vehicle.type);
              const FuelIcon = getFuelTypeIcon(vehicle.fuelType);
              
              return (
                <Card key={vehicle.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
                  {/* Vehicle Image */}
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative">
                    <div className="absolute inset-0 bg-gray-300"></div>
                    <div className="absolute top-3 left-3">
                      <Badge
                        variant="secondary"
                        className="bg-white/90 text-gray-800"
                      >
                        <VehicleIcon className="w-3 h-3 mr-1" />
                        {vehicle.type}
                      </Badge>
                    </div>
                    {vehicle.isDefault && (
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-purple-600">
                          Default
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="mb-3">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {vehicle.color} • {vehicle.licensePlate}
                      </p>
                    </div>

                    {/* Vehicle Details */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Fuel Type</span>
                        <Badge
                          variant="secondary"
                          className={`${getFuelTypeColor(vehicle.fuelType)} border-0`}
                        >
                          <FuelIcon className="w-3 h-3 mr-1" />
                          {vehicle.fuelType}
                        </Badge>
                      </div>

                      <div className="text-sm">
                        <span className="text-gray-600 block mb-1">Dimensions (ft)</span>
                        <div className="text-gray-800">
                          L: {vehicle.dimensions.length}" × W: {vehicle.dimensions.width}" × H: {vehicle.dimensions.height}"
                        </div>
                      </div>

                      {vehicle.features.length > 0 && (
                        <div>
                          <span className="text-gray-600 text-sm block mb-2">Special Features</span>
                          <div className="flex flex-wrap gap-1">
                            {vehicle.features.map((featureId) => {
                              const feature = availableFeatures.find(f => f.id === featureId);
                              const FeatureIcon = getFeatureIcon(featureId);
                              return (
                                <Badge
                                  key={featureId}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  <FeatureIcon className="w-3 h-3 mr-1" />
                                  {feature?.name}
                                </Badge>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Edit3 className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Edit Vehicle</DialogTitle>
                          </DialogHeader>
                          <VehicleForm vehicle={vehicle} onSubmit={() => {}} />
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="compatibility" className="space-y-6">
          {/* Compatibility Checker */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Parking Compatibility Checker
            </h3>
            <p className="text-gray-600 mb-6">
              Check which parking spaces are compatible with your vehicles
            </p>

            <div className="space-y-6">
              {vehicles.map((vehicle) => {
                const VehicleIcon = getVehicleIcon(vehicle.type);
                const vehicleType = vehicleTypes.find(vt => vt.id === vehicle.type);
                
                return (
                  <Card key={vehicle.id} className="p-4 border border-gray-200">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl flex items-center justify-center">
                        <VehicleIcon className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">
                          {vehicle.year} {vehicle.make} {vehicle.model}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                          Base parking rate: ${vehicleType?.basePrice}/hour
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-medium text-gray-800 mb-2">Compatible Features</h5>
                            <div className="space-y-1">
                              {vehicleType?.supportedFeatures.map((featureId) => {
                                const feature = availableFeatures.find(f => f.id === featureId);
                                const FeatureIcon = getFeatureIcon(featureId);
                                return (
                                  <div key={featureId} className="flex items-center gap-2 text-sm">
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                    <FeatureIcon className="w-4 h-4 text-purple-600" />
                                    <span>{feature?.name}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-800 mb-2">Special Needs</h5>
                            <div className="space-y-1">
                              {vehicle.features.map((featureId) => {
                                const feature = availableFeatures.find(f => f.id === featureId);
                                const FeatureIcon = getFeatureIcon(featureId);
                                return (
                                  <div key={featureId} className="flex items-center gap-2 text-sm">
                                    <AlertCircle className="w-4 h-4 text-orange-600" />
                                    <FeatureIcon className="w-4 h-4 text-orange-600" />
                                    <span>{feature?.name} Required</span>
                                  </div>
                                );
                              })}
                              {vehicle.features.length === 0 && (
                                <p className="text-sm text-gray-500">No special requirements</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          {/* Features Guide */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {availableFeatures.map((feature) => {
              const FeatureIcon = feature.icon;
              
              return (
                <Card key={feature.id} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl flex items-center justify-center">
                      <FeatureIcon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {feature.name}
                      </h4>
                      <p className="text-gray-600 mb-3">
                        {feature.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {feature.applicable.map((vehicleType) => {
                          const type = vehicleTypes.find(vt => vt.id === vehicleType);
                          const TypeIcon = type?.icon || Car;
                          return (
                            <Badge
                              key={vehicleType}
                              variant="outline"
                              className="text-xs"
                            >
                              <TypeIcon className="w-3 h-3 mr-1" />
                              {type?.name}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Vehicle Form Component
function VehicleForm({ vehicle, onSubmit }: { vehicle?: any; onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState({
    type: vehicle?.type || "car",
    make: vehicle?.make || "",
    model: vehicle?.model || "",
    year: vehicle?.year || new Date().getFullYear(),
    color: vehicle?.color || "",
    licensePlate: vehicle?.licensePlate || "",
    fuelType: vehicle?.fuelType || "gasoline",
    isDefault: vehicle?.isDefault || false,
    features: vehicle?.features || [],
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="type">Vehicle Type</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="car">Car</SelectItem>
              <SelectItem value="truck">Truck/SUV</SelectItem>
              <SelectItem value="bike">Motorcycle</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="fuelType">Fuel Type</Label>
          <Select value={formData.fuelType} onValueChange={(value) => setFormData({...formData, fuelType: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gasoline">Gasoline</SelectItem>
              <SelectItem value="electric">Electric</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
              <SelectItem value="diesel">Diesel</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="make">Make</Label>
          <Input
            id="make"
            value={formData.make}
            onChange={(e) => setFormData({...formData, make: e.target.value})}
            placeholder="Toyota, Honda, Ford..."
          />
        </div>
        <div>
          <Label htmlFor="model">Model</Label>
          <Input
            id="model"
            value={formData.model}
            onChange={(e) => setFormData({...formData, model: e.target.value})}
            placeholder="Camry, Civic, F-150..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="year">Year</Label>
          <Input
            id="year"
            type="number"
            value={formData.year}
            onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
            min="1900"
            max={new Date().getFullYear() + 1}
          />
        </div>
        <div>
          <Label htmlFor="color">Color</Label>
          <Input
            id="color"
            value={formData.color}
            onChange={(e) => setFormData({...formData, color: e.target.value})}
            placeholder="Silver, Blue, Black..."
          />
        </div>
        <div>
          <Label htmlFor="licensePlate">License Plate</Label>
          <Input
            id="licensePlate"
            value={formData.licensePlate}
            onChange={(e) => setFormData({...formData, licensePlate: e.target.value})}
            placeholder="ABC-1234"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="isDefault"
          checked={formData.isDefault}
          onCheckedChange={(checked) => setFormData({...formData, isDefault: checked})}
        />
        <Label htmlFor="isDefault">Set as default vehicle</Label>
      </div>

      <div className="flex gap-3">
        <Button onClick={() => onSubmit(formData)} className="flex-1">
          {vehicle ? "Update Vehicle" : "Add Vehicle"}
        </Button>
        <Button variant="outline" className="flex-1">
          Cancel
        </Button>
      </div>
    </div>
  );
}