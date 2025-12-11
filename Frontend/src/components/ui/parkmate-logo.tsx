import { Car } from 'lucide-react';

interface ParkMateLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'compact' | 'icon-only';
  className?: string;
  animated?: boolean;
}

export function ParkMateLogo({ 
  size = 'md', 
  variant = 'full', 
  className = '', 
  animated = false 
}: ParkMateLogoProps) {
  const getSizeClasses = () => {
    switch (size) {
      case 'xs': return 'w-6 h-6';
      case 'sm': return 'w-8 h-8';
      case 'md': return 'w-12 h-12';
      case 'lg': return 'w-16 h-16';
      case 'xl': return 'w-24 h-24';
      default: return 'w-12 h-12';
    }
  };

  const getCarIconSize = () => {
    switch (size) {
      case 'xs': return 'w-4 h-4';
      case 'sm': return 'w-5 h-5';
      case 'md': return 'w-6 h-6';
      case 'lg': return 'w-8 h-8';
      case 'xl': return 'w-10 h-10';
      default: return 'w-6 h-6';
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'xs': return 'text-xs';
      case 'sm': return 'text-sm';
      case 'md': return 'text-base';
      case 'lg': return 'text-xl';
      case 'xl': return 'text-2xl';
      default: return 'text-base';
    }
  };

  if (variant === 'icon-only') {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className={`${getCarIconSize()} relative inline-block`}>
          <svg className="absolute w-0 h-0">
            <defs>
              <linearGradient id="carGradientIconOnly" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#9333ea" />
              </linearGradient>
            </defs>
          </svg>
          <Car className={`${getCarIconSize()} text-blue-600 ${animated ? 'animate-float' : ''}`} stroke="url(#carGradientIconOnly)" strokeWidth={2.5} fill="none" />
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className={`${getCarIconSize()} relative inline-block`}>
          <svg className="absolute w-0 h-0">
            <defs>
              <linearGradient id="carGradientCompact" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#9333ea" />
              </linearGradient>
            </defs>
          </svg>
          <Car className={`${getCarIconSize()} text-blue-600 ${animated ? 'animate-float' : ''}`} stroke="url(#carGradientCompact)" strokeWidth={2.5} fill="none" />
        </div>
        <div className="flex flex-col">
          <span className={`font-bold text-gray-900 ${getTextSize()} leading-none`}>
            ParkMate
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`${getCarIconSize()} relative inline-block`}>
        <svg className="absolute w-0 h-0">
          <defs>
            <linearGradient id="carGradientFull" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#9333ea" />
            </linearGradient>
          </defs>
        </svg>
        <Car className={`${getCarIconSize()} text-blue-600 ${animated ? 'animate-float' : ''}`} stroke="url(#carGradientFull)" strokeWidth={2.5} fill="none" />
      </div>
      <div className="flex flex-col">
        <h1 className={`font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${getTextSize()} leading-none`}>
          ParkMate
        </h1>
      </div>
    </div>
  );
}

// Animated loading version for transitions
export function ParkMateLoadingLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      <div className="relative">
        <div className="w-20 h-20 relative inline-block">
          <svg className="absolute w-0 h-0">
            <defs>
              <linearGradient id="carGradientLoadingIcon" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#9333ea" />
              </linearGradient>
            </defs>
          </svg>
          <Car className="w-20 h-20 text-blue-600 animate-bounce-gentle" stroke="url(#carGradientLoadingIcon)" strokeWidth={2.5} fill="none" />
        </div>
        <div className="absolute inset-0 w-20 h-20 border-4 border-blue-200 rounded-full animate-pulse"></div>
      </div>
      <div className="text-center space-y-1">
        <div className="flex items-center justify-center gap-2">
          <div className="w-6 h-6 relative inline-block">
            <svg className="absolute w-0 h-0">
              <defs>
                <linearGradient id="carGradientLoading" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#9333ea" />
                </linearGradient>
              </defs>
            </svg>
            <Car className="w-6 h-6 text-blue-600" stroke="url(#carGradientLoading)" strokeWidth={2.5} fill="none" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ParkMate
          </h2>
        </div>
      </div>
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
}