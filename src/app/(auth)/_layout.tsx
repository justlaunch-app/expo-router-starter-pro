import { SafeAreaView } from '@components/core/SafeAreaView/SafeAreaView';
import { MaterialTopTabs } from '@layouts/material-top-tabs';
import useHeaderVisibility from '@hooks/useHeaderVisibility';
import { SCREEN_WIDTH } from '@lib/deviceSize';

//Tailwindcss - Colors
import { DefaultTheme, DarkTheme } from '@utils/theme';
import { useColorScheme } from 'nativewind';

export default function IndexTopTabsLayout() {
  const { colorScheme } = useColorScheme();

  useHeaderVisibility(false);

  return (
    <SafeAreaView>
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
    </SafeAreaView>
  );
}
