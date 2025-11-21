// app/assessment/page.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
// Import the new AssessmentLayout component
import AssessmentLayout from '@/components/AssessmentLayout'; 

export default function AssessmentPage() {
    const router = useRouter();

    const handleLogout = () => {
        router.push('/login');
    };

    return (
        // Render the new layout, passing the required onLogout prop
        <AssessmentLayout onLogout={handleLogout} />
    );
}