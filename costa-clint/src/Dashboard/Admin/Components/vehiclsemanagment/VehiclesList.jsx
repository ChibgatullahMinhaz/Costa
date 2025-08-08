import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, MoreHorizontal, Eye, Edit, Trash } from "lucide-react";
import Swal from "sweetalert2";
import axiosSecureInstance from "../../../../Service/APIs/AxiosInstance";
import { Link, useNavigate } from "react-router";

const fetchVehicles = async () => {
  const { data } = await axiosSecureInstance.get("api/vehicle");
  return data;
};

const VehiclesList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenuVehicleId, setOpenMenuVehicleId] = useState(null);
  const [viewVehicle, setViewVehicle] = useState(null); 
const navitage = useNavigate()
  const {
    data: vehicles = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["vehicles"],
    queryFn: fetchVehicles,
  });

  // Filtering vehicles as before
  const filteredVehicles = vehicles.filter((vehicle) => {
    const model = vehicle?.model?.toLowerCase() || "";
    const license = vehicle?.licensePlate?.toLowerCase() || "";
    const driver = vehicle?.driver?.toLowerCase() || "";
    const term = searchTerm.toLowerCase();

    return (
      model.includes(term) || license.includes(term) || driver.includes(term)
    );
  });

  const getStatusBadge = (status) => {
    const baseClasses =
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold";
    if (status == "active" || status == "Active") {
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
    setViewVehicle(vehicle);
    setOpenMenuVehicleId(null);
  };


  const handleEdit = (vehicle) => {
    navitage(`/admin-dashboard/vehicles/updateVehicle/${vehicle._id}`)
  };

  const handleDelete = async (vehicle) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${vehicle.vehicleModel}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        await axiosSecureInstance.delete(`api/vehicle/delete/${vehicle._id}`);
        Swal.fire("Deleted!", "Vehicle has been deleted.", "success");
        setOpenMenuVehicleId(null);
        refetch();
      } catch (error) {
        Swal.fire("Error!", "Something went wrong.", "error");
        console.log(error);
      }
    }
  };

  if (isLoading) return <div className="p-6">Loading vehicles...</div>;
  if (isError) return <div className="p-6 text-red-500">Failed to load vehicles.</div>;

  
  return (
    <>
      <div className="text-gray-900 bg-white border rounded-lg shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              Vehicle List
            </h3>
            <div className="relative">
              <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type="text"
                placeholder="Search vehicles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex h-10 px-3 py-2 pl-10 text-sm bg-white border border-gray-300 rounded-md w-80 ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              />
            </div>
            <Link to={`/admin-dashboard/vehicles/add/vehicles`} className="btn">Add</Link>
          </div>
        </div>

        <div className="p-6 pt-0">
          <div className="relative w-full overflow-auto">
            <table className="w-full text-sm caption-bottom">
              <thead className="[&_tr]:border-b">
                <tr className="transition-colors border-b hover:bg-gray-50/50">
                  <th className="h-12 px-4 font-medium text-left text-gray-500">
                    Vehicle
                  </th>
                  <th className="h-12 px-4 font-medium text-left text-gray-500">
                    License Plate
                  </th>
                  <th className="h-12 px-4 font-medium text-left text-gray-500">
                    Driver
                  </th>
                  <th className="h-12 px-4 font-medium text-left text-gray-500">
                    Status
                  </th>
                  <th className="h-12 px-4 font-medium text-left text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {filteredVehicles.map((vehicle) => (
                  <tr
                    key={vehicle._id}
                    className="transition-colors border-b hover:bg-gray-50"
                  >
                    <td className="p-4">{vehicle.vehicleModel}</td>
                    <td className="p-4 font-mono">{vehicle.licensePlate}</td>
                    <td className="p-4">{vehicle.fullName}</td>
                    <td className="p-4">{getStatusBadge(vehicle.status)}</td>
                    <td className="relative p-4">
                      <button
                        onClick={() => toggleDropdown(vehicle._id)}
                        className="inline-flex items-center justify-center rounded-md h-9 w-9 hover:bg-gray-100"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>

                      {openMenuVehicleId === vehicle._id && (
                        <div className="absolute right-0 z-50 w-40 mt-2 bg-white border rounded-md shadow-lg">
                          <button
                            onClick={() => handleView(vehicle)}
                            className="flex items-center w-full gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            <Eye className="w-4 h-4" /> View Details
                          </button>
                          <button
                            onClick={() => handleEdit(vehicle)}
                            className="flex items-center w-full gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            <Edit className="w-4 h-4" /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(vehicle)}
                            className="flex items-center w-full gap-2 px-4 py-2 text-sm text-red-700 hover:bg-red-100"
                          >
                            <Trash className="w-4 h-4" /> Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredVehicles.length === 0 && (
              <div className="py-8 text-center text-gray-500">
                No vehicles found.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
{viewVehicle && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center py-10 overflow-auto"
    onClick={() => setViewVehicle(null)}
  >
    <div
      className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="mb-4 text-xl font-bold">Vehicle Details</h2>
      <div className="space-y-2 text-gray-800">
        <p><strong>Type:</strong> {viewVehicle.type}</p>
        <p><strong>Full Name:</strong> {viewVehicle.fullName}</p>
        <p><strong>Vehicle Type:</strong> {viewVehicle.vehicleType}</p>
        <p><strong>Model:</strong> {viewVehicle.vehicleModel}</p>
        <p><strong>Year:</strong> {viewVehicle.vehicleYear}</p>
        <p><strong>License Plate:</strong> {viewVehicle.licensePlate}</p>
        <p><strong>Color:</strong> {viewVehicle.vehicleColor}</p>
        <p><strong>Seat Capacity:</strong> {viewVehicle.seatCapacity}</p>
        <p><strong>Luggage Capacity:</strong> {viewVehicle.luggageCapacity}</p>
        <p><strong>Status:</strong> {viewVehicle.status}</p>
        <p><strong>Title:</strong> {viewVehicle.title}</p>
        <p><strong>Subtitle:</strong> {viewVehicle.subtitle}</p>
        <p><strong>Price:</strong> ${viewVehicle.price}</p>
        {viewVehicle.imageUrl && (
          <img
            src={viewVehicle.imageUrl}
            alt={viewVehicle.vehicleModel}
            className="object-cover w-full h-48 mt-2 rounded"
          />
        )}
      </div>
      <button
        onClick={() => setViewVehicle(null)}
        className="inline-block px-4 py-2 mt-6 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Close
      </button>
    </div>
  </div>
)}


    </>
  );
};

export default VehiclesList;
