// components/admin/ManualAssignment.jsx

import React, { useState, useEffect } from "react";

// Dummy data for demonstration
const dummyBookings = [
  { id: 101, customer: "Maria Gonzalez", pickup: "SJO", dropoff: "Hotel San Bada", driverId: null },
  { id: 102, customer: "John Smith", pickup: "LIR", dropoff: "Tamarindo", driverId: null },
];

const dummyDrivers = [
  { id: 1, name: "Carlos Vega" },
  { id: 2, name: "Luis Mendez" },
  { id: 3, name: "Daniela Mora" },
];

export default function ManualAssignment() {
  const [bookings, setBookings] = useState([]);
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    // Replace with API calls
    setBookings(dummyBookings);
    setDrivers(dummyDrivers);
  }, []);

  const assignDriver = (bookingId, driverId) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, driverId } : b))
    );
    alert(`Assigned driver ${driverId} to booking ${bookingId}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-6">Manual Assignment</h2>

      <table className="w-full border border-gray-200 rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Booking ID</th>
            <th className="p-3 border">Customer</th>
            <th className="p-3 border">Pickup</th>
            <th className="p-3 border">Dropoff</th>
            <th className="p-3 border">Assign Driver</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td className="border px-3 py-2">{booking.id}</td>
              <td className="border px-3 py-2">{booking.customer}</td>
              <td className="border px-3 py-2">{booking.pickup}</td>
              <td className="border px-3 py-2">{booking.dropoff}</td>
              <td className="border px-3 py-2">
                <select
                  value={booking.driverId || ""}
                  onChange={(e) => assignDriver(booking.id, parseInt(e.target.value))}
                  className="p-1 border rounded"
                >
                  <option value="">-- Select Driver --</option>
                  {drivers.map((driver) => (
                    <option key={driver.id} value={driver.id}>
                      {driver.name}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
