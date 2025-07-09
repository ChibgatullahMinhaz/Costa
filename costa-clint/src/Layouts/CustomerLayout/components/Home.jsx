import React from "react";

const DashboardHome = () => {
  // Example array of upcoming bookings (replace with real API data)
  const upcomingBookings = [
    {
      id: 1,
      pickup: "Juan Santamaría International Airport (SJO)",
      dropoff: "Hotel San Bada, Manuel Antonio",
      date: "2025-08-15",
      time: "10:00 AM",
      flight: "AA1234",
      status: "Scheduled",
    },
    {
      id: 2,
      pickup: "Daniel Oduber Quirós International Airport (LIR)",
      dropoff: "Hotel Tamarindo",
      date: "2025-08-20",
      time: "02:30 PM",
      flight: "DL5678",
      status: "Scheduled",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10">
      <h1 className="text-4xl font-extrabold text-primary mb-8">
        Welcome back, traveler!
      </h1>

      {/* Upcoming Bookings Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b-2 border-primary pb-2">
          Your Upcoming Bookings
        </h2>

        {upcomingBookings.length === 0 ? (
          <p className="text-center text-muted">No upcoming bookings found.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {upcomingBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-base-200 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-secondary">
                    Booking #{booking.id}
                  </h3>
                  <span
                    className={`badge ${
                      booking.status === "Scheduled"
                        ? "badge-info"
                        : "badge-warning"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>

                <ul className="space-y-2 text-base-content text-sm md:text-base">
                  <li>
                    <strong>Pickup:</strong> {booking.pickup}
                  </li>
                  <li>
                    <strong>Dropoff:</strong> {booking.dropoff}
                  </li>
                  <li>
                    <strong>Date:</strong> {booking.date}
                  </li>
                  <li>
                    <strong>Time:</strong> {booking.time}
                  </li>
                  <li>
                    <strong>Flight:</strong> {booking.flight}
                  </li>
                </ul>

                <button className="btn btn-primary btn-sm mt-4 w-full">
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Quick Actions Section */}
      <section>
        <h2 className="text-2xl font-semibold border-b-2 border-primary pb-2 mb-6">
          Quick Actions
        </h2>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
          <button className="btn btn-outline btn-primary flex-1 min-w-[150px]">
            Book New Transfer
          </button>
          <button className="btn btn-outline btn-secondary flex-1 min-w-[150px]">
            Manage Bookings
          </button>
          <button className="btn btn-outline btn-accent flex-1 min-w-[150px]">
            Download Invoices
          </button>
          <button className="btn btn-outline btn-info flex-1 min-w-[150px]">
            Contact Support
          </button>
        </div>
      </section>

      {/* Recent Activity Section */}
      <section>
        <h2 className="text-2xl font-semibold border-b-2 border-primary pb-2 mb-4">
          Recent Activity
        </h2>
        <ul className="menu bg-base-100 rounded-lg p-6 shadow-md space-y-3 text-sm md:text-base">
          <li className="hover:bg-base-200 rounded px-3 py-2 cursor-pointer transition">
            Booking #12345 confirmed for 2025-07-20
          </li>
          <li className="hover:bg-base-200 rounded px-3 py-2 cursor-pointer transition">
            Invoice #INV98765 generated
          </li>
          <li className="hover:bg-base-200 rounded px-3 py-2 cursor-pointer transition">
            Flight AA1234 delayed by 30 minutes
          </li>
          <li className="hover:bg-base-200 rounded px-3 py-2 cursor-pointer transition">
            Support chat answered
          </li>
        </ul>
      </section>
    </div>
  );
};

export default DashboardHome;
