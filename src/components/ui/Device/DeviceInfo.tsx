import { View } from 'react-native';
import { cn } from '@lib/cn';
import { deviceBrand, deviceName, deviceOS, deviceModel } from '@config/device';
import { StyledText as Text } from '@components/core/Text/StyledText';

export function AppVersion(className?: string) {
  return (
    <View className={cn('py-2', className)}>
      <Text>
        {`Device Brand: ${deviceBrand}`}
        {`\nDevice Name: ${deviceName}`}
        {`\nDevice OS: ${deviceOS}`}
        {`\nDevice Model: ${deviceModel}`}
      </Text>
    </View>
  );
}
