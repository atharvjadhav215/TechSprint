import React from 'react';
import { twMerge } from 'tailwind-merge';

export const Skeleton = ({ className, height, width, circle = false }) => {
  return (
    <div
      className={twMerge(
        "animate-pulse bg-gray-300 dark:bg-gray-700/50",
        circle ? "rounded-full" : "rounded-md",
        className
      )}
      style={{
        height: height,
        width: width
      }}
    />
  );
};

export const SkeletonCard = () => (
  <div className="p-4 border border-gray-200 rounded-xl shadow-sm bg-white dark:bg-gray-800">
    <Skeleton height="150px" className="mb-4 rounded-lg" />
    <Skeleton height="24px" width="70%" className="mb-2" />
    <Skeleton height="16px" width="40%" />
  </div>
);
