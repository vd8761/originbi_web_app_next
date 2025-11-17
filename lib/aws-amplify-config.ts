// lib/aws-amplify-config.ts
import { Amplify } from 'aws-amplify';

let isConfigured = false;

export function configureAmplify() {
  if (isConfigured) return;

  Amplify.configure({
    Auth: {
      Cognito: {
        region: process.env.NEXT_PUBLIC_COGNITO_REGION!,
        userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
        userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_APP_CLIENT_ID!,
      },
    },
  });

  isConfigured = true;
}
