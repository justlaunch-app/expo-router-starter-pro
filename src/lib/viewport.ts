/**
 * @file viewport.ts
 *
 * This file contains the viewport configuration for the application.
 * It is responsible for setting up the application's viewport width, height, and spacing.
 *
 * @see https://reactnative.dev/docs/dimensions
 */

import { Dimensions } from 'react-native';

export const viewportWidth = Dimensions.get('window').width;
export const viewportHeight = Dimensions.get('window').height;
export const spacing = viewportWidth * 0.1;
