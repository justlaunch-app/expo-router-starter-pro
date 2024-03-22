import { View } from 'react-native';
import { cn } from '@lib/cn';

export const Divider = (className: string) => {
  return (
    <View
      className={cn(
        'border-t border-4 border-gray-700 my-2 rounded',
        className
      )}
    />
  );
};
