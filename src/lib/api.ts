/**
 *
 * This file is used to create the API instance using the `apisauce` library.
 *
 * The `create` function from `apisauce` is used to create an instance of the API.
 * The `baseURL` is set to the value of the `EXPO_PUBLIC_API_URL` environment variable.
 */

import { create } from 'apisauce';

export const api = create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

export const reqresApi = create({
  baseURL: process.env.EXPO_PUBLIC_REQRES_API_URL,
});
