import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../../Firebase/firebase.init";
import { AuthContext } from "../CreateContext/Auth/AuthContext";
import axiosSecurePublic from "../../APIs/AxiosPublic";
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create user with email and password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login user with email and password
  const userLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Login with Google or other providers
  const signInWithProvider = (provider) => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  // Logout user
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Monitor auth state
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //     setLoading(false);
  //   });
  //   return () => unsubscribe();
  // }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser.email) {
        try {
          const res = await axiosSecurePublic.get(
            `api/userByEmail?email=${currentUser.email}`
          );
          if (res.data) {
            setUserRole(res.data);
            localStorage.setItem("userRole", JSON.stringify(res.data));
          }
        } catch (err) {
          console.error("Error fetching user role:", err);
        }
      } else {
        setUserRole(null);
        localStorage.removeItem("userRole");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const userInfo = {
    user,
    loading,
    createUser,
    userLogin,
    signInWithProvider,
    logout,
    setLoading,
    userRole,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
