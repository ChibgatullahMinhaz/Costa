import React from "react";
import Home from "../../Pages/Home/Home";
import { Outlet } from "react-router";
import Footer from "../../Shared/Footer/Footer";
import Navbar from "../../Shared/Navbar/Navbar";

const MainLayout = () => {
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
