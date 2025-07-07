import React, { useContext } from "react";
import { AuthContext } from "../Service/Context/CreateContext/Auth/AuthContext";

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export default useAuth;
