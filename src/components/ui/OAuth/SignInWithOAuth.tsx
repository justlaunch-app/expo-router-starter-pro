import { useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Button, View } from 'react-native';
import {
  useOAuth,
  StartOAuthFlowParams,
  StartOAuthFlowReturnType,
} from '@clerk/clerk-expo';
import { useAuth as zustandUseAuth } from 'src/store/authStore/auth.store';
import { router } from 'expo-router';
import {} from '@clerk/clerk-expo';

interface OAuthFlow {
  startOAuthFlow: (
    startOAuthFlowParams?: StartOAuthFlowParams
  ) => Promise<StartOAuthFlowReturnType>;
}

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

  const login = zustandUseAuth((state) => {
    return state.login;
  });

  const register = zustandUseAuth((state) => state.register);

  const startOAuthSignIn = async (oAuthFlow: OAuthFlow) => {
    try {
      const { createdSessionId, setActive } = await oAuthFlow.startOAuthFlow();
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        const tempCredentials = {
          email: 'SSOUser' + createdSessionId,
          password: 'pass' + createdSessionId,
        };
        register({
          email: tempCredentials.email,
          password: tempCredentials.password,
        });
        login({
          email: tempCredentials.email,
          password: tempCredentials.password,
        });
        router.replace('/intro-steps');
      }
    } catch (err: unknown) {
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
    </View>
  );
};

export default SignInWithOAuth;
