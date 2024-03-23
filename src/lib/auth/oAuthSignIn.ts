import { OAuthFlow } from '@srcTypes/OAuth';

export const OAuthSignIn = async ({ oAuthFlow }: { oAuthFlow: OAuthFlow }) => {
  try {
    const { startOAuthFlow } = oAuthFlow;
    if (!startOAuthFlow) {
      throw new Error('startOAuthFlow method not found in OAuthFlow object.');
    }
    const { createdSessionId, setActive } = await startOAuthFlow();
    if (createdSessionId && setActive) {
      await setActive({ session: createdSessionId });
    }
  } catch (err: unknown) {
    console.error('OAuth error', err);
  }
};
