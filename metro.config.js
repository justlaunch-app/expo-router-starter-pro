/* eslint-disable no-undef */
// Learn more https://docs.expo.io/guides/customizing-metro
/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const { getSentryExpoConfig } = require('@sentry/react-native/metro');
/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const { withNativeWind } = require('nativewind/metro');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getSentryExpoConfig(__dirname, {
  isCSSEnabled: true,
});

module.exports = (async () => {
  const {
    resolver: { sourceExts },
  } = config;

  const modifiedConfig = {
    ...config,
    resolver: {
      ...config.resolver,
      sourceExts: [...sourceExts, 'mjs'],
    },
  };

  return withNativeWind(modifiedConfig, { input: './global.css' });
})();
