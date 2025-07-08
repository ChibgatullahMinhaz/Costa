import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import Footer from "../../Shared/Footer/Footer";
import Navbar from "../../Shared/Navbar/Navbar";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

const MainLayout = () => {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(true); // <- Start with true for initial load

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

      <main>
        {loading ? <LoadingScreen /> : <Outlet />}
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default MainLayout;
