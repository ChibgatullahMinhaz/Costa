import React from "react";
import { Link, Outlet } from "react-router";
import { Menu } from "lucide-react";
import {
  LayoutDashboard,
  CalendarDays,
  FileText,
  MapPin,
  Plane,
  MessageCircle,
  User,
  LogOut,
  PlusCircle,
} from "lucide-react";
import UserDropdown from "../Admin/Components/UserDropdown/UserDropdown";

const CustomerDashboard = () => {
  return (
    <div className="min-h-screen drawer lg:drawer-open">
      {/* Hidden checkbox to toggle drawer on mobile */}
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
      <div className="flex flex-col drawer-content">
        {/* Navbar */}
        <div className="w-full navbar bg-base-300">
          <div className="flex-none lg:hidden">
            {/* Toggle button (only visible on small screens) */}
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-square btn-ghost"
            >
              <Menu className="w-6 h-6" />
            </label>
          </div>
          <div className="flex-1 px-4 text-xl font-bold">RideApp Dashboard</div>
          <UserDropdown />
        </div>

        {/* Page content */}
        <main className="flex-grow p-6 bg-base-100">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="py-4 text-center bg-base-300">
          <p>© 2025 RideApp. All rights reserved.</p>
        </footer>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label
          htmlFor="dashboard-drawer"
          className="drawer-overlay lg:hidden"
        ></label>
        <aside className="w-64 min-h-screen p-4 menu bg-base-200 text-base-content">
          <h2 className="mb-4 text-xl font-bold">My Menu</h2>
          <ul className="p-0 space-y-1 menu">
            <li>
              <Link to="/dashboard" className="flex items-center gap-2">
                <LayoutDashboard size={18} /> Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/myBookings"
                className="flex items-center gap-2"
              >
                <CalendarDays size={18} /> My Bookings
              </Link>
            </li>
           
            <li>
              <Link to="/" className="flex items-center gap-2">
                <PlusCircle size={18} /> Make a Booking
              </Link>
            </li>
            <li>
              <Link to="/dashboard/invoice" className="flex items-center gap-2">
                <FileText size={18} /> Invoices
              </Link>
            </li>
            <li>
              <Link to="/dashboard/flights" className="flex items-center gap-2">
                <Plane size={18} /> My Flights
              </Link>
            </li>
             <li>
              <Link
                to="/dashboard/live/chat"
                className="flex items-center gap-2"
              >
                <MessageCircle  size={18} /> Live Chating
              </Link>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default CustomerDashboard;
