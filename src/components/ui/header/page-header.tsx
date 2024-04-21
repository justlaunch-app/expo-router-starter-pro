import { View } from 'react-native';
import { TouchableOpacity } from '@components/core/button/touchable-opacity';
import { Icon } from '@components/core/icon/lucide';
import { StyledText as Text } from '@components/core/text/styled-text';

export const PageHeader = ({ title }: { title: string }) => {
  return (
    <View className="flex flex-row justify-between items-center">
      <TouchableOpacity onPress={() => {}}>
        <Icon name="X" />
      </TouchableOpacity>
      <Text>{title}</Text>
    </View>
  );
};
