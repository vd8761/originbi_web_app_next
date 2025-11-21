import React from 'react';

const StepperUpArrowIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <circle cx="20" cy="20" r="19.5" fill="#1ED36A" fillOpacity="0.2" stroke="#1ED36A"/>
        <path d="M26.8536 22.1986C27.0488 22.3819 27.0488 22.6791 26.8536 22.8623C26.6585 23.0456 26.3421 23.0456 26.147 22.8623L20.0001 17.0891L13.853 22.8625C13.6579 23.0458 13.3415 23.0458 13.1464 22.8625C12.9512 22.6793 12.9512 22.3821 13.1464 22.1988L19.5998 16.1377C19.709 16.0351 19.8562 15.9899 19.9989 16.0022C20.1423 15.9892 20.2904 16.0343 20.4002 16.1375L26.8536 22.1986Z" fill="white"/>
    </svg>
);

export default StepperUpArrowIcon;