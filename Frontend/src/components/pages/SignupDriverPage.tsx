import { useState } from 'react';
import { Eye, EyeOff, Car, CheckCircle, User, Mail, Phone, Lock, Shield, ArrowLeft, Clock, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ParkMateLogo } from '../ui/parkmate-logo';

interface SignupDriverPageProps {
  onNavigateBack: () => void;
  onNavigateToLogin: () => void;
  onNavigateToOwnerSignup: () => void;
  onSignup: (userData: any) => void;
}

export function SignupDriverPage({ onNavigateBack, onNavigateToLogin, onNavigateToOwnerSignup, onSignup }: SignupDriverPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    vehicleType: '',
    vehiclePlate: '',
    agreesToTerms: false,
    agreesToNewsletters: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      onSignup({ ...formData, userType: 'driver' });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex relative overflow-hidden">
      {/* Enhanced Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-4 h-4 bg-purple-300/20 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-blue-300/25 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-5 h-5 bg-indigo-300/15 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-60 right-1/3 w-2 h-2 bg-purple-400/30 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-60 right-10 w-4 h-4 bg-blue-400/20 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/3 left-1/2 w-3 h-3 bg-indigo-400/25 rounded-full animate-float" style={{ animationDelay: '2.5s' }}></div>
      </div>

      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12 relative z-10">
        <div className="w-full max-w-md animate-scale-in">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-8 animate-slide-in-down">
              <Button
                variant="ghost"
                size="icon"
                onClick={onNavigateBack}
                className="h-10 w-10 rounded-full hover:bg-purple-100 hover:text-purple-700 transition-all duration-300 interactive-button hover-lift"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="animate-bounce-gentle">
                <ParkMateLogo size="sm" />
              </div>
            </div>

            <div className="text-center mb-8 animate-slide-in-up">
              <h1 className="text-3xl font-bold text-gray-900 mb-2 animate-fade-in-left">
                Join as Driver
              </h1>
              <p className="text-gray-600 animate-slide-in-right stagger-1">
                Find perfect parking spots with ease
              </p>
            </div>

            {/* Enhanced Progress Indicator */}
            <div className="flex items-center mb-8 animate-slide-in-up stagger-2">
              <div className={`flex-1 h-3 rounded-full transition-all duration-500 relative overflow-hidden ${
                currentStep >= 1 ? 'bg-gradient-to-r from-purple-600 to-blue-600 animate-gradient' : 'bg-gray-200'
              }`}>
                {currentStep >= 1 && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                )}
              </div>
              <div className="px-4">
                <div className={`w-6 h-6 rounded-full transition-all duration-500 flex items-center justify-center ${
                  currentStep >= 2 ? 'bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg' : 'bg-gray-200'
                }`}>
                  {currentStep >= 2 && <CheckCircle className="w-4 h-4 text-white animate-scale-in" />}
                </div>
              </div>
              <div className={`flex-1 h-3 rounded-full transition-all duration-500 relative overflow-hidden ${
                currentStep >= 2 ? 'bg-gradient-to-r from-purple-600 to-blue-600 animate-gradient' : 'bg-gray-200'
              }`}>
                {currentStep >= 2 && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                )}
              </div>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Information</h3>
                  <p className="text-sm text-gray-600">Tell us about yourself to get started</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                      First Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-purple-500 transition-all duration-200"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                      Last Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-purple-500 transition-all duration-200"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-purple-500 transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+880 1XXX-XXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-purple-500 transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-10 pr-12 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-purple-500 transition-all duration-200"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-12 w-12 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Eye className="w-4 h-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="pl-10 pr-12 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-purple-500 transition-all duration-200"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-12 w-12 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Eye className="w-4 h-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Vehicle Information</h3>
                  <p className="text-sm text-gray-600">Help us serve you better with personalized options</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vehicleType" className="text-sm font-medium text-gray-700">
                    Primary Vehicle Type
                  </Label>
                  <Select value={formData.vehicleType} onValueChange={(value) => setFormData({ ...formData, vehicleType: value })}>
                    <SelectTrigger className="h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-purple-500">
                      <SelectValue placeholder="Select your vehicle type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedan">🚗 Sedan</SelectItem>
                      <SelectItem value="suv">🚙 SUV</SelectItem>
                      <SelectItem value="hatchback">🚘 Hatchback</SelectItem>
                      <SelectItem value="motorcycle">🏍️ Motorcycle</SelectItem>
                      <SelectItem value="truck">🚚 Truck</SelectItem>
                      <SelectItem value="van">🚐 Van</SelectItem>
                      <SelectItem value="other">🚛 Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vehiclePlate" className="text-sm font-medium text-gray-700">
                    License Plate (Optional)
                  </Label>
                  <div className="relative">
                    <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="vehiclePlate"
                      placeholder="e.g., DHA-XX-XXXX"
                      value={formData.vehiclePlate}
                      onChange={(e) => setFormData({ ...formData, vehiclePlate: e.target.value })}
                      className="pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-purple-500 transition-all duration-200"
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    This helps parking space owners identify your vehicle
                  </p>
                </div>

                {/* Benefits Section */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Driver Benefits
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Access to thousands of parking spots</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Real-time availability updates</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Secure mobile wallet payments</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">GPS navigation to reserved spots</span>
                    </div>
                  </div>
                </div>

                {/* Agreement Checkboxes */}
                <div className="space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agreesToTerms}
                      onChange={(e) => setFormData({ ...formData, agreesToTerms: e.target.checked })}
                      className="mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      required
                    />
                    <span className="text-sm text-gray-700">
                      I agree to the{' '}
                      <Button variant="link" className="text-sm text-purple-600 hover:text-purple-700 p-0 h-auto">
                        Terms of Service
                      </Button>{' '}
                      and{' '}
                      <Button variant="link" className="text-sm text-purple-600 hover:text-purple-700 p-0 h-auto">
                        Privacy Policy
                      </Button>
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agreesToNewsletters}
                      onChange={(e) => setFormData({ ...formData, agreesToNewsletters: e.target.checked })}
                      className="mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">
                      Send me updates about new features and parking deals
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-6">
              {currentStep > 1 && (
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={handlePrevStep}
                  className="flex-1 h-12 border-gray-300 hover:bg-gray-50 transition-all duration-200"
                >
                  Previous
                </Button>
              )}
              <Button 
                type="submit"
                className={`${currentStep === 1 ? 'w-full' : 'flex-1'} bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 h-12 rounded-lg transition-all duration-200 hover:shadow-lg`}
              >
                {currentStep === 1 ? 'Continue' : 'Create Account'}
              </Button>
            </div>
          </form>

          {/* Footer Links */}
          <div className="mt-8 space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Already have an account?</p>
              <Button 
                variant="outline"
                onClick={onNavigateToLogin}
                className="border-purple-200 text-purple-700 hover:bg-purple-50 h-10 px-6 transition-all duration-200"
              >
                Sign In Instead
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">Want to list your parking space instead?</p>
              <Button 
                variant="link"
                onClick={onNavigateToOwnerSignup}
                className="text-blue-600 hover:text-blue-700 p-0 h-auto text-sm"
              >
                Sign up as Space Owner
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-200 relative overflow-hidden">
        {/* Geometric Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-32 h-32 bg-purple-300/30 rounded-full blur-2xl"></div>
          <div className="absolute bottom-40 left-20 w-48 h-48 bg-blue-300/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-300/20 rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="flex items-center justify-center w-full p-12 relative z-10">
          <div className="text-center max-w-md">
            {/* Car Illustration */}
            <div className="relative mb-8">
              <div className="w-64 h-40 bg-white rounded-2xl shadow-2xl mx-auto transform hover:scale-105 transition-transform duration-300 p-6">
                <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <Car className="w-16 h-16 text-white" />
                  <div className="absolute top-2 right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-green-100 rounded-full shadow-lg flex items-center justify-center animate-bounce">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-blue-100 rounded-full shadow-lg flex items-center justify-center animate-bounce" style={{ animationDelay: '0.5s' }}>
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Start Your Journey as a Driver
            </h2>
            <p className="text-gray-600 mb-8">
              Join thousands of drivers who've discovered stress-free parking with ParkMate's smart platform.
            </p>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white/50 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold text-purple-600">2.8K+</div>
                <div className="text-xs text-gray-600">Parking Spots</div>
              </div>
              <div className="bg-white/50 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold text-blue-600">1.5K+</div>
                <div className="text-xs text-gray-600">Happy Drivers</div>
              </div>
              <div className="bg-white/50 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold text-green-600">99%</div>
                <div className="text-xs text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}