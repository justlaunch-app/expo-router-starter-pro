import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { router } from 'expo-router';
import { ControlledInput } from '@components/Input/ControlledInput';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth as zustandUseAuth } from 'src/store/authStore/auth.store';
import { useTranslation } from 'react-i18next';
import { useIsFocused } from '@react-navigation/native';
import { signInSchema } from '@schemas/auth.schema';
import { Label } from '@components/Label/StyledLabel';
import { Alert } from '@utils/Alert';
import { Button } from '@components/Button/Button';
import { useSignIn, SignedIn, SignedOut, useAuth } from '@clerk/clerk-expo';
import SignInWithOAuth from '@components/OAuth/SignInWithOAuth';
import SafeAreaView from '@components/SafeAreaView/SafeAreaView';

const SignOut = () => {
  const { isLoaded, signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }
  return (
    <View>
      <Button
        title="Sign Out"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
};

export default function SignIn() {
  const { t } = useTranslation();
  const { signIn, setActive, isLoaded } = useSignIn();

  //Guest Mode
  const guestMode = zustandUseAuth((state) => {
    return state.enableGuestMode;
  });
  const handleGuestMode = () => {
    guestMode();
    router.replace('/');
  };

  const isFocused = useIsFocused();
  const { control, handleSubmit, reset } = useForm({
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
      } else {
        router.replace('/');
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      Alert.alert(
        t('auth.errors.sign-in-failed'),
        error instanceof Error ? error.message : 'An unexpected error occurred'
      );
    }
  });

  useEffect(() => {
    if (!isFocused) {
      reset();
    }
  }, [isFocused, reset]);

  return (
    <SafeAreaView>
      <SignedIn>
        <Text>{t('signed-in')}</Text>
      </SignedIn>
      <SignedOut>
        <Text>{t('signed-out')}</Text>
        <SignInWithOAuth />
      </SignedOut>
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
        <Button title={t('auth.sign-in')} onPress={onSubmit} />
      </View>

      <View className="mt-4 bg-transparent w-full">
        <Button
          title={t('auth.guest-mode')}
          onPress={() => {
            handleGuestMode();
          }}
        />
      </View>

      <SignOut />
    </SafeAreaView>
  );
}
