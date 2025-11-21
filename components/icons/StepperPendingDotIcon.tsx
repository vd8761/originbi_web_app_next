import React from 'react';

const StepperPendingDotIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        {/* Solid background to hide the line behind it */}
        <circle cx="20" cy="20" r="20" fill="#1A1D21"/>
        <circle cx="20" cy="20" r="20" fill="white" fillOpacity="0.12"/>
        <circle cx="20" cy="20" r="4" fill="#1ED36A"/>
    </svg>
);

export default StepperPendingDotIcon;