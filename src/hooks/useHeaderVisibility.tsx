import { useLayoutEffect } from 'react';
import { useNavigation } from 'expo-router';

const useHeaderVisibility = ({ isVisible }: { isVisible: boolean }) => {
  const { setOptions } = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      headerShown: isVisible,
    });
  }, [isVisible, setOptions]);
};

export default useHeaderVisibility;
