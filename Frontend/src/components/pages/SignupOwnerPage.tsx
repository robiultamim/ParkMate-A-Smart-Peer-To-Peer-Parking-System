import { useState } from 'react';
import { Eye, EyeOff, Building, CheckCircle, User, Mail, Phone, Lock, Shield, ArrowLeft, DollarSign, MapPin, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { ParkMateLogo } from '../ui/parkmate-logo';

interface SignupOwnerPageProps {
  onNavigateBack: () => void;
  onNavigateToLogin: () => void;
  onNavigateToDriverSignup: () => void;
  onSignup: (userData: any) => void;
}

export function SignupOwnerPage({ onNavigateBack, onNavigateToLogin, onNavigateToDriverSignup, onSignup }: SignupOwnerPageProps) {
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
    businessName: '',
    propertyType: '',
    propertyAddress: '',
    propertyDescription: '',
    totalSpaces: '',
    agreesToTerms: false,
    agreesToNewsletters: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      onSignup({ ...formData, userType: 'owner' });
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
        <div className="absolute top-20 left-10 w-4 h-4 bg-blue-300/20 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-indigo-300/25 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-5 h-5 bg-purple-300/15 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-60 right-1/3 w-2 h-2 bg-blue-400/30 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-60 right-10 w-4 h-4 bg-indigo-400/20 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/3 left-1/2 w-3 h-3 bg-purple-400/25 rounded-full animate-float" style={{ animationDelay: '2.5s' }}></div>
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
                className="h-10 w-10 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-all duration-300 interactive-button hover-lift"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="animate-bounce-gentle">
                <ParkMateLogo size="sm" />
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Join as Space Owner
              </h1>
              <p className="text-gray-600">
                Monetize your parking space and earn passive income
              </p>
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center mb-8">
              <div className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                currentStep >= 1 ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-gray-200'
              }`}></div>
              <div className="px-4">
                <div className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  currentStep >= 2 ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-gray-200'
                }`}></div>
              </div>
              <div className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                currentStep >= 2 ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-gray-200'
              }`}></div>
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
                        className="pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 transition-all duration-200"
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
                        className="pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 transition-all duration-200"
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
                      className="pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 transition-all duration-200"
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
                      className="pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessName" className="text-sm font-medium text-gray-700">
                    Business Name (Optional)
                  </Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="businessName"
                      placeholder="Your Company Name"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 transition-all duration-200"
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
                      className="pl-10 pr-12 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 transition-all duration-200"
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
                      className="pl-10 pr-12 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 transition-all duration-200"
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Property Information</h3>
                  <p className="text-sm text-gray-600">Tell us about your parking space</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="propertyType" className="text-sm font-medium text-gray-700">
                    Property Type
                  </Label>
                  <Select value={formData.propertyType} onValueChange={(value) => setFormData({ ...formData, propertyType: value })}>
                    <SelectTrigger className="h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">🏠 Residential Driveway</SelectItem>
                      <SelectItem value="commercial">🏢 Commercial Building</SelectItem>
                      <SelectItem value="garage">🏬 Private Garage</SelectItem>
                      <SelectItem value="lot">🅿️ Open Parking Lot</SelectItem>
                      <SelectItem value="street">🛣️ Street Parking</SelectItem>
                      <SelectItem value="other">🏗️ Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="propertyAddress" className="text-sm font-medium text-gray-700">
                    Property Address
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="propertyAddress"
                      placeholder="Enter your property address"
                      value={formData.propertyAddress}
                      onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
                      className="pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalSpaces" className="text-sm font-medium text-gray-700">
                    Number of Parking Spaces
                  </Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="totalSpaces"
                      type="number"
                      placeholder="e.g., 2"
                      value={formData.totalSpaces}
                      onChange={(e) => setFormData({ ...formData, totalSpaces: e.target.value })}
                      className="pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 transition-all duration-200"
                      min="1"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="propertyDescription" className="text-sm font-medium text-gray-700">
                    Property Description (Optional)
                  </Label>
                  <Textarea
                    id="propertyDescription"
                    placeholder="Describe your parking space, any special instructions, or amenities..."
                    value={formData.propertyDescription}
                    onChange={(e) => setFormData({ ...formData, propertyDescription: e.target.value })}
                    className="min-h-[100px] bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 transition-all duration-200"
                    rows={4}
                  />
                </div>

                {/* Benefits Section */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    Space Owner Benefits
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Earn passive income from unused space</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Set your own pricing and availability</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Secure payments via mobile wallets</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Complete control over bookings</span>
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
                      className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      required
                    />
                    <span className="text-sm text-gray-700">
                      I agree to the{' '}
                      <Button variant="link" className="text-sm text-blue-600 hover:text-blue-700 p-0 h-auto">
                        Terms of Service
                      </Button>{' '}
                      and{' '}
                      <Button variant="link" className="text-sm text-blue-600 hover:text-blue-700 p-0 h-auto">
                        Privacy Policy
                      </Button>
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agreesToNewsletters}
                      onChange={(e) => setFormData({ ...formData, agreesToNewsletters: e.target.checked })}
                      className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      Send me updates about new features and earning opportunities
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
                className={`${currentStep === 1 ? 'w-full' : 'flex-1'} bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 h-12 rounded-lg transition-all duration-200 hover:shadow-lg`}
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
                className="border-blue-200 text-blue-700 hover:bg-blue-50 h-10 px-6 transition-all duration-200"
              >
                Sign In Instead
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">Looking for parking instead?</p>
              <Button 
                variant="link"
                onClick={onNavigateToDriverSignup}
                className="text-purple-600 hover:text-purple-700 p-0 h-auto text-sm"
              >
                Sign up as Driver
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200 relative overflow-hidden">
        {/* Geometric Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-32 h-32 bg-blue-300/30 rounded-full blur-2xl"></div>
          <div className="absolute bottom-40 left-20 w-48 h-48 bg-indigo-300/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-300/20 rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="flex items-center justify-center w-full p-12 relative z-10">
          <div className="text-center max-w-md">
            {/* Building/Property Illustration */}
            <div className="relative mb-8">
              <div className="w-64 h-40 bg-white rounded-2xl shadow-2xl mx-auto transform hover:scale-105 transition-transform duration-300 p-6">
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <Building className="w-16 h-16 text-white" />
                  <div className="absolute top-2 right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-green-100 rounded-full shadow-lg flex items-center justify-center animate-bounce">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-purple-100 rounded-full shadow-lg flex items-center justify-center animate-bounce" style={{ animationDelay: '0.5s' }}>
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Monetize Your Space
            </h2>
            <p className="text-gray-600 mb-8">
              Transform your unused parking space into a steady income stream with ParkMate's trusted platform.
            </p>

            {/* Earning Potential */}
            <div className="bg-white/50 rounded-lg p-6 backdrop-blur-sm mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Average Monthly Earnings</h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">$350 - $850</div>
                <div className="text-sm text-gray-600">Based on location and availability</div>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white/50 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-xl font-bold text-blue-600">850+</div>
                <div className="text-xs text-gray-600">Space Owners</div>
              </div>
              <div className="bg-white/50 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-xl font-bold text-green-600">95%</div>
                <div className="text-xs text-gray-600">Occupancy Rate</div>
              </div>
              <div className="bg-white/50 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-xl font-bold text-purple-600">4.8★</div>
                <div className="text-xs text-gray-600">Owner Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}