import { MapPin, Menu, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export function Header({ title = "Parkmate", subtitle = "Find your perfect spot", showBack = false, onBack }: HeaderProps) {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-lg mx-auto px-4 py-3 relative flex items-center">
        {/* Left side - Menu button or Back button */}
        <div className="flex-none w-10">
          {showBack ? (
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
          ) : (
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          )}
        </div>

        {/* Center - Logo and Title */}
        <div className="flex-1 flex items-center justify-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-xs text-gray-500">{subtitle}</p>
          </div>
        </div>

        {/* Right side - Empty space for balance */}
        <div className="flex-none w-10">
          {/* Empty div for layout balance */}
        </div>
      </div>
    </header>
  );
}