/**
 * This is the main layout file for the application.
 * It is the first file that is loaded when the application starts.
 * It is responsible for setting up the application's theme, fonts, and other global settings.
 * It behaves really similar as Next.js layout. If you want to add shared logic this is the place for that
 * */

import { useEffect } from 'react';
import { Stack } from 'expo-router';
export { ErrorBoundary } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

import useProtectedRoute from '@hooks/auth/useProtectedRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Internalization
import { I18nextProvider } from 'react-i18next';
import i18n from '@locales/i18n';

// Nativewind - Tailwind CSS + Dark Mode
import { useColorScheme } from 'nativewind';
import '../../global.css';
import { ThemeProvider } from '@react-navigation/native';
import { DarkTheme, DefaultTheme } from 'src/utils/theme';

//Authentication with Clerk
import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@utils/tokenCache';

/**
 * Inject OneSignal - Only works with Expo Development Build
 * https://docs.expo.dev/develop/development-builds/introduction/
 * import '@services/onesignal';
 */

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('src/assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // useProtectedRoute behaves as a middleware in our application
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
