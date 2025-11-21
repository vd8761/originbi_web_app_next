import React from 'react';

const StepperDownArrowIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <circle cx="20" cy="20" r="19.5" fill="#1ED36A" fillOpacity="0.2" stroke="#1ED36A"/>
        <path d="M13.1464 16.8014C12.9512 16.6181 12.9512 16.3209 13.1464 16.1377C13.3415 15.9544 13.6579 15.9544 13.853 16.1377L19.9999 21.9109L26.147 16.1375C26.3421 15.9542 26.6585 15.9542 26.8536 16.1375C27.0488 16.3207 27.0488 16.6179 26.8536 16.8012L20.4002 22.8623C20.291 22.9649 20.1438 23.0101 20.0011 22.9978C19.8577 23.0108 19.7096 22.9657 19.5998 22.8625L13.1464 16.8014Z" fill="white"/>
    </svg>
);

export default StepperDownArrowIcon;