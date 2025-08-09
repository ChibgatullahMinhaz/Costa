import React from "react";
import { NavLink, Outlet } from "react-router";
import {
  Menu,
  LayoutDashboard,
  CalendarDays,
  FileText,
  Plane,
  PlusCircle,
  LogOut,
  MapPin,
} from "lucide-react";
import UserDropdown from "../Admin/Components/UserDropdown/UserDropdown";
import { User, MessageCircle } from "lucide-react";
const DriverDashboard = () => {
  const linkClass =
    "flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-base-300 transition";
  const activeClass = "bg-base-300 font-semibold";

  return (
    <div className="min-h-screen drawer lg:drawer-open bg-base-100">
      {/* Mobile Drawer Toggle */}
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Page Content */}
      <div className="flex flex-col drawer-content">
        {/* Navbar */}
        <div className="w-full px-4 shadow-md navbar bg-base-300">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-square btn-ghost"
            >
              <Menu className="w-6 h-6" />
            </label>
          </div>
          <div className="flex-1 text-xl font-bold">Driver Dashboard</div>
          <UserDropdown />
        </div>

        {/* Main Content */}
        <main className="flex-grow p-6">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="py-4 mt-auto text-center bg-base-300">
          <p>© 2025 RideApp. All rights reserved.</p>
        </footer>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label
          htmlFor="dashboard-drawer"
          className="drawer-overlay lg:hidden"
        />
        <aside className="w-64 min-h-screen p-6 space-y-4 shadow-inner bg-base-200">
          <h2 className="mb-2 text-xl font-bold">Navigation</h2>
          <nav className="space-y-1">
            <NavLink
              to="/driver-dashboard"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : ""}`
              }
            >
              <LayoutDashboard size={18} /> Dashboard
            </NavLink>
            <NavLink
              to="/driver-dashboard/assigned-rides"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : ""}`
              }
            >
              <CalendarDays size={18} /> Assigned Rides
            </NavLink>
         
            <NavLink
              to="/driver-dashboard/driver/flight"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : ""}`
              }
            >
              <Plane size={18} /> Flight Info
            </NavLink>
            <NavLink
              to="/driver-dashboard/completed-rides"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : ""}`
              }
            >
              <FileText size={18} /> Completed Rides
            </NavLink>
           
           
          </nav>

       
        </aside>
      </div>
    </div>
  );
};

export default DriverDashboard;
