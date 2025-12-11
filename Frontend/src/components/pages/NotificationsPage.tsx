import { useState } from "react";
import {
  Bell,
  Clock,
  MapPin,
  DollarSign,
  User,
  Shield,
  CheckCircle,
  AlertCircle,
  Info,
  X,
  Calendar,
  Building,
  TrendingUp,
  Users,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";

interface Notification {
  id: string;
  type: "booking" | "payment" | "system" | "security" | "booking_request" | "earnings" | "space_verification";
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  actionRequired?: boolean;
}

interface NotificationsPageProps {
  userRole?: "driver" | "host" | "admin";
}

export function NotificationsPage({ userRole = "driver" }: NotificationsPageProps) {
  const isHost = userRole === "host";

  const driverNotifications: Notification[] = [
    {
      id: "1",
      type: "booking",
      title: "Booking Confirmed",
      message: "Your parking reservation at Central Plaza has been confirmed for today at 2:00 PM",
      time: "2 minutes ago",
      isRead: false,
    },
    {
      id: "2",
      type: "payment",
      title: "Payment Successful",
      message: "Payment of $12.50 has been processed successfully via bKash",
      time: "1 hour ago",
      isRead: false,
    },
    {
      id: "3",
      type: "system",
      title: "New Feature Available",
      message: "Smart Search with AI recommendations is now available. Try it out!",
      time: "3 hours ago",
      isRead: true,
      actionRequired: true,
    },
    {
      id: "4",
      type: "security",
      title: "Login from New Device",
      message: "We detected a login from a new device. If this wasn't you, please secure your account.",
      time: "1 day ago",
      isRead: true,
      actionRequired: true,
    },
    {
      id: "5",
      type: "booking",
      title: "Booking Reminder",
      message: "Your parking reservation at Downtown Garage expires in 30 minutes",
      time: "2 days ago",
      isRead: true,
    },
  ];

  const hostNotifications: Notification[] = [
    {
      id: "1",
      type: "booking_request",
      title: "New Booking Request",
      message: "John Smith requested to book Downtown Garage Spot A for 3 hours starting today at 2:00 PM",
      time: "5 minutes ago",
      isRead: false,
      actionRequired: true,
    },
    {
      id: "2",
      type: "earnings",
      title: "Payment Received",
      message: "You received $24.00 from Sarah Johnson's booking at Residential Driveway",
      time: "1 hour ago",
      isRead: false,
    },
    {
      id: "3",
      type: "booking_request",
      title: "Booking Request Pending",
      message: "Maria Garcia wants to book Shopping Mall Spot for 2.5 hours tomorrow at 10:00 AM",
      time: "2 hours ago",
      isRead: false,
      actionRequired: true,
    },
    {
      id: "4",
      type: "space_verification",
      title: "Space Verified",
      message: "Your new parking space 'Downtown Garage Spot B' has been verified and is now active",
      time: "1 day ago",
      isRead: true,
    },
    {
      id: "5",
      type: "earnings",
      title: "Monthly Earnings Summary",
      message: "Your earnings for this month: $2,847.00 from 147 bookings across 5 spaces",
      time: "2 days ago",
      isRead: true,
    },
    {
      id: "6",
      type: "system",
      title: "New Host Feature",
      message: "Advanced analytics dashboard is now available. Track your space performance in detail!",
      time: "3 days ago",
      isRead: true,
      actionRequired: true,
    },
  ];

  const [notifications, setNotifications] = useState<Notification[]>(
    isHost ? hostNotifications : driverNotifications
  );

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "booking":
        return <MapPin className="w-5 h-5 text-blue-600" />;
      case "payment":
        return <DollarSign className="w-5 h-5 text-green-600" />;
      case "booking_request":
        return <Calendar className="w-5 h-5 text-orange-600" />;
      case "earnings":
        return <DollarSign className="w-5 h-5 text-green-600" />;
      case "space_verification":
        return <Building className="w-5 h-5 text-purple-600" />;
      case "system":
        return <Info className="w-5 h-5 text-purple-600" />;
      case "security":
        return <Shield className="w-5 h-5 text-red-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "booking":
        return "bg-blue-50 border-blue-200";
      case "payment":
        return "bg-green-50 border-green-200";
      case "booking_request":
        return "bg-orange-50 border-orange-200";
      case "earnings":
        return "bg-green-50 border-green-200";
      case "space_verification":
        return "bg-purple-50 border-purple-200";
      case "system":
        return "bg-purple-50 border-purple-200";
      case "security":
        return "bg-red-50 border-red-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 pt-20">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
                <p className="text-gray-600">
                  {isHost 
                    ? "Stay updated with booking requests, earnings, and space activity"
                    : "Stay updated with your latest activity"
                  }
                  {unreadCount > 0 && (
                    <span className="ml-2">
                      ({unreadCount} unread)
                    </span>
                  )}
                </p>
              </div>
            </div>
            {unreadCount > 0 && (
              <Button
                variant="outline"
                onClick={markAllAsRead}
                className="flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Mark All Read
              </Button>
            )}
          </div>
        </div>

        {/* Notifications */}
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <Card className="p-8 text-center">
              <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No notifications yet
              </h3>
              <p className="text-gray-600">
                We'll notify you when something important happens
              </p>
            </Card>
          ) : (
            notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`
                  relative transition-all duration-200 hover:shadow-lg
                  ${!notification.isRead ? "bg-blue-50 border-l-4 border-l-purple-500" : "bg-white"}
                  ${getNotificationColor(notification.type)}
                `}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                        {getNotificationIcon(notification.type)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900">
                              {notification.title}
                            </h3>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                            )}
                            {notification.actionRequired && (
                              <Badge variant="outline" className="text-xs bg-yellow-100 text-yellow-800 border-yellow-300">
                                Action Required
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-700 mb-2 leading-relaxed">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {notification.time}
                            </div>
                            <Badge 
                              variant="secondary" 
                              className="text-xs capitalize"
                            >
                              {notification.type}
                            </Badge>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 ml-4">
                          {!notification.isRead && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNotification(notification.id)}
                            className="text-gray-500 hover:text-red-600"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      {notification.actionRequired && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex gap-2">
                            {notification.type === "booking_request" && (
                              <>
                                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                  Approve Request
                                </Button>
                                <Button variant="outline" size="sm" className="border-red-200 text-red-700 hover:bg-red-50">
                                  Decline
                                </Button>
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                              </>
                            )}
                            {notification.type === "system" && (
                              <>
                                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                                  {isHost ? "View Analytics" : "Try New Feature"}
                                </Button>
                                <Button variant="outline" size="sm">
                                  Learn More
                                </Button>
                              </>
                            )}
                            {notification.type === "security" && (
                              <>
                                <Button size="sm" variant="destructive">
                                  Secure Account
                                </Button>
                                <Button variant="outline" size="sm">
                                  Not Me
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Quick Actions */}
        <Card className="mt-8 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Notification Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isHost ? (
              <>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="font-medium text-gray-900">Booking Requests</p>
                      <p className="text-sm text-gray-500">Get notified about new booking requests</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">Earnings Alerts</p>
                      <p className="text-sm text-gray-500">Payment and revenue notifications</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Building className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-gray-900">Space Updates</p>
                      <p className="text-sm text-gray-500">Space verification and status changes</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Performance Reports</p>
                      <p className="text-sm text-gray-500">Weekly and monthly analytics</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Booking Updates</p>
                      <p className="text-sm text-gray-500">Get notified about booking status</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">Payment Alerts</p>
                      <p className="text-sm text-gray-500">Transaction notifications</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}