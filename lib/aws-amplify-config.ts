// ./lib/aws-amplify-config.ts (Corrected)

import { Amplify, ResourcesConfig } from 'aws-amplify';
// The 'Amplify' import is necessary to call Amplify.configure()

export const awsAmplifyConfig: ResourcesConfig = {
    Auth: {
        Cognito: {
            userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
            userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_APP_CLIENT_ID!,
            // Keeping region here with 'as any' bypass for the type issue
            region: process.env.NEXT_PUBLIC_COGNITO_REGION!, 
        },
    },
} as any; 

// 🚨 FIX: Add and export the configureAmplify function
export function configureAmplify() {
    Amplify.configure(awsAmplifyConfig); 
    // Optional: console.log("Amplify configured successfully.");
}
