/**
 * @fileoverview This file contains the onboarding screen for the app.
 * It uses the onboarding data from the onboarding.json file to display
 *
 * The onboarding screen is a series of pages that the user can swipe through
 * The user can swipe through the onboarding pages and click the "Next" button to move to the next page
 * The user can also click the "Done" button on the last page to complete the onboarding
 *
 * The onboarding screen also requests location permission
 * The onboarding screen also requests tracking permission
 *
 * @param {number} activePageIndex - The index of the current page
 * @param {function} setActivePageIndex - A function to set the active page index
 * @param {object} scrollViewRef - A reference to the scroll view
 * @param {function} completeTutorial - A function to complete the tutorial
 * @param {boolean} permissionRequested - A boolean to check if permission has been requested
 * @param {boolean} locationPermissionDenied - A boolean to check if location permission has been denied
 * @param {function} finishTutorial - A function to finish the tutorial
 * @param {function} requestLocationPermission - A function to request location permission
 * @param {function} handleScroll - A function to handle the scroll event
 *
 * @return {JSX.Element} - Returns the onboarding screen
 */

import { useState, useRef, useEffect } from 'react';
import {
  View,
  ScrollView,
  Image,
  Alert,
  Linking,
  Pressable,
  Text,
  NativeSyntheticEvent,
  Platform,
  NativeScrollEvent,
} from 'react-native';
import { SafeAreaView } from '@components/core/safe-area-view';
import { SCREEN_WIDTH } from '@lib/device-size';
import * as Location from 'expo-location';
import Device from 'expo-device';
import { router } from 'expo-router';
import { useAuth } from 'src/store/authStore/auth.store';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import { buttonClasses } from '@lib/button-classes';
import { cn } from '@lib/cn';

//ONBOARDING DATA
import onboarding from '@assets/data/onboarding.json';

export default function IntroSteps() {
  const [activePageIndex, setActivePageIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const completeTutorial = useAuth((state) => state.completeTutorial);
  const [permissionRequested, setPermissionRequested] = useState(false);
  const [locationPermissionDenied, setLocationPermissionDenied] = useState(false);

  const finishTutorial = () => {
    completeTutorial();
    router.replace('/');
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android' && !Device.isDevice) {
      Alert.alert(
        'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
      );
      return;
    }
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      setLocationPermissionDenied(true);
      return;
    }
    setLocationPermissionDenied(false);
    await Location.getCurrentPositionAsync({});
  };

  useEffect(() => {
    if (activePageIndex === 1 && !permissionRequested) {
      requestLocationPermission();
      setPermissionRequested(true);
    }
    if (activePageIndex === onboarding.length - 1) {
      (async () => {
        const { status } = await requestTrackingPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Tracking Permission',
            'Would you like to enable tracking to improve your experience?',
            [
              { text: 'Not Now', style: 'cancel' },
              { text: 'Open Settings', onPress: () => Linking.openSettings() }, // Open settings for the user to change permissions
            ]
          );
        }
      })();
    }
  }, [activePageIndex, permissionRequested]);

  // Additional useEffect to handle re-prompting location permission
  useEffect(() => {
    // You can modify this logic to fit when you want to re-prompt
    // For example, based on specific user actions that indicate they might benefit from the feature requiring permissions
    if (locationPermissionDenied && activePageIndex === 2) {
      // Example condition, adjust as needed
      Alert.alert(
        'Location Permission',
        'Our app needs location access to offer better services. Would you like to reconsider?',
        [
          { text: 'Not Now', style: 'cancel' },
          { text: 'Yes', onPress: requestLocationPermission },
        ]
      );
    }
  }, [activePageIndex, locationPermissionDenied]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newPageIndex = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
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
        {onboarding.map((item, index) => (
          <View
            key={index}
            className={`flex-1 justify-center items-center my-7.5`}
            style={{ width: SCREEN_WIDTH }}
          >
            <Image className="w-full h-3/5" resizeMode="cover" />
            <View className="px-5">
              <Text className="text-4xl font-bold text-black text-center mb-2.5">{item.title}</Text>
              <Text className="text-lg text-black text-center mb-2.5">{item.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View className="flex-row justify-center items-center pb-10">
        {onboarding.map((_, index) => (
          <View
            key={index}
            className={`h-2.5 w-2.5 mx-1.5 rounded-full ${
              index === activePageIndex ? 'bg-red-500' : 'bg-gray-400'
            }`}
          />
        ))}
      </View>
      {activePageIndex < onboarding.length - 1 ? (
        <Pressable
          className={cn('absolute bottom-20 left-5 right-5 bg-red-500', buttonClasses)}
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
          className={cn('absolute bottom-20 left-5 right-5 bg-red-500', buttonClasses)}
          onPress={finishTutorial}
        >
          <Text className="text-white font-bold">Done</Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
}
