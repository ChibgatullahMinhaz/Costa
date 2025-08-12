import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { Search, MapPin, User, Car, Clock } from "lucide-react";
import axiosSecureInstance from "../../../../Service/APIs/AxiosInstance";

const ManualAssignment = () => {
  const queryClient = useQueryClient();

  // Drivers API fetch
  const {
    data: availableDrivers = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["drivers"],
    queryFn: async () => {
      const res = await axiosSecureInstance.get("api/drivers/active");
      return res.data;
    },
  });
  // State
  const [selectedDriver, setSelectedDriver] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [bookingId, setBookingId] = useState("");

  // Mutation for assign trip
  const mutation = useMutation({
    mutationFn: async () => {
      if (!selectedDriver) throw new Error("No driver selected");
      if (!bookingId) throw new Error("Booking ID is required");
      const payload = {
        driverId: selectedDriver,
        bookingId,
        pickupLocation,
        dropoffLocation,
        customerPhone,
        notes,
      };

      // 1. Assign trip (replace with your API)
      await axiosSecureInstance.post("bookings/assign", payload);

      // 2. Update driver's assigned bookings array (replace with your API)
      await axiosSecureInstance.patch(
        `drivers/${selectedDriver}/assign-booking`,
        {
          bookingId,
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
      Swal.fire({
        icon: "success",
        title: "Trip Assigned",
        text: "Trip assigned successfully!",
        timer: 2000,
        showConfirmButton: false,
      });
      resetForm();
    },
    onError: (error) => {
      console.log();
      Swal.fire({
        icon: "error",
        title: "Assignment Failed",
        text:
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      });
    },
  });

  const resetForm = () => {
    setSelectedDriver("");
    setPickupLocation("");
    setDropoffLocation("");
    setCustomerPhone("");
    setNotes("");
    setBookingId("");
  };

  const handleAssignment = () => {
    if (
      !selectedDriver ||
      !pickupLocation ||
      !dropoffLocation ||
      !customerPhone ||
      !bookingId
    ) {
      Swal.fire({
        icon: "warning",
        title: "Missing fields",
        text: "Please fill in all required fields",
      });
      return;
    }
    mutation.mutate();
  };

  if (isLoading) return <p>Loading drivers...</p>;
  if (isError) return <p>Failed to load drivers</p>;

  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-lg shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            Manual Trip Assignment
          </h3>
          <p className="text-gray-600">Assign trips to drivers manually</p>
        </div>
        <div className="p-6 pt-0">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Assignment Form */}
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Booking ID *
                </label>
                <input
                  type="text"
                  value={bookingId}
                  onChange={(e) => setBookingId(e.target.value)}
                  placeholder="Enter Booking ID"
                  className="flex w-full h-10 px-3 py-2 text-sm bg-white border border-gray-300 rounded-md placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Customer Phone *
                </label>
                <div className="relative">
                  <User className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <input
                    type="text"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+8801XXXXXXXXX"
                    className="flex w-full h-10 px-3 py-2 pl-10 text-sm bg-white border border-gray-300 rounded-md placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Pickup Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <input
                    type="text"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    placeholder="Enter pickup address"
                    className="flex w-full h-10 px-3 py-2 pl-10 text-sm bg-white border border-gray-300 rounded-md placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Dropoff Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <input
                    type="text"
                    value={dropoffLocation}
                    onChange={(e) => setDropoffLocation(e.target.value)}
                    placeholder="Enter destination address"
                    className="flex w-full h-10 px-3 py-2 pl-10 text-sm bg-white border border-gray-300 rounded-md placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Additional Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any special instructions..."
                  rows={3}
                  className="flex w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                />
              </div>
            </div>

            {/* Available Drivers */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">
                Available Drivers
              </h4>
              <div className="space-y-2 overflow-y-auto max-h-96">
                {availableDrivers.map((driver) => (
                  <div
                    key={driver.id || driver._id}
                    onClick={() => setSelectedDriver(driver.id || driver._id)}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedDriver === (driver.id || driver._id)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative flex w-10 h-10 overflow-hidden rounded-full shrink-0">
                          <div className="flex items-center justify-center w-full h-full text-green-700 bg-green-100 rounded-full">
                            {(driver.fullName || "NA")
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {driver.fullName || "No Name"}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Car className="w-3 h-3" />
                            <span>
                              {driver.vehicleType || "Unknown Vehicle"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {driver.address || "Unknown Location"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={handleAssignment}
              disabled={mutation.isLoading}
              className="inline-flex items-center justify-center gap-2 px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50"
            >
              <Clock className="w-4 h-4" />
              {mutation.isLoading ? "Assigning..." : "Assign Trip"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualAssignment;
