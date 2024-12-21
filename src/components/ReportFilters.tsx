import React from 'react';
import { Search, Filter } from 'lucide-react';

interface ReportFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: ReportFilters) => void;
}

export interface ReportFilters {
  course: string;
  dateRange: string;
  department: string;
}

export function ReportFilters({ onSearch, onFilterChange }: ReportFiltersProps) {
  const [filters, setFilters] = React.useState<ReportFilters>({
    course: '',
    dateRange: '',
    department: ''
  });

  const handleFilterChange = (key: keyof ReportFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-4">
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name or ID..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button className="px-4 py-2 bg-white border rounded-md flex items-center gap-2 hover:bg-gray-50">
          <Filter size={20} />
          Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          value={filters.course}
          onChange={(e) => handleFilterChange('course', e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">All Courses</option>
          <option value="web-dev">Web Development</option>
          <option value="mobile-dev">Mobile Development</option>
          <option value="database">Database Systems</option>
        </select>

        <select
          value={filters.dateRange}
          onChange={(e) => handleFilterChange('dateRange', e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Date Range</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>

        <select
          value={filters.department}
          onChange={(e) => handleFilterChange('department', e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">All Departments</option>
          <option value="cs">Computer Science</option>
          <option value="it">Information Technology</option>
          <option value="se">Software Engineering</option>
        </select>
      </div>
    </div>
  );
}