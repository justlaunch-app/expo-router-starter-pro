/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require("nativewind/preset")],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkTheme: {
          background: '#1A1C23', // approx for dark: 240 10% 3.9%;
          foreground: '#E6E6E6', // approx for dark: 0 0% 98%;
          card: '#2C2F36', // approx for dark: 240 10% 3.9%;
          cardForeground: '#E6E6E6', // approx for dark: 0 0% 98%;
          popover: '#2C2F36', // approx for dark: 240 10% 3.9%;
          popoverForeground: '#E6E6E6', // approx for dark: 0 0% 98%;
          primary: '#E6E6E6', // approx for dark: 0 0% 98%;
          primaryForeground: '#1A1C23', // approx for dark: 240 5.9% 10%;
          secondary: '#3D4250', // approx for dark: 240 3.7% 15.9%;
          secondaryForeground: '#E6E6E6', // approx for dark: 0 0% 98%;
        },
        lightTheme: {
          background: '#FFFFFF', // approx for light: 0 0% 100%;
          foreground: '#383A42', // approx for light: 240 10% 3.9%;
          card: '#FFFFFF', // approx for light: 0 0% 100%;
          cardForeground: '#383A42', // approx for light: 240 10% 3.9%;
          popover: '#FFFFFF', // approx for light: 0 0% 100%;
          popoverForeground: '#383A42', // approx for light: 240 10% 3.9%;
          primary: '#383A42', // approx for light: 240 5.9% 10%;
          primaryForeground: '#F8F9FA', // approx for light: 0 0% 98%;
          secondary: '#E2E4E9', // approx for light: 240 4.8% 95.9%;
          secondaryForeground: '#383A42', // approx for light: 240 5.9% 10%;
        },
      }
    },
  },
  plugins: [],
}