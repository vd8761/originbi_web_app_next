'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import AssessmentLayout from '../../../components/AssessmentLayout';
import AssessmentRunner from '../../../components/AssessmentRunner';

export default function AssessmentRunnerPage() {
    const router = useRouter();

    const handleLogout = () => {
        router.push('/login');
    };

    const handleBack = () => {
        // Navigate back to the main assessment list
        router.push('/assessment');
    };

    return (
        <AssessmentLayout onLogout={handleLogout} hideNav={true}>
            <AssessmentRunner onBack={handleBack} />
        </AssessmentLayout>
    );
}