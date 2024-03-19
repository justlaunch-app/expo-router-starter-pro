/**
 * Separator component
 * @param text - optional text to display in the middle of the separator
 * @param className - optional class name
 * @param borderColor - optional border color
 *
 * @example
 * <Separator text="or SSO" />
 * <Separator text="or SSO" className="px-10 py-5" />
 *
 * @returns React.ReactNode
 */

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
