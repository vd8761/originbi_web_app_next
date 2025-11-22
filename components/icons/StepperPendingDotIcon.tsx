import React from 'react';

const StepperPendingDotIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        {/* Solid background to hide the line behind it. Adapts to theme background. */}
        <circle cx="20" cy="20" r="20" className="fill-brand-light-primary dark:fill-[#1A1D21]"/>
        
        {/* Outer Ring with opacity */}
        <circle cx="20" cy="20" r="20" className="fill-brand-text-light-primary/10 dark:fill-white/10"/>
        
        {/* Center Dot */}
        <circle cx="20" cy="20" r="4" fill="#1ED36A"/>
    </svg>
);

export default StepperPendingDotIcon;