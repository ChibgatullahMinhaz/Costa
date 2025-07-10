import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import instance from "../../../../Service/APIs/AxiosSecure";

const formatDate = (date) => new Date(date).toLocaleString("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

const UserDetails = () => {
  const { id } = useParams();

  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => instance.get(`api/userById/${id}`).then((res) => res.data),
    enabled: !!id,
  });

  if (isLoading) return <p className="text-center py-10 text-blue-600">Loading user...</p>;
  if (isError) return <p className="text-center py-10 text-red-600">Error: {error.message}</p>;
  if (!user) return <p className="text-center py-10 text-gray-500">User not found</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 rounded-xl shadow-md bg-white text-gray-800">
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="User Avatar"
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
