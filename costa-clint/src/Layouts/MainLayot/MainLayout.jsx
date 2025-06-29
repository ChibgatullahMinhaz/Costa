import React, { useEffect } from "react";
import Home from "../../Pages/Home/Home";
import { Outlet, useLocation } from "react-router";
import Footer from "../../Shared/Footer/Footer";
import Navbar from "../../Shared/Navbar/Navbar";
import ScrollToTop from "../../components/UI/SrollToTop/StrollToTop";

const MainLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <>
      <nav>
        <header>
          <Navbar />
        </header>
      </nav>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </>
  );
};

export default MainLayout;
