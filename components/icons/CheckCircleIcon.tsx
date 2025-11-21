import React from 'react';

const CheckCircleIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="white"/>
    <path d="M16.6666 8L9.99992 14.6667L7.33325 12" stroke="#1ED36A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default CheckCircleIcon;