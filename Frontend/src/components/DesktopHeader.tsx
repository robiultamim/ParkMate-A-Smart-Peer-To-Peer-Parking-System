import { useState } from 'react';
import { 
  MapPin, 
  Search, 
  Bell, 
  Settings, 
  User, 
  Plus, 
  Shield, 
  Users, 
  DollarSign,
  Menu,
  ChevronDown,
  Car,
  Navigation,
  Zap,
  Activity
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { ParkMateLogo } from './ui/parkmate-logo';
import { EnhancedRoleMenu } from './ui/enhanced-role-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface DesktopHeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  userRole: 'driver' | 'host' | 'admin';
  onUserRoleChange: (role: 'driver' | 'host' | 'admin') => void;
  onSpecialNavigation?: (page: string) => void;
  onLogout?: () => void;
}

export function DesktopHeader({ 
  currentPage, 
  onPageChange, 
  userRole, 
  onUserRoleChange,
  onSpecialNavigation,
  onLogout
}: DesktopHeaderProps) {
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const getRoleConfig = () => {
    switch (userRole) {
      case 'driver':
        return {
          icon: Car,
          title: 'Driver Dashboard',
          subtitle: 'Find & book parking',
          color: 'from-purple-600 to-blue-600',
          bgColor: 'bg-purple-50',
          textColor: 'text-purple-700',
          status: 'Finding parking...',
          statusColor: 'bg-green-100 text-green-700'
        };
      case 'host':
        return {
          icon: DollarSign,
          title: 'Host Control Center',
          subtitle: 'Manage spaces & earnings',
          color: 'from-green-600 to-emerald-600',
          bgColor: 'bg-green-50',
          textColor: 'text-green-700',
          status: 'Earning $2,847/mo',
          statusColor: 'bg-green-100 text-green-700'
        };
      case 'admin':
        return {
          icon: Shield,
          title: 'Admin Control Panel',
          subtitle: 'Platform management',
          color: 'from-red-600 to-pink-600',
          bgColor: 'bg-red-50',
          textColor: 'text-red-700',
          status: '99.9% uptime',
          statusColor: 'bg-blue-100 text-blue-700'
        };
    }
  };

  const roleConfig = getRoleConfig();

  const navItems = {
    driver: [
      { id: 'find', label: 'Find Parking', icon: Search },
      { id: 'map', label: 'Map View', icon: MapPin },
      { id: 'bookings', label: 'My Bookings', icon: Users },
    ],
    host: [
      { id: 'add-space', label: 'Add Space', icon: Plus },
      { id: 'bookings-manage', label: 'Manage Bookings', icon: Users },
      { id: 'earnings', label: 'Earnings', icon: DollarSign },
    ],
    admin: [
      { id: 'admin', label: 'Admin Dashboard', icon: Shield },
      { id: 'find', label: 'Platform Overview', icon: Search },
      { id: 'bookings', label: 'All Bookings', icon: Users },
    ]
  };

  const currentNavItems = navItems[userRole];

  const handleNavigation = (id: string) => {
    if (['host-dashboard', 'add-space', 'bookings-manage', 'earnings', 'admin'].includes(id)) {
      onSpecialNavigation?.(id);
    } else {
      onPageChange(id);
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-40 professional-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Role Status */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 bg-gradient-to-r ${roleConfig.color} rounded-2xl flex items-center justify-center animate-float shadow-lg`}>
                <roleConfig.icon className="w-6 h-6 text-white" />
              </div>
              <div className="hidden lg:block">
                <div className="flex items-center gap-2">
                  <ParkMateLogo 
                    size="md" 
                    className="cursor-pointer" 
                    onClick={() => onPageChange('find')}
                  />
                  <Badge variant="secondary" className={roleConfig.statusColor}>
                    <Activity className="w-3 h-3 mr-1" />
                    {roleConfig.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{roleConfig.subtitle}</p>
              </div>
            </div>
          </div>

          {/* Enhanced Navigation */}
          <nav className="hidden md:flex items-center gap-1 animate-fade-in stagger-2">
            {currentNavItems.map(({ id, label, icon: Icon }, index) => (
              <Button
                key={id}
                variant={currentPage === id || 
                  (id === 'host-dashboard' && ['add-space', 'bookings-manage', 'earnings', 'withdrawal'].includes(currentPage)) ||
                  (id === 'admin' && currentPage === 'admin')
                  ? 'default' : 'ghost'}
                onClick={() => handleNavigation(id)}
                className={`
                  hover-scale transition-all duration-300 animate-slide-in-up stagger-${index + 1} rounded-xl
                  ${currentPage === id || 
                  (id === 'host-dashboard' && ['add-space', 'bookings-manage', 'earnings', 'withdrawal'].includes(currentPage)) ||
                  (id === 'admin' && currentPage === 'admin')
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover-glow'
                    : 'hover:bg-purple-50'}
                `}
              >
                <Icon className="w-4 h-4 mr-2 transition-transform duration-200" />
                {label}
              </Button>
            ))}
          </nav>

          {/* Enhanced Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                placeholder={
                  userRole === 'driver' ? "Search parking spots, locations..." :
                  userRole === 'host' ? "Search your spaces, bookings..." :
                  "Search users, disputes, analytics..."
                }
                className="pl-10 pr-12 bg-gray-50/50 border-gray-200 focus:bg-white focus:border-purple-500 h-10 rounded-xl shadow-sm"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <kbd className="inline-flex items-center px-2 py-1 border border-gray-200 rounded text-xs font-mono text-gray-500 bg-gray-100">
                  ⌘K
                </kbd>
              </div>
            </div>
          </div>

          {/* Mobile Search Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSearch(!showSearch)}
            className="md:hidden hover:bg-purple-50"
          >
            <Search className="w-5 h-5" />
          </Button>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Quick Actions based on role */}
            {userRole === 'driver' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSpecialNavigation?.('map')}
                className="hidden lg:flex items-center gap-2 hover:bg-purple-50 text-purple-700 rounded-xl"
              >
                <Navigation className="w-4 h-4" />
                <span>Quick Find</span>
              </Button>
            )}
            
            {userRole === 'host' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSpecialNavigation?.('add-space')}
                className="hidden lg:flex items-center gap-2 hover:bg-green-50 text-green-700 rounded-xl"
              >
                <Zap className="w-4 h-4" />
                <span>Add Space</span>
              </Button>
            )}

            {userRole === 'admin' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSpecialNavigation?.('admin')}
                className="hidden lg:flex items-center gap-2 hover:bg-red-50 text-red-700 rounded-xl"
              >
                <Activity className="w-4 h-4" />
                <span>Monitor</span>
              </Button>
            )}

            {/* Role Switcher - Compact Version */}
            <div className="hidden xl:flex items-center gap-1 bg-gray-100 rounded-lg p-1 hover-scale transition-all duration-300">
              <Button
                size="sm"
                variant={userRole === 'driver' ? 'default' : 'ghost'}
                onClick={() => onUserRoleChange('driver')}
                className={`h-8 transition-all duration-300 ${userRole === 'driver' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover-glow' : 'hover:bg-white'}`}
              >
                Driver
              </Button>
              <Button
                size="sm"
                variant={userRole === 'host' ? 'default' : 'ghost'}
                onClick={() => onUserRoleChange('host')}
                className={`h-8 transition-all duration-300 ${userRole === 'host' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover-glow' : 'hover:bg-white'}`}
              >
                Host
              </Button>
              <Button
                size="sm"
                variant={userRole === 'admin' ? 'default' : 'ghost'}
                onClick={() => onUserRoleChange('admin')}
                className={`h-8 transition-all duration-300 ${userRole === 'admin' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover-glow' : 'hover:bg-white'}`}
              >
                Admin
              </Button>
            </div>

            {/* Notifications with enhanced styling */}
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-purple-50 rounded-xl"
            >
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs animate-pulse">
                3
              </Badge>
            </Button>

            {/* Enhanced Role Menu Button */}
            <div className="relative">
              <Button
                variant="ghost"
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                className={`flex items-center gap-2 px-3 rounded-xl hover:${roleConfig.bgColor} ${roleConfig.textColor} transition-all duration-200`}
              >
                <div className={`w-8 h-8 ${roleConfig.bgColor} rounded-lg flex items-center justify-center`}>
                  <Menu className="w-4 h-4" />
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-medium">{roleConfig.title}</div>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showRoleMenu ? 'rotate-180' : ''}`} />
              </Button>
              
              <EnhancedRoleMenu
                userRole={userRole}
                isOpen={showRoleMenu}
                onToggle={() => setShowRoleMenu(!showRoleMenu)}
                onNavigate={(page) => {
                  if (['host-dashboard', 'add-space', 'bookings-manage', 'earnings', 'admin', 'filters', 'payment'].includes(page)) {
                    onSpecialNavigation?.(page);
                  } else {
                    onPageChange(page);
                  }
                  setShowRoleMenu(false);
                }}
                onLogout={onLogout || (() => {})}
                notificationCount={3}
              />
            </div>

            {/* User Profile with status indicator */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 pl-2 hover-scale transition-all duration-300 rounded-xl">
                  <div className="relative">
                    <Avatar className="h-8 w-8 hover-scale transition-all duration-300">
                      <AvatarImage src="/avatar-placeholder.jpg" />
                      <AvatarFallback className="bg-gradient-to-r from-purple-600 to-blue-600 text-white animate-gradient">
                        JD
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="text-left hidden lg:block">
                    <div className="text-sm font-medium">John Doe</div>
                    <div className="text-xs text-gray-500 capitalize">{userRole}</div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onPageChange('profile')}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onSpecialNavigation?.('payment')}>
                  <Settings className="mr-2 h-4 w-4" />
                  Payment Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {showSearch && (
          <div className="md:hidden pb-4 animate-slide-down">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search..."
                className="pl-10 bg-gray-50 border-gray-200 focus:bg-white focus:border-purple-500 rounded-xl"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}