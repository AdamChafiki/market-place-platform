import { Navigate } from "react-router-dom";
import { useAuthUser } from "@/hooks/useAuthUser";
import type React from "react";

const GuestOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading } = useAuthUser();

  if (isLoading) return null;

  return user ? <Navigate to="/" replace /> : children;
};

export default GuestOnlyRoute;
