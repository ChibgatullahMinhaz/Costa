import React, { useState } from "react";
import { Search, MoreHorizontal } from "lucide-react";

const VehiclesList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const vehicles = [
    {
      id: 1,
      model: "Toyota Corolla",
      licensePlate: "DH-GA-11-1234",
      driver: "Ahmed Hassan",
      status: "Active",
      lastService: "2024-01-15",
      mileage: "45,000 km",
    },
    {
      id: 2,
      model: "Honda Civic",
      licensePlate: "DH-GA-11-1235",
      driver: "Mahmud Rahman",
      status: "Maintenance",
      lastService: "2024-02-20",
      mileage: "38,000 km",
    },
    {
      id: 3,
      model: "Nissan Sunny",
      licensePlate: "DH-GA-11-1236",
      driver: "Karim Uddin",
      status: "Active",
      lastService: "2024-01-10",
      mileage: "52,000 km",
    },
  ];

 const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const baseClasses =
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold";
    if (status === "Active") {
      return (
        <span className={`${baseClasses} bg-green-100 text-green-800`}>
          Active
        </span>
      );
    } else if (status === "Maintenance") {
      return (
        <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>
          Maintenance
        </span>
      );
    }
    return (
      <span className={`${baseClasses} bg-red-100 text-red-800`}>Inactive</span>
    );
  };

  return (
    <div className="rounded-lg border bg-white text-gray-900 shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            Vehicle List
          </h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search vehicles..."
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
                  Vehicle
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">
                  License Plate
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">
                  Driver
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">
                  Mileage
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">
                  Last Service
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
              {filteredVehicles.map((vehicle) => (
                <tr
                  key={vehicle.id}
                  className="border-b transition-colors hover:bg-gray-50"
                >
                  <td className="p-4 align-middle">
                    <p className="font-medium text-gray-900">{vehicle.model}</p>
                  </td>
                  <td className="p-4 align-middle">
                    <p className="text-gray-900 font-mono">
                      {vehicle.licensePlate}
                    </p>
                  </td>
                  <td className="p-4 align-middle">
                    <p className="text-gray-900">{vehicle.driver}</p>
                  </td>
                  <td className="p-4 align-middle">
                    <p className="text-gray-600">{vehicle.mileage}</p>
                  </td>
                  <td className="p-4 align-middle">
                    <p className="text-gray-600">{vehicle.lastService}</p>
                  </td>
                  <td className="p-4 align-middle">
                    {getStatusBadge(vehicle.status)}
                  </td>
                  <td className="p-4 align-middle">
                    <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 w-9">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VehiclesList;