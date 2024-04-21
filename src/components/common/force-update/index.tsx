/**
 * ForceUpdate component checks for the latest version of the app and prompts the user to update if a new version is available.
 *
 * @module ForceUpdate
 * @return {React.FC}
 *
 */

import { useEffect, useState } from 'react';
import { View, Platform } from 'react-native';
import { ExternalLink } from '@components/core/link/external-link';
import { StyledText as Text } from '@components/core/text/styled-text';
import appVersion from '@config/version';

// URL to your version info JSON file
const versionInfoUrl = 'https://yourserver.com/version.json';
// Replace with your App Store link
const APP_STORE_LINK = 'https://apps.apple.com/app/idYOUR_APP_ID';
// Replace with your Play Store package name
const PLAY_STORE_LINK =
  'https://play.google.com/store/apps/details?id=YOUR_PACKAGE_NAME';

export default function ForceUpdate() {
  const [isUpdateRequired, setIsUpdateRequired] = useState(false);
  const storeLink = Platform.OS === 'ios' ? APP_STORE_LINK : PLAY_STORE_LINK;

  useEffect(() => {
    checkForUpdates();
  }, []);

  async function checkForUpdates() {
    try {
      const response = await fetch(versionInfoUrl);
      const { androidVersion, iosVersion } = await response.json();

      const latestVersion = Platform.OS === 'ios' ? iosVersion : androidVersion;

      //Compare the latest version with the current app version
      if (appVersion !== latestVersion) {
        setIsUpdateRequired(true);
      }
    } catch (error) {
      console.error('Error checking app version: ', error);
    }
  }

  if (!isUpdateRequired) {
    return null;
  }

  return (
    <View className="flex-1 justify-center items-center p-5">
      <Text className="mb-5 text-center">
        A new version of the app is available!
      </Text>
      <ExternalLink href={storeLink} className="text-blue-500">
        Update Now
      </ExternalLink>
    </View>
  );
}
