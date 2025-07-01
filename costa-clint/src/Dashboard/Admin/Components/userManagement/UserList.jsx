import React, { useState } from "react";
import { Search, MoreHorizontal, Eye, Edit, Ban, Trash } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import instance from "../../../../Service/APIs/AxiosSecure";

export default function UsersList() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: () => instance.get("api/user").then((res) => res.data),
  });

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(users);
  const handleView = (user) => {
    console.log("Viewing user:", user);
  };

  const handleEdit = (user) => {
    console.log("Editing user:", user);
  };

  const handleBan = (user) => {
    const action = user.isBanned ? "unban" : "ban";
    console.log(`Trying to ${action} user:`, user);
  };

  const handleDelete = (user) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmed) {
      console.log("Deleting user:", user);
    }
  };

  return (
    <div className="rounded-lg border bg-white text-gray-900 shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            User List
          </h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex h-10 w-80 rounded-md border border-gray-300 bg-white px-3 py-2 pl-10 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>
      </div>

      <div className="p-6 pt-0">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-gray-50/50">
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">
                  User
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">
                  Contact
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">
                  Join Date
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">
                  Status
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b transition-colors hover:bg-gray-50"
                >
                  <td className="p-4 align-middle">
                    <div className="flex items-center gap-3">
                      <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-blue-100">
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-blue-700">
                          {typeof user.avatar === "string" ? (
                            <img
                              src={user.avatar}
                              alt={`${user.name} avatar`}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-lg font-semibold">
                              {user.name.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 align-middle">
                    <p className="text-gray-900">{user.phone}</p>
                  </td>
                  <td className="p-4 align-middle">
                    <span className="font-medium">{user?.join_date}</span>
                  </td>
                  <td className="p-4 align-middle">
                    <span className="font-medium">{user?.status}</span>
                  </td>
                  <td className="p-2 align-middle relative">
                    <div className="group relative inline-block">
                      <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 w-9">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                      <div className="absolute right-0 mt-1 hidden w-40 rounded-md border border-gray-200 bg-white shadow-lg group-hover:block z-10">
                        <button
                          onClick={() => handleView(user)}
                          className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                        >
                          <Eye className="h-4 w-4" /> View Details
                        </button>
                        <button
                          onClick={() => handleEdit(user)}
                          className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                        >
                          <Edit className="h-4 w-4" /> Edit
                        </button>
                        <button
                          onClick={() => handleBan(user)}
                          className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-red-600"
                        >
                          <Ban className="h-4 w-4" />{" "}
                          {user.isBanned ? "Unban" : "Ban"}
                        </button>
                        <button
                          onClick={() => handleDelete(user)}
                          className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm hover:bg-red-100 text-red-700"
                        >
                          <Trash className="h-4 w-4" /> Delete
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <>
                  <p>Not Found</p>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
