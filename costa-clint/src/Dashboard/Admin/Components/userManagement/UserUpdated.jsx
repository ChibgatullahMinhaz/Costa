import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import instance from "../../../../Service/APIs/AxiosSecure";
import Swal from "sweetalert2";

const UserUpdated = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: () => instance.get(`api/userById/${id}`).then((res) => res.data),
    enabled: !!id,
  });

  const [formData, setFormData] = useState({});
  const mutation = useMutation({
    mutationFn: (updatedData) =>
      instance.put(`api/user/update/${id}`, updatedData).then((res) => res.data),
    onSuccess: (data) => {
      queryClient.setQueryData(["user", id], data);
      Swal.fire("Updated!", "User has been updated successfully.", "success");
    },
    onError: (error) => {
      Swal.fire(
        "Update Failed",
        error?.response?.data?.message || error.message,
        "error"
      );
    },
  });

  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update this user's information?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb", // blue
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    });

    if (result.isConfirmed) {
      mutation.mutate(formData);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-40 text-blue-600 font-medium">
        Loading user data...
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-40 text-red-500">
        Error: {error.message}
      </div>
    );

  if (!user)
    return (
      <div className="flex justify-center items-center h-40 text-gray-500">
        User not found.
      </div>
    );

  return (
    <div className="max-w-xl mx-auto mt-12 px-6 py-8 bg-white shadow-md rounded-lg border">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Update User</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name || ""}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter full name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email || ""}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter email address"
          />
        </div>

        <button
          type="submit"
          disabled={mutation.isLoading}
          className={`w-full py-2 text-white font-semibold rounded-md transition ${
            mutation.isLoading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {mutation.isLoading ? "Updating..." : "Update User"}
        </button>
      </form>
    </div>
  );
};

export default UserUpdated;
