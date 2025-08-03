import { Navigate } from "react-router-dom";
import { useAuthUser } from "@/hooks/authHook/useAuthUser";
import type React from "react";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading } = useAuthUser();

  if (isLoading) return null;

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
