import React from 'react';
import { Car, MapPin, Clock } from 'lucide-react';
import { ParkMateLoadingLogo } from './parkmate-logo';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  type?: 'spinner' | 'car' | 'parking' | 'dots';
  message?: string;
  color?: 'purple' | 'blue' | 'gradient';
}

export function LoadingSpinner({ 
  size = 'md', 
  type = 'spinner', 
  message,
  color = 'gradient' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    purple: 'text-purple-600',
    blue: 'text-blue-600',
    gradient: 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600'
  };

  const renderSpinner = () => {
    switch (type) {
      case 'car':
        return (
          <div className="relative">
            <Car className={`${sizeClasses[size]} ${colorClasses[color]} animate-bounce-gentle`} />
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1">
              <div className="w-1 h-1 bg-purple-600 rounded-full animate-pulse" />
              <div className="w-1 h-1 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-1 h-1 bg-indigo-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        );

      case 'parking':
        return (
          <div className="relative">
            <MapPin className={`${sizeClasses[size]} ${colorClasses[color]} animate-bounce-gentle`} />
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="w-full h-full border-2 border-purple-300 rounded-full animate-ping" />
            </div>
          </div>
        );

      case 'dots':
        return (
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        );

      case 'spinner':
      default:
        return (
          <div className={`
            ${sizeClasses[size]} border-2 border-gray-200 border-t-purple-600 
            rounded-full animate-spin
          `} />
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-4">
      <div className="animate-fade-in">
        {renderSpinner()}
      </div>
      {message && (
        <p className={`
          text-sm font-medium animate-fade-in stagger-2
          ${colorClasses[color]}
        `}>
          {message}
        </p>
      )}
    </div>
  );
}

export function FullScreenLoader({ 
  type = 'car', 
  message = 'Loading ParkMate...' 
}: { 
  type?: LoadingSpinnerProps['type']; 
  message?: string; 
}) {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center z-50">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-white/30 animate-scale-in glass-morphism">
        <ParkMateLoadingLogo />
      </div>
    </div>
  );
}

export function PageTransitionLoader() {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-40">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 animate-scale-in glass-morphism">
        <ParkMateLoadingLogo className="scale-75" />
      </div>
    </div>
  );
}