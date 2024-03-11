/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require("nativewind/preset")],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#f8f8f8',
          200: '#f1f1f1',
          300: '#e9e9e9',
          400: '#dcdcdc',
          500: '#d0d0d0',
          600: '#c3c3c3',
          700: '#b6b6b6',
          800: '#a8a8a8',
          900: '#8f8f8f',
        },
        secondary: {
          100: '#f8f8f8',
          200: '#f1f1f1',
          300: '#e9e9e9',
          400: '#dcdcdc',
          500: '#d0d0d0',
          600: '#c3c3c3',
          700: '#b6b6b6',
          800: '#a8a8a8',
          900: '#8f8f8f',
        },
      }
    },
  },
  plugins: [],
}