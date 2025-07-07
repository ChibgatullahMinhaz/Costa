import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import instance from "../../../../Service/APIs/AxiosSecure";

const UserDetails = () => {
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

  if (isLoading) return <p>Loading user...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 rounded-xl shadow-lg bg-white text-gray-800">
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-4xl font-bold text-blue-700">
              {user.name?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <h2 className="text-2xl font-semibold mt-4">{user.name}</h2>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500">Phone</h4>
          <p className="text-lg font-semibold">{user.phone || "N/A"}</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-500">Status</h4>
          <p
            className={`text-lg font-semibold ${
              user.isBanned ? "text-red-600" : "text-green-600"
            }`}
          >
            {user.isBanned ? "Banned" : "Active"}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-500">Join Date</h4>
          <p className="text-lg font-semibold">{user.join_date || "N/A"}</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-500">Role</h4>
          <p className="text-lg font-semibold">{user.role || "User"}</p>
        </div>
      </div>

      {user.bio && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-500 mb-1">Bio</h4>
          <p className="text-gray-700">{user.bio}</p>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
