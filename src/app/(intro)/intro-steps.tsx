import { router } from 'expo-router';
import { useAuth } from 'src/store/authStore/auth.store';
import { Text } from 'react-native';
import SafeAreaView from '@components/SafeAreaView/SafeAreaView';
import { Button } from '@components/Button/Button';

export default function TutorialLastPage() {
  const completeTutorial = useAuth((state) => state.completeTutorial);

  const finishTutorial = () => {
    completeTutorial();
    router.replace('/');
  };

  return (
    <SafeAreaView>
      <Text>Tutorial Content Here</Text>
      <Button title="Get Started" onPress={finishTutorial} />
    </SafeAreaView>
  );
}
