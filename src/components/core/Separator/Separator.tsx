import { View, Text } from 'react-native';
import { cn } from '@utils/classNames';

export const Separator = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  return (
    <View className={cn('flex flex-row items-center', className)}>
      <View className="flex-1 border-t border-gray-300" />
      <Text className="mx-2">{text}</Text>
      <View className="flex-1 border-t border-gray-300" />
    </View>
  );
};
