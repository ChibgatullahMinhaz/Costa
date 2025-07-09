// src/components/Sidebar.jsx
import React from "react";
import { NavLink, Link } from "react-router";
import {
  LayoutDashboard,
  Users,
  Car,
  MapPin,
  BookOpen,
  Settings,
  DollarSign,
  BarChart3,
  Bell,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    Icon: LayoutDashboard,
    path: "/admin-dashboard",
    useNavLink: true,
  },
  {
    name: "Users",
    Icon: Users,
    path: "/admin-dashboard/userManagement",
    useNavLink: true,
  },
  {
    name: "Drivers",
    Icon: Car,
    path: "/admin-dashboard/driverManagement",
    useNavLink: true,
  },
  {
    name: "Vehicles",
    Icon: MapPin,
    path: "/admin-dashboard/vehicles",
    useNavLink: true,
  },
  {
    name: "Bookings",
    Icon: BookOpen,
    path: "/admin-dashboard/bookingManagement",
    useNavLink: true,
  },
  {
    name: "Earnings",
    Icon: DollarSign,
    path: "/admin-dashboard/earning",
    useNavLink: true,
  },
  {
    name: "Reports",
    Icon: BarChart3,
    path: "/admin-dashboard/reports",
    useNavLink: true,
  },
  {
    name: "Notifications",
    Icon: Bell,
    path: "/admin-dashboard/pushNotification",
    useNavLink: true,
  },
  {
    name: "Settings",
    Icon: Settings,
    path: "/admin-dashboard/setting",
    useNavLink: true,
  },
];

const Sidebar = () => {
  return (
    <div className="sticky top-0 min-h-screen p-4">
      <h1 className="text-xl font-bold mb-6 flex gap-x-1.5">
        <Car className="h-6 w-6" />
        Costa Rica
      </h1>
      <nav className="flex flex-col space-y-4">
        {menuItems.map(({ name, Icon, path, useNavLink }) => {
          const baseClasses =
            "inline-flex items-center space-x-2 px-3 py-1.5 text-sm font-medium rounded-sm transition";
          const activeClasses = "bg-white text-gray-900 shadow-sm";
          const inactiveClasses =
            "text-gray-500 hover:bg-white hover:text-gray-900";

          return useNavLink ? (
            <NavLink
              key={path}
              to={path}
              end
              className={({ isActive }) =>
                `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
              }
            >
              <Icon className="h-5 w-5" />
              <span className="hidden sm:block">{name}</span>
            </NavLink>
          ) : (
            <Link
              key={path}
              to={path}
              className={`${baseClasses} ${inactiveClasses}`}
            >
              <Icon className="h-5 w-5" />
              <span className="hidden sm:block">{name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
