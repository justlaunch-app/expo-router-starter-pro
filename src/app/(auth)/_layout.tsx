import SafeAreaView from '@components/SafeAreaView/SafeAreaView';
import { MaterialTopTabs } from '@layouts/material-top-tabs';
import useHeaderVisibility from '@hooks/useHeaderVisibility';

export default function IndexTopTabsLayout() {
  useHeaderVisibility(false);

  return (
    <SafeAreaView>
      <MaterialTopTabs />
    </SafeAreaView>
  );
}
