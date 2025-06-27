import React, { useState } from "react";
import AdminDashboard from "../../Dashboard/Admin/AdminDashboard";
import { Outlet } from "react-router";
import Header from "../../Dashboard/Admin/Header/Header";
import Content from "../../Dashboard/Admin/overview/Content";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar/Sidebar";

const AdminLayout = () => {
  return (
    <div className="grid grid-cols-12">
      {/* side bar */}
      <div className={`col-span-2`}>
        <Sidebar />
      </div>
      <main className="col-span-10 sm:col-span-10">
        <Header />
        <Content />
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default AdminLayout;
