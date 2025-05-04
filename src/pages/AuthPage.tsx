
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import { Flag } from "lucide-react";

const AuthPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [showLogin, setShowLogin] = useState(true);
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  const toggleForm = () => {
    setShowLogin(!showLogin);
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center mb-8">
        <Flag className="h-12 w-12 text-civic-primary mb-2" />
        <h1 className="text-4xl font-bold text-civic-primary">CivicSync</h1>
        <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
          Report, track, and vote on civic issues in your community
        </p>
      </div>
      
      <div className="w-full max-w-md">
        {showLogin ? (
          <LoginForm onToggleForm={toggleForm} />
        ) : (
          <RegisterForm onToggleForm={toggleForm} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
