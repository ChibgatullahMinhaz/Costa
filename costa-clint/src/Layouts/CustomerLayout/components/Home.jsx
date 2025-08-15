import React from "react";
import { Link } from "react-router";

const DashboardHome = () => {

  return (
    <div className="p-6 mx-auto space-y-10 max-w-7xl">
      <h1 className="mb-8 text-4xl font-extrabold text-primary">
        Welcome back, traveler!
      </h1>

   

      {/* Quick Actions Section */}
      <section>
        <h2 className="pb-2 mb-6 text-2xl font-semibold border-b-2 border-primary">
          Quick Actions
        </h2>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <Link to={`/`} className="btn btn-outline btn-primary flex-1 min-w-[150px]">
            Book New Transfer
          </Link>
          <Link to={`/dashboard/myBookings`} className="btn btn-outline btn-secondary flex-1 min-w-[150px]">
            Manage Bookings
          </Link>
          <Link to={`/dashboard/invoice`} className="btn btn-outline btn-accent flex-1 min-w-[150px]">
            Download Invoices
          </Link>
          <Link to={`/dashboard/live/chat`} className="btn btn-outline btn-info flex-1 min-w-[150px]">
            Contact Support
          </Link>
        </div>
      </section>
    </div>
  );
};

export default DashboardHome;
