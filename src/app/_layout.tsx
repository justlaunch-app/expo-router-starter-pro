/**
 * This is the main entry/layout file for the application .
 * It is the first file that is loaded when the application starts.
 * It is responsible for setting up the application's theme, fonts, and other global settings.
 * It behaves really similar as Next.js layout. If you want to add shared logic this is the place for that
 *
 * @see https://docs.expo.dev/router/layouts/
 *
 * */

import { useEffect } from 'react';
import { Stack } from 'expo-router';
export { ErrorBoundary } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeToggle } from '@/components/core/toggle';

// Authentication
import useProtectedRoute from '@/hooks/auth/useProtectedRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { useAuth } from 'src/store/authStore/auth.store';
import { AuthProvider } from '@/context/auth-provider';
import { NAV_THEME } from '@/theme';

// Internalization
import { I18nextProvider } from 'react-i18next';
import i18n from '@/locales/i18n';

/** Nativewind - Tailwind CSS + Dark Mode **/
import { ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from 'nativewind';
import '../../global.css';

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

  // Load user session from SecureStore if it exists
  const setAuthUser = useAuth((state) => state.setUser);
  useEffect(() => {
    async function loadUserSession() {
      const userSession = await SecureStore.getItemAsync('user');
      if (userSession) {
        // Set the user session in the auth store
        setAuthUser(JSON.parse(userSession));
      }
    }

    loadUserSession();
  }, [setAuthUser]);

  // useProtectedRoute behaves as a middleware in our application
  useProtectedRoute();

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  /** Adjust or remove hide Splash Screen TimeOut based on preference */
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
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? NAV_THEME.dark : NAV_THEME.light}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <I18nextProvider i18n={i18n}>
            <QueryClientProvider client={queryClient}>
              <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                <Stack screenOptions={{ headerShown: false, animation: 'ios' }}>
                  <Stack.Screen name="(root)" options={{ headerShown: false }} />
                  <Stack.Screen
                    name="modal"
                    options={{
                      title: 'Modal',
                      presentation: 'modal',
                      animation: 'fade_from_bottom',

                      /** You have the ability to add left and right header JSX/TSX component here fx.: a Pressable Icon component or a Close Icon module*/
                      headerRight: () => <ThemeToggle />,
                      headerLeft: () => null,
                    }}
                  />
                  <Stack.Screen
                    name="privacy-policy-modal"
                    options={{
                      presentation: 'modal',
                    }}
                  />
                </Stack>
                <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
              </SafeAreaProvider>
            </QueryClientProvider>
          </I18nextProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </AuthProvider>
  );
}
