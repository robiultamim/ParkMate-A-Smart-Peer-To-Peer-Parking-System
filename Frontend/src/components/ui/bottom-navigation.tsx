import React from 'react';
import { 
  Home, 
  Search, 
  Calendar, 
  User, 
  Settings,
  MapPin,
  Clock,
  CreditCard,
  Bell
} from 'lucide-react';
import { Button } from './button';
import { Badge } from './badge';

interface BottomNavigationProps {
  currentPage: string;
  userRole: 'driver' | 'host' | 'admin';
  onPageChange: (page: string) => void;
  onSpecialNavigation?: (page: string) => void;
  notificationCount?: number;
}

export function BottomNavigation({
  currentPage,
  userRole,
  onPageChange,
  onSpecialNavigation,
  notificationCount = 0
}: BottomNavigationProps) {
  const getNavigationItems = () => {
    const baseItems = [
      {
        id: 'find',
        label: 'Home',
        icon: Home,
        page: 'find',
        color: 'text-purple-600',
        activeColor: 'text-purple-700'
      },
      {
        id: 'search',
        label: 'Search',
        icon: Search,
        page: 'map',
        color: 'text-blue-600',
        activeColor: 'text-blue-700'
      }
    ];

    const driverItems = [
      ...baseItems,
      {
        id: 'bookings',
        label: 'Bookings',
        icon: Calendar,
        page: 'bookings',
        color: 'text-indigo-600',
        activeColor: 'text-indigo-700'
      },
      {
        id: 'profile',
        label: 'Profile',
        icon: User,
        page: 'profile',
        color: 'text-violet-600',
        activeColor: 'text-violet-700'
      }
    ];

    const hostItems = [
      {
        id: 'add-space',
        label: 'Add Space',
        icon: MapPin,
        page: 'add-space',
        special: true,
        color: 'text-blue-600',
        activeColor: 'text-blue-700'
      },
      {
        id: 'earnings',
        label: 'Earnings',
        icon: CreditCard,
        page: 'earnings',
        special: true,
        color: 'text-green-600',
        activeColor: 'text-green-700'
      },
      {
        id: 'bookings-manage',
        label: 'Manage',
        icon: Clock,
        page: 'bookings-manage',
        special: true,
        color: 'text-orange-600',
        activeColor: 'text-orange-700'
      }
    ];

    const adminItems = [
      {
        id: 'admin',
        label: 'Admin',
        icon: Settings,
        page: 'admin',
        special: true,
        color: 'text-red-600',
        activeColor: 'text-red-700'
      },
      {
        id: 'users',
        label: 'Users',
        icon: User,
        page: 'find',
        color: 'text-blue-600',
        activeColor: 'text-blue-700'
      },
      {
        id: 'analytics',
        label: 'Analytics',
        icon: Search,
        page: 'map',
        color: 'text-purple-600',
        activeColor: 'text-purple-700'
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: Settings,
        page: 'profile',
        color: 'text-gray-600',
        activeColor: 'text-gray-700'
      }
    ];

    switch (userRole) {
      case 'host':
        return hostItems;
      case 'admin':
        return adminItems;
      case 'driver':
      default:
        return driverItems;
    }
  };

  const navigationItems = getNavigationItems();
  const maxItems = 4; // Maximum items to show in bottom nav
  const visibleItems = navigationItems.slice(0, maxItems);

  const handleNavigation = (item: any) => {
    if (item.special && onSpecialNavigation) {
      onSpecialNavigation(item.page);
    } else {
      onPageChange(item.page);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-gray-200/50 md:hidden">
      <div className="flex items-center justify-around py-2 px-4">
        {visibleItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = currentPage === item.page || 
            (item.id === 'admin' && currentPage === 'find' && userRole === 'admin');
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              className={`
                flex flex-col items-center justify-center gap-1 h-16 w-16 relative
                animate-fade-in stagger-${index + 1}
                ${isActive 
                  ? `${item.activeColor} bg-gradient-to-br from-purple-50 to-blue-50` 
                  : `${item.color} hover:bg-gray-50`
                }
                transition-all duration-300 hover-scale
              `}
              onClick={() => handleNavigation(item)}
            >
              <div className={`
                relative transition-all duration-300
                ${isActive ? 'animate-bounce-gentle' : ''}
              `}>
                <Icon 
                  className={`
                    w-5 h-5 transition-all duration-300
                    ${isActive ? 'scale-110' : 'scale-100'}
                  `} 
                />
                {item.id === 'bookings' && notificationCount > 0 && (
                  <Badge 
                    className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-red-500 text-white animate-pulse"
                  >
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </Badge>
                )}
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full animate-expand-width" />
                )}
              </div>
              <span className={`
                text-xs font-medium transition-all duration-300
                ${isActive ? 'opacity-100' : 'opacity-70'}
              `}>
                {item.label}
              </span>
            </Button>
          );
        })}
        
        {/* Notifications indicator for all roles */}
        <Button
          variant="ghost"
          size="sm"
          className="flex flex-col items-center justify-center gap-1 h-16 w-16 relative text-gray-600 hover:text-purple-600 hover:bg-gray-50 transition-all duration-300 hover-scale animate-fade-in stagger-5"
        >
          <div className="relative">
            <Bell className="w-5 h-5 transition-all duration-300" />
            {notificationCount > 0 && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            )}
          </div>
          <span className="text-xs font-medium opacity-70">
            Alerts
          </span>
        </Button>
      </div>
      
      {/* Gradient border at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 opacity-50" />
    </div>
  );
}