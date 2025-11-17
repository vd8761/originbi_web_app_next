import React from 'react';

const VideosIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 15 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.71764 0.352787C1.21679 -0.474644 0 0.203197 0 1.86558V14.1332C0 15.7973 1.21679 16.4742 2.71764 15.6476L13.874 9.49828C15.3753 8.67055 15.3753 7.32952 13.874 6.50199L2.71764 0.352787Z" />
  </svg>
);

export default VideosIcon;