import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import Footer from "../../Shared/Footer/Footer";
import Navbar from "../../Shared/Navbar/Navbar";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import { getMessaging, getToken } from "firebase/messaging";
import { messaging } from "../../Service/Firebase/firebase.init";
import Swal from "sweetalert2";
import CookieConsentBanner from "../../components/CookieConsentBanner/CookieConsentBanner";

const MainLayout = () => {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(true);

  const getPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const token = await getToken(messaging, {
          vapidKey: import.meta.env.VITE_VAPID_KEY,
        });
        if (token) {
          localStorage.setItem("notificationToken", token);
          // ✅ Success Alert
          Swal.fire({
            icon: "success",
            title: "Notification Enabled",
            text: "Push notification permission granted!",
            timer: 2000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            icon: "warning",
            title: "No Token Received",
            text: "Permission was granted, but no token received.",
          });
        }
      } else if (permission === "denied") {
        Swal.fire({
          icon: "info",
          title: "Permission Denied",
          text: "You need to allow notifications to receive alerts.",
        });
      }
    } catch (error) {
      console.error("Error while getting token:", error);
      // ❌ Error Alert
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while generating token.",
      });
    }
  };

  useEffect(() => {
    getPermission().finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <>
      <nav>
        <header>
          <Navbar />
        </header>
      </nav>

      <main>{loading ? <LoadingScreen /> : <Outlet />}</main>

      <footer>
        <Footer />
      </footer>
      <CookieConsentBanner />
    </>
  );
};

export default MainLayout;
