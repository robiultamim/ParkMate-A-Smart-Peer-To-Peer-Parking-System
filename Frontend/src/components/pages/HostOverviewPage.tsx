import { ArrowRight, DollarSign, MapPin, BarChart3, Clock, Shield, CheckCircle, Users, Star, CreditCard, TrendingUp, Calendar, Settings, Smartphone } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { BackButton } from '../ui/back-button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ParkMateLogo } from '../ui/parkmate-logo';

interface HostOverviewPageProps {
  onNavigateToAuth: (type: 'login' | 'signup-driver' | 'signup-owner') => void;
  onNavigateBack: () => void;
}

export function HostOverviewPage({ onNavigateToAuth, onNavigateBack }: HostOverviewPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <BackButton 
                onClick={onNavigateBack}
                className="text-gray-600 hover:text-green-600"
              />
              <ParkMateLogo size="md" />
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => onNavigateToAuth('login')}
                className="text-gray-700 hover:text-green-600"
              >
                Login
              </Button>
              <Button 
                onClick={() => onNavigateToAuth('signup-owner')}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                Become a Host
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Transform Your Space
                <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Into Passive Income
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join thousands of property owners who are earning money by sharing their unused 
                parking spaces. Our host platform provides everything you need to maximize your 
                revenue while maintaining complete control.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={() => onNavigateToAuth('signup-owner')}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-lg px-8 py-4 h-auto"
                >
                  <DollarSign className="w-5 h-5 mr-2" />
                  Start Earning Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-8 py-4 h-auto border-green-200 text-green-700 hover:bg-green-50"
                >
                  Watch Demo
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1558457738-f199ff9dbf82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYXIlMjBwYXJraW5nfGVufDF8fHx8MTc1NjQ2MTQ4NXww&ixlib=rb-4.1.0&q=80&w=800"
                  alt="Modern parking space monetization"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/30 to-transparent"></div>
              </div>
              {/* Floating Revenue Card */}
              <Card className="absolute -bottom-6 -left-6 bg-white p-6 shadow-xl border-white/30">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-green-600">$1,245</p>
                    <p className="text-sm text-green-600">+25% this month</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Revenue Potential */}
      <section className="py-16 px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Earning Potential</h2>
            <p className="text-xl text-gray-600">See how much you could earn with your space</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-green-600 to-emerald-600 text-white p-8 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Basic Space</h3>
              <p className="text-green-100 mb-4">Single parking spot</p>
              <div className="text-3xl font-bold mb-2">$300-800</div>
              <p className="text-green-200">Monthly potential</p>
            </Card>

            <Card className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-8 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Premium Location</h3>
              <p className="text-blue-100 mb-4">High-demand area</p>
              <div className="text-3xl font-bold mb-2">$800-1500</div>
              <p className="text-blue-200">Monthly potential</p>
            </Card>

            <Card className="bg-gradient-to-br from-purple-600 to-pink-600 text-white p-8 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Multi-Space</h3>
              <p className="text-purple-100 mb-4">Multiple parking spots</p>
              <div className="text-3xl font-bold mb-2">$1500+</div>
              <p className="text-purple-200">Monthly potential</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Host Platform Features */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete Host Platform</h2>
            <p className="text-xl text-gray-600">Everything you need to manage and optimize your parking business</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Space Management */}
            <Card className="bg-white/80 backdrop-blur-sm border-white/30 p-8">
              <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Settings className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Space Management</h3>
              <p className="text-gray-600 mb-6">Complete control over your parking space listings</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Upload photos and descriptions</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Set availability schedules</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Vehicle type restrictions</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Instant space updates</span>
                </div>
              </div>
            </Card>

            {/* Pricing Control */}
            <Card className="bg-white/80 backdrop-blur-sm border-white/30 p-8">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mb-6">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Dynamic Pricing</h3>
              <p className="text-gray-600 mb-6">Maximize revenue with intelligent pricing strategies</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Set hourly, daily, monthly rates</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Vehicle-specific pricing</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Peak hour multipliers</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Seasonal rate adjustments</span>
                </div>
              </div>
            </Card>

            {/* Booking Management */}
            <Card className="bg-white/80 backdrop-blur-sm border-white/30 p-8">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mb-6">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Booking Control</h3>
              <p className="text-gray-600 mb-6">Approve, decline, and manage all booking requests</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Real-time booking notifications</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>One-click approve/decline</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Automatic booking confirmations</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Guest communication tools</span>
                </div>
              </div>
            </Card>

            {/* Revenue Analytics */}
            <Card className="bg-white/80 backdrop-blur-sm border-white/30 p-8">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Revenue Analytics</h3>
              <p className="text-gray-600 mb-6">Comprehensive insights into your parking business</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Daily, weekly, monthly reports</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Occupancy rate tracking</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Revenue optimization tips</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Performance benchmarking</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Payment & Withdrawal */}
      <section className="py-16 px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Seamless Payments</h2>
            <p className="text-xl text-gray-600">Get paid quickly with multiple withdrawal options</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-8">
                <Card className="bg-white/80 backdrop-blur-sm border-white/30 p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Mobile Wallet Integration</h3>
                      <p className="text-sm text-gray-600">bKash, Nagad, Rocket, and more</p>
                    </div>
                  </div>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-white/30 p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Instant Withdrawals</h3>
                      <p className="text-sm text-gray-600">Get your earnings within minutes</p>
                    </div>
                  </div>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-white/30 p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Secure Transactions</h3>
                      <p className="text-sm text-gray-600">Bank-level security for all payments</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <div className="relative">
              <Card className="bg-gradient-to-br from-green-600 to-blue-600 text-white p-8">
                <h3 className="text-2xl font-bold mb-6">Payment Schedule</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Booking Payment</span>
                    <Badge className="bg-white/20 text-white">Instant</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Host Commission</span>
                    <Badge className="bg-white/20 text-white">85%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Withdrawal Minimum</span>
                    <Badge className="bg-white/20 text-white">$20</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Processing Time</span>
                    <Badge className="bg-white/20 text-white">2-5 min</Badge>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">Real hosts sharing their experiences</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white/80 backdrop-blur-sm border-white/30 p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "I've been earning $800-1200 monthly from my unused driveway. The platform is so easy to use!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-100 to-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Sarah Ahmed</p>
                  <p className="text-sm text-gray-600">Dhanmondi Host</p>
                </div>
              </div>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-white/30 p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "My office parking generates extra income on weekends. Parkmate made it effortless to set up."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Rahman Khan</p>
                  <p className="text-sm text-gray-600">Gulshan Host</p>
                </div>
              </div>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-white/30 p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Three parking spots earning $2000+ monthly. The verification process was smooth and professional."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Fatima Ali</p>
                  <p className="text-sm text-gray-600">Banani Host</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="py-16 px-6 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Start Earning in 3 Simple Steps</h2>
          <p className="text-green-100 text-xl mb-12">Join thousands of successful hosts today</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
              <p className="text-green-100">Create your host account and get verified</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">List Space</h3>
              <p className="text-green-100">Add photos, set pricing, and availability</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Start Earning</h3>
              <p className="text-green-100">Approve bookings and receive payments</p>
            </div>
          </div>

          <Button 
            size="lg" 
            onClick={() => onNavigateToAuth('signup-owner')}
            className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-4 h-auto"
          >
            <DollarSign className="w-5 h-5 mr-2" />
            Become a Host Today
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}