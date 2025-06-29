// components/admin/PushNotifications.jsx

import React, { useState } from "react";
import { Bell, Trash2 } from "lucide-react"; // For icons (install lucide-react or use your own)

const dummySystemNotifications = [
  {
    id: 1,
    title: "New Booking",
    message: "Booking #1234 has been created by John Doe.",
    type: "system",
    targetGroup: "admin",
    date: "2025-06-29 10:32 AM",
    read: false,
  },
  {
    id: 2,
    title: "Payment Received",
    message: "Payment of $80.00 received from client Ana.",
    type: "system",
    targetGroup: "admin",
    date: "2025-06-28 04:15 PM",
    read: false,
  },
  {
    id: 3,
    title: "Driver Cancelled",
    message: "Driver Alex cancelled booking #1229.",
    type: "system",
    targetGroup: "admin",
    date: "2025-06-27 01:50 PM",
    read: true,
  },
];

export default function PushNotifications() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [targetGroup, setTargetGroup] = useState("clients");
  const [notifications, setNotifications] = useState(dummySystemNotifications);
  const [filter, setFilter] = useState("all");

  const handleSend = () => {
    if (!title || !message) {
      alert("Please fill in all fields.");
      return;
    }

    const newNotification = {
      id: Date.now(),
      title,
      message,
      type: "manual",
      targetGroup,
      date: new Date().toLocaleString(),
      read: false,
    };

    setNotifications([newNotification, ...notifications]);
    alert("Notification sent successfully!");

    setTitle("");
    setMessage("");
    setTargetGroup("clients");
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearNotifications = () => {
    if (window.confirm("Are you sure you want to clear all notifications?")) {
      setNotifications([]);
    }
  };

  const filteredNotifications =
    filter === "all"
      ? notifications
      : notifications.filter((n) => n.targetGroup === filter);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Bell className="text-indigo-600" /> Admin Notifications
        </h2>
        <button
          onClick={clearNotifications}
          className="flex items-center gap-1 text-sm text-red-500 hover:underline"
        >
          <Trash2 size={16} /> Clear All
        </button>
      </div>

      {/* Notification Form */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <input
          className="p-2 border border-gray-300 rounded"
          placeholder="Notification Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="p-2 border border-gray-300 rounded"
          placeholder="Notification Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <select
          className="p-2 border border-gray-300 rounded"
          value={targetGroup}
          onChange={(e) => setTargetGroup(e.target.value)}
        >
          <option value="clients">Send to Clients</option>
          <option value="drivers">Send to Drivers</option>
          <option value="all">Send to All Users</option>
        </select>
        <button
          onClick={handleSend}
          className="col-span-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Send Notification
        </button>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-3 mb-4">
        <span className="font-medium">Filter:</span>
        {["all", "clients", "drivers", "admin"].map((g) => (
          <button
            key={g}
            onClick={() => setFilter(g)}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === g
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {g.charAt(0).toUpperCase() + g.slice(1)}
          </button>
        ))}
      </div>

      {/* Notification List */}
      {filteredNotifications.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No notifications found.</p>
      ) : (
        <ul className="space-y-4">
          {filteredNotifications.map((n) => (
            <li
              key={n.id}
              className={`p-4 border rounded shadow-sm ${
                n.read ? "bg-gray-100" : "bg-yellow-50"
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-semibold text-gray-800">{n.title}</h4>
                <span className="text-sm text-gray-500">{n.date}</span>
              </div>
              <p className="text-gray-700 mb-2">{n.message}</p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 capitalize">
                  Type: {n.type} | To: {n.targetGroup}
                </span>
                {!n.read && (
                  <button
                    onClick={() => markAsRead(n.id)}
                    className="text-blue-600 hover:underline"
                  >
                    Mark as Read
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
