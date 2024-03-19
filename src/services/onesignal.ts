import { LogLevel, OneSignal } from 'react-native-onesignal';
import Constants from 'expo-constants';

OneSignal.Debug.setLogLevel(LogLevel.Verbose);

const oneSignalAppId = Constants.expoConfig?.extra?.oneSignalAppId;
if (oneSignalAppId) {
  OneSignal.initialize(oneSignalAppId);
}

// Also need enable notifications to complete OneSignal setup
OneSignal.Notifications.requestPermission(true);
