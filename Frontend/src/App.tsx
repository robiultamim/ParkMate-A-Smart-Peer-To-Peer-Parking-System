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
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Card } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { BackButton } from "./components/ui/back-button";
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
import { LoadingSpinner, PageTransitionLoader } from "./components/ui/loading-spinner";
import { StatusIndicator, ParkingAvailabilityIndicator } from "./components/ui/status-indicator";
import { ModernDashboardLayout } from "./components/ui/modern-dashboard-layout";

export default function App() {
  const [currentPage, setCurrentPage] = useState("landing");
  const [userRole, setUserRole] = useState<
    "driver" | "host" | "admin"
  >("driver");
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  // Handle authentication
  const handleLogin = (credentials: { email: string; password: string; rememberMe: boolean }) => {
    // Mock login - in real app, this would call an API
    console.log("Login credentials:", credentials);
    setIsAuthenticated(true);
    
    // Set user role based on email (mock logic) and redirect appropriately
    if (credentials.email.includes("admin")) {
      setUserRole("admin");
      setCurrentPage("admin");
    } else if (credentials.email.includes("owner") || credentials.email.includes("host")) {
      setUserRole("host");
      setCurrentPage("host-dashboard");
    } else {
      setUserRole("driver");
      setCurrentPage("find");
    }
  };

  const handleSignup = (userData: any) => {
    // Mock signup - in real app, this would call an API
    console.log("Signup data:", userData);
    setIsAuthenticated(true);
    
    // Set user role and redirect to appropriate dashboard based on signup type
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

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage("landing");
  };

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
        onLogout={handleLogout} className="mx-[26px] my-[0px] text-[12px]"
      />
      
      {/* Main Content */}
      <main className="min-h-screen">
        {renderPageContent()}
      </main>
    </div>
  );
}