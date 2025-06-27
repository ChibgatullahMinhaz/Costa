import React, { useState, useEffect } from "react";

// Dummy bookings data
const dummyBookings = [
  {
    id: 101,
    customerName: "Maria Gonzalez",
    flightNumber: "SJO123",
    pickupLocation: "Juan Santamaría Airport (SJO)",
    dropoffLocation: "Hotel San Bada, Manuel Antonio",
    date: "2025-07-01",
    time: "14:30",
    vehicleType: "Sedan",
    status: "Confirmed",
    price: 65.5,
  },
  {
    id: 102,
    customerName: "John Smith",
    flightNumber: "LIR456",
    pickupLocation: "Liberia Airport (LIR)",
    dropoffLocation: "Tamarindo Beach Resort",
    date: "2025-07-02",
    time: "09:15",
    vehicleType: "SUV",
    status: "Pending",
    price: 120,
  },
  {
    id: 103,
    customerName: "Ana Rodriguez",
    flightNumber: "SJO789",
    pickupLocation: "Hotel Grano de Oro, San José",
    dropoffLocation: "Nayara Springs, La Fortuna",
    date: "2025-07-03",
    time: "18:00",
    vehicleType: "Minivan",
    status: "Cancelled",
    price: 150,
  },
  // add more as needed
];

const statusColors = {
  Confirmed: "bg-green-100 text-green-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Cancelled: "bg-red-100 text-red-800",
  Completed: "bg-blue-100 text-blue-800",
};

export default function BookingManagement() {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 6;

  useEffect(() => {
    // Replace with API call
    setBookings(dummyBookings);
  }, []);

  // Filter by customerName or flightNumber
  const filteredBookings = bookings.filter(
    (b) =>
      b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.flightNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);
  const startIndex = (currentPage - 1) * bookingsPerPage;
  const paginatedBookings = filteredBookings.slice(
    startIndex,
    startIndex + bookingsPerPage
  );

  // Update booking status (simulate)
  const updateStatus = (id, newStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
  };

  // Cancel booking
  const cancelBooking = (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      updateStatus(id, "Cancelled");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-6">Booking Management</h2>

      <input
        type="text"
        placeholder="Search by customer or flight number..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-5 w-full md:w-1/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-200 rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border border-gray-300">Customer</th>
              <th className="p-3 border border-gray-300">Flight</th>
              <th className="p-3 border border-gray-300">Pickup</th>
              <th className="p-3 border border-gray-300">Dropoff</th>
              <th className="p-3 border border-gray-300">Date & Time</th>
              <th className="p-3 border border-gray-300">Vehicle</th>
              <th className="p-3 border border-gray-300">Price (USD)</th>
              <th className="p-3 border border-gray-300">Status</th>
              <th className="p-3 border border-gray-300 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedBookings.length === 0 ? (
              <tr>
                <td
                  colSpan="9"
                  className="text-center p-6 text-gray-500 font-medium"
                >
                  No bookings found.
                </td>
              </tr>
            ) : (
              paginatedBookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="border border-gray-300 px-3 py-2">
                    {booking.customerName}
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    {booking.flightNumber}
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    {booking.pickupLocation}
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    {booking.dropoffLocation}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 whitespace-nowrap">
                    {booking.date} @ {booking.time}
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    {booking.vehicleType}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 font-semibold">
                    ${booking.price.toFixed(2)}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                        statusColors[booking.status]
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center space-x-1">
                    {/* View Details button */}
                    <button
                      onClick={() => alert(JSON.stringify(booking, null, 2))}
                      className="text-indigo-600 hover:underline text-sm"
                      aria-label={`View details of booking ${booking.id}`}
                    >
                      View
                    </button>

                    {/* Update status dropdown */}
                    <select
                      value={booking.status}
                      onChange={(e) => updateStatus(booking.id, e.target.value)}
                      className="border border-gray-300 rounded text-sm px-1"
                      aria-label={`Update status for booking ${booking.id}`}
                    >
                      {Object.keys(statusColors).map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>

                    {/* Cancel button (disabled if already cancelled) */}
                    <button
                      onClick={() => cancelBooking(booking.id)}
                      disabled={booking.status === "Cancelled"}
                      className={`text-sm px-2 py-1 rounded ${
                        booking.status === "Cancelled"
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-red-600 hover:underline"
                      }`}
                      aria-label={`Cancel booking ${booking.id}`}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-5 flex justify-center space-x-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          aria-label="Previous page"
        >
          Prev
        </button>

        {[...Array(totalPages).keys()].map((_, i) => {
          const page = i + 1;
          return (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${
                currentPage === page
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              aria-label={`Go to page ${page}`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          aria-label="Next page"
        >
          Next
        </button>
      </div>
    </div>
  );
}
