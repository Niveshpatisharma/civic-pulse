
import React from "react";

interface PasswordStrengthIndicatorProps {
  password: string;
  passwordStrength: number;
}

export const getPasswordStrengthColor = (strength: number) => {
  switch (strength) {
    case 1: return "#ea384c"; // Red
    case 2: return "#F97316"; // Orange
    case 3: return "#FACC15"; // Yellow
    case 4: return "#10B981"; // Green
    default: return "#E2E8F0"; // Light gray
  }
};

export const getPasswordStrengthText = (strength: number) => {
  switch (strength) {
    case 0: return "";
    case 1: return "Weak";
    case 2: return "Fair";
    case 3: return "Good";
    case 4: return "Strong";
    default: return "";
  }
};

export const calculatePasswordStrength = (password: string): number => {
  if (password.length === 0) {
    return 0;
  }
  
  let strength = 0;
  
  // Length check
  if (password.length >= 8) strength += 1;
  
  // Check for uppercase and lowercase letters
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
  
  // Check for numbers
  if (/[0-9]/.test(password)) strength += 1;
  
  // Check for special characters
  if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
  
  return strength;
};

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ 
  password, 
  passwordStrength 
}) => {
  if (!password) return null;

  return (
    <div className="flex items-center gap-2 mt-1">
      <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full transition-all duration-300"
          style={{ 
            width: `${passwordStrength * 25}%`,
            backgroundColor: getPasswordStrengthColor(passwordStrength) 
          }}
        ></div>
      </div>
      <span className="text-xs font-medium">{getPasswordStrengthText(passwordStrength)}</span>
    </div>
  );
};

export default PasswordStrengthIndicator;
