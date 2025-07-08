// src/routes/PrivateRoute.jsx
import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // or a spinner
  }

  if (!user) {
    // store attempted route in state
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
