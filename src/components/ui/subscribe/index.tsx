import React from 'react';
import { Linking, StyleSheet } from 'react-native';
import { Text } from '@components/core/text';
import { Icon } from '@components/core/icon';
import { TouchableOpacity } from '@components/core/button/touchable-opacity';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export default function Subscribe({ onClose }: Readonly<{ onClose: () => void }>) {
  const translateY = useSharedValue(100);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withTiming(translateY.value, { duration: 500 }) }],
    };
  });

  React.useEffect(() => {
    translateY.value = withTiming(0, { duration: 500 });
  }, []);

  const exitAnimation = React.useCallback(() => {
    try {
      translateY.value = withTiming(100);

      setTimeout(() => {
        onClose();
      }, 500);
    } catch (error) {
      console.error('Error in exitAnimation:', error);
    }
  }, [translateY, onClose]);

  const handleNewsletterPress = () => {
    Linking.openURL('https://ecohome-landing.vercel.app/');
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TouchableOpacity onPress={handleNewsletterPress} style={[styles.titleContainer]}>
        <Text style={styles.title}>
          <Text style={styles.underline}>Subscribe to our newsletter</Text>
          <Text> and get a 10% off discount code.</Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.iconContainer]} onPress={exitAnimation}>
        <Icon name="twitter" size={24} />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },

  titleContainer: {
    flex: 1,
  },

  title: {
    textTransform: 'uppercase',
  },

  underline: {
    textDecorationLine: 'underline',
  },

  iconContainer: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
