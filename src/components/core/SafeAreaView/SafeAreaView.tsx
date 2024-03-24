/**
 *
 * SafeAreaView is a component that wraps the children with a View component and applies padding to the top of the children based on the safe area insets.
 *
 * @module
 * @param {ReactNode} children - The children of the SafeAreaView.
 * @param {string} className - The class name of the SafeAreaView.
 * @return {React.FC<SafeAreaViewProps>}
 *
 * @example
 * import { SafeAreaView } from '@components/core/SafeAreaView/SafeAreaView';
 *
 * const MyComponent = () => {
 * return (
 * <SafeAreaView>
 *  <Text>SafeAreaView</Text>
 * </SafeAreaView>
 * );
 *
 */

import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cn } from '@lib/cn';

export const SafeAreaView = ({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className={cn('flex-1', className)}
      style={{
        paddingTop: insets.top,
      }}
    >
      {children}
    </View>
  );
};
