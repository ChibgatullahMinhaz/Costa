import React, { useEffect, useRef, useState } from "react";
import AdminDashboard from "../../Dashboard/Admin/AdminDashboard";
import { Outlet } from "react-router";
import Header from "../../Dashboard/Admin/Header/Header";
import Sidebar from "./Sidebar/Sidebar";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <>
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="grid grid-cols-12">
        {/* side bar */}
        <div
          ref={sidebarRef}
          className={`col-span-12 md:col-span-2 z-50 bg-white border-r md:block ${
            sidebarOpen
              ? "block absolute top-16 left-0 w-64 shadow-lg"
              : "hidden"
          }`}
        >
          <Sidebar />
        </div>
        <main className="col-span-12 sm:col-span-10">
          <Outlet></Outlet>
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
