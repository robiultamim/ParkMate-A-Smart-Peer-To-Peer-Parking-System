import { useState } from "react";
import {
  Search,
  MapPin,
  Clock,
  Star,
  Menu,
  User,
  Heart,
  Settings,
  Filter,
  CreditCard,
  Timer,
  Shield,
  Users,
  DollarSign,
  Plus,
  Car,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Bell,
  LogOut,
  Home,
  Calendar,
  FileText,
  HelpCircle,
  X,
} from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { Badge } from "./badge";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Separator } from "./separator";
import { ScrollArea } from "./scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

interface ModernCollapsibleSidebarProps {
  userRole: "driver" | "host" | "admin";
  currentPage: string;
  onNavigate: (page: string) => void;
  onSpecialNavigation: (page: string) => void;
  onLogout: () => void;
}

export function ModernCollapsibleSidebar({
  userRole,
  currentPage,
  onNavigate,
  onSpecialNavigation,
  onLogout,
}: ModernCollapsibleSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [notificationCount] = useState(3);

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
      {
        id: "profile",
        label: "Profile",
        icon: User,
        isActive: currentPage === "profile",
        onClick: () => onNavigate("profile"),
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
          id: "gps-navigation",
          label: "GPS Navigation",
          icon: MapPin,
          isActive: currentPage === "gps-navigation",
          onClick: () => onSpecialNavigation("gps-navigation"),
        },
        {
          id: "vehicle-support",
          label: "Vehicle Support",
          icon: Car,
          isActive: currentPage === "vehicle-support",
          onClick: () => onSpecialNavigation("vehicle-support"),
        },
        {
          id: "filters",
          label: "Search Filters",
          icon: Filter,
          isActive: currentPage === "filters",
          onClick: () => onSpecialNavigation("filters"),
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
        {
          id: "bookings-manage",
          label: "Manage Bookings",
          icon: FileText,
          isActive: currentPage === "bookings-manage",
          onClick: () => onSpecialNavigation("bookings-manage"),
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
        {
          id: "analytics",
          label: "Analytics",
          icon: FileText,
          isActive: currentPage === "analytics",
          onClick: () => onNavigate("analytics"),
        },
      ],
    };

    // For host role, exclude baseItems (Dashboard, Map View, My Bookings)
    if (userRole === 'host') {
      return roleSpecificItems[userRole];
    }
    return [...baseItems, ...roleSpecificItems[userRole]];
  };

  const getQuickActions = () => {
    switch (userRole) {
      case "driver":
        return [
          {
            label: "Find Parking",
            icon: Search,
            color: "bg-purple-500 hover:bg-purple-600",
            onClick: () => onNavigate("map"),
          },
          {
            label: "Reserve Later",
            icon: Timer,
            color: "bg-blue-500 hover:bg-blue-600",
            onClick: () => onNavigate("reserve"),
          },
        ];
      case "host":
        return [
          {
            label: "Add Space",
            icon: Plus,
            color: "bg-green-500 hover:bg-green-600",
            onClick: () => onSpecialNavigation("add-space"),
          },
          {
            label: "View Earnings",
            icon: DollarSign,
            color: "bg-orange-500 hover:bg-orange-600",
            onClick: () => onSpecialNavigation("earnings"),
          },
        ];
      case "admin":
        return [
          {
            label: "Platform Stats",
            icon: FileText,
            color: "bg-indigo-500 hover:bg-indigo-600",
            onClick: () => onSpecialNavigation("admin"),
          },
          {
            label: "User Reports",
            icon: Users,
            color: "bg-red-500 hover:bg-red-600",
            onClick: () => onNavigate("reports"),
          },
        ];
    }
  };

  const userInfo = getUserInfo();
  const navigationItems = getNavigationItems();
  const quickActions = getQuickActions();

  return (
    <TooltipProvider>
      <div
        className={`
          fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-40
          transition-all duration-300 ease-in-out
          ${isCollapsed ? "w-16" : "w-72"}
          shadow-lg
        `}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Car className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">ParkMate</h2>
                  <p className="text-xs text-gray-500 capitalize">{userRole} Portal</p>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="h-8 w-8"
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Profile Section */}
        <div className="p-4 border-b border-gray-200">
          {isCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex justify-center">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={userInfo.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                      {userInfo.initials}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{userInfo.name}</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={userInfo.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                  {userInfo.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{userInfo.name}</p>
                <p className="text-sm text-gray-500 truncate">{userInfo.email}</p>
              </div>
              {notificationCount > 0 && (
                <Badge variant="destructive" className="w-5 h-5 p-0 flex items-center justify-center text-xs">
                  {notificationCount}
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3">
          <div className="space-y-1 py-4">
            {!isCollapsed && (
              <p className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                Navigation
              </p>
            )}
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return isCollapsed ? (
                <Tooltip key={item.id}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={item.isActive ? "default" : "ghost"}
                      size="icon"
                      onClick={item.onClick}
                      className={`
                        w-10 h-10 mx-auto
                        ${item.isActive 
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" 
                          : "text-gray-600 hover:text-gray-900"
                        }
                      `}
                    >
                      <IconComponent className="w-5 h-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <Button
                  key={item.id}
                  variant={item.isActive ? "default" : "ghost"}
                  onClick={item.onClick}
                  className={`
                    w-full justify-start gap-3 h-10
                    ${item.isActive 
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" 
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }
                  `}
                >
                  <IconComponent className="w-5 h-5" />
                  {item.label}
                </Button>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="py-4">
            {!isCollapsed && (
              <p className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                Quick Actions
              </p>
            )}
            <div className={`space-y-2 ${isCollapsed ? "px-1" : ""}`}>
              {quickActions.map((action, index) => {
                const IconComponent = action.icon;
                return isCollapsed ? (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        onClick={action.onClick}
                        className={`w-10 h-10 mx-auto ${action.color} text-white`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{action.label}</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <Button
                    key={index}
                    size="sm"
                    onClick={action.onClick}
                    className={`w-full justify-start gap-2 ${action.color} text-white`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {action.label}
                  </Button>
                );
              })}
            </div>
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-3 border-t border-gray-200">
          <div className={`space-y-2 ${isCollapsed ? "flex flex-col items-center" : ""}`}>
            {isCollapsed ? (
              <>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-10 h-10 text-gray-600 hover:text-gray-900"
                    >
                      <Settings className="w-5 h-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Settings</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={onLogout}
                      className="w-10 h-10 text-gray-600 hover:text-red-600"
                    >
                      <LogOut className="w-5 h-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Logout</p>
                  </TooltipContent>
                </Tooltip>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start gap-2 text-gray-600 hover:text-gray-900"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLogout}
                  className="w-full justify-start gap-2 text-gray-600 hover:text-red-600"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}