import {
  StartOAuthFlowParams,
  StartOAuthFlowReturnType,
} from '@clerk/clerk-expo';

export type OAuthStrategy =
  | 'oauth_google'
  | 'oauth_facebook'
  | 'oauth_apple'
  | 'oauth_github'
  | 'oauth_twitter'
  | 'oauth_microsoft'
  | 'oauth_linkedin'
  | 'oauth_dropbox'
  | 'oauth_discord'
  | 'oauth_twitch'
  | 'oauth_tiktok'
  | 'oauth_gitlab'
  | 'oauth_slack'
  | 'oauth_linear'
  | 'oauth_atlassian'
  | 'oauth_bitbucket'
  | 'oauth_hubspot'
  | 'oauth_coinbase'
  | 'oauth_spotify'
  | 'oauth_notion'
  | 'oauth_line'
  | 'oauth_box'
  | 'oauth_xero';

export type OAuthFlow = {
  startOAuthFlow: (
    startOAuthFlowParams?: StartOAuthFlowParams
  ) => Promise<StartOAuthFlowReturnType>;
};
