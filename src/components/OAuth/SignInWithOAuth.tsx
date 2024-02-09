import { useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Button, View } from 'react-native';
import SSOButton from './Button/SSOButton';
import x from '@assets/icons/x.png';
import { useOAuth } from '@clerk/clerk-expo';

export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

const SignInWithOAuth = () => {
  useWarmUpBrowser();

  // Separate useOAuth instances for each strategy
  const googleOAuth = useOAuth({ strategy: 'oauth_google' });
  const appleOAuth = useOAuth({ strategy: 'oauth_apple' });
  const githubOAuth = useOAuth({ strategy: 'oauth_github' });
  const twitterOAuth = useOAuth({ strategy: 'oauth_twitter' });

  const startOAuthSignIn = async (oAuthFlow: any) => {
    try {
      const { createdSessionId, setActive } = await oAuthFlow.startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  };

  return (
    <View>
      <Button
        title="Sign in with Google"
        onPress={() => startOAuthSignIn(googleOAuth)}
      />
      <Button
        title="Sign in with Apple"
        onPress={() => startOAuthSignIn(appleOAuth)}
      />
      <Button
        title="Sign in with GitHub"
        onPress={() => startOAuthSignIn(githubOAuth)}
      />
      <SSOButton
        logo={x}
        backgroundColor="white"
        textColor="black"
        borderRadius={32}
        text="Sign in with X"
        onPress={() => startOAuthSignIn(twitterOAuth)}
      />
    </View>
  );
};

export default SignInWithOAuth;
