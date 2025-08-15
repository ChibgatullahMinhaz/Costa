import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import axiosSecureInstance from "../../../../Service/APIs/AxiosInstance";

const formatDate = (date) => new Date(date).toLocaleString("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

const UserDetails = () => {
  const { id } = useParams();

  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => axiosSecureInstance.get(`api/userById/${id}`).then((res) => res.data),
    enabled: !!id,
  });

  if (isLoading) return <p className="py-10 text-center text-blue-600">Loading user...</p>;
  if (isError) return <p className="py-10 text-center text-red-600">Error: {error.message}</p>;
  if (!user) return <p className="py-10 text-center text-gray-500">User not found</p>;

  return (
    <div className="max-w-3xl p-6 mx-auto mt-10 text-gray-800 bg-white shadow-md rounded-xl">
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="User Avatar"
              className="object-cover w-32 h-32 border-4 border-blue-500 rounded-full"
            />
          ) : (
            <div className="flex items-center justify-center w-32 h-32 text-4xl font-bold text-blue-700 bg-blue-100 rounded-full">
              {user.name?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <h2 className="mt-4 text-2xl font-semibold">{user.name}</h2>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2">
        <InfoBlock label="Phone" value={user.phone || "Not Provided"} />
        <InfoBlock label="Status" value={user.status} color={user.status === "active" ? "green" : "red"} />
        <InfoBlock label="Verified" value={user.isVerified ? "Yes" : "No"} color={user.isVerified ? "green" : "red"} />
        <InfoBlock label="Role" value={user.role} />
        <InfoBlock label="Created At" value={formatDate(user.createdAt)} />
        <InfoBlock label="Updated At" value={formatDate(user.updatedAt)} />
        <InfoBlock label="Last Login" value={formatDate(user.lastLoginAt)} />
        <InfoBlock label="Firebase UID" value={user.firebaseUID} />
        <InfoBlock label="Deleted" value={user.deleted ? "Yes" : "No"} color={user.deleted ? "red" : "gray"} />
      </div>
    </div>
  );
};

const InfoBlock = ({ label, value, color }) => {
  const colorClass = color === "green"
    ? "text-green-600"
    : color === "red"
    ? "text-red-600"
    : "text-gray-800";
    
  return (
    <div>
      <h4 className="text-sm font-medium text-gray-500">{label}</h4>
      <p className={`text-lg font-semibold ${colorClass}`}>{value}</p>
    </div>
  );
};

export default UserDetails;
