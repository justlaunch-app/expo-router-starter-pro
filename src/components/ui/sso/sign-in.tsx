import * as WebBrowser from 'expo-web-browser';
import { View } from 'react-native';
import { SSOButton as Button } from '@components/core/button/sso';
import { useWarmUpBrowser } from '@hooks/auth/useWarmUpBrowser';

WebBrowser.maybeCompleteAuthSession();

const SignInWithOAuth = () => {
  useWarmUpBrowser();

  return (
    <View className="flex flex-col gap-2">
      <Button
        strategy="oauth_google"
        icon={{ name: 'google', color: 'white' }}
      />
      <Button
        classNames="dark:bg-white bg-black"
        strategy="oauth_twitter"
        icon={{ name: 'twitter', color: 'white' }}
      />
    </View>
  );
};

export default SignInWithOAuth;
