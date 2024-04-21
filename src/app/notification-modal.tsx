/**
 * This is a simple modal screen.
 * If you have multiple modals I would recommend to create a separate folder for them.
 * This will help you to keep your codebase clean and organized.
 * You need to define Modals as Screens in expo-router
 * Here's an example:
 *    <Stack.Screen
        name="modal"
        options={{
          presentation: 'modal',
        }}
      />
 * */

/**
 * Display notifications here
 */

import { View } from 'react-native';
import { StyledText as Text } from '@components/core/text/styled-text';
import { ExternalLink } from '@components/core/link/external-link';

export default function NotificationModalScreen() {
  return (
    <View className="flex-1 items-center justify-center max-w-sm mx-auto">
      <Text className="text-2xl font-bold pb-5">Notifications</Text>
      <ExternalLink
        className="px-8 text-center"
        href="https://github.com/ritmillio/expo-starter-kit"
      >
        <Text className="text-center">
          You don't have any notification currently.
        </Text>
      </ExternalLink>
    </View>
  );
}
