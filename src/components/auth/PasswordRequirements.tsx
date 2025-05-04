
import React from "react";

interface PasswordRequirementsProps {
  password: string;
}

const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({ password }) => {
  if (!password) return null;
  
  return (
    <div className="text-xs space-y-1 mt-1">
      <p className={password.length >= 8 ? "text-green-500" : "text-gray-400"}>
        ✓ At least 8 characters
      </p>
      <p className={/[A-Z]/.test(password) && /[a-z]/.test(password) ? "text-green-500" : "text-gray-400"}>
        ✓ Uppercase and lowercase letters
      </p>
      <p className={/[0-9]/.test(password) ? "text-green-500" : "text-gray-400"}>
        ✓ At least one number
      </p>
      <p className={/[^a-zA-Z0-9]/.test(password) ? "text-green-500" : "text-gray-400"}>
        ✓ At least one special character
      </p>
    </div>
  );
};

export default PasswordRequirements;
