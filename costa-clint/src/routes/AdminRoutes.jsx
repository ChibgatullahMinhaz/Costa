import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";

const AdminRoutes = ({ children }) => {
  const { user, userRole, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (userRole?.role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default AdminRoutes;
