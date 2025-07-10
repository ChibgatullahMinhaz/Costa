import React from "react";
import Content from "./overview/Content";
import { Link } from "react-router";
import RecentActivity from '../Admin/Components/RecentActivity/RecentActivity'
const AdminDashboard = () => {
  return (
    <div className="p-2">
      <Content />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity> </RecentActivity>

        <div className="rounded-lg border bg-white text-gray-900 shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              Quick Actions
            </h3>
          </div>
          <div className="p-6 pt-0">
            <div className="grid grid-cols-2 gap-4">
          
              <Link 
              to={`/admin-dashboard/reports`} className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 ring-offset-white transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                View Reports
              </Link>
              <Link
              to={`/admin-dashboard/pushNotification`}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white ring-offset-white transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                Send Notification
              </Link>

              <Link
                to={`/admin-dashboard/setting`}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 ring-offset-white transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
