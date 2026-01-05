import { useState } from "react";
import {
  Settings,
  User,
  Bell,
  Shield,
  CreditCard,
  MapPin,
  Moon,
  Sun,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  Car,
  Building,
  Plus,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useAuth } from "../../contexts/AuthContext";
import { addRoleToProfile } from "../../lib/addRole";
import { toast } from "sonner";
import { supabase } from "../../lib/supabase";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

export function SettingsPage() {
  const { profile, refreshProfile } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAddingRole, setIsAddingRole] = useState(false);
  const [notifications, setNotifications] = useState({
    bookingUpdates: true,
    paymentAlerts: true,
    promotions: false,
    securityAlerts: true,
    locationReminders: true,
  });
  const [privacy, setPrivacy] = useState({
    shareLocation: true,
    showProfile: true,
    dataSaving: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handlePrivacyChange = (key: string, value: boolean) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
  };

  const handleAddRole = async (role: 'driver' | 'house_owner') => {
    setIsAddingRole(true);
    try {
      const result = await addRoleToProfile(role);
      if (result.success) {
        // Refresh the profile to get updated roles
        await refreshProfile();
      } else {
        toast.error(result.error || 'Failed to add role');
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setIsAddingRole(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        toast.error('No user session found');
        return;
      }

      console.log('Deleting user account:', user.id);

      // Delete the user from Supabase Auth
      // This will automatically cascade delete from user_profiles due to ON DELETE CASCADE
      const { error } = await supabase.rpc('delete_user');

      if (error) {
        console.error('Delete error:', error);
        toast.error('Failed to delete account. Please contact support.');
        return;
      }

      toast.success('Account deleted successfully. Redirecting...');

      // Sign out and redirect
      await supabase.auth.signOut();

      // Clear local storage
      localStorage.removeItem('activeUserRole');

      // Redirect to landing page
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);

    } catch (error: any) {
      console.error('Delete account error:', error);
      toast.error(error.message || 'Failed to delete account');
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const hasDriverRole = profile?.role?.includes('driver');
  const hasOwnerRole = profile?.role?.includes('house_owner');
  const hasBothRoles = hasDriverRole && hasOwnerRole;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 pt-20">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600">Manage your app preferences and account settings</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto">
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:block">Account</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:block">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:block">Privacy</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Sun className="w-4 h-4" />
              <span className="hidden sm:block">Appearance</span>
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:block">Advanced</span>
            </TabsTrigger>
          </TabsList>

          {/* Account Settings */}
          <TabsContent value="account" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Account Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="John Driver" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" defaultValue="john@example.com" className="mt-1" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="+1 (555) 123-4567" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="bn">বাংলা (Bengali)</SelectItem>
                        <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full md:w-auto">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Security</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="current-password">Current Password</Label>
                  <div className="relative mt-1">
                    <Input
                      id="current-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter current password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="Enter new password"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm new password"
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-600">Add an extra layer of security</p>
                  </div>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Role Management</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <p className="text-sm text-gray-600">Current Roles:</p>
                  <div className="flex gap-2">
                    {hasDriverRole && (
                      <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">
                        <Car className="w-3 h-3 mr-1" />
                        Driver
                      </Badge>
                    )}
                    {hasOwnerRole && (
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                        <Building className="w-3 h-3 mr-1" />
                        Space Owner
                      </Badge>
                    )}
                  </div>
                </div>

                {hasBothRoles ? (
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-green-800 font-medium">🎉 You have access to both dashboards!</p>
                    <p className="text-sm text-green-600 mt-1">
                      You can switch between Driver and Space Owner dashboards anytime from the login page.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {!hasDriverRole && (
                      <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <Car className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Become a Driver</p>
                            <p className="text-sm text-gray-600">Find and book parking spaces</p>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleAddRole('driver')}
                          disabled={isAddingRole}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Role
                        </Button>
                      </div>
                    )}

                    {!hasOwnerRole && (
                      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Building className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Become a Space Owner</p>
                            <p className="text-sm text-gray-600">List and manage your parking spaces</p>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleAddRole('house_owner')}
                          disabled={isAddingRole}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Role
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Booking Updates</p>
                      <p className="text-sm text-gray-600">Confirmations, reminders, and changes</p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.bookingUpdates}
                    onCheckedChange={(value: boolean) => handleNotificationChange('bookingUpdates', value)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">Payment Alerts</p>
                      <p className="text-sm text-gray-600">Transaction notifications and receipts</p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.paymentAlerts}
                    onCheckedChange={(value: boolean) => handleNotificationChange('paymentAlerts', value)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-red-600" />
                    <div>
                      <p className="font-medium">Security Alerts</p>
                      <p className="text-sm text-gray-600">Login attempts and security updates</p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.securityAlerts}
                    onCheckedChange={(value: boolean) => handleNotificationChange('securityAlerts', value)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium">Promotions & Updates</p>
                      <p className="text-sm text-gray-600">Special offers and new features</p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.promotions}
                    onCheckedChange={(value: boolean) => handleNotificationChange('promotions', value)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="font-medium">Location Reminders</p>
                      <p className="text-sm text-gray-600">Parking timer and location alerts</p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.locationReminders}
                    onCheckedChange={(value: boolean) => handleNotificationChange('locationReminders', value)}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Privacy */}
          <TabsContent value="privacy" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Privacy Controls</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium">Share Location</p>
                    <p className="text-sm text-gray-600">Allow location sharing for better recommendations</p>
                  </div>
                  <Switch
                    checked={privacy.shareLocation}
                    onCheckedChange={(value: boolean) => handlePrivacyChange('shareLocation', value)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium">Show Profile to Others</p>
                    <p className="text-sm text-gray-600">Make your profile visible to other users</p>
                  </div>
                  <Switch
                    checked={privacy.showProfile}
                    onCheckedChange={(value: boolean) => handlePrivacyChange('showProfile', value)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium">Data Saving Mode</p>
                    <p className="text-sm text-gray-600">Reduce data usage for maps and images</p>
                  </div>
                  <Switch
                    checked={privacy.dataSaving}
                    onCheckedChange={(value: boolean) => handlePrivacyChange('dataSaving', value)}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Data Management</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Download My Data</p>
                    <p className="text-sm text-gray-600">Get a copy of your account data</p>
                  </div>
                  <Button variant="outline">Download</Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                  <div>
                    <p className="font-medium text-red-900">Delete Account</p>
                    <p className="text-sm text-red-600">Permanently delete your account and all data</p>
                  </div>
                  <Button
                    variant="destructive"
                    onClick={() => setShowDeleteDialog(true)}
                    disabled={isDeleting}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Appearance */}
          <TabsContent value="appearance" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Theme Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                    <div>
                      <p className="font-medium">Dark Mode</p>
                      <p className="text-sm text-gray-600">Switch to dark theme</p>
                    </div>
                  </div>
                  <Switch
                    checked={isDarkMode}
                    onCheckedChange={setIsDarkMode}
                  />
                </div>
                <Separator />
                <div>
                  <Label>Map Style</Label>
                  <Select defaultValue="default" className="mt-1">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="satellite">Satellite</SelectItem>
                      <SelectItem value="terrain">Terrain</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Display Density</Label>
                  <Select defaultValue="comfortable" className="mt-1">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compact">Compact</SelectItem>
                      <SelectItem value="comfortable">Comfortable</SelectItem>
                      <SelectItem value="spacious">Spacious</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Advanced */}
          <TabsContent value="advanced" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Advanced Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Clear Cache</p>
                    <p className="text-sm text-gray-600">Remove temporary files and data</p>
                  </div>
                  <Button variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Reset Settings</p>
                    <p className="text-sm text-gray-600">Reset all settings to default</p>
                  </div>
                  <Button variant="outline">Reset</Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Developer Mode</p>
                    <p className="text-sm text-gray-600">Enable debugging features</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">App Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Version</span>
                  <span className="font-mono">1.2.0</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">Build</span>
                  <span className="font-mono">2024.01.15</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">Platform</span>
                  <span>Web</span>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Delete Account Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <AlertDialogTitle className="text-xl">Delete Account?</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-base">
              This action <span className="font-semibold text-red-600">cannot be undone</span>. This will permanently delete your account and remove all your data from our servers, including:
              <ul className="list-disc list-inside mt-3 space-y-1 text-gray-700">
                <li>Your profile and account information</li>
                <li>All parking spaces you've listed</li>
                <li>Booking history and transactions</li>
                <li>Saved preferences and settings</li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              disabled={isDeleting}
              className="!bg-red-600 hover:!bg-red-700 !text-white"
            >
              {isDeleting ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Yes, Delete My Account
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}