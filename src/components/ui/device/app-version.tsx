import { View } from 'react-native';
import { cn } from '@lib/cn';
import appVersion from '@config/version';
import { Text } from '@components/core/text';

export const AppVersion = () => {
  return (
    <View className={cn('bg-red-500 px-4 py-2 rounded-lg')}>
      <Text className={''}>Your app version is: {`${appVersion as string}`}</Text>
    </View>
  );
};
