import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, MoreHorizontal, Eye, Edit, Ban, Trash } from "lucide-react";
import { format } from "date-fns";
import axiosSecurePublic from "../../../../Service/APIs/AxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import axiosSecureInstance from "../../../../Service/APIs/AxiosInstance";

export default function DriversList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenuUserId, setOpenMenuUserId] = useState(null);
  const navigate = useNavigate();
  const {
    data: drivers = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["drivers"],
    queryFn: () => axiosSecureInstance.get("api/driver").then((res) => res.data),
  });

  const filteredUsers = drivers.filter((user) =>
    [user.name, user.email].some((val) =>
      val?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  const toggleDropdown = (userId) => {
    setOpenMenuUserId(openMenuUserId === userId ? null : userId);
  };

  const handleView = (user) => {
    navigate(`/admin-dashboard/driverManagement/driverDetails/${user._id}`);
  };

  const handleEdit = (user) => {
    navigate(`/admin-dashboard/driverManagement/updateDriver/${user._id}`);
  };

  const handleBan = async (user) => {
    const action = user.application_status === "banned" ? "Unban" : "Ban";
    const result = await Swal.fire({
      title: `Are you sure you want to ${action.toLowerCase()} ${user.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: `Yes, ${action.toLowerCase()}!`,
    });

    if (result.isConfirmed) {
      try {
        await axiosSecureInstance.put(`api/driver/ban/${user._id}`, {
          status: user.application_status === "banned" ? "active" : "banned",
        });

        Swal.fire({
          title: `${action}ned!`,
          text: `${user.name} has been ${action.toLowerCase()}ned.`,
          icon: "success",
          timer: 2000,
        });
        setOpenMenuUserId(null);
        refetch();
      } catch (error) {
        console.error("Ban error:", error);
        Swal.fire("Error!", "Failed to update user status.", "error");
      }
    }
  };

  const handleDelete = async (user) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${user.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecureInstance.delete(`api/driver/delete/${user._id}`);
        Swal.fire("Deleted!", "User has been deleted.", "success");
        setOpenMenuUserId(null);
        refetch();
      } catch (error) {
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  const getStatusBadge = (status) => {
    const base =
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold";
    return (
      <span
        className={`${base} ${
          status === "Active"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="text-gray-900 bg-white border rounded-lg shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            Driver List
          </h3>
          <div className="relative">
            <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex h-10 px-3 py-2 pl-10 text-sm bg-white border border-gray-300 rounded-md w-80 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="p-6 pt-0">
        <div className="relative w-full overflow-auto">
          <table className="w-full text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="transition-colors border-b hover:bg-gray-50/50">
                <th className="h-12 px-4 font-medium text-left text-gray-500 align-middle">
                  Driver
                </th>
                <th className="h-12 px-4 font-medium text-left text-gray-500 align-middle">
                  Contact
                </th>
                <th className="h-12 px-4 font-medium text-left text-gray-500 align-middle">
                  Vehicle
                </th>

                <th className="h-12 px-4 font-medium text-left text-gray-500 align-middle">
                  Status
                </th>
                <th className="h-12 px-4 font-medium text-left text-gray-500 align-middle">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading || isFetching ? (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-500">
                    Loading users...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full">
                          {user.avatar ? (
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="object-cover w-10 h-10 rounded-full"
                            />
                          ) : (
                            <span className="font-semibold text-blue-700">
                              {user.fullName?.charAt(0)?.toUpperCase()}
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{user.fullName}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">{user.phone}</td>

                    <td className="px-4 py-3">{user.vehicleType}</td>
                    <td className="px-4 py-3">
                      {getStatusBadge(user.application_status)}
                    </td>
                    <td className="relative px-4 py-3">
                      <button
                        onClick={() => toggleDropdown(user._id)}
                        className="flex items-center justify-center rounded-md h-9 w-9 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>

                      {openMenuUserId === user._id && (
                        <div className="absolute right-0 z-50 w-40 mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
                          <button
                            onClick={() => handleView(user)}
                            className="flex items-center w-full gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            <Eye className="w-4 h-4" /> View Details
                          </button>
                          <button
                            onClick={() => handleEdit(user)}
                            className="flex items-center w-full gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            <Edit className="w-4 h-4" /> Edit
                          </button>
                          <button
                            onClick={() => handleBan(user)}
                            className="flex items-center w-full gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          >
                            <Ban className="w-4 h-4" />
                            {user.status === "banned" ? "Unban" : "Ban"}
                          </button>
                          <button
                            onClick={() => handleDelete(user)}
                            className="flex items-center w-full gap-2 px-4 py-2 text-sm text-red-700 hover:bg-red-100"
                          >
                            <Trash className="w-4 h-4" /> Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
