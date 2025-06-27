import React, { useState, useEffect } from 'react';

const dummyReports = [
  { date: '2025-06-20', bookings: 45, earnings: 1350 },
  { date: '2025-06-21', bookings: 50, earnings: 1500 },
  { date: '2025-06-22', bookings: 40, earnings: 1200 },
  { date: '2025-06-23', bookings: 55, earnings: 1650 },
  { date: '2025-06-24', bookings: 60, earnings: 1800 },
];

export default function ReportsAndEarnings() {
  const [reports, setReports] = useState(dummyReports);
  const [startDate, setStartDate] = useState('2025-06-20');
  const [endDate, setEndDate] = useState('2025-06-24');

  // Filter reports by date range
  useEffect(() => {
    // Normally you'd fetch filtered data from API here based on dates
    const filtered = dummyReports.filter(
      (r) => r.date >= startDate && r.date <= endDate
    );
    setReports(filtered);
  }, [startDate, endDate]);

  const totalBookings = reports.reduce((sum, r) => sum + r.bookings, 0);
  const totalEarnings = reports.reduce((sum, r) => sum + r.earnings, 0);
  const totalDrivers = 25; // static or fetched from API

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Reports & Earnings</h2>

      {/* Filters */}
      <div className="flex space-x-4 mb-6 items-center">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            max={endDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            min={startDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-6 mb-6 text-center">
        <div className="bg-blue-100 rounded p-4">
          <p className="text-lg font-semibold">{totalBookings}</p>
          <p className="text-gray-600">Total Bookings</p>
        </div>
        <div className="bg-green-100 rounded p-4">
          <p className="text-lg font-semibold">${totalEarnings.toLocaleString()}</p>
          <p className="text-gray-600">Total Earnings (USD)</p>
        </div>
        <div className="bg-purple-100 rounded p-4">
          <p className="text-lg font-semibold">{totalDrivers}</p>
          <p className="text-gray-600">Total Drivers</p>
        </div>
      </div>

      {/* Reports Table */}
      <table className="w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
            <th className="border border-gray-300 px-4 py-2 text-right">Bookings</th>
            <th className="border border-gray-300 px-4 py-2 text-right">Earnings (USD)</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.date} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{report.date}</td>
              <td className="border border-gray-300 px-4 py-2 text-right">{report.bookings}</td>
              <td className="border border-gray-300 px-4 py-2 text-right">${report.earnings.toLocaleString()}</td>
            </tr>
          ))}
          {reports.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center py-6 text-gray-500">
                No reports found for selected date range.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
