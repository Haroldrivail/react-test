import React from 'react';

export default function LoadingIndicator() {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
      <p className="mt-4 text-indigo-400 font-semibold">Loading...</p>
    </div>
  );
}
