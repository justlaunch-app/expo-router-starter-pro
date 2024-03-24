/**
 * AuthProvider Component
 * This component wraps the authentication provider used in your application.
 *
 * Currently, it uses Clerk as the authentication provider.
 * To use another provider, replace ClerkProvider with the provider's component. -> Example coming soon
 *
 * Ensure to pass any required props to the new provider component.
 * You might also need to adjust the context value and any hooks that depend on the authentication state.
 *
 * @see https://docs.clerk.dev
 * @see https://clerk.com/docs/quickstarts/expo
 *
 */

import React from 'react';
import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@lib/tokenCache';

/*
 * AuthProvider Component
 * This component wraps the authentication provider used in your application.
 * Currently, it uses Clerk as the authentication provider.
 *
 * To use another provider, replace ClerkProvider with the provider's component.
 * Ensure to pass any required props to the new provider component.
 * You might also need to adjust the context value and any hooks that depend on the authentication state.
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      // Your Clerk publishable key
      publishableKey="pk_test_Zm9uZC1ld2UtMy5jbGVyay5hY2NvdW50cy5kZXYk"
    >
      {children}
    </ClerkProvider>
  );
};
