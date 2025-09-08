import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

interface ErrorDisplayProps {
  title?: string;
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ title = "An Error Occurred", message }) => {
  return (
    <div className="bg-coral-red/10 border-l-4 border-coral-red text-coral-red p-4 rounded-md" role="alert">
      <div className="flex">
        <div className="py-1">
          <ExclamationTriangleIcon className="h-6 w-6 text-coral-red mr-3" />
        </div>
        <div>
          <p className="font-bold">{title}</p>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;