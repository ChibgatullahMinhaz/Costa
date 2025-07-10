import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, MoreHorizontal, Eye, Edit, Ban, Trash } from "lucide-react";
import instance from "../../../../Service/APIs/AxiosSecure";
import { format } from "date-fns";
import axiosSecurePublic from "../../../../Service/APIs/AxiosPublic";

export default function DriversList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenuUserId, setOpenMenuUserId] = useState(null);

  const { data: drivers = [], isLoading, isFetching } = useQuery({
    queryKey: ["drivers"],
    queryFn: () => axiosSecurePublic.get("api/driver").then((res) => res.data),
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
    console.log("View", user);
  };

  const handleEdit = (user) => {
    console.log("Edit", user);
  };

  const handleBan = (user) => {
    console.log("Ban/Unban", user);
  };

  const handleDelete = (user) => {
    console.log("Delete", user);
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
    <div className="rounded-lg border bg-white text-gray-900 shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            Driver List
          </h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex h-10 w-80 rounded-md border border-gray-300 bg-white px-3 py-2 pl-10 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="p-6 pt-0">
        <div className="relative w-full overflow-auto">
          <table className="w-full text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-gray-50/50">
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">
                  Driver
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">
                  Contact
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">
                  Vehicle
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">
                  Rating
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">
                  Total Trips
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">
                  Status
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading || isFetching ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    Loading users...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
                          {user.avatar ? (
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="h-10 w-10 object-cover rounded-full"
                            />
                          ) : (
                            <span className="text-blue-700 font-semibold">
                              {user.name?.charAt(0)?.toUpperCase()}
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {user.createdAt
                        ? format(new Date(user.createdAt), "dd MMM yyyy")
                        : "N/A"}
                    </td>
                    <td className="px-4 py-3">{getStatusBadge(user.status)}</td>
                    <td className="px-4 py-3 relative">
                      <button
                        onClick={() => toggleDropdown(user._id)}
                        className="h-9 w-9 flex items-center justify-center rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>

                      {openMenuUserId === user._id && (
                        <div className="absolute right-0 mt-2 z-50 w-40 rounded-md border border-gray-200 bg-white shadow-lg">
                          <button
                            onClick={() => handleView(user)}
                            className="w-full px-4 py-2 flex items-center gap-2 text-sm hover:bg-gray-100"
                          >
                            <Eye className="h-4 w-4" /> View Details
                          </button>
                          <button
                            onClick={() => handleEdit(user)}
                            className="w-full px-4 py-2 flex items-center gap-2 text-sm hover:bg-gray-100"
                          >
                            <Edit className="h-4 w-4" /> Edit
                          </button>
                          <button
                            onClick={() => handleBan(user)}
                            className="w-full px-4 py-2 flex items-center gap-2 text-sm text-red-600 hover:bg-gray-100"
                          >
                            <Ban className="h-4 w-4" />
                            {user.status === "banned" ? "Unban" : "Ban"}
                          </button>
                          <button
                            onClick={() => handleDelete(user)}
                            className="w-full px-4 py-2 flex items-center gap-2 text-sm text-red-700 hover:bg-red-100"
                          >
                            <Trash className="h-4 w-4" /> Delete
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
