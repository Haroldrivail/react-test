import React from 'react';

export function CardSkeleton() {
  return (
    <div className="max-w-sm w-full bg-gray-800 shadow-lg rounded-lg overflow-hidden mx-auto m-4 animate-pulse">
      <div className="w-full h-60 bg-gray-700"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-5/6"></div>
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 4 }) {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array(count).fill().map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
}

export default function SkeletonLoader({ type = 'grid', count = 4 }) {
  switch (type) {
    case 'card':
      return <CardSkeleton />;
    case 'grid':
    default:
      return <GridSkeleton count={count} />;
  }
}
