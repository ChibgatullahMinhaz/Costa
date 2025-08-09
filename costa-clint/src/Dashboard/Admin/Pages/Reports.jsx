import { useState, useEffect } from "react";
import dayjs from "dayjs";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from "recharts";
import axiosSecureInstance from "../../../Service/APIs/AxiosInstance";

export default function Reports() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("daily");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await axiosSecureInstance.get("all-bookings");
        setBookings(data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) {
    return <div className="p-6 text-gray-600">Loading reports...</div>;
  }

  if (!bookings.length) {
    return <div className="p-6 text-gray-600">No bookings found.</div>;
  }

  // Daily Reports (createdAt দিয়ে)
  const dailyReports = [];
  {
    const summary = {};
    bookings.forEach(b => {
      const date = dayjs(b.createdAt).format("MMM D");
      if (!summary[date]) summary[date] = { date, rides: 0, earnings: 0 };
      summary[date].rides += 1;
      summary[date].earnings += Number(b.totalPrice || 0);
    });
    for (const key in summary) dailyReports.push(summary[key]);
  }

  // Vehicle Usage
  const vehicleData = [];
  {
    const summary = {};
    bookings.forEach(b => {
      const type = b.vehicleType || b.selectedCar?.vehicleType || "Unknown";
      if (!summary[type]) summary[type] = 0;
      summary[type] += 1;
    });
    Object.entries(summary).forEach(([name, value], i) => {
      vehicleData.push({
        name,
        value,
        color: ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444"][i % 5]
      });
    });
  }

  // Transfer Type
  const transferData = [];
  {
    const summary = {};
    bookings.forEach(b => {
      const type = b.transferType || "Unknown";
      if (!summary[type]) summary[type] = 0;
      summary[type] += 1;
    });
    Object.entries(summary).forEach(([name, value], i) => {
      transferData.push({
        name,
        value,
        color: ["#6366f1", "#f97316", "#14b8a6"][i % 3]
      });
    });
  }

  // Hourly Analysis
  const hourlyData = [];
  {
    const summary = {};
    bookings.forEach(b => {
      const hour = dayjs(b.createdAt).format("hA");
      if (!summary[hour]) summary[hour] = 0;
      summary[hour] += 1;
    });
    Object.entries(summary).forEach(([hour, rides]) => {
      hourlyData.push({ hour, rides });
    });
  }

  // Booking Status
  const statusData = [];
  {
    const summary = {};
    bookings.forEach(b => {
      const status = b.bookingStatus || "Unknown";
      if (!summary[status]) summary[status] = 0;
      summary[status] += 1;
    });
    Object.entries(summary).forEach(([name, value], i) => {
      statusData.push({
        name,
        value,
        color: ["#22c55e", "#ef4444", "#eab308", "#6b7280"][i % 4]
      });
    });
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
        <p className="text-gray-600">Business performance and trend analysis</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <SummaryCard title="Total Rides" value={bookings.length} color="text-blue-600" />
        <SummaryCard title="Total Revenue" value={`$${bookings.reduce((sum, b) => sum + Number(b.totalPrice || 0), 0)}`} color="text-green-600" />
        <SummaryCard title="Vehicle Types" value={vehicleData.length} color="text-purple-600" />
        <SummaryCard title="Cancelled Rides" value={bookings.filter(b => b.bookingStatus === "Cancelled").length} color="text-orange-600" />
      </div>

      {/* Tabs */}
      <div className="inline-flex items-center justify-center h-10 p-1 text-gray-500 bg-gray-100 rounded-md">
        {["daily", "vehicle", "transfer", "hourly", "status"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 text-sm font-medium rounded-sm ${activeTab === tab ? "bg-white text-gray-900 shadow-sm" : "hover:bg-white hover:text-gray-900"}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} Reports
          </button>
        ))}
      </div>

      {/* Charts */}
      {activeTab === "daily" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ChartCard title="Daily Rides">
            <LineChart data={dailyReports}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="rides" stroke="#3b82f6" strokeWidth={3} />
            </LineChart>
          </ChartCard>

          <ChartCard title="Daily Earnings ($)">
            <BarChart data={dailyReports}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="earnings" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartCard>
        </div>
      )}

      {activeTab === "vehicle" && (
        <PieChartCard title="Vehicle Usage" data={vehicleData} />
      )}

      {activeTab === "transfer" && (
        <PieChartCard title="Transfer Type" data={transferData} />
      )}

      {activeTab === "hourly" && (
        <ChartCard title="Hourly Ride Distribution">
          <BarChart data={hourlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="rides" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartCard>
      )}

      {activeTab === "status" && (
        <PieChartCard title="Booking Status" data={statusData} />
      )}
    </div>
  );
}

function SummaryCard({ title, value, color }) {
  return (
    <div className="p-4 text-center bg-white border rounded-lg shadow-sm">
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="p-6 bg-white border rounded-lg shadow-sm">
      <h3 className="mb-4 text-2xl font-semibold">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        {children}
      </ResponsiveContainer>
    </div>
  );
}

function PieChartCard({ title, data }) {
  return (
    <div className="p-6 bg-white border rounded-lg shadow-sm">
      <h3 className="mb-4 text-2xl font-semibold">{title}</h3>
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
}
