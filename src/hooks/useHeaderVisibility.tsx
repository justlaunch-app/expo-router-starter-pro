/**
 *
 * useHeaderVisibility.tsx
 * This hook is used to show or hide the header in the screen.
 *
 * @param isVisible - A boolean value to determine if the header should be shown or hidden.
 * @return {void}
 *
 * @example
 *
 * import { useHeaderVisibility } from 'src/hooks';
 *
 * const MyScreen = () => {
 *  useHeaderVisibility(false);
 * return <View />;
 * };
 *
 */

import { useLayoutEffect } from 'react';
import { useNavigation } from 'expo-router';

const useHeaderVisibility = (isVisible: boolean) => {
  const { setOptions } = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      headerShown: isVisible,
    });
  }, [isVisible, setOptions]);
};

export default useHeaderVisibility;
