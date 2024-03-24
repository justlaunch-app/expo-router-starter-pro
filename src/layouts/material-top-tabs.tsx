/**
 * Material Top Tabs Layout
 *
 * This layout is used to create a Material Top Tabs layout using expo-router.
 * It is a wrapper around the MaterialTopTabNavigator from @react-navigation/material-top-tabs.
 *
 *
 * @param {MaterialTopTabNavigationOptions} screenOptions - The options for the MaterialTopTabNavigator
 * @returns {React.ReactNode} - The MaterialTopTabNavigator wrapped in a SafeAreaView
 * @example
 * Check example in src/app/(auth)/_layout.tsx and src/app/(root)/(tabs)/(index)/_layout.tsx
 */

import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import { NavigationState, EventMapBase } from '@react-navigation/native';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  NavigationState,
  EventMapBase
>(Navigator);
