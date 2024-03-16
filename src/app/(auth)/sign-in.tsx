import { View, Text } from 'react-native';
import { router } from 'expo-router';
import { ControlledInput } from '@components/core/Input/ControlledInput';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth as zustandUseAuth } from 'src/store/authStore/auth.store';
import { useTranslation } from 'react-i18next';
import { signInSchema } from '@schemas/auth.schema';
import { Label } from '@components/core/Label/StyledLabel';
import { Alert } from '@utils/Alert';
import TouchableOpacity from '@components/core/Button/TouchableOpacity';
import { useSignIn } from '@clerk/clerk-expo';
import SignInWithOAuth from '@components/ui/OAuth/SignInWithOAuth';
import SafeAreaView from '@components/core/SafeAreaView/SafeAreaView';
import { Separator } from '@components/core/Separator/Separator';
import { buttonClasses } from '@utils/buttonClasses';
import { cn } from '@utils/classNames';

export default function SignIn() {
  const { t } = useTranslation();
  const { signIn, setActive, isLoaded } = useSignIn();

  //Guest Mode
  const guestMode = zustandUseAuth((state) => {
    return state.enableGuestMode;
  });
  const handleGuestMode = () => {
    guestMode();
    login({ email: 'guest', password: 'guest' });
    router.replace('/');
  };

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const login = zustandUseAuth((state) => {
    return state.login;
  });

  const register = zustandUseAuth((state) => state.register);

  const onSubmit = handleSubmit(async (credentials) => {
    if (!signIn || !setActive || !isLoaded) {
      console.error('Clerk signIn or setActive is undefined or not loaded.');
      return;
    }

    try {
      const { email, password } = credentials;

      const loginResponse = login(credentials);

      if (loginResponse?.error) {
        console.log(
          'User does not exist in Zustand, attempting to sign in with Clerk'
        );
        const completeSignIn = await signIn.create({
          identifier: email,
          password,
        });

        if (completeSignIn.createdSessionId) {
          console.log('User successfully signed in with Clerk');
          register({ email, password });
          login(credentials);
          await setActive({ session: completeSignIn.createdSessionId });
        }
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      Alert.alert(
        t('auth.errors.sign-in-failed'),
        error instanceof Error ? error.message : 'An unexpected error occurred'
      );
    }
  });

  return (
    <SafeAreaView className="px-4">
      <View className="w-full bg-transparent">
        <Label htmlFor="email-sign-in" className="font-bold mb-2">
          {t('auth.email')}
        </Label>
        <ControlledInput
          id="email-sign-in"
          keyboardType="email-address"
          placeholder={t('auth.email-placeholder')}
          control={control}
          name="email"
        />
      </View>
      <View className="w-full bg-transparent">
        <Label htmlFor="password-sign-in" className="font-bold mb-2">
          {t('auth.password')}
        </Label>
        <ControlledInput
          id="password-sign-in"
          control={control}
          name="password"
          secureTextEntry
          placeholder={t('auth.password-placeholder')}
        />
      </View>
      <View className="mt-4 bg-transparent w-full">
        <TouchableOpacity
          className={cn(buttonClasses, 'bg-green-500')}
          onPress={onSubmit}
        >
          <Text>{t('auth.sign-in')}</Text>
        </TouchableOpacity>
      </View>

      <Separator className="px-10 py-5" text="or SSO" />
      <SignInWithOAuth />
      <Text
        className="text-center flex-1 text-sm"
        onPress={() => {
          handleGuestMode();
        }}
      >
        {t('auth.guest-mode')}
      </Text>
    </SafeAreaView>
  );
}
