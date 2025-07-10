import React from "react";
import {
  User,
  Car,
  DollarSign,
  Clock,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";
import axiosSecurePublic from "../../../../Service/APIs/AxiosPublic";

const iconMap = {
  user_Registration: User,
  trip_completed: Car,
  payment_received: DollarSign,
  driver_status: Clock,
  warning: AlertCircle,
  verified: ShieldCheck,
};

const RecentActivity = () => {
  const {
    data: logs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["logs"],
    queryFn: async () => {
      const res = await axiosSecurePublic.get("api/activity");
      return res.data?.logs || [];
    },
  });

  return (
    <div className="rounded-2xl border bg-white shadow-sm p-6 w-full">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Recent Activity
        </h2>
        <p className="text-sm text-gray-500">Latest updates from the system</p>
      </div>

      {isLoading && <p className="text-sm text-gray-500">Loading...</p>}
      {isError && (
        <p className="text-sm text-red-500">Failed to load activity logs.</p>
      )}

      <div className="space-y-4">
        {logs.map((log) => {
          const Icon = iconMap[log.action] || AlertCircle;

          return (
            <div
              key={log._id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800">
                  {log.description}
                </p>
                <p className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(log.timestamp), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          );
        })}
        {logs.length === 0 && !isLoading && (
          <p className="text-sm text-gray-400 text-center">
            No recent activity
          </p>
        )}
      </div>
    </div>
  );
};
export default RecentActivity;
