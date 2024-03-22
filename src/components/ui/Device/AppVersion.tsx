import { View } from 'react-native';
import { cn } from '@lib/cn';
import appVersion from '@config/version';
import { StyledText as Text } from '@components/core/Text/StyledText';

export default function AppVersion(className?: string, textClassName?: string) {
  return (
    <View className={cn('bg-red-500 px-4 py-2 rounded-lg', className)}>
      <Text className={textClassName}>
        Your app version is: {`${appVersion}`}
      </Text>
    </View>
  );
}
