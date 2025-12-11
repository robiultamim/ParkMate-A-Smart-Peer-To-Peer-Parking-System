import { useState } from 'react';
import { 
  Car, 
  MapPin, 
  DollarSign, 
  Shield, 
  Smartphone, 
  Clock, 
  Users, 
  Star, 
  Filter, 
  Navigation, 
  CheckCircle, 
  BarChart3,
  Settings,
  UserCheck,
  Gavel,
  Lock,
  TrendingUp,
  CreditCard,
  Plus,
  Search,
  Eye,
  ArrowRight,
  Menu,
  X,
  Phone,
  Mail,
  MessageSquare,
  Globe,
  Zap,
  Target,
  Award,
  Truck,
  Bike
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { BackButton } from '../ui/back-button';

interface ComprehensiveDashboardPageProps {
  onNavigateToAuth: (type: 'login' | 'signup-driver' | 'signup-owner') => void;
  onNavigateBack: () => void;
  onNavigateToFeature?: (feature: string) => void;
}

export function ComprehensiveDashboardPage({ 
  onNavigateToAuth, 
  onNavigateBack,
  onNavigateToFeature 
}: ComprehensiveDashboardPageProps) {
  const [activeSection, setActiveSection] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const platformFeatures = [
    {
      id: 'smart-search',
      title: 'Smart Parking Search',
      description: 'AI-powered search algorithm that finds the perfect parking spot based on your preferences, location, and real-time availability.',
      icon: Search,
      color: 'from-purple-500 to-blue-500',
      stats: '2,847 spots available',
      benefits: ['Real-time availability', 'Advanced filtering', 'Price comparison', 'Distance optimization']
    },
    {
      id: 'mobile-payments',
      title: 'Mobile Wallet Integration',
      description: 'Seamless payments through popular mobile wallets including bKash, Nagad, Rocket, and traditional payment cards.',
      icon: Smartphone,
      color: 'from-green-500 to-emerald-500',
      stats: '99.9% success rate',
      benefits: ['bKash integration', 'Nagad support', 'Rocket wallet', 'Card payments']
    },
    {
      id: 'space-management',
      title: 'Space Management System',
      description: 'Comprehensive tools for space owners to list, manage, and optimize their parking spaces with dynamic pricing.',
      icon: MapPin,
      color: 'from-blue-500 to-indigo-500',
      stats: '1,250+ listed spaces',
      benefits: ['Dynamic pricing', 'Booking control', 'Revenue analytics', 'Real-time updates']
    },
    {
      id: 'admin-controls',
      title: 'Platform Administration',
      description: 'Complete administrative suite for platform management, user verification, and dispute resolution.',
      icon: Shield,
      color: 'from-red-500 to-pink-500',
      stats: '24/7 monitoring',
      benefits: ['User verification', 'Dispute resolution', 'Platform analytics', 'Security controls']
    }
  ];

  const userRoles = [
    {
      id: 'drivers',
      title: 'Drivers',
      description: 'Find and book parking spots with ease',
      icon: Car,
      color: 'from-purple-500 to-blue-500',
      userCount: '15,000+',
      features: [
        'Smart Search with advanced filters',
        'Real-time availability updates',
        'GPS navigation to reserved spots',
        'Mobile wallet payments',
        'Vehicle type support (cars, bikes, trucks)',
        'Booking management and history'
      ],
      goals: [
        'Find convenient parking quickly',
        'Save money on parking costs',
        'Avoid parking tickets and fines',
        'Navigate efficiently to destinations'
      ]
    },
    {
      id: 'hosts',
      title: 'Space Owners',
      description: 'Monetize your parking spaces efficiently',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500',
      userCount: '3,500+',
      features: [
        'Space listing and management',
        'Dynamic pricing by vehicle type',
        'Booking approval controls',
        'Revenue analytics and tracking',
        'Mobile wallet withdrawals',
        'Admin-verified listings'
      ],
      goals: [
        'Generate passive income',
        'Maximize space utilization',
        'Control booking preferences',
        'Track earnings and performance'
      ]
    },
    {
      id: 'admins',
      title: 'Administrators',
      description: 'Oversee platform operations and security',
      icon: Shield,
      color: 'from-red-500 to-pink-500',
      userCount: '25+',
      features: [
        'User verification and approval',
        'Dispute resolution system',
        'Platform analytics dashboard',
        'Revenue and commission tracking',
        'Security and compliance controls',
        'System performance monitoring'
      ],
      goals: [
        'Ensure platform security',
        'Maintain service quality',
        'Resolve user conflicts',
        'Monitor platform growth'
      ]
    }
  ];

  const navigationSections = [
    { id: 'overview', label: 'Platform Overview', icon: Globe },
    { id: 'features', label: 'Key Features', icon: Zap },
    { id: 'users', label: 'User Roles', icon: Users },
    { id: 'dashboard', label: 'Dashboard Navigation', icon: BarChart3 },
    { id: 'contact', label: 'Contact & Support', icon: MessageSquare }
  ];

  const platformStats = [
    { label: 'Total Users', value: '18,500+', icon: Users, color: 'text-blue-600' },
    { label: 'Active Spaces', value: '1,250+', icon: MapPin, color: 'text-green-600' },
    { label: 'Daily Bookings', value: '850+', icon: CheckCircle, color: 'text-purple-600' },
    { label: 'Cities Covered', value: '12', icon: Globe, color: 'text-orange-600' }
  ];

  const dashboardFeatures = [
    {
      category: 'Driver Dashboard',
      items: [
        { name: 'Parking Search', icon: Search, path: 'search' },
        { name: 'My Bookings', icon: Clock, path: 'bookings' },
        { name: 'Payment Methods', icon: CreditCard, path: 'payments' },
        { name: 'Profile Settings', icon: Settings, path: 'profile' }
      ]
    },
    {
      category: 'Host Dashboard',
      items: [
        { name: 'Space Management', icon: MapPin, path: 'spaces' },
        { name: 'Earnings Analytics', icon: BarChart3, path: 'earnings' },
        { name: 'Booking Requests', icon: CheckCircle, path: 'requests' },
        { name: 'Withdrawal', icon: DollarSign, path: 'withdrawal' }
      ]
    },
    {
      category: 'Admin Dashboard',
      items: [
        { name: 'User Verification', icon: UserCheck, path: 'verification' },
        { name: 'Dispute Resolution', icon: Gavel, path: 'disputes' },
        { name: 'Platform Analytics', icon: BarChart3, path: 'analytics' },
        { name: 'Security Controls', icon: Lock, path: 'security' }
      ]
    }
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <BackButton onClick={onNavigateBack} />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <Car className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    ParkMate
                  </h1>
                  <p className="text-sm text-gray-600">Comprehensive Platform Overview</p>
                </div>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navigationSections.map((section) => (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => scrollToSection(section.id)}
                  className={`${
                    activeSection === section.id 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                      : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  <section.icon className="w-4 h-4 mr-2" />
                  {section.label}
                </Button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col gap-2">
                {navigationSections.map((section) => (
                  <Button
                    key={section.id}
                    variant={activeSection === section.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => scrollToSection(section.id)}
                    className={`justify-start ${
                      activeSection === section.id 
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                        : 'text-gray-600'
                    }`}
                  >
                    <section.icon className="w-4 h-4 mr-2" />
                    {section.label}
                  </Button>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        
        {/* Platform Overview Section */}
        <section id="overview" className="space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-full">
              <Award className="w-5 h-5 text-purple-600" />
              <span className="text-purple-700 font-medium">Leading Parking Platform</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Welcome to <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">ParkMate</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The comprehensive parking platform that connects drivers with space owners through smart technology, 
              mobile payments, and real-time availability. Serving three distinct user groups with tailored experiences.
            </p>
          </div>

          {/* Platform Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {platformStats.map((stat, index) => (
              <Card key={index} className="glass-card professional-shadow p-6 text-center hover-lift animate-fade-in" 
                    style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </Card>
            ))}
          </div>

          {/* Target Audience */}
          <Card className="glass-card professional-shadow-lg p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Target Audience</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                ParkMate serves three distinct user groups, each with unique needs and goals in the parking ecosystem.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {userRoles.map((role, index) => (
                <div key={role.id} className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white hover-lift animate-fade-in"
                     style={{ animationDelay: `${index * 0.15}s` }}>
                  <div className={`w-16 h-16 bg-gradient-to-r ${role.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <role.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{role.title}</h4>
                  <p className="text-gray-600 mb-3">{role.description}</p>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    {role.userCount} active users
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Key Features Section */}
        <section id="features" className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Platform Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the powerful features that make ParkMate the leading parking platform
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {platformFeatures.map((feature, index) => (
              <Card key={feature.id} className="glass-card professional-shadow-lg overflow-hidden hover-lift animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <Badge variant="outline" className="border-purple-200 text-purple-700 bg-purple-50">
                      {feature.stats}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Key Benefits:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {feature.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* User Roles & Goals Section */}
        <section id="users" className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">User Roles & Their Goals</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Understanding each user type and their specific objectives on our platform
            </p>
          </div>

          <div className="space-y-8">
            {userRoles.map((role, index) => (
              <Card key={role.id} className="glass-card professional-shadow-lg p-8 hover-lift animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-r ${role.color} rounded-2xl flex items-center justify-center`}>
                        <role.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{role.title}</h3>
                        <p className="text-gray-600">{role.description}</p>
                        <Badge variant="secondary" className="mt-2 bg-purple-100 text-purple-700">
                          {role.userCount} users
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-4">Available Features:</h4>
                      <div className="space-y-2">
                        {role.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-4">User Goals:</h4>
                    <div className="space-y-4">
                      {role.goals.map((goal, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
                          <Target className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 font-medium">{goal}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6">
                      <Button 
                        className={`w-full bg-gradient-to-r ${role.color} hover:opacity-90 text-white`}
                        onClick={() => onNavigateToAuth(role.id === 'hosts' ? 'signup-owner' : 'signup-driver')}
                      >
                        Join as {role.title.slice(0, -1)}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Dashboard Navigation Section */}
        <section id="dashboard" className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Dashboard Navigation</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Quick access to all dashboard features organized by user role
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {dashboardFeatures.map((category, index) => (
              <Card key={category.category} className="glass-card professional-shadow-lg p-6 hover-lift animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}>
                <h3 className="text-xl font-bold text-gray-900 mb-6">{category.category}</h3>
                <div className="space-y-3">
                  {category.items.map((item, idx) => (
                    <Button
                      key={idx}
                      variant="ghost"
                      className="w-full justify-start gap-3 h-auto p-4 hover:bg-purple-50 rounded-xl"
                      onClick={() => onNavigateToFeature?.(item.path)}
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">{item.name}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
                    </Button>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <Card className="glass-card professional-shadow-lg p-8 text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Join thousands of users who trust ParkMate for their parking needs. Choose your role and start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary" 
                className="bg-white text-purple-600 hover:bg-gray-100"
                onClick={() => onNavigateToAuth('signup-driver')}
              >
                <Car className="w-5 h-5 mr-2" />
                Join as Driver
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-purple-600"
                onClick={() => onNavigateToAuth('signup-owner')}
              >
                <DollarSign className="w-5 h-5 mr-2" />
                Join as Space Owner
              </Button>
            </div>
          </Card>
        </section>

        {/* Contact & Support Section */}
        <section id="contact" className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact & Support</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get help, support, or connect with our team for partnership opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="glass-card professional-shadow p-6 text-center hover-lift animate-fade-in">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Phone Support</h3>
              <p className="text-gray-600 text-sm mb-3">24/7 customer service</p>
              <p className="text-purple-600 font-medium">+880-1700-000000</p>
            </Card>

            <Card className="glass-card professional-shadow p-6 text-center hover-lift animate-fade-in stagger-1">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 text-sm mb-3">General inquiries</p>
              <p className="text-purple-600 font-medium">support@parkmate.app</p>
            </Card>

            <Card className="glass-card professional-shadow p-6 text-center hover-lift animate-fade-in stagger-2">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-gray-600 text-sm mb-3">Instant messaging</p>
              <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600">
                Start Chat
              </Button>
            </Card>

            <Card className="glass-card professional-shadow p-6 text-center hover-lift animate-fade-in stagger-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Help Center</h3>
              <p className="text-gray-600 text-sm mb-3">FAQs & guides</p>
              <Button size="sm" variant="outline" className="border-purple-200 text-purple-600">
                Visit Center
              </Button>
            </Card>
          </div>

          {/* Additional Support Information */}
          <Card className="glass-card professional-shadow-lg p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Support Hours</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-medium text-gray-900">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday - Sunday</span>
                    <span className="font-medium text-gray-900">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Emergency Support</span>
                    <span className="font-medium text-green-600">Always Available</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Response Times</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Live Chat</span>
                    <span className="font-medium text-gray-900">Instant</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email Support</span>
                    <span className="font-medium text-gray-900">Within 2 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone Support</span>
                    <span className="font-medium text-gray-900">Immediate</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <Car className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">ParkMate</h3>
              </div>
              <p className="text-gray-400 mb-4">
                The comprehensive parking platform connecting drivers with space owners through smart technology.
              </p>
              <div className="flex gap-3">
                <Badge variant="secondary" className="bg-gray-800 text-gray-300">18,500+ Users</Badge>
                <Badge variant="secondary" className="bg-gray-800 text-gray-300">1,250+ Spaces</Badge>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#overview" className="block text-gray-400 hover:text-white transition-colors">Platform Overview</a>
                <a href="#features" className="block text-gray-400 hover:text-white transition-colors">Key Features</a>
                <a href="#users" className="block text-gray-400 hover:text-white transition-colors">User Roles</a>
                <a href="#dashboard" className="block text-gray-400 hover:text-white transition-colors">Dashboard</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Contact Information</h4>
              <div className="space-y-2 text-gray-400">
                <p>📧 support@parkmate.app</p>
                <p>📞 +880-1700-000000</p>
                <p>🌐 www.parkmate.app</p>
                <p>📍 Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>
          
          <Separator className="my-8 bg-gray-800" />
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2024 ParkMate. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}