/**
 * Authentication Layout
 * This layout is used for the authentication screens.
 *
 */

import { SafeAreaView } from '@components/core/safe-area-view';
import { MaterialTopTabs } from '@layouts/material-top-tabs';
import useHeaderVisibility from '@hooks/useHeaderVisibility';
import { SCREEN_WIDTH } from '@lib/device-size';

export default function IndexTopTabsLayout() {
  useHeaderVisibility(false);

  return (
    <SafeAreaView>
      <MaterialTopTabs
        screenOptions={{
          tabBarItemStyle: { width: SCREEN_WIDTH / 2 },
        }}
      />
    </SafeAreaView>
  );
}
