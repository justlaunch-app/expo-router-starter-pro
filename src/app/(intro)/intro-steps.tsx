import { router } from 'expo-router';
import { useAuth } from 'src/store/authStore/auth.store';
import { View, Text } from 'react-native';
import { Button } from '@components/Button/Button';

export default function TutorialLastPage() {
  const completeTutorial = useAuth((state) => state.completeTutorial);

  const finishTutorial = () => {
    completeTutorial();
    router.replace('/');
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Text>Tutorial Content Here</Text>
      <Button title="Get Started" onPress={finishTutorial} />
    </View>
  );
}
