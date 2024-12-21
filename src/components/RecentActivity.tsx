import React from 'react';

interface ActivityItem {
  id: string;
  type: string;
  description: string;
  time: string;
}

const recentActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'attendance',
    description: 'John Doe marked attendance for Web Development',
    time: '10 minutes ago'
  },
  {
    id: '2',
    type: 'course',
    description: 'New course "Mobile App Development" added',
    time: '1 hour ago'
  },
  {
    id: '3',
    type: 'attendance',
    description: 'Sarah Smith marked attendance for Database Systems',
    time: '2 hours ago'
  }
];

export function RecentActivity() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {recentActivities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 py-3">
            <div className="flex-1">
              <p className="text-sm text-gray-800">{activity.description}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}