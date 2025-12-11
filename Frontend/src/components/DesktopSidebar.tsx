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
  AlertTriangle
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { RoleBasedMenu } from './ui/role-based-menu';

interface DesktopSidebarProps {
  userRole: 'driver' | 'host' | 'admin';
  currentPage: string;
  onPageChange: (page: string) => void;
  onSpecialNavigation?: (page: string) => void;
}

export function DesktopSidebar({ 
  userRole, 
  currentPage, 
  onPageChange, 
  onSpecialNavigation 
}: DesktopSidebarProps) {
  
  const handleNavigation = (id: string) => {
    // Map admin-specific actions to the main admin page
    if (id.startsWith('admin-')) {
      onSpecialNavigation?.('admin');
    } else if (['host-dashboard', 'add-space', 'bookings-manage', 'earnings', 'withdrawal', 'admin', 'filters', 'payment'].includes(id)) {
      onSpecialNavigation?.(id);
    } else {
      onPageChange(id);
    }
  };

  const driverQuickActions = [
    { id: 'filters', label: 'Search Filters', icon: Filter, badge: null },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard, badge: null },
    { id: 'bookings', label: 'Recent Bookings', icon: Clock, badge: '3' },
  ];

  const hostQuickActions = [
    { id: 'add-space', label: 'Add New Space', icon: Plus, badge: null },
    { id: 'earnings', label: 'Earnings', icon: DollarSign, badge: 'new' },
    { id: 'bookings-manage', label: 'Pending Requests', icon: Users, badge: '5' },
    { id: 'withdrawal', label: 'Withdraw Funds', icon: TrendingUp, badge: null },
  ];

  const adminQuickActions = [
    { id: 'admin-verification', label: 'Verification Queue', icon: Shield, badge: '12' },
    { id: 'admin-analytics', label: 'Platform Analytics', icon: BarChart3, badge: null },
    { id: 'admin-disputes', label: 'Dispute Resolution', icon: AlertTriangle, badge: '3' },
  ];

  const getCurrentActions = () => {
    switch (userRole) {
      case 'driver': return driverQuickActions;
      case 'host': return hostQuickActions;
      case 'admin': return adminQuickActions;
      default: return [];
    }
  };

  const currentActions = getCurrentActions();

  return (
    <aside 
      className="w-80 bg-white/90 backdrop-blur-md border-r border-white/20 p-6 space-y-6 overflow-y-auto"
      aria-label="Navigation sidebar with role-based menu and quick access"
      role="complementary"
    >
      
      {/* Enhanced Role-Based Menu Button */}
      <RoleBasedMenu 
        userRole={userRole} 
        onNavigation={handleNavigation}
      />

      <Separator />

      {/* Quick Actions */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="space-y-2">
          {currentActions.map(({ id, label, icon: Icon, badge }) => (
            <Button
              key={id}
              variant="ghost"
              className="w-full justify-start gap-3 h-auto p-3 hover:bg-purple-50 rounded-xl transition-all duration-200"
              onClick={() => handleNavigation(id)}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                <Icon className="w-4 h-4 text-purple-600" />
              </div>
              <span className="flex-1 text-left">{label}</span>
              {badge && (
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${
                    badge === 'new' ? 'bg-green-100 text-green-700' : 
                    'bg-purple-100 text-purple-700'
                  }`}
                >
                  {badge}
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Role-Specific Feature Highlights */}
      <Card className="glass-card professional-shadow p-4 border-0">
        <h3 className="font-semibold text-gray-900 mb-3">
          {userRole === 'driver' ? 'Driver Benefits' : 
           userRole === 'host' ? 'Host Advantages' : 
           'Admin Capabilities'}
        </h3>
        
        <div className="space-y-3 text-sm">
          {userRole === 'driver' && (
            <>
              <div className="flex items-start gap-3 p-2 bg-purple-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium text-gray-900">Smart Search</div>
                  <div className="text-gray-600">AI-powered parking recommendations</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-2 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium text-gray-900">Real-time Updates</div>
                  <div className="text-gray-600">Live availability and pricing</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-2 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium text-gray-900">Mobile Payments</div>
                  <div className="text-gray-600">Secure wallet integration</div>
                </div>
              </div>
            </>
          )}

          {userRole === 'host' && (
            <>
              <div className="flex items-start gap-3 p-2 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium text-gray-900">Revenue Optimization</div>
                  <div className="text-gray-600">Dynamic pricing and analytics</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-2 bg-purple-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium text-gray-900">Easy Management</div>
                  <div className="text-gray-600">Centralized space control</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-2 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium text-gray-900">Verified Platform</div>
                  <div className="text-gray-600">Trusted host verification</div>
                </div>
              </div>
            </>
          )}

          {userRole === 'admin' && (
            <>
              <div className="flex items-start gap-3 p-2 bg-red-50 rounded-lg">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium text-gray-900">User Management</div>
                  <div className="text-gray-600">Complete user oversight</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-2 bg-orange-50 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium text-gray-900">Platform Analytics</div>
                  <div className="text-gray-600">Comprehensive reporting</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-2 bg-purple-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium text-gray-900">Security Control</div>
                  <div className="text-gray-600">Platform security management</div>
                </div>
              </div>
            </>
          )}
        </div>
      </Card>

    </aside>
  );
}