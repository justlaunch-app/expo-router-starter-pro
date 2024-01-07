module.exports = {
  expo: {
    name: 'justlaunch.app - expo-router-starter-kit',
    experiments: {
      typedRoutes: true,
      tsconfigPaths: true,
    },
    slug: 'expo-starter-kit',
    version: '1.7.0',
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
    hooks: {
      postPublish: [
        {
          "file": "sentry-expo/upload-sourcemaps",
          "config": {
            "organization": "sentry org slug, or use the `SENTRY_ORG` environment variable",
            "project": "sentry project name, or use the `SENTRY_PROJECT` environment variable"
          }
        }
      ]
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.zoltanfodor.test-expo-router-now'
    },
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
    android: {
      package: 'com.zoltanfodor_dev.expostarterkit',
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
        'sentry-expo',
      ]
    ],
    extra: {
      eas: {
        projectId: 'c5cddb1a-4054-45f3-8212-36a4c9482807',
      },
    },
  },
};
