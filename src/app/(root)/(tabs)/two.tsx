import { View } from 'react-native';
import { StyledText as Text } from '@components/core/Text/StyledText';
import { SafeAreaView } from '@components/core/SafeAreaView/SafeAreaView';

export default function TabTwoScreen() {
  return (
    <SafeAreaView>
      <View className="flex-row justify-between items-center">
        <Text className="text-2xl dark:text-white text-black">Page Two</Text>
      </View>
    </SafeAreaView>
  );
}
