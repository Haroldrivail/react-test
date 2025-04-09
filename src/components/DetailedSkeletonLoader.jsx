import React from 'react';

export function IngredientDetailSkeleton() {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg p-6 max-w-4xl mx-auto animate-pulse">
      <div className="md:flex items-center">
        <div className="md:w-1/3">
          <div className="w-full h-64 bg-gray-700 rounded"></div>
        </div>
        <div className="md:w-2/3 md:pl-6 mt-4 md:mt-0">
          <div className="h-8 bg-gray-700 rounded w-1/2 mb-4"></div>
          <div className="mt-3 space-y-3">
            <div className="h-4 bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-700 rounded w-4/5"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CategoryDetailSkeleton() {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg animate-pulse">
      <div className="w-full h-48 bg-gray-700"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-700 rounded w-1/3 mb-3"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-gray-700 rounded w-4/5"></div>
        </div>
      </div>
    </div>
  );
}

export default function DetailedSkeletonLoader({ type = 'ingredient' }) {
  switch (type) {
    case 'ingredient':
      return <IngredientDetailSkeleton />;
    case 'category':
      return <CategoryDetailSkeleton />;
    default:
      return <IngredientDetailSkeleton />;
  }
}
