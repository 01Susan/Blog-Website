/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line no-undef
export const darkmode = 'class';
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {
    colors: {
      "dark-100": '#1a1625',
      "dark-200": "#2f2b3a",
      "dark-300": "#46424f"
    }
  },
};
export const plugins = [];