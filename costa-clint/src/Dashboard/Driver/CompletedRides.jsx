import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

import "leaflet/dist/leaflet.css";

import { CheckCircle } from "lucide-react";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import axiosSecureInstance from "../../Service/APIs/AxiosInstance";
import NavigateButton from "./Components/NavigateButton";
import { useNavigate } from "react-router";

const CompletedRides = () => {
  const { userRole } = useAuth();
  const navigate = useNavigate();

  const driverId = userRole?.driverId;
  const {
    data: rides,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["CompletedRides", driverId],
    queryFn: async () => {
      const res = await axiosSecureInstance.get(
        `/api/driver/completed-rides/${driverId}`
      );
      return res.data;
    },
  });

  // Update ride status handler with confirmation
  const updateStatus = async (bookingId, newStatus) => {
    const result = await Swal.fire({
      title: `Mark ride as '${newStatus}'?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecureInstance.put(`api/driver/rides/${bookingId}/status`, {
        status: newStatus,
      });

      Swal.fire("Success", `Status updated to '${newStatus}'`, "success");

      refetch();
    } catch (error) {
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (!rides || !Array.isArray(rides) || rides.length === 0)
    return <p>No Completed rides found.</p>;
  const handleNavigate = (bookingId) => {
    navigate(`/driver-dashboard/view-ride-details/${bookingId}`);
  };
  return (
    <div className="space-y-8">
      {rides.map((ride) => (
        <div key={ride._id} className="p-4 bg-white rounded-lg shadow">
          <section className="p-6 rounded-lg shadow bg-base-200">
            <h2 className="mb-4 text-xl font-semibold">Next Assigned Ride</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p>
                  <strong>Booking Id:</strong> {ride.bookingId}
                </p>
                <p>
                  <strong>Pickup:</strong> {ride.pickupLocation}
                </p>
                <p>
                  <strong>Dropoff:</strong> {ride.dropoffLocation}
                </p>
              </div>
              <div>
                <p>
                  <strong>Assigned Time:</strong> {ride.assignedAt}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      ride.status === "pending"
                        ? "bg-gray-500"
                        : ride.status === "en route"
                        ? "bg-blue-600"
                        : ride.status === "picked up"
                        ? "bg-yellow-500"
                        : ride.status === "completed"
                        ? "bg-green-600"
                        : "bg-gray-400"
                    }`}
                  >
                    {ride.status || "pending"}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              <button className="btn btn-primary">
                <NavigateButton
                  destinationLat={ride.pickupCoords?.[0]}
                  destinationLng={ride.pickupCoords?.[1]}
                />
              </button>

              <button
                className="btn btn-outline"
                onClick={() => updateStatus(ride.bookingId, "en route")}
                disabled={
                  ride.status === "en route" || ride.status === "completed"
                }
              >
                Mark En Route
              </button>

              <button
                className="btn btn-outline"
                onClick={() => updateStatus(ride.bookingId, "picked up")}
                disabled={
                  ride.status !== "en route" || ride.status === "completed"
                }
              >
                Mark Picked Up
              </button>

              <button
                className="btn btn-outline"
                onClick={() => updateStatus(ride.bookingId, "completed")}
                disabled={ride.status === "completed"}
              >
                <CheckCircle size={16} /> Mark Completed
              </button>

              <button
                className="btn btn-info"
                onClick={() => handleNavigate(ride.bookingId)}
              >
                View Details
              </button>
            </div>
          </section>
        </div>
      ))}
    </div>
  );
};

export default CompletedRides;
