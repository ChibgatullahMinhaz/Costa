import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { useState } from "react";

const dailyReports = [
  { date: "Jun 1", rides: 45, earnings: 2400, drivers: 23 },
  { date: "Jun 2", rides: 52, earnings: 2800, drivers: 25 },
  { date: "Jun 3", rides: 48, earnings: 2600, drivers: 22 },
  { date: "Jun 4", rides: 61, earnings: 3200, drivers: 28 },
  { date: "Jun 5", rides: 55, earnings: 2900, drivers: 26 },
  { date: "Jun 6", rides: 67, earnings: 3600, drivers: 30 },
  { date: "Jun 7", rides: 43, earnings: 2300, drivers: 21 },
];

const vehicleData = [
  { name: "Sedan", value: 45, color: "#3b82f6" },
  { name: "SUV", value: 25, color: "#10b981" },
  { name: "Hatchback", value: 20, color: "#f59e0b" },
  { name: "Luxury", value: 10, color: "#8b5cf6" },
];

const hourlyData = [
  { hour: "6AM", rides: 12 },
  { hour: "8AM", rides: 34 },
  { hour: "10AM", rides: 28 },
  { hour: "12PM", rides: 42 },
  { hour: "2PM", rides: 38 },
  { hour: "4PM", rides: 45 },
  { hour: "6PM", rides: 56 },
  { hour: "8PM", rides: 43 },
  { hour: "10PM", rides: 25 },
];

export default function Reports() {
  const [activeTab, setActiveTab] = useState("daily");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
        <p className="text-gray-600">Business performance and trend analysis</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border shadow-sm">
          <div className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">385</p>
              <p className="text-sm text-gray-600">This Week's Rides</p>
              <p className="text-xs text-green-600">+12% increase</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border shadow-sm">
          <div className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">$19,800</p>
              <p className="text-sm text-gray-600">This Week's Revenue</p>
              <p className="text-xs text-green-600">+18% increase</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border shadow-sm">
          <div className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">195</p>
              <p className="text-sm text-gray-600">Active Drivers</p>
              <p className="text-xs text-green-600">+5% increase</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border shadow-sm">
          <div className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">4.7</p>
              <p className="text-sm text-gray-600">Average Rating</p>
              <p className="text-xs text-green-600">+0.2 increase</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500">
          <button 
            onClick={() => setActiveTab("daily")}
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
              activeTab === "daily" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:bg-white hover:text-gray-900"
            }`}
          >
            Daily Reports
          </button>
          <button 
            onClick={() => setActiveTab("vehicle")}
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
              activeTab === "vehicle" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:bg-white hover:text-gray-900"
            }`}
          >
            Vehicle Usage
          </button>
          <button 
            onClick={() => setActiveTab("hourly")}
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
              activeTab === "hourly" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:bg-white hover:text-gray-900"
            }`}
          >
            Hourly Analysis
          </button>
        </div>

        <div className="space-y-6">
          {activeTab === "daily" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border shadow-sm">
                <div className="flex flex-col space-y-1.5 p-6">
                  <h3 className="text-2xl font-semibold leading-none tracking-tight">Daily Rides</h3>
                </div>
                <div className="p-6 pt-0">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dailyReports}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="rides" stroke="#3b82f6" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-lg border shadow-sm">
                <div className="flex flex-col space-y-1.5 p-6">
                  <h3 className="text-2xl font-semibold leading-none tracking-tight">Daily Earnings ($)</h3>
                </div>
                <div className="p-6 pt-0">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dailyReports}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="earnings" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === "vehicle" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border shadow-sm">
                <div className="flex flex-col space-y-1.5 p-6">
                  <h3 className="text-2xl font-semibold leading-none tracking-tight">Vehicle Distribution</h3>
                </div>
                <div className="p-6 pt-0">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={vehicleData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {vehicleData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === "hourly" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border shadow-sm">
                <div className="flex flex-col space-y-1.5 p-6">
                  <h3 className="text-2xl font-semibold leading-none tracking-tight">Hourly Ride Distribution</h3>
                </div>
                <div className="p-6 pt-0">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={hourlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="rides" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}