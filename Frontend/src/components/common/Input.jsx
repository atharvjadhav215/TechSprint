import React from 'react';
import { twMerge } from 'tailwind-merge';

export const Input = ({ label, error, className, id, ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">
          {label}
        </label>
      )}
      <input
        id={id}
        className={twMerge(
          "w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none",
          "bg-white/50 backdrop-blur-sm focus:bg-white",
          "border-gray-200 focus:border-[var(--color-agro-green)] focus:ring-4 focus:ring-green-500/10",
          error ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : "",
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500 ml-1">{error}</p>
      )}
    </div>
  );
};
