import { MaterialTopTabs } from '@layouts/material-top-tabs';
import { useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';

export default function IndexTopTabsLayout() {
  const { setOptions } = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      headerShown: true,
    });
  }, [setOptions]);

  return <MaterialTopTabs />;
}
