/**
 * Theme
 * @description Theme configuration for the application
 * @type {Theme}
 *
 * @see https://tailwindcss.com/docs/customizing-colors
 *
 * You can change the theme colors by modifying the DefaultTheme and DarkTheme variables. You can also add more themes by creating a new variable.
 *
 * For adding custom colors to the base tailwindcss/colors you need to add the color to the tailwind.config.js file.
 *
 */

import colors from 'tailwindcss/colors';

type Theme = {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
    navigation?: string;
    navigationActive?: string;
  };
};

export const DefaultTheme: Theme = {
  dark: false,
  colors: {
    primary: colors.blue[500],
    background: colors.white,
    card: colors.white,
    text: colors.gray[900],
    border: colors.gray[200],
    notification: colors.pink[500],
    navigation: colors.blue[500],
    navigationActive: colors.blue[700],
  },
};

export const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: colors.blue[500],
    background: colors.black,
    card: colors.gray[800],
    text: colors.white,
    border: colors.gray[700],
    notification: colors.pink[500],
    navigation: colors.blue[500],
    navigationActive: colors.blue[300],
  },
};
