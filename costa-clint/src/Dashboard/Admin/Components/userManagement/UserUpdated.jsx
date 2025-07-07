import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import instance from "../../../../Service/APIs/AxiosSecure";

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
      instance
        .put(`api/user/update/${id}`, updatedData)
        .then((res) => res.data),
    onSuccess: (data) => {
      queryClient.setQueryData(["user", id], data);
      alert("User updated successfully!");
    },
    onError: (error) => {
      console.error("Update error:", error);
      alert(
        `Failed to update user: ${
          error?.response?.data?.message || error.message
        }`
      );
    },
  });

  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  if (isLoading) return <p>Loading user...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div>
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:{" "}
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Email:{" "}
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UserUpdated;
