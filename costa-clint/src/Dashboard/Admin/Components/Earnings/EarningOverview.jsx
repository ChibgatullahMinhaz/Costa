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
import dayjs from "dayjs";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#8B5CF6",
  "#EF4444",
  "#6366F1",
  "#F97316",
  "#14B8A6",
];

// Fetch bookings API call
const fetchBookings = async () => {
  const { data } = await axiosSecureInstance.get("all-bookings");
  return data;
};

// Utility to group data by day (last 30 days)
const getDailySummary = (bookings) => {
  const summary = {};

  const today = dayjs();
  const last30Days = Array.from({ length: 30 }).map((_, i) =>
    today.subtract(29 - i, "day").format("YYYY-MM-DD")
  );

  last30Days.forEach((date) => {
    summary[date] = { date, revenue: 0, rides: 0 };
  });

  bookings.forEach(({ totalPrice, createdAt }) => {
    const day = dayjs(createdAt).format("YYYY-MM-DD");
    if (summary[day]) {
      summary[day].revenue += Number(totalPrice || 0);
      summary[day].rides += 1;
    }
  });

  return Object.values(summary);
};

// Utility to group data by month (last 12 months)
const getMonthlySummary = (bookings) => {
  const summary = {};
  const today = dayjs();
  const last12Months = Array.from({ length: 12 }).map((_, i) =>
    today.subtract(11 - i, "month").format("YYYY-MM")
  );

  last12Months.forEach((month) => {
    summary[month] = { month, revenue: 0, rides: 0 };
  });

  bookings.forEach(({ totalPrice, createdAt }) => {
    const month = dayjs(createdAt).format("YYYY-MM");
    if (summary[month]) {
      summary[month].revenue += Number(totalPrice || 0);
      summary[month].rides += 1;
    }
  });

  return Object.values(summary).map(({ month, revenue, rides }) => ({
    month: dayjs(month).format("MMM YYYY"),
    revenue,
    rides,
  }));
};

// Utility to group data by year
const getYearlySummary = (bookings) => {
  const summary = {};

  bookings.forEach(({ totalPrice, createdAt }) => {
    const year = dayjs(createdAt).format("YYYY");
    if (!summary[year]) {
      summary[year] = { year, revenue: 0, rides: 0 };
    }
    summary[year].revenue += Number(totalPrice || 0);
    summary[year].rides += 1;
  });

  return Object.entries(summary)
    .sort(([a], [b]) => b.localeCompare(a)) // latest year first
    .map(([year, data]) => ({
      year,
      revenue: data.revenue,
      rides: data.rides,
    }));
};

// Pie chart data by vehicle type
const getVehicleTypeData = (bookings) => {
  const summary = {};
  bookings.forEach((b) => {
    const type = b.vehicleType || b.selectedCar?.vehicleType || "Unknown";
    summary[type] = (summary[type] || 0) + 1;
  });

  return Object.entries(summary).map(([name, value], i) => ({
    name,
    value,
    color: COLORS[i % COLORS.length],
  }));
};

// Pie chart data by transfer type
const getTransferTypeData = (bookings) => {
  const summary = {};
  bookings.forEach((b) => {
    const type = b.transferType || "Unknown";
    summary[type] = (summary[type] || 0) + 1;
  });

  return Object.entries(summary).map(([name, value], i) => ({
    name,
    value,
    color: COLORS[i % COLORS.length],
  }));
};

// Pie chart data by booking status
const getStatusData = (bookings) => {
  const summary = {};
  bookings.forEach((b) => {
    const status = b.bookingStatus || "Unknown";
    summary[status] = (summary[status] || 0) + 1;
  });

  return Object.entries(summary).map(([name, value], i) => ({
    name,
    value,
    color: COLORS[i % COLORS.length],
  }));
};

// Pie chart data by payment method
const getPaymentMethodData = (bookings) => {
  const summary = {};
  bookings.forEach((b) => {
    const method = b.paymentMethod || "Unknown";
    summary[method] = (summary[method] || 0) + 1;
  });

  return Object.entries(summary).map(([name, value], i) => ({
    name,
    value,
    color: COLORS[i % COLORS.length],
  }));
};

const SummaryCard = ({ title, value, color }) => (
  <div className="p-6 text-center bg-white border rounded-lg shadow-sm">
    <p className={`text-2xl font-bold ${color}`}>{value}</p>
    <p className="mt-1 text-sm text-gray-600">{title}</p>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="p-6 bg-white border rounded-lg shadow-sm">
    <h3 className="mb-4 text-lg font-semibold text-gray-800">{title}</h3>
    <ResponsiveContainer width="100%" height={300}>
      {children}
    </ResponsiveContainer>
  </div>
);

const PieChartCard = ({ title, data }) => (
  <div className="p-6 bg-white border rounded-lg shadow-sm">
    <h3 className="mb-4 text-lg font-semibold text-gray-800">{title}</h3>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, i) => (
            <Cell key={`cell-${i}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

const EarningOverview = () => {
  const { data: bookings = [], isLoading, isError } = useQuery({
    queryKey: ["bookings-overview"],
    queryFn: fetchBookings,
  });

  if (isLoading) return <div className="p-6">Loading bookings...</div>;
  if (isError)
    return <div className="p-6 text-red-500">Failed to load bookings.</div>;

  // Summary calculations
  const totalRevenue = bookings.reduce(
    (sum, b) => sum + Number(b.totalPrice || 0),
    0
  );
  const totalRides = bookings.length;
  const avgRevenuePerRide =
    totalRides === 0 ? 0 : (totalRevenue / totalRides).toFixed(2);

  // Highest earning day
  const revenueByDay = {};
  bookings.forEach(({ totalPrice, createdAt }) => {
    const day = dayjs(createdAt).format("YYYY-MM-DD");
    revenueByDay[day] = (revenueByDay[day] || 0) + Number(totalPrice || 0);
  });
  const highestDay = Object.entries(revenueByDay).reduce(
    (max, curr) => (curr[1] > max[1] ? curr : max),
    ["N/A", 0]
  );

  // Data for charts
  const dailyData = getDailySummary(bookings);
  const monthlyData = getMonthlySummary(bookings);
  const yearlyData = getYearlySummary(bookings);
  const vehicleTypeData = getVehicleTypeData(bookings);
  const transferTypeData = getTransferTypeData(bookings);
  const statusData = getStatusData(bookings);
  const paymentMethodData = getPaymentMethodData(bookings);

  return (
    <div className="p-6 space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <SummaryCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          color="text-blue-600"
        />
        <SummaryCard
          title="Total Rides"
          value={totalRides.toLocaleString()}
          color="text-green-600"
        />
        <SummaryCard
          title="Avg Revenue per Ride"
          value={`$${avgRevenuePerRide}`}
          color="text-purple-600"
        />
        <SummaryCard
          title="Highest Earning Day"
          value={`${dayjs(highestDay[0]).format("MMM D, YYYY")} ($${highestDay[1].toFixed(2)})`}
          color="text-yellow-600"
        />
      </div>

      {/* Daily Revenue Chart (Last 30 days) */}
      <ChartCard title="Daily Revenue (Last 30 days)">
        <LineChart data={dailyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={(d) => dayjs(d).format("MMM D")} />
          <YAxis />
          <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, "Revenue"]} />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#3B82F6"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ChartCard>

      {/* Monthly Revenue Chart */}
      <ChartCard title="Monthly Revenue (Last 12 months)">
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, "Revenue"]} />
          <Bar dataKey="revenue" fill="#10B981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ChartCard>

      {/* Yearly Revenue Chart */}
      <ChartCard title="Yearly Revenue">
        <BarChart data={yearlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, "Revenue"]} />
          <Bar dataKey="revenue" fill="#F59E0B" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ChartCard>

      {/* Pie Charts Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <PieChartCard title="Bookings by Vehicle Type" data={vehicleTypeData} />
        <PieChartCard title="Bookings by Transfer Type" data={transferTypeData} />
        <PieChartCard title="Bookings by Status" data={statusData} />
        <PieChartCard title="Bookings by Payment Method" data={paymentMethodData} />
      </div>
    </div>
  );
};

export default EarningOverview;
