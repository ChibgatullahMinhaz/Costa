import React from 'react';
import Swal from 'sweetalert2';
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import axiosSecureInstance from '../../../../Service/APIs/AxiosInstance';

// Fetch all drivers with status = pending
const fetchPendingDrivers = async () => {
  const res = await axiosSecureInstance.get('api/drivers/total/status?status=pending');
  return res.data;
};

// Update driver status
const updateDriverStatus = async ({ id, status }) => {
  await axiosSecureInstance.patch(`api/driver/update/${id}/status`, { status });
};

export default function PendingDriver() {
  const queryClient = useQueryClient();

  const { data: drivers = [], isLoading } = useQuery({
    queryKey: ['pendingDrivers'],
    queryFn: fetchPendingDrivers,
  });

  const mutation = useMutation({
    mutationFn: updateDriverStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(['pendingDrivers']);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Driver status updated successfully.',
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: () => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to update driver status.',
      });
    },
  });

  const handleStatusChange = (id, status) => {
    const action = status === 'accepted' ? 'Accept' : 'Reject';

    Swal.fire({
      title: `Are you sure you want to ${action.toLowerCase()} this application?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `Yes, ${action}`,
      cancelButtonText: 'Cancel',
      confirmButtonColor: status === 'accepted' ? '#22c55e' : '#ef4444',
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate({ id, status });
      }
    });
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-4">Pending Driver Applications</h3>
      {drivers.length === 0 ? (
        <p className="text-gray-500">No pending applications.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-4 border">Full Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Phone</th>
                <th className="py-2 px-4 border">Region</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver) => (
                <tr key={driver._id} className="border-t">
                  <td className="py-2 px-4 border">{driver.fullName}</td>
                  <td className="py-2 px-4 border">{driver.email}</td>
                  <td className="py-2 px-4 border">{driver.phone}</td>
                  <td className="py-2 px-4 border">{driver.region}</td>
                  <td className="py-2 px-4 border flex gap-2">
                    <button
                      onClick={() => handleStatusChange(driver._id, 'accepted')}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      disabled={mutation.isPending}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleStatusChange(driver._id, 'rejected')}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      disabled={mutation.isPending}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
