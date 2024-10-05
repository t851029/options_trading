'use client';

import React from 'react';

interface ErrorDisplayProps {
  error: Error;
  onRetry: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onRetry }) => {
  return (
    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded flex justify-between items-center">
      <p>Error: {error.message}</p>
      <button
        onClick={onRetry}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Retry
      </button>
    </div>
  );
};

export default ErrorDisplay;