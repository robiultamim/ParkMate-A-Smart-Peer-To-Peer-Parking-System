import { useState, useEffect } from 'react';
import { User, Settings, History, Heart, CreditCard, HelpCircle, LogOut, Edit, ArrowRight, Star, Calendar, Shield, Zap, DollarSign, MapPin, Building, TrendingUp, Car } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

interface ProfilePageProps {
  userRole?: 'driver' | 'host' | 'admin';
  onNavigate?: (page: string) => void;
}

export function ProfilePage({ userRole: propUserRole = 'driver', onNavigate }: ProfilePageProps) {
  const { profile, signOut, user } = useAuth();
  const [stats, setStats] = useState({
    activeSpaces: 0,
    totalBookings: 0,
    earnings: 0,
    favoriteSpots: 0,
    reviewsGiven: 0
  });

  // Use profile role if available, otherwise fall back to prop
  const activeRole = profile?.role?.[0] || propUserRole;
  const isHost = activeRole === 'house_owner' || activeRole === 'host';

  const handleSignOut = async () => {
    await signOut();
    // App.tsx effect will handle redirect to landing when user becomes null
  };

  const handleNavigation = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  useEffect(() => {
    async function fetchStats() {
      if (!user) return;

      if (isHost) {
        // Fetch active spaces count
        try {
          const { count, error } = await supabase
            .from('parking_spaces')
            .select('*', { count: 'exact', head: true })
            .eq('owner_id', user.id);

          if (!error && count !== null) {
            setStats(prev => ({ ...prev, activeSpaces: count }));
          }
        } catch (e) {
          console.error("Error fetching host stats:", e);
        }
      }
      // Future: Fetch bookings count when table exists
    }

    fetchStats();
  }, [user, isHost]);

  const driverStats = [
    { label: 'Total Bookings', value: stats.totalBookings.toString(), color: 'text-purple-600', icon: Calendar },
    { label: 'Favorite Spots', value: stats.favoriteSpots.toString(), color: 'text-blue-600', icon: Heart },
    { label: 'Reviews Given', value: stats.reviewsGiven.toString(), color: 'text-green-600', icon: Star },
    { label: 'Member Since', value: new Date(user?.created_at || Date.now()).getFullYear().toString(), color: 'text-orange-600', icon: Shield }
  ];

  const hostStats = [
    { label: 'Active Spaces', value: stats.activeSpaces.toString(), color: 'text-green-600', icon: MapPin },
    { label: 'Monthly Earnings', value: `$${stats.earnings}`, color: 'text-blue-600', icon: DollarSign },
    { label: 'Total Bookings', value: stats.totalBookings.toString(), color: 'text-purple-600', icon: Calendar },
    { label: 'Host Rating', value: '5.0', color: 'text-orange-600', icon: Star }
  ];

  const userStats = isHost ? hostStats : driverStats;

  const driverMenuItems = [
    { icon: Edit, label: 'Edit Profile', subtitle: 'Update your information', color: 'purple', action: () => handleNavigation('profile-edit') },
    { icon: History, label: 'Booking History', subtitle: 'View past reservations', color: 'blue', action: () => handleNavigation('bookings') },
    { icon: Heart, label: 'Favorite Spots', subtitle: 'Your saved locations', color: 'pink', action: () => handleNavigation('favorites') },
    { icon: CreditCard, label: 'Payment Methods', subtitle: 'Manage cards & wallets', color: 'green', action: () => handleNavigation('payment') },
    { icon: Settings, label: 'Settings', subtitle: 'App preferences', color: 'gray', action: () => handleNavigation('settings') },
    { icon: HelpCircle, label: 'Help & Support', subtitle: 'Get assistance', color: 'orange', action: () => handleNavigation('help') },
  ];

  const hostMenuItems = [
    { icon: Edit, label: 'Edit Profile', subtitle: 'Update your host information', color: 'purple', action: () => handleNavigation('profile-edit') },
    { icon: Building, label: 'My Spaces', subtitle: 'Manage your parking spaces', color: 'blue', action: () => handleNavigation('host-dashboard') }, // Navigate to Host Dashboard to see spaces
    { icon: DollarSign, label: 'Earnings History', subtitle: 'View revenue and transactions', color: 'green', action: () => handleNavigation('earnings') },
    { icon: TrendingUp, label: 'Analytics', subtitle: 'Performance insights', color: 'pink', action: () => handleNavigation('analytics') },
    { icon: CreditCard, label: 'Payment Setup', subtitle: 'Manage payout methods', color: 'orange', action: () => handleNavigation('payment') },
    { icon: HelpCircle, label: 'Host Support', subtitle: 'Get assistance', color: 'gray', action: () => handleNavigation('help') },
  ];

  const menuItems = isHost ? hostMenuItems : driverMenuItems;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">{/* Modern desktop layout */}
      {/* Enhanced Page Header */}
      <div className="text-center space-y-4 animate-fade-in">
        <h2 className="text-4xl font-bold text-gray-900">My Profile</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {isHost
            ? 'Manage your host account and track your parking space earnings'
            : 'Manage your account settings and track your parking activity'
          }
        </p>
      </div>

      {/* Enhanced Profile Header */}
      <Card className="glass-card professional-shadow-xl border-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100/50 to-blue-100/50 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="relative z-10 p-8">
          <div className="flex items-center gap-8">
            <div className={`w-24 h-24 bg-gradient-to-br ${isHost ? 'from-green-600 to-emerald-600' : 'from-purple-600 to-blue-600'} rounded-3xl flex items-center justify-center hover-scale transition-all duration-300 animate-scale-in shadow-lg`}>
              {isHost ? (
                <DollarSign className="w-12 h-12 text-white" />
              ) : (
                <User className="w-12 h-12 text-white" />
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {profile?.first_name} {profile?.last_name || ''}
              </h2>
              <p className="text-lg text-gray-600 mb-4">{profile?.email}</p>

              {/* Additional Profile Info */}
              <div className="flex flex-wrap gap-3 mb-4">
                {profile?.phone && (
                  <Badge variant="outline" className="px-3 py-1 text-sm">
                    {profile.phone}
                  </Badge>
                )}
                {!isHost && profile?.vehicle_plate && (
                  <Badge variant="outline" className="px-3 py-1 text-sm flex items-center gap-1">
                    <Car className="w-3 h-3" />
                    {profile.vehicle_plate}
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-3">
                <Badge className={`${isHost ? 'bg-green-100 text-green-800 border-green-300' : 'bg-green-100 text-green-800 border-green-300'} px-4 py-2 text-sm font-medium`}>
                  <Shield className="w-4 h-4 mr-2" />
                  {isHost ? 'Verified Host' : 'Verified Driver'}
                </Badge>
                <Badge className={`${isHost ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-purple-100 text-purple-800 border-purple-300'} px-4 py-2 text-sm font-medium`}>
                  <Zap className="w-4 h-4 mr-2" />
                  {isHost ? 'Premium Host' : 'Premium Member'}
                </Badge>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Button className={`bg-gradient-to-r ${isHost ? 'from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700' : 'from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'} px-6 py-3 hover-lift`} onClick={() => handleNavigation('profile-edit')}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              {!isHost && (
                <Button variant="outline" className="border-2 border-gray-300 hover:border-purple-400 hover:bg-purple-50 px-6 py-3">
                  View QR Code
                </Button>
              )}
              {isHost && (
                <Button variant="outline" className="border-2 border-gray-300 hover:border-green-400 hover:bg-green-50 px-6 py-3" onClick={() => handleNavigation('host-dashboard')}>
                  <MapPin className="w-4 h-4 mr-2" />
                  View Spaces
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {userStats.map((stat, index) => (
          <Card key={index} className={`glass-card professional-shadow hover:professional-shadow-lg p-6 text-center border-0 hover-lift transition-all duration-300 animate-fade-in stagger-${index + 1}`}>
            <div className={`w-16 h-16 bg-gradient-to-br ${stat.color.includes('purple') ? 'from-purple-100 to-violet-100' :
                stat.color.includes('blue') ? 'from-blue-100 to-indigo-100' :
                  stat.color.includes('green') ? 'from-green-100 to-emerald-100' :
                    'from-orange-100 to-red-100'
              } rounded-2xl flex items-center justify-center mx-auto mb-4 hover-scale transition-all duration-300`}>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
            <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
            <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* Enhanced Menu Items */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">{isHost ? 'Host Management' : 'Account Management'}</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {menuItems.map((item, index) => (
            <Card key={index}
              className={`glass-card professional-shadow hover:professional-shadow-lg border-0 hover-lift transition-all duration-300 animate-fade-in stagger-${(index % 2) + 1} cursor-pointer`}
              onClick={item.action}
            >
              <div className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center hover-scale transition-all duration-300 ${item.color === 'purple' ? 'bg-gradient-to-br from-purple-100 to-violet-100' :
                      item.color === 'blue' ? 'bg-gradient-to-br from-blue-100 to-indigo-100' :
                        item.color === 'pink' ? 'bg-gradient-to-br from-pink-100 to-rose-100' :
                          item.color === 'green' ? 'bg-gradient-to-br from-green-100 to-emerald-100' :
                            item.color === 'orange' ? 'bg-gradient-to-br from-orange-100 to-red-100' :
                              'bg-gradient-to-br from-gray-100 to-slate-100'
                    }`}>
                    <item.icon className={`w-7 h-7 ${item.color === 'purple' ? 'text-purple-600' :
                        item.color === 'blue' ? 'text-blue-600' :
                          item.color === 'pink' ? 'text-pink-600' :
                            item.color === 'green' ? 'text-green-600' :
                              item.color === 'orange' ? 'text-orange-600' :
                                'text-gray-600'
                      }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.label}</h3>
                    <p className="text-gray-600">{item.subtitle}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="hover:bg-gray-100 rounded-xl">
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Enhanced Logout Section */}
      <Card className="glass-card professional-shadow-lg border-0 animate-fade-in">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Account Actions</h3>
              <p className="text-gray-600">Secure logout and account management</p>
            </div>
            <Button
              variant="destructive"
              className="bg-red-500 hover:bg-red-600 px-8 py-3 hover-lift professional-shadow"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}