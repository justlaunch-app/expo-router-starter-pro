import { View } from 'react-native';
import { TouchableOpacity } from '@components/core/button/touchable-opacity';
import { Icon } from '@components/core/icon';
import { Text } from '@components/core/text';

export const PageHeader = ({ title }: { title: string }) => {
  return (
    <View className="flex flex-row justify-between items-center">
      <TouchableOpacity onPress={() => {}}>
        <Icon name="align-justify" />
      </TouchableOpacity>
      <Text>{title}</Text>
    </View>
  );
};
