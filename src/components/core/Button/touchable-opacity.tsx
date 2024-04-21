/**
 * TouchableOpacity Component -> using Pressable
 * Why ? Pressale is the new component for handling touch events in React Native.
 * It provides more flexibility and a more consistent API than TouchableOpacity.
 *
 * @module Button
 * @param {Function} onPress - The function to be called when the button is pressed.
 * @param {StyleProp<ViewStyle>} style - The style of the button.
 * @param {ReactNode} children - The children of the button.
 * @param {boolean} disabled - The disabled state of the button.
 * @param {string} className - The class name of the button.
 * @return {React.FC<PressableComponentProps>}
 *
 *  @example
 * <PressableComponent
 *  onPress={() => console.log('Button pressed')}
 *  disabled={false}
 * >
 */

import { ReactNode, FC } from 'react';
import {
  Pressable,
  ViewStyle,
  StyleProp,
  PressableStateCallbackType,
  GestureResponderEvent,
} from 'react-native';

type PressableComponentProps = {
  onPress: (e?: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode | ((state: PressableStateCallbackType) => ReactNode);
  disabled?: boolean;
  className?: string;
};

export const TouchableOpacity: FC<PressableComponentProps> = ({
  onPress,
  style,
  children,
  disabled = false,
  className,
}) => {
  return (
    <Pressable
      className={className}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, style]}
    >
      {children}
    </Pressable>
  );
};
