import React from 'react';
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  AlertCircle, 
  Car, 
  MapPin,
  Zap
} from 'lucide-react';
import { Badge } from './badge';

interface StatusIndicatorProps {
  status: 'available' | 'occupied' | 'reserved' | 'pending' | 'confirmed' | 'cancelled' | 'active' | 'inactive';
  type?: 'parking' | 'booking' | 'payment' | 'verification';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  showIcon?: boolean;
  showLabel?: boolean;
  label?: string;
}

export function StatusIndicator({
  status,
  type = 'parking',
  size = 'md',
  animated = true,
  showIcon = true,
  showLabel = true,
  label
}: StatusIndicatorProps) {
  const getStatusConfig = () => {
    const configs = {
      parking: {
        available: {
          color: 'bg-green-500 text-white',
          borderColor: 'border-green-200',
          icon: CheckCircle,
          label: 'Available',
          animation: 'animate-pulse'
        },
        occupied: {
          color: 'bg-red-500 text-white',
          borderColor: 'border-red-200',
          icon: Car,
          label: 'Occupied',
          animation: ''
        },
        reserved: {
          color: 'bg-yellow-500 text-white',
          borderColor: 'border-yellow-200',
          icon: Clock,
          label: 'Reserved',
          animation: 'animate-pulse'
        },
        inactive: {
          color: 'bg-gray-400 text-white',
          borderColor: 'border-gray-200',
          icon: XCircle,
          label: 'Inactive',
          animation: ''
        }
      },
      booking: {
        pending: {
          color: 'bg-yellow-500 text-white',
          borderColor: 'border-yellow-200',
          icon: Clock,
          label: 'Pending',
          animation: 'animate-pulse'
        },
        confirmed: {
          color: 'bg-green-500 text-white',
          borderColor: 'border-green-200',
          icon: CheckCircle,
          label: 'Confirmed',
          animation: 'animate-bounce-gentle'
        },
        active: {
          color: 'bg-blue-500 text-white',
          borderColor: 'border-blue-200',
          icon: Zap,
          label: 'Active',
          animation: 'animate-pulse'
        },
        cancelled: {
          color: 'bg-red-500 text-white',
          borderColor: 'border-red-200',
          icon: XCircle,
          label: 'Cancelled',
          animation: ''
        }
      },
      payment: {
        pending: {
          color: 'bg-yellow-500 text-white',
          borderColor: 'border-yellow-200',
          icon: Clock,
          label: 'Processing',
          animation: 'animate-pulse'
        },
        confirmed: {
          color: 'bg-green-500 text-white',
          borderColor: 'border-green-200',
          icon: CheckCircle,
          label: 'Paid',
          animation: ''
        },
        cancelled: {
          color: 'bg-red-500 text-white',
          borderColor: 'border-red-200',
          icon: XCircle,
          label: 'Failed',
          animation: ''
        }
      },
      verification: {
        pending: {
          color: 'bg-yellow-500 text-white',
          borderColor: 'border-yellow-200',
          icon: Clock,
          label: 'Under Review',
          animation: 'animate-pulse'
        },
        confirmed: {
          color: 'bg-green-500 text-white',
          borderColor: 'border-green-200',
          icon: CheckCircle,
          label: 'Verified',
          animation: ''
        },
        cancelled: {
          color: 'bg-red-500 text-white',
          borderColor: 'border-red-200',
          icon: AlertCircle,
          label: 'Rejected',
          animation: ''
        }
      }
    };

    return configs[type]?.[status] || configs.parking.available;
  };

  const config = getStatusConfig();
  const Icon = config.icon;
  
  const sizeClasses = {
    sm: {
      badge: 'px-2 py-1 text-xs',
      icon: 'w-3 h-3',
      dot: 'w-2 h-2'
    },
    md: {
      badge: 'px-3 py-1.5 text-sm',
      icon: 'w-4 h-4',
      dot: 'w-3 h-3'
    },
    lg: {
      badge: 'px-4 py-2 text-base',
      icon: 'w-5 h-5',
      dot: 'w-4 h-4'
    }
  };

  if (!showLabel && !showIcon) {
    // Just a status dot
    return (
      <div className={`
        ${sizeClasses[size].dot} rounded-full ${config.color} 
        ${animated ? config.animation : ''}
        transition-all duration-300
      `} />
    );
  }

  return (
    <Badge
      className={`
        ${config.color} ${sizeClasses[size].badge}
        border ${config.borderColor}
        flex items-center gap-1.5 font-medium
        ${animated ? config.animation : ''}
        transition-all duration-300 hover-scale
      `}
    >
      {showIcon && <Icon className={sizeClasses[size].icon} />}
      {showLabel && (label || config.label)}
    </Badge>
  );
}

// Preset components for common use cases
export function ParkingAvailabilityIndicator({ 
  available, 
  total, 
  animated = true 
}: { 
  available: number; 
  total: number; 
  animated?: boolean; 
}) {
  const percentage = (available / total) * 100;
  
  const getStatus = () => {
    if (percentage === 0) return 'occupied';
    if (percentage <= 20) return 'reserved';
    return 'available';
  };

  return (
    <div className="flex items-center gap-2">
      <StatusIndicator 
        status={getStatus()} 
        type="parking" 
        size="sm" 
        animated={animated}
        showLabel={false} 
      />
      <span className="text-sm font-medium text-gray-700">
        {available}/{total} available
      </span>
    </div>
  );
}

export function BookingStatusBadge({ 
  status, 
  animated = true 
}: { 
  status: string; 
  animated?: boolean; 
}) {
  return (
    <StatusIndicator 
      status={status as any}
      type="booking" 
      size="md" 
      animated={animated}
    />
  );
}

export function PaymentStatusIndicator({ 
  status, 
  amount 
}: { 
  status: string; 
  amount?: string; 
}) {
  return (
    <div className="flex items-center gap-2">
      <StatusIndicator 
        status={status as any}
        type="payment" 
        size="sm" 
        showLabel={false}
      />
      <div className="text-sm">
        <span className="font-medium text-gray-900">{amount}</span>
        <span className="text-gray-500 ml-1">
          {status === 'confirmed' ? 'Paid' : status === 'pending' ? 'Processing' : 'Failed'}
        </span>
      </div>
    </div>
  );
}