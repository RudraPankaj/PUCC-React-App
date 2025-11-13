
import React from 'react';

function AnnouncementCardSkeleton() {
  return (
    <div className="rounded-lg shadow-lg p-4 relative group text-white bg-gray-300 animate-pulse">
      <div className="flex items-start gap-4">
        <div>
          <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
        </div>
        <div className="flex-1">
          <div className="h-4 bg-gray-400 rounded w-3/4"></div>
          <div className="h-3 bg-gray-400 rounded w-1/2 mt-2"></div>
        </div>
      </div>
    </div>
  );
}

export default AnnouncementCardSkeleton;
