/**
 * Simple Top Tabs layout for the index screen.
 * You can customize this screen by modifying the code below.
 * you need to define the width based on the number of tabs you have.
 */

import { MaterialTopTabs } from '@layouts/material-top-tabs';
import { SCREEN_WIDTH } from '@lib/deviceSize';

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
