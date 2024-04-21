/**
 * This file is used to cache the JWT token in the Expo SecureStore.
 *
 * The `tokenCache` object has two methods:
 * - `getToken` - This method is used to get the token from the SecureStore.
 * - `saveToken` - This method is used to save the token in the SecureStore.
 *
 * @see https://docs.expo.dev/versions/latest/sdk/securestore/
 */

import * as SecureStore from 'expo-secure-store';

//Clerk Auth JWT Token Cache
export const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};
