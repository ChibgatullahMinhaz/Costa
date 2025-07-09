import React, { useEffect, useState } from "react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate data fetching (replace this with your API call)
  useEffect(() => {
    const fetchBookings = async () => {
      // Simulated delay
      await new Promise((r) => setTimeout(r, 1000));

      // Replace with your real API data fetch here
      const fetchedBookings = [
        {
          id: "12345",
          pickup: "Juan Santamaría International Airport (SJO)",
          dropoff: "Hotel San Bada, Manuel Antonio",
          date: "2025-08-15",
          time: "10:00 AM",
          flight: "AA1234",
          status: "Scheduled",
        },
        {
          id: "12346",
          pickup: "Daniel Oduber Quirós International Airport (LIR)",
          dropoff: "Hotel Tamarindo",
          date: "2025-08-20",
          time: "02:30 PM",
          flight: "DL5678",
          status: "Completed",
        },
      ];

      setBookings(fetchedBookings);
      setLoading(false);
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6 text-center text-gray-600">
        Loading your bookings...
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="max-w-5xl mx-auto p-6 text-center text-muted text-lg">
        You have no bookings yet.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-primary mb-8">My Bookings</h1>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-base-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="space-y-1 md:space-y-0 md:space-x-6 md:flex md:items-center">
                <div>
                  <p className="text-sm text-gray-500">Booking ID</p>
                  <p className="font-semibold text-lg">{booking.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pickup Location</p>
                  <p>{booking.pickup}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Dropoff Location</p>
                  <p>{booking.dropoff}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date & Time</p>
                  <p>
                    {booking.date} @ {booking.time}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Flight Number</p>
                  <p>{booking.flight}</p>
                </div>
              </div>

              <div className="mt-4 md:mt-0 flex space-x-3">
                <button className="btn btn-sm btn-primary">View</button>
                <button className="btn btn-sm btn-outline btn-secondary">
                  Edit
                </button>
                <button className="btn btn-sm btn-outline btn-error">
                  Cancel
                </button>
              </div>
            </div>

            <div className="mt-4">
              <span
                className={`badge ${
                  booking.status === "Completed"
                    ? "badge-success"
                    : booking.status === "Cancelled"
                    ? "badge-error"
                    : "badge-info"
                }`}
              >
                {booking.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
