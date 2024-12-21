import React from 'react';
import { ReportFilters, type ReportFilters as FilterType } from '../components/ReportFilters';
import { AttendanceReport } from '../components/AttendanceReport';

export function Reports() {
  const handleSearch = (query: string) => {
    console.log('Searching:', query);
  };

  const handleFilterChange = (filters: FilterType) => {
    console.log('Filters changed:', filters);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
      </div>

      <ReportFilters onSearch={handleSearch} onFilterChange={handleFilterChange} />
      
      <AttendanceReport />
    </div>
  );
}