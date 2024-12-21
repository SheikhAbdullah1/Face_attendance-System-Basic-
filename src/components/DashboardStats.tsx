import React from 'react';
import { Users, GraduationCap, BookOpen, Clock } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-semibold mt-2">{value}</p>
        </div>
        <div className="text-indigo-600">{icon}</div>
      </div>
    </div>
  );
}

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Total Students"
        value={150}
        icon={<Users size={24} />}
      />
      <StatsCard
        title="Total Teachers"
        value={12}
        icon={<GraduationCap size={24} />}
      />
      <StatsCard
        title="Active Courses"
        value={24}
        icon={<BookOpen size={24} />}
      />
      <StatsCard
        title="Today's Attendance"
        value={85}
        icon={<Clock size={24} />}
      />
    </div>
  );
}