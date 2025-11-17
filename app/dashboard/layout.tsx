// app/dashboard/layout.tsx

import React from 'react';

// Define the layout component
const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      {/* This renders the content of app/dashboard/page.tsx */}
      {children} 
    </main>
  );
};

export default DashboardLayout;