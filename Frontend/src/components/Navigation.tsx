import { Search, MapPin, Clock, User, Filter, CreditCard, Star, Timer } from 'lucide-react';
import { Button } from './ui/button';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const navItems = [
    { id: 'find', label: 'Find', icon: Search },
    { id: 'map', label: 'Map', icon: MapPin },
    { id: 'bookings', label: 'Bookings', icon: Clock },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-white/20 z-50">
      <div className="max-w-lg mx-auto px-4 py-3">
        <div className="flex items-center justify-around">
          {navItems.map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              variant={currentPage === id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onPageChange(id)}
              className={currentPage === id ? 'bg-gradient-to-r from-purple-600 to-blue-600' : ''}
            >
              <Icon className="w-4 h-4" />
              <span className="text-xs ml-1">{label}</span>
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
}