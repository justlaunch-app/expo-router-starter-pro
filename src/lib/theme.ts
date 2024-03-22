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
  },
};
