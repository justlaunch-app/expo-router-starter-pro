import React from 'react';
import {
  Text,
  Image,
  ImageSourcePropType,
  View,
  ViewStyle,
} from 'react-native';
import TouchableOpacity from '@components/core/Button/TouchableOpacity';

interface SSOButtonProps {
  logo: ImageSourcePropType | string;
  backgroundColor: string;
  textColor: string;
  borderRadius: number;
  text: string;
  height?: number;
  width?: number;
  textClasses?: string;
  onPress: () => void;
}

const SSOButton: React.FC<SSOButtonProps> = ({
  logo,
  text,
  backgroundColor,
  borderRadius,
  height = 20,
  width = 20,
  textClasses,
  onPress,
}) => {
  const buttonStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor,
    borderRadius,
  };

  const imageSource = typeof logo === 'string' ? { uri: logo } : logo;

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Image
        source={imageSource}
        style={{ height: height, width: width, marginRight: 8 }}
        resizeMode="contain"
      />
      <Text className={textClasses}>{text}</Text>
      <View style={{ height: height, width: width }} />
    </TouchableOpacity>
  );
};

export default SSOButton;
