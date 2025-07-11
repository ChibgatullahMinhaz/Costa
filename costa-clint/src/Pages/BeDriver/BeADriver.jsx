import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import axiosSecurePublic from "../../Service/APIs/AxiosPublic";
import Swal from "sweetalert2";

const BeADriver = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await axiosSecurePublic.post(
        "api/driver/create",
        formData
      );
      return response.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Application Submitted!",
        text: "Thank you. We will review your application shortly.",
        confirmButtonColor: "#22c55e",
      }); // reset();
    },
    onError: (error) => {
      console.error("Submission failed:", error);
    },
  });

  const onSubmit = (data) => {
    const newDriver = {
      ...data,
      createdAt: new Date(),
    };
    mutation.mutate(newDriver);
    console.log("Driver Application Submitted:", newDriver);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl my-32 mx-auto p-4 space-y-6 bg-white shadow rounded"
    >
      <h2 className="text-xl font-semibold">Driver Application Form</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label>Full Name</label>
          <input
            {...register("fullName", { required: true })}
            placeholder="Full Name"
            className="input"
          />
        </div>

        <div>
          <label>Date of Birth</label>
          <input
            {...register("dateOfBirth", { required: true })}
            type="date"
            className="input"
          />
        </div>

        <div>
          <label>Nationality</label>
          <input
            {...register("nationality", { required: true })}
            placeholder="Nationality"
            className="input"
          />
        </div>

        <div>
          <label>Gender</label>
          <select {...register("gender", { required: true })} className="input">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label>Phone Number</label>
          <input
            {...register("phone", { required: true })}
            placeholder="Phone Number"
            className="input"
          />
        </div>

        <div>
          <label className="block">Email</label>
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Email"
            className="input"
          />
        </div>

        <div>
          <label>Address</label>
          <input
            {...register("address", { required: true })}
            placeholder="Address"
            className="input"
          />
        </div>

        <div>
          <label>Driver’s License Number</label>
          <input
            {...register("licenseNumber", { required: true })}
            placeholder="License Number"
            className="input"
          />
        </div>

        <div>
          <label>License Expiry</label>
          <input
            {...register("licenseExpiry", { required: true })}
            type="date"
            className="input"
          />
        </div>

        <div>
          <label>Passport or ID Number</label>
          <input
            {...register("idNumber", { required: true })}
            placeholder="ID Number"
            className="input"
          />
        </div>

        <div>
          <label>Vehicle Type</label>
          <input
            {...register("vehicleType", { required: true })}
            placeholder="e.g. SUV"
            className="input"
          />
        </div>
        <div>
          <label className="block">Title</label>
          <input
            {...register("title", { required: true })}
            placeholder="Title"
            className="input"
          />
        </div>

        <div>
          <label>Subtitle</label>
          <input
            {...register("subtitle", { required: true })}
            placeholder="Subtitle"
            className="input"
          />
        </div>

        <div>
          <label>Image URL</label>
          <input
            {...register("imageUrl", { required: true })}
            placeholder="Image URL"
            className="input"
          />
        </div>

        <div>
          <label>base Price</label>
          <input
            {...register("price", { required: true })}
            type="number"
            placeholder="Price"
            className="input"
          />
        </div>

        <div>
          <label>Vehicle Make & Model</label>
          <input
            {...register("vehicleModel", { required: true })}
            placeholder="Make & Model"
            className="input"
          />
        </div>

        <div>
          <label>Vehicle Year</label>
          <input
            {...register("vehicleYear", { required: true })}
            placeholder="Year"
            className="input"
          />
        </div>

        <div>
          <label>License Plate</label>
          <input
            {...register("licensePlate", { required: true })}
            placeholder="License Plate"
            className="input"
          />
        </div>

        <div>
          <label>Vehicle Color</label>
          <input
            {...register("vehicleColor", { required: true })}
            placeholder="Color"
            className="input"
          />
        </div>

        <div>
          <label>Seating Capacity</label>
          <input
            {...register("seatCapacity", { required: true })}
            type="number"
            placeholder="Seats"
            className="input"
          />
        </div>

        <div>
          <label>Luggage Capacity</label>
          <input
            {...register("luggageCapacity", { required: true })}
            type="number"
            placeholder="Luggage"
            className="input"
          />
        </div>

        <div>
          <label>Preferred Regions</label>
          <input
            {...register("region", { required: true })}
            placeholder="Region"
            className="input"
          />
        </div>

        <div>
          <label>Available Hours</label>
          <input
            {...register("availableHours", { required: true })}
            placeholder="e.g. 6AM - 10PM"
            className="input"
          />
        </div>

        <div>
          <label>Willing to Accept Night Rides?</label>
          <select
            {...register("nightRides", { required: true })}
            className="input"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label>Bank Name</label>
          <input
            {...register("bankName", { required: true })}
            placeholder="Bank Name"
            className="input"
          />
        </div>

        <div>
          <label>Account Holder Name</label>
          <input
            {...register("accountHolder", { required: true })}
            placeholder="Account Holder"
            className="input"
          />
        </div>

        <div>
          <label>Account Number / IBAN</label>
          <input
            {...register("accountNumber", { required: true })}
            placeholder="Account Number"
            className="input"
          />
        </div>

        <div>
          <label>Preferred Payout Method</label>
          <select
            {...register("payoutMethod", { required: true })}
            className="input z-10 p-2"
          >
            <option value="">Select</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="PayPal">PayPal</option>
          </select>
        </div>
      </div>

      <label className="flex items-center gap-2 mt-4">
        <input
          type="checkbox"
          {...register("agreeTerms", { required: true })}
        />
        I agree to the Terms & Conditions
      </label>
      {errors.agreeTerms && (
        <p className="text-red-500 text-sm">
          You must agree before submitting.
        </p>
      )}

      <button
        type="submit"
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Submit Application
      </button>
    </form>
  );
};

export default BeADriver;
