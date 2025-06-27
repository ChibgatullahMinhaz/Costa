// components/admin/PushNotifications.jsx

import React, { useState } from "react";

export default function PushNotifications() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [targetGroup, setTargetGroup] = useState("clients");

  const handleSend = () => {
    if (!title || !message) {
      alert("Please fill in all fields.");
      return;
    }

    // Replace this with API call to notification service
    console.log("Sending Notification:", { title, message, targetGroup });
    alert("Notification sent successfully!");
    setTitle("");
    setMessage("");
    setTargetGroup("clients");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Push Notifications</h2>

      <div className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          placeholder="Notification Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full p-2 border rounded h-28"
          placeholder="Notification Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <select
          className="w-full p-2 border rounded"
          value={targetGroup}
          onChange={(e) => setTargetGroup(e.target.value)}
        >
          <option value="clients">Send to Clients</option>
          <option value="drivers">Send to Drivers</option>
          <option value="all">Send to All Users</option>
        </select>

        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          onClick={handleSend}
        >
          Send Notification
        </button>
      </div>
    </div>
  );
}
