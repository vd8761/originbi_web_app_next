// app/ClientProviders.tsx

'use client'; // ⬅️ MUST be the first line

import React from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext'; // Your existing ThemeProvider
import { configureAmplify } from '@/lib/aws-amplify-config'; // Your Amplify config utility

// 🟢 Initialize Amplify once when this module loads on the client side
// This fixes the 404 and configuration errors
configureAmplify();

interface ClientProvidersProps {
    children: React.ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
    return (
        <ThemeProvider>
            {children}
        </ThemeProvider>
    );
}