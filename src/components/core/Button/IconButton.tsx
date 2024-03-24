/**
 * IconButton component
 * @description
 * A component that renders a button with an icon.
 * @module Button
 * @param {Record<string, boolean>} className - The class name of the button.
 * @param {PressableProps} props - The props of the button.
 * @return {React.FC<IconButtonProps>}
 *
 */

import { cn } from '@lib/cn';
import { useColorScheme } from 'nativewind';
import { View, Platform, Pressable, PressableProps } from 'react-native';

type IconButtonProps = Omit<PressableProps, 'className'> & {
  className?: Record<string, boolean>;
};

export const IconButton = ({
  className,
  children,
  ...props
}: IconButtonProps) => {
  const { colorScheme } = useColorScheme();

  return (
    <View
      className={cn({
        'rounded-md overflow-hidden': true,
        'active:text-slate-100': Platform.OS === 'ios',
        'bg-white': colorScheme === 'light',
        'bg-slate-900': colorScheme === 'dark',
        ...className,
      })}
    >
      <Pressable className="w-full h-full p-4" {...props}>
        {children}
      </Pressable>
    </View>
  );
};
