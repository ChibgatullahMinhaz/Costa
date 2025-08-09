import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axiosSecureInstance from "../../Service/APIs/AxiosInstance";
import L from "leaflet";
import useAuth from "../../Hooks/useAuth";
import NavigateButton from "./Components/NavigateButton";
import { CheckCircle } from "lucide-react";
import Swal from "sweetalert2";

const AssignedRides = () => {
  const { userRole } = useAuth();
  const driverId = userRole?.driverId;
  const { data: rides, isLoading } = useQuery({
    queryKey: ["assignedRides", driverId],
    queryFn: async () => {
      const res = await axiosSecureInstance.get(
        `/api/driver/assigned-rides/${driverId}`
      );
      return res.data;
    },
  });

  // State to control modal and selected ride for details view
  const [modalRide, setModalRide] = useState(null);

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

      // Ideally, refetch the rides query or update cache to reflect new status
      // But for simplicity, we reload window or you can implement react-query refetch here
      window.location.reload();
    } catch (error) {
        console.log(error)
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (!rides || !Array.isArray(rides) || rides.length === 0)
    return <p>No assigned rides found.</p>;

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
                onClick={() => setModalRide(ride)}
              >
                View Details
              </button>
            </div>
          </section>
        </div>
      ))}

      {/* Modal for ride details */}
      {modalRide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-lg p-6 bg-white rounded shadow-lg">
            <button
              className="absolute text-gray-600 top-2 right-2 hover:text-gray-900"
              onClick={() => setModalRide(null)}
            >
              ✕
            </button>
            <h3 className="mb-4 text-xl font-semibold">Ride Details</h3>
            <p>
              <strong>Pickup Location:</strong> {modalRide.pickupLocation}
            </p>
            <p>
              <strong>Dropoff Location:</strong> {modalRide.dropoffLocation}
            </p>
            <p>
              <strong>Flight:</strong> {modalRide.flight || "N/A"}
            </p>
            <p>
              <strong>Passenger:</strong> {modalRide.passenger || "N/A"}
            </p>
            <p>
              <strong>Contact:</strong> {modalRide.contact || "N/A"}
            </p>
            <p>
              <strong>Assigned At:</strong> {modalRide.assignedAt}
            </p>
            <p>
              <strong>Status:</strong> {modalRide.status || "pending"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignedRides;
