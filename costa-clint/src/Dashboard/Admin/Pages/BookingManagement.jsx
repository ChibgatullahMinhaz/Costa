// src/components/BookingManagementAdvanced.jsx
import React, { useState, useEffect } from "react";

// Dummy bookings data
const dummyBookings = [
  { id: 101, customerName: "Maria Gonzalez", flightNumber: "SJO123", pickupLocation: "SJO", dropoffLocation: "Manuel Antonio", date: "2025-07-01", time: "14:30", vehicleType: "Sedan", status: "Confirmed", price: 65.5 },
  { id: 102, customerName: "John Smith",    flightNumber: "LIR456", pickupLocation: "LIR", dropoffLocation: "Tamarindo",       date: "2025-07-02", time: "09:15", vehicleType: "SUV",   status: "Pending",   price: 120   },
  { id: 103, customerName: "Ana Rodriguez", flightNumber: "SJO789", pickupLocation: "SJO", dropoffLocation: "La Fortuna",      date: "2025-07-03", time: "18:00", vehicleType: "Minivan",status: "Cancelled", price: 150   },
  // ...more
];

const statusOptions = ["All", "Confirmed", "Pending", "Completed", "Cancelled"];
const vehicleOptions = ["All", "Sedan", "SUV", "Minivan"];

export default function BookingManagementAdvanced() {
  const [bookings, setBookings]         = useState([]);
  const [search, setSearch]             = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [vehicleFilter, setVehicleFilter] = useState("All");
  const [currentPage, setCurrentPage]   = useState(1);
  const [perPage, setPerPage]           = useState(10);
  const [selectedIds, setSelectedIds]   = useState([]);
  const [showDetails, setShowDetails]   = useState(null);

  useEffect(() => {
    setBookings(dummyBookings); // replace with API fetch
  }, []);

  // Filtering
  const filtered = bookings.filter(b => {
    if (search && ! (b.customerName.toLowerCase().includes(search.toLowerCase()) || b.flightNumber.toLowerCase().includes(search.toLowerCase()))) return false;
    if (statusFilter !== "All" && b.status !== statusFilter) return false;
    if (vehicleFilter !== "All" && b.vehicleType !== vehicleFilter) return false;
    return true;
  });

  // Metrics
  const total = filtered.length;
  const revenue = filtered.reduce((sum,b)=>sum + b.price, 0).toFixed(2);

  // Pagination
  const totalPages = Math.ceil(total / perPage);
  const pageStart = (currentPage - 1) * perPage;
  const pageData  = filtered.slice(pageStart, pageStart + perPage);

  // Bulk actions
  const toggleSelect = id => {
    setSelectedIds(ids =>
      ids.includes(id) ? ids.filter(x=>x!==id) : [...ids, id]
    );
  };
  const selectAllOnPage = () => {
    const ids = pageData.map(b=>b.id);
    setSelectedIds(ids);
  };
  const clearSelection = () => setSelectedIds([]);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded shadow">
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-gray-100 rounded">Total Bookings: <strong>{total}</strong></div>
        <div className="p-4 bg-gray-100 rounded">Total Revenue: <strong>${revenue}</strong></div>
        <div className="p-4 bg-gray-100 rounded">Selected: <strong>{selectedIds.length}</strong></div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row gap-4 mb-4">
        <input
          type="text" placeholder="Search customer or flight..."
          value={search} onChange={e=>setSearch(e.target.value)}
          className="p-2 border rounded w-full lg:w-1/3"
        />
        <select
          value={statusFilter}
          onChange={e=>setStatusFilter(e.target.value)}
          className="p-2 border rounded"
        >
          {statusOptions.map(s => <option key={s}>{s}</option>)}
        </select>
        <select
          value={vehicleFilter}
          onChange={e=>setVehicleFilter(e.target.value)}
          className="p-2 border rounded"
        >
          {vehicleOptions.map(v => <option key={v}>{v}</option>)}
        </select>
        <select
          value={perPage}
          onChange={e=>setPerPage(+e.target.value)}
          className="p-2 border rounded"
        >
          {[10,25,50,100].map(n=><option key={n} value={n}>{n}/page</option>)}
        </select>
      </div>

      {/* Bulk Toolbar */}
      {selectedIds.length > 0 && (
        <div className="mb-4 p-3 bg-blue-50 rounded flex items-center space-x-3">
          <button onClick={()=>alert("Status changed")} className="px-3 py-1 bg-blue-500 text-white rounded">Change Status</button>
          <button onClick={()=>alert("Reminder sent")} className="px-3 py-1 bg-green-500 text-white rounded">Send Reminder</button>
          <button onClick={()=>clearSelection()} className="px-3 py-1 bg-gray-300 rounded">Clear Selection</button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2"><input type="checkbox" onChange={selectAllOnPage} /></th>
              <th className="p-2">Customer</th>
              <th className="p-2">Flight</th>
              <th className="p-2">Pickup</th>
              <th className="p-2">Dropoff</th>
              <th className="p-2">Date</th>
              <th className="p-2">Vehicle</th>
              <th className="p-2">Price</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map(b => (
              <tr key={b.id} className="hover:bg-gray-50">
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(b.id)}
                    onChange={()=>toggleSelect(b.id)}
                  />
                </td>
                <td className="p-2">{b.customerName}</td>
                <td className="p-2">{b.flightNumber}</td>
                <td className="p-2">{b.pickupLocation}</td>
                <td className="p-2">{b.dropoffLocation}</td>
                <td className="p-2">{b.date} @ {b.time}</td>
                <td className="p-2">{b.vehicleType}</td>
                <td className="p-2">${b.price.toFixed(2)}</td>
                <td className="p-2">{b.status}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={()=>setShowDetails(b)}
                    className="text-indigo-600 hover:underline text-sm"
                  >
                    View
                  </button>
                  <button
                    onClick={()=>setBookings(bs => bs.map(x=>x.id===b.id?{...x,status:"Cancelled"}:x))}
                    disabled={b.status==="Cancelled"}
                    className={`text-sm ${b.status==="Cancelled"?"text-gray-400":"text-red-600 hover:underline"}`}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
            {pageData.length===0 && (
              <tr>
                <td colSpan="10" className="p-6 text-center text-gray-500">No bookings found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center space-x-2">
        <button onClick={()=>setCurrentPage(p=>Math.max(1,p-1))} disabled={currentPage===1} className="px-3 py-1 bg-gray-200 rounded">Prev</button>
        {[...Array(totalPages)].map((_,i)=>{
          const p = i+1;
          return (
            <button key={p} onClick={()=>setCurrentPage(p)}
             className={`px-3 py-1 rounded ${currentPage===p?"bg-indigo-600 text-white":"bg-gray-200 hover:bg-gray-300"}`}>
              {p}
            </button>
          )
        })}
        <button onClick={()=>setCurrentPage(p=>Math.min(totalPages,p+1))} disabled={currentPage===totalPages} className="px-3 py-1 bg-gray-200 rounded">Next</button>
      </div>

      {/* Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Booking #{showDetails.id}</h3>
            <pre className="text-sm">{JSON.stringify(showDetails, null, 2)}</pre>
            <button
              onClick={()=>setShowDetails(null)}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
