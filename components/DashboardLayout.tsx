import React from 'react';
import Header from './Header';
import Dashboard from './Dashboard';

interface DashboardLayoutProps {
    onLogout: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ onLogout }) => {
    return (
        <div className="bg-brand-light-primary dark:bg-brand-dark-primary min-h-screen">
            <Header onLogout={onLogout} />
            <main className="p-4 sm:p-6">
                <Dashboard />
            </main>
        </div>
    );
};

export default DashboardLayout;
