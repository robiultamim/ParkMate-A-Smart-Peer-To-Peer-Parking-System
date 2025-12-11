import { ReactNode, useState, useEffect, useRef } from "react";
import { Card } from "./card";
import { Button } from "./button";
import { Badge } from "./badge";
import { ArrowLeft, MoreHorizontal } from "lucide-react";
import { ScrollArea } from "./scroll-area";

interface ModernMainLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  isCollapsed: boolean;
  showBackButton?: boolean;
  onBack?: () => void;
  rightActions?: ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}

export function ModernMainLayout({
  children,
  title,
  subtitle,
  isCollapsed,
  showBackButton = false,
  onBack,
  rightActions,
  breadcrumbs,
}: ModernMainLayoutProps) {
  const [hasScrollbar, setHasScrollbar] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Monitor scroll and content overflow
  useEffect(() => {
    const checkScrollbar = () => {
      if (scrollAreaRef.current) {
        const hasVerticalScroll = scrollAreaRef.current.scrollHeight > scrollAreaRef.current.clientHeight;
        setHasScrollbar(hasVerticalScroll);
      }
    };

    const handleScroll = () => {
      if (scrollAreaRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollAreaRef.current;
        const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    const resizeObserver = new ResizeObserver(checkScrollbar);
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    if (scrollAreaRef.current) {
      scrollAreaRef.current.addEventListener('scroll', handleScroll);
    }

    // Initial check
    checkScrollbar();

    return () => {
      if (scrollAreaRef.current) {
        scrollAreaRef.current.removeEventListener('scroll', handleScroll);
      }
      resizeObserver.disconnect();
    };
  }, [children]);

  return (
    <div
      className={`
        min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50
        transition-all duration-300 ease-in-out
        ${isCollapsed ? "ml-16" : "ml-72"}
        ${hasScrollbar ? "pr-1" : "pr-6"}
      `}
    >
      {/* Top Bar */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {showBackButton && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onBack}
                  className="h-8 w-8 text-gray-600 hover:text-gray-900 modern-button"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              )}
              <div>
                {breadcrumbs && (
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1 animate-fade-in">
                    {breadcrumbs.map((crumb, index) => (
                      <span key={index} className="flex items-center gap-2">
                        {index > 0 && <span>/</span>}
                        <span className={`transition-colors duration-200 ${index === breadcrumbs.length - 1 ? "text-gray-900 font-medium" : "hover:text-gray-700"}`}>
                          {crumb.label}
                        </span>
                      </span>
                    ))}
                  </div>
                )}
                {title && (
                  <h1 className="text-2xl font-semibold text-gray-900 animate-slide-in-left">{title}</h1>
                )}
                {subtitle && (
                  <p className="text-gray-600 animate-slide-in-left stagger-1">{subtitle}</p>
                )}
              </div>
            </div>
            {rightActions && (
              <div className="flex items-center gap-2 animate-slide-in-right">
                {rightActions}
              </div>
            )}
          </div>
        </div>
        
        {/* Scroll Progress Indicator */}
        {hasScrollbar && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-100">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-150 ease-out"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div
        ref={scrollAreaRef}
        className="h-[calc(100vh-80px)] overflow-y-auto modern-scrollbar"
        style={{
          scrollbarWidth: hasScrollbar ? 'thin' : 'none',
          msOverflowStyle: hasScrollbar ? 'auto' : 'none',
        }}
      >
        <div 
          ref={contentRef}
          className={`transition-all duration-300 ease-in-out ${hasScrollbar ? "p-6 pr-4" : "p-6"}`}
        >
          <div className="animate-fade-in">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// Dashboard Stats Card Component
interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: ReactNode;
  color?: string;
}

export function StatsCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon,
  color = "bg-gradient-to-br from-purple-500 to-blue-500",
}: StatsCardProps) {
  const changeColors = {
    positive: "text-green-600 bg-green-50",
    negative: "text-red-600 bg-red-50",
    neutral: "text-gray-600 bg-gray-50",
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
          {change && (
            <Badge
              variant="secondary"
              className={`text-xs ${changeColors[changeType]}`}
            >
              {change}
            </Badge>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center text-white`}>
          {icon}
        </div>
      </div>
    </Card>
  );
}

// Quick Action Card Component
interface QuickActionCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
  color?: string;
  badge?: string;
}

export function QuickActionCard({
  title,
  description,
  icon,
  onClick,
  color = "border-gray-200 hover:border-purple-300",
  badge,
}: QuickActionCardProps) {
  return (
    <Card
      className={`p-6 cursor-pointer border-2 ${color} hover:shadow-md transition-all duration-200`}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center text-purple-600">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-gray-900">{title}</h3>
            {badge && (
              <Badge variant="secondary" className="text-xs">
                {badge}
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </Card>
  );
}

// Section Header Component
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function SectionHeader({ title, subtitle, action }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}