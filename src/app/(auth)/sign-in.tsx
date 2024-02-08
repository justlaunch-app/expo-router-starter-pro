// import { useEffect } from 'react';
// import { View } from 'react-native';
// import { ControlledInput } from '@components/Input/ControlledInput';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useAuth } from 'src/store/authStore/auth.store';
// import { useTranslation } from 'react-i18next';
// import { useSetTitle } from 'src/hooks/useSetTitle';
// import { useIsFocused } from '@react-navigation/native';
// import { signInSchema } from '@schemas/auth.schema';
// import { Label } from '@components/Label/StyledLabel';
// import { Alert } from '@utils/Alert';
// import { Button } from '@components/Button/Button';

// export default function SignIn() {
//   const { t } = useTranslation();
//   useSetTitle(t('auth.sign-in'));

//   const isFocused = useIsFocused();
//   const { control, handleSubmit, reset } = useForm({
//     resolver: zodResolver(signInSchema),
//     defaultValues: {
//       email: '',
//       password: '',
//     },
//   });

//   const login = useAuth((state) => {
//     return state.login;
//   });

//   const onSubmit = handleSubmit((credentials) => {
//     const { error } = login(credentials) ?? {};

//     if (!error) {
//       return;
//     }

//     Alert.alert(t(error));
//   });

//   useEffect(() => {
//     if (!isFocused) {
//       reset();
//     }
//   }, [isFocused, reset]);

//   return (
//     <View className="flex-1 items-center p-4 gap-y-8">
//       <View className="w-full bg-transparent">
//         <Label htmlFor="email-sign-in" className="font-bold mb-2">
//           {t('auth.email')}
//         </Label>
//         <ControlledInput
//           id="email-sign-in"
//           keyboardType="email-address"
//           placeholder="joe@acme.com"
//           control={control}
//           name="email"
//         />
//       </View>
//       <View className="w-full bg-transparent">
//         <Label htmlFor="password-sign-in" className="font-bold mb-2">
//           {t('auth.password')}
//         </Label>
//         <ControlledInput
//           id="password-sign-in"
//           control={control}
//           name="password"
//           secureTextEntry
//         />
//       </View>
//       <View className="mt-4 bg-transparent w-full">
//         <Button title={t('auth.sign-in')} onPress={onSubmit} />
//       </View>
//     </View>
//   );
// }
import React from 'react';
import { Text, TextInput, TouchableOpacity, View, Button } from 'react-native';
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

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      console.log('identifier', emailAddress);
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
  return (
    <View>
      <SignedIn>
        <Text>You are Signed in</Text>
      </SignedIn>
      <SignedOut>
        <Text>You are Signed out</Text>
        <SignInWithOAuth />
      </SignedOut>
      <SignOut />
      <View>
        <TextInput
          className="dark:text-white text-black"
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Email..."
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
      </View>

      <View>
        <TextInput
          className="dark:text-white text-black"
          value={password}
          placeholder="Password..."
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity onPress={onSignInPress}>
        <Text className="dark:text-white text-black">Sign in</Text>
      </TouchableOpacity>
    </View>
  );
}
