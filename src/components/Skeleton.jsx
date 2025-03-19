import React from 'react';

const Skeleton = () => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 animate-pulse">
      <div className="h-56 w-full bg-gray-300 rounded-lg dark:bg-gray-600"></div>
      <div className="pt-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <span className="h-6 w-20 bg-gray-300 rounded-md dark:bg-gray-600"></span>
          <div className="flex items-center justify-end gap-1">
            <div className="h-8 w-8 bg-gray-300 rounded-lg dark:bg-gray-600"></div>
            <div className="h-8 w-8 bg-gray-300 rounded-lg dark:bg-gray-600"></div>
          </div>
        </div>
        <div className="h-6 w-3/4 bg-gray-300 rounded-md dark:bg-gray-600"></div>
        <div className="mt-2 h-4 w-1/2 bg-gray-300 rounded-md dark:bg-gray-600"></div>
        <ul className="mt-2 flex items-center gap-4">
          <li className="h-4 w-1/4 bg-gray-300 rounded-md dark:bg-gray-600"></li>
        </ul>
      </div>
    </div>
  );
};

export default Skeleton;