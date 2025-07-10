import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Fetch user analytics
const fetchUserAnalytics = async () => {
  const { data } = await axios.get("/api/admin/user-analytics");
  return data;
};

const UserAnalytics = () => {
  const {
    data: stats,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["userAnalytics"],
    queryFn: fetchUserAnalytics,
    refetchInterval: 5 * 60 * 1000, // every 5 minutes
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-red-600">
        Failed to load analytics: {error.message}
        <button onClick={() => refetch()} className="ml-4 text-blue-600 underline">
          Retry
        </button>
      </div>
    );
  }

  const barData = {
    labels: stats.monthlyGrowth.map((m) => m.month),
    datasets: [
      {
        label: "New Users",
        data: stats.monthlyGrowth.map((m) => m.count),
        backgroundColor: "#3b82f6",
      },
    ],
  };

  const pieData = {
    labels: Object.keys(stats.userByRole),
    datasets: [
      {
        data: Object.values(stats.userByRole),
        backgroundColor: ["#60a5fa", "#34d399", "#f87171"],
      },
    ],
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 p-6">
      <div className="bg-white rounded-xl p-4 shadow">
        <h2 className="text-xl font-bold mb-4">User Summary</h2>
        <ul className="space-y-2 text-sm">
          <li>Total Users: {stats.totalUsers}</li>
          <li>New This Week: {stats.newThisWeek}</li>
          <li>Active (7 days): {stats.activeUsers}</li>
          <li>Banned: {stats.bannedUsers}</li>
        </ul>
      </div>

      <div className="bg-white rounded-xl p-4 shadow">
        <h2 className="text-xl font-bold mb-4">Users By Role</h2>
        <Pie data={pieData} />
      </div>

      <div className="bg-white rounded-xl p-4 shadow col-span-2">
        <h2 className="text-xl font-bold mb-4">Monthly User Growth</h2>
        <Bar data={barData} />
      </div>
    </div>
  );
};

export default UserAnalytics;
