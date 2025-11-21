import React from 'react';

// Completed SVG Icon
export const CompletedStepIcon: React.FC = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 sm:w-10 sm:h-10">
    <path d="M20 0C8.97243 0 0 8.97243 0 20C0 31.0276 8.97243 40 20 40C31.0276 40 40 31.0276 40 20C40 8.97243 31.0276 0 20 0ZM31.1779 14.7368L18.396 27.4185C17.6441 28.1704 16.4411 28.2206 15.6391 27.4687L8.87218 21.3033C8.07018 20.5514 8.02005 19.2982 8.72181 18.4962C9.47369 17.6942 10.7268 17.6441 11.5288 18.396L16.8922 23.3083L28.3208 11.8797C29.1228 11.0777 30.3759 11.0777 31.1779 11.8797C31.98 12.6817 31.98 13.9348 31.1779 14.7368Z" fill="#1ED36A"/>
  </svg>
);

// Inprogress SVG Icon
export const CurrentStepIcon: React.FC = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 sm:w-10 sm:h-10">
    <circle cx="20" cy="20" r="20" fill="white" fillOpacity="0.12" className="fill-brand-light-tertiary dark:fill-white/10"/>
    <circle cx="20" cy="20" r="4" fill="#1ED36A"/>
  </svg>
);

// Not Started SVG Icon
export const PendingStepIcon: React.FC = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 sm:w-10 sm:h-10">
    <circle cx="20" cy="20" r="20" fill="white" fillOpacity="0.12" className="fill-brand-light-tertiary dark:fill-white/10"/>
  </svg>
);