import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axiosSecureInstance from "../../../../Service/APIs/AxiosInstance";
import axios from "axios";

const fetchVehicle = async (id) => {
  const { data } = await axiosSecureInstance.get(`api/vehicleById/${id}`);
  return data;
};

const VehicleUpdateForm = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  // useQuery with latest syntax
  const { data: vehicle, isLoading, isError } = useQuery({
    queryKey: ["vehicle", id],
    queryFn: () => fetchVehicle(id),
    staleTime: 5 * 60 * 1000, 
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (vehicle) {
      const { _id, ...rest } = vehicle;
      reset(rest);
    }
  }, [vehicle, reset]);

  // useMutation with latest syntax
  const mutation = useMutation({
    mutationFn: (updatedData) =>
    //   axiosSecureInstance.put(`),
    axios.put(`http://localhost:5000/api/vehicle/update/${id}`, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicle", id] });
      Swal.fire("Success!", "Vehicle updated successfully.", "success");
    },
    onError: (error) => {
      Swal.fire("Error!", "Update failed.", "error");
      console.log(error)
    },
  });

  const onSubmit = async (formData) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update this vehicle?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      mutation.mutate(formData);
    }
  };

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (isError) return <div className="p-4 text-red-500">Failed to fetch vehicle.</div>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto p-6 bg-white shadow rounded space-y-4"
    >
      <h2 className="text-2xl font-bold mb-4">Update Vehicle</h2>

      <input
        {...register("fullName", { required: true })}
        placeholder="Full Name"
        className="input input-bordered w-full"
      />
      {errors.fullName && (
        <p className="text-red-500">Full Name is required</p>
      )}

      <input
        {...register("vehicleType")}
        placeholder="Vehicle Type"
        className="input input-bordered w-full"
      />
      <input
        {...register("vehicleModel")}
        placeholder="Vehicle Model"
        className="input input-bordered w-full"
      />
      <input
        {...register("vehicleYear")}
        placeholder="Vehicle Year"
        className="input input-bordered w-full"
      />
      <input
        {...register("licensePlate")}
        placeholder="License Plate"
        className="input input-bordered w-full"
      />
      <input
        {...register("vehicleColor")}
        placeholder="Vehicle Color"
        className="input input-bordered w-full"
      />
      <input
        type="number"
        {...register("seatCapacity")}
        placeholder="Seat Capacity"
        className="input input-bordered w-full"
      />
      <input
        type="number"
        {...register("luggageCapacity")}
        placeholder="Luggage Capacity"
        className="input input-bordered w-full"
      />

      <select {...register("status")} className="input input-bordered w-full">
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="maintenance">Maintenance</option>
      </select>

      <input
        {...register("title")}
        placeholder="Title"
        className="input input-bordered w-full"
      />
      <input
        {...register("subtitle")}
        placeholder="Subtitle"
        className="input input-bordered w-full"
      />
      <input
        {...register("imageUrl")}
        placeholder="Image URL"
        className="input input-bordered w-full"
      />
      <input
        type="number"
        {...register("price")}
        placeholder="Price"
        className="input input-bordered w-full"
      />

      <button
        type="submit"
        disabled={isSubmitting || mutation.isLoading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {mutation.isLoading ? "Updating..." : "Update Vehicle"}
      </button>
    </form>
  );
};

export default VehicleUpdateForm;
