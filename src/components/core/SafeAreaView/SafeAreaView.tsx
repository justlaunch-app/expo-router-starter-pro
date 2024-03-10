import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cn } from 'src/utils/classNames';

export default function SafeAreaView({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
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
