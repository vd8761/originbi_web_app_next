// app/dashboard/page.tsx
'use client';

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const router = useRouter();

    const handleLogout = () => {
        router.push('/login');
    };

    return <DashboardLayout onLogout={handleLogout} />;
}
