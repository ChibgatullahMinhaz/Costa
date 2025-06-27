import React, { useState, useEffect } from "react";

const initialDrivers = [
  { id: 1, name: "Carlos Martinez", phone: "+506 8888-7777", status: "Active" },
  { id: 2, name: "Ana Gomez", phone: "+506 8999-1234", status: "Inactive" },
  { id: 3, name: "Jorge Rivera", phone: "+506 8444-5555", status: "Active" },
];

export default function DriverManagement() {
  const [drivers, setDrivers] = useState(initialDrivers);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState({
    id: null,
    name: "",
    phone: "",
    status: "Active",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Filtered drivers by search
  const filteredDrivers = drivers.filter(
    (d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form input change
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // Add new driver
  function handleAdd() {
    if (!form.name.trim() || !form.phone.trim()) {
      alert("Please enter name and phone.");
      return;
    }
    const newDriver = {
      id: Date.now(),
      name: form.name.trim(),
      phone: form.phone.trim(),
      status: form.status,
    };
    setDrivers((prev) => [...prev, newDriver]);
    setForm({ id: null, name: "", phone: "", status: "Active" });
  }

  // Start editing a driver
  function handleEdit(driver) {
    setForm(driver);
    setIsEditing(true);
  }

  // Update driver
  function handleUpdate() {
    if (!form.name.trim() || !form.phone.trim()) {
      alert("Please enter name and phone.");
      return;
    }
    setDrivers((prev) =>
      prev.map((d) => (d.id === form.id ? { ...d, ...form } : d))
    );
    setForm({ id: null, name: "", phone: "", status: "Active" });
    setIsEditing(false);
  }

  // Delete driver
  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this driver?")) {
      setDrivers((prev) => prev.filter((d) => d.id !== id));
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Driver Management</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search drivers by name or status..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 w-full border rounded px-4 py-2"
      />

      {/* Driver Form */}
      <div className="mb-6 border p-4 rounded bg-gray-50">
        <h3 className="text-lg font-medium mb-3">
          {isEditing ? "Edit Driver" : "Add New Driver"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Driver Name"
            className="border rounded px-3 py-2"
          />
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="border rounded px-3 py-2"
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
        <div className="mt-4">
          {isEditing ? (
            <>
              <button
                onClick={handleUpdate}
                className="bg-blue-600 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700"
              >
                Update
              </button>
              <button
                onClick={() => {
                  setForm({ id: null, name: "", phone: "", status: "Active" });
                  setIsEditing(false);
                }}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleAdd}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add Driver
            </button>
          )}
        </div>
      </div>

      {/* Drivers Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Phone
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Status
            </th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredDrivers.length > 0 ? (
            filteredDrivers.map((driver) => (
              <tr key={driver.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {driver.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {driver.phone}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {driver.status}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(driver)}
                    className="text-blue-600 hover:underline"
                    aria-label={`Edit driver ${driver.name}`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(driver.id)}
                    className="text-red-600 hover:underline"
                    aria-label={`Delete driver ${driver.name}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-6 text-gray-500">
                No drivers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
