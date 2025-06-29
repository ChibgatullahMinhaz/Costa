import React from 'react';
import { User, Car, DollarSign, Clock } from 'lucide-react';

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: 'user',
      description: 'New user John Doe registered',
      time: '2 minutes ago',
      icon: User
    },
    {
      id: 2,
      type: 'trip',
      description: 'Trip completed by Ahmed Hassan',
      time: '15 minutes ago',
      icon: Car
    },
    {
      id: 3,
      type: 'payment',
      description: 'Payment of ৳500 received',
      time: '1 hour ago',
      icon: DollarSign
    },
    {
      id: 4,
      type: 'driver',
      description: 'Driver Mahmud Rahman went offline',
      time: '2 hours ago',
      icon: Clock
    }
  ];

  return (
    <div className="rounded-lg border bg-white text-gray-900 shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">Recent Activity</h3>
      </div>
      <div className="p-6 pt-0">
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Icon className="w-4 h-4 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.description}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
