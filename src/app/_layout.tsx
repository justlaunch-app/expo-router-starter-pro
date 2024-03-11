import { useEffect, useLayoutEffect, useMemo } from 'react';
import { useFonts } from 'expo-font';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  Stack,
  useRootNavigationState,
  useSegments,
  router,
} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider } from '@react-navigation/native';
import { DarkTheme, DefaultTheme } from '../utils/theme';
import { I18nextProvider } from 'react-i18next';
import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import i18n from '@locales/i18n';
import { useColorScheme } from 'nativewind';
import { useAuth } from 'src/store/authStore/auth.store';
import '../../global.css';

import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@utils/tokenCache';

export { ErrorBoundary } from 'expo-router';

const queryClient = new QueryClient();

export const unstable_settings = {
  initialRouteName: 'index',
};

SplashScreen.preventAutoHideAsync();

function useProtectedRoute() {
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

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useProtectedRoute();

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 1000);
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const { colorScheme } = useColorScheme();

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey="pk_test_Zm9uZC1ld2UtMy5jbGVyay5hY2NvdW50cy5kZXYk"
    >
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <I18nextProvider i18n={i18n}>
          <QueryClientProvider client={queryClient}>
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(root)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="modal"
                  options={{
                    presentation: 'modal',
                  }}
                />
              </Stack>
              <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
            </SafeAreaProvider>
          </QueryClientProvider>
        </I18nextProvider>
      </ThemeProvider>
    </ClerkProvider>
  );
}
