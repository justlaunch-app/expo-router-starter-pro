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
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import { I18nextProvider } from 'react-i18next';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import i18n from '@locales/i18n';
import { useColorScheme } from 'nativewind';
import { useAuth } from 'src/store/authStore/auth.store';
import '../../global.css';

import { ClerkProvider } from '@clerk/clerk-expo';
export { ErrorBoundary } from 'expo-router';

const queryClient = new QueryClient();

export const unstable_settings = {
  initialRouteName: 'index',
};

SplashScreen.preventAutoHideAsync();

function useProtectedRoute() {
  const segments = useSegments();
  const rootNavigationState = useRootNavigationState();

  const user = useAuth(({ user }) => user);

  const navigationKey = useMemo(() => {
    return rootNavigationState?.key;
  }, [rootNavigationState]);

  useLayoutEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';

    if (!navigationKey) {
      return;
    }

    if (!user && !inAuthGroup) {
      router.replace('/sign-in');
    } else if (user && inAuthGroup) {
      router.replace('/');
    }
  }, [user, segments, navigationKey]);
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
      SplashScreen.hideAsync();
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
    <ClerkProvider publishableKey="pk_test_Zm9uZC1ld2UtMy5jbGVyay5hY2NvdW50cy5kZXYk">
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <I18nextProvider i18n={i18n}>
          <QueryClientProvider client={queryClient}>
            <Stack>
              <Stack.Screen name="(root)" options={{ headerShown: false }} />
              <Stack.Screen
                name="modal"
                options={{
                  presentation: 'modal',
                }}
              />
            </Stack>
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
          </QueryClientProvider>
        </I18nextProvider>
      </ThemeProvider>
    </ClerkProvider>
  );
}
