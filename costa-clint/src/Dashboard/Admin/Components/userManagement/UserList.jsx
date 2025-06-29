import React, { useState } from 'react';
import { Search, MoreHorizontal } from 'lucide-react';

export default function UsersList() {
  const [searchTerm, setSearchTerm] = useState('');

  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      avatar: 'JD',
      totalTrips: 45,
      status: 'Active',
      joinDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1234567891',
      avatar: 'JS',
      totalTrips: 32,
      status: 'Inactive',
      joinDate: '2024-02-20'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+1234567892',
      avatar: 'MJ',
      totalTrips: 67,
      status: 'Active',
      joinDate: '2024-01-10'
    }
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const baseClasses = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold";
    if (status === 'Active') {
      return <span className={`${baseClasses} bg-green-100 text-green-800`}>Active</span>;
    }
    return <span className={`${baseClasses} bg-red-100 text-red-800`}>Inactive</span>;
  };

  return (
    <div className="rounded-lg border bg-white text-gray-900 shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">User List</h3>
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
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">User</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Contact</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Total Trips</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Status</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Join Date</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b transition-colors hover:bg-gray-50">
                  <td className="p-4 align-middle">
                    <div className="flex items-center gap-3">
                      <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-blue-100">
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-blue-700">
                          {user.avatar}
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
                    <span className="font-medium">{user.totalTrips}</span>
                  </td>
                  <td className="p-4 align-middle">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="p-4 align-middle">
                    <span className="text-gray-600">{user.joinDate}</span>
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
}