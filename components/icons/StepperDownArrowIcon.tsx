import React from 'react';

const StepperDownArrowIcon: React.FC<{ className?: string }> = ({ className = 'w-[14px] h-[8px]' }) => (
    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" className='currentColor'>
         <path d="M0.146356 0.91586C-0.0487853 0.706391 -0.0487852 0.366783 0.146356 0.157315C0.341502 -0.0521355 0.657891 -0.0521355 0.85302 0.157315L6.9999 6.75532L13.147 0.157101C13.3421 -0.0523671 13.6585 -0.052367 13.8536 0.157101C14.0488 0.36657 14.0488 0.706178 13.8536 0.915628L7.40022 7.84267C7.29099 7.95992 7.14378 8.01154 7.0011 7.99754C6.85774 8.01229 6.70958 7.96074 6.59978 7.8429L0.146356 0.91586Z" fill="currentColor"/>
    </svg>
);

export default StepperDownArrowIcon;