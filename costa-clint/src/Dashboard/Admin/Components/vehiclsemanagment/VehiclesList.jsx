import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, MoreHorizontal, Eye, Edit, Ban, Trash } from "lucide-react";
import axiosSecurePublic from "../../../../Service/APIs/AxiosPublic";
import Swal from "sweetalert2";

const fetchVehicles = async () => {
  const { data } = await axiosSecurePublic.get("api/vehicle"); 
  return data;
};

const VehiclesList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenuVehicleId, setOpenMenuVehicleId] = useState(null);

  const {
    data: vehicles = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["vehicles"],
    queryFn: fetchVehicles,
  });

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

  const toggleDropdown = (vehicleId) => {
    setOpenMenuVehicleId(openMenuVehicleId === vehicleId ? null : vehicleId);
  };

  const handleView = (vehicle) => {
    console.log("View", vehicle);
  };

  const handleEdit = (vehicle) => {
    console.log("Edit", vehicle);
  };

  const handleDelete = async (vehicle) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${vehicle.model}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecurePublic.delete(`/api/vehicle/delete/${vehicle._id}`);
        Swal.fire("Deleted!", "Vehicle has been deleted.", "success");
        setOpenMenuVehicleId(null);
        refetch();
      } catch (error) {
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  if (isLoading) return <div className="p-6">Loading vehicles...</div>;
  if (isError) return <div className="p-6 text-red-500">Failed to load vehicles.</div>;

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
              className="flex h-10 w-80 rounded-md border border-gray-300 bg-white px-3 py-2 pl-10 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            />
          </div>
        </div>
      </div>

      <div className="p-6 pt-0">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-gray-50/50">
                <th className="h-12 px-4 text-left font-medium text-gray-500">Vehicle</th>
                <th className="h-12 px-4 text-left font-medium text-gray-500">License Plate</th>
                <th className="h-12 px-4 text-left font-medium text-gray-500">Driver</th>
                <th className="h-12 px-4 text-left font-medium text-gray-500">Mileage</th>
                <th className="h-12 px-4 text-left font-medium text-gray-500">Last Service</th>
                <th className="h-12 px-4 text-left font-medium text-gray-500">Status</th>
                <th className="h-12 px-4 text-left font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {filteredVehicles.map((vehicle) => (
                <tr
                  key={vehicle._id}
                  className="border-b transition-colors hover:bg-gray-50"
                >
                  <td className="p-4">{vehicle.model}</td>
                  <td className="p-4 font-mono">{vehicle.licensePlate}</td>
                  <td className="p-4">{vehicle.driver}</td>
                  <td className="p-4">{vehicle.mileage}</td>
                  <td className="p-4">{vehicle.lastService}</td>
                  <td className="p-4">{getStatusBadge(vehicle.status)}</td>
                  <td className="p-4 relative">
                    <button
                      onClick={() => toggleDropdown(vehicle._id)}
                      className="inline-flex items-center justify-center rounded-md h-9 w-9 hover:bg-gray-100"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>

                    {openMenuVehicleId === vehicle._id && (
                      <div className="absolute right-0 mt-2 z-50 w-40 rounded-md border bg-white shadow-lg">
                        <button
                          onClick={() => handleView(vehicle)}
                          className="w-full px-4 py-2 flex items-center gap-2 text-sm hover:bg-gray-100"
                        >
                          <Eye className="h-4 w-4" /> View Details
                        </button>
                        <button
                          onClick={() => handleEdit(vehicle)}
                          className="w-full px-4 py-2 flex items-center gap-2 text-sm hover:bg-gray-100"
                        >
                          <Edit className="h-4 w-4" /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(vehicle)}
                          className="w-full px-4 py-2 flex items-center gap-2 text-sm text-red-700 hover:bg-red-100"
                        >
                          <Trash className="h-4 w-4" /> Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredVehicles.length === 0 && (
            <div className="text-center text-gray-500 py-8">No vehicles found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehiclesList;
