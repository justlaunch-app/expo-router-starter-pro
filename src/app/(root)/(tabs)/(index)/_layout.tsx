import { MaterialTopTabs } from '@layouts/material-top-tabs';
import { SCREEN_WIDTH } from '@utils/deviceSize';

export default function IndexTopTabsLayout() {
  return (
    <MaterialTopTabs
      screenOptions={{
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarItemStyle: { width: SCREEN_WIDTH / 2 },
      }}
    />
  );
}
