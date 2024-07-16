/**
 * Simple Top Tabs layout for the index screen.
 * You can customize this screen by modifying the code below.
 * you need to define the width based on the number of tabs you have.
 */

import { MaterialTopTabs } from '@layouts/material-top-tabs';
import { SCREEN_WIDTH } from '@lib/device-size';

export default function IndexTopTabsLayout() {
  return (
    <MaterialTopTabs
      screenOptions={{
        tabBarItemStyle: { width: SCREEN_WIDTH / 2 }, // 2 tabs (modify based on the number of tabs you have)
      }}
    />
  );
}
