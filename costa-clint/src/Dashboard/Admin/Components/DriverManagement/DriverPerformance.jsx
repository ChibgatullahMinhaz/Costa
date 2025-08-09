import React from "react";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecureInstance from "../../../../Service/APIs/AxiosInstance";
import useAuth from "../../../../Hooks/useAuth";

// Fetch all drivers with status = pending
const fetchPendingDrivers = async () => {
  const res = await axiosSecureInstance.get(
    "api/drivers/total/status?status=pending"
  );
  return res.data;
};

// Update driver status
const updateDriverStatus = async ({ id, status, email }) => {
  await axiosSecureInstance.patch(`api/driver/update/${id}/status`, {
    status,
    email,
  });
};

export default function PendingDriver() {
  const { user } = useAuth();

  const email = user?.email;
  const queryClient = useQueryClient();

  const { data: drivers = [], isLoading } = useQuery({
    queryKey: ["pendingDrivers"],
    queryFn: fetchPendingDrivers,
  });

  const mutation = useMutation({
    mutationFn: updateDriverStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(["pendingDrivers"]);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Driver status updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to update driver status.",
      });
    },
  });

  const handleStatusChange = (id, status) => {
    const action = status === "accepted" ? "Accept" : "Reject";

    Swal.fire({
      title: `Are you sure you want to ${action.toLowerCase()} this application?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `Yes, ${action}`,
      cancelButtonText: "Cancel",
      confirmButtonColor: status === "accepted" ? "#22c55e" : "#ef4444",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate({ id, status, email });
      }
    });
  };

  if (isLoading) {
    return <div className="py-10 text-center">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h3 className="mb-4 text-2xl font-semibold">
        Pending Driver Applications
      </h3>
      {drivers.length === 0 ? (
        <p className="text-gray-500">No pending applications.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded">
            <thead>
              <tr className="text-left bg-gray-100">
                <th className="px-4 py-2 border">Full Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Region</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver) => (
                <tr key={driver._id} className="border-t">
                  <td className="px-4 py-2 border">{driver.fullName}</td>
                  <td className="px-4 py-2 border">{driver.email}</td>
                  <td className="px-4 py-2 border">{driver.phone}</td>
                  <td className="px-4 py-2 border">{driver.region}</td>
                  <td className="flex gap-2 px-4 py-2 border">
                    <button
                      onClick={() => handleStatusChange(driver._id, "accepted")}
                      className="px-3 py-1 text-white bg-green-500 rounded hover:bg-green-600"
                      disabled={mutation.isPending}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleStatusChange(driver._id, "rejected")}
                      className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                      disabled={mutation.isPending}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
