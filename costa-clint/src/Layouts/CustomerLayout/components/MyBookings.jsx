import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import axiosSecureInstance from "../../../Service/APIs/AxiosInstance";
import { useNavigate } from "react-router";

const cancelBooking = async (id) => {
  return await axiosSecureInstance.put(`api/booking/cancel/${id}`, {
    bookingStatus: "Cancelled",
  });
};

const MyBookings = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const Navigation = useNavigate();
  const {
    data: bookings = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["myBookings", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecureInstance.get(
        `api/myBookings?email=${user?.email}`
      );
      return data;
    },
    enabled: !!user?.email,
  });

  const cancelMutation = useMutation({
    mutationFn: cancelBooking,
    onSuccess: () => {
      queryClient.invalidateQueries(["myBookings"]);
      Swal.fire(
        "Cancelled!",
        "Booking status updated to Cancelled.",
        "success"
      );
    },
    onError: () => {
      Swal.fire("Error!", "Could not cancel the booking.", "error");
    },
  });

  const handleView = (booking) => {
    Swal.fire({
      title: `Booking ID: ${booking._id}`,
      html: `
        <p><strong>Pickup:</strong> ${booking.from}</p>
        <p><strong>Dropoff:</strong> ${booking.to}</p>
        <p><strong>Date & Time:</strong> ${booking.date} @ ${booking.time}</p>
        <p><strong>Flight:</strong> ${booking?.flight}</p>
        <p><strong>Status:</strong> ${booking?.bookingStatus}</p>
      `,
      icon: "info",
    });
  };

  const handleCancel = (booking) => {
    Swal.fire({
      title: "Are you sure?",
      text: `This will cancel booking ID: ${booking._id}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        cancelMutation.mutate(booking._id);
      }
    });
  };

  const handleUpdate = (booking) => {
    Navigation(`/dashboard/updateBooking/${booking._id}`);
  };
  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto p-6 text-center text-gray-600">
        Loading your bookings...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-5xl mx-auto p-6 text-center text-red-500">
        Failed to load bookings: {error.message}
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
                  <p className="font-semibold text-lg">{booking._id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pickup Location</p>
                  <p>{booking.from}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Dropoff Location</p>
                  <p>{booking.to}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date & Time</p>
                  <p>
                    {booking.date} @ {booking.time}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Flight Number</p>
                  {booking.flight && <p>{booking.flight}</p>}
                </div>
              </div>

              <div className="mt-4 md:mt-0 flex space-x-3">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleView(booking)}
                >
                  View
                </button>
                <button
                  onClick={() => handleUpdate(booking)}
                  className="btn btn-sm btn-outline btn-secondary"
                >
                  Edit
                </button>
                {booking.bookingStatus === "Cancelled" ? (
                  ""
                ) : (
                  <button
                    className="btn btn-sm btn-outline btn-error"
                    onClick={() => handleCancel(booking)}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            <div className="mt-4">
              <span
                className={`badge ${
                  booking.bookingStatus === "Completed"
                    ? "badge-success"
                    : booking.bookingStatus === "Cancelled"
                    ? "badge-error"
                    : "badge-info"
                }`}
              >
                {booking.bookingStatus}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
