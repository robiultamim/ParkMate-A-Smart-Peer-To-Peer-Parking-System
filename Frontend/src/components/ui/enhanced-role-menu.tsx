import { useState } from 'react';
import { 
  Car, 
  DollarSign, 
  Shield, 
  MapPin, 
  Clock, 
  Star, 
  Settings, 
  Bell, 
  User, 
  CreditCard,
  Filter,
  Calendar,
  BarChart3,
  Plus,
  Users,
  Gavel,
  UserCheck,
  TrendingUp,
  Activity,
  Smartphone,
  Navigation,
  Heart,
  AlertCircle,
  CheckCircle,
  Eye,
  Search,
  Zap,
  Target,
  Award,
  Globe,
  RefreshCw,
  Download,
  Edit,
  Trash2,
  ChevronDown,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { Button } from './button';
import { Card } from './card';
import { Badge } from './badge';
import { Separator } from './separator';
import { ScrollArea } from './scroll-area';

interface EnhancedRoleMenuProps {
  userRole: 'driver' | 'host' | 'admin';
  userName?: string;
  userEmail?: string;
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  notificationCount?: number;
}

export function EnhancedRoleMenu({ 
  userRole, 
  userName = "John Doe", 
  userEmail = "john@example.com",
  isOpen, 
  onToggle, 
  onNavigate, 
  onLogout,
  notificationCount = 0 
}: EnhancedRoleMenuProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['main']);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const menuConfig = {
    driver: {
      title: 'Driver Dashboard',
      subtitle: 'Find & book parking',
      icon: Car,
      color: 'from-purple-600 to-blue-600',
      stats: [
        { label: 'Available Spots', value: '2,847', icon: MapPin },
        { label: 'Saved Favorites', value: '12', icon: Heart },
        { label: 'This Month', value: '$89', icon: DollarSign }
      ],
      sections: [
        {
          id: 'main',
          title: 'Main Features',
          items: [
            { id: 'find', label: 'Find Parking', icon: Search, badge: 'Hot' },
            { id: 'map', label: 'Map View', icon: MapPin },
            { id: 'bookings', label: 'My Bookings', icon: Calendar, badge: notificationCount > 0 ? notificationCount.toString() : undefined },
            { id: 'payment', label: 'Payment Methods', icon: CreditCard }
          ]
        },
        {
          id: 'tools',
          title: 'Tools & Settings',
          items: [
            { id: 'filters', label: 'Search Filters', icon: Filter },
            { id: 'favorites', label: 'Saved Spots', icon: Heart },
            { id: 'profile', label: 'Profile Settings', icon: User },
            { id: 'notifications', label: 'Notifications', icon: Bell, badge: notificationCount > 0 ? notificationCount.toString() : undefined }
          ]
        },
        {
          id: 'quick',
          title: 'Quick Actions',
          items: [
            { id: 'reserve-later', label: 'Reserve for Later', icon: Clock },
            { id: 'navigation', label: 'GPS Navigation', icon: Navigation },
            { id: 'help', label: 'Help & Support', icon: AlertCircle }
          ]
        }
      ]
    },
    host: {
      title: 'Host Control Center',
      subtitle: 'Manage spaces & earnings',
      icon: DollarSign,
      color: 'from-green-600 to-emerald-600',
      stats: [
        { label: 'Monthly Earnings', value: '$2,847', icon: DollarSign },
        { label: 'Active Spaces', value: '5', icon: MapPin },
        { label: 'Pending Requests', value: '3', icon: Clock }
      ],
      sections: [
        {
          id: 'main',
          title: 'Space Management',
          items: [
            { id: 'host-dashboard', label: 'Host Dashboard', icon: BarChart3 },
            { id: 'add-space', label: 'Add New Space', icon: Plus, badge: 'New' },
            { id: 'bookings-manage', label: 'Manage Bookings', icon: Calendar, badge: '3' }
          ]
        },
        {
          id: 'earnings',
          title: 'Revenue & Analytics',
          items: [
            { id: 'earnings', label: 'Earnings Dashboard', icon: TrendingUp },
            { id: 'withdrawal', label: 'Withdraw Funds', icon: Smartphone },
            { id: 'analytics', label: 'Performance Analytics', icon: Activity },
            { id: 'reports', label: 'Financial Reports', icon: Download }
          ]
        },
        {
          id: 'tools',
          title: 'Tools & Settings',
          items: [
            { id: 'profile', label: 'Host Profile', icon: User },
            { id: 'settings', label: 'Space Settings', icon: Settings },
            { id: 'notifications', label: 'Notifications', icon: Bell, badge: notificationCount > 0 ? notificationCount.toString() : undefined },
            { id: 'help', label: 'Host Support', icon: AlertCircle }
          ]
        }
      ]
    },
    admin: {
      title: 'Admin Control Panel',
      subtitle: 'Platform management',
      icon: Shield,
      color: 'from-red-600 to-pink-600',
      stats: [
        { label: 'Total Users', value: '18,542', icon: Users },
        { label: 'Platform Revenue', value: '$47,892', icon: DollarSign },
        { label: 'Active Disputes', value: '23', icon: Gavel }
      ],
      sections: [
        {
          id: 'main',
          title: 'Core Management',
          items: [
            { id: 'admin', label: 'Admin Dashboard', icon: BarChart3 },
            { id: 'user-management', label: 'User Management', icon: Users },
            { id: 'verification', label: 'Host Verification', icon: UserCheck, badge: '47' },
            { id: 'disputes', label: 'Dispute Resolution', icon: Gavel, badge: '23' }
          ]
        },
        {
          id: 'analytics',
          title: 'Analytics & Reports',
          items: [
            { id: 'platform-analytics', label: 'Platform Analytics', icon: TrendingUp },
            { id: 'revenue-tracking', label: 'Revenue Tracking', icon: DollarSign },
            { id: 'performance', label: 'Performance Metrics', icon: Activity },
            { id: 'reports', label: 'System Reports', icon: Download }
          ]
        },
        {
          id: 'system',
          title: 'System Controls',
          items: [
            { id: 'platform-settings', label: 'Platform Settings', icon: Settings },
            { id: 'security', label: 'Security Controls', icon: Shield },
            { id: 'notifications', label: 'System Alerts', icon: Bell, badge: notificationCount > 0 ? notificationCount.toString() : undefined },
            { id: 'maintenance', label: 'Maintenance', icon: RefreshCw }
          ]
        }
      ]
    }
  };

  const config = menuConfig[userRole];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:relative lg:inset-auto">
      {/* Backdrop for mobile */}
      <div 
        className="fixed inset-0 bg-black/50 lg:hidden"
        onClick={onToggle}
      />
      
      {/* Menu Panel */}
      <Card className="fixed right-4 top-20 w-80 max-h-[calc(100vh-6rem)] lg:absolute lg:right-0 lg:top-full lg:mt-2 glass-card professional-shadow-xl border-0 overflow-hidden animate-slide-in-right">
        {/* Header */}
        <div className={`bg-gradient-to-r ${config.color} text-white p-6`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <config.icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{config.title}</h3>
              <p className="text-white/80 text-sm">{config.subtitle}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="text-white hover:bg-white/20 h-8 w-8"
            >
              ×
            </Button>
          </div>
          
          {/* User Info */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{userName}</p>
              <p className="text-white/70 text-xs truncate">{userEmail}</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-2">
            {config.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-6 h-6 mx-auto mb-1 flex items-center justify-center">
                  <stat.icon className="w-4 h-4" />
                </div>
                <div className="text-xs font-semibold">{stat.value}</div>
                <div className="text-xs text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Menu Content */}
        <ScrollArea className="flex-1 p-4 max-h-96">
          <div className="space-y-4">
            {config.sections.map((section) => (
              <div key={section.id}>
                <Button
                  variant="ghost"
                  onClick={() => toggleSection(section.id)}
                  className="w-full justify-between h-8 mb-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                >
                  <span className="text-sm font-medium">{section.title}</span>
                  {expandedSections.includes(section.id) ? 
                    <ChevronDown className="w-4 h-4" /> : 
                    <ChevronRight className="w-4 h-4" />
                  }
                </Button>
                
                {expandedSections.includes(section.id) && (
                  <div className="space-y-1 ml-2">
                    {section.items.map((item) => (
                      <Button
                        key={item.id}
                        variant="ghost"
                        onClick={() => {
                          onNavigate(item.id);
                          onToggle();
                        }}
                        className="w-full justify-start h-10 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      >
                        <item.icon className="w-4 h-4 mr-3" />
                        <span className="flex-1 text-left">{item.label}</span>
                        {item.badge && (
                          <Badge 
                            variant="secondary" 
                            className={`ml-2 h-5 text-xs ${
                              item.badge === 'Hot' || item.badge === 'New' 
                                ? 'bg-red-100 text-red-700' 
                                : 'bg-purple-100 text-purple-700'
                            }`}
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="space-y-2">
            <Button
              variant="ghost"
              onClick={() => {
                onNavigate('settings');
                onToggle();
              }}
              className="w-full justify-start h-10 text-gray-600 hover:text-gray-900"
            >
              <Settings className="w-4 h-4 mr-3" />
              Settings
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                onLogout();
                onToggle();
              }}
              className="w-full justify-start h-10 text-gray-600 hover:text-gray-900 hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}