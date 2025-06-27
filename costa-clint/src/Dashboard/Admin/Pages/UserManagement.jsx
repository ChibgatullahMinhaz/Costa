import React, { useState, useEffect } from "react";

const dummyUsers = [
  {
    id: 1,
    name: "Maria Gonzalez",
    email: "maria.g@example.com",
    role: "Client",
    status: "Active",
  },
  {
    id: 2,
    name: "Juan Perez",
    email: "juan.perez@example.com",
    role: "Driver",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Ana Rodriguez",
    email: "ana.rodriguez@example.com",
    role: "Admin",
    status: "Active",
  },
  // ...more dummy data
];

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    // In real app: fetch from API
    setUsers(dummyUsers);
  }, []);

  // Filter users by search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  // Toggle user status Active/Inactive
  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" }
          : u
      )
    );
  };

  // Delete user
  const deleteUser = (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  // Simple edit simulation (prompt for new name)
  const editUser = (id) => {
    const newName = prompt("Enter new name:");
    if (newName) {
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, name: newName } : u))
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow rounded-md">
      <h2 className="text-2xl font-semibold mb-6">User Management</h2>

      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              paginatedUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center space-x-2">
                    <button
                      onClick={() => editUser(user.id)}
                      className="text-blue-600 hover:underline"
                      aria-label={`Edit user ${user.name}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => toggleStatus(user.id)}
                      className={`${
                        user.status === "Active"
                          ? "text-red-600 hover:underline"
                          : "text-green-600 hover:underline"
                      }`}
                      aria-label={`Toggle status for ${user.name}`}
                    >
                      {user.status === "Active" ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="text-gray-600 hover:text-red-600"
                      aria-label={`Delete user ${user.name}`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center space-x-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          aria-label="Previous page"
        >
          Prev
        </button>
        {[...Array(totalPages).keys()].map((_, i) => {
          const page = i + 1;
          return (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              aria-label={`Go to page ${page}`}
            >
              {page}
            </button>
          );
        })}
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          aria-label="Next page"
        >
          Next
        </button>
      </div>
    </div>
  );
}
