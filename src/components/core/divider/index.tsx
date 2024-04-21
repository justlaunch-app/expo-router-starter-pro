/**
 * Divider component
 *
 * @module Divider
 * @param {string} className - The class name of the divider.
 * @return {React.FC}
 *
 */

import { View } from 'react-native';
import { cn } from '@lib/cn';

export const Divider = ({ className }: { className?: string }) => {
  return (
    <View
      className={cn(
        'border-t border-4 border-gray-700 my-2 rounded',
        className
      )}
    />
  );
};
