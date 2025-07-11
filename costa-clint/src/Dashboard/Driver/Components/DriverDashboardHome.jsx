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

const mockData = {
  driverName: "Carlos",
  nextRide: {
    pickup: "Juan Santamaría International Airport (SJO)",
    dropoff: "Hotel San Bada, Manuel Antonio",
    time: "10:30 AM",
    flight: "AA1234",
    passenger: "John Doe",
    contact: "+1 234 567 890",
    status: "Scheduled",
  },
  stats: {
    todayRides: 2,
    weeklyRides: 7,
    weeklyEarnings: 450,
    hoursOnline: 12,
  },
  notifications: [
    "Ride #567 completed successfully.",
    "Flight AA1234 delayed by 20 minutes.",
    "New ride assigned at 2:30 PM.",
  ],
};

const DriverDashboardHome = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData(mockData);
    }, 500);
  }, []);

  if (!data) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat bg-base-100 shadow rounded-xl p-4">
          <Clock className="text-primary mb-2" />
          <div className="stat-title">Rides Today</div>
          <div className="stat-value">{data.stats.todayRides}</div>
        </div>
        <div className="stat bg-base-100 shadow rounded-xl p-4">
          <CheckCircle className="text-green-500 mb-2" />
          <div className="stat-title">Completed This Week</div>
          <div className="stat-value">{data.stats.weeklyRides}</div>
        </div>
        <div className="stat bg-base-100 shadow rounded-xl p-4">
          <DollarSign className="text-yellow-500 mb-2" />
          <div className="stat-title">Earnings</div>
          <div className="stat-value">${data.stats.weeklyEarnings}</div>
        </div>
      </section>

      {/* Greeting */}
      <h1 className="text-3xl font-bold">Welcome back, {data.driverName}!</h1>
      <p className="text-green-600 font-medium">
        🟢 Status: Available for new rides
      </p>

      {/* Next Ride */}
      <section className="bg-base-200 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Next Assigned Ride</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p>
              <strong>Pickup:</strong> {data.nextRide.pickup}
            </p>
            <p>
              <strong>Dropoff:</strong> {data.nextRide.dropoff}
            </p>
            <p>
              <strong>Flight:</strong> {data.nextRide.flight}
            </p>
          </div>
          <div>
            <p>
              <strong>Time:</strong> {data.nextRide.time}
            </p>
            <p>
              <strong>Passenger:</strong> {data.nextRide.passenger}
            </p>
            <p>
              <strong>Contact:</strong> {data.nextRide.contact}
            </p>
          </div>
        </div>
        <div className="mt-4 flex gap-3 flex-wrap">
          <button className="btn btn-primary">
          
            <NavigateButton destinationLat={data.nextRide.pickup} destinationLng={data.nextRide.dropoff}/>
          </button>
          <button className="btn btn-outline">
            <CheckCircle size={16} /> Mark Completed
          </button>
          <button className="btn btn-outline">
            <Phone size={16} /> Contact
          </button>
        </div>
      </section>
    </div>
  );
};

export default DriverDashboardHome;
