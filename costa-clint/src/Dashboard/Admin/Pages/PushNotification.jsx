import React, { useState } from "react";
import { Bell } from "lucide-react";
import Swal from "sweetalert2";
import instance from "../../../Service/APIs/AxiosSecure";

export default function PushNotifications() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [targetGroup, setTargetGroup] = useState("clients");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!title || !message) {
      return Swal.fire({
        icon: "warning",
        title: "Incomplete!",
        text: "Please fill in all fields.",
      });
    }

    setLoading(true);
    try {
      // Step 1: Get tokens
      const { data: tokenData } = await instance.get(
        `api/users/fcm-tokens?group=${targetGroup}`
      );

      if (!tokenData.tokens || tokenData.tokens.length === 0) {
        setLoading(false);
        return Swal.fire({
          icon: "info",
          title: "No Users Found",
          text: "No users found for the selected group.",
        });
      }

      // Step 2: Send notification
      const { data: sendData } = await instance.post("api/notifications/send", {
        tokens: tokenData.tokens,
        title,
        message,
      });

      Swal.fire({
        icon: "success",
        title: "Notification Sent",
        html: `✅ Success: ${sendData.successCount} <br> ❌ Failed: ${sendData.failureCount}`,
      });

      setTitle("");
      setMessage("");
      setTargetGroup("clients");
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed to Send",
        text: "Something went wrong. Please try again.",
      });
    }

    setLoading(false);
  };

  return (
    <div className="max-w-5xl p-6 mx-auto bg-white rounded shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="flex items-center gap-2 text-2xl font-semibold">
          <Bell className="text-indigo-600" /> Admin Notifications
        </h2>
      </div>

      <div className="grid gap-4 mb-6 md:grid-cols-3">
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
          disabled={loading}
          className="px-4 py-2 text-white bg-indigo-600 rounded col-span-full hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Notification"}
        </button>
      </div>
    </div>
  );
}
