import { SafeAreaView } from '@components/core/SafeAreaView/SafeAreaView';
import { MaterialTopTabs } from '@layouts/material-top-tabs';
import useHeaderVisibility from '@hooks/useHeaderVisibility';
import { SCREEN_WIDTH } from '@lib/deviceSize';

export default function IndexTopTabsLayout() {
  useHeaderVisibility(false);

  return (
    <SafeAreaView>
      <MaterialTopTabs
        screenOptions={{
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarItemStyle: { width: SCREEN_WIDTH / 2 },
        }}
      />
    </SafeAreaView>
  );
}
