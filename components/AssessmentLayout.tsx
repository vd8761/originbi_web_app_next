// components/AssessmentLayout.tsx
import React from "react";
import Header from "./Header";
import AssessmentScreen from "./AssessmentScreen";

// 1. Define the props interface
interface AssessmentLayoutProps {
  onLogout: () => void;
}

interface AssessmentLayoutProps {
  onLogout: () => void;
}

const AssessmentLayout: React.FC<AssessmentLayoutProps> = ({ onLogout }) => {
  return (
    <div className="bg-brand-light-primary dark:bg-brand-dark-primary min-h-screen">
      <Header onLogout={onLogout} />
      <main className="p-4 sm:p-6">
        <AssessmentScreen />
      </main>
    </div>
  );
};

export default AssessmentLayout;
