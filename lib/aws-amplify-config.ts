// lib/aws-amplify-config.ts
import { Amplify } from 'aws-amplify';

const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
      userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_APP_CLIENT_ID!,
      region: process.env.NEXT_PUBLIC_COGNITO_REGION!,
      // optional, only if you use Identity Pools
      // identityPoolId: process.env.NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID,
    },
  },
};

let isConfigured = false;

export function configureAmplify() {
  if (isConfigured) return;

  // 👇 temporary debug in case values are missing
  if (
    !amplifyConfig.Auth.Cognito.userPoolId ||
    !amplifyConfig.Auth.Cognito.userPoolClientId ||
    !amplifyConfig.Auth.Cognito.region
  ) {
    console.error('Amplify Auth config is missing values:', amplifyConfig.Auth.Cognito);
  }

  Amplify.configure(amplifyConfig);
  isConfigured = true;
}
