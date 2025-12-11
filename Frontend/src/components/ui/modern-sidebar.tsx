import { useState } from 'react';
import {
  Home,
  Search,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Settings,
  HelpCircle,
  Plus,
  BarChart3,
  Shield,
  Bell,
  User,
  Car,
  Clock,
  Filter,
  CreditCard,
  FileText,
  Activity,
  Target,
  TrendingUp,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { Button } from './button';
import { Badge } from './badge';
import { Card } from './card';
import { Separator } from './separator';

interface ModernSidebarProps {
  userRole: 'driver' | 'host' | 'admin';
  currentPage: string;
  onNavigate: (page: string) => void;
  onSpecialNavigation: (page: string) => void;
}

export function ModernSidebar({
  userRole,
  currentPage,
  onNavigate,
  onSpecialNavigation
}: ModernSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['main']);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const navigationConfig = {
    driver: {
      title: 'ParkMate',
      subtitle: 'Driver Dashboard',
      sections: [
        {
          id: 'main',
          title: 'Main',
          items: [
            {
              id: 'find',
              label: 'Home',
              icon: Home,
              isActive: currentPage === 'find',
              badge: null
            },
            {
              id: 'map',
              label: 'Find parking',
              icon: Search,
              isActive: currentPage === 'map',
              badge: 'Hot'
            },
            {
              id: 'bookings',
              label: 'My bookings',
              icon: Calendar,
              isActive: currentPage === 'bookings',
              badge: '3'
            }
          ]
        },
        {
          id: 'tools',
          title: 'Tools',
          items: [
            {
              id: 'filters',
              label: 'Search filters',
              icon: Filter,
              isActive: currentPage === 'filters',
              badge: null
            },
            {
              id: 'payment',
              label: 'Payment',
              icon: CreditCard,
              isActive: currentPage === 'payment',
              badge: null
            },
            {
              id: 'profile',
              label: 'Profile',
              icon: User,
              isActive: currentPage === 'profile',
              badge: null
            }
          ]
        }
      ]
    },
    host: {
      title: 'ParkMate',
      subtitle: 'Host Control',
      sections: [
        {
          id: 'main',
          title: 'Overview',
          items: [
            {
              id: 'host-dashboard',
              label: 'Dashboard',
              icon: Home,
              isActive: ['host-dashboard', 'add-space', 'earnings', 'bookings-manage', 'withdrawal'].includes(currentPage),
              badge: null
            },
            {
              id: 'add-space',
              label: 'Add space',
              icon: Plus,
              isActive: currentPage === 'add-space',
              badge: 'New'
            }
          ]
        },
        {
          id: 'manage',
          title: 'Management',
          items: [
            {
              id: 'bookings-manage',
              label: 'Bookings',
              icon: Calendar,
              isActive: currentPage === 'bookings-manage',
              badge: '5'
            },
            {
              id: 'earnings',
              label: 'Analytics',
              icon: BarChart3,
              isActive: currentPage === 'earnings',
              badge: null
            }
          ]
        },
        {
          id: 'finance',
          title: 'Finance',
          items: [
            {
              id: 'withdrawal',
              label: 'Withdraw',
              icon: DollarSign,
              isActive: currentPage === 'withdrawal',
              badge: null
            },
            {
              id: 'payment',
              label: 'Payment setup',
              icon: CreditCard,
              isActive: currentPage === 'payment',
              badge: null
            }
          ]
        }
      ]
    },
    admin: {
      title: 'ParkMate',
      subtitle: 'Admin Panel',
      sections: [
        {
          id: 'main',
          title: 'Dashboard',
          items: [
            {
              id: 'admin',
              label: 'Overview',
              icon: Home,
              isActive: currentPage === 'admin',
              badge: null
            },
            {
              id: 'analytics',
              label: 'Analytics',
              icon: BarChart3,
              isActive: currentPage === 'analytics',
              badge: null
            }
          ]
        },
        {
          id: 'management',
          title: 'Management',
          items: [
            {
              id: 'users',
              label: 'Users',
              icon: Users,
              isActive: currentPage === 'users',
              badge: null
            },
            {
              id: 'verification',
              label: 'Verification',
              icon: Shield,
              isActive: currentPage === 'verification',
              badge: '47'
            },
            {
              id: 'disputes',
              label: 'Disputes',
              icon: FileText,
              isActive: currentPage === 'disputes',
              badge: '12'
            }
          ]
        },
        {
          id: 'system',
          title: 'System',
          items: [
            {
              id: 'settings',
              label: 'Settings',
              icon: Settings,
              isActive: currentPage === 'settings',
              badge: null
            },
            {
              id: 'monitoring',
              label: 'Monitoring',
              icon: Activity,
              isActive: currentPage === 'monitoring',
              badge: null
            }
          ]
        }
      ]
    }
  };

  const config = navigationConfig[userRole];

  const handleNavigation = (itemId: string) => {
    if (['host-dashboard', 'add-space', 'bookings-manage', 'earnings', 'withdrawal', 'admin', 'filters', 'payment'].includes(itemId)) {
      onSpecialNavigation(itemId);
    } else {
      onNavigate(itemId);
    }
  };

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
            {userRole === 'driver' && <Car className="w-5 h-5 text-white" />}
            {userRole === 'host' && <DollarSign className="w-5 h-5 text-white" />}
            {userRole === 'admin' && <Shield className="w-5 h-5 text-white" />}
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">{config.title}</h1>
            <p className="text-sm text-gray-500">{config.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 p-4 space-y-6 overflow-y-auto">
        {config.sections.map((section) => (
          <div key={section.id}>
            {/* Section Header */}
            <Button
              variant="ghost"
              onClick={() => toggleSection(section.id)}
              className="w-full justify-between h-8 mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700 hover:bg-gray-50 px-0"
            >
              {section.title}
              {expandedSections.includes(section.id) ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </Button>

            {/* Section Items */}
            {expandedSections.includes(section.id) && (
              <div className="space-y-1">
                {section.items.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    onClick={() => handleNavigation(item.id)}
                    className={`w-full justify-start h-10 px-3 rounded-lg transition-all duration-200 ${
                      item.isActive
                        ? 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 font-medium shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className={`w-4 h-4 mr-3 ${
                      item.isActive ? 'text-purple-600' : 'text-gray-500'
                    }`} />
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

      {/* Quick Stats Card */}
      <div className="p-4">
        <Card className="glass-card p-4 border-0">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-sm font-medium text-gray-900 mb-1">
              {userRole === 'driver' ? 'Bookings saved' : 
               userRole === 'host' ? 'Monthly earnings' : 
               'Platform growth'}
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {userRole === 'driver' ? '$127' : 
               userRole === 'host' ? '$2,847' : 
               '+24%'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {userRole === 'driver' ? 'vs last month' : 
               userRole === 'host' ? 'this month' : 
               'this quarter'}
            </p>
          </div>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start h-10 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            onClick={() => onNavigate('settings')}
          >
            <Settings className="w-4 h-4 mr-3" />
            Settings
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start h-10 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            onClick={() => onNavigate('help')}
          >
            <HelpCircle className="w-4 h-4 mr-3" />
            Help & Support
          </Button>
        </div>
      </div>
    </div>
  );
}