import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router";

export default function Users() {
  const navigate = useNavigate();

  const handleAddNewUSer = () => {
    navigate(`/admin-dashboard/userManagement/addUser`);
  };
  return (
    <div className="space-y-6 max-w-5xl mx-auto p-2">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
          <p className="text-gray-600">Manage user accounts and analytics</p>
        </div>
        <button
          onClick={handleAddNewUSer}
          className="text-shadow-green-400 bg-amber-300 p-3 rounded-box"
        >
          add new User
        </button>
      </div>

      <div className="inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500">
        <NavLink
          to="/admin-dashboard/userManagement/"
          end
          className={({ isActive }) =>
            `inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
              isActive
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:bg-white hover:text-gray-900"
            }`
          }
        >
          User List
        </NavLink>
        <NavLink
          to="/admin-dashboard/userManagement/analytics"
          className={({ isActive }) =>
            `inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
              isActive
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:bg-white hover:text-gray-900"
            }`
          }
        >
          Analytics
        </NavLink>
      </div>

      <div className="mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
        <Outlet />
      </div>
    </div>
  );
}
