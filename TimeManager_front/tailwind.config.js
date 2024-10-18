/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        //light theme
        light_bg: '#ffffff',
        light_bg2: '#f9fafb',
        light_black: '#1c1c27',
        light_txtZone: '#f3f4f6',
        light_primary: '#2aa7ff',
        light_secondary: '#c38cfa',
        light_green: '#b4f9b7',

        // V1.0 light color
        light_primary_100: '#8B5FBF',
        light_primary_200: '#61398F',
        light_primary_300: '#FFFFFF',
        light_accent_100: '#D6C6E1',
        light_accent_200: '#9A73B5',
        light_text_100: '#4A4A4A',
        light_text_200: '#878787',
        light_bg_100: '#F5F3F7',
        light_bg_200: '#E9E4ED',
        light_bg_300: '#FFFFFF',

        // V1.0 dark color
        dark_primary_100: '#892CDC',
        dark_primary_200: '#BC6FF1',
        dark_primary_300: '#fdf6fd',
        dark_accent_100: '#D9ACF5',
        dark_accent_200: '#fff4ff',
        dark_text_100: '#EEEEEE',
        dark_text_200: '#FDEBED',
        dark_bg_100: '#222831',
        dark_bg_200: '#393E46',
        dark_bg_300: '#454e59',
      }
    },
  },
  plugins: [require('tailwindcss-primeui')],
}

