import { Button } from "./button";
import backButtonIcon from 'figma:asset/b1ce70b7ac3fed49e5386ad4e98e1791cc58a03c.png';

interface BackButtonProps {
  onClick: () => void;
  variant?: "default" | "ghost" | "outline";
  className?: string;
}

export function BackButton({ onClick, variant = "ghost", className = "" }: BackButtonProps) {
  const baseClasses = "w-10 h-10 p-0 transition-all duration-200";
  
  const variantClasses = {
    ghost: "hover:bg-purple-50 hover:border-purple-200",
    outline: "border-purple-200 hover:bg-purple-50 hover:border-purple-300",
    default: "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
  };

  return (
    <Button
      variant={variant}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      <img 
        src={backButtonIcon} 
        alt="Back" 
        className={`w-6 h-6 transition-opacity duration-200 ${
          variant === "default" ? "brightness-0 invert" : "opacity-70 hover:opacity-100"
        }`}
      />
    </Button>
  );
}