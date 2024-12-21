import React from 'react';
import { Check, X } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  studentId: string;
}

interface AttendanceFormProps {
  courseId: string;
  students: Student[];
  onSubmit: (data: { studentId: string; status: 'present' | 'absent' }[]) => void;
}

export function AttendanceForm({ courseId, students, onSubmit }: AttendanceFormProps) {
  const [attendance, setAttendance] = React.useState<Record<string, 'present' | 'absent'>>({});

  const handleStatusChange = (studentId: string, status: 'present' | 'absent') => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const attendanceData = Object.entries(attendance).map(([studentId, status]) => ({
      studentId,
      status
    }));
    onSubmit(attendanceData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {student.studentId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {student.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => handleStatusChange(student.id, 'present')}
                      className={`inline-flex items-center px-3 py-1 rounded-md text-sm ${
                        attendance[student.id] === 'present'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <Check size={16} className="mr-1" />
                      Present
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStatusChange(student.id, 'absent')}
                      className={`inline-flex items-center px-3 py-1 rounded-md text-sm ${
                        attendance[student.id] === 'absent'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <X size={16} className="mr-1" />
                      Absent
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Save Attendance
        </button>
      </div>
    </form>
  );
}