import { View, Text } from 'react-native';
import { cn } from '@utils/classNames';

export const Separator = ({
  text,
  className,
  borderColor,
}: {
  text?: string;
  className?: string;
  borderColor?: string;
}) => {
  return (
    <View className={cn('flex flex-row items-center', className)}>
      <View className={cn('flex-1 border-t border-gray-300', borderColor)} />
      {text && <Text className="mx-2">{text}</Text>}
      <View className={cn('flex-1 border-t border-gray-300', borderColor)} />
    </View>
  );
};
