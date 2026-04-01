import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

// Temporary fix for src/auth/ProtectedRoute.tsx
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // Comment out your actual auth check for now to test the UI
  // const { isAuthenticated } = useAuth();
  // if (!isAuthenticated) return <Navigate to="/signup" />;

  return <>{children}</>; 
};
