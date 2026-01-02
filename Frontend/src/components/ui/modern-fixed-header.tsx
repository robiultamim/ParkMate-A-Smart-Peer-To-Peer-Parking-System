import { useState } from "react";
import {
  Search,
  MapPin,
  Menu,
  User,
  Heart,
  Settings,
  CreditCard,
  Timer,
  Shield,
  Users,
  DollarSign,
  Plus,
  Car,
  ArrowRight,
  Bell,
  LogOut,
  Home,
  Calendar,
  HelpCircle,
  X,
} from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { Badge } from "./badge";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Separator } from "./separator";
import { ScrollArea } from "./scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./dropdown-menu";
import { ParkMateLogo } from "./parkmate-logo";

interface ModernFixedHeaderProps {
  userRole: "driver" | "host" | "admin";
  currentPage: string;
  onNavigate: (page: string) => void;
  onSpecialNavigation: (page: string) => void;
  onLogout: () => void;
}

export function ModernFixedHeader({
  userRole,
  currentPage,
  onNavigate,
  onSpecialNavigation,
  onLogout,
}: ModernFixedHeaderProps) {
  const [notificationCount] = useState(3);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const getUserInfo = () => {
    switch (userRole) {
      case "driver":
        return {
          name: "John Driver",
          email: "john@example.com",
          avatar: "/api/placeholder/40/40",
          initials: "JD",
        };
      case "host":
        return {
          name: "Sarah Host",
          email: "sarah@example.com",
          avatar: "/api/placeholder/40/40",
          initials: "SH",
        };
      case "admin":
        return {
          name: "Admin User",
          email: "admin@parkmate.com",
          avatar: "/api/placeholder/40/40",
          initials: "AU",
        };
    }
  };

  const getNavigationItems = () => {
    const baseItems = [
      {
        id: "find",
        label: "Dashboard",
        icon: Home,
        isActive: currentPage === "find",
        onClick: () => onNavigate("find"),
      },
      {
        id: "map",
        label: "Map View",
        icon: MapPin,
        isActive: currentPage === "map",
        onClick: () => onNavigate("map"),
      },
      {
        id: "bookings",
        label: "My Bookings",
        icon: Calendar,
        isActive: currentPage === "bookings",
        onClick: () => onNavigate("bookings"),
      },
    ];

    const roleSpecificItems = {
      driver: [
        {
          id: "smart-search",
          label: "Smart Search",
          icon: Search,
          isActive: currentPage === "smart-search",
          onClick: () => onSpecialNavigation("smart-search"),
        },
        {
          id: "real-time",
          label: "Live Availability",
          icon: Timer,
          isActive: currentPage === "real-time",
          onClick: () => onSpecialNavigation("real-time"),
        },
        {
          id: "mobile-payments",
          label: "Mobile Payments",
          icon: CreditCard,
          isActive: currentPage === "mobile-payments",
          onClick: () => onSpecialNavigation("mobile-payments"),
        },
        {
          id: "vehicle-support",
          label: "Vehicle Support",
          icon: Car,
          isActive: currentPage === "vehicle-support",
          onClick: () => onSpecialNavigation("vehicle-support"),
        },
      ],
      host: [
        {
          id: "host-dashboard",
          label: "Host Center",
          icon: Shield,
          isActive: currentPage === "host-dashboard",
          onClick: () => onSpecialNavigation("host-dashboard"),
        },
        {
          id: "add-space",
          label: "Add Space",
          icon: Plus,
          isActive: currentPage === "add-space",
          onClick: () => onSpecialNavigation("add-space"),
        },
        {
          id: "earnings",
          label: "Earnings",
          icon: DollarSign,
          isActive: currentPage === "earnings",
          onClick: () => onSpecialNavigation("earnings"),
        },
      ],
      admin: [
        {
          id: "admin",
          label: "Admin Panel",
          icon: Shield,
          isActive: currentPage === "admin",
          onClick: () => onSpecialNavigation("admin"),
        },
        {
          id: "users",
          label: "User Management",
          icon: Users,
          isActive: currentPage === "users",
          onClick: () => onNavigate("users"),
        },
      ],
    };

    // For host role, exclude baseItems (Dashboard, Map View, My Bookings)
    if (userRole === 'host') {
      return roleSpecificItems[userRole];
    }
    return [...baseItems, ...roleSpecificItems[userRole]];
  };

  const userInfo = getUserInfo();
  const navigationItems = getNavigationItems();

  return (
    <>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 modern-fixed-header">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-white/95 backdrop-blur-md"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-transparent to-blue-600/5"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent"></div>

        <div className="relative px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Left Section - ParkMate Logo */}
            <div className="flex items-center animate-slide-in-left">
              <ParkMateLogo
                size="sm"
                variant="compact"
                className="hover:scale-105 transition-transform duration-300 cursor-pointer"
                animated={false}
              />
              <div className="ml-3 flex items-center gap-2">
                <p className="text-xs text-gray-500 capitalize hidden sm:block">{userRole} Portal</p>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Breadcrumb / Context Indicator */}
            <div className="hidden md:flex items-center gap-2 bg-gray-50 rounded-full px-3 py-1 animate-fade-in">
              <Home className="w-3 h-3 text-gray-400" />
              <ArrowRight className="w-3 h-3 text-gray-300" />
              <span className="text-xs text-gray-600 capitalize">{currentPage.replace('-', ' ')}</span>
            </div>

            {/* Center Section - Enhanced Navigation (Desktop) */}
            <nav className="hidden lg:flex items-center space-x-1 animate-slide-in-down">
              {navigationItems.slice(0, 6).map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={item.isActive ? "default" : "ghost"}
                    onClick={item.onClick}
                    className={`
                      flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 interactive-button
                      ${item.isActive
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover-glow"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 hover-lift"
                      }
                    `}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <IconComponent className={`w-4 h-4 ${item.isActive ? 'animate-bounce-gentle' : ''}`} />
                    <span className="hidden xl:block">{item.label}</span>
                  </Button>
                );
              })}
            </nav>

            {/* Right Section - Enhanced Profile & Notifications */}
            <div className="flex items-center gap-3 animate-slide-in-right">
              {/* Quick Actions - Only show for drivers */}
              {userRole !== 'host' && (
                <div className="hidden lg:flex items-center gap-1 bg-gray-50 rounded-full p-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-white hover:shadow-sm transition-all duration-200"
                    onClick={() => onNavigate("search")}
                    title="Quick Search"
                  >
                    <Search className="w-4 h-4 text-gray-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-white hover:shadow-sm transition-all duration-200"
                    onClick={() => onNavigate("favorites")}
                    title="Favorites"
                  >
                    <Heart className="w-4 h-4 text-gray-500" />
                  </Button>
                </div>
              )}

              {/* Enhanced Notifications */}
              <Button
                variant="ghost"
                size="icon"
                className="relative h-10 w-10 hover:bg-gray-50 rounded-full interactive-button hover-glow"
                onClick={() => onNavigate("notifications")}
              >
                <Bell className="w-5 h-5 text-gray-600" />
                {notificationCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs notification-badge"
                  >
                    {notificationCount}
                  </Badge>
                )}
              </Button>

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-3 hover:bg-gray-50 rounded-full p-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={userInfo.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                        {userInfo.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-gray-900">{userInfo.name}</p>
                      <p className="text-xs text-gray-500">{userInfo.email}</p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2">
                    <p className="font-medium text-gray-900">{userInfo.name}</p>
                    <p className="text-sm text-gray-500">{userInfo.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onNavigate("profile")}>
                    <User className="w-4 h-4 mr-2" />
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onNavigate("settings")}>
                    <Settings className="w-4 h-4 mr-2" />
                    App Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onNavigate("help")}>
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Help & Support
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onSelect={(e: Event) => {
                      e.preventDefault(); // Prevent default to handle async manually if needed, though here we just call onLogout
                      console.log("Logout clicked");
                      onLogout();
                    }}
                    className="text-red-600 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-10 w-10"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                {showMobileMenu ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {showMobileMenu && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-4">
              <div className="grid grid-cols-2 gap-2">
                {navigationItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Button
                      key={item.id}
                      variant={item.isActive ? "default" : "outline"}
                      onClick={() => {
                        item.onClick();
                        setShowMobileMenu(false);
                      }}
                      className={`
                        flex flex-col items-center gap-2 h-20 w-full
                        ${item.isActive
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                          : "text-gray-600 hover:text-gray-900"
                        }
                      `}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span className="text-xs">{item.label}</span>
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer to prevent content from being hidden under fixed header */}
      <div className="h-16"></div>
    </>
  );
}