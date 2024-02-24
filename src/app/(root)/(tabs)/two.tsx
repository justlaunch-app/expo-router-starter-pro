import { View } from 'react-native';
import { StyledText as Text } from '@components/Text/StyledText';
import SafeAreaView from '@components/SafeAreaView/SafeAreaView';

export default function TabTwoScreen() {
  return (
    <SafeAreaView>
      <View className="flex-row justify-between items-center">
        <Text className="text-2xl dark:text-white text-black">Page Two</Text>
      </View>
    </SafeAreaView>
  );
}
