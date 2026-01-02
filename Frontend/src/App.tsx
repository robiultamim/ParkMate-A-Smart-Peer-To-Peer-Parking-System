import { useState, useEffect } from "react";
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
} from "lucide-react";
import { ModernFixedHeader } from "./components/ui/modern-fixed-header";
import { SmartSearchPage } from "./components/pages/SmartSearchPage";
import { RealTimeAvailabilityPage } from "./components/pages/RealTimeAvailabilityPage";
import { MobilePaymentsPage } from "./components/pages/MobilePaymentsPage";
import { GPSNavigationPage } from "./components/pages/GPSNavigationPage";
import { VehicleSupportPage } from "./components/pages/VehicleSupportPage";
import { ProfilePage } from "./components/pages/ProfilePage";
import { MapPage } from "./components/pages/MapPage";
import { BookingsPage } from "./components/pages/BookingsPage";
import { FiltersPage } from "./components/pages/FiltersPage";
import { PaymentPage } from "./components/pages/PaymentPage";
import { NotificationsPage } from "./components/pages/NotificationsPage";
import { SettingsPage } from "./components/pages/SettingsPage";
import { HelpSupportPage } from "./components/pages/HelpSupportPage";
import { UserManagementPage } from "./components/pages/UserManagementPage";
import { SpaceOwnerDashboard } from "./components/pages/SpaceOwnerDashboard";
import { AddSpacePage } from "./components/pages/AddSpacePage";
import { EarningsPage } from "./components/pages/EarningsPage";
import { BookingManagementPage } from "./components/pages/BookingManagementPage";
import { WithdrawalPage } from "./components/pages/WithdrawalPage";
import { VehiclePricingPage } from "./components/pages/VehiclePricingPage";
import { AdminDashboard } from "./components/pages/AdminDashboard";
import { LandingPage } from "./components/pages/LandingPage";
import { LoginPage } from "./components/pages/LoginPage";
import { SignupDriverPage } from "./components/pages/SignupDriverPage";
import { SignupOwnerPage } from "./components/pages/SignupOwnerPage";
import { PlatformOverviewPage } from "./components/pages/PlatformOverviewPage";
import { HostOverviewPage } from "./components/pages/HostOverviewPage";
import { ComprehensiveDashboardPage } from "./components/pages/ComprehensiveDashboardPage";
import { PageTransitionLoader } from "./components/ui/loading-spinner";
import { ModernDashboardLayout } from "./components/ui/modern-dashboard-layout";
import { useAuth } from "./contexts/AuthContext";

export default function App() {
  const { user, profile, loading: authLoading, signOut } = useAuth();
  const [currentPage, setCurrentPage] = useState("landing");
  const [userRole, setUserRole] = useState<
    "driver" | "host" | "admin"
  >("driver");
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = !!user;

  // Update user role based on profile when authenticated
  useEffect(() => {
    if (profile && profile.role) {
      console.log('Profile changed, role:', profile.role);

      // If userRole is already set to something the user HAS, don't overwrite it
      const currentRoleMapped = userRole === 'host' ? 'house_owner' : 'driver';
      if (profile.role.includes(currentRoleMapped as any)) {
        return;
      }

      // Default fallback if current userRole isn't in their profile
      if (profile.role.includes('house_owner')) {
        console.log('Setting user role to host (fallback)');
        setUserRole('host');
      } else if (profile.role.includes('driver')) {
        console.log('Setting user role to driver (fallback)');
        setUserRole('driver');
      }
    }
  }, [profile]);

  // Redirect authenticated users to appropriate dashboard only on initial load
  useEffect(() => {
    if (isAuthenticated && !authLoading && profile) {
      console.log('Redirect logic - profile role:', profile.role, 'current page:', currentPage);

      // Only redirect if we are on landing/login/signup pages (initial entry)
      const authPages = ["landing", "login", "signup-driver", "signup-owner", "platform-overview", "host-overview", "comprehensive-overview"];
      if (authPages.includes(currentPage)) {
        if (profile.role.includes('house_owner')) {
          console.log('Redirecting to host-dashboard (initial)');
          setCurrentPage("host-dashboard");
          setUserRole("host");
        } else if (profile.role.includes('driver')) {
          console.log('Redirecting to driver dashboard (initial)');
          setCurrentPage("find");
          setUserRole("driver");
        }
      }
    } else if (!isAuthenticated && !authLoading) {
      console.log('Not authenticated, redirecting to landing');
      setCurrentPage("landing");
    }
  }, [isAuthenticated, authLoading, profile]);

  // Handle role changes and redirect to appropriate dashboard
  const handleUserRoleChange = (role: "driver" | "host" | "admin") => {
    setIsLoading(true);
    setTimeout(() => {
      setUserRole(role);
      // Redirect to appropriate dashboard based on role
      if (role === "driver") {
        setCurrentPage("find");
      } else if (role === "host") {
        setCurrentPage("host-dashboard");
      } else if (role === "admin") {
        setCurrentPage("admin");
      }
      setIsLoading(false);
    }, 800);
  };

  // Handle authentication (called after successful login/signup)
  const handleLogin = (credentials: { email: string; password: string; rememberMe: boolean; userRole?: 'driver' | 'host' | 'admin' }) => {
    // User is already authenticated via AuthContext, just redirect based on role
    if (credentials.userRole === "admin") {
      setUserRole("admin");
      setCurrentPage("admin");
    } else if (credentials.userRole === "host") {
      setUserRole("host");
      setCurrentPage("host-dashboard");
    } else {
      setUserRole("driver");
      setCurrentPage("find");
    }
  };

  const handleSignup = (userData: any) => {
    // User is already authenticated via AuthContext, just redirect based on role
    if (userData.userType === "owner") {
      setUserRole("host");
      setCurrentPage("host-dashboard");
    } else {
      setUserRole("driver");
      setCurrentPage("find");
    }
  };

  const handleAuthNavigation = (type: 'login' | 'signup-driver' | 'signup-owner') => {
    setCurrentPage(type);
  };

  const handleOverviewNavigation = (type: 'platform' | 'host' | 'comprehensive') => {
    setCurrentPage(`${type}-overview`);
  };

  const handleLogout = async () => {
    try {
      console.log("Processing logout...");
      await signOut();
    } catch (error) {
      console.error("Logout error (non-fatal):", error);
    } finally {
      // Always redirect to landing page
      window.scrollTo(0, 0);
      setCurrentPage("landing");
      setUserRole("driver");
      console.log("Redirecting to landing page");
    }
  };

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <PageTransitionLoader />
      </div>
    );
  }

  // Show error if Supabase is not configured
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Configuration Required</h1>
          <p className="text-gray-700 mb-4">
            Supabase environment variables are not set. Please create a <code className="bg-gray-100 px-2 py-1 rounded">.env</code> file in the Frontend directory.
          </p>
          <div className="bg-gray-100 p-4 rounded mb-4">
            <p className="text-sm font-mono text-gray-800 mb-2">Add these to your .env file:</p>
            <pre className="text-xs text-gray-700 whitespace-pre-wrap">
              {`VITE_SUPABASE_URL=https://tuogbwilzwsoizxlgfhq.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`}
            </pre>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            See <code className="bg-gray-100 px-2 py-1 rounded">ENV_CONFIGURATION.md</code> for full details.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Reload After Configuration
          </button>
        </div>
      </div>
    );
  }

  // Authentication pages check
  if (!isAuthenticated) {
    if (currentPage === "landing") {
      return <LandingPage onNavigateToAuth={handleAuthNavigation} onNavigateToOverview={handleOverviewNavigation} />;
    } else if (currentPage === "platform-overview") {
      return (
        <PlatformOverviewPage
          onNavigateToAuth={handleAuthNavigation}
          onNavigateBack={() => setCurrentPage("landing")}
        />
      );
    } else if (currentPage === "host-overview") {
      return (
        <HostOverviewPage
          onNavigateToAuth={handleAuthNavigation}
          onNavigateBack={() => setCurrentPage("landing")}
        />
      );
    } else if (currentPage === "comprehensive-overview") {
      return (
        <ComprehensiveDashboardPage
          onNavigateToAuth={handleAuthNavigation}
          onNavigateBack={() => setCurrentPage("landing")}
          onNavigateToFeature={(feature) => {
            // Handle feature navigation - could redirect to appropriate page
            console.log(`Navigate to feature: ${feature}`);
            // For now, redirect to login to access the feature
            setCurrentPage("login");
          }}
        />
      );
    } else if (currentPage === "login") {
      return (
        <LoginPage
          onNavigateBack={() => setCurrentPage("landing")}
          onNavigateToSignup={(type) => setCurrentPage(`signup-${type}`)}
          onLogin={handleLogin}
        />
      );
    } else if (currentPage === "signup-driver") {
      return (
        <SignupDriverPage
          onNavigateBack={() => setCurrentPage("landing")}
          onNavigateToLogin={() => setCurrentPage("login")}
          onNavigateToOwnerSignup={() => setCurrentPage("signup-owner")}
          onSignup={handleSignup}
        />
      );
    } else if (currentPage === "signup-owner") {
      return (
        <SignupOwnerPage
          onNavigateBack={() => setCurrentPage("landing")}
          onNavigateToLogin={() => setCurrentPage("login")}
          onNavigateToDriverSignup={() => setCurrentPage("signup-driver")}
          onSignup={handleSignup}
        />
      );
    }
  }



  // Handle special page navigation
  const handleSpecialPageNavigation = (page: string) => {
    setCurrentPage(page);
  };



  // Render page content based on currentPage
  const renderPageContent = () => {
    switch (currentPage) {
      case "profile":
        return <ProfilePage userRole={userRole} />;
      case "map":
        return <MapPage />;
      case "bookings":
        return <BookingsPage />;
      case "notifications":
        return <NotificationsPage userRole={userRole} />;
      case "settings":
        return <SettingsPage />;
      case "help":
        return <HelpSupportPage />;
      case "filters":
        return <FiltersPage />;
      case "payment":
        return <PaymentPage />;
      case "host-dashboard":
        return <SpaceOwnerDashboard onNavigate={handleSpecialPageNavigation} />;
      case "add-space":
        return <AddSpacePage />;
      case "earnings":
        return <EarningsPage onNavigate={handleSpecialPageNavigation} />;
      case "bookings-manage":
        return <BookingManagementPage />;
      case "withdrawal":
        return <WithdrawalPage />;
      case "vehicle-pricing":
        return <VehiclePricingPage />;
      case "admin":
        return <AdminDashboard />;
      case "smart-search":
        return <SmartSearchPage />;
      case "real-time":
        return <RealTimeAvailabilityPage />;
      case "mobile-payments":
        return <MobilePaymentsPage />;
      case "gps-navigation":
        return <GPSNavigationPage />;
      case "vehicle-support":
        return <VehicleSupportPage />;
      case "users":
        return <UserManagementPage />;
      default:
        return renderDashboard();
    }
  };

  // Render the main dashboard based on user role
  const renderDashboard = () => {
    return (
      <ModernDashboardLayout
        userRole={userRole}
        onNavigate={handleSpecialPageNavigation}
      />
    );
  };

  // Show loading screen during role changes
  if (isLoading) {
    return <PageTransitionLoader />;
  }

  // Main authenticated app layout
  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Header */}
      <ModernFixedHeader
        userRole={userRole}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onSpecialNavigation={handleSpecialPageNavigation}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="min-h-screen">
        {renderPageContent()}
      </main>
    </div>
  );
}