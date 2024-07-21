/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-100": '#1a1625',
        "dark-200": "#2f2b3a",
        "dark-300": "#46424f",
      }
    },
  },
  plugins: [],
};
