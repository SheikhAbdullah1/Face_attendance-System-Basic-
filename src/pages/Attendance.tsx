import React from 'react';
import { AttendanceCamera } from '../components/AttendanceCamera';
import { AttendanceForm } from '../components/AttendanceForm';

// Mock data - replace with actual data from your Supabase database
const mockStudents = [
  { id: '1', name: 'John Doe', studentId: 'STU001' },
  { id: '2', name: 'Jane Smith', studentId: 'STU002' },
  { id: '3', name: 'Mike Johnson', studentId: 'STU003' },
];

export function Attendance() {
  const [selectedCourse, setSelectedCourse] = React.useState('');
  const [attendanceMode, setAttendanceMode] = React.useState<'manual' | 'facial'>('manual');

  const handleImageCapture = async (imageSrc: string | null) => {
    if (!imageSrc) return;
    
    // TODO: Implement facial recognition logic here
    console.log('Processing facial recognition...');
  };

  const handleAttendanceSubmit = async (data: { studentId: string; status: 'present' | 'absent' }[]) => {
    // TODO: Submit attendance data to Supabase
    console.log('Submitting attendance:', data);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Take Attendance</h1>
        <div className="flex items-center space-x-4">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select Course</option>
            <option value="course1">Web Development</option>
            <option value="course2">Mobile App Development</option>
            <option value="course3">Database Systems</option>
          </select>
          <div className="flex rounded-md shadow-sm">
            <button
              onClick={() => setAttendanceMode('manual')}
              className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                attendanceMode === 'manual'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:text-gray-900'
              }`}
            >
              Manual
            </button>
            <button
              onClick={() => setAttendanceMode('facial')}
              className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                attendanceMode === 'facial'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:text-gray-900'
              }`}
            >
              Facial Recognition
            </button>
          </div>
        </div>
      </div>

      {selectedCourse && (
        <div className="bg-white rounded-lg shadow p-6">
          {attendanceMode === 'facial' ? (
            <AttendanceCamera onCapture={handleImageCapture} />
          ) : (
            <AttendanceForm
              courseId={selectedCourse}
              students={mockStudents}
              onSubmit={handleAttendanceSubmit}
            />
          )}
        </div>
      )}
    </div>
  );
}