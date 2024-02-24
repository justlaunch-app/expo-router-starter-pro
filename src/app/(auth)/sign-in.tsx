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

  const onSubmit = handleSubmit(async (credentials) => {
    if (!signIn || !setActive) {
      console.error('Clerk signIn or setActive is undefined.');
      return;
    }

    if (!isLoaded) {
      return;
    }

    try {
      const { email, password } = credentials;

      login(credentials);
      const completeSignIn = await signIn.create({
        identifier: email,
        password: password,
      });

      await setActive({ session: completeSignIn.createdSessionId });
    } catch (error) {
      if (error instanceof Error) {
        console.error(JSON.stringify(error, null, 2));
        Alert.alert(t('auth.errors.sign-in-failed'), error.message);
      } else {
        console.error('An unexpected error occurred', error);
      }
    }
  });

  useEffect(() => {
    if (!isFocused) {
      reset();
    }
  }, [isFocused, reset]);

  return (
    <View className="flex-1 items-center p-4 gap-y-8">
      <SignedIn>
        <Text>You are Signed in</Text>
      </SignedIn>
      <SignedOut>
        <Text>You are Signed out</Text>
        <SignInWithOAuth />
      </SignedOut>
      <View className="w-full bg-transparent">
        <Label htmlFor="email-sign-in" className="font-bold mb-2">
          {t('auth.email')}
        </Label>
        <ControlledInput
          id="email-sign-in"
          keyboardType="email-address"
          placeholder="joe@acme.com"
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
        />
      </View>
      <View className="mt-4 bg-transparent w-full">
        <Button title={t('auth.sign-in')} onPress={onSubmit} />
      </View>

      <View className="mt-4 bg-transparent w-full">
        <Button
          title="Guest Mode"
          onPress={() => {
            handleGuestMode();
          }}
        />
      </View>

      <SignOut />
    </View>
  );
}
