import { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, ArrowLeft, Car, MapPin, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { ParkMateLogo } from '../ui/parkmate-logo';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { FloatingElements } from '../ui/floating-elements';

interface LoginPageProps {
  onNavigateBack: () => void;
  onNavigateToSignup: (type: 'driver' | 'owner') => void;
  onLogin: (credentials: { email: string; password: string; rememberMe: boolean }) => void;
}

export function LoginPage({ onNavigateBack, onNavigateToSignup, onLogin }: LoginPageProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Implement driver fracture login with specific credentials
    const { email, password } = formData;
    
    // Check for specific login combinations
    if (email === 'driver@gmail.com' && password === 'driver') {
      onLogin({ ...formData, userRole: 'driver' });
    } else if (email === 'host@gmail.com' && password === 'host') {
      onLogin({ ...formData, userRole: 'host' });
    } else if (email === 'admin@gmail.com' && password === 'admin') {
      onLogin({ ...formData, userRole: 'admin' });
    } else {
      // For demo purposes, allow any other credentials to login as driver
      onLogin(formData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex relative overflow-hidden">
      {/* Enhanced Floating Background Elements */}
      <FloatingElements count={12} colors={['purple', 'blue', 'indigo']} />

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
                className="h-10 w-10 rounded-full hover:bg-purple-100 hover:text-purple-700 transition-all duration-200 interactive-button hover-lift"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="animate-bounce-gentle">
                <ParkMateLogo size="sm" />
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex bg-gray-100 p-1 rounded-lg mb-8 modern-card animate-slide-in-up">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-2 px-4 rounded-md transition-all duration-300 interactive-button ${
                  activeTab === 'login'
                    ? 'bg-white text-purple-700 shadow-sm transform scale-105'
                    : 'text-gray-600 hover:text-gray-900 hover:scale-102'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setActiveTab('signup')}
                className={`flex-1 py-2 px-4 rounded-md transition-all duration-300 interactive-button ${
                  activeTab === 'signup'
                    ? 'bg-white text-purple-700 shadow-sm transform scale-105'
                    : 'text-gray-600 hover:text-gray-900 hover:scale-102'
                }`}
              >
                Sign up
              </button>
            </div>
            
            {/* Demo Credentials Helper */}
            {activeTab === 'login' && (
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 mb-6 animate-fade-in glass-card">
                <h4 className="font-medium text-gray-900 mb-2 text-sm">Demo Credentials:</h4>
                <div className="space-y-1 text-xs text-gray-600">
                  <div>Driver: <span className="font-mono bg-white px-2 py-1 rounded text-purple-600">driver@gmail.com / driver</span></div>
                  <div>Host: <span className="font-mono bg-white px-2 py-1 rounded text-blue-600">host@gmail.com / host</span></div>
                  <div>Admin: <span className="font-mono bg-white px-2 py-1 rounded text-indigo-600">admin@gmail.com / admin</span></div>
                </div>
              </div>
            )}
          </div>

          {activeTab === 'login' && (
            <form onSubmit={handleSubmit} className="space-y-6 animate-slide-in-up">
              {/* Email Field */}
              <div className="space-y-2 animate-slide-in-left stagger-1">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email or phone number
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-purple-500 transition-all duration-300 hover:border-gray-300 modern-input"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
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
                      <EyeOff className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <Button 
                  variant="link" 
                  className="text-sm text-purple-600 hover:text-purple-700 p-0 h-auto"
                >
                  Forgot your password?
                </Button>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 h-12 rounded-lg transition-all duration-200 hover:shadow-lg"
              >
                Login
              </Button>
            </form>
          )}

          {activeTab === 'signup' && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Join ParkMate</h3>
                <p className="text-gray-600">Choose how you want to get started</p>
              </div>

              <Button
                onClick={() => onNavigateToSignup('driver')}
                variant="outline"
                className="w-full h-16 border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl flex items-center justify-center group-hover:from-purple-200 group-hover:to-blue-200 transition-all duration-200">
                    <Car className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">Sign up as Driver</div>
                    <div className="text-sm text-gray-500">Find and book parking spots</div>
                  </div>
                </div>
              </Button>

              <Button
                onClick={() => onNavigateToSignup('owner')}
                variant="outline"
                className="w-full h-16 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-200">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">Sign up as Space Owner</div>
                    <div className="text-sm text-gray-500">List and monetize your space</div>
                  </div>
                </div>
              </Button>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              By continuing, you agree to our{' '}
              <Button variant="link" className="text-xs text-purple-600 hover:text-purple-700 p-0 h-auto">
                Terms of Service
              </Button>{' '}
              and{' '}
              <Button variant="link" className="text-xs text-purple-600 hover:text-purple-700 p-0 h-auto">
                Privacy Policy
              </Button>
            </p>
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
            {/* Laptop/Device Illustration */}
            <div className="relative mb-8">
              <div className="w-48 h-32 bg-white rounded-lg shadow-xl mx-auto transform rotate-3 hover:rotate-6 transition-transform duration-300">
                <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg p-6 flex items-center justify-center">
                  <div className="text-white text-center">
                    <MapPin className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-xs font-medium">ParkMate</div>
                  </div>
                </div>
              </div>
              
              {/* Coffee Cup */}
              <div className="absolute -bottom-4 -right-4 w-12 h-16 bg-white rounded-lg shadow-lg flex items-end justify-center p-2">
                <div className="w-8 h-8 bg-orange-400 rounded-full"></div>
              </div>
              
              {/* Plant */}
              <div className="absolute -top-4 -left-4 w-12 h-16 bg-white rounded-lg shadow-lg flex items-end justify-center p-2">
                <div className="w-6 h-8 bg-green-400 rounded-t-full"></div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Smart Parking Made Simple
            </h2>
            <p className="text-gray-600 mb-8">
              Join thousands of drivers and space owners who trust ParkMate for seamless parking solutions.
            </p>

            {/* Features */}
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm text-gray-700">Real-time availability updates</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm text-gray-700">GPS navigation to your spot</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Car className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-sm text-gray-700">Vehicle-specific pricing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}