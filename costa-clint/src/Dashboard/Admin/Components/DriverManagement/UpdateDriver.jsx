import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axiosSecurePublic from "../../../../Service/APIs/AxiosPublic";
import axiosSecureInstance from "../../../../Service/APIs/AxiosInstance";

const fetchDriverById = async (id) => {
  const response = await axiosSecureInstance.get(`/api/driverById/${id}`);
  return response.data;
};

const UpdateDriver = () => {
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: driver, isLoading } = useQuery({
    queryKey: ["driver", id],
    queryFn: () => fetchDriverById(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (driver) {
      const { _id, ...rest } = driver;
      reset(rest);
    }
  }, [driver, reset]);

  const mutation = useMutation({
    mutationFn: async (formData) => {
      // Remove _id to avoid MongoDB update issues
      if ("_id" in formData) delete formData._id;

      const response = await axiosSecurePublic.put(
        `/api/driver/update/${id}`,
        formData
      );
      return response.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Driver Updated!",
        text: "The driver information has been updated successfully.",
        confirmButtonColor: "#22c55e",
      });
    },
    onError: (error) => {
      console.error("Update failed:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error?.response?.data?.message || "Something went wrong.",
      });
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  if (isLoading) {
    return <p className="text-center py-10">Loading driver data...</p>;
  }

  const formFields = [
    { name: "fullName", label: "Full Name", type: "text" },
    { name: "dateOfBirth", label: "Date of Birth", type: "date" },
    { name: "nationality", label: "Nationality", type: "text" },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      options: ["Male", "Female", "Other"],
    },
    { name: "phone", label: "Phone Number", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "address", label: "Address", type: "text" },
    { name: "licenseNumber", label: "Driver’s License Number", type: "text" },
    { name: "licenseExpiry", label: "License Expiry", type: "date" },
    { name: "idNumber", label: "Passport or ID Number", type: "text" },
    { name: "vehicleType", label: "Vehicle Type", type: "text" },
    { name: "vehicleModel", label: "Vehicle Make & Model", type: "text" },
    { name: "vehicleYear", label: "Vehicle Year", type: "text" },
    { name: "licensePlate", label: "License Plate", type: "text" },
    { name: "vehicleColor", label: "Vehicle Color", type: "text" },
    {
      name: "seatCapacity",
      label: "Seating Capacity",
      type: "number",
    },
    {
      name: "luggageCapacity",
      label: "Luggage Capacity",
      type: "number",
    },
    { name: "region", label: "Preferred Regions", type: "text" },
    {
      name: "availableHours",
      label: "Available Hours",
      type: "text",
    },
    {
      name: "nightRides",
      label: "Willing to Accept Night Rides?",
      type: "select",
      options: ["Yes", "No"],
    },
    { name: "bankName", label: "Bank Name", type: "text" },
    {
      name: "accountHolder",
      label: "Account Holder Name",
      type: "text",
    },
    {
      name: "accountNumber",
      label: "Account Number / IBAN",
      type: "text",
    },
    {
      name: "payoutMethod",
      label: "Preferred Payout Method",
      type: "select",
      options: ["Bank Transfer", "PayPal"],
    },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl my-32 mx-auto p-6 space-y-6 bg-white shadow rounded"
    >
      <h2 className="text-2xl font-bold text-center">Update Driver Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formFields.map((field) => (
          <div key={field.name}>
            <label className="block mb-1 font-medium">{field.label}</label>
            {field.type === "select" ? (
              <select
                {...register(field.name, { required: true })}
                className="input w-full"
              >
                <option value="">Select {field.label}</option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                {...register(field.name, { required: true })}
                type={field.type}
                placeholder={field.label}
                className="input w-full"
              />
            )}
            {errors[field.name] && (
              <p className="text-red-500 text-sm">{field.label} is required.</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("agreeTerms", { required: true })}
          />
          I agree to the Terms & Conditions
        </label>
        {errors.agreeTerms && (
          <p className="text-red-500 text-sm">You must agree before submitting.</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-2 mt-4 bg-green-600 hover:bg-green-700 text-white rounded"
        disabled={mutation.isLoading}
      >
        {mutation.isLoading ? "Updating..." : "Update Driver"}
      </button>
    </form>
  );
};

export default UpdateDriver;
