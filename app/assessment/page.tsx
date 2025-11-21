'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import AssessmentLayout from '../../components/AssessmentLayout';
import AssessmentScreen from '../../components/AssessmentScreen';

export default function AssessmentPage() {
    const router = useRouter();

    const handleLogout = () => {
        router.push('/login');
    };

    const handleStart = () => {
        // Navigate to the separate runner page
        router.push('/assessment/runner');
    };

    return (
        <AssessmentLayout onLogout={handleLogout}>
            <AssessmentScreen onStartAssessment={handleStart} />
        </AssessmentLayout>
    );
}