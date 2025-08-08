import React from 'react';
import { NavLink, Outlet } from 'react-router';

export default function Vehicles() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Vehicles Management</h1>
        <p className="text-gray-600">Manage vehicle fleet and pricing</p>
      </div>

      <div className="inline-flex items-center justify-center h-10 p-1 text-gray-500 bg-gray-100 rounded-md">
        <NavLink
          to="/admin-dashboard/vehicles"
          end
          className={({ isActive }) =>
            `inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
              isActive
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:bg-white hover:text-gray-900'
            }`
          }
        >
          Vehicle List
        </NavLink>
      
        <NavLink
          to="/admin-dashboard/vehicles/Pricing"
          className={({ isActive }) =>
            `inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
              isActive
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:bg-white hover:text-gray-900'
            }`
          }
        >
          Pricing
        </NavLink>
        <NavLink
          to="/admin-dashboard/vehicles/manualAssign"
          className={({ isActive }) =>
            `inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
              isActive
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:bg-white hover:text-gray-900'
            }`
          }
        >
          Manual Assignment
        </NavLink>
      </div>

      <div className="mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
        <Outlet />
      </div>
    </div>
  );
}