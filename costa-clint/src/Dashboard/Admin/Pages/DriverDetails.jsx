import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import axiosSecureInstance from "../../../Service/APIs/AxiosInstance";

const fetchDriverById = async (id) => {
  const response = await axiosSecureInstance.get(`api/driverById/${id}`);
  return response.data;
};

const DriverDetails = () => {
  const { id } = useParams();
  const { data: driver, isLoading, error } = useQuery({
    queryKey: ["driver", id],
    queryFn: () => fetchDriverById(id),
    enabled: !!id,
  });

//   if (isLoading) return <p>Loading driver details...</p>;
//   if (error) return <p>Error loading driver details.</p>;
//   if (!driver) return <p>Driver not found.</p>;

console.log(driver)
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-3xl font-bold mb-4">Driver Details</h1>
      <div className="space-y-2">
        <p>
          <strong>Full Name:</strong> {driver?.fullName}
        </p>
        <p>
          <strong>Date of Birth:</strong> {new Date(driver?.dateOfBirth).toLocaleDateString()}
        </p>
        <p>
          <strong>Nationality:</strong> {driver?.nationality}
        </p>
        <p>
          <strong>Gender:</strong> {driver?.gender}
        </p>
        <p>
          <strong>Phone:</strong> {driver?.phone}
        </p>
        <p>
          <strong>Email:</strong> {driver?.email}
        </p>
        <p>
          <strong>Address:</strong> {driver?.address}
        </p>
        <hr />
        <h2 className="text-xl font-semibold">License Info</h2>
        <p>
          <strong>License Number:</strong> {driver?.licenseNumber}
        </p>
        <p>
          <strong>License Expiry:</strong> {new Date(driver?.licenseExpiry).toLocaleDateString()}
        </p>
        <p>
          <strong>ID Number:</strong> {driver?.idNumber}
        </p>
        <hr />
        <h2 className="text-xl font-semibold">Vehicle Info</h2>
        <p>
          <strong>Vehicle Type:</strong> {driver?.vehicleType}
        </p>
        <p>
          <strong>Vehicle Model:</strong> {driver?.vehicleModel}
        </p>
        <p>
          <strong>Vehicle Year:</strong> {driver?.vehicleYear}
        </p>
        <p>
          <strong>License Plate:</strong> {driver?.licensePlate}
        </p>
        <p>
          <strong>Vehicle Color:</strong> {driver?.vehicleColor}
        </p>
        <p>
          <strong>Seat Capacity:</strong> {driver?.seatCapacity}
        </p>
        <p>
          <strong>Luggage Capacity:</strong> {driver?.luggageCapacity}
        </p>
        <hr />
        <h2 className="text-xl font-semibold">Other Info</h2>
        <p>
          <strong>Region:</strong> {driver?.region}
        </p>
        <p>
          <strong>Available Hours:</strong> {driver?.availableHours}
        </p>
        <p>
          <strong>Night Rides:</strong> {driver?.nightRides}
        </p>
        <hr />
        <h2 className="text-xl font-semibold">Bank Details</h2>
        <p>
          <strong>Bank Name:</strong> {driver?.bankName}
        </p>
        <p>
          <strong>Account Holder:</strong> {driver?.accountHolder}
        </p>
        <p>
          <strong>Account Number:</strong> {driver?.accountNumber}
        </p>
        <p>
          <strong>Payout Method:</strong> {driver?.payoutMethod}
        </p>
        <hr />
        <p>
          <strong>Application Status:</strong> {driver?.application_status}
        </p>
        <p>
          <strong>Created At:</strong> {new Date(driver?.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default DriverDetails;
