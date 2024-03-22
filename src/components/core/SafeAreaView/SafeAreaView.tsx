import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cn } from '@lib/cn';

export default function SafeAreaView({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
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
}
