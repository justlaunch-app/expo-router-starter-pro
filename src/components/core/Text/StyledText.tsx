/**
 * StyledText component
 *
 * @module StyledText
 * @param {StyledTextProps} props - The props of the StyledText.
 * @return {React.FC<StyledTextProps>}
 */

import { ReactNode } from 'react';
import { Text, TextProps } from 'react-native';
import { useColorScheme } from 'nativewind';

interface StyledTextProps {
  children: ReactNode;
  className?: string;
  selectable?: boolean;
  fontFamily?: string;
  style?: TextProps['style'];
}

export function StyledText({
  children,
  className,
  selectable = false,
  fontFamily,
  style,
}: Readonly<StyledTextProps>) {
  const { colorScheme } = useColorScheme();
  const color = colorScheme === 'dark' ? 'white' : 'black';

  return (
    <Text
      className={className}
      selectable={selectable}
      style={[{ color, fontFamily }, style]}
    >
      {children}
    </Text>
  );
}
