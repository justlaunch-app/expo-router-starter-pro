import { useCallback } from 'react';
import { useColorScheme } from 'nativewind';
import { Text, Platform, TextProps } from 'react-native';

type LabelProps = TextProps & { htmlFor: string };

export function Label({ htmlFor, ...props }: LabelProps) {
  const { style, ...otherProps } = props;
  const { colorScheme } = useColorScheme();
  const color = colorScheme === 'dark' ? 'white' : 'black';

  const ref = useCallback(
    (node: Text | null) => {
      if (Platform.OS === 'web' && node != null) {
        // safe cast because above we already checked platform
        (node as unknown as HTMLElement).setAttribute('for', htmlFor);
      }
    },
    [htmlFor]
  );

  return (
    <Text
      accessibilityRole={
        Platform.OS === 'web'
          ? ('label' as Text['props']['accessibilityRole'])
          : undefined
      }
      ref={ref}
      style={[{ color }, style]}
      {...otherProps}
    />
  );
}
