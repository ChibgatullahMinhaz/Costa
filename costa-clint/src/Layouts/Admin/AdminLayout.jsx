import React from "react";
import AdminDashboard from "../../Dashboard/Admin/AdminDashboard";
import { Outlet } from "react-router";

const AdminLayout = () => {
  return (
    <>
      <Outlet></Outlet>
    </>
  );
};

export default AdminLayout;
