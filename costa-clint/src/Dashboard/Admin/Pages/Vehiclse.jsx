import React, { useState } from 'react';

const initialVehicles = [
  {
    id: 1,
    type: 'Sedan',
    capacity: 4,
    basePrice: 30,
    perKmRate: 1.5,
    models: ['Toyota Corolla', 'Honda Civic'],
  },
  {
    id: 2,
    type: 'SUV',
    capacity: 6,
    basePrice: 50,
    perKmRate: 2,
    models: ['Ford Explorer', 'Toyota Highlander'],
  },
  {
    id: 3,
    type: 'Van',
    capacity: 12,
    basePrice: 80,
    perKmRate: 3,
    models: ['Mercedes Sprinter', 'Ford Transit'],
  },
];

export default function VehiclesManagement() {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [searchTerm, setSearchTerm] = useState('');
  const [form, setForm] = useState({
    id: null,
    type: '',
    capacity: '',
    basePrice: '',
    perKmRate: '',
    models: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  const filteredVehicles = vehicles.filter((v) =>
    v.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleAdd() {
    if (!form.type.trim()) {
      alert('Vehicle type is required.');
      return;
    }
    const newVehicle = {
      id: Date.now(),
      type: form.type.trim(),
      capacity: Number(form.capacity),
      basePrice: Number(form.basePrice),
      perKmRate: Number(form.perKmRate),
      models: form.models.split(',').map((m) => m.trim()).filter(Boolean),
    };
    setVehicles((prev) => [...prev, newVehicle]);
    setForm({ id: null, type: '', capacity: '', basePrice: '', perKmRate: '', models: '' });
  }

  function handleEdit(vehicle) {
    setForm({
      id: vehicle.id,
      type: vehicle.type,
      capacity: vehicle.capacity,
      basePrice: vehicle.basePrice,
      perKmRate: vehicle.perKmRate,
      models: vehicle.models.join(', '),
    });
    setIsEditing(true);
  }

  function handleUpdate() {
    if (!form.type.trim()) {
      alert('Vehicle type is required.');
      return;
    }
    setVehicles((prev) =>
      prev.map((v) =>
        v.id === form.id
          ? {
              ...v,
              type: form.type.trim(),
              capacity: Number(form.capacity),
              basePrice: Number(form.basePrice),
              perKmRate: Number(form.perKmRate),
              models: form.models.split(',').map((m) => m.trim()).filter(Boolean),
            }
          : v
      )
    );
    setForm({ id: null, type: '', capacity: '', basePrice: '', perKmRate: '', models: '' });
    setIsEditing(false);
  }

  function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      setVehicles((prev) => prev.filter((v) => v.id !== id));
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Vehicles Management</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search vehicles by type..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 w-full border rounded px-4 py-2"
      />

      {/* Vehicle Form */}
      <div className="mb-6 border p-4 rounded bg-gray-50">
        <h3 className="text-lg font-medium mb-3">{isEditing ? 'Edit Vehicle' : 'Add New Vehicle'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            name="type"
            value={form.type}
            onChange={handleChange}
            placeholder="Vehicle Type (e.g., Sedan)"
            className="border rounded px-3 py-2"
          />
          <input
            name="capacity"
            type="number"
            value={form.capacity}
            onChange={handleChange}
            placeholder="Capacity (passengers)"
            className="border rounded px-3 py-2"
          />
          <input
            name="basePrice"
            type="number"
            value={form.basePrice}
            onChange={handleChange}
            placeholder="Base Price (USD)"
            className="border rounded px-3 py-2"
          />
          <input
            name="perKmRate"
            type="number"
            step="0.1"
            value={form.perKmRate}
            onChange={handleChange}
            placeholder="Per KM Rate (USD)"
            className="border rounded px-3 py-2"
          />
          <input
            name="models"
            value={form.models}
            onChange={handleChange}
            placeholder="Models (comma separated)"
            className="border rounded px-3 py-2 md:col-span-2"
          />
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
                  setForm({ id: null, type: '', capacity: '', basePrice: '', perKmRate: '', models: '' });
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
              Add Vehicle
            </button>
          )}
        </div>
      </div>

      {/* Vehicles Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Capacity</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Base Price (USD)</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Per KM Rate (USD)</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Models</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredVehicles.length > 0 ? (
            filteredVehicles.map((vehicle) => (
              <tr key={vehicle.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{vehicle.type}</td>
                <td className="border border-gray-300 px-4 py-2">{vehicle.capacity}</td>
                <td className="border border-gray-300 px-4 py-2">${vehicle.basePrice.toFixed(2)}</td>
                <td className="border border-gray-300 px-4 py-2">${vehicle.perKmRate.toFixed(2)}</td>
                <td className="border border-gray-300 px-4 py-2">{vehicle.models.join(', ')}</td>
                <td className="border border-gray-300 px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(vehicle)}
                    className="text-blue-600 hover:underline"
                    aria-label={`Edit vehicle ${vehicle.type}`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(vehicle.id)}
                    className="text-red-600 hover:underline"
                    aria-label={`Delete vehicle ${vehicle.type}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-6 text-gray-500">
                No vehicles found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
