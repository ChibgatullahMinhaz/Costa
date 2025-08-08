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
      <div className="p-6 text-red-500">Invalid bookings data from API</div>
    );
  }

  const filtered = bookings.filter((b) => {
    if (
      search &&
      !(
        b.customerName?.toLowerCase().includes(search.toLowerCase()) ||
        b.flightNumber?.toLowerCase().includes(search.toLowerCase())
      )
    )
      return false;
    if (statusFilter !== "All" && b.bookingStatus !== statusFilter) return false;
    if (vehicleFilter !== "All" && b.vehicleType !== vehicleFilter) return false;
    return true;
  });

  const total = filtered.length;
  const totalPages = Math.ceil(total / perPage);
  const pageStart = (currentPage - 1) * perPage;
  const pageData = filtered.slice(pageStart, pageStart + perPage);
  const revenue = filtered
    .reduce((sum, b) => sum + (b.price || 0), 0)
    .toFixed(2);

  const toggleSelect = (_id) => {
    setSelectedIds((ids) =>
      ids.includes(_id) ? ids.filter((x) => x !== _id) : [...ids, _id]
    );
  };

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

  if (isLoading) return <div className="p-6">Loading bookings...</div>;
  if (isError) return <div className="p-6 text-red-500">Failed to load bookings.</div>;

  return (
    <div className="p-6 mx-auto bg-white rounded shadow max-w-7xl">
      {/* Metrics */}
      <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-4 bg-gray-100 rounded">
          Total Bookings: <strong>{total}</strong>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 mb-4 lg:flex-row">
        <input
          type="text"
          placeholder="Search customer or flight..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded lg:w-1/3"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border rounded"
        >
          {statusOptions.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <select
          value={vehicleFilter}
          onChange={(e) => setVehicleFilter(e.target.value)}
          className="p-2 border rounded"
        >
          {vehicleOptions.map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>
        <select
          value={perPage}
          onChange={(e) => setPerPage(+e.target.value)}
          className="p-2 border rounded"
        >
          {[10, 25, 50, 100].map((n) => (
            <option key={n} value={n}>
              {n}/page
            </option>
          ))}
        </select>
      </div>

      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <div className="flex items-center p-3 mb-4 space-x-3 rounded bg-blue-50">
          <button
            onClick={handleBulkStatusChange}
            className="px-3 py-1 text-white bg-blue-500 rounded"
          >
            Cancel Selected
          </button>
          <button
            onClick={clearSelection}
            className="px-3 py-1 bg-gray-300 rounded"
          >
            Clear Selection
          </button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Customer</th>
              <th className="p-2">Pickup</th>
              <th className="p-2">Dropoff</th>
              <th className="p-2">Date</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((b) => (
              <tr key={b._id} className="hover:bg-gray-50">
                <td className="p-2">{b.contactInfo?.name}</td>
                <td className="p-2">{b.from}</td>
                <td className="p-2">{b.to}</td>
                <td className="p-2">{b.date}</td>
                <td className="p-2">
                  <select
                    value={b.bookingStatus}
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
                    className="p-1 text-sm border rounded"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="p-2">
                  <button
                    onClick={() => setShowDetails(b)}
                    className="text-sm text-indigo-600 hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {pageData.length === 0 && (
              <tr>
                <td colSpan="10" className="p-6 text-center text-gray-500">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, i) => {
          const p = i + 1;
          return (
            <button
              key={p}
              onClick={() => setCurrentPage(p)}
              className={`px-3 py-1 rounded ${
                currentPage === p
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {p}
            </button>
          );
        })}
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>

      {/* Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-2xl">
            <h3 className="mb-4 text-xl font-semibold">
              Booking #{showDetails._id}
            </h3>
            <div className="max-h-[60vh] overflow-y-auto text-sm whitespace-pre-wrap">
              {Object.entries(showDetails).map(([key, val]) => (
                <div key={key} className="mb-1">
                  <strong className="capitalize">{key}:</strong>{" "}
                  {String(val)}
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowDetails(null)}
              className="px-4 py-2 mt-4 text-white bg-indigo-600 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
