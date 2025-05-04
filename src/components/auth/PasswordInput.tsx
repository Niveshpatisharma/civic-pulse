
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import PasswordRequirements from "./PasswordRequirements";

interface PasswordInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  passwordStrength?: number;
  showRequirements?: boolean;
  confirmPassword?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ 
  id, 
  label, 
  value, 
  onChange, 
  passwordStrength = 0,
  showRequirements = false,
  confirmPassword
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          value={value}
          onChange={onChange}
          required
          className="pr-10"
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 text-gray-500" />
          ) : (
            <Eye className="h-4 w-4 text-gray-500" />
          )}
        </button>
      </div>
      
      {id === "password" && value && (
        <>
          <PasswordStrengthIndicator password={value} passwordStrength={passwordStrength} />
          {showRequirements && <PasswordRequirements password={value} />}
        </>
      )}
      
      {id === "confirmPassword" && confirmPassword && value !== confirmPassword && (
        <p className="text-sm text-red-500">Passwords do not match</p>
      )}
    </div>
  );
};

export default PasswordInput;
