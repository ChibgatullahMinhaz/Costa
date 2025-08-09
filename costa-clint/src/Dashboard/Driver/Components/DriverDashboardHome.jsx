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
import ResentAssignRides from "./ResentAssignRides";
import useAuth from "../../../Hooks/useAuth";

const DriverDashboardHome = () => {
const {user} = useAuth()
if(!user) return <>
<div>Loading......</div>
</>
  return (
    <div className="max-w-6xl p-6 mx-auto space-y-8">
      {/* Greeting */}
      <h1 className="text-3xl font-bold">Welcome back, {user?.displayName}!</h1>
      <p className="font-medium text-green-600">
        🟢 Status: Available for new rides
      </p>

      {/* Next Ride */}
      <section className="p-6 rounded-lg shadow bg-base-200">
        <h2 className="mb-4 text-xl font-semibold">Next Assigned Ride</h2>

        <ResentAssignRides />
      </section>
    </div>
  );
};

export default DriverDashboardHome;
