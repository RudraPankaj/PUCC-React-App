import React from 'react';

export default function EventCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="relative mb-3">
        <div className="w-full h-46 bg-gray-300 rounded-md animate-pulse"></div>
      </div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2 animate-pulse"></div>
      <div className="h-3 bg-gray-300 rounded w-1/2 mb-2 animate-pulse"></div>
      <div className="h-3 bg-gray-300 rounded w-1/2 mb-2 animate-pulse"></div>
      <div className="h-3 bg-gray-300 rounded w-1/2 mb-4 animate-pulse"></div>
      <div className="h-8 bg-gray-300 rounded w-full animate-pulse"></div>
    </div>
  );
}
