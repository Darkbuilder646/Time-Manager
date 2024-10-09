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
      }
    },
  },
  plugins: [require('tailwindcss-primeui')],
}

