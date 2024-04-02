/**
 * This hook is used to protect routes that require authentication.
 * It redirects the user to the sign-in page if they are not authenticated.
 * If the user is authenticated but hasn't completed the tutorial, it redirects them to the onboarding page.
 * If the user is a guest, it allows them to stay on the current page.
 *
 * If you want to add more conditions, you can add them to the `useLayoutEffect` hook. -> useLayoutEffect hook is used to perform side effects before anything is painted on the screen.
 */

import { useLayoutEffect, useMemo } from 'react';
import {
  useRootNavigationState,
  useSegments,
  router,
  usePathname,
} from 'expo-router';
import { useAuth } from 'src/store/authStore/auth.store';

export default function useProtectedRoute() {
  const segments = useSegments();
  const path = usePathname();
  const rootNavigationState = useRootNavigationState();
  const { user, tutorialCompleted, isGuestMode } = useAuth(
    ({ user, tutorialCompleted, isGuestMode }) => ({
      user,
      tutorialCompleted,
      isGuestMode,
    })
  );

  const navigationKey = useMemo(() => {
    return rootNavigationState?.key;
  }, [rootNavigationState]);

  useLayoutEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';

    if (!navigationKey) {
      return;
    }

    console.log('User:', user);
    console.log('Tutorial Completed:', tutorialCompleted);
    console.log('Segments:', segments);
    console.log('Navigation Key:', navigationKey);
    console.log('Is Guest Mode:', isGuestMode);
    console.log('in auth group:', inAuthGroup);

    // Avoid redirects if user is a guest, allowing them to stay on the current page
    if (isGuestMode) {
      return;
    }

    // Redirect to sign-in if there's no user and not already on an auth route
    if (!user && !inAuthGroup) {
      router.replace('/sign-in');
      return;
    }

    // Redirect to onboarding if the user exists but hasn't completed the tutorial
    if (user && user.email !== 'guest' && !tutorialCompleted) {
      router.replace('/onboarding');
    }

    // Redirect to home if the user exists and has completed the tutorial
    if (user && tutorialCompleted) {
      if (path === '/sign-in' || path === 'sign-up' || path === 'onboarding') {
        router.replace('/');
      }
    }
  }, [user, tutorialCompleted, segments, navigationKey, isGuestMode, path]);
}
