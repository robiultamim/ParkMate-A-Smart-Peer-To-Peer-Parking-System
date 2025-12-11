import React, { useState } from 'react';
import { 
  Plus, 
  MapPin, 
  Search, 
  Clock, 
  CreditCard,
  Zap,
  Navigation,
  Phone
} from 'lucide-react';
import { Button } from './button';
import { Tooltip } from './tooltip';

interface FloatingAction {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  action: () => void;
  color: string;
  disabled?: boolean;
}

interface FloatingActionButtonProps {
  userRole: 'driver' | 'host' | 'admin';
  onQuickSearch?: () => void;
  onQuickBook?: () => void;
  onAddSpace?: () => void;
  onEmergency?: () => void;
  onQuickNavigation?: () => void;
}

export function FloatingActionButton({
  userRole,
  onQuickSearch,
  onQuickBook,
  onAddSpace,
  onEmergency,
  onQuickNavigation
}: FloatingActionButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getActions = (): FloatingAction[] => {
    const commonActions = [
      {
        id: 'emergency',
        label: 'Emergency Help',
        icon: Phone,
        action: () => onEmergency?.(),
        color: 'bg-red-500 hover:bg-red-600 text-white'
      }
    ];

    const driverActions = [
      {
        id: 'quick-search',
        label: 'Quick Search',
        icon: Search,
        action: () => onQuickSearch?.(),
        color: 'bg-blue-500 hover:bg-blue-600 text-white'
      },
      {
        id: 'quick-book',
        label: 'Quick Book',
        icon: Zap,
        action: () => onQuickBook?.(),
        color: 'bg-green-500 hover:bg-green-600 text-white'
      },
      {
        id: 'navigation',
        label: 'Navigate',
        icon: Navigation,
        action: () => onQuickNavigation?.(),
        color: 'bg-purple-500 hover:bg-purple-600 text-white'
      },
      ...commonActions
    ];

    const hostActions = [
      {
        id: 'add-space',
        label: 'Add Space',
        icon: MapPin,
        action: () => onAddSpace?.(),
        color: 'bg-blue-500 hover:bg-blue-600 text-white'
      },
      {
        id: 'quick-earnings',
        label: 'Quick Earnings',
        icon: CreditCard,
        action: () => {},
        color: 'bg-green-500 hover:bg-green-600 text-white'
      },
      ...commonActions
    ];

    const adminActions = [
      {
        id: 'quick-verify',
        label: 'Quick Verify',
        icon: Zap,
        action: () => {},
        color: 'bg-orange-500 hover:bg-orange-600 text-white'
      },
      ...commonActions
    ];

    switch (userRole) {
      case 'host':
        return hostActions;
      case 'admin':
        return adminActions;
      case 'driver':
      default:
        return driverActions;
    }
  };

  const actions = getActions();

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed bottom-20 right-4 z-40 md:bottom-6 md:right-6">
      {/* Action buttons */}
      <div className={`
        flex flex-col-reverse gap-3 transition-all duration-300 ease-out
        ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}>
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Tooltip key={action.id} content={action.label}>
              <Button
                size="sm"
                className={`
                  w-12 h-12 rounded-full shadow-lg transition-all duration-300
                  animate-slide-in-up hover-scale hover-glow
                  ${action.color}
                `}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => {
                  action.action();
                  setIsExpanded(false);
                }}
                disabled={action.disabled}
              >
                <Icon className="w-5 h-5" />
              </Button>
            </Tooltip>
          );
        })}
      </div>

      {/* Main FAB button */}
      <Button
        size="lg"
        className={`
          w-14 h-14 rounded-full shadow-lg transition-all duration-300
          bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700
          text-white hover-scale hover-glow animate-float
          ${isExpanded ? 'rotate-45' : 'rotate-0'}
        `}
        onClick={toggleExpanded}
      >
        <Plus className="w-6 h-6 transition-transform duration-300" />
      </Button>
      
      {/* Backdrop */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10 animate-fade-in"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
}