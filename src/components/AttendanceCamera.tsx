import React from 'react';
import Webcam from 'react-webcam';
import { Camera, UserCheck } from 'lucide-react';

interface AttendanceCameraProps {
  onCapture: (imageSrc: string | null) => void;
}

export function AttendanceCamera({ onCapture }: AttendanceCameraProps) {
  const webcamRef = React.useRef<Webcam>(null);
  const [isCameraActive, setIsCameraActive] = React.useState(false);

  const handleStartCamera = () => {
    setIsCameraActive(true);
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    onCapture(imageSrc);
    setIsCameraActive(false);
  }, [onCapture]);

  if (!isCameraActive) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow">
        <Camera size={48} className="text-gray-400 mb-4" />
        <button
          onClick={handleStartCamera}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Start Camera
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="w-full rounded-lg"
      />
      <button
        onClick={capture}
        className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center gap-2"
      >
        <UserCheck size={20} />
        Take Attendance
      </button>
    </div>
  );
}