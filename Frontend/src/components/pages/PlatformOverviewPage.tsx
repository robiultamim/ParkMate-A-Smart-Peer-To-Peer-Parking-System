import { ArrowRight, Search, MapPin, Clock, Shield, DollarSign, Users, Star, CheckCircle, Car, Bike, Truck, CreditCard, BarChart3, Smartphone, Globe } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { BackButton } from '../ui/back-button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ParkMateLogo } from '../ui/parkmate-logo';

interface PlatformOverviewPageProps {
  onNavigateToAuth: (type: 'login' | 'signup-driver' | 'signup-owner') => void;
  onNavigateBack: () => void;
}

export function PlatformOverviewPage({ onNavigateToAuth, onNavigateBack }: PlatformOverviewPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <BackButton 
                onClick={onNavigateBack}
                className="text-gray-600 hover:text-purple-600"
              />
              <ParkMateLogo size="md" />
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => onNavigateToAuth('login')}
                className="text-gray-700 hover:text-purple-600"
              >
                Login
              </Button>
              <Button 
                onClick={() => onNavigateToAuth('signup-driver')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Complete Platform
            <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Ecosystem Overview
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Discover how Parkmate's comprehensive platform connects drivers, space owners, and administrators 
            in a seamless ecosystem that revolutionizes urban parking solutions.
          </p>
        </div>
      </section>

      {/* Platform Architecture */}
      <section className="py-16 px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Platform Architecture</h2>
            <p className="text-xl text-gray-600">Three interconnected user experiences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Driver Platform */}
            <Card className="bg-gradient-to-br from-purple-600 to-blue-600 text-white p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                  <Car className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Driver Platform</h3>
                <p className="text-purple-100 mb-6">
                  Comprehensive search, booking, and payment solution for drivers seeking parking.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span>Smart location search</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span>Real-time availability</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span>Secure mobile payments</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span>GPS navigation</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Host Platform */}
            <Card className="bg-gradient-to-br from-green-600 to-blue-600 text-white p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Host Platform</h3>
                <p className="text-green-100 mb-6">
                  Complete space management and revenue optimization tools for property owners.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span>Space listing management</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span>Dynamic pricing controls</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span>Booking approvals</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span>Revenue analytics</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Admin Platform */}
            <Card className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Admin Platform</h3>
                <p className="text-indigo-100 mb-6">
                  Comprehensive oversight and management tools for platform operations.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span>User verification</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span>Dispute resolution</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span>Platform analytics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span>Revenue management</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Comprehensive Feature Set</h2>
            <p className="text-xl text-gray-600">Everything you need for smart parking management</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-white/30 p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Smart Search</h3>
              <p className="text-sm text-gray-600">AI-powered search with location intelligence</p>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-white/30 p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">GPS Integration</h3>
              <p className="text-sm text-gray-600">Real-time navigation and location tracking</p>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-white/30 p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Mobile Wallets</h3>
              <p className="text-sm text-gray-600">bKash, Nagad, and other payment methods</p>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-white/30 p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Real-time Updates</h3>
              <p className="text-sm text-gray-600">Live availability and booking confirmations</p>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-white/30 p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Verification System</h3>
              <p className="text-sm text-gray-600">Admin-verified hosts and secure spaces</p>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-white/30 p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Analytics Dashboard</h3>
              <p className="text-sm text-gray-600">Comprehensive insights and reporting</p>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-white/30 p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Community Features</h3>
              <p className="text-sm text-gray-600">Ratings, reviews, and user feedback</p>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-white/30 p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Multi-Platform</h3>
              <p className="text-sm text-gray-600">Web and mobile accessibility</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Vehicle Support */}
      <section className="py-16 px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Multi-Vehicle Support</h2>
            <p className="text-xl text-gray-600">Accommodating all types of vehicles with specialized pricing</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white/80 backdrop-blur-sm border-white/30 p-6 text-center">
              <div className="relative h-32 mb-6 rounded-xl overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1558457738-f199ff9dbf82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYXIlMjBwYXJraW5nfGVufDF8fHx8MTc1NjQ2MTQ4NXww&ixlib=rb-4.1.0&q=80&w=400"
                  alt="Cars and sedans"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Cars & Sedans</h3>
              <p className="text-gray-600 mb-4">Standard vehicles with competitive hourly rates</p>
              <Badge className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700">
                From $2.50/hour
              </Badge>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-white/30 p-6 text-center">
              <div className="relative h-32 mb-6 rounded-xl overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1698787575587-04acc563a946?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RvcmN5Y2xlJTIwYmlrZSUyMHBhcmtpbmd8ZW58MXx8fHwxNzU2NDYxNDg1fDA&ixlib=rb-4.1.0&q=80&w=400"
                  alt="Motorcycles and bikes"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bike className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Bikes & Motorcycles</h3>
              <p className="text-gray-600 mb-4">Compact parking for two-wheelers</p>
              <Badge className="bg-gradient-to-r from-blue-100 to-green-100 text-blue-700">
                From $1.00/hour
              </Badge>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-white/30 p-6 text-center">
              <div className="relative h-32 mb-6 rounded-xl overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1626379456424-fb1c3b588fe2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx0cnVjayUyMGNvbW1lcmNpYWwlMjBwYXJraW5nfGVufDF8fHx8MTc1NjQ2MTQ4NXww&ixlib=rb-4.1.0&q=80&w=400"
                  alt="Commercial trucks"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Trucks & Commercial</h3>
              <p className="text-gray-600 mb-4">Large vehicle accommodations</p>
              <Badge className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-700">
                From $5.00/hour
              </Badge>
            </Card>
          </div>
        </div>
      </section>

      {/* Platform Stats */}
      <section className="py-16 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Platform Performance</h2>
          <p className="text-purple-100 text-xl mb-12">Real metrics from our growing ecosystem</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">2,500+</div>
              <div className="text-purple-200">Active Users</div>
              <div className="text-sm text-purple-300 mt-1">Across all platforms</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1,200+</div>
              <div className="text-purple-200">Parking Spaces</div>
              <div className="text-sm text-purple-300 mt-1">Verified locations</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15,000+</div>
              <div className="text-purple-200">Successful Bookings</div>
              <div className="text-sm text-purple-300 mt-1">This month</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">$45K+</div>
              <div className="text-purple-200">Host Earnings</div>
              <div className="text-sm text-purple-300 mt-1">Monthly revenue</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Join the Parkmate Ecosystem
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Experience the complete platform that's revolutionizing urban parking
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => onNavigateToAuth('signup-driver')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-4 h-auto"
            >
              <Car className="w-5 h-5 mr-2" />
              Start as Driver
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => onNavigateToAuth('signup-owner')}
              className="text-lg px-8 py-4 h-auto border-purple-200 text-purple-700 hover:bg-purple-50"
            >
              <DollarSign className="w-5 h-5 mr-2" />
              Become a Host
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}