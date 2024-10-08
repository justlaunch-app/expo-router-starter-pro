/**
 * If somehow user accidentally navigates to a non-existing route, this screen will be shown.
 * You can customize this screen by modifying the code below.
 * */

import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from '@components/core/safe-area-view';

export default function NotFoundScreen() {
  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className="flex-1 items-center justify-center p-5">
        <Text className="text-2xl font-bold">This screen doesn't exist.</Text>

        <Link href="/" className="mt-4 py-4">
          <Text className="text-base text-blue-600">Go to home screen!</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}
