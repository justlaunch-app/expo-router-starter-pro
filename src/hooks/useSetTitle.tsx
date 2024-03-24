/**
 * useSetTitle.tsx
 * This hook is used to set the title of the screen.
 *
 * @param title - A string value to set the title of the screen.
 * @return {void}
 *
 * @example
 *
 * import { useSetTitle } from 'src/hooks';
 *
 * const MyScreen = () => {
 * useSetTitle({ title: 'My Screen' });
 * return <View />;
 * };
 *
 *
 */

import { useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';

export const useSetTitle = ({ title }: { title: string }) => {
  const { setOptions } = useNavigation();

  useLayoutEffect(() => {
    setOptions({ title });
  }, [setOptions, title]);
};
