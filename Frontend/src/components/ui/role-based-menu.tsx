import { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  CreditCard, 
  Filter, 
  Star, 
  Plus, 
  DollarSign, 
  Users, 
  Settings, 
  TrendingUp,
  Car,
  Shield,
  BarChart3,
  AlertTriangle,
  Navigation,
  Smartphone,
  CheckCircle,
  Eye,
  UserCheck,
  Gavel,
  Lock,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';
import { Button } from './button';
import { Card } from './card';
import { Badge } from './badge';
import { Separator } from './separator';

interface RoleBasedMenuProps {
  userRole: 'driver' | 'host' | 'admin';
  onNavigation: (action: string) => void;
}

export function RoleBasedMenu({ userRole, onNavigation }: RoleBasedMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (action: string) => {
    // Map menu actions to actual navigation
    const actionMap: { [key: string]: string } = {
      'smart-search': 'filters',
      'real-time': 'map',
      'mobile-payments': 'payment',
      'gps-navigation': 'map',
      'vehicle-support': 'profile',
      'booking-management': 'bookings',
      'space-management': 'host-dashboard',
      'dynamic-pricing': 'vehicle-pricing',
      'booking-control': 'bookings-manage',
      'revenue-analytics': 'earnings',
      'wallet-integration': 'withdrawal',
      'verification-system': 'profile',
      'user-verification': 'admin',
      'dispute-resolution': 'admin',
      'platform-analytics': 'admin',
      'revenue-management': 'admin',
      'security-controls': 'admin',
      'support': 'help'
    };

    const targetPage = actionMap[action] || action;
    onNavigation(targetPage);
  };

  const driverFunctions = [
    { id: 'smart-search', label: 'Smart Search', subtitle: 'Find parking with advanced filters', icon: Filter, badge: 'new' },
    { id: 'real-time', label: 'Real-time Availability', subtitle: 'Live parking spot updates', icon: Clock, badge: null },
    { id: 'mobile-payments', label: 'Mobile Payments', subtitle: 'bKash, Nagad, Rocket, Cards', icon: Smartphone, badge: null },
    { id: 'gps-navigation', label: 'GPS Navigation', subtitle: 'Directions to your spot', icon: Navigation, badge: null },
    { id: 'vehicle-support', label: 'Vehicle Support', subtitle: 'Cars, bikes, trucks, commercial', icon: Car, badge: null },
    { id: 'booking-management', label: 'Booking Management', subtitle: 'View, modify, cancel reservations', icon: CheckCircle, badge: null }
  ];

  const hostFunctions = [
    { id: 'space-management', label: 'Space Management', subtitle: 'List and manage parking spaces', icon: MapPin, badge: null },
    { id: 'booking-control', label: 'Booking Control', subtitle: 'Approve or decline requests', icon: CheckCircle, badge: null },
    { id: 'revenue-analytics', label: 'Revenue Analytics', subtitle: 'Track earnings and performance', icon: BarChart3, badge: null },
    { id: 'wallet-integration', label: 'Mobile Wallet Integration', subtitle: 'Withdraw to bKash, Nagad', icon: Smartphone, badge: null },
    { id: 'verification-system', label: 'Verification System', subtitle: 'Admin-verified listings', icon: Shield, badge: null }
  ];

  const adminFunctions = [
    { id: 'user-verification', label: 'User Verification', subtitle: 'Review and approve host applications', icon: UserCheck, badge: '12' },
    { id: 'dispute-resolution', label: 'Dispute Resolution', subtitle: 'Handle conflicts between users', icon: Gavel, badge: '3' },
    { id: 'platform-analytics', label: 'Platform Analytics', subtitle: 'Monitor system performance', icon: BarChart3, badge: null },
    { id: 'revenue-management', label: 'Revenue Management', subtitle: 'Track platform commissions', icon: TrendingUp, badge: null },
    { id: 'security-controls', label: 'Security Controls', subtitle: 'Platform security and compliance', icon: Lock, badge: null }
  ];

  const getCurrentFunctions = () => {
    switch (userRole) {
      case 'driver': return driverFunctions;
      case 'host': return hostFunctions;
      case 'admin': return adminFunctions;
      default: return driverFunctions;
    }
  };

  const getRoleTitle = () => {
    switch (userRole) {
      case 'driver': return 'Driver Functions';
      case 'host': return 'Host Management';
      case 'admin': return 'Admin Controls';
      default: return 'Functions';
    }
  };

  const getRoleStats = () => {
    switch (userRole) {
      case 'driver': 
        return [
          { label: 'Total Bookings', value: '24', color: 'bg-purple-100 text-purple-700' },
          { label: 'Money Saved', value: '$127', color: 'bg-green-100 text-green-700' },
          { label: 'Favorite Spots', value: '8', color: 'bg-blue-100 text-blue-700' }
        ];
      case 'host':
        return [
          { label: 'Active Spaces', value: '3', color: 'bg-purple-100 text-purple-700' },
          { label: 'Monthly Earnings', value: '$1,245', color: 'bg-green-100 text-green-700' },
          { label: 'Avg Rating', value: '4.8', color: 'bg-yellow-100 text-yellow-700' }
        ];
      case 'admin':
        return [
          { label: 'Total Users', value: '2,847', color: 'bg-purple-100 text-purple-700' },
          { label: 'Daily Revenue', value: '$3,429', color: 'bg-green-100 text-green-700' },
          { label: 'Active Disputes', value: '3', color: 'bg-red-100 text-red-700' }
        ];
      default: return [];
    }
  };

  const currentFunctions = getCurrentFunctions();
  const roleStats = getRoleStats();

  return (
    <div className="relative">
      {/* Menu Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-16 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white professional-shadow-lg hover-lift transition-all duration-300 ${
          isOpen ? 'rounded-t-2xl rounded-b-none' : 'rounded-2xl'
        }`}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Menu className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-lg">{getRoleTitle()}</div>
              <div className="text-sm opacity-90">Quick access menu</div>
            </div>
          </div>
          <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <Card className="absolute top-16 left-0 right-0 z-50 glass-card professional-shadow-xl border-0 rounded-t-none rounded-b-2xl max-h-96 overflow-hidden">
          <div className="max-h-96 overflow-y-auto">
            {/* Stats Section */}
            <div className="p-4 bg-gradient-to-br from-purple-50 to-blue-50">
              <h3 className="font-semibold text-gray-900 mb-3">
                {userRole === 'driver' ? 'Your Activity' : 
                 userRole === 'host' ? 'Your Stats' : 
                 'Platform Overview'}
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {roleStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <Badge variant="secondary" className={`${stat.color} font-semibold`}>
                      {stat.value}
                    </Badge>
                    <p className="text-xs text-gray-600 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Functions List */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Available Functions</h3>
              <div className="space-y-2">
                {currentFunctions.map((func) => (
                  <Button
                    key={func.id}
                    variant="ghost"
                    className="w-full justify-start gap-3 h-auto p-3 hover:bg-purple-50 rounded-xl transition-all duration-200"
                    onClick={() => {
                      handleNavigation(func.id);
                      setIsOpen(false);
                    }}
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <func.icon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-gray-900">{func.label}</div>
                      <div className="text-sm text-gray-600">{func.subtitle}</div>
                    </div>
                    {func.badge && (
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${
                          func.badge === 'new' ? 'bg-green-100 text-green-700' : 
                          func.badge === 'hot' ? 'bg-orange-100 text-orange-700' :
                          'bg-purple-100 text-purple-700'
                        }`}
                      >
                        {func.badge}
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Recent Activity Section */}
            <div className="p-4 bg-gray-50">
              <h3 className="font-semibold text-gray-900 mb-3">
                {userRole === 'driver' ? 'Recent Searches' : 
                 userRole === 'host' ? 'Recent Bookings' : 
                 'Recent Platform Activity'}
              </h3>
              
              <div className="space-y-3 text-sm">
                {userRole === 'driver' && (
                  <>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span className="text-gray-600">Downtown Plaza - 2 hours ago</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span className="text-gray-600">Mall Parking - Yesterday</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span className="text-gray-600">Airport Terminal - 3 days ago</span>
                    </div>
                  </>
                )}

                {userRole === 'host' && (
                  <>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-green-500" />
                      <span className="text-gray-600">Space A - Confirmed booking</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-yellow-500" />
                      <span className="text-gray-600">Space B - Pending approval</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-3 h-3 text-green-500" />
                      <span className="text-gray-600">Payout received - $89</span>
                    </div>
                  </>
                )}

                {userRole === 'admin' && (
                  <>
                    <div className="flex items-center gap-2">
                      <Users className="w-3 h-3 text-blue-500" />
                      <span className="text-gray-600">15 new user registrations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-3 h-3 text-green-500" />
                      <span className="text-gray-600">8 verifications completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-3 h-3 text-red-500" />
                      <span className="text-gray-600">2 new disputes reported</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Help Section */}
            <div className="p-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Get support or check our documentation for answers to common questions.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-blue-300 text-blue-700 hover:bg-blue-100"
                  onClick={() => {
                    handleNavigation('support');
                    setIsOpen(false);
                  }}
                >
                  Contact Support
                </Button>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <div className="absolute top-2 right-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}