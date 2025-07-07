import React, { useState } from "react";
import { Search, MoreHorizontal, Eye, Edit, Ban, Trash } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import instance from "../../../../Service/APIs/AxiosSecure";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function UsersList() {
  const [openMenuUserId, setOpenMenuUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: () => instance.get("api/user").then((res) => res.data),
  });

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (user) => {
    navigate(`/admin-dashboard/userManagement/details/${user?._id}`);
  };

  const handleEdit = (user) => {
    navigate(`/admin-dashboard/userManagement/userUpdate/${user?._id}`);
  };

  const handleBan = (user) => {
    const action = user.isBanned ? "unban" : "ban";
    console.log(`Trying to ${action} user:`, user);
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
        await instance.delete(`api/user/delete/${user._id}`);
        Swal.fire("Deleted!", "User has been deleted.", "success");
        refetch();
      } catch (error) {
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  const toggleDropdown = (userId) => {
    setOpenMenuUserId((prevId) => (prevId === userId ? null : userId));
  };
  const handleAddNewUSer = () => {
    navigate(`/admin-dashboard/userManagement/addUser`);
  };
  return (
    <div className="rounded-lg border bg-white text-gray-900 shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold">User List</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex h-10 w-80 rounded-md border border-gray-300 bg-white px-3 py-2 pl-10 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="p-6 pt-0">
        <button
          onClick={handleAddNewUSer}
          className="text-shadow-green-400 bg-amber-300 p-3 rounded-full"
        >
          add new User
        </button>
        <div className="relative w-full overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="h-12 px-4 text-left font-medium text-gray-500">
                  User
                </th>
                <th className="h-12 px-4 text-left font-medium text-gray-500">
                  Contact
                </th>
                <th className="h-12 px-4 text-left font-medium text-gray-500">
                  Join Date
                </th>
                <th className="h-12 px-4 text-left font-medium text-gray-500">
                  Status
                </th>
                <th className="h-12 px-4 text-left font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-100 overflow-hidden">
                        {typeof user.avatar === "string" ? (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="h-10 w-10 object-cover rounded-full"
                          />
                        ) : (
                          <span className="flex items-center justify-center h-full w-full text-blue-700 font-semibold">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">{user.phone}</td>
                  <td className="p-4">{user.join_date}</td>
                  <td className="p-4">{user.status}</td>
                  <td className="p-2 relative">
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
                          {user.isBanned ? "Unban" : "Ban"}
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
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
