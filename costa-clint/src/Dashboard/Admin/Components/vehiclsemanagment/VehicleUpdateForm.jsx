import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axiosSecureInstance from "../../../../Service/APIs/AxiosInstance";

const fetchVehicle = async (id) => {
  const { data } = await axiosSecureInstance.get(`api/vehicleById/${id}`);
  return data;
};

const VehicleUpdateForm = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const {
    data: vehicle,
    isLoading,
    isError,
  } = useQuery({
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
      axiosSecureInstance.put(`api/vehicle/update/${id}`, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicle", id] });
      Swal.fire("Success!", "Vehicle updated successfully.", "success");
    },
    onError: (error) => {
      Swal.fire("Error!", "Update failed.", "error");
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
  if (isError)
    return <div className="p-4 text-red-500">Failed to fetch vehicle.</div>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl p-6 mx-auto space-y-4 bg-white rounded shadow"
    >
      <h2 className="mb-4 text-2xl font-bold">Update Vehicle</h2>

      <input
        {...register("fullName", { required: true })}
        placeholder="Full Name"
        className="w-full input input-bordered"
      />
      {errors.fullName && <p className="text-red-500">Full Name is required</p>}

      <input
        {...register("vehicleType")}
        placeholder="Vehicle Type"
        className="w-full input input-bordered"
      />
      <input
        {...register("vehicleModel")}
        placeholder="Vehicle Model"
        className="w-full input input-bordered"
      />
      <input
        {...register("vehicleYear")}
        placeholder="Vehicle Year"
        className="w-full input input-bordered"
      />
      <input
        {...register("licensePlate")}
        placeholder="License Plate"
        className="w-full input input-bordered"
      />
      <input
        {...register("vehicleColor")}
        placeholder="Vehicle Color"
        className="w-full input input-bordered"
      />
      <input
        type="number"
        {...register("seatCapacity")}
        placeholder="Seat Capacity"
        className="w-full input input-bordered"
      />
      <input
        type="number"
        {...register("luggageCapacity")}
        placeholder="Luggage Capacity"
        className="w-full input input-bordered"
      />

      <select {...register("status")} className="w-full input input-bordered">
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="maintenance">Maintenance</option>
      </select>

      <input
        {...register("title")}
        placeholder="Title"
        className="w-full input input-bordered"
      />
      <input
        {...register("subtitle")}
        placeholder="Subtitle"
        className="w-full input input-bordered"
      />
      <input
        {...register("imageUrl")}
        placeholder="Image URL"
        className="w-full input input-bordered"
      />
      <input
        type="number"
        {...register("price")}
        placeholder="Price"
        className="w-full input input-bordered"
      />

      <button
        type="submit"
        disabled={isSubmitting || mutation.isLoading}
        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        {mutation.isLoading ? "Updating..." : "Update Vehicle"}
      </button>
    </form>
  );
};

export default VehicleUpdateForm;
