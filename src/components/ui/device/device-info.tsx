import { View } from 'react-native';
import { cn } from '@lib/cn';
import { deviceBrand, deviceName, deviceOS, deviceModel } from '@config/device';
import { Text } from '@components/core/text';

export function DeviceInfo({ className }: Readonly<{ className?: string }>) {
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
