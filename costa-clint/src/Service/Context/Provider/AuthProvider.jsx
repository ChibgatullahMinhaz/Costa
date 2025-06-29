import React from "react";
import AuthContext from "../CreateContext/AuthContex";

const AuthProvider = () => {
  const authInfo = {
    email: "hello",
  };
  return <AuthContext value={authInfo}></AuthContext>;
};

export default AuthProvider;
