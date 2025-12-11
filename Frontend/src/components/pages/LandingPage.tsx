import { useState } from 'react';
import { MapPin, Search, Shield, Clock, DollarSign, Users, Car, Bike, Truck, ArrowRight, Star, CheckCircle, Play } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ParkMateLogo } from '../ui/parkmate-logo';

interface LandingPageProps {
  onNavigateToAuth: (type: 'login' | 'signup-driver' | 'signup-owner') => void;
  onNavigateToOverview: (type: 'platform' | 'host' | 'comprehensive') => void;
}

export function LandingPage({ onNavigateToAuth, onNavigateToOverview }: LandingPageProps) {
  const [activeTab, setActiveTab] = useState<'driver' | 'owner'>('driver');

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-purple-300/30 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-blue-300/30 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-indigo-300/30 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-60 right-1/3 w-1 h-1 bg-purple-400/40 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-60 right-10 w-2 h-2 bg-blue-400/30 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/3 left-1/2 w-1 h-1 bg-indigo-400/40 rounded-full animate-float" style={{ animationDelay: '2.5s' }}></div>
      </div>

      {/* Navigation */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 z-50 animate-slide-in-down">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="animate-scale-in">
              <ParkMateLogo size="lg" />
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-purple-600 transition-all duration-300 hover:scale-105 nav-item">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-purple-600 transition-all duration-300 hover:scale-105 nav-item">How it Works</a>
              <a href="#contact" className="text-gray-600 hover:text-purple-600 transition-all duration-300 hover:scale-105 nav-item">Contact</a>
            </nav>
            <div className="flex items-center gap-3 animate-slide-in-right">
              <Button 
                variant="ghost" 
                onClick={() => onNavigateToAuth('login')}
                className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 interactive-button"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => onNavigateToAuth('signup-driver')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 interactive-button hover-glow"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6 overflow-hidden relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-left">
              <div className="inline-flex items-center gap-2 bg-purple-100 rounded-full px-4 py-2 mb-6 animate-slide-in-left stagger-1 hover-lift">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-purple-700">2,847 parking spots available now</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in-left">
                Smart Parking
                
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg animate-slide-in-left stagger-2">
                Find perfect parking spots instantly or monetize your unused space. 
                Join thousands who trust ParkMate for convenient, secure parking solutions.
              </p>

              {/* Tab Selection */}
              <div className="flex bg-gray-100 p-1 rounded-lg mb-8 max-w-md animate-slide-in-left stagger-3 modern-card">
                <button
                  onClick={() => setActiveTab('driver')}
                  className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-300 interactive-button ${
                    activeTab === 'driver'
                      ? 'bg-white text-purple-700 shadow-sm transform scale-105'
                      : 'text-gray-600 hover:text-gray-900 hover:scale-102'
                  }`}
                >
                  I need parking
                </button>
                <button
                  onClick={() => setActiveTab('owner')}
                  className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-300 interactive-button ${
                    activeTab === 'owner'
                      ? 'bg-white text-blue-700 shadow-sm transform scale-105'
                      : 'text-gray-600 hover:text-gray-900 hover:scale-102'
                  }`}
                >
                  I have space
                </button>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                {activeTab === 'driver' ? (
                  <>
                    <Button 
                      size="lg" 
                      onClick={() => onNavigateToAuth('signup-driver')}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-4 h-14 shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <Car className="w-5 h-5 mr-2" />
                      Find Parking Now
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      onClick={() => onNavigateToOverview('platform')}
                      className="text-lg px-8 py-4 h-14 border-gray-300 hover:bg-gray-50"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      How it Works
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      size="lg" 
                      onClick={() => onNavigateToAuth('signup-owner')}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-4 h-14 shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <DollarSign className="w-5 h-5 mr-2" />
                      Start Earning
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      onClick={() => onNavigateToOverview('host')}
                      className="text-lg px-8 py-4 h-14 border-gray-300 hover:bg-gray-50"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Learn More
                    </Button>
                  </>
                )}
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 bg-purple-200 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-blue-200 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-green-200 rounded-full border-2 border-white"></div>
                  </div>
                  <span>2,500+ happy users</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>4.8/5 rating</span>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1619335680796-54f13b88c6ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwYXJraW5nJTIwZ2FyYWdlJTIwY2Fyc3xlbnwxfHx8fDE3NTY3OTc1OTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Modern parking garage with smart technology"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent"></div>
                
                {/* Floating Elements */}
                <div className="absolute top-6 right-6 bg-white rounded-lg p-4 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-900">Available Now</span>
                  </div>
                </div>
                
                <div className="absolute bottom-6 left-6 bg-white rounded-lg p-4 shadow-lg">
                  <div className="text-sm text-gray-600">Starting from</div>
                  <div className="text-lg font-bold text-purple-600">$2.50/hour</div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-200 rounded-full blur-2xl opacity-60"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-200 rounded-full blur-2xl opacity-60"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Types Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Parking for Every Vehicle
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From motorcycles to trucks, find the perfect parking spot for your vehicle type with transparent pricing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1596784326488-23581279e33d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGxhcHRvcCUyMHdvcmtzcGFjZSUyMG1vZGVybnxlbnwxfHx8fDE3NTY3OTc2MDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Modern cars parked in garage"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
                    <Car className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Cars & Sedans</h3>
                    <p className="text-sm text-gray-500">Standard vehicles</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">Perfect for daily commuters and city travelers with secure, covered parking options.</p>
                <div className="flex items-center justify-between">
                  <Badge className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border-purple-200">
                    From $2.50/hour
                  </Badge>
                  <span className="text-sm text-gray-500">1,200+ spots</span>
                </div>
              </div>
            </Card>

            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1576740625743-9f8ea5f6dac8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGNpdHklMjBwYXJraW5nJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTY3OTc2MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Motorcycles and bikes in parking area"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                    <Bike className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Bikes & Motorcycles</h3>
                    <p className="text-sm text-gray-500">Two-wheelers</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">Convenient and affordable spots specifically designed for motorcycles and bicycles.</p>
                <div className="flex items-center justify-between">
                  <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200">
                    From $1.00/hour
                  </Badge>
                  <span className="text-sm text-gray-500">800+ spots</span>
                </div>
              </div>
            </Card>

            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1619335680796-54f13b88c6ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwYXJraW5nJTIwZ2FyYWdlJTIwY2Fyc3xlbnwxfHx8fDE3NTY3OTc1OTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Large vehicles and trucks parking"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 to-transparent"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center">
                    <Truck className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Trucks & Commercial</h3>
                    <p className="text-sm text-gray-500">Large vehicles</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">Spacious areas designed for trucks, vans, and other commercial vehicles.</p>
                <div className="flex items-center justify-between">
                  <Badge className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 border-indigo-200">
                    From $5.00/hour
                  </Badge>
                  <span className="text-sm text-gray-500">300+ spots</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How ParkMate Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple, secure, and efficient parking solutions in just three easy steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Search className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Search & Find</h3>
              <p className="text-gray-600">
                Enter your destination and find available parking spots near you with real-time availability updates.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Book & Pay</h3>
              <p className="text-gray-600">
                Reserve your spot instantly and pay securely through your preferred mobile wallet or payment method.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Navigate & Park</h3>
              <p className="text-gray-600">
                Get GPS directions to your reserved spot and enjoy hassle-free parking with our smart guidance system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section id="safety" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Your Safety is Our Priority
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We take security seriously with verified hosts, secure payments, and 24/7 support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white border-2 border-gray-100 shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <Shield className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Verified Hosts</h3>
              <p className="text-gray-600">
                All parking space owners undergo thorough verification by our admin team to ensure reliability and safety.
              </p>
            </Card>

            <Card className="bg-white border-2 border-gray-100 shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <CheckCircle className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure Payments</h3>
              <p className="text-gray-600">
                All transactions are encrypted and processed through trusted payment gateways with fraud protection.
              </p>
            </Card>

            <Card className="bg-white border-2 border-gray-100 shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <Users className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Reviews</h3>
              <p className="text-gray-600">
                Read authentic reviews from other users to make informed decisions about parking locations.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section id="support" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              We're Here to Help
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get support whenever you need it with our dedicated customer service team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-white border-0 shadow-lg p-8 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-sky-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
                  <p className="text-gray-600">
                    Our support team is available around the clock to assist you with any questions or issues.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-white border-0 shadow-lg p-8 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-violet-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Help Center</h3>
                  <p className="text-gray-600">
                    Access our comprehensive knowledge base with guides, FAQs, and troubleshooting tips.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about-us" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              About ParkMate
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Revolutionizing parking solutions for drivers and space owners
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-0 shadow-lg p-8">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                ParkMate was founded with a simple mission: to make parking easier, smarter, and more accessible for everyone. 
                We connect drivers with available parking spaces while helping property owners monetize their unused spots.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Our platform leverages cutting-edge technology to provide real-time availability, secure payments, and seamless 
                navigation. With thousands of satisfied users and verified hosts, we're building a trusted community that 
                transforms the way people think about parking.
              </p>
              <div className="flex items-center gap-2 text-purple-600 font-semibold">
                <Star className="w-5 h-5 fill-current" />
                <span>Trusted by 2,847+ users</span>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose ParkMate?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced features designed to make parking effortless for drivers and profitable for space owners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white border-0 shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Mobile Wallet Integration</h3>
              <p className="text-gray-600">
                Secure payments through bKash, Nagad, and other popular mobile wallets with instant transaction confirmations.
              </p>
            </Card>

            <Card className="bg-white border-0 shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-sky-100 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-time Availability</h3>
              <p className="text-gray-600">
                Live updates on parking spot availability with instant booking confirmation and flexible scheduling options.
              </p>
            </Card>

            <Card className="bg-white border-0 shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-violet-100 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Verified Hosts</h3>
              <p className="text-gray-600">
                All parking space owners are verified by our admin team to ensure safety and reliability for all users.
              </p>
            </Card>

            <Card className="bg-white border-0 shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">GPS Navigation</h3>
              <p className="text-gray-600">
                Integrated maps and GPS navigation to guide you directly to your reserved parking spot with step-by-step directions.
              </p>
            </Card>

            <Card className="bg-white border-0 shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Driven</h3>
              <p className="text-gray-600">
                Join thousands of satisfied users with ratings and reviews to help you make informed parking decisions.
              </p>
            </Card>

            <Card className="bg-white border-0 shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-100 to-rose-100 rounded-xl flex items-center justify-center mb-4">
                <Car className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Vehicle-Based Pricing</h3>
              <p className="text-gray-600">
                Fair and transparent pricing based on your vehicle type and size, with no hidden fees or surprise charges.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Trusted by Thousands</h2>
          <p className="text-purple-100 text-xl mb-12">Join our growing community of drivers and space owners</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">2,847</div>
              <div className="text-purple-200">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1,250</div>
              <div className="text-purple-200">Parking Spaces</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 flex items-center justify-center gap-1">
                4.8
                <Star className="w-8 h-8 fill-current text-yellow-300" />
              </div>
              <div className="text-purple-200">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-purple-200">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Parking Experience?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join ParkMate today and discover the future of smart parking solutions
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              onClick={() => onNavigateToAuth('signup-driver')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-4 h-14 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Car className="w-5 h-5 mr-2" />
              Start Finding Parking
            </Button>
            <Button 
              size="lg" 
              onClick={() => onNavigateToAuth('signup-owner')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-4 h-14 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <DollarSign className="w-5 h-5 mr-2" />
              Start Earning Income
            </Button>
          </div>

          <div className="text-sm text-gray-500">
            No setup fees • Cancel anytime • 24/7 support
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <ParkMateLogo size="lg" variant="full" className="text-white mb-4" />
              <p className="text-gray-400 mb-6 max-w-md">
                Smart parking solutions connecting drivers with available spaces while helping property owners monetize their unused spots.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                  <span className="text-sm font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                  <span className="text-sm font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                  <span className="text-sm font-bold">in</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <div className="space-y-2">
                <a href="#how-it-works" className="block text-gray-400 hover:text-white transition-colors">How it Works</a>
                <a href="#safety" className="block text-gray-400 hover:text-white transition-colors">Safety</a>
                <a href="#support" className="block text-gray-400 hover:text-white transition-colors">Support</a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2">
                <a href="#about-us" className="block text-gray-400 hover:text-white transition-colors">About Us</a>
                <a href="#contact" className="block text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#contact" className="block text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                <a href="#contact" className="block text-gray-400 hover:text-white transition-colors">Contact</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-500">
              © 2024 ParkMate. All rights reserved. Made with ❤️ for better parking experiences.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}