// DriverDashboardHome.jsx
import React, { useEffect, useState } from "react";
import {
  MapPin,
  CheckCircle,
  Clock,
  AlertCircle,
  DollarSign,
  Navigation,
  Phone,
} from "lucide-react";
import NavigateButton from "./NavigateButton";
import AssignedRides from "../AssingedRids";

const DriverDashboardHome = () => {
  const [data, setData] = useState(null);

  if (!data) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-6xl p-6 mx-auto space-y-8">
      {/* Greeting */}
      <h1 className="text-3xl font-bold">Welcome back, {data.driverName}!</h1>
      <p className="font-medium text-green-600">
        🟢 Status: Available for new rides
      </p>

      {/* Next Ride */}
      <section className="p-6 rounded-lg shadow bg-base-200">
        <h2 className="mb-4 text-xl font-semibold">Next Assigned Ride</h2>

        <AssignedRides />
      </section>
    </div>
  );
};

export default DriverDashboardHome;
