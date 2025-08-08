import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecureInstance from "../../../../Service/APIs/AxiosInstance";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AddVehicleForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Mutation for adding vehicle
  const mutation = useMutation({
    mutationFn: (newVehicle) =>
      axiosSecureInstance.post("api/vehicle/create", newVehicle),
    onSuccess: () => {
      Swal.fire("Success!", "Vehicle added successfully!", "success");
      queryClient.invalidateQueries(["vehicles"]);
      reset();
      navigate("/admin-dashboard/vehicles");
    },
    onError: (error) => {
      console.error(error);
      Swal.fire("Error!", "Something went wrong.", "error");
    },
  });

  const onSubmit = (data) => {
    // Ensure seatCapacity, luggageCapacity, price, vehicleYear are numbers
    const formattedData = {
      ...data,
      seatCapacity: Number(data.seatCapacity),
      luggageCapacity: Number(data.luggageCapacity),
      price: Number(data.price),
      vehicleYear: Number(data.vehicleYear),
    };
    mutation.mutate(formattedData);
  };

  return (
    <div className="max-w-2xl p-6 mx-auto bg-white border rounded-lg shadow-sm">
      <h2 className="mb-4 text-2xl font-semibold">Add New Vehicle</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
        
        {/* Type */}
        <div className="col-span-2">
          <label className="block text-sm font-medium">Type</label>
          <input
            type="text"
            {...register("type", { required: "Type is required" })}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.type && <p className="text-sm text-red-500">{errors.type.message}</p>}
        </div>

        {/* Full Name */}
        <div className="col-span-2">
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            {...register("fullName", { required: "Full name is required" })}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.fullName && <p className="text-sm text-red-500">{errors.fullName.message}</p>}
        </div>

        {/* Vehicle Type */}
        <div>
          <label className="block text-sm font-medium">Vehicle Type</label>
          <input
            type="text"
            {...register("vehicleType", { required: "Vehicle type is required" })}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.vehicleType && <p className="text-sm text-red-500">{errors.vehicleType.message}</p>}
        </div>

        {/* Vehicle Model */}
        <div>
          <label className="block text-sm font-medium">Vehicle Model</label>
          <input
            type="text"
            {...register("vehicleModel", { required: "Vehicle model is required" })}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.vehicleModel && <p className="text-sm text-red-500">{errors.vehicleModel.message}</p>}
        </div>

        {/* Vehicle Year */}
        <div>
          <label className="block text-sm font-medium">Vehicle Year</label>
          <input
            type="number"
            {...register("vehicleYear", { required: "Year is required" })}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.vehicleYear && <p className="text-sm text-red-500">{errors.vehicleYear.message}</p>}
        </div>

        {/* License Plate */}
        <div>
          <label className="block text-sm font-medium">License Plate</label>
          <input
            type="text"
            {...register("licensePlate", { required: "License plate is required" })}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.licensePlate && <p className="text-sm text-red-500">{errors.licensePlate.message}</p>}
        </div>

        {/* Vehicle Color */}
        <div>
          <label className="block text-sm font-medium">Vehicle Color</label>
          <input
            type="text"
            {...register("vehicleColor", { required: "Color is required" })}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.vehicleColor && <p className="text-sm text-red-500">{errors.vehicleColor.message}</p>}
        </div>

        {/* Seat Capacity */}
        <div>
          <label className="block text-sm font-medium">Seat Capacity</label>
          <input
            type="number"
            {...register("seatCapacity", { required: "Seat capacity is required" })}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.seatCapacity && <p className="text-sm text-red-500">{errors.seatCapacity.message}</p>}
        </div>

        {/* Luggage Capacity */}
        <div>
          <label className="block text-sm font-medium">Luggage Capacity</label>
          <input
            type="number"
            {...register("luggageCapacity", { required: "Luggage capacity is required" })}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.luggageCapacity && <p className="text-sm text-red-500">{errors.luggageCapacity.message}</p>}
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            {...register("status", { required: "Status is required" })}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="maintenance">Maintenance</option>
            <option value="inactive">Inactive</option>
          </select>
          {errors.status && <p className="text-sm text-red-500">{errors.status.message}</p>}
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-sm font-medium">Subtitle</label>
          <input
            type="text"
            {...register("subtitle", { required: "Subtitle is required" })}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.subtitle && <p className="text-sm text-red-500">{errors.subtitle.message}</p>}
        </div>

        {/* Image URL */}
        <div className="col-span-2">
          <label className="block text-sm font-medium">Image URL</label>
          <input
            type="url"
            {...register("imageUrl", { required: "Image URL is required" })}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.imageUrl && <p className="text-sm text-red-500">{errors.imageUrl.message}</p>}
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            {...register("price", { required: "Price is required" })}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="col-span-2">
          <button
            type="submit"
            disabled={mutation.isLoading}
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {mutation.isLoading ? "Adding..." : "Add Vehicle"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVehicleForm;
