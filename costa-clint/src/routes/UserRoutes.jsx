// src/routes/UserRoute.jsx
import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";

const UserRoutes = ({ children }) => {
  const { user, loading, userRole } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="text-center p-10">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (userRole?.role !== "user") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default UserRoutes;
