import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecureInstance from "../../../Service/APIs/AxiosInstance";
import Swal from "sweetalert2";

const fetchBookings = async () => {
  const { data } = await axiosSecureInstance.get("/all-bookings");
  return data;
};

const updateBookingStatus = async ({ id, bookingStatus }) => {
  const { data } = await axiosSecureInstance.patch(
    `api/booking/update/status/${id}`,
    { bookingStatus }
  );
  return data;
};

const statusOptions = ["All", "Confirmed", "Pending", "Completed", "Cancelled"];
const vehicleOptions = ["All", "Sedan", "SUV", "Minivan"];

const statusColors = {
  Pending: "bg-yellow-200 text-yellow-800",
  Confirmed: "bg-blue-200 text-blue-800",
  Completed: "bg-green-200 text-green-800",
  Cancelled: "bg-red-200 text-red-800",
};

export default function BookingManagementAdvanced() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [vehicleFilter, setVehicleFilter] = useState("All");
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showDetails, setShowDetails] = useState(null);

  const {
    data: bookings = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: fetchBookings,
  });

  const updateStatusMutation = useMutation({
    mutationFn: updateBookingStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(["bookings"]);
      Swal.fire("Updated!", "Booking status updated successfully.", "success");
    },
    onError: (error) => {
      Swal.fire(
        "Error",
        error?.response?.data?.message || "Failed to update booking",
        "error"
      );
    },
  });

  if (!Array.isArray(bookings)) {
    return (
      <div className="p-6 font-semibold text-red-600 rounded shadow bg-red-50">
        Invalid bookings data from API
      </div>
    );
  }

  const filtered = bookings.filter((b) => {
    if (
      search &&
      !(
        b.contactInfo?.name?.toLowerCase().includes(search.toLowerCase()) ||
        b.flightNumber?.toLowerCase().includes(search.toLowerCase())
      )
    )
      return false;
    if (statusFilter !== "All" && b.bookingStatus !== statusFilter)
      return false;
    if (vehicleFilter !== "All" && b.vehicleType !== vehicleFilter)
      return false;
    return true;
  });

  const total = filtered.length;
  const totalPages = Math.ceil(total / perPage);
  const pageStart = (currentPage - 1) * perPage;
  const pageData = filtered.slice(pageStart, pageStart + perPage);

  const clearSelection = () => setSelectedIds([]);

  const handleBulkStatusChange = () => {
    Swal.fire({
      title: `Cancel ${selectedIds.length} bookings?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel all",
    }).then((res) => {
      if (res.isConfirmed) {
        selectedIds.forEach((_id) => {
          updateStatusMutation.mutate({ id: _id, bookingStatus: "Cancelled" });
        });
        clearSelection();
        Swal.fire("Cancelled!", "Selected bookings are cancelled.", "success");
      }
    });
  };

  if (isLoading)
    return (
      <div className="p-6 font-semibold text-center text-indigo-600">
        Loading bookings...
      </div>
    );
  if (isError)
    return (
      <div className="p-6 font-semibold text-center text-red-600 rounded shadow bg-red-50">
        Failed to load bookings.
      </div>
    );

  return (
    <div className="p-6 mx-auto bg-white rounded-lg shadow-lg max-w-7xl">
      {/* Metrics */}
      <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-4 bg-indigo-100 rounded-lg shadow">
          <h2 className="text-sm font-medium text-indigo-700">
            Total Bookings
          </h2>
          <p className="mt-1 text-3xl font-bold text-indigo-900">{total}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 mb-6 lg:flex-row">
        <input
          type="text"
          placeholder="Search customer or flight..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border border-indigo-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 lg:w-1/3"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-3 border border-indigo-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {statusOptions.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <select
          value={vehicleFilter}
          onChange={(e) => setVehicleFilter(e.target.value)}
          className="p-3 border border-indigo-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {vehicleOptions.map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>
        <select
          value={perPage}
          onChange={(e) => setPerPage(+e.target.value)}
          className="p-3 border border-indigo-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {[10, 25, 50, 100].map((n) => (
            <option key={n} value={n}>
              {n} / page
            </option>
          ))}
        </select>
      </div>

      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <div className="flex items-center p-3 mb-4 space-x-3 border border-indigo-200 rounded-lg shadow bg-indigo-50">
          <button
            onClick={handleBulkStatusChange}
            className="px-4 py-2 text-white transition bg-red-600 rounded-lg hover:bg-red-700"
          >
            Cancel Selected
          </button>
          <button
            onClick={clearSelection}
            className="px-4 py-2 transition bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Clear Selection
          </button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg shadow">
        <table className="w-full text-left border-collapse">
          <thead className="bg-indigo-100">
            <tr>
              <th className="p-3 font-semibold text-indigo-700 border-b border-indigo-300">
                Customer
              </th>
              <th className="p-3 font-semibold text-indigo-700 border-b border-indigo-300">
                Pickup
              </th>
              <th className="p-3 font-semibold text-indigo-700 border-b border-indigo-300">
                Dropoff
              </th>
              <th className="p-3 font-semibold text-indigo-700 border-b border-indigo-300">
                Date
              </th>
              <th className="p-3 font-semibold text-indigo-700 border-b border-indigo-300">
                Status
              </th>
              <th className="p-3 font-semibold text-indigo-700 border-b border-indigo-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {pageData.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="p-6 italic font-semibold text-center text-gray-500"
                >
                  No bookings found.
                </td>
              </tr>
            )}
            {pageData.map((b) => (
              <tr
                key={b._id}
                className="transition border-b cursor-pointer hover:bg-indigo-50"
              >
                <td className="p-3">{b.contactInfo?.name || "-"}</td>
                <td className="p-3">{b.from}</td>
                <td className="p-3">{b.to}</td>
                <td className="p-3">{b.date}</td>
                <td className="p-3">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                      statusColors[b.bookingStatus] ||
                      "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {b.bookingStatus}
                  </span>
                </td>
                <td className="p-3 space-x-2">
                  <select
                    value={b.bookingStatus}
                    disabled={b.bookingStatus === "completed"}
                    onChange={async (e) => {
                      const newStatus = e.target.value;
                      if (newStatus === b.bookingStatus) return;

                      const res = await Swal.fire({
                        title: `Change status to ${newStatus}?`,
                        icon: "question",
                        showCancelButton: true,
                        confirmButtonText: "Yes, change it!",
                      });

                      if (res.isConfirmed) {
                        updateStatusMutation.mutate({
                          id: b._id,
                          bookingStatus: newStatus,
                        });
                      }
                    }}
                    className={`p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      b.bookingStatus.toLowerCase() === "completed"
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer"
                    }`}
                   
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>

                  <button
                    onClick={() => setShowDetails(b)}
                    className="px-3 py-1 text-sm font-semibold text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 transition bg-indigo-200 rounded-lg hover:bg-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, i) => {
          const p = i + 1;
          return (
            <button
              key={p}
              onClick={() => setCurrentPage(p)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === p
                  ? "bg-indigo-600 text-white"
                  : "bg-indigo-100 hover:bg-indigo-200"
              } transition`}
            >
              {p}
            </button>
          );
        })}
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 transition bg-indigo-200 rounded-lg hover:bg-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      {/* Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-[90%] max-w-3xl max-h-[85vh] overflow-y-auto">
            <h3 className="mb-6 text-2xl font-bold text-indigo-700">
              Booking Details #{showDetails._id}
            </h3>
            <div className="space-y-4 text-sm text-gray-800">
              {Object.entries(showDetails).map(([key, val]) => {
                if (val && typeof val === "object") {
                  return null;
                }
                return (
                  <div key={key}>
                    <strong className="capitalize">{key}:</strong> {String(val)}
                  </div>
                );
              })}

              {/* Contact Info */}
              <div>
                <h4 className="mb-2 font-semibold text-indigo-600">
                  Contact Info
                </h4>
                {Object.entries(showDetails?.contactInfo || {}).map(
                  ([key, val]) => {
                    if (val && typeof val === "object") return null;
                    return (
                      <div key={key}>
                        <strong className="capitalize">{key}:</strong>{" "}
                        {String(val)}
                      </div>
                    );
                  }
                )}
                {showDetails?.contactInfo?.phoneNumbers && (
                  <>
                    <h5 className="mt-3 mb-1 font-semibold text-indigo-500">
                      Contact Numbers
                    </h5>
                    {Object.entries(showDetails.contactInfo.phoneNumbers).map(
                      ([key, val]) => (
                        <div key={key}>
                          <strong className="capitalize">{key}:</strong>{" "}
                          {String(val)}
                        </div>
                      )
                    )}
                  </>
                )}
              </div>

              {/* Selected Car */}
              <div>
                <h4 className="mb-2 font-semibold text-indigo-600">
                  Selected Car
                </h4>
                {Object.entries(showDetails?.selectedCar || {}).map(
                  ([key, val]) => (
                    <div key={key}>
                      <strong className="capitalize">{key}:</strong>{" "}
                      {String(val)}
                    </div>
                  )
                )}
                {showDetails?.selectedCar?.imageUrl && (
                  <img
                    src={showDetails.selectedCar.imageUrl}
                    alt="Selected Car"
                    className="object-contain mt-3 rounded-lg max-h-40"
                  />
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowDetails(null)}
                className="px-6 py-3 mt-8 font-semibold text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
