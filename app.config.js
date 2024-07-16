module.exports = {
  expo: {
    name: 'expo-router-starter-pro-ts',
    experiments: {
      typedRoutes: true,
      tsconfigPaths: true,
    },
    slug: 'expo-router-starter-pro-ts',
    version: '1.1.1',
    orientation: 'portrait',
    icon: './public/favicon-32x32.png',
    scheme: 'acme',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './public/justlaunch.png',
      resizeMode: 'contain',
      backgroundColor: '#000000',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    mode: 'production',
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.vador.expo-router-starter-pro-ts'
    },
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
    android: {
      package: 'com.vador.expo-router-starter-pro-ts',
      adaptiveIcon: {
        foregroundImage: './public/android-chrome-192x192.png',
        backgroundColor: '#ffffff',
      },
      // Add your custom intent filters here for Deep Linking
      intentFilters: [
        {
          action: 'VIEW',
          autoVerify: true,
          data: [
            {
              scheme: 'https',
              host: '*.myapp.io',
              pathPrefix: '/records',
            },
          ],
          category: ['BROWSABLE', 'DEFAULT'],
        },
      ],
    },
    web: {
      bundler: 'metro',
      favicon: './public/favicon-32x32.png',
    },
    plugins: [
      [
        'expo-router',
      ],
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Allow $(PRODUCT_NAME) to use your location."
        }
      ],
      [
        "expo-tracking-transparency"
      ],
      // In order to use OneSignal, you need to build a development version of the app - Expo Go is not supported
      // [
      //   "onesignal-expo-plugin",
      //   {
      //     mode: "development", // "production" | "development"
      //   }
      // ]
    ],
    extra: {
      clerkPublishableKey: 'pk_test_Zm9uZC1ld2UtMy5jbGVyay5hY2NvdW50cy5kZXYk',
      // oneSignalAppId: "<YOUR APP ID HERE>", //TODO: replace with your OneSignal App ID
      eas: {
        projectId: "cf2342ee-ad1a-4d42-a8ad-2ddde7172fa6"
      }
    },
  },
};
