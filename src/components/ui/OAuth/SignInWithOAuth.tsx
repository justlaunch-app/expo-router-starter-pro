import * as WebBrowser from 'expo-web-browser';
import { View } from 'react-native';
import { SSOButton } from '@components/core/Button/SSO';
import { useWarmUpBrowser } from '@hooks/auth/useWarmUpBrowser';

WebBrowser.maybeCompleteAuthSession();

const SignInWithOAuth = () => {
  useWarmUpBrowser();

  return (
    <View className="flex flex-col gap-2">
      <SSOButton
        strategy="oauth_google"
        icon={{ name: 'google', color: 'white' }}
      />
      <SSOButton
        classNames="dark:bg-white bg-black"
        strategy="oauth_twitter"
        icon={{ name: 'twitter', color: 'white' }}
      />
    </View>
  );
};

export default SignInWithOAuth;
