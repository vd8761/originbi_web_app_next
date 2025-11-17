import React from 'react';

const RightArrowIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 28 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M10.9609 9.07299C10.9609 8.62817 11.3215 8.26753 11.7664 8.26754L19.74 8.26755C20.1848 8.26755 20.5454 8.62818 20.5454 9.073L20.5454 17.0466C20.5454 17.4914 20.1848 17.852 19.74 17.852C19.2951 17.852 18.9345 17.4914 18.9345 17.0466L18.9345 11.0175L10.0577 19.8943C9.74318 20.2089 9.2332 20.2089 8.91864 19.8943C8.60409 19.5797 8.6041 19.0698 8.91864 18.7552L17.7954 9.87844L11.7664 9.87845C11.3215 9.87843 10.9609 9.51782 10.9609 9.07299Z" />
  </svg>
);

export default RightArrowIcon;