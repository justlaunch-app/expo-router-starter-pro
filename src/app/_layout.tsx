import { useEffect, useLayoutEffect, useMemo } from 'react';
import { useFonts } from 'expo-font';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  Stack,
  useRootNavigationState,
  useSegments,
  router,
  useNavigationContainerRef,
} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
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
import * as SecureStore from 'expo-secure-store';

// Sentry Setup
import * as Sentry from '@sentry/react-native';
const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();
Sentry.init({
  dsn: 'YOUR DSN HERE',
  debug: true, // Set to false in production or If you want to disable Sentry console logs
  integrations: [
    new Sentry.ReactNativeTracing({
      routingInstrumentation,
    }),
  ],
});

export { ErrorBoundary } from 'expo-router';

const queryClient = new QueryClient();

export const unstable_settings = {
  initialRouteName: 'index',
};

SplashScreen.preventAutoHideAsync();

//Clerk Auth JWT Token Cache
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

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

    if (isGuestMode) {
      console.log('Guest Mode Active');
      router.replace('/');
      return;
    }
    console.log('USER: ', user);
    console.log('inAuthGroup: ', inAuthGroup);

    if (!user && !inAuthGroup) {
      console.log('Redirecting to Sign-In');
      router.replace('/sign-in');
    } else if (user && !tutorialCompleted) {
      console.log('Redirecting to Tutorial');
      router.replace('/intro-steps');
    }
  }, [user, tutorialCompleted, segments, navigationKey, isGuestMode]);
}

function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useProtectedRoute();

  const ref = useNavigationContainerRef();

  useEffect(() => {
    if (ref) {
      routingInstrumentation.registerNavigationContainer(ref);
    }
  }, [ref]);

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
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey="pk_test_Zm9uZC1ld2UtMy5jbGVyay5hY2NvdW50cy5kZXYk"
    >
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <I18nextProvider i18n={i18n}>
          <QueryClientProvider client={queryClient}>
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
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
            </SafeAreaProvider>
          </QueryClientProvider>
        </I18nextProvider>
      </ThemeProvider>
    </ClerkProvider>
  );
}

export default Sentry.wrap(RootLayout);
