import React from 'react';

const StepperUpArrowIcon: React.FC<{ className?: string }> = ({ className = 'w-[14px] h-[7px]' }) => (
    <svg width="14" height="7" viewBox="0 0 14 7" fill="none" xmlns="http://www.w3.org/2000/svg" className="currentColor">
        <path d="M13.8536 6.19862C14.0488 6.38191 14.0488 6.67906 13.8536 6.86235C13.6585 7.04562 13.3421 7.04562 13.147 6.86235L7.0001 1.0891L0.853024 6.86254C0.657895 7.04582 0.341506 7.04582 0.14636 6.86254C-0.0487865 6.67925 -0.0487864 6.38209 0.14636 6.19882L6.59978 0.137662C6.70901 0.0350685 6.85622 -0.0100959 6.9989 0.00215335C7.14226 -0.0107529 7.29042 0.0343487 7.40022 0.137458L13.8536 6.19862Z" fill="currentColor"/>
    </svg>
);

export default StepperUpArrowIcon;