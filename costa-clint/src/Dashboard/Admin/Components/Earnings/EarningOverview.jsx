import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import axiosSecureInstance from "../../../../Service/APIs/AxiosInstance";
import { useQuery } from "@tanstack/react-query";

// Pie chart colors for revenue breakdown (dummy % for example)
const revenueBreakdown = [
  { name: "Ride Fees", value: 65, color: "#3B82F6" },
  { name: "Commission", value: 25, color: "#10B981" },
  { name: "Surge Pricing", value: 10, color: "#F59E0B" },
];

// Fetch bookings API call
const fetchBookings = async () => {
  const { data } = await axiosSecureInstance.get("all-bookings");
  return data;
};

// Process bookings to aggregate monthly data
const processBookingData = (bookings) => {
  const monthlySummary = {};

  bookings.forEach(({ amount, date, driverId }) => {
    // Get short month name like "Jan", "Feb"
    const month = new Date(date).toLocaleString("default", { month: "short" });

    if (!monthlySummary[month]) {
      monthlySummary[month] = { revenue: 0, rides: 0, drivers: new Set() };
    }

    monthlySummary[month].revenue += amount;
    monthlySummary[month].rides += 1;
    monthlySummary[month].drivers.add(driverId);
  });

  return Object.entries(monthlySummary).map(([month, data]) => ({
    month,
    revenue: data.revenue,
    rides: data.rides,
  }));
};

const EarningOverview = () => {
  const {
    data: bookings = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bookings-overview"],
    queryFn: fetchBookings,
  });

  if (isLoading) return <div className="p-6">Loading bookings...</div>;
  if (isError)
    return <div className="p-6 text-red-500">Failed to load bookings.</div>;

  // Process data for charts
  const monthlyData = processBookingData(bookings);

  // Calculate totals
  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0);
  const commissionRate = 0.25;
  const commissionEarned = totalRevenue * commissionRate;
  const totalRides = bookings.length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="p-6 bg-white border rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                ${totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Commission Earned
              </p>
              <p className="text-2xl font-bold text-gray-900">
                ${commissionEarned.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Rides</p>
              <p className="text-2xl font-bold text-gray-900">
                {totalRides.toLocaleString()}
              </p>
              <p className="text-sm text-green-600">+15% from last month</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <svg
                className="w-6 h-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          </div>
        </div>

      
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Monthly Revenue Chart */}
        <div className="p-6 bg-white border rounded-lg shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">
            Monthly Revenue Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            {/* <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3B82F6"
                strokeWidth={3}
              />
            </LineChart> */}

            <BarChart data={monthlyData}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="month" />
  <YAxis yAxisId="left" />
  <Tooltip />
  <Bar yAxisId="left" dataKey="rides" fill="#10B981" name="Total Rides" />
</BarChart>
          </ResponsiveContainer>
          
        </div>

        {/* Revenue Breakdown */}
        <div className="p-6 bg-white border rounded-lg shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">
            Revenue Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={revenueBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {revenueBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {revenueBreakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full mr-2`}
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <span className="text-sm font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rides and Drivers Chart */}
      <div className="p-6 bg-white border rounded-lg shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">
          Rides & Active Drivers Growth
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Bar
              yAxisId="left"
              dataKey="rides"
              fill="#10B981"
              name="Total Rides"
            />
            <Bar
              yAxisId="right"
              dataKey="drivers"
              fill="#F59E0B"
              name="Active Drivers"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EarningOverview;
