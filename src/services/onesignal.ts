/**
 * Simple OneSignal setup for Expo managed projects.
 * In order to use this notification service, you need to have an account with OneSignal and an app created in their dashboard.
 * For more information check here: https://documentation.onesignal.com/docs/react-native-expo-sdk-setup
 */

import { LogLevel, OneSignal } from 'react-native-onesignal';
import Constants from 'expo-constants';

OneSignal.Debug.setLogLevel(LogLevel.Verbose);

const oneSignalAppId = Constants.expoConfig?.extra?.oneSignalAppId;
if (oneSignalAppId) {
  OneSignal.initialize(oneSignalAppId);
}

// Also need enable notifications to complete OneSignal setup
OneSignal.Notifications.requestPermission(true);
