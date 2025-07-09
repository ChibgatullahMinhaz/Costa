import {
  LayoutDashboard,
  CalendarDays,
  MapPin,
  Plane,
  FileText,
  User,
  MessageCircle,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const SidebarLinks = () => {
  const linkClass = "flex items-center gap-2 px-4 py-2 rounded hover:bg-base-300";
  const activeClass = "bg-base-300 font-semibold";

  return (
    <nav className="space-y-1">
      <NavLink to="/dashboard" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
        <LayoutDashboard size={18} /> Dashboard
      </NavLink>
      <NavLink to="/dashboard/assigned-rides" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
        <CalendarDays size={18} /> Assigned Rides
      </NavLink>
      <NavLink to="/dashboard/ride-map" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
        <MapPin size={18} /> Ride Map
      </NavLink>
      <NavLink to="/dashboard/flight-info" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
        <Plane size={18} /> Flight Info
      </NavLink>
      <NavLink to="/dashboard/completed-rides" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
        <FileText size={18} /> Completed Rides
      </NavLink>
      <NavLink to="/dashboard/profile" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
        <User size={18} /> Profile
      </NavLink>
      <NavLink to="/dashboard/support" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
        <MessageCircle size={18} /> Support
      </NavLink>
      <NavLink to="/logout" className={linkClass}>
        <LogOut size={18} /> Logout
      </NavLink>
    </nav>
  );
};

export default SidebarLinks;
