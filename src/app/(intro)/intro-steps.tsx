import { router } from 'expo-router';
import { useAuth } from 'src/store/authStore/auth.store';
import { useState, useRef } from 'react';
import {
  View,
  ScrollView,
  Image,
  Pressable,
  Text,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import SafeAreaView from '@components/SafeAreaView/SafeAreaView';
import { SCREEN_WIDTH } from '@utils/deviceSize';

const tutorialData = [
  {
    title: 'Find Your Next Destination',
    description: 'Browse through our list of cities based on your preferences.',
    image: require('../../assets/images/Illustraions.png'),
  },
  {
    title: 'Discover Nomad Page',
    description: 'Where you can create a budget read upon taxes and more.',
    image: require('../../assets/images/Illustraions.png'),
  },
  {
    title: 'Get Started',
    description:
      'Enjoy your new life in a new city and do not forget to share your experience with us on Discord',
    image: require('../../assets/images/Illustraions.png'),
  },
];

export default function IntroSteps() {
  const [activePageIndex, setActivePageIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const completeTutorial = useAuth((state) => state.completeTutorial);

  const finishTutorial = () => {
    completeTutorial();
    router.replace('/');
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newPageIndex = Math.round(
      event.nativeEvent.contentOffset.x / SCREEN_WIDTH
    );
    setActivePageIndex(newPageIndex);
  };

  return (
    <SafeAreaView>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        className="grow"
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {tutorialData.map((item, index) => (
          <View
            key={index}
            className={`flex-1 justify-center items-center my-7.5`}
            style={{ width: SCREEN_WIDTH }}
          >
            <Image
              source={item.image}
              className="w-full h-3/5"
              resizeMode="cover"
            />
            <View className="px-5">
              <Text className="text-4xl font-bold text-black text-center mb-2.5">
                {item.title}
              </Text>
              <Text className="text-lg text-black text-center mb-2.5">
                {item.description}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View className="flex-row justify-center items-center pb-10">
        {tutorialData.map((_, index) => (
          <View
            key={index}
            className={`h-2.5 w-2.5 mx-1.5 rounded-full ${
              index === activePageIndex ? 'bg-teal-500' : 'bg-gray-400'
            }`}
          />
        ))}
      </View>
      {activePageIndex < tutorialData.length - 1 ? (
        <Pressable
          className="absolute bottom-20 left-5 right-5 bg-teal-500 px-5 py-2.5 rounded-lg items-center"
          onPress={() => {
            if (scrollViewRef.current) {
              scrollViewRef.current.scrollTo({
                x: SCREEN_WIDTH * (activePageIndex + 1),
                animated: true,
              });
            }
          }}
        >
          <Text className="text-white font-bold">Next</Text>
        </Pressable>
      ) : (
        <Pressable
          className="absolute bottom-20 left-5 right-5 bg-teal-500 px-5 py-2.5 rounded-lg items-center"
          onPress={finishTutorial}
        >
          <Text className="text-white font-bold">Done</Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
}
