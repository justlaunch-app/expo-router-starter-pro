import React from 'react';
import {
  Text,
  Image,
  ImageSourcePropType,
  View,
  ViewStyle,
} from 'react-native';
import TouchableOpacity from '@components/Button/TouchableOpacity';
import 'nativewind';

interface SSOButtonProps {
  logo: ImageSourcePropType;
  backgroundColor: string;
  textColor: string;
  borderRadius: number;
  text: string;
  height?: number;
  width?: number;
  textClasses?: string;
}

const SSOButton: React.FC<SSOButtonProps> = ({
  logo,
  text,
  backgroundColor,
  textColor,
  borderRadius,
  height = 20,
  width = 20,
  textClasses,
}) => {
  const buttonStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor,
    borderRadius,
  };

  const textStyle = {
    color: textColor,
    textAlign: 'center',
    flex: 1,
  };

  return (
    <TouchableOpacity style={buttonStyle} onPress={() => {}}>
      <Image
        source={logo}
        style={{ height: height, width: width, marginRight: 8 }}
        resizeMode="contain"
      />
      <Text className={textClasses} style={textStyle}>
        {text}
      </Text>
      <View style={{ height: height, width: width }} />
    </TouchableOpacity>
  );
};

export default SSOButton;
