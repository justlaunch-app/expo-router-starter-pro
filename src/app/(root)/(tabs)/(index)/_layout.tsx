/**
 * Simple Top Tabs layout for the index screen.
 * You can customize this screen by modifying the code below.
 * you need to define the width based on the number of tabs you have.
 */

import { MaterialTopTabs } from '@layouts/material-top-tabs';
import { SCREEN_WIDTH } from '@lib/deviceSize';

// Tailwindcss - Colors
//Tailwindcss - Colors
import { DefaultTheme, DarkTheme } from '@utils/theme';
import { useColorScheme } from 'nativewind';

export default function IndexTopTabsLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <MaterialTopTabs
      screenOptions={{
        tabBarActiveTintColor:
          colorScheme === 'dark'
            ? DarkTheme.colors.navigationActive
            : DefaultTheme.colors.navigationActive,
        tabBarInactiveTintColor:
          colorScheme === 'dark'
            ? DarkTheme.colors.navigation
            : DefaultTheme.colors.navigation,
        tabBarItemStyle: { width: SCREEN_WIDTH / 2 },
      }}
    />
  );
}
