/** @type {import('tailwindcss').Config} */
export default {
  //  THIS IS THE KEY LINE — without it dark: classes do nothing
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}