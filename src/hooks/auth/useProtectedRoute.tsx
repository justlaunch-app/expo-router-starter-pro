import { useLayoutEffect, useMemo } from 'react';

import { useRootNavigationState, useSegments, router } from 'expo-router';
import { useAuth } from 'src/store/authStore/auth.store';
export { ErrorBoundary } from 'expo-router';

export default function useProtectedRoute() {
  const segments = useSegments();
  const rootNavigationState = useRootNavigationState();
  const { user, tutorialCompleted } = useAuth(
    ({ user, tutorialCompleted }) => ({ user, tutorialCompleted })
  );
  const isGuestMode = useAuth((state) => state.isGuestMode);

  const navigationKey = useMemo(() => {
    return rootNavigationState?.key;
  }, [rootNavigationState]);

  useLayoutEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';

    if (!navigationKey) {
      return;
    }

    if (isGuestMode && user?.email !== 'guest' && user?.password !== 'guest') {
      router.replace('/');
      return;
    }

    if (!user && !inAuthGroup) {
      router.replace('/sign-in');
    } else if (user && !tutorialCompleted) {
      router.replace('/intro-steps');
    }
  }, [user, tutorialCompleted, segments, navigationKey, isGuestMode]);
}
